import{C as o}from"./command-Clc1HLU6.js";import{C as a}from"./index-9Aerremv.js";const r=new o().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(s,{options:e}){if(e.includes("c"))return a.COMMANDS.map(n=>n.name).sort().join(`
`)});export{r as compgen};
