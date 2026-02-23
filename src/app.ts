import { Command } from "commander";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import Conf from 'conf';
import chalk from 'chalk';

const program = new Command();
const configs = new Conf({ projectName: "quack-search" });

program
    .name("quack")
    .description("Gemini powered terminal search.")
    .version("0.1")
    // Use angle brackets <query...> to capture the search text
    .argument('[query...]', 'the search query')
    .option("-l, --long", "Get long answer.")
    .option("-s, --see", "See current api key.")
    // FIX: added <key> to capture the string
    .option("-c, --config <key>", "configure gemini apikey")
    .action(async (queryArray, options) => {

        // --- 1. SET CONFIG ---
        if (options.config) {
            configs.set('GEMINI_API_KEY', options.config);
            console.log(chalk.green("API key has been saved."));
            return;
        }

        // --- 2. SEE CONFIG ---
        if (options.see) {
            // FIX: .store contains the actual key-value pairs
            console.log(chalk.blue("Current GEMINI API KEY:"), configs.store.GEMINI_API_KEY);
            return;
        }

        // --- 3. SEARCH LOGIC ---
        const savedKey = configs.get('GEMINI_API_KEY') as string;

        if (!savedKey) {
            console.log(chalk.red("Error: No API key found."));
            console.log("Run " + chalk.cyan("quack -c YOUR_KEY") + " first.");
            return;
        }

        if (queryArray && queryArray.length > 0) {
            const query = queryArray.join(' ');
            const ai = new GoogleGenAI({ apiKey: savedKey });
            
            console.log(chalk.gray("Quacking..."));
            
            try {
                const result = await ai.models.generateContent({ model: "gemini-2.5-flash-lite",
                    contents: [{ role: 'user', parts: [{ text: `${query} short and specific output under 200 output tokens` }] }],
                    config: {
                        // systemInstruction: "",
                        temperature: 0.5,
                        maxOutputTokens: 200,
                        // thinkingConfig: { 
                        //     thinkingLevel: options.long ? ThinkingLevel.HIGH : ThinkingLevel.MEDIUM 
                        // }
                    }
                });
                
                console.log("\n" + result.text);
            } catch (err) {
                console.error(`Error ${ err }`);
            }
        } else {
            program.help();
        }
    });

program.parseAsync(process.argv);