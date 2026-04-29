import{X as i,U as o}from"../index.js";const c=new i().setManual({purpose:"Display the reverse of a text"}).setExecute(async function(p,{rawLine:e,stdin:t,stdout:s}){return o.readInput(e,t,async n=>{const a=n.split(`
`).map(r=>r.split("").reverse().join("")).join(`
`);await s.write(a)})});export{c as rev};
