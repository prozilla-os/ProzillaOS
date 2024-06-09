import{V as i,f as a}from"./index-T5ey7z2t.js";import{C as c}from"./command-Clc1HLU6.js";const f=new c().setRequireArgs(!0).setManual({purpose:"Concetenate files and display on the terminal screen",usage:"cat [options] [files]",description:"Concetenate files to standard output."}).setExecute(function(t,{currentDirectory:n,options:r}){const{name:o,extension:s}=i.convertId(t[0]),e=n.findFile(o,s);return e?e.content?r.includes("e")?e.content.split(`
`).join(`$
`)+"$":e.content:e.source?`Src: ${e.source}`:{blank:!0}:a(this.name,`${t[0]}: No such file`)});export{f as cat};
