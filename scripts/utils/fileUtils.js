const { snakeUpperCase, pascalCase } = require('./mustacheFormatters');

const fs = require('fs');
const mustache = require('mustache');

/**
 * @param {string} templatePath
 * @param {string} outputPath
 * @param {{[p: string]: string | function(): void}} data
 * @returns void
 */
function renderTemplate(templatePath, outputPath, data) {
  try {
    const template = fs.readFileSync(templatePath, 'utf8');

    data = {
      ...data,
      snakeUpperCase: () => snakeUpperCase,
      pascalCase: () => pascalCase,
    };

    const output = mustache.render(template, data);
    fs.writeFileSync(outputPath, output);
  } catch (err) {
    console.error('\x1b[31m Error creating file from template:', err);
  }
}

module.exports = {
  renderTemplate,
};
