import{d as n,j as o}from"../index.js";import"./react-jsx-runtime-VhLgLYuD.js";import"./react-gKvwg2Xh.js";import"./react-dom-DTDwsevO.js";const l=new n().setManual({purpose:"Display the reverse of a text"}).setExecute(async function(p,{rawLine:t,stdin:e,stdout:r}){return o.readInput(t,e,async s=>{const a=s.split(`
`).map(i=>i.split("").reverse().join("")).join(`
`);await r.write(a)})});export{l as rev};
