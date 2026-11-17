import { createTask, formatTask } from "./tasks.js";
import {loadTasks, saveTasks} from "./storage.js";

const arg = process.argv[3];
const command = process.argv[2];
switch (command) {
    case 'add': {
        try{
            const tasks = await loadTasks();
            const task = createTask(tasks.length+1, arg);

            tasks.push(task);
            await saveTasks(tasks);

            console.log(`Added task ${task.id}: ${task.title}`);
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
        break;
    }
    case 'list': {
        try{
            const tasks = await loadTasks();
            if (tasks.length === 0) {
                console.log('No tasks yet. Add one with: node index.js add "Buy milk"')
                break;
            }
            if (arg) {
                if (arg !== '--pending' && arg !== '--done') {
                    console.log('Unknown option. Use --done or --pending');
                    process.exit(1);
                }
            }
            let filtered = tasks;
            if (arg === "--pending") filtered = tasks.filter(task => !task.done);
            else if (arg === "--done") filtered = tasks.filter(task => task.done);

            if (filtered.length === 0) {
                console.log('No matching tasks');
                break;
            }

            console.log(filtered.map(formatTask).join("\n"));
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
        break;
    }
    default: {
        console.log(`Unknown command`);
        console.log('available command: add, list');
        process.exit(1);
    }
}
