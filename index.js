import { createTask } from "./tasks.js";

const title = process.argv[3];
const command = process.argv[2];
switch (command) {
    case 'add': {
        const task = createTask(1, title);
        console.log(task);
        break;
    }
    case 'list': {
        console.log('List is not built yet');
        break;
    }
    default: {
        console.log(`Unknown command`);
        console.log('available command: add, list');
        process.exit(1);
    }
}
