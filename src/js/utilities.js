function getValue(path, origin) {
    if (origin === void 0 || origin === null) origin = self ? self : this;
    if (typeof path !== 'string') path = '' + path;
    var c = '',
        pc,
        i = 0,
        n = path.length,
        name = '';
    if (n) while (i <= n) {
        (c = path[i++]) == '.' || c == '[' || c == ']' || c == void 0 ? (name ? (origin = origin[name], name = '') : pc == '.' || pc == '[' || pc == ']' && c == ']' ? i = n + 2 : void 0, pc = c) : name += c;
    }if (i == n + 2) throw "Invalid path: " + path;
    return origin;
}

function getNested(obj, prop){
    // console.log('prop: ', prop);
    if (!prop.includes('.')) {
        obj = obj[prop];
    } else {
        const _prop = prop.split(".")
        for(let i = 0; i < _prop.length; i++){
            if(_prop[i] in obj) {
                obj = obj[_prop[i]];
            } else {
                return;
            }
        }
    }
    return obj;
}

/**
 * recursion function that called in main function 
 * @param {object} obj initial JSON
 * @param {string} path path to value in dot notation (e.g. 'key1.key2')
 * @param {object|string|number} value value that you want to set
 * @returns final JSON
 */
function setDeepKeyValue(obj, path, value) {
    var schema = obj;  // a moving reference to internal objects within obj
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len-1]] = value;
}

function getTargetValue(ppa, path, baseVal, targetAmount) {
    if (path) {
        if (getNested(ppa, path) === 0) {
            return baseVal * -1;
        } else {
            return getNested(ppa, path) - baseVal;
        }
    } else {
        if (targetAmount) {
            return targetAmount;
        }
    }
    return 0;
}

// old calculation: keeping incase
// var duration = 60 * t.duration;
// let life = ppa.lifeSpan;
// t.duration === 'life' ? duration = life : t.duration < 1 ? duration = life * t.duration : t.duration > 1 ? duration = life : false;

function getDuration(animDuration, particleLifespan) {
    let duration = 60 * animDuration;
    if (animDuration === 'life' || animDuration > 1) {
        duration = particleLifespan;
    } 
    if (animDuration < 1) {
        duration = particleLifespan * animDuration;
    }
    return duration;
}

export { getValue, getNested, getDuration, getTargetValue, setDeepKeyValue };