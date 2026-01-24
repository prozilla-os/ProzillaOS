import{E as r,q as a,f as c}from"../index.js";const f=new r().setRequireArgs(!0).setManual({purpose:"Change file timestamps",usage:"touch [options] files",description:`Update the access and modification times of each FILE to the current time.

A file argument that does not exist is created empty.`}).setExecute(function(e,o){const{currentDirectory:t}=o,i=e[0];if(i==="girls\\"&&e[1]==="boo**")return a(this.name,"Cannot touch 'girls boo**': Permission denied");const{name:n,extension:s}=c.splitId(i);return t.findFile(n,s)?{blank:!0}:(t.createFile(n,s),{blank:!0})});export{f as touch};
