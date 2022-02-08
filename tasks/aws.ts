require("dotenv").config();

import {StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import * as fs from "fs";

async function uploadMedia(filename: string) {
  const client = new S3Client({region: "us-east-1"});
  const command = new PutObjectCommand({
    Body: fs.createReadStream(`./audio/${filename}.mp4`),
    Bucket: "paid4",
    Key: `audio/${filename}.mp4`
  });

  try {
    const data = await client.send(command);
    console.dir(data);
  } catch (error) {
    console.error(error);
  }
}

async function transcribeAws(filename: string) {
  const client = new TranscribeClient({region: "us-east-1"});

  const command = new StartTranscriptionJobCommand({
    "LanguageCode": "en-US",
    "Media": {
      "MediaFileUri": `s3://paid4/audio/${filename}.mp4`,
    },
    "MediaFormat": "mp4",
    "OutputBucketName": "paid4",
    "OutputKey": `transcripts/${filename}.json`,
    "Settings": {
      "MaxSpeakerLabels": 10,
      "ShowSpeakerLabels": true,
    },
    "TranscriptionJobName": `paid4-${filename}`
  });

  try {
    const data = await client.send(command);
    console.dir(data);
  } catch (error) {
    console.error(error);
  }
}

// uploadMedia("banking011322");
// transcribeAws("banking011322");