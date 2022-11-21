import {chakra} from '@chakra-ui/react'
import BaseHighlight, {defaultProps,} from 'prism-react-renderer'
import React from 'react'

const liveEditorStyle = {
    fontSize: 14,
    overflowX: 'auto',
    fontFamily: 'SF Mono, Menlo, monospace',
}
const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta) => {
    if (!RE.test(meta)) {
        return () => false
    }
    const lineNumbers = RE.exec(meta)[1]
        .split(`,`)
        .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))

    return (index) => {
        const lineNumber = index + 1
        return lineNumbers.some(([start, end]) =>
            end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
        )
    }
}


function Highlight({
                       codeString,
                       language,
                       metastring,
                       showLines,
                       ...props
                   }) {
    const shouldHighlightLine = calculateLinesToHighlight(metastring)

    return (
        <BaseHighlight
            {...defaultProps}
            code={codeString}
            language={language}
            {...props}
        >
            {({className, style, tokens, getLineProps, getTokenProps}) => (
                <div style={liveEditorStyle} data-language={language}>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
                const lineProps = getLineProps({line, key: i})
                return (
                    <chakra.div
                        key={i}
                        px='5'
                        bg={shouldHighlightLine(i) ? 'whiteAlpha.200' : undefined}
                        {...lineProps}
                    >
                        {showLines && (
                            <chakra.span opacity={0.3} mr='6' fontSize='xs'>
                                {i + 1}
                            </chakra.span>
                        )}
                        {line.map((token, key) => (
                            <span key={key} {...getTokenProps({token, key})} />
                        ))}
                    </chakra.div>
                )
            })}
          </pre>
                </div>
            )}
        </BaseHighlight>
    )
}

export default Highlight