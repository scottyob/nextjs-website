import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import nextMdx from '@next/mdx'


/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,

    // Experimental mdxRs needs to be OFF to work with remarkFrontmatter
    // plugin to be able to strip the Frontmatter.
    experimental: {
        mdxRs: false,
    },
    
    // This is a static page, no dynamic content
    output: "export"
}

const withMDX = nextMdx({
// these options directly gets passed to `@mdx-js/loader`
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
});
export default withMDX(nextConfig)
