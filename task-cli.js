#!/usr/bin/env node

import fs from "fs";

const FILENAME = "task-list.json";

// 파일이 없으면 생성
if (!fs.existsSync(FILENAME)) {
  fs.writeFileSync(FILENAME, "[]");
}

// 인자의 개수 확인
const args = process.argv.slice(2);
if (args.length === 0 || args.length > 3) {
  console.log("task-cli: 인자의 개수가 이상합니다.");
  process.exit(1);
}

// json 읽어오기
const data = fs.readFileSync(FILENAME, "utf8");
const tasks = JSON.parse(data);
// console.log(tasks);

const addTask = () => {
  if (!args.length === 2) {
    console.log('Usage: task-cli add "foo-bar"');
    process.exit(1);
  }

  const id = !tasks.length ? 1 : tasks.at(-1).id + 1;
  const task = {
    id,
    description: args[1],
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  tasks.push(task);
  fs.writeFileSync(FILENAME, JSON.stringify(tasks));
  console.log(`Output: Task added successfully (ID: ${id})`);
};

const updateTask = () => {
  if (!args.length === 3) {
    console.log('Usage: task-cli update [id] "foo-bar"');
    process.exit(1);
  }

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) {
    console.log("taks-cli: 일치하는 id가 없습니다.");
    process.exit(1);
  }

  tasks[index].description = args[2];
  tasks[index].updatedAt = Date.now();
  fs.writeFileSync(FILENAME, JSON.stringify(tasks));
  console.log("Output: Task updated successfully!");
};

const deleteTask = () => {
  if (!args.length === 2) {
    console.log("Usage: task-cli delete [id]");
    process.exit(1);
  }

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) {
    console.log("task-cli: 일치하는 id가 없습니다.");
    process.exit(1);
  }

  tasks.splice(index, 1);
  fs.writeFileSync(FILENAME, JSON.stringify(tasks));
  console.log("Output: Task deleted successfully!");
};

const markInProgress = () => {
  if (!args.length === 2) {
    console.log("Usage: task-cli mark-in-progress [id]");
    process.exit(1);
  }

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) {
    console.log("task-cli: 일치하는 id가 없습니다.");
    process.exit(1);
  }

  tasks[index].status = "in-progress";
  tasks[index].updatedAt = Date.now();
  fs.writeFileSync(FILENAME, JSON.stringify(tasks));
  console.log("Output: Mark in progress successfully!");
};

const markDone = () => {
  if (!args.length === 2) {
    console.log("Usage: task-cli mark-done [id]");
    process.exit(1);
  }

  const index = tasks.findIndex((item) => item.id == args[1]);
  if (index === -1) {
    console.log("task-cli: 일치하는 id가 없습니다.");
    process.exit(1);
  }

  tasks[index].status = "done";
  tasks[index].updatedAt = Date.now();
  fs.writeFileSync(FILENAME, JSON.stringify(tasks));
  console.log("Output: Mark done successfully!");
};

const showTasks = () => {
  if (args.length === 1) {
    tasks.forEach((element) => {
      console.log(`${element.id} ${element.status} ${element.description}`);
    });
    process.exit(0);
  }

  if (!args.length === 2) {
    console.log("Usage: task-cli list [status]");
    process.exit(1);
  }

  const term = args[1];
  if (!["todo", "in-progress", "done"].some((item) => item === term)) {
    console.log("Usage: task-cli list [status]");
    process.exit(1);
  }

  const statusInTerm = tasks.filter((item) => item.status === term);
  statusInTerm.forEach((element) => {
    console.log(`${element.id} ${element.status} ${element.description}`);
  });
};

if (args[0] == "add") addTask();
if (args[0] == "update") updateTask();
if (args[0] == "delete") deleteTask();
if (args[0] == "mark-in-progress") markInProgress();
if (args[0] == "mark-done") markDone();
if (args[0] == "list") showTasks();
