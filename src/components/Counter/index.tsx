'use client'

import { animate } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { PProps } from 'react-html-props'

const Units = Object.freeze({
	1_000_000_000: 'B',
	1_000_000: 'M',
	1_000: 'K',
})

type CounterProps = PProps & {
	from: number
	to: number
	useUnit?: boolean
}

function onUpdate<T extends Element>(
	value: number,
	node: T | null,
	useUnit?: boolean,
): void {
	if (null !== node) {
		if (useUnit) {
			for (const [baseStr, unit] of Object.entries(Units)) {
				const base = parseInt(baseStr)
				if (value >= base) {
					node.textContent = `${(value / base).toFixed(1)}${unit}`
					return
				}
			}
		}
		node.textContent = value.toFixed(0)
	}
}

export const Counter = ({ from, to, useUnit, ...props }: CounterProps) => {
	const nodeRef = useRef<HTMLParagraphElement>(null)
	useEffect(() => {
		const node = nodeRef.current
		const controls = animate(from, to, {
			duration: 1,
			onUpdate: (value) => onUpdate(value, node, useUnit),
		})
		return () => controls.stop()
	}, [from, to, useUnit])

	return (
		<p ref={nodeRef} {...props}>
			0
		</p>
	)
}
