// eslint-disable-next-line
const {withContentlayer} = require('next-contentlayer')

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    redirects: require('./next-redirect'),
}

module.exports = withContentlayer(nextConfig)
