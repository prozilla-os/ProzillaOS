import{E as e,n as o}from"../index.js";const p=new e().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(function(a,s){const{options:n}=s;if(n!=null&&n.includes("c"))return o.COMMANDS.map(t=>t.name).sort().join(`
`)});export{p as compgen};
