import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise';

/**
 * @decription enum type object for limiting field types from library
 * @type {object}
 * @member twoD - represents 2d field
 * @member threeD - represents 3d field
 * @member fourD - represents 4d field
 */
const fieldType = {
    twoD: '2d',
    threeD: '3d',
    fourD: '4d'
}

/**
 * @description given a field type <fieldType> returns initialiser function, defaulting to 2d field
 * @param {string} fieldType - the fieldType intialiser function to return from the switch
 * @returns {function} 
*/
function getFieldGenerator(fieldType) {
    switch(fieldType) {
        case '2d':
            return createNoise2D;
        case '3d':
            return createNoise3D;
        case '4d':
            return createNoise4D;
        default:
            return createNoise2D;
    }
}

const flowField = {
    active: 0,
    amplitude: 0,
    frequency: 0,
    tickRate: 0,
    currentTick: 0,
    field: null
}

function createFlowField(flowField, fieldType, flowOptions) {
    flowField.active = flowOptions.active || 1;
    flowField.amplitude = flowOptions.amplitude || 1;
    flowField.frequency = flowOptions.frequency || 1;
    flowField.tickRate = flowOptions.tickRate || 0.001;

    const generator = getFieldGenerator(fieldType);
    flowField.field = generator();
};

function updateFlowField(flowField) {
    if ( flowField.field === null ) {
        return;
    }
    flowField.currentTick += flowField.tickRate;
}

export { flowField, createFlowField, updateFlowField };