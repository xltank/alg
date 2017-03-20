/**
 * Created by Administrator on 2017/3/15.
 */

"use strict"

console.log(process.version)

let length = 10;
let list = getList(length);


function getList(len){
    let l = [];
    for(let i=0; i<len; i++){
        l.push(parseInt(Math.random()*len));
    }
    return l;
}


console.log("before ", list.join(","));

//console.log("after ", bubbleSort(list));
//console.log("after ", insertionSort(list));
//console.log("after ", selectionSort(list));
console.log("after ", quickSort(list));

console.log(list.join(','));


function bubbleSort(arr){
    for(let i=arr.length-1; i>0; i--){
        for(let j=0; j<i; j++){
            if(arr[j] > arr[j+1])
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        }
    }
    return arr;
}


function insertionSort(arr){
    for(let i=1; i<arr.length; i++){
        for(let j=i; j>0; j--){
            if(arr[j] < arr[j-1])
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
            else
                break;
        }
    }
    return arr;
}


function selectionSort(arr){
    for(let i=0; i<arr.length; i++){
        let minIndex = i;
        for(let j=i; j<arr.length-1; j++){
            if(arr[minIndex] > arr[j+1])
                minIndex = j+1;
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

    }
    return arr;
}


function quickSort(arr, start=0, end=arr.length-1){
    console.log(start, end);
    let len = end - start + 1;

    let v = arr[start];
    let i=start,
        j=end;

    while(i<j){
        if(arr[j] < v){
            [arr[j], arr[i]] = [arr[i], arr[j]];
            console.log(i,j, arr.join(','));
        }else{
            j--;
            console.log(i,j, arr.join(','));
            continue;
        }

        while(i<j){
            if(arr[i] > v) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                console.log(i,j, arr.join(','));
                break;
            }else{
                i++;
                console.log(i,j, arr.join(','));
            }
        }
    }

    arr[i] = v;
    console.log(i, j, arr.join(","));

    if(len > 2){
        quickSort(arr, start, i);
        quickSort(arr, i+1, end);
    }else{
        console.log('DONE');
    }
}