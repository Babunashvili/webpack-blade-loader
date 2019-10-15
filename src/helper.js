/**
 * @param  {String} str
 * @param  {RegExp} rgx
 */
function matchAll(str, rgx) {
  var arr,
    extras,
    matches = [];
  str.replace(rgx, function() {
    matches.push((arr = [].slice.call(arguments)));
  });
  return matches[0] ? matches : [];
}

/**
 * @param  {Array} searchArray
 * @param  {Array} replaceArray
 * @return {String}
 */
String.prototype.replaceAll = function(searchArray, replaceArray) {
  var str = this;

  searchArray.forEach(function(search, index) {
    str = str.replace(search, replaceArray[index]);
  });

  return str;
};

module.exports = {
  matchAll
};
