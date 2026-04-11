import{I as o,H as n}from"../index.js";const p=new o().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(a,{options:t,stdout:s}){t.includes("c")&&s.write(n.COMMANDS.map(e=>e.name).sort().join(`
`))});export{p as compgen};
