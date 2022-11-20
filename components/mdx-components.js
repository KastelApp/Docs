import * as Chakra from '@chakra-ui/react'
import * as React from 'react'
import NextImage from 'next/image'
const { Alert, Box, chakra, Kbd } = Chakra

const LinkedHeading = (props) => (
    <chakra.h2 data-group='' css={{ scrollMarginBlock: '6.875rem' }} {...props}>
        <span className='content'>{props.children}</span>
        {props.id && (
            <chakra.a
                aria-label='anchor'
                color='teal.500'
                fontWeight='normal'
                outline='none'
                _focus={{ opacity: 1, boxShadow: 'outline' }}
                opacity={0}
                _groupHover={{ opacity: 1 }}
                ml='0.375rem'
                href={`#${props.id}`}
            >
                #
            </chakra.a>
        )}
    </chakra.h2>
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
    h1: (props) => <chakra.h1 apply='mdx.h1' {...props} />,
    h2: (props) => <LinkedHeading apply='mdx.h2' {...props} />,
    h3: (props) => <LinkedHeading as='h3' apply='mdx.h3' {...props} />,
    h4: (props) => <LinkedHeading as='h4' apply='mdx.h4' {...props} />,
    hr: (props) => <chakra.hr apply='mdx.hr' {...props} />,
    strong: (props) => <Box as='strong' fontWeight='semibold' {...props} />,
    kbd: Kbd,
    br: ({ reset, ...props }) => (
        <Box
            as={reset ? 'br' : undefined}
            height={reset ? undefined : '24px'}
            {...props}
        />
    ),
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

}