import { createTask, formatTask, getNextId } from "./tasks.js";
import {loadTasks, saveTasks} from "./storage.js";

const arg = process.argv[3];
const command = process.argv[2];
switch (command) {
    case 'add': {
        try{
            const tasks = await loadTasks();
            const nextId = getNextId(tasks);
            const task = createTask(nextId, arg);

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
    case 'done': {
        try{
            if (!arg) {
                console.log('Please provide a task id. Example: node index.js done 1');
                process.exit(1);
            }
            const id = Number(arg);
            if (Number.isNaN(id)) {
                console.log('Invalid id number');
                process.exit(1);
            }
            const tasks = await loadTasks();
            const task = tasks.find(task => task.id === id);
            if (!task) {
                console.log('No task with id ' + id);
                process.exit(1);
            }
            else if (task.done) {
                console.log(`Task ${id} is already done`);
                process.exit(1);
            }
            task.done = true;
            await saveTasks(tasks);

            console.log(`Updated task ${id} to done`);
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
        break;
    }
    case 'delete': {
        try{
            if (!arg) {
                console.log('Please provide a task id. Example: node index.js delete 1');
                process.exit(1);
            }
            const id = Number(arg);
            if (Number.isNaN(id)) {
                console.log('Invalid id number');
                process.exit(1);
            }
            const tasks = await loadTasks();
            const task = tasks.find(task => task.id === id);
            if (!task) {
                console.log('No task with id ' + id);
                process.exit(1);
            }
            const remaining = tasks.filter(task => task.id !== id);
            await saveTasks(remaining);
            console.log(`Deleted task ${task.id}. ${task.title}`);
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
        break;
    }
    default: {
        console.log(`Unknown command`);
        console.log('available command: add, list, done, delete');
        process.exit(1);
    }
}
