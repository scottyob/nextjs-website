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
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  webpack(config, options) {
    const { isServer } = options;
    const prefix = nextConfig.assetPrefix || '';
    const basePath = nextConfig.basePath || '';

    config.module.rules.push({
      test: /\.(zip|mp4|bin|pdf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `${prefix || basePath}/_next/static/`,
            outputPath: `${isServer ? '../' : ''}static/`,
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });

    return config;
  }
}

const withMDX = nextMdx({
  // these options directly gets passed to `@mdx-js/loader`
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
});
export default withMDX(nextConfig)
