import{N as a,n as u,g as l}from"../index.js";const d=new a().setRequireArgs(!0).setManual({purpose:"Concetenate files and display on the terminal screen",usage:"cat [options] [files]",description:"Concetenate files to standard output."}).setExecute(function(n,s){const{currentDirectory:o,options:i}=s,t=n[0],{name:r,extension:c}=u.splitId(t),e=o.findFile(r,c);return e?e.content?i?.includes("e")?e.content.split(`
`).join(`$
`)+"$":e.content:e.source?`Src: ${e.source}`:{blank:!0}:l(this.name,`${t}: No such file`)});export{d as cat};
