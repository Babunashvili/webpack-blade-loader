const fs = require("fs");
const helper = require("../helper");
const matchAll = helper.matchAll;

/**
 * @param  {String} path
 * @param  {Object} options
 * @return  {String}
 */
function getComponentContent(path, options) {
  const viewDir = options.viewDir + "/" || "";
  const extension = options.extension || ".blade.html";
  const componentPath = viewDir + path.split(".").join("/") + extension;

  if (fs.existsSync(componentPath)) {
    const componentContent = fs.readFileSync(componentPath, "utf8");
    return componentContent;
  }

  throw "The file " + componentPath + " doesn't exist.";
}

/**
 * @param  {String} source
 * @return  {Array}
 */
function getComponents(source) {
  const regex = [
    /^\s*@component\(('|")(.*)('|")(,\s*({.*})(.*))?\)((.*?|\n(.*)\n))@endcomponent$/gim,
    /^\s*@component\(('|")(.*)('|")(,\s*({.*})(.*))?\)(.?)$/gim
  ];

  return regex
    .reduce((a, f) => [...a, ...matchAll(source, f)], [])
    .map(function(match) {
      return {
        key: match[2],
        match: match[0],
        params: match[5] ? JSON.parse(match[5]) : {},
        content: match[7]
      };
    });
}

/**
 * @param  {String} source
 * @param  {Object} options
 * @return  {String}
 */
function compiler(source, options) {
  let content = source;
  getComponents(source).forEach(function(component) {
    const find = Object.keys(component.params).map(function(key) {
      return new RegExp("{{\\s?" + key + "\\s?}}");
    });
    const replace = Object.keys(component.params).map(function(key) {
      return component.params[key];
    });

    content = content.replace(
      component.match,
      getComponentContent(component.key, options)
        .replace(/{{\sslot\s}}/, component.content)
        .replaceAll(find, replace)
    );

    content = compiler(content, options);
  });

  return content;
}

module.exports = function(source, options) {
  return compiler(source, options);
};
