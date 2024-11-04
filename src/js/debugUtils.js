import { mathUtils } from './mathFunctions/mathUtils.js';

let lastCalledTime = void 0;

function padZero(str) {
    if (str.length === 1) {
        return `0${str}`;
    }
    return str;
}

const debug = {
    helpers: {
        getStyle: function getStyle(element, property) {
            return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            })];
        },
        invertColor: function invertColor(hex, bw) {
            if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
            }
            // convert 3-digit hex to 6-digits.
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            if (hex.length !== 6) {
                throw new Error('Invalid HEX color.');
            }
            let r = parseInt(hex.slice(0, 2), 16),
                g = parseInt(hex.slice(2, 4), 16),
                b = parseInt(hex.slice(4, 6), 16);
            if (bw) {
                // http://stackoverflow.com/a/3943023/112731
                return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
            }
            // invert color components
            let newR = (255 - r).toString(16);
            let newG = (255 - g).toString(16);
            let newB = (255 - b).toString(16);
            // pad each with zeros and return
            return `#${padZero(newR)}${padZero(newG)}${padZero(newB)}`;
        }

    },

    display: function display(displayFlag, message, param) {
        const self = this;
        if (self.all === true || displayFlag === true) {
            console.log(message, param);
        }
    },

    debugOutput: function debugOutput(canvas, context, label, param, outputNum, outputBounds) {
        ;

        if (outputBounds) {
            const thisRed = mathUtils.mapValues(param, outputBounds.min, outputBounds.max, 255, 0, true);
            const thisGreen = mathUtils.mapValues(param, outputBounds.min, outputBounds.max, 0, 255, true);
            // const thisBlue = mathUtils.map(param, outputBounds.min, outputBounds.max, 0, 255, true);
            const thisColor = 'rgb( ' + thisRed + ', ' + thisGreen + ', 0 )';

            // console.log( 'changing debug color of: '+param+' to: '+thisColor );
        } else {
            var thisColor = "#efefef";
        }

        var vPos = outputNum * 50 + 50;
        context.textAlign = "left";
        context.font = "14pt arial";
        context.fillStyle = thisColor;

        context.fillText(label + param, 50, vPos);
    },

    calculateFps: function calculateFps() {
        if (!lastCalledTime) {
            lastCalledTime = window.performance.now();
            return 0;
        }
        var delta = (window.performance.now() - lastCalledTime) / 1000;
        lastCalledTime = window.performance.now();
        return 1 / delta;
    },

    flags: {
        all: false,
        parts: {
            clicks: false,
            runtime: false,
            update: false,
            killConditions: false,
            animationCounter: false,
            entityStore: false,
            fps: false
        }
    }
};

function displayDebugging(canvasEl, displayFlag) {
    if (displayFlag !== true) {
        return;
    }
    const { el, ctx } = canvasEl;
    // ctx.globalAlpha = 1;
    // debug.debugOutput(el, ctx, 'Animation Counter: ', counter, 0);
    // debug.debugOutput(el, ctx, 'Particle Pool: ', entityStore.length, 1);
    // debug.debugOutput(el, ctx, 'Live Entities: ', runtimeConfig.liveEntityCount, 2, { min: entityStore.length, max: 0 });
    debug.debugOutput(el, ctx, 'FPS: ', Math.round(debug.calculateFps()), 3, { min: 0, max: 60 });
}

const logger = {
    display: true,
    displayInterval: 60,
    keepLog: true,
    time: 0,
    entityPoolCount: 0,
    entityArrayCount: 0,
    killed: 0,
    addedNew: 0,
    addedReincarnated: 0,
    particlesRendered: 0,
    particlesRenderedAverageArray: [],
    messageArray: [],
    addMessage: function(message) {
        this.messageArray.push({text: message.text, value: message.value});
    },
    clearMessages: function() {
        this.messageArray.length = 0;
    },
    setDisplay: function(bool) {
        this.display = bool;
    },
    setEntityPoolCount: function(num) {
        this.entityPoolCount = num;
    },
    setEntityArrayCount: function(num) {
        this.entityArrayCount = num;
    },
    addNew: function(num) {
        this.addedNew += num;
    },
    clearNew: function() {
        this.addedNew = 0;
    },
    addReincarnated: function(num) {
        this.addedReincarnated += num;
    },
    clearReincarnated: function() {
        this.addedReincarnated = 0;
    },
    addKilled: function(num) {
        this.killed += num;
    },
    clearKilled: function() {
        this.killed = 0;
    },
    setParticlesRendered: function(num) {
        this.particlesRendered = num;
        this.particlesRenderedAverageArray.push(num);
    },
    clearParticlesRendered: function() {
        this.particlesRendered = 0;
    },
    clearParticlesRenderedAverageArray: function() {
        this.particlesRenderedAverageArray.length = 0;
    },
    clearAll: function() {
        this.addedNew = 0;
        this.addedReincarnated = 0;
        this.killed = 0;
        this.particlesRendered = 0;
        this.particlesRenderedAverageArray.length = 0;
    },
    updateTime: function(counter) {
        if (counter % this.displayInterval === 0) {
            this.time += 1;
        }
    },
    displayCounts: function(counter) {
        if (this.display === false) {
            return;
        }
        if (counter % this.displayInterval === 0) {
            let averageParticlesRendered = 0;
            for(let i = 0; i < this.particlesRenderedAverageArray.length; i++) {
                averageParticlesRendered += this.particlesRenderedAverageArray[i]
            }
            if (this.keepLog === false) {
                console.clear();
            }
            let averageDisplay = this.particlesRenderedAverageArray.length > 0 ? Math.floor(averageParticlesRendered / this.particlesRenderedAverageArray.length) : 0;
            console.log(
                'Time: ', this.time,
                '\nParticles rendered average: ', averageDisplay,
                '\nentityPoolCount: ', this.entityPoolCount,
                '\nentityArrayCount: ', this.entityArrayCount,
                '\naddedNew: ', this.addedNew,
                '\naddedReincarnated: ', this.addedReincarnated
            );
            this.clearAll();
        }
        if (this.messageArray.length > 0) {
            this.messageArray.forEach((x) => {
                console.log(x.text, x.value);
            });
            this.clearMessages();
        }
    }
}

export { debug, displayDebugging, lastCalledTime, logger };