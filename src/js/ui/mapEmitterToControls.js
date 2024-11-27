// @ts-nocheck

import { emitterControlsConfig } from './emitterControlsConfig.js';
import { get } from 'lodash-es';

function mapEmitterToControls(emitter) {
    // const controls = document.querySelectorAll('.js-emitter-control-list')[0];

    emitterControlsConfig.forEach((control) => {
        const controlEl = document.querySelectorAll(`[data-modifier="${control.id}"]`)[0];
        const val = control.entityValuePath !== '' ? get(emitter, `${control.entityValuePath}.${control.entityValue}`) : emitter[control.entityValue];
        controlEl.value = val || 0;

        const outputEl = controlEl.closest('.control--panel__item').querySelector('.control--panel__item-output output');
        console.log(outputEl);
        outputEl.value = val;

    });


}

export { mapEmitterToControls };