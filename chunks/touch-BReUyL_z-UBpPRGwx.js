import{d as r,Z as n}from"../index.js";import"./react-jsx-runtime-VhLgLYuD.js";import"./react-gKvwg2Xh.js";import"./react-dom-DTDwsevO.js";const u=new r().setRequireArgs(!0).setManual({purpose:"Change file timestamps",usage:"touch [options] files",description:`Update the access and modification times of each FILE to the current time.

A file argument that does not exist is created empty.`}).setExecute(function(o,{workingDirectory:e}){const s=o[0],{name:t,extension:i}=n.splitId(s);e.findFile(t,i)||e.createFile(t,i)});export{u as touch};
