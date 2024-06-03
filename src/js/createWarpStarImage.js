import { canvasDrawingApi as drawing } from './canvasApiAugmentation.js';

let c = document.createElement( 'canvas' );
let ctx = c.getContext( '2d' );

let blurBuffer = 5;

// w = 210, h = 110
c.width = 160 + ( blurBuffer * 2 );
c.height = 100 + ( blurBuffer * 2 );

cH = c.width / 2;
cV = c.height / 2;

// spot radius: ( 100 - 10 ) / 2 = 45 
let cSR = ( c.height - ( blurBuffer * 2 ) ) / 2;

// 105 / 4 = 26.25
let cSO = (cH / 4) * 1.4;

// 100 + 26.25 = 126.25
let redShift = cH + cSO;

// 100 - 26.25 = 73.75
let blueShift = cH - cSO;

function createWarpStarImage() {

	let gRed = ctx.createRadialGradient( redShift, cV, 0, redShift, cV, cSR );
	gRed.addColorStop( 0, 'rgba( 255, 0, 0, 1 )' );
	gRed.addColorStop( 1, 'rgba( 255, 0, 0, 0 )' );

	let gGreen = ctx.createRadialGradient( cH, cV, 0, cH, cV, cSR );
	gGreen.addColorStop( 0, 'rgba( 0, 255, 0, 1 )' );
	gGreen.addColorStop( 1, 'rgba( 0, 255, 0, 0 )' );

	let gBlue = ctx.createRadialGradient( blueShift, cV, 0, blueShift, cV, cSR );
	gBlue.addColorStop( 0, 'rgba( 0, 0, 255, 1 )' );
	gBlue.addColorStop( 1, 'rgba( 0, 0, 255, 0 )' );

	ctx.globalCompositeOperation = 'lighter';

	ctx.filter = "blur( 1px )";

	ctx.fillStyle = gRed;
	ctx.fillCircle( redShift, cV, cSR, c );

	ctx.fillStyle = gGreen;
	ctx.fillCircle( cH, cV, cSR, c );

	ctx.fillStyle = gBlue;
	ctx.fillCircle( blueShift, cV, cSR, c );


	// ctx.translate( cH, cV );
	// ctx.scale( 1.25, 0.5 );
	// let gWhite = ctx.createRadialGradient( 0, 0, 0, 0, 0, cSR );
	// gWhite.addColorStop( 0.3, 'rgba( 255, 255, 255, 0.8 )' );
	// gWhite.addColorStop( 1, 'rgba( 255, 255, 255, 0 )' );

	// ctx.fillStyle = gWhite;
	// ctx.fillCircle( 0, 0, cSR, c );

	// ctx.scale( 1, 2 );
	// ctx.translate( -cH, -cV );

	c.renderProps = {
		src: {
			x: 0, y: 0, w: c.width, h: c.height
		},
		dest: {
			x: -cH, y: -cV
		}
	}
	// console.log( 'c: ', c.renderProps );
	const scratchPap = document.getElementById('warpStarImageCanvas');
	scratchPap.append( c );

	return c;

}

export { createWarpStarImage };