import{N as t,F as n}from"../index.js";const r=new t().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(a,e){const{options:s}=e;if(s?.includes("c"))return n.COMMANDS.map(o=>o.name).sort().join(`
`)});export{r as compgen};
