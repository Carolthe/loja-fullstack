// @ts-check
const ControllerBase = require("./ControllerBase");
const UploadsService = require("../services/UploadsService");
const UploadFileInput = require("../input/Uploads/UploadFileInput");

class UploadsController extends ControllerBase {
  constructor() {
    super();
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async uploadImage(req, res) {
    try {
      const file = UploadFileInput.fromRequest(req);
      const upload = await UploadsService.uploadImage(file);
      return res.status(200).json(upload);
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

module.exports = new UploadsController();
