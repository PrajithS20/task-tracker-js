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
