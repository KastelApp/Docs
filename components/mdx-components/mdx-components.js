import * as Chakra from '@chakra-ui/react'
import * as React from 'react'
import NextImage from 'next/image'
import {Code} from "./code";
import {ColorPalette, ColorPalettes, ColorWrapper} from "./color-palette";
import CodeBlock from "./code-block/codeblock";
import {Pre} from "./pre";
import {Anchor} from "./anchor";
const {Alert, Box, chakra, Kbd, Link} = Chakra

const LinkedHeading = (props) => (
    <chakra.h2 data-group='' css={{scrollMarginBlock: '6.875rem'}} {...props}>
        <span className='content'>{props.children}</span>
        {props.id && (
            <chakra.a
                aria-label='anchor'
                color='teal.500'
                fontWeight='normal'
                outline='none'
                _focus={{opacity: 1, boxShadow: 'outline'}}
                opacity={0}
                _groupHover={{opacity: 1}}
                ml='0.375rem'
                href={`#${props.id}`}
            >
                #
            </chakra.a>
        )}
    </chakra.h2>
)

 const Table = (props) => (
    <chakra.div overflowX='auto'>
        <chakra.table textAlign='left' mt='32px' width='full' {...props} />
    </chakra.div>
)

 const THead = (props) => (
    <chakra.th
        bg='gray.50'
        _dark={{ bg: 'whiteAlpha.100' }}
        fontWeight='semibold'
        p={2}
        fontSize='sm'
        {...props}
    />
)

 const TData = (props) => (
    <chakra.td
        p={2}
        borderTopWidth='1px'
        borderColor='inherit'
        fontSize='sm'
        whiteSpace='normal'
        {...props}
    />
)

export const MDXComponents = {
    ...Chakra,
    Image: (props) => (
        <Box my='5'>
            <NextImage
                layout='responsive'
                width={700}
                height={400}
                objectFit='contain'
                {...props}
            />
        </Box>
    ),
    LinkedImage: ({ href, ...props }) => (
        <Link display='block' my='10' href={href} isExternal>
            <MDXComponents.Image {...props} />
        </Link>
    ),
    h1: (props) => <chakra.h1 apply='mdx.h1' {...props} />,
    h2: (props) => <LinkedHeading apply='mdx.h2' {...props} />,
    h3: (props) => <LinkedHeading as='h3' apply='mdx.h3' {...props} />,
    h4: (props) => <LinkedHeading as='h4' apply='mdx.h4' {...props} />,
    hr: (props) => <chakra.hr apply='mdx.hr' {...props} />,
    strong: (props) => <Box as='strong' fontWeight='semibold' {...props} />,
    code: Code,
    pre: (props) => {
        if (typeof props.children === 'string') return <Pre {...props} />
        return <CodeBlock {...props} />
    },
    kbd: Kbd,
    br: ({ reset, ...props }) => (
        <Box
            as={reset ? 'br' : undefined}
            height={reset ? undefined : '24px'}
            {...props}
        />
    ),
    table: Table,
    th: THead,
    td: TData,
    a: Anchor,
    p: (props) => <chakra.p apply='mdx.p' {...props} />,
    ul: (props) => <chakra.ul apply='mdx.ul' {...props} />,
    ol: (props) => <chakra.ol apply='mdx.ul' {...props} />,
    li: (props) => <chakra.li pb='4px' {...props} />,
    blockquote: (props) => (
        <Alert
            mt='4'
            role='none'
            status='warning'
            variant='left-accent'
            as='blockquote'
            rounded='4px'
            my='1.5rem'
            {...props}
        />
    ),
    ColorPalette,
    ColorPalettes,
    ColorWrapper,

}