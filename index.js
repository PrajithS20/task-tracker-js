import { createTask } from "./tasks.js";
import {loadTasks, saveTasks} from "./storage.js";

const title = process.argv[3];
const command = process.argv[2];
switch (command) {
    case 'add': {
        try{
            const tasks = await loadTasks();
            const task = createTask(tasks.length+1, title);

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
            console.log(tasks);
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
