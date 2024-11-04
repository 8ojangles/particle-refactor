/**
 * @description given a {Particle}s "killConditions" data, check against conditions. Return True if conditions met.
 * @param {import("./createParticleFns").Particle} p - The particle to check
 * @param {number} canW - canvas width to check for offscreen boundary conditons
 * @param {number} canH - canvas height to check for offscreen boundary conditons
 * @returns {boolean}
 */
function checkParticleKillConditions(p, canW, canH)  {
    // check on particle kill conditions
    // seems complicated ( nested IFs ) but tries to stop check
    // without having to make all the checks if a condition is hit
    const k = p.killConditions;
    const { colorCheck, perAttribute, boundaryCheck, boundaryOffset = 0, boundaryParts } = k;

    const { all, top, right, bottom, left } = boundaryParts;
    const { x, y, r } = p;

    if ( colorCheck.length > 0 ) {
        for ( let i = colorCheck.length - 1; i >= 0; i-- ) {
            let col = colorCheck[ i ];
            if ( p.color4Data[ col.name ] === col.value) {
                // console.log(`killing because ${col.name} === ${col.value}`);
                return true;
            }
        }
    }

    if ( perAttribute.length > 0 ) {
        for ( let i = perAttribute.length - 1; i >= 0; i-- ) {
            const attr = perAttribute[ i ];
            if ( p[ attr.name ] === attr.value ) {
                // console.log(`killing because ${attr.name} <= ${attr.value}`);
                return true;
            }
        }
    }

    if ( boundaryCheck === true ) {
        if ( all === true ) {
            if (x - r < -boundaryOffset) {
                return true;
            } else {
                if (x + r > canW + boundaryOffset) {
                    return true;
                } else {
                    if (y - r < -boundaryOffset) {
                        return true;
                    } else {
                        if (y + r > canH + boundaryOffset) {
                            return true;
                        }
                    }
                }
            }
        } else {
            if ( boundaryParts ) {
                if (top && y - r < -boundaryOffset) {
                    return true;
                }
                if (right && x + r > canW + boundaryOffset) {
                    return true;
                }
                if (bottom && y + r > canH + boundaryOffset) {
                    return true;
                }
                if (left && x - r < -boundaryOffset) {
                    return true;
                }
            }
        }
    }

    return false;
};

export { checkParticleKillConditions };