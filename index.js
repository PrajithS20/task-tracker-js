const title = process.argv[3];
const command = process.argv[2];
switch (command) {
    case 'add':
        if (!title) {
            console.log(`Please provide a title. Example: node index.js add "Buy milk"`);
            process.exit(1);
        }
        task = {id:1, title, done:false};
        console.log(task);
        break;

    case 'list':
        console.log('List is not built let');
        break;

    default:
        console.log(`Unknown command`);
        console.log('available command: add, list');
        process.exit(1);
}
