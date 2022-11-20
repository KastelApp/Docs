import {Badge, Box, chakra, Flex, Icon, Link, Stack} from '@chakra-ui/react'
import {SkipNavContent} from '@chakra-ui/skip-nav'
import {useRouter} from 'next/router'
import * as React from 'react'
//import Footer from 'components/footer'
import SEO from './seo'
import TableOfContent from './table-of-content'
import {convertBackticksToInlineCode} from '../utils/convert-backticks-to-inline-code'
import {MdEdit} from 'react-icons/md'

function useHeadingFocusOnRouteChange() {
    const router = useRouter()

    React.useEffect(() => {
        const onRouteChange = () => {
            const [heading] = Array.from(document.getElementsByTagName('h1'))
            heading?.focus()
        }
        router.events.on('routeChangeComplete', onRouteChange)
        return () => {
            router.events.off('routeChangeComplete', onRouteChange)
        }
    }, [router.events])
}

function PageContainer(props) {
    const {
        frontmatter,
        children,
        leftSidebar,
        rightSidebar,
        pagination,
        hideToc,
        maxWidth = '48rem',
    } = props

    useHeadingFocusOnRouteChange()

    if (!frontmatter) return <></>

    const {title, description, editUrl, version, headings = []} = frontmatter

    return (
        <>
            <SEO title={title} description={description}/>


            <Box as='main' className='main-content' w='full' maxW='8xl' mx='auto'>
                <Box display={{md: 'flex'}}>
                    {leftSidebar || null}
                    <Box flex='1' minW='0'>
                        <SkipNavContent/>
                        <Box id='content' px={5} mx='auto' minH='76vh'>
                            <Flex>
                                <Box
                                    minW='0'
                                    flex='auto'
                                    px={{base: '4', sm: '6', xl: '8'}}
                                    pt='10'
                                >
                                    <Box maxW={maxWidth}>
                                        <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                                            {convertBackticksToInlineCode(title)}
                                        </chakra.h1>
                                        {version && (
                                            <Badge colorScheme='teal' letterSpacing='wider'>
                                                v{version}
                                            </Badge>
                                        )}
                                        {children}
                                        <Box mt='40px'>
                                            <Box>{editUrl && <Link href={editUrl} isExternal>
                                                <Stack
                                                    fontSize='sm'
                                                    textAlign='right'
                                                    display='inline-flex'
                                                    direction='row'
                                                    spacing={1}
                                                    align='center'
                                                    opacity={0.7}
                                                >
                                                    <Icon as={MdEdit} mr='1'/>
                                                    <chakra.span>
                                                        Edit this page on GitHub
                                                    </chakra.span>
                                                </Stack>
                                            </Link>}</Box>
                                            {pagination || null}
                                        </Box>
                                        <Box pb='20'>
                                            {/*<Footer />*/}
                                        </Box>
                                    </Box>
                                </Box>
                                {!hideToc && (
                                    <TableOfContent
                                        visibility={headings.length === 0 ? 'hidden' : 'initial'}
                                        headings={headings}
                                    />
                                )}
                                {rightSidebar}
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default PageContainer