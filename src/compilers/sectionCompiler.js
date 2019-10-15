const fs = require("fs");
const helper = require("../helper");
const matchAll = helper.matchAll;

/**
 * @param  {String} source
 * @return  {String}
 */

function getExtend(source) {
  const regex = /@extends\((.*?)\)/;
  return matchAll(source, regex).map(function(extend) {
    var args = matchAll(extend[1], /'(.*?)'/);
    return args[0] ? args[0][1] : "";
  });
}

/**
 * @param  {String} source
 * @param  {Object} options
 * @return  {String}
 */
function getLayout(source, options) {
  var layoutPath = getExtend(source)[0];

  if (layoutPath) {
    const viewDir = options.viewDir + "/" || "";
    const extension = options.extension || ".blade.html";
    layoutPath = viewDir + layoutPath.split(".").join("/") + extension;

    if (fs.existsSync(layoutPath)) {
      const layoutContent = fs.readFileSync(layoutPath, "utf8");
      return layoutContent;
    }

    throw "The file " + layoutPath + " doesn't exist.";
  }
  throw "The `extends` directive doesn't exist.";
}

/**
 * @param  {String} source
 * @param  {Object} options
 * @return  {String}
 */
function compiler(source, options) {
  const layout = getLayout(source, options);
  let content = layout;
  const directivesWithoutContent = matchAll(
    source,
    /@(.*?)\(('|")(.*?)('|")(.*)('|")(.*?)('|")\)/gim
  ).map(function(match) {
    return {
      key: match[3],
      value: match[7]
    };
  });
  const directivesWithContent = matchAll(
    source,
    /@section\(('|")(\w+)('|")\)((.|\n)*?)@endsection/gim
  ).map(function(match) {
    return {
      key: match[2],
      value: match[4]
    };
  });

  const directives = [...directivesWithContent, ...directivesWithoutContent];

  directives.forEach(function(directive) {
    const regex = new RegExp(
      "@(.*?)\\(('|\")" + directive.key + "('|\")\\)",
      "g"
    );
    content = content.replace(regex, directive.value);
  });

  return content;
}

module.exports = function(source, options) {
  return compiler(source, options);
};
