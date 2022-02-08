require("dotenv").config();

import {promises as fsp} from "fs";
import {Industry} from "../db/models";

import {parseTranscript} from "./transcript";

interface Ding {
  time: number;
  speaker: string;
  keyword: string;
  industry: number;
}

async function extract() {
  const industries = await Industry.findAll();
  const file = await fsp.readFile(`${__dirname}/raskin.json`, "utf8");
  const json = parseTranscript(file);

  const dings: Ding[] = [];

  for (const item of json.results.items) {
    for (const industry of industries) {
      if (industry.keywords.includes(item.alternatives[0].content)) {
        // console.log(item);
        // find speaker
        const speaker =
          json.results.speaker_labels.segments
            .find(segment => segment.start_time <= item.start_time && item.end_time <= segment.end_time)
            .speaker_label;
        dings.push({
          time: item.start_time,
          speaker,
          keyword: item.alternatives[0].content,
          industry: industry.id
        })
      }
    }
  }
  
  await fsp.writeFile("./annotated.json", JSON.stringify(dings));
  process.exit();
}

extract();
