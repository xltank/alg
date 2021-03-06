/**
 * Created by Administrator on 2017/3/20.
 */
"use strict";


let Promise = require("bluebird"),
    request = Promise.promisify(require("request"));

const URL_GET_QUESTION = "http://hr.amiaodaifu.com:50000/1610/new-question",
      URL_GET_CHILDREN = "http://hr.amiaodaifu.com:50000/1610/questions/{questionId}/get-children/{nodeId}",
      URL_CHECK_RESULT = "http://hr.amiaodaifu.com:50000/1610/questions/{questionId}/check",
      URL_COMMIT = "http://hr.amiaodaifu.com:50000/1610/questions/{questionId}/submit";

const MAIL_ADDR = "xltank@gmail.com",
      NAME = "徐立",
      TEL = "18511636114";

let questionId = 0,
    rootId = 0,
    root = {};


let getAsync = (url)=>{
    return request({url: url, json: true})
        .then((r) => {
            return JSON.parse(r.body);
        })
}

let postAsync = (url, body)=>{
    return request({url: url, method: "POST", json: body})
        .then((r) => {
            return JSON.parse(r.body);
        })
}

let getQuestion = ()=>{
    return postAsync(URL_GET_QUESTION, {mail: MAIL_ADDR})
        .then((r) => {
            let body = JSON.parse(r.body);
            [questionId, rootId] = [body.id, body.rootId];
        })
}

let getChildren = (nodeId)=>{
    return getAsync(URL_GET_CHILDREN.replace('{questionId}', questionId).replace('{nodeId}', nodeId));
}

let get = (nodeId) => {
    return getChildren(nodeId)
    .then((r) => {
        if(r.length > 0){
            return r.map(function(n){
                return get(n);
            }, {concurrency: 5})
                .then((children)=>{
                    r.children = children;
                    return children;
                })
        }
        return r;
    })
}

/*getQuestion()
.then(() => {
    return getChildren(rootId)
    .then((rt)=>{
        root = {id: rootId, children: rt};
        return rt.map((n)=>{
            return get(n);
        })
    })
})*/

// depth first
let makeTree1 = () => {
    let nodeLimit = 51,
        childrenLimit = 4,
        index = 1,
        tree = {id: 1, children: []};

    let getNode = () => {
        index++;
        return index < nodeLimit ? {id: index, children: []} : null;
    }

    let fillChildren = (node) => { // {id: *, children: null}
        let cs = [],
            len = parseInt(Math.random() * childrenLimit);
        for(let size=0; size<len; size++){
            let n = getNode();
            if(n)
                cs.push(n);
        }
        node.children = cs;
        console.log('---');
        console.log(node);
        if(cs.length > 0){
            cs.map((c) => {
                fillChildren(c);
            })
        }
    }

    let n = fillChildren(tree);
    //console.log(tree);
}

// breadth first
let makeTree2 = () => {
    let nodeLimit = 51,
        childrenLimit = 4,
        index = 1,
        tree = {id: 1, children: []},
        stack = [tree];

    let getNode = () => {
        index++;
        return index < nodeLimit ? {id: index, children: []} : null;
    }

    let fillChildren = (node) => {
        let cs = [],
            len = parseInt(Math.random() * childrenLimit);
        for(let size=0; size<len; size++){
            let n = getNode();
            if(n)
                cs.push(n);
        }
        node.children = cs;
        //console.log('---', cs);
        //console.log(node);
        return cs;
    }

    for(let i=0; i<6; i++){
        var cs = [];
        for(let j=0; j<stack.length; j++){
            //console.log(stack.length);
            let n = stack.shift();
            let children = fillChildren(n);
            cs.push.apply(cs, children);
        }
        console.log(cs);
        stack = cs;
        //console.log(JSON.stringify(tree));
        //console.log(tree);
    }
}

makeTree2();