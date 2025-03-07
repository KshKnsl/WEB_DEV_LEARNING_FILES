// Dates
//Date is an object type in JS
let myDate = new Date()
console.log(myDate.toString());
// for current date complete details

//Months starts with 0 in javascript
let myCreatedDate = new Date(2023, 0, 23)
// let myCreatedDate = new Date(2023, 0, 23, 5, 3)
// let myCreatedDate = new Date("2023-01-14")
console.log(myCreatedDate.toLocaleString());
//locale string is to define the formats of dates requires and changing time zones


//time stamps are useful for polls and quizzes
let myTimeStamp = Date.now()
//this returns time lapsed(in milliseconds) till now from 1 jan 1970
console.log(myTimeStamp);

let newDate = new Date()
console.log(newDate);
console.log(newDate.getMonth() + 1);
console.log(newDate.getDay());