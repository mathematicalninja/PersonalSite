import * as path from "node:path";
import * as fs from "node:fs";
// import * as process from "node:process";

import { cwd } from "node:process";

export default async () => {
  const testPath = path.join(cwd(), "public", "data", "txt", "test.txt");
  // const filePath = path.join(process.cwd(), "public", "test.txt");
  const filePath = testPath;
  const data = await fs.promises.readFile(filePath, "utf-8");
  return data;
};
