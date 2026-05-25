import{s as e,B as t}from"../index.js";const r=new e().setManual({purpose:"Display the username"}).setExecute(async function(n,{username:s,stdout:a}){await t.printLn(a,s)});export{r as whoami};
