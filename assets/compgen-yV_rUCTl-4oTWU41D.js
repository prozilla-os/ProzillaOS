import{o as n}from"./command-nBL1aO7T-CliNWZCP.js";import{a as s}from"./index-CVcRFLfA.js";const r=new n().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(i,e){const{options:o}=e;if(o!=null&&o.includes("c"))return s.COMMANDS.map(t=>t.name).sort().join(`
`)});export{r as compgen};
