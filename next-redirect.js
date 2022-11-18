async function redirect() {
    return [
        {
            source: '/discord',
            destination: 'https://discord.gg/f5HgvkRbVP',
            permanent: true,
        },
        {
            source: '/github',
            destination: 'https://github.com/Kastelll',
            permanent: true,
        },
        {
            source: '/app',
            destination: 'https://beta.kastelapp.com',
            permanent: true,
        }
    ]
}

module.exports = redirect