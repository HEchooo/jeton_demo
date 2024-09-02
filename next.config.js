/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'mock';
const config = require('./vs.config.json');
const assetPrefix = `${config.aws.HostName}/${config.aws.prefix}/${config.upload.s3Static}`;

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
  images: {
    unoptimized: true,
  },
  env: {
    BUILD_ENV: process.env.NODE_ENV,
    CDN_ENV: `${config.aws.HostName}/${config.aws.prefix}/${config.upload.s3Static}`,
    PROJECT_NAME: '_vs',
    BASE_LINK: 'v1',
    WALLET_PROJECT_ID: 'f3a855e63993e03d0cad20e991f2ca59',
    APP_NAME: process.env.APP_NAME,
    PROJECT_ID: process.env.PROJECT_ID,
  },
  assetPrefix: isDev ? undefined : assetPrefix,
  crossOrigin: 'anonymous'
}
module.exports = nextConfig
