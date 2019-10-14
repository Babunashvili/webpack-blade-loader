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

module.exports = {
  matchAll
};
