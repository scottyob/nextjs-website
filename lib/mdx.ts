import * as glob from 'glob';
import {bundleMDX} from 'mdx-bundler';

/**
 * MDX File Helpers
 *
 * With blog content being mdx files spread across many directories and files,
 * this module contains a bunch of helper functions to be able to load blog
 * content dynamically
 */

type MdContents = {
  code: string;
  frontmatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export type Post = MdContents & {
  url: string; // Post URL
}

/**
 * Finds all .md in the "content/posts" directory.  Will return both the
 * md files in this directory, as well as any index.mdx files in sub-directories
 */
export function getMarkdownFilenames(): string[] {
  let files = glob.sync('content/posts/*.md');
  files = [...files, ...glob.sync('content/posts/*/*.md')];
  return files;
}

/**
 * Reads and parses all of the posts MD contents.
 *
 * @returns List of posts MD contents
 */
export async function getPosts(): Promise<Post[]> {
  const filenames = getMarkdownFilenames();

  const processing: Array<Promise<MdContents>> = [];
  filenames.forEach((f) => {
    processing.push(
        bundleMDX({
          cwd: process.cwd(),
          file: f,
        })
    );
  });

  const results = await Promise.all(processing);
  return results.map((result, i) => ({
    ...result,
    url: filenames[i]
        .replace('/index.md', '')
        .replace('.md', '')
        .replace('content/posts/', ''),
  }));
}
