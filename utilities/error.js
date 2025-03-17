function handleError(error, message, customMessage) {
    console.error(customMessage, error);
    message.reply(`${customMessage}: ${error.message}`);
}

module.exports = { handleError };
// This module handles errors and sends a reply to the user with the error message