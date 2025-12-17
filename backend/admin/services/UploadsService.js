// @ts-check
const fs = require("fs");
const LogError = require("../utils/LogError");

class UploadsService {
  /**
   * @param {string} filePath
   * @returns {string}
   */
  getTempFileUrl(filePath) {
    return `${process.env.APP_ASSETS_URL}/temp/${filePath}`;
  }

  /**
   * @param {string} filePath
   * @returns {string}
   */
  getPermanentFileUrl(filePath) {
    return `${process.env.APP_ASSETS_URL}/uploads/${filePath}`;
  }

  /**
   * @param {string} url
   * @returns {string}
   */
  getTempFilePathFromUrl(url) {
    return url.replace(`${process.env.APP_ASSETS_URL}/temp/`, "");
  }

  /**
   * @param {string} filePath
   * @returns {string}
   */
  getPermanentFilePathFromUrl(filePath, folderName = "") {
    return filePath.replace(`/temp/`, `/uploads/${folderName}/`);
  }

  /**
   * @param {string} filePath
   * @returns {Date}
   */
  deleteTempFiles(filePath, validUntil = 20) {
    setTimeout(() => {
      fs.unlink(`${__dirname}../../../public/temp/${filePath}`, (err) => {
        if (err) {
          console.error("Erro ao remover arquivo temporário:", err.message);
        }
      });
    }, validUntil * 60 * 1000);
    return new Date(Date.now() + validUntil * 60 * 1000);
  }

  /**
   * @param {Express.Multer.File} file
   * @returns {Promise<{url: string, expiresAt: Date}>}
   */
  async uploadImage(file) {
    const expiresAt = this.deleteTempFiles(file.filename);
    return {
      url: this.getTempFileUrl(file.filename),
      expiresAt: expiresAt,
    };
  }

  /**
   * @param {string} folderName
   * @param {string} fileName
   */
  async makeUploadPermanent(folderName, fileName) {
    const tempPath = `${__dirname}../../../public/temp/${fileName}`;
    const permanentDir = `${__dirname}../../../public/uploads/${folderName}`;
    const permanentPath = `${permanentDir}/${fileName}`;
    if (!fs.existsSync(permanentDir)) {
      fs.mkdirSync(permanentDir, { recursive: true });
    }
    fs.copyFile(tempPath, permanentPath, (err) => {
      if (!err) {
        return;
      }
      LogError.log(err, fileName);
    });
  }
}

module.exports = new UploadsService();
