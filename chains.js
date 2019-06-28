// just some chaining experiments

// Not sure yet, if this works with classes, ill try soon
class Entity {
    constructor(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
};

// Add a name and getter/setter functions (No idea if this is good practice)
Entity.prototype.addName = function(name) {
    this.name = name;
    this.setName = function(name) {
        this.name = name;
    };
    this.getName = function() {
        return this.name;
    };
    return this;
};



Entity.prototype.addProperty = function(myKey, myValue) {
    Object.defineProperty(this, myKey, {
        value : myValue,
        writable : true,
        enumerable : false,
        configurable : false
    });
    return this;
};

var something = new Entity(1).addName('Patrick').addProperty('location', 'Hong Kong');
console.log(something);



// with a number class for calculations
class Number {
    constructor(a) {
        this.i = a;
    }
    add(i){
        this.i += i;
        return this;
    };
    subtract(i){
        this.i -= i;
        return this;
    };
    multiply(i){
        this.i *= i;
        return this;
    };
    divide(i){
        this.i /= i;
        return this;
    };
    value(){
        return this.i;
    };
    print(){
        console.log(this.i);
    };
    
}

let p = 5;
let n = new Number(p);
let m = new Number(5).add(n.value()).multiply(10).print();


// Promise chains

// 1. PRODUCE the result
let myPromise = new Promise(function(resolve, reject) {
    // do the heavy lift here

    // On success, call resolve(returnValue).
    // On error, call reject(new Error('BlaBla'))
});

// 2. CONSUME the result either via then(), catch() or finally()

// then() can handle both scenarios
myPromise.then(
    function(result) {}, // resolve() will call the first function 
    function(error) {} // reject() will call the seconf function
);

// catch() only handles error cases
myPromise.catch(
    function(error) {}
);

// finally() will be called either way after promise is settled
// it wont process any results, but rather pass them thru to then() or catch()
myPromise.finally(

);

// chaining multiple then blocks on the initial promise
// e.g. loading a script, then checking its contents, then calling its functions etc
new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 3000);
  
  }).then(function(result) {
  
    alert(result);
    return result * 2;
  
  }).then(function(result) {
  
    alert(result);
    return result * 2;
  
  }).then(function(result) {
  
    alert(result);
    return result * 2;
  
  });