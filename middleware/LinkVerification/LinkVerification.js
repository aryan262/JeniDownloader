const ytdl = require("ytdl-core");

const LinkVerification = async(req, res, next) => {
  try {
    const { link } = req.body;
    
    // Check if the link is provided and not just whitespace
    if (!link || !link.trim()) {
      return res.status(400).json({
        message: "Please provide a valid link.",
        ok: false,
      });
    }

    // Validate the YouTube URL
    if (!ytdl.validateURL(link)) {
      return res.status(500).json({
        message: "The provided link is not a valid YouTube URL.",
        ok: false,
      });
    }

    // Proceed to the next middleware if validation passes
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

module.exports = LinkVerification