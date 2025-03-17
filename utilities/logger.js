// Import the necessary functions and classes from the 'winston' library
const { createLogger, format, transports } = require('winston');

// Create a logger instance with specified configuration
const logger = createLogger({
    level: 'info', // Set the logging level to 'info'
    format: format.combine( // Combine multiple formatting options
        format.timestamp(), // Add a timestamp to each log message
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`) // Format the log message
    ),
    transports: [
        new transports.Console(), // Log messages to the console
        new transports.File({ filename: 'bot.log' }) // Log messages to a file named 'bot.log'
    ]
});

// Export the logger instance for use in other files
module.exports = logger;