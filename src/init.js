import fs from "fs";

export const args = process.argv.slice(2);
export const filename = "task-list.json";

// 파일이 없으면 생성
if (!fs.existsSync(filename)) {
  fs.writeFileSync(filename, "[]");
}

// data 읽어오기
const data = fs.readFileSync(filename, "utf8");
export const tasks = JSON.parse(data);
