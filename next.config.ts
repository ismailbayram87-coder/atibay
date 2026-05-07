import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repoName = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repoName = `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`;
}

const isStaticExport = process.env.STATIC_EXPORT === 'true' || isGithubActions;

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: isGithubActions ? repoName : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
