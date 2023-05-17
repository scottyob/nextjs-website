import { Post } from "@/lib/posts";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import Image from "next/image";

const titleFont = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
const articleFont = DM_Sans({ weight: "400", subsets: ["latin"] });

export default async function Article(props: { post: Post }) {
  // Load up the image
  let hero = null;
  if (props.post.hero != null) {
    const img = (await import(`/siteContent/posts/${props.post.slug}/${props.post.hero}`)).default;
    hero = <Image width={200} src={img} alt="Post picture" />;
  }

  return (
    <div className="">
      <h2 className={titleFont.className + " mb-2 text-2xl"}>
        <Link href={props.post.path}>{props.post.title}</Link>
      </h2>
      <div className={articleFont.className + "prose lg:prose-lg mb-9"}>
        {hero}
        <Markdown>{props.post.excerpt}</Markdown>
      </div>
    </div>
  );
}
