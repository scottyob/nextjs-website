import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import remarkMdxImages from "remark-mdx-images";
import path from "path";
import { Flight } from "./flying";

export const ROOT = process.cwd();
export const POSTS_PATH = path.join(process.cwd(), "siteContent/posts");

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

export async function LoadMdx(imagesUrl: string, source: string) {
  const { code, frontmatter } = await bundleMDX({
    file: source,
    cwd: ROOT,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMdxImages,
      ]

      return options;
    },
    esbuildOptions: options => {
      options.outdir = path.join(process.cwd(), "public", imagesUrl);
      options.target = "es6";
      options.platform = "node";
      // options.target = "es5";
      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".mp4": "file",
        ".bin": "file",
        ".gif": "file",
        ".pdf": "file",
        ".zip": "file",
      };
      options.publicPath = `/${imagesUrl}`;
      options.write = true;

      return options;
    }
  });

  return {
    frontmatter,
    code,
  }

}

export const getSinglePost = async (slug: string) => {
  const imagesUrl = `posts/${slug}`;
  const source = `${POSTS_PATH}/${slug}/page.mdx`

  return await LoadMdx(imagesUrl, source);
};


export async function getSingleFlight(flight: Flight) {
  if(!flight.commentsFileName) {
    throw new Error("Cannot get MDX flight as no file name in flight");
  }
  const imagesUrl = `flights/${flight.number}`;
  const source = flight.commentsFileName;

  return await LoadMdx(imagesUrl, source);
}


export const getAllPosts = () => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = getFileContent(fileName);
      const slug = fileName.replace(/\.mdx?$/, "");
      const { data } = matter(source);

      return {
        frontmatter: data,
        slug: slug,
      };
    });
};
