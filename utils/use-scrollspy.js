import * as React from 'react'

export function useScrollSpy(
    selectors,
    options,
) {
    const [activeId, setActiveId] = React.useState()
    const observer = React.useRef(null)
    React.useEffect(() => {
        const elements = selectors.map((selector) =>
            document.querySelector(selector),
        )
        observer.current?.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    setActiveId(entry.target.getAttribute('id'))
                }
            })
        }, options)
        elements.forEach((el) => {
            if (el) observer.current?.observe(el)
        })
        return () => observer.current?.disconnect()
    }, [selectors, options])

    return activeId
}