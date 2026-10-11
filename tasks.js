export function createTask(id, title) {
    if (!title) {
        console.log(`Please provide a title. Example: node index.js add "Buy milk"`);
        return;
    }
    return {id, title, done:false, createdAt: new Date().toISOString()};
}