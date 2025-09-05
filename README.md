# Task Tracker CLI

Simple Task Tracker Cli Application.
Add, update, and delete tasks directly from the command line, and manage their status with ease.

[Loadmap.sh](https://roadmap.sh/projects/task-tracker)

## 🚀 Features

- Add, update, and delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress
- Store the tasks in a JSON file
- Error handling for invalid arguments or missing IDs

## 📦 Requirements

- Node.js

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/alpacamale/task-tracker-cli.git
cd task-tracker-cli
```

### 2. Grant execute permission

```bash
chmod +x task-cli.js
```

## 📝 Usage

### 1. Add task

```bash
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)
```

### 2. Update task

```bash
task-cli update 1 "Buy groceries and cook dinner"
# Output: Task updated successfully!
```

### 3. Delete task

```bash
task-cli delete 1
# Output: Task deleted successfully!
```

### 4. Change status

```bash
task-cli mark-in-progress 2
# Output: Mark in progress successfully!

task-cli mark-done 2
# Output: Mark done successfully!
```

### 5. Listing tasks

Listing all tasks:

```bash
task-cli list
# 1 todo Buy groceries
# 2 in-progress Cook dinner
```

Listing tasks by status :

```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

## 📂 Data Format

All tasks are stored in a `task-list.json` file.
example:

```json
[
  {
    "id": 1,
    "description": "Buy groceries and cook dinner",
    "status": "in-progress",
    "createdAt": "2025-01-05T09:12:33.123Z",
    "updatedAt": "2025-01-05T10:05:44.456Z"
  },
  {
    "id": 2,
    "description": "Do laundry",
    "status": "todo",
    "createdAt": "2025-01-05T09:15:12.789Z",
    "updatedAt": "2025-01-05T09:15:12.789Z"
  }
]
```

## ✅ Roadmap

- [x] Add test cases
- [x] Add comments
- [x] Write readme file
