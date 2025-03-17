const fs = require('fs');
const path = require('path');

const commands = {};

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js' && file.endsWith('.js')) {
        const command = require(path.join(__dirname, file));
        const commandName = path.basename(file, '.js');
        commands[commandName] = command;
    }
});

module.exports = commands;