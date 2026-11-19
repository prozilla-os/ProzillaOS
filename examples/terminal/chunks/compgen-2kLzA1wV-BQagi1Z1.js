import{_ as a,K as e,A as o}from"../index.js";const r=new a().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(async function(i,{options:s,stdout:t}){s.includes("c")&&await e.printLn(t,o.builtins.map(n=>n.name).sort().join(`
`))});export{r as compgen};
