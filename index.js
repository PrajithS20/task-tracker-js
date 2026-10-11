const title=process.argv[3]
if (!title) {
    console.log(`Please provide a title. Example: node index.js add "Buy milk"`);
    process.exit(1);
}
console.log("Title: "+title);
