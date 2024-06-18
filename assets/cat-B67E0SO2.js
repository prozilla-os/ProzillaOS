import{V as a,f as u}from"./index-CcOgn_VS.js";import{C as l}from"./command-b8KknBM2.js";const m=new l().setRequireArgs(!0).setManual({purpose:"Concetenate files and display on the terminal screen",usage:"cat [options] [files]",description:"Concetenate files to standard output."}).setExecute(function(r,s){const{currentDirectory:o,options:t}=s,n=r[0],{name:i,extension:c}=a.splitId(n),e=o.findFile(i,c);return e?e.content?t!=null&&t.includes("e")?e.content.split(`
`).join(`$
`)+"$":e.content:e.source?`Src: ${e.source}`:{blank:!0}:u(this.name,`${n}: No such file`)});export{m as cat};
