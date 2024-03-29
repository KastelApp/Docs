// eslint-disable-next-line
const {withContentlayer} = require('next-contentlayer')

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    redirects: require('./next-redirect'),
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/home",
            },
        ];
    },
}

module.exports = withContentlayer(nextConfig)
