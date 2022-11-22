// eslint-disable-next-line
const {withContentlayer} = require('next-contentlayer')

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    redirects: require('./next-redirect'),
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api-docs/:path*',
            },
        ]
    },
}

module.exports = withContentlayer(nextConfig)
