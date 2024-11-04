const killConditions = {
    boundaryCheck: true,
    boundaryOffset: 0,
    boundaryParts: {
        all: true,
        top: true,
        right: true,
        bottom: true,
        left: true
    },
    colorCheck: [{ name: 'a', value: 0}],
    perAttribute: [{ name: 'r', value: 0 }, { name: 'currLife', value: 0 }],
    linkedEvent: false
};

export { killConditions };