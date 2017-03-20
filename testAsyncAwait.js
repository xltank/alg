"use strict";

console.log(process.version);

var promise = require('bluebird');
var requestP = promise.promisify(require('request'));

async function testAsync(){
    try{
        return await requestP('http://www.baidu.com');
    }catch(e){
        console.log('error', e);
    }
}

/*
var b = testAsync();
b.then(function(r){
    console.log('then');
    console.log(r.body);
});
*/

function wait(ms){
    return new Promise((resolve, reject) => setTimeout(function(){}, ms));
}

async function hello(){
    console.log('before await');
    try{
        await wait(3000);
        console.log('right after await');
    }catch(e){
        console.log('error:', e);
    }

    console.log('after await');
    return "It's me.";
}

hello().then((r) => console.log(r));

/*Promise.resolve('aaa').then(function(){
    throw new Error('error message');
})*/

/*promise.resolve('aaa').then(function(){
    throw new Error('error message');
})*/

console.log('done');