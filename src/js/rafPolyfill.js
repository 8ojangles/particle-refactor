// requestAnimationFrame() shim by Paul Irish
window.requestAnimationFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		};
})();

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

window.requestTimeout = function(fn, delay) {
	if ( !window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !( window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && !window.oRequestAnimationFrame && !window.msRequestAnimationFrame ) {
		return window.setTimeout(fn, delay);
	}
			
	var start = new Date().getTime(),
		handle = new Object();
		
	function loop(){
		var current = new Date().getTime(),
			delta = current - start;
		delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
	};
	
	handle.value = requestAnimFrame(loop);
	return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function( handle ) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame( handle.value ) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame( handle.value ) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame( handle.value ) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame( handle.value ) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame( handle.value ) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame( handle.value ) :
    clearTimeout( handle );
};