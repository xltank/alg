/**
 * Created by Administrator on 2016/11/17.
 */
"use strict";

var obj = {};

var handler = {
    set: function(target, property, value, receiver){
        console.log(property, value);
        return true;
    }

}

/*var p = new Proxy(obj, handler);
p.a = 1;
console.log(p.a, obj.a);*/

var arr = [];
var arrProxy = new Proxy(arr, {
    set: function(target, property, value, receiver){
        console.log('k,v', property, value);
        if(property != 'length')
            target.push(value);
        return true;
    },
    apply: function(target, thisArg, argumentsList){
        console.log(argumentsList);
        return true;
    }
})

//arrProxy.push('aaa');
//arrProxy.push(123);
//arrProxy.concat([1,2,3]);
//console.log(arr, arrProxy.length, arrProxy[0]);

arr.push(1);