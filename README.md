# quack

**quack** is a simple **TypeScript**‑based command‑line application that uses Google's [Gemini](https://developers.google.com/ai) generative AI models to perform a quick, terminal‑friendly search. It wraps the official `@google/genai` SDK and provides a few convenience options for configuration and output formatting.

> 🦆 *"Gemini powered terminal search"* — that's the tagline for `quack`.

---

## Features

- Save and reuse a Gemini API key via a local configuration store using [`conf`](https://www.npmjs.com/package/conf).
- Query Gemini from the terminal and get short, human‑readable answers.
- Optional `--long` flag for longer responses (configurable in code).
- Download size is tiny and the interface is intentionally minimal.

## Installation

```bash
# clone the repository (or install from npm once published)
git clone https://github.com/yourusername/quack.git
cd quack

# install dependencies
npm install

# build the project (typescript -> javascript)
npm run build   # you may want to add a build script pointing to tsc

# link globally so you can run `quack` from anywhere
npm link
```

> ⚠️ The package currently targets Node 18+ and uses ES modules (`"type": "module"`).

Alternatively, if published to the npm registry, simply:

```bash
npm install -g quack
```

## Usage

```text
Usage: quack [options] [query...]

Gemini powered terminal search.

Options:
  -V, --version          output the version number
  -l, --long             Get long answer.
  -s, --see              See current api key.
  -c, --config <key>     configure gemini apikey
  -h, --help             display help for command
```

### Examples

Save your API key:

```bash
quack -c YOUR_GEMINI_KEY_HERE
```

Check the saved key (it will be printed in blue):

```bash
quack --see
```

Perform a search:

```bash
quack what is the capital of France
```

Ask for a longer answer:

```bash
quack -l tell me in detail about the lifecycle of a butterfly
```

If no query is provided, `quack` prints the help text.

## Development

This project is written in TypeScript.

```bash
# run the TypeScript file directly
npx ts-node src/app.ts <your query>

# compile to dist/
npm run build
```

Configuration is handled with [`conf`](https://www.npmjs.com/package/conf), which stores data in a platform‑appropriate location (under `%APPDATA%` on Windows).

## Publishing

To publish to npm, ensure the `package.json` fields like `name`, `version`, `description`, `author`, and `keywords` are filled out, then run:

```bash
npm publish
```

## Contributing

Contributions are welcome! Please open issues or pull requests on the GitHub repository.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Open a pull request

## License

This project is licensed under the ISC License – see the [LICENSE](LICENSE) file for details.

---

> 💡 *Feel free to adapt the code, add more options, or support additional Gemini parameters.*

---

*Happy quacking!* 🦆
