import{C as o}from"./command-DZiH-9YI.js";import{C as s}from"./index-Dg_xNh9f.js";const i=new o().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(t,n){const{options:e}=n;if(e!=null&&e.includes("c"))return s.COMMANDS.map(a=>a.name).sort().join(`
`)});export{i as compgen};
