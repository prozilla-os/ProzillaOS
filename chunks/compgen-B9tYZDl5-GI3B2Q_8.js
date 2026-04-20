import{q as o,O as a,k as e}from"../index.js";const r=new o().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(i,{options:s,stdout:t}){s.includes("c")&&a.printLn(t,e.builtins.map(n=>n.name).sort().join(`
`))});export{r as compgen};
