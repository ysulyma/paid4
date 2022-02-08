# paid4

This is an app to [overlay congressional hearings with popups of how much a politician has taken from a given industry](https://twitter.com/KateAronoff/status/1489301696090103814).

The site is at https://www.senate.cash and https://www.congress.cash. The eventual idea is that any time you're watching a hearing on senate.gov or congress.gov, you just change .gov to .cash to see the fun version.

This is still very rough. There's lots to do and lots of ways to contribute!

## Workflow

The process is:

1. `youtube-dl` video from .gov website
2. extract audio with `ffmpeg`
3. upload audio to S3
4. run AWS Transcribe on audio
5. find keywords in transcript
6. label speakers in transcript

1–5 are automated. 6 requires some manual review, but there is a sort-of GUI to make it easier.

## To-Dos: Code

### Features

* get permission to use the OpenSecrets API, or at least their Bulk Data API

* get `youtube-dl` and `ffmpeg` on a Lambda instance??

* add support for live-streamed hearings

* browser extension?

### Improvements

* set up script to regularly scrape hearing data

* make nice backend/GUI for transcript labeling

* make video popups nicer

* make site nicer

* improve mobile display

## To-Dos: Other

* figure out legal stuff

* crowdsource funds for hosting and transcription (AWS Transcribe costs about $1.50 / hour, which adds up quickly).

