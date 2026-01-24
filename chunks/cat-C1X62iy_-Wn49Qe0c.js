import{E as a,f as u,q as l}from"../index.js";const f=new a().setRequireArgs(!0).setManual({purpose:"Concetenate files and display on the terminal screen",usage:"cat [options] [files]",description:"Concetenate files to standard output."}).setExecute(function(s,o){const{currentDirectory:i,options:t}=o,n=s[0],{name:c,extension:r}=u.splitId(n),e=i.findFile(c,r);return e?e.content?t!=null&&t.includes("e")?e.content.split(`
`).join(`$
`)+"$":e.content:e.source?`Src: ${e.source}`:{blank:!0}:l(this.name,`${n}: No such file`)});export{f as cat};
