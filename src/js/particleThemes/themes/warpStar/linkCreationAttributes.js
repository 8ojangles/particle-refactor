const linkCreationAttributes = [
	{	
		type: 'map',
		function: 'linear',
		src: 'velAcceleration',
		srcValue: 'acceleration',
		target: 'targetRadius',
		attr: 'targetRadius'
	},
	{	
		type: 'map',
		function: 'linear',
		src: 'velAcceleration',
		srcValue: 'acceleration',
		target: 'radius',
		attr: 'initR'
	}
];

export { linkCreationAttributes };