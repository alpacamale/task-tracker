import fs from "fs";

export const args = process.argv.slice(2);
export const filename = "task-list.json";

// Create file if not exist
if (!fs.existsSync(filename)) {
  fs.writeFileSync(filename, "[]");
}

// Read tasks from task-list.json
const data = fs.readFileSync(filename, "utf8");
export const tasks = JSON.parse(data);
