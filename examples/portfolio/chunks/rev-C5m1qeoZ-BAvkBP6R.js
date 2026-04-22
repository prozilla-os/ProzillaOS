import{K as i,A as o}from"../index.js";const c=new i().setManual({purpose:"Display the reverse of a text"}).setExecute(async function(p,{rawLine:e,stdin:t,stdout:s}){return o.readInput(e,t,async a=>{const n=a.split(`
`).map(r=>r.split("").reverse().join("")).join(`
`);await s.write(n)})});export{c as rev};
