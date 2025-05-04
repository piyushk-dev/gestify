const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function fixApostrophesInReturnStatements(content) {
  return content.replace(/return\s*\(\s*([\s\S]*?)\s*\)/g, (match, inner) => {
    const fixed = inner.replace(/(?<=>[^<]*)'(?=[^<]*<|[^<]*$)/g, "&rsquo;");
    return `return (\n${fixed}\n)`;
  });
}

function processFile(filePath) {
  if (!filePath.endsWith(".tsx")) return;

  const original = fs.readFileSync(filePath, "utf8");
  const fixed = fixApostrophesInReturnStatements(original);

  if (original !== fixed) {
    fs.writeFileSync(filePath, fixed, "utf8");
    console.log(`✅ Fixed: ${filePath}`);
  }
}

walkDir("./app", processFile);
