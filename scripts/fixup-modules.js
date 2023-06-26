const fs = require("fs");
const path = require("path");

fs.writeFileSync(
  path.resolve(__dirname, "../dist/cjs/package.json"),
  JSON.stringify({
    type: "commonjs",
  })
);

fs.writeFileSync(
  path.resolve(__dirname, "../dist/esm/package.json"),
  JSON.stringify({
    type: "module",
  })
);
