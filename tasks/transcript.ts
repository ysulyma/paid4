export interface SpeakerItem {
  start_time: number;
  speaker_label: string;
  end_time: number;
}

export interface Transcript {
  accountId: string;
  jobName: string;
  results: {
    items: {
      start_time: number;
      end_time: number;
      alternatives: {
        confidence: string;
        content: string;
      }[];
      type: "pronunciation";
    }[];
    speaker_labels: {
      speakers: number;
      segments: (SpeakerItem & {
        items: SpeakerItem[];
      })[];
    };
    transcripts: {
      transcript: string;
    }[];
  };
  status: "COMPLETED";
};

export function parseTranscript(file: string) {
  const json = JSON.parse(file) as Transcript;

  for (const segment of json.results.speaker_labels.segments) {
    segment.start_time = parseFloat(segment.start_time as unknown as string);
    segment.end_time = parseFloat(segment.end_time as unknown as string);

    for (const item of segment.items) {
      item.start_time = parseFloat(item.start_time as unknown as string);
      item.end_time = parseFloat(item.end_time as unknown as string);
    }
  }
  for (const item of json.results.items) {
    item.start_time = parseFloat(item.start_time as unknown as string);
    item.end_time = parseFloat(item.end_time as unknown as string);
  }

  return json;
}