import {Box, Button, useBoolean, useClipboard} from '@chakra-ui/react'
import React, {useEffect} from 'react'
import Highlight from './highlight'
import theme from 'prism-react-renderer/themes/nightOwl'

//const ReactLiveBlock = dynamic(() => import('./react-live-block'))

function CodeContainer(props) {
    return <Box padding='5' rounded='8px' my='8' bg='#011627' {...props} />
}

function CopyButton({code, ...props}) {
    const {hasCopied, onCopy} = useClipboard(code)

    return (
        <Button
            size='sm'
            position='absolute'
            textTransform='uppercase'
            colorScheme='teal'
            fontSize='xs'
            height='24px'
            top={0}
            zIndex='1'
            right='1.25em'
            {...props}
            onClick={onCopy}
        >
            {hasCopied
                ? 'Copied'
                : 'Copy'}
        </Button>
    )
}

function CodeBlock(props) {
    const [isMounted, {on}] = useBoolean()
    useEffect(
        /**
         * Lazily-load <ReactLiveBlock /> to save bundle size.
         */
        on,
        [on],
    )
    const {
        className,
        live = true,
        manual,
        children,
        viewlines,
        ln,
        mountStylesheet = false,
    } = props.children.props


    const language = className?.replace(/language-/, '')
    const rawCode = children.trim()

    return (
        <Box position='relative' zIndex='0'>
            <CodeContainer px='0' overflow='hidden'>
                <Highlight
                    codeString={rawCode}
                    language={language}
                    theme={theme}
                    metastring={ln}
                    showLines={viewlines}
                />
            </CodeContainer>
            <CopyButton top='4' code={rawCode}/>
        </Box>
    )
}

export default CodeBlock