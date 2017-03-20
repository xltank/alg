/**
 * Created by Administrator on 2016/11/9.
 */
"use strict";

var promise = require('bluebird');

var a = [1,2,3,4,5,6,7,8];

promise.each(a, function(value, index, length){
    console.log(value, index, length);
    return value*value;
}).then(function(r){
})