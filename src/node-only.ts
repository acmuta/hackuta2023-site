if (process?.env?.NEXT_RUNTIME !== 'nodejs') {
	throw new Error(
		`This code can only be run on the Node.js Runtime; encountered '${process?.env?.NEXT_RUNTIME}'.`,
	)
}

export {}
