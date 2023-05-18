import {allAPIs} from 'contentlayer/generated'
import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from "../../components/mdx-components";
import MDXLayout from "../../layout";
import {toArray} from '../../utils/index'

export default function Home({doc}) {
    const Component = useMDXComponent(doc.body.code)

    return (
        <>
            <MDXLayout frontmatter={doc.frontMatter}>
                <Component components={MDXComponents}/>
            </MDXLayout>
        </>
    )
}

export const getStaticPaths = async () => {
    const paths = allAPIs
        .map((t) => t._id.replace('developers/', '').replace('.mdx', ''))
        .map((id) => ({params: {slug: id === 'index' ? [] : id.split('/')}}))
    return {paths, fallback: false}
}

export const getStaticProps = async (ctx) => {
    const params = toArray(ctx.params.slug)

    let doc;
    if (params.length === 0) {
        doc = allAPIs.find((t) => t._id === 'developers/index.mdx')
    } else {
        doc = allAPIs.find((guide) => guide._id.endsWith(`${params.join('/')}.mdx`))
    }
    return {props: {doc}}
}