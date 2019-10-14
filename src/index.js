const validateOptions = require("schema-utils");
const loaderUtils = require("loader-utils");
const compiler = require("./compiler");

const schema = {
  type: "object",
  properties: {
    viewPath: {
      description:
        "The path of the directory where template files are located.",
      type: "string"
    },
    extension: {
      description: "The extension of the template files.",
      type: "string"
    }
  }
};

const configuration = { name: "Webpack Blade Loader" };

module.exports = function(source, map) {
  const options = loaderUtils.getOptions(this) || {};

  validateOptions(schema, options, configuration);

  if (this.callback) {
    this.callback(null, compiler(source, options), map);
  }
};
