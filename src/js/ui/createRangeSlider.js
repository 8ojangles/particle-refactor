function setMultiElAttributes(el, attributes) {
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
}


function createRangeSlider(parentEl, options) {

    const { id, title, min, max, step, multiplier, controller, flipped, label1, label2, initVal, entityValuePath, entityValue } = options;

    const inputAttributes = {
        'type': 'range',
        'class': `range-slider${flipped ? ' range-flipped' : ''}`,
        'id': id,
        'name': id,
        'min': min,
        'max': max,
        'step': step,
        'data-modifier': id,
        'data-value-multiplier': multiplier ? multiplier : 1,
        'data-control': controller,
        'data-control-attribute-path': entityValuePath || null,
        'data-control-attribute-value': entityValue
    };

    const newRangeSlider = document.createElement('input');
    setMultiElAttributes(newRangeSlider, inputAttributes);

    newRangeSlider.value = initVal || '0';

    const newControlItem = document.createElement('div');
    newControlItem.setAttribute('class', 'control--panel__item');

    const newControlItemHeader = document.createElement('div');
    newControlItemHeader.setAttribute('class', 'control--panel__item-header');

    const newControlItemControls = document.createElement('div');
    newControlItemControls.setAttribute('class', 'control--panel__item-controls');

    // create and construct the label element
    const newControlItemLabels = document.createElement('div');
    newControlItemLabels.setAttribute('class', 'control--panel__item-labels');

    const newControlItemLabel1 = document.createElement('label');
    newControlItemLabel1.setAttribute('for', id);
    newControlItemLabel1.innerHTML = min;

    const newControlItemLabel2 = document.createElement('label');
    newControlItemLabel2.setAttribute('for', id);
    newControlItemLabel2.innerHTML = max;

    newControlItemLabels.appendChild(newControlItemLabel1);
    newControlItemLabels.appendChild(newControlItemLabel2);

    // create and construct the output element
    const newControlItemOutput = document.createElement('div');
    newControlItemOutput.setAttribute('class', 'control--panel__item-output');

    const newOutput = document.createElement('output');
    newOutput.setAttribute('for', id);
    newOutput.innerHTML = initVal;

    newControlItemOutput.appendChild(newOutput);

    if (title) {
        const titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', id);
        titleLabel.setAttribute('class', 'control--panel__item-title');
        titleLabel.innerHTML = title;
        const helpIcon = document.createElement('button');
        helpIcon.innerHTML = '?';
        helpIcon.setAttribute('class', 'js-control-help control--panel__item-help-icon');
        newControlItemHeader.appendChild(titleLabel);
        newControlItemHeader.appendChild(helpIcon);
    }
    newControlItemControls.appendChild(newRangeSlider);
    newControlItemControls.appendChild(newControlItemLabels);

    newControlItem.appendChild(newControlItemControls);
    newControlItem.appendChild(newControlItemOutput);

    const helpWrapper = document.createElement('div');
    helpWrapper.setAttribute('class', 'expander control--panel__item-help-wrapper');
    const helpContentWrapper = document.createElement('div');
    helpWrapper.setAttribute('data-control-help-btn', id);
    const helpText = document.createElement('p');
    helpText.innerHTML = options.helpText;
    helpWrapper.appendChild(helpContentWrapper);
    helpContentWrapper.appendChild(helpText);

    const controlWrapper = document.createElement('div');    
    controlWrapper.setAttribute('class', 'control--panel__item-wrapper');

    controlWrapper.appendChild(newControlItemHeader);
    controlWrapper.appendChild(newControlItem);
    controlWrapper.appendChild(helpWrapper);

    parentEl.appendChild(controlWrapper);
}

export { createRangeSlider };