const fs = require("fs");

class LogError {
  /**
   *
   * @param {Error} error
   * @param {string} filename
   */
  static log(error, filename) {
    // Verifica se o arquivo de log existe, se não, cria um novo
    const logFilePath = "./admin/logs/error.log";
    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, "");
    }

    // Agora que o arquivo existe, podemos escrever nele
    const logMessage = `[${new Date().toISOString()}] Error in ${filename}: ${
      error.message
    }\n`;
    fs.appendFileSync(logFilePath, logMessage);
    const stackTrace = error.stack ? error.stack : "No stack trace available";
    fs.appendFileSync(logFilePath, stackTrace + "\n\n");
  }
}

module.exports = LogError;
