import{K as n,u as o,b as e}from"../index.js";const p=new n().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(async function(i,{options:s,stdout:t}){s.includes("c")&&await o.printLn(t,e.builtins.map(a=>a.name).sort().join(`
`))});export{p as compgen};
