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
            for (const task of tasks) {
                console.log(formatTask(task));
            }
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
