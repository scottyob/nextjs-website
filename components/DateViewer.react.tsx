"use client";

export type Props = {
  date: Date;
}

export default function ViewDate(props: Props) {
  return <span>{props.date.toLocaleString()}</span>;
}
