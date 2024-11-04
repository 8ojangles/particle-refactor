import { getNested, getDuration } from './../utilities.js';

function createAnimationTracks( arr, ppa ) {
    let animArr = [];
    var splChrs = '.';

    if (arr && arr.length > 0) {
        let arrLen = arr.length;
        for (let i = arrLen - 1; i >= 0; i--) {
            const t = arr[i];
            const { animName, type, active, param, colorChange, baseAmount, targetValuePath, targetAmount, duration, easing, linkedAnim, linkedEvent } = t;
            // console.log('baseAmount: ', baseAmount);
            var prm = param.split(splChrs);
            // console.log('t: ', t);
            var prmTemp = { path: prm, pathLen: prm.length };
            // const baseVal = getNested(ppa, baseAmount);
            // var baseVal = getValue( baseAmount, ppa );
            // var targetVal = getTargetValue(ppa, t.targetValuePath, baseVal, t.targetAmount);
            // console.log('baseVal: ', baseVal);
            // console.log('targetValuePath: ', targetValuePath);
            // let targetVal = void 0;
            // const getTargetValue = getNested(ppa, targetValuePath);
            // if (targetValuePath) {
            //     if (getTargetValue === 0) {
            //         console.log('getTargetValue = 0');
            //         targetVal = baseVal * -1;
            //     } else {
            //         console.log('getTargetValue = getTargetValue - baseVal');
            //         targetVal = getTargetValue - baseVal;
            //     }
            // } else if (targetAmount) {
            //     targetVal = targetAmount;
            // }
            let baseVal = 0;
            let targetVal = 0;
            if (type === 'color') {
                const { from, to } = colorChange;
                baseVal = ppa.colorProfiles[from.profile][from.color];
                targetVal = ppa.colorProfiles[to.profile][to.color];
                if (targetVal === 0 && baseVal > 0) {
                    targetVal = baseVal * -1;
                } else {
                    targetVal = targetVal - baseVal;
                }
            }

            if (type === 'param') {
                baseVal = ppa[baseAmount];
                targetVal = ppa[targetValuePath];
                if (targetValuePath) {
                    if (targetVal === 0 && baseVal > 0) {
                        targetVal = baseVal * -1;
                    } else {
                        targetVal = targetVal - baseVal;
                    }
                } else {
                    targetVal = targetAmount;
                }
            }

            var computedDuration = 60 * duration;
            let life = ppa.lifeSpan;
            duration === 'life' ? computedDuration = life : duration < 1 ? computedDuration = life * duration : duration > 1 ? computedDuration = life : false;

            let thisAnim = {
                animName: animName,
                type: type,
                active: active,
                param: prmTemp,
                paramPath: param,
                // param: t.param,
                // baseAmount: baseVal,
                baseAmount: baseVal,
                targetAmount: targetVal,
                // targetAmount: targetValuePath,
                currTick: 0,
                duration: computedDuration,
                // duration: duration,
                easing: easing,
                linkedAnim: linkedAnim,
                linkedEvent: linkedEvent
            }
            // console.log( 'thisAnim: ', thisAnim );
            animArr.push( thisAnim );
        }

        return animArr;
    }

    return false;

};

export { createAnimationTracks };