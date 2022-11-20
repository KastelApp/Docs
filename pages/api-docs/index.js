import {allAPIs} from 'contentlayer/generated'
import {useMDXComponent} from 'next-contentlayer/hooks'
import {MDXComponents} from "../../components/mdx-components";
import MDXLayout from "../../layout";

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

export const getStaticProps = async (ctx) => {
    let doc = allAPIs.find((t) => t._id === 'api/index.mdx');

    return {props: {doc}}
}