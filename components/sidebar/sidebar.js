import { Badge, Box, Center, chakra, HStack, List, ListItem, } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import { FaHome, FaTools } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { convertBackticksToInlineCode } from '../../utils/convert-backticks-to-inline-code';
import SidebarCategory from './category';
import SidebarLink from './link';

const sortRoutes = (routes) => {
    return routes.sort(({ title: titleA }, { title: titleB }) => {
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
};

function NewBadge() {
    return (
        <Badge
            ml='2'
            lineHeight='tall'
            fontSize='10px'
            variant='solid'
            colorScheme='purple'
        >
            New
        </Badge>
    );
}

export function SidebarContent({
    routes,
    pathname,
    contentRef,
}) {

    return (
        <>
            {routes.map((lvl1, idx) => {
                return (
                    <Fragment key={idx}>
                        {lvl1.heading && (
                            <chakra.h4
                                fontSize='sm'
                                fontWeight='bold'
                                my='4'
                                textTransform='uppercase'
                                letterSpacing='wider'
                            >
                                {lvl1.title}
                            </chakra.h4>
                        )}

                        {lvl1.routes.map((lvl2, index) => {
                            if (!lvl2.routes) {
                                return (
                                    <SidebarLink ml='-3' mt='2' key={lvl2.path} href={lvl2.path}
                                        isExternal={lvl2.external}>
                                        {lvl2.title}
                                    </SidebarLink>
                                );
                            }

                            const selected = pathname.startsWith(lvl2.path);
                            const opened = selected || lvl2.open;

                            const sortedRoutes = lvl2.sort
                                ? sortRoutes(lvl2.routes)
                                : lvl2.routes;

                            return (
                                <SidebarCategory
                                    contentRef={contentRef}
                                    key={lvl2.path + index}
                                    title={lvl2.title}
                                    selected={selected}
                                    opened={opened}
                                >
                                    {sortedRoutes.map((lvl3) => (
                                        <SidebarLink key={lvl3.path} href={lvl3.path}>
                                            <span>{convertBackticksToInlineCode(lvl3.title)}</span>
                                            {lvl3.new && (
                                                <Badge
                                                    ml='2'
                                                    lineHeight='tall'
                                                    fontSize='10px'
                                                    variant='solid'
                                                    colorScheme='purple'
                                                >
                                                    New
                                                </Badge>
                                            )}
                                        </SidebarLink>
                                    ))}
                                </SidebarCategory>
                            );
                        })}
                    </Fragment>
                );
            })}
        </>
    );
}

const MainNavLink = ({ href, icon, children, isActive }) => {
    const router = useRouter();

    let active = router.asPath.startsWith(href) || !!isActive;

    return (
        <NextLink href={href} passHref>
            <HStack
                spacing='3'
                fontSize='sm'
                fontWeight={active ? 'semibold' : 'medium'}
                color={active ? 'accent' : 'fg-muted'}
                _hover={{ color: active ? undefined : 'fg' }}
            >
                <Center
                    w='6'
                    h='6'
                    borderWidth='1px'
                    bg={active ? 'accent-static' : 'transparent'}
                    borderColor={active ? 'accent-static' : undefined}
                    rounded='base'
                    color={active ? 'white' : 'accent'}
                >
                    {icon}
                </Center>
                <span>{children}</span>
            </HStack>
        </NextLink>
    );
};

// Prod is if it should show in production, only reason its an option is because testing new things, though we dont want to show it to the public yet (ofc if you got the url you can still access the stuff)
export const mainNavLinks = [
    {
        icon: <FaHome />,
        href: '/home',
        label: 'Home',
        prod: true,
    },
    {
        icon: <FaTools />,
        href: '/developers',
        label: 'Developers',
        new: true,
        prod: true,
        match: (asPath, href) =>
            href.startsWith('/developers') &&
            asPath.startsWith('/developers'),
    },
    {
        icon: <FiPackage />,
        href: '/packages',
        label: 'Packages',
        new: true,
        prod: false,
        match: (asPath, href) =>
            href.startsWith('/packages') &&
            asPath.startsWith('/packages'),
    }
];


export const MainNavLinkGroup = (props) => {
    const router = useRouter();

    return (
        <List spacing='4' styleType='none' {...props}>
            {mainNavLinks.map((item) => {

                if (!item.prod && process.env.NODE_ENV === 'production') return null;

                return (
                    <ListItem key={item.label}>
                        <MainNavLink
                            icon={item.icon}
                            href={item.href}
                            label={item.label}
                            isActive={item.match?.(router.asPath, item.href)}
                        >
                            {item.label} {item.new && <NewBadge />}
                        </MainNavLink>
                    </ListItem>
                );
            })}
        </List>
    );
};

const Sidebar = ({ routes }) => {
    const { pathname } = useRouter();
    const ref = useRef(null);

    return (
        <Box
            ref={ref}
            aria-label='Main Navigation'
            as='nav'
            pos='sticky'
            overscrollBehavior='contain'
            top='6.5rem'
            w='280px'
            h='calc(100vh - 8.125rem)'
            pr='8'
            pb='6'
            pl='6'
            pt='4'
            overflowY='auto'
            className='sidebar-content'
            flexShrink={0}
            display={{ base: 'none', md: 'block' }}
        >
            <MainNavLinkGroup mb='10' />
            <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
        </Box>
    );
};

export default Sidebar;