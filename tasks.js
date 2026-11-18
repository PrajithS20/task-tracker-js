export function createTask(id, title) {
    if (!title) {
        throw new Error("Please provide a title. Example: node index.js add \"Buy milk\"");
    }
    return {id, title, done:false, createdAt: new Date().toISOString()};
}

export function formatTask(task) {
    const box = task.done ? "[x]":"[ ]"
    return `${box} ${task.id}. ${task.title}`;
}
export function getNextId(tasks) {
    const largestId = tasks.reduce((max,task) => Math.max(max, task.id), 0);
    return largestId+1;
}