import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import remarkMdxImages from "remark-mdx-images";
import path from "path";

export const ROOT = process.cwd();
export const POSTS_PATH = path.join(process.cwd(), "siteContent/posts");

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};


export const getSinglePost = async (slug: string) => {
  const imagesUrl = `posts/${slug}`;
  const source = `${POSTS_PATH}/${slug}/page.mdx`

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


  //   const {code, frontmatter} = await bundleMDX({
  //     file: `${POSTS_PATH}/${slug}/page.mdx`,
  //     cwd: ROOT
  //   });

  //   const source = getFileContent(`${slug}/page.mdx`);
  // //  const { code, frontmatter } = await getCompiledMDX(source);

  //   return {
  //     frontmatter,
  //     code,
  //   };
};



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
