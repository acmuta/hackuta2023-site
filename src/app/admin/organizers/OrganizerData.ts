export interface OrganizerData {
	avatar: string
	name: string
	major: string
	socials: {
		github: string
		instagram: string
		linkedIn: string
	}
}

export const organizers: OrganizerData[] = [
	{
		avatar: '/images/Organizers/samantha.png',
		name: 'Samantha Nguyen',
		major: 'Computer Science',
		socials: {
			github: 'neoncitylights',
			instagram: 'starry_flies',
			linkedIn: 'samanthaa-nguyen',
		},
	},
	{
		avatar: 'https://avatars.githubusercontent.com/pxs4528',
		name: 'Parth Sharma',
		major: 'Computer Science',
		socials: {
			github: 'pxs4528',
			instagram: 'parth.sharma2410',
			linkedIn: 'parthsharma0310',
		},
	},
	{
		avatar: '/images/Organizers/ryan.png',
		name: 'Ryan Lahlou',
		major: 'Computer Science',
		socials: {
			github: 'lryanle',
			instagram: 'lryanle',
			linkedIn: 'lryanle',
		},
	},
	{
		avatar: '/images/Organizers/jane.png',
		name: 'Jane Wang',
		major: 'Computer Science, Mathematics',
		socials: {
			github: 'JaneIRL',
			instagram: 'janeirl.dev',
			linkedIn: 'jane-z-w',
		},
	},
]
