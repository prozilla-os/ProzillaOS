import{N as r,g as a,n as c}from"../index.js";const l=new r().setRequireArgs(!0).setManual({purpose:"Change file timestamps",usage:"touch [options] files",description:`Update the access and modification times of each FILE to the current time.

A file argument that does not exist is created empty.`}).setExecute(function(e,o){const{currentDirectory:t}=o,n=e[0];if(n==="girls\\"&&e[1]==="boo**")return a(this.name,"Cannot touch 'girls boo**': Permission denied");const{name:i,extension:s}=c.splitId(n);return t.findFile(i,s)?{blank:!0}:(t.createFile(i,s),{blank:!0})});export{l as touch};
