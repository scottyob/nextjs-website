import { glob } from "glob";
import * as matter from 'gray-matter';

export interface Post {
  title: string;
  path: string;
  excerpt: string;
}

export async function getAllPosts() {
  const regex = /^app\/(.*)\/page\.mdx$/;

  let jsfiles = await glob("app/Post/**/*.mdx", { ignore: "node_modules/**" });
  const posts: Post[] = jsfiles.map((file) => {
    const m = matter.read(file, {excerpt: true});
    console.log("Matter: ", m);
    return {
      title: m.data["title"],
      excerpt: m.excerpt || m.content,
      path: "/" + (file.match(regex)?.[1] ?? "") + "/",
    };
  });
  return posts;

}
