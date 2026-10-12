import { readFile, writeFile } from "fs/promises";

const FILE = "tasks.json";

export async function loadTasks() {
    try {
        const data = await readFile(FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

export async function saveTasks(tasks) {
    const data = JSON.stringify(tasks, null, 2);
    await writeFile(FILE, data);
}