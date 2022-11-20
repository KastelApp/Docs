import PageContainer from '../components/page-container'
import Pagination from '../components/pagination'
import Sidebar from '../components/sidebar/sidebar'
import gettingStartedSidebar from '../config/getting-started.sidebar.json'
import {findRouteByPath, removeFromLast} from '../utils/find-route-by-path'
import {getRouteContext} from '../utils/get-route-context'

export function getRoutes(slug) {
    // for home page, use docs sidebar
    if (slug === '/') {
        return gettingStartedSidebar.routes
    }

    const configMap = {
        '/': gettingStartedSidebar,
    }

    const [, sidebar] =
    Object.entries(configMap).find(([path]) => slug.startsWith(path)) ?? []

    return sidebar?.routes ?? []
}


export default function MDXLayout(props) {
    const {frontmatter, children, hideToc, maxWidth} = props

    const routes = getRoutes(frontmatter.slug)
    const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
    const routeContext = getRouteContext(route, routes)

    return (
        <PageContainer
            hideToc={hideToc}
            maxWidth={maxWidth}
            frontmatter={frontmatter}
            leftSidebar={<Sidebar routes={routes}/>}
            pagination={
                <Pagination
                    next={routeContext.nextRoute}
                    previous={routeContext.prevRoute}
                />
            }
        >
            {children}
        </PageContainer>
    )
}