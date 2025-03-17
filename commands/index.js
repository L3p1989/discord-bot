// Import the necessary functions from the 'fs' and 'path' modules
const fs = require("fs");
const path = require("path");

// Create an empty object to store command modules
const commands = {};

// Read the contents of the current directory
fs.readdirSync(__dirname).forEach((file) => {
  // Ignore the 'index.js' file and only process JavaScript files
  if (file !== "index.js" && file.endsWith(".js")) {
    // Require the command module
    const command = require(path.join(__dirname, file));
    // Get the command name by removing the file extension
    const commandName = path.basename(file, ".js");
    // Add the command module to the commands object
    commands[commandName] = command;
  }
});

// Export the commands object for use in other files
module.exports = commands;
