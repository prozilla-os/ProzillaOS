import{K as s,A as t}from"../index.js";const r=new s().setManual({purpose:"Display the username"}).setExecute(async function(n,{username:a,stdout:e}){await t.printLn(e,a)});export{r as whoami};
