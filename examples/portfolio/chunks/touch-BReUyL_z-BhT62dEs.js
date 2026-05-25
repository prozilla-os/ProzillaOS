import{s as n,g as a}from"../index.js";const c=new n().setRequireArgs(!0).setManual({purpose:"Change file timestamps",usage:"touch [options] files",description:`Update the access and modification times of each FILE to the current time.

A file argument that does not exist is created empty.`}).setExecute(function(i,{workingDirectory:e}){const o=i[0],{name:t,extension:s}=a.splitId(o);e.findFile(t,s)||e.createFile(t,s)});export{c as touch};
