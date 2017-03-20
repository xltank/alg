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


let makeTree = () => {
    let nodeLimit = 50,
        childrenLimit = 6,
        index = 1,
        tree = {id: 1, children: []};

    let fillChildren = (node) => { // {id: *, children: null}
        let c = [],
            len = parseInt(Math.random() * (childrenLimit+1));
        for(let size=0; size<len; size++){
            c.push({id: index+size, children: []});
        }
        node.children = c;
        console.log(node);
        index += len;
        return node;
    }

    let n = fillChildren(tree);
    children = n;

    d++;
    if(d < depth && children.length > 0)
        children.map(function(c){
            let n = makeNode(c);

        })
    else
        return node;

    console.log(tree);
}

makeTree();