# Task Tracker CLI

A command-line task manager built with plain Node.js (no dependencies). Tasks are saved to a local JSON file, so they persist between runs.

## Features

- Add tasks with a title
- List all tasks, or filter by done or pending
- Mark tasks as done
- Delete tasks
- View summary stats (total, done, pending)
- Friendly error messages for bad input (missing title, invalid id, unknown command)

## Setup

Requires Node.js 18 or later.

```bash
git clone https://github.com/PrajithS20/task-tracker-js.git
cd task-tracker-js
```

There is nothing to install. The project uses ES modules and only built-in Node APIs.

## Usage

```bash
node index.js add "Buy milk"
node index.js list
node index.js list --pending
node index.js list --done
node index.js done 1
node index.js delete 1
node index.js stats
```

### Example session

```text
$ node index.js add "Buy milk"
Added task 1: Buy milk

$ node index.js add "Study JS"
Added task 2: Study JS

$ node index.js done 1
Updated task 1 to done

$ node index.js list
[x] 1. Buy milk
[ ] 2. Study JS

$ node index.js stats
Total: 2
Done: 1
Pending: 1
```

Tasks are stored in `tasks.json`, which is created automatically on the first `add`.

## Project structure

| File | Purpose |
|---|---|
| `index.js` | Entry point. Reads the command and arguments, then runs the matching action |
| `tasks.js` | Task logic: creating tasks, formatting output, generating the next id |
| `storage.js` | Reading and writing `tasks.json` with async file operations |
| `package.json` | Project metadata (set to ES modules) |

## Concepts practised

- ES modules (`import` / `export`) to split code across files
- `async` / `await` with `fs/promises` for file storage
- Array methods: `find`, `filter`, `map`, `reduce`
- Error handling with `throw` and `try` / `catch`
- Reading command-line arguments with `process.argv`
- JSON persistence and unique id generation

## Next steps

- Convert the project to TypeScript with strict mode
- Validate stored data with Zod
- Add unit tests
- Add an `edit` command to rename tasks