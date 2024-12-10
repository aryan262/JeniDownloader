const ytdl = require('@distube/ytdl-core');

const VerifyAudio = async (req, res, next) => {
  try {
    const { contentLength, link, duration, audioBitrate, socketId } = req.body;

    // Check if the link, duration, and itag are provided
    if (!link || !duration || !contentLength || !audioBitrate || !socketId) {
      return res.status(400).json({
        message: "Please provide valid link, duration, contentLength, socketId and audioBitrate",
        ok: false,
      });
    }

    // Proceed to the next middleware
    next();

  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      message: "An error occurred while validating the link.",
      error: error.message,
      ok: false,
    });
  }
};

module.exports = VerifyAudio;
