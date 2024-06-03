const checkParticleKillConditions = (p, canW, canH) => {
    // check on particle kill conditions
    // seems complicated ( nested IFs ) but tries to stop check
    // without having to make all the checks if a condition is hit
    let k = p.killConditions;
    let kCol = k.colorCheck;
    let kAttr = k.perAttribute;
    let kBO = k.boundaryOffset;

    const { x, y, r, killConditions } = p;

    if ( kCol.length > 0 ) {
        for ( let i = kCol.length - 1; i >= 0; i-- ) {
            let col = kCol[ i ];
            if ( p.color4Data[ col.name ] <= col.value) {
                return true;
            }
        }
    }

    if ( kAttr.length > 0 ) {
        for ( let i = kAttr.length - 1; i >= 0; i-- ) {
            let attr = kAttr[ i ];
            if ( p[ attr.name ] <= attr.value ) {
                return true;
            }
        }
    }

    if ( k.boundaryCheck === true ) {
        // store p.r and give buffer ( * 4 ) to accomodate possible warping
        var pRad = r * 4;
        if (x - pRad < 0 - kBO) {
            return true;
        } else {
            if (x + pRad > canW + kBO) {
                return true;
            } else {
                if (y - pRad < 0 - kBO) {
                    return true;
                } else {
                    if (y + pRad > canH + kBO) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
};

export { checkParticleKillConditions };