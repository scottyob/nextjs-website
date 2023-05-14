import { Post } from "@/lib/posts";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Link from "next/link";

const titleFont = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
const articleFont = DM_Sans({ weight: "400", subsets: ["latin"] });

export default function Article(props: { post: Post }) {

  return (
    <div>
      <h2 className={titleFont.className + " mb-2 text-2xl"}>
        <Link href={props.post.path}>{props.post.title}</Link>
      </h2>
      <div className={articleFont.className + " mb-9"}>
        {props.post.excerpt}
      </div>
    </div>
  );
}
