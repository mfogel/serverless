'use strict';

const initialParseArgs = require('./initial-parse-args');

module.exports = () => {
  const { commands, options } = initialParseArgs();
  if (options.help) return true;
  if (commands[0] === 'help') return true;
  if (!commands.length && options['help-interactive']) return true;
  return false;
};
