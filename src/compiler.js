const sectionCompiler = require("./compilers/sectionCompiler");
const componentCompiler = require("./compilers/componentCompiler");
const compilers = [sectionCompiler, componentCompiler];

/**
 * @param  {String} source
 * @param  {Object} options
 * @return  {String}
 */
function compiler(source, options) {
  let content = source;

  compilers.forEach(function(compiler) {
    content = compiler(content, options);
  });

  return content;
}

module.exports = function(source, options) {
  return compiler(source, options);
};
