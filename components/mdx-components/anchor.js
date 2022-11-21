import {chakra} from '@chakra-ui/react'
import * as React from 'react'

// eslint-disable-next-line
export const Anchor = React.forwardRef((props, ref) => (
    <chakra.a ref={ref} apply='mdx.a' {...props} />
))