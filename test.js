/**
 * Created by Administrator on 2016/11/11.
 */
"use strict";

console.log('version', process.version);

/*for(var i=0; i<6; i++){
    setTimeout(function(){
        console.log(i);
    }, 1000);
}

for(let i=0; i<6; i++){
    setTimeout(function(){
        console.log(i);
    }, 1000);
}*/

/*
function test(key){
    switch (key){
        case 0:
            let a = 1;
            console.log(a);
            break;
        case 1:
            a = 2;
            console.log(a);
            break;
    }
}

test(0);*/

/*
console.log('a', a);
console.log('b', b);
var a = 1;
let b = 2;
*/

let a = 1;

(function(){
    console.log('from main', a);
})()

var func = require('./testModule').func;

func();