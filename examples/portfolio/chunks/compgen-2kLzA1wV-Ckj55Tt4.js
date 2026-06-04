import{v as a,B as o,D as e}from"../index.js";const r=new a().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(async function(i,{options:s,stdout:t}){s.includes("c")&&await o.printLn(t,e.builtins.map(n=>n.name).sort().join(`
`))});export{r as compgen};
