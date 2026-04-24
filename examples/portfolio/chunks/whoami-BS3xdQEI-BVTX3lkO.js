import{K as s,u as t}from"../index.js";const u=new s().setManual({purpose:"Display the username"}).setExecute(async function(n,{username:a,stdout:e}){await t.printLn(e,a)});export{u as whoami};
