import{K as n,D as a}from"../index.js";const c=new n().setRequireArgs(!0).setManual({purpose:"Change file timestamps",usage:"touch [options] files",description:`Update the access and modification times of each FILE to the current time.

A file argument that does not exist is created empty.`}).setExecute(function(s,{workingDirectory:e}){const o=s[0],{name:t,extension:i}=a.splitId(o);e.findFile(t,i)||e.createFile(t,i)});export{c as touch};
