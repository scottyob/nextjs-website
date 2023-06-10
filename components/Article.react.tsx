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
      <Image width={240} src={img} alt="Post picture" className={floatCls + " p-4 pb-0 mb-0"} />
    </div>;
  }

  return (
    <div className="pb-12 clear-both overflow-auto">
      <h2 className={titleFont.className + ' text-2xl mb-4'}>
        <Link href={props.post.path}>{props.post.title}</Link>
      </h2>
      <div className={articleFont.className + 'prose lg:prose-lg mb-9'}>
        {hero}
        <Markdown>{props.post.excerpt}</Markdown>
      </div>
    </div>
  );
}
