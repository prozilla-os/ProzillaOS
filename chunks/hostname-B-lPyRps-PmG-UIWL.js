import{K as a,U as n}from"../index.js";const m=new a().setManual({purpose:"Display the hostname"}).setExecute(async function(e,{hostname:t,stdout:s}){await n.printLn(s,t)});export{m as hostname};
