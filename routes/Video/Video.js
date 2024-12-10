const express = require('express');
const { VerifyVideo } = require('../../middleware');
const ytdl = require('@distube/ytdl-core');
const ffmpegStatic = require('ffmpeg-static');
const cp = require('child_process');
const { agent } = require('../../cookies/cookies')

const Video = express.Router();

Video.post('/', VerifyVideo, (req, res) => {
    const { contentLength, link, duration, socketId } = req.body;

    console.log({
        contentLength: contentLength, 
        link:link, 
        duration:duration, 
        socketId:socketId
    })

    // Set response headers for MKV format
    res.setHeader('Content-Disposition', 'attachment; filename=merged.mkv');
    res.setHeader('Content-Type', 'video/x-matroska');

    let videoStream;
    let audioStream;

    try {
        videoStream = ytdl(link, { agent, filter: (video) => video.contentLength === contentLength });
        audioStream = ytdl(link, { agent, filter: (format) => format.audioQuality === "AUDIO_QUALITY_MEDIUM" });
    } catch (err) {
        return res.status(500).json({ error: `Failed to fetch streams: ${err.message}` });
    }

    let convertedSize = 0;

    const ffmpegProcess = cp.spawn(
        ffmpegStatic,
        [
            '-loglevel', '8',
            '-hide_banner',
            '-i', 'pipe:3',
            '-i', 'pipe:4',
            '-t', duration,
            '-map', '0:a',
            '-map', '1:v',
            '-crf', '23',
            '-c:v', 'copy',
            '-c:a', 'mp2',
            '-b:a', '192k',
            '-ar', '44100',
            '-preset', 'ultrafast',
            '-f', 'matroska',
            'pipe:5',
        ],
        {
            windowsHide: true,
            stdio: ["inherit", "inherit", "inherit", "pipe", "pipe", "pipe"],
        },
    );

    videoStream.pipe(ffmpegProcess.stdio[4]);
    audioStream.pipe(ffmpegProcess.stdio[3]);

    console.log(videoStream)
    console.log(audioStream)

    const MB = 1024 * 1024;

    const io = req.app.get('io');

    ffmpegProcess.stdio[5].on('data', (chunk) => {
        convertedSize += chunk.length;
        const convertedSizeMB = convertedSize / MB;
        const totalSizeMB = (contentLength) / MB;
        console.log(`Converted: ${convertedSizeMB.toFixed(2)} MB Out of ${totalSizeMB.toFixed(2)}`);

        io.to(socketId).emit("message", {
            type: "progress",
            convertedSize: convertedSizeMB,
            totalSize: totalSizeMB
        })

    });

    ffmpegProcess.on('error', (err) => {
        console.error(`FFmpeg error: ${err}`);
        res.status(500).json({ error: `FFmpeg error: ${err.message}` });

        io.to(socketId).emit("end", {
            type: "finished"
        })

    });

    ffmpegProcess.on('close', (code) => {
        console.log(`FFmpeg process exited with code ${code}`);
        res.end();

        io.to(socketId).emit("end", {
            type: "finished"
        })

    });

    ffmpegProcess.stdio[5].pipe(res);
});

module.exports = Video;
