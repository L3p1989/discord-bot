// Define a function to handle errors
function handleError(error, message, customMessage) {
  console.error(customMessage, error); // Log the custom message and error to the console
  message.reply(`${customMessage}: ${error.message}`); // Reply to the user with the custom message and error message
}

// Export the handleError function for use in other files
module.exports = { handleError };
