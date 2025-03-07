console.log("Hello node!");

alert("hello");

//array
var arr = [1,2,3];
console.log(arr[0]);
arr.forEach(function(item){    console.log(item);});
arr.filter(function(item){    return item > 1;});
arr.map(function(item){    return item * 2;});

//object
var obj = {
    name: "John",
    age: 20
};


//function
function sayHello(){
    console.log("Hello");
}
//arrow function
var sayHello = () => {
    console.log("Hello");
}

//callback
function sayHello(callback){
    callback();
}
//closures
function sayHello(){
    var text = "Hello";
    return function(){
        console.log(text);
    }
}
