import{K as s,A as e}from"../index.js";const m=new s().setManual({purpose:"Display the hostname"}).setExecute(async function(n,{hostname:t,stdout:a}){await e.printLn(a,t)});export{m as hostname};
