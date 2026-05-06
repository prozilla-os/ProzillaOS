import{s as a,B as n}from"../index.js";const m=new a().setManual({purpose:"Display the hostname"}).setExecute(async function(e,{hostname:s,stdout:t}){await n.printLn(t,s)});export{m as hostname};
