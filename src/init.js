import fs from "fs";

export const args = process.argv.slice(2);

const setting = JSON.parse(fs.readFileSync("setting.json"));
export const filename = setting.filename;
export const commands = setting.commands;

// 파일이 없으면 생성
if (!fs.existsSync(filename)) {
  fs.writeFileSync(filename, "[]");
}

// data 읽어오기
const data = fs.readFileSync(filename, "utf8");
export const tasks = JSON.parse(data);
