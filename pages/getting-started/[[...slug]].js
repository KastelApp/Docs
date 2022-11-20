import { allGuides, Guide } from 'contentlayer/generated'
import { toArray } from '../../utils/index'
import { useMDXComponent } from 'next-contentlayer/hooks'
import {MDXComponents} from "../../components/mdx-components";

export default function GettingStarted({doc}) {
    const Component = useMDXComponent(doc.body.code)

    return (
        <>
            <Component components={MDXComponents} />
        </>
    )
}

export const getStaticPaths = async () => {
    const paths = allGuides
        .map((t) => t._id.replace('getting-started/', '').replace('.mdx', ''))
        .map((id) => ({ params: { slug: id === 'index' ? [] : id.split('/') } }))
    return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
    const params = toArray(ctx.params.slug)
    let doc;
    if (params.length === 0) {
        doc = allGuides.find((t) => t._id === 'getting-started/index.mdx')
    } else {
        doc = allGuides.find((guide) =>
            guide._id.endsWith(`${params.join('/')}.mdx`),
        )
    }
    return { props: { doc } }
}