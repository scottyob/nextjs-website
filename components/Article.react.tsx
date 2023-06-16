import { Post } from '@/lib/posts';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';

const titleFont = DM_Serif_Display({ weight: '400', subsets: ['latin'] });
const articleFont = DM_Sans({ weight: '400', subsets: ['latin'] });

type Props = {
  post: Post;
  imagePlacement: undefined | 'left' | 'right';
}

export default async function Article(props: Props) {
  // Load up the image
  let hero = null;
  if (props.post.hero != null) {
    const floatCls = props.imagePlacement == 'left' ? 'float-left' : 'float-right';
    const img = (
      await import(`/siteContent/posts/${props.post.slug}/${props.post.hero}`)
    ).default;

    hero = <div className="not-prose">
      <Image src={img} alt="Post picture" className={floatCls + " p-4 pb-0 pt-0 mb-0 w-[165px] sm:w-[240px]"} />
    </div>;
  }

  return (
    <div className="pb-12 clear-both overflow-auto mb-8">
      <h2 className={titleFont.className + ' text-2xl'}>
        <Link href={props.post.path}>{props.post.title}</Link>
      </h2>
      <div className="text-xs text-gray-400 italic">
        Created: {props.post.date.toLocaleDateString()}
      </div>
      <div className={articleFont.className + 'prose lg:prose-lg mb-9 mt-5'}>
        {hero}
        <Markdown>{props.post.excerpt}</Markdown>
      </div>
    </div>
  );
}
