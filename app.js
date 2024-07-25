const express = require('express')
const app = express()
const Hls = require('hls.js');
const NodeMediaServer = require('node-media-server');
const fs = require('fs');
const axios = require('axios');
const ytdl = require('ytdl-core');
const ffmpegPath = require('ffmpeg-static').path;
const ffmpeg = require('fluent-ffmpeg');
const { spawn } = require('child_process');


app.get('/', function (req, res) {
    res.send('Hello World')
})

// const hlsUrl = '';
// const hls = new Hls();

// hls.loadSource(hlsUrl);
// hls.on(Hls.Events.MANIFEST_PARSED, function() {
//     const tsSegments = hls.media().segments.list;
//     // Download the segments
// });

// const config = {
//     rtmp: {
//         port: 1935,
//         chunk_size: 60000,
//         gop_cache: true,
//         ping: 60,
//         ping_timeout: 30
//     },
//     http: {
//         port: 8000,
//         mediaroot: './media',
//         allow_origin: '*'
//     },
// };

// const nms = new NodeMediaServer(config);
// nms.run();



// async function downloadHLS(url) {
//     const response = await axios.get(url);
//     const segments = response.data
//       .split("\n")
//       .filter((line) => line.trim().endsWith(".ts"));
//     console.log(segments);
//     for (let segment of segments) {
//       // console.log(segmentResponse);
//       const segmentUrl = new URL(segment, url).href;
//       const segmentResponse = await axios.get(segmentUrl, {
//         responseType: "stream",
//       });
//       const writer = fs.createWriteStream(
//         `/downloads/${segment.split("/").pop()}`
//       );
//       return new Promise((resolve, reject) => {
//         segmentResponse.data.pipe(writer);
//         let error = null;
//         writer.on("error", (err) => {
//           error = err;
//           writer.close();
//           reject(err);
//         });
//         writer.on("close", () => {
//           if (!error) {
//             resolve(true);
//           }
//           //no need to call the reject here, as it will have been called in the
//           //'error' stream;
//         });
//       });
//     }
//   }

//   downloadHLS(
//     ""
//   );

// async function downloadVideo(url, outputPath) {
//     try {
//         const response = await axios({
//             method: 'GET',
//             url: url,
//             responseType: 'stream'
//         });

//         const writer = fs.createWriteStream(outputPath);
//         response.data.pipe(writer);

//         return new Promise((resolve, reject) => {
//             writer.on('finish', resolve);
//             writer.on('error', reject);
//         });
//     } catch (error) {
//         console.error('Error downloading video:', error);
//         throw error;
//     }
// }

// // Example usage:
// const LiveStreamURL = ''; // Replace with actual  live stream URL
// const outputFilePath = './downloaded_video.mp4'; // Output file path

// downloadVideo(LiveStreamURL, outputFilePath)
//     .then(() => {
//         console.log('Video downloaded successfully');
//     })
//     .catch((err) => {
//         console.error('Error downloading video:', err);
//     });



// try {

//     // YouTube live video URL
//     const videoUrl = '';

//     // Output file path
//     const outputFilePath = 'output.mp4';

//     // Download video and audio streams
//     ytdl.getInfo(videoUrl, (err, info) => {
//         if (err) throw err;
//         console.log("videoUrl==============", videoUrl);
//         // Find the video and audio streams
//         const videoStream = ytdl(videoUrl, {
//             quality: 'highestvideo',
//         });
//         const audioStream = ytdl(videoUrl, {
//             quality: 'highestaudio',
//         });

//         // Start ffmpeg process
//         ffmpeg(videoStream)
//             .input(audioStream)
//             .setFfmpegPath(ffmpegPath)
//             .outputOptions('-c:v copy')
//             .outputOptions('-c:a aac')
//             .on('error', (err) => {
//                 console.error('Error during ffmpeg processing:', err);
//             })
//             .on('end', () => {
//                 console.log('Processing finished !');
//             })
//             .save(outputFilePath);
//     });
// } catch (error) {
//     console.log("ddddddddddddddddd", error);
// }


// const config = {
//     rtmp: {
//         port: 1935,
//         chunk_size: 60000,
//         gop_cache: true,
//         ping: 30,
//         ping_timeout: 60,
//     },
//     http: {
//         port: 8000,
//         allow_origin: '*',
//     },
// };

// const nms = new NodeMediaServer(config);
// nms.run();



// const { spawn } = require('child_process');

// const streamUrl = '
// const outputFilePath = 'output.mp4'; // Replace with your desired output file path

// let test = spawn('ffmpeg', [
//     '-i', streamUrl,
//     '-c', 'copy',
//     outputFilePath
// ]);

// test.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

// test.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
// });

// test.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });

// const ss = spawn('ffmpeg', [
//     '-i', streamUrl,
//     '-c', 'copy',
//     '-acodec', 'copy', // Copy audio codec
//     outputFilePath
//   ]);




// async function downloadLiveStream(videoUrl, outputFilePath) {
//     try {
//       // Fetch the video stream data (hypothetical example)
//       const response = await axios.get(videoUrl, { responseType: 'stream' });

//       // Write the video stream to a file
//       const writer = fs.createWriteStream(outputFilePath);
//       response.data.pipe(writer);

//       // Optional: If using ffmpeg for audio (make sure ffmpeg is installed and accessible)
//       const ffmpegProcess = spawn(ffmpegPath , [
//         '-i', videoUrl,
//         '-c', 'copy',
//         '-acodec', 'copy', // Copy audio codec
//         outputFilePath
//       ]);

//       ffmpegProcess.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//       });

//       ffmpegProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//       });

//       ffmpegProcess.on('close', (code) => {
//         console.log(`child process exited with code ${code}`);
//       });

//       // Wait for ffmpeg process to finish
//       await new Promise((resolve, reject) => {
//         ffmpegProcess.on('close', resolve);
//         ffmpegProcess.on('error', reject);
//       });

//       console.log('Download complete!');
//     } catch (error) {
//       console.error('Error downloading live stream:', error);
//     }
//   }

//   // Example usage (hypothetical URL and output path)
//   const liveStreamUrl = ''; // Replace with actual live stream URL
//   const outputFilePath = 'test.mp4';

//   downloadLiveStream(liveStreamUrl, outputFilePath);



// const Ffmpeg = require("fluent-ffmpeg");

// const videoUrl = "";
// const outputFilePath = `test_123.mp4`;

// // Start ffmpeg process
// Ffmpeg(videoUrl)
//     .inputOptions('-protocol_whitelist', 'file,http,https,tcp,tls')
//     .outputOptions('-c:v copy')
//     .outputOptions('-c:a aac')
//     .on('start', (commandLine) => {
//         console.log('FFmpeg command: ', commandLine,new Date());
//     })
//     .on('codecData', (data) => {
//         console.log('Input is ' + data.audio + ' audio ' +
//                     'with ' + data.video + ' video');
//     })
//     .on('error', (err) => {
//         console.error('Error during ffmpeg processing:', err);
//     })
//     .on('end', () => {
//         console.log('Processing finished!',new Date());
//     })
//     .save(outputFilePath);



















app.listen(3000)