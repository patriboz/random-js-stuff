// Random js notes


function fibonacci(range) {
    var r = [], n = 0, a = 0, b = 1, next;
    function nextFibonacci() {
        next = a + b;
        return b = (a = b, next);
    }
    while(n++ < range) {
        r.push(nextFibonacci());
    }
    return r;
}
//console.log('Fibonacci Numbers:', fibonacci(50));

function getRandomPrime() {
    while(n = Math.round(Math.random()*1000000000), !isPrime(n));
    return n;
}
var isPrime = function(n) {
    d = Math.ceil(Math.sqrt(n));
    while(n%(d--) && d);
    return !d;
}
//console.log(getRandomPrime());


function fibonacci2(range) {
    for (
        var i=2, r=[0,1];
        i<range;
        r.push(r[i-1] + r[i-2]), i++
    );
    return r;
}
//console.log(fibonacci2(20));

function renderCurve() {
    for(var a = 1, b = 10; a*b; a++, b--)
        console.log(new Array(a*b).join('*'));
}
//renderCurve();


var t = 0;

var a = (t === 0 ? 1 : 2);
//console.log(a);


// Comma operator
var obj = {};
obj.a = 1,
obj.b = 2,
obj.c = 3
//console.log(obj)
//console.log(obj.a, obj.b, obj.c, 'this', 'is', 'filthy')

var pat = 1,
    tap = 2,
    atp = 3,
    apt = 4

//console.log(pat, tap, atp, apt)

function diff(x, y) {
    return x, (x/y)
}
//console.log(diff(4,2));


// Create & delete event listeners systematically
element.querySelector('.addDoor').onEvent('click', function (e) { });
element.querySelector('.addDoor').removeListeners();


HTMLElement.prototype.onEvent = function (eventType, callBack, useCapture) {
this.addEventListener(eventType, callBack, useCapture);
if (!this.myListeners) {
    this.myListeners = [];
};
this.myListeners.push({ eType: eventType, callBack: callBack });
return this;
};


HTMLElement.prototype.removeListeners = function () {
if (this.myListeners) {
    for (var i = 0; i < this.myListeners.length; i++) {
        this.removeEventListener(this.myListeners[i].eType, this.myListeners[i].callBack);
    };
   delete this.myListeners;
};
};