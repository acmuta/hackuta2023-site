if (
	process?.env?.NEXT_RUNTIME !== 'edge'
	&& process?.env?.NEXT_RUNTIME !== 'experimental-edge'
) {
	throw new Error(
		`This code can only be run on the Edge Runtime; encountered '${process?.env?.NEXT_RUNTIME}'.`,
	)
}

export {}
