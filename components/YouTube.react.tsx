"use client";

import Tube from "react-youtube"

export default function YouTube(props: {videoId: string}) {
  return <Tube videoId={props.videoId} />
}
