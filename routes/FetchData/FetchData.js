const express = require('express');
const { LinkVerification } = require('../../middleware');
const ytdl = require('@distube/ytdl-core');
// const ytdl = require('ytdl-core');
const {agent} = require('../../cookies/cookies')

const FetchData = express.Router();

FetchData.post('/', LinkVerification, async (req, res) => {
    try {
        const { link } = req.body;
        const response = await ytdl.getInfo(link,{agent});

        const videoInfo = {
            title: response.videoDetails.title,
            duration: response.videoDetails.lengthSeconds,
            viewCount: response.videoDetails.viewCount,
            videoId: response.videoDetails.videoId,
            link:response.videoDetails.video_url
        };

        const videoFormats = response.formats
            .filter(format => format.hasVideo)
            .map(video => ({
                quality: video.qualityLabel,
                contentLength: video.contentLength,
                videoBitrate:video.bitrate
            }))
            .filter(format => format.contentLength) // Ensure all values exist
            .sort((a, b) => (b.contentLength || 0) - (a.contentLength || 0)); // Sort by contentLength in descending order

        const audioFormats = response.formats
            .filter(format => !format.hasVideo && format.hasAudio)
            .map(audio => ({
                quality: audio.audioQuality,
                audioBitrate:audio.audioBitrate,
                contentLength: audio.contentLength
            }))
            .filter(format => format.contentLength) // Ensure all values exist
            .sort((a, b) => (b.contentLength || 0) - (a.contentLength || 0)); // Sort by contentLength in descending order


        const io = req.app.get('io');
        io.emit('message', 'Hello from /fetchdata route');

        return res.status(200).json({
            ok: true,
            data: {
                videoInfo,
                audioFormats,
                videoFormats,
            }
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
});

module.exports = FetchData;
