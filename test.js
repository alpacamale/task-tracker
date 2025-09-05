import { spawnSync } from "child_process";
import assert from "assert";

function run(cmd, args = []) {
  const result = spawnSync(cmd, args, { encoding: "utf8" });
  return {
    status: result.status, // exit code
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

let result;

// ------------------ ADD ------------------
console.log("Validate Add with correct arguments");
result = run("./task-cli.js", ["add", "Buy groceries"]);
assert.strictEqual(result.status, 0);
assert.ok(result.stdout.includes("Task added successfully"));
console.log("✔ CLI Add test passed");

console.log("Validate Add with invalid number of arguments");
result = run("./task-cli.js", ["add", "1", "Buy groceries"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("Usage: task-cli add"));
console.log("✔ CLI Add fail test passed");

console.log("Validate Add with empty description");
result = run("./task-cli.js", ["add", ""]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("Usage: task-cli add"));
console.log("✔ CLI Add fail test passed");

// ------------------ UPDATE ------------------
console.log("Validate Update with correct arguments");
result = run("./task-cli.js", ["update", "1", "Buy groceries and cook dinner"]);
assert.strictEqual(result.status, 0);
assert.ok(result.stdout.includes("Task updated successfully!"));
console.log("✔ CLI Update test passed");

console.log("Validate Update with invalid number of arguments");
result = run("./task-cli.js", ["update", "1", "Buy groceries", "extra"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("Usage: task-cli update"));
console.log("✔ CLI Update fail test passed");

console.log("Validate Update with non-existent ID");
result = run("./task-cli.js", ["update", "999", "Buy groceries"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("ID not found"));
console.log("✔ CLI Update fail test passed");

// ------------------ MARK IN PROGRESS ------------------
console.log("Validate Mark in-progress with correct arguments");
result = run("./task-cli.js", ["mark-in-progress", "1"]);
assert.strictEqual(result.status, 0);
assert.ok(result.stdout.includes("Mark in progress successfully!"));
console.log("✔ Mark in-progress test passed");

console.log("Validate Mark in-progress with invalid number of arguments");
result = run("./task-cli.js", ["mark-in-progress", "1", "extra"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("Usage: task-cli mark-in-progress"));
console.log("✔ Mark in-progress fail test passed");

console.log("Validate Mark in-progress with non-existent ID");
result = run("./task-cli.js", ["mark-in-progress", "999"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("ID not found"));
console.log("✔ Mark in-progress fail test passed");

// ------------------ MARK DONE ------------------
console.log("Validate Mark done with correct arguments");
result = run("./task-cli.js", ["mark-done", "1"]);
assert.strictEqual(result.status, 0);
assert.ok(result.stdout.includes("Mark done successfully!"));
console.log("✔ Mark done test passed");

console.log("Validate Mark done with invalid number of arguments");
result = run("./task-cli.js", ["mark-done", "1", "extra"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("Usage: task-cli mark-done"));
console.log("✔ Mark done fail test passed");

console.log("Validate Mark done with non-existent ID");
result = run("./task-cli.js", ["mark-done", "999"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("ID not found"));
console.log("✔ Mark done fail test passed");

// ------------------ DELETE ------------------
console.log("Validate Delete with invalid number of arguments");
result = run("./task-cli.js", ["delete", "1", "extra"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("Usage: task-cli delete"));
console.log("✔ CLI Delete fail test passed");

console.log("Validate Delete with non-existent ID");
result = run("./task-cli.js", ["delete", "999"]);
assert.strictEqual(result.status, 1);
assert.ok(result.stdout.includes("ID not found"));
console.log("✔ CLI Delete fail test passed");

console.log("Validate Delete with correct arguments");
result = run("./task-cli.js", ["delete", "1"]);
assert.strictEqual(result.status, 0);
assert.ok(result.stdout.includes("Task deleted successfully!"));
console.log("✔ CLI Delete test passed");

run("rm", ["-rf", "task-list.json"]);
