//  counter.js Web Worker

var i = 0;
	
function countNumbers(){
	if(i < 10000) {
		i = i + 1;
		postMessage(i);
	}
}

countNumbers();

self.onmessage = function(e) {
	self.postMessage('You said '+e.data);
};