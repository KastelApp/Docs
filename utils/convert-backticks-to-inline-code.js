import { isObject } from '@chakra-ui/utils'
import { MDXComponents } from 'components/mdx-components'

/**
 * Replace the code blocks wrapped in backticks
 * with inline code blocks.
 */

function toInlineCode(input) {
    return input
        .split(/(`\w+`)/)
        .map((chunk) =>
            chunk.startsWith('`') && chunk.endsWith('`') ? (
                <MDXComponents.code key={chunk}>
                    {chunk.slice(1, -1)}
                </MDXComponents.code>
            ) : (
                chunk
            ),
        )
}

export function convertBackticksToInlineCode(input) {
    if (!input) return ''
    return isObject(input) ? input : toInlineCode(input)
}