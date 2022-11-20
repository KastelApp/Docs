import {NextSeo} from 'next-seo'

const SEO = ({title, description}) => (
    <NextSeo
        title={title}
        description={description}
        openGraph={{title, description}}
        titleTemplate={'%s - Kastel App'}
    />
)

export default SEO