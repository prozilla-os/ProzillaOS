import{s as i,B as o}from"../index.js";const c=new i().setManual({purpose:"Display the reverse of a text"}).setExecute(async function(p,{rawLine:e,stdin:s,stdout:t}){return o.readInput(e,s,async n=>{const a=n.split(`
`).map(r=>r.split("").reverse().join("")).join(`
`);await t.write(a)})});export{c as rev};
