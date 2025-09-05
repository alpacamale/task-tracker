import { filename, tasks } from "./init.js";
import { showError } from "./utils.js";
import fs from "fs";

export const addTask = (args) => {
  if (args.length !== 2 || args[1] === "")
    showError('Usage: task-cli add "foo-bar"');

  const id = !tasks.length ? 1 : tasks.at(-1).id + 1;
  const task = {
    id,
    description: args[1],
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  tasks.push(task);
  fs.writeFileSync(filename, JSON.stringify(tasks));
  console.log(`Output: Task added successfully (ID: ${id})`);
};

export const updateTask = (args) => {
  if (args.length !== 3 || args[2] === "")
    showError('Usage: task-cli update [id] "foo-bar"');

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) showError("task-cli: ID not found");

  tasks[index].description = args[2];
  tasks[index].updatedAt = Date.now();
  fs.writeFileSync(filename, JSON.stringify(tasks));
  console.log("Output: Task updated successfully!");
};

export const deleteTask = (args) => {
  if (args.length !== 2) showError("Usage: task-cli delete [id]");

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) showError("task-cli: ID not found");

  tasks.splice(index, 1);
  fs.writeFileSync(filename, JSON.stringify(tasks));
  console.log("Output: Task deleted successfully!");
};

export const markInProgress = (args) => {
  if (args.length !== 2) showError("Usage: task-cli mark-in-progress [id]");

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) showError("task-cli: ID not found");

  tasks[index].status = "in-progress";
  tasks[index].updatedAt = Date.now();
  fs.writeFileSync(filename, JSON.stringify(tasks));
  console.log("Output: Mark in progress successfully!");
};

export const markDone = (args) => {
  if (args.length !== 2) showError("Usage: task-cli mark-done [id]");

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) showError("task-cli: ID not found");

  tasks[index].status = "done";
  tasks[index].updatedAt = Date.now();
  fs.writeFileSync(filename, JSON.stringify(tasks));
  console.log("Output: Mark done successfully!");
};

export const showTasks = (args) => {
  // Listing all tasks
  if (args.length === 1) {
    tasks.forEach((element) => {
      console.log(`${element.id} ${element.status} ${element.description}`);
    });
    process.exit(0);
  }

  const term = args[1];
  isValidStatus = ["todo", "in-progress", "done"].includes(term);
  if (args.length !== 2 || !isValidStatus)
    showError("Usage: task-cli list [status]");

  // List tasks by status
  const statusInTerm = tasks.filter((item) => item.status === term);
  statusInTerm.forEach((element) => {
    console.log(`${element.id} ${element.status} ${element.description}`);
  });
};
