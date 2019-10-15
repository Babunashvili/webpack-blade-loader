const compiler = require("../src/compilers/sectionCompiler");
const fs = require("fs");

const indexContent = fs.readFileSync(
  __dirname + "/views/index.blade.html",
  "utf8"
);

describe("Section compiler", () => {
  test("Should compile all @section directives", function() {
    const compiledContent = compiler(indexContent, {
      viewDir: __dirname + "/views"
    });
    expect(compiledContent.includes("@section")).toEqual(false);
  });

  test("Should compile all @extends directives", function() {
    const compiledContent = compiler(indexContent, {
      viewDir: __dirname + "/views"
    });
    expect(compiledContent.includes("@extends")).toEqual(false);
  });

  test("Should compile all @yield directives", function() {
    const compiledContent = compiler(indexContent, {
      viewDir: __dirname + "/views"
    });
    expect(compiledContent.includes("@yield")).toEqual(false);
  });
});
