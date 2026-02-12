/**
 * @param {string} text
 * @param {function(string): string} render
 * @returns string
 */
function snakeUpperCase(text, render) {
  const upperCaseText = render(text).toUpperCase();
  return upperCaseText.replace('-', '_');
}

/**
 * @param {string} text
 * @param {function(string): string} render
 * @returns string
 */
function pascalCase(text, render) {
  const splitText = render(text).split('-');
  return splitText.map(word => word[0].toUpperCase() + word.slice(1)).join('');
}

module.exports = {
  snakeUpperCase,
  pascalCase,
};
