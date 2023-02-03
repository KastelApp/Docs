// eslint-disable-next-line
const {withContentlayer} = require('next-contentlayer')

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    redirects: require('./next-redirect'),
    /*async rewrites() {
        return [
            {
                source: '/developers/:path*',
                destination: '/developers/:path*',
            },
        ]
    },*/
}

module.exports = withContentlayer(nextConfig)
