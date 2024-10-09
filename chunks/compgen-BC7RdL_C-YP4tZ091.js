import{o as n}from"./command-nBL1aO7T-CliNWZCP.js";import{e as s}from"../index.js";const r=new n().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(i,o){const{options:e}=o;if(e!=null&&e.includes("c"))return s.COMMANDS.map(t=>t.name).sort().join(`
`)});export{r as compgen};
