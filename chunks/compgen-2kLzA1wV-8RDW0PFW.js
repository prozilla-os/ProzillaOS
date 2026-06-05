import{d as a,j as o,b as e}from"../index.js";const r=new a().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(async function(i,{options:t,stdout:s}){t.includes("c")&&await o.printLn(s,e.builtins.map(n=>n.name).sort().join(`
`))});export{r as compgen};
