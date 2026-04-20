import{q as i,O as o}from"../index.js";const c=new i().setManual({purpose:"Display the reverse of a text"}).setExecute(function(p,{rawLine:e,stdin:t,stdout:s}){return o.readInput(e,t,r=>{const n=r.split(`
`).map(a=>a.split("").reverse().join("")).join(`
`);s.write(n)})});export{c as rev};
