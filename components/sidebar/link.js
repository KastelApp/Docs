import {chakra, Flex, useColorModeValue} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {forwardRef, useEffect, useRef} from 'react'
import NextLink from 'next/link'

const StyledLink = forwardRef(function StyledLink(
    props,
    ref,
) {
    const {link, isActive, isExternal, ...rest} = props

    return (
        <chakra.a
            as={NextLink}
            target={isExternal ? '_blank' : undefined}
            href={link}
            aria-current={isActive ? 'page' : undefined}
            width='100%'
            px='3'
            py='1'
            rounded='md'
            ref={ref}
            fontSize='sm'
            fontWeight='500'
            color='fg'
            transition='all 0.2s'
            _activeLink={{
                bg: useColorModeValue('purple.200', 'purple.900'),
                color: 'accent-emphasis',
                fontWeight: '600',
            }}
            {...rest}
        />

    )
})


function checkHref(href, slug) {

    return href === slug

    // changed for now
    // const _slug = Array.isArray(slug) ? slug : [slug]
    // const path = href.split('/')
    // const pathSlug = path[path.length - 1]
    // return _slug.includes(pathSlug)
}

const SidebarLink = ({href, children, isExternal = false, ...rest}) => {
    const router = useRouter()
    const isActive = checkHref(href, router.query.slug) || href === router.asPath

    const link = useRef()

    useEffect(() => {
        if (isActive && router.query.scroll === 'true') {
            link.current.scrollIntoView({block: 'center'})
        }
    }, [isActive, router.query])

    return (
        <Flex align='center' userSelect='none' lineHeight='tall' {...rest}>
            <StyledLink isActive={isActive} link={href} isExternal={isExternal}>
                {children}
            </StyledLink>
        </Flex>
    )
}
export default SidebarLink