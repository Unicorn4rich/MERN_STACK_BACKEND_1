"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cartIndex_1 = require("./cartIndex");
console.log("Welcome to the shoaib");
var l = [10, 20, 30, 40, 50, 60, 70, 80, 90, 110];
l.forEach(function (item, index) {
    console.log(item, index);
});
console.log((0, cartIndex_1.addToCart)());
console.log((0, cartIndex_1.addtion)());
