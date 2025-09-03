#!/usr/bin/env node

import { args } from "./src/init.js";
import {
  addTask,
  updateTask,
  deleteTask,
  markInProgress,
  markDone,
  showTasks,
} from "./src/commands.js";

const commands = {
  add: addTask,
  update: updateTask,
  delete: deleteTask,
  "mark-in-progress": markInProgress,
  "mark-done": markDone,
  list: showTasks,
};

if (!args.length || !commands[args[0]]) {
  let buff = "[";
  for (const key of Object.keys(commands)) buff = buff + key + "|";
  buff = buff.slice(0, -1) + "]";
  console.log(`Usage: task-cli ${buff}`);
}

commands[args[0]](args);
