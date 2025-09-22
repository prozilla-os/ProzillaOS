import{W as a,F as u}from"../index.js";import{o as l}from"./command-nBL1aO7T-CliNWZCP.js";const f=new l().setRequireArgs(!0).setManual({purpose:"Concetenate files and display on the terminal screen",usage:"cat [options] [files]",description:"Concetenate files to standard output."}).setExecute(function(o,s){const{currentDirectory:i,options:t}=s,n=o[0],{name:c,extension:r}=a.splitId(n),e=i.findFile(c,r);return e?e.content?t!=null&&t.includes("e")?e.content.split(`
`).join(`$
`)+"$":e.content:e.source?`Src: ${e.source}`:{blank:!0}:u(this.name,`${n}: No such file`)});export{f as cat};
