# Installation Guide

[Go Back](../../README.md)

## Requirements

- [Node.js](https://nodejs.org/en/download/current), created on [v26.10.0](https://github.com/nodejs/node/releases/tag/v26.10.0).
- npm

Check that both are installed:

```bash
node --version
npm --version
```

## Install

Clone the repository, or download via [Releases](https://github.com/stevesgenes/MyPomodoro/releases) and enter the project directory:

```bash
git clone <https://github.com/stevesgenes/MyPomodoro.git>
cd MyPomodoro
```

Install the project dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

Vite updates the browser as source files change.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Validation

Run the linter:

```bash
npm run lint
```

Run both checks before submitting changes:

```bash
npm run lint
npm run build
```

## Adding Sounds

Place `.mp3`, `.wav`, or any other sound file that is compatible into `src/sounds`. The application discovers them automatically during the Vite build and adds them to the sound dropdown.

Sound labels are generated from filenames. For example:

```
bell_ringing_test.mp3 -> Bell Ringing Test
```

## Troubleshooting

### Dependencies are missing

Remove the installed dependency folder and reinstall:

```bash
rm -rf node_modules
npm install
```

On Windows PowerShell, use:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Notes
* To run it, copy the local URL printed by `npm run dev` and open it manually in a browser.
* You may need to stop and restart the Vite dev-server after changes or simply reload the page.