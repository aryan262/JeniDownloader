const express = require('express');
const { VerifyAudio } = require('../../middleware');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require("ffmpeg-static");
const cp = require("child_process");

ffmpeg.setFfmpegPath(ffmpegStatic);

const Audio = express.Router();

Audio.post('/', VerifyAudio, (req, res) => {
    const { link, duration, contentLength, audioBitrate, socketId } = req.body;

    // Set response headers
    res.setHeader('Content-disposition', 'attachment; filename=audio.mp3');
    res.setHeader('Content-type', 'audio/mp3');

    // Fetch the audio stream
    const Audio = ytdl(link,{agent} ,
        {
        filter: (format) => format.audioQuality && format.contentLength===contentLength,
      });

    let convertedSize = 0;

    const ffmpegProcess = cp.spawn(
        ffmpegStatic,
        [
            '-loglevel', '8',
            '-hide_banner',
            '-i', 'pipe:0',       // Input from the audio stream
            '-t', duration,
            '-c:a', 'libmp3lame', // Convert to MP3
            '-b:a', `${audioBitrate}k`,       // Bitrate
            '-f', 'mp3',          // Output format
            'pipe:1',             // Output to stdout
        ],
        {
            windowsHide: true,
            stdio: ['pipe', 'pipe', 'pipe'],
        }
    );

    Audio.pipe(ffmpegProcess.stdin);

    const MB = 1024 * 1024;
    const io = req.app.get('io');

    ffmpegProcess.stdout.on('data', (chunk) => {
        convertedSize += chunk.length;
        const convertedSizeMB = convertedSize / MB;
        const totalSizeMB = (contentLength * 2) / MB;
        // console.log(`Converted: ${convertedSize} bytes TotalSize: ${totalSize}`);
        io.to(socketId).emit("message", {
            type: "progress",
            convertedSize: convertedSizeMB,
            totalSize: totalSizeMB
        })
    });

    ffmpegProcess.stderr.on('data', (data) => {
        console.error(`FFmpeg error: ${data}`);
    });

    ffmpegProcess.on('close', (code) => {
        console.log(`FFmpeg process exited with code ${code}`);
        res.end();
        io.to(socketId).emit("end", {
            type: "finished"
        })
    });

    ffmpegProcess.stdout.pipe(res);
});

module.exports = Audio;
