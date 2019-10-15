const compiler = require("../src/compilers/componentCompiler");
const fs = require("fs");

const indexContent = fs.readFileSync(
  __dirname + "/views/index.blade.html",
  "utf8"
);

describe("Component compiler", () => {
  test("Should compile all @component directives", function() {
    const compiledContent = compiler(indexContent, {
      viewDir: __dirname + "/views"
    });
    expect(compiledContent.includes("@component")).toEqual(false);
  });

  test("Should compile all variables", function() {
    const compiledContent = compiler(indexContent, {
      viewDir: __dirname + "/views"
    });
    expect(
      compiledContent.includes("{{") || compiledContent.includes("}}")
    ).toEqual(false);
  });
});
