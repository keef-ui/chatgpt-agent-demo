const fs = require('fs').promises; // Using the promises version of fs for async operations
const path = require('path');

/**
 * Reads a file asynchronously and returns its contents as a string.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>} - A promise that resolves with the file content.
 */
async function readFileAsString(filePath) {
    try {
        const absolutePath = path.join(__dirname, filePath);
        const fileContent = await fs.readFile(absolutePath, 'utf8');
        return fileContent;
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        throw err; // Propagate the error to the caller
    }
}

module.exports = readFileAsString;