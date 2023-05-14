import { glob } from "glob";
import * as matter from 'gray-matter';

export interface Post {
  title: string;
  path: string;
  excerpt: string;
}

export interface PostFrontmatter {
  title: string;
}

export async function getAllPosts() {
  const regex = /^posts\/(.*)\/page\.mdx$/;

  let jsfiles = await glob("posts/**/*.mdx", { ignore: "node_modules/**" });
  const posts: Post[] = jsfiles.map((file) => {
    const m = matter.read(file, {excerpt: true});
    return {
      title: m.data["title"],
      excerpt: m.excerpt || m.content,
      path: "/post/" + (file.match(regex)?.[1] ?? "") + "/",
    };
  });
  return posts;

}
