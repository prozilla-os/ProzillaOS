import{v as p}from"../index.js";const u=new p().setManual({purpose:"Concatenate files and display on the terminal screen",usage:"cat [OPTION]... [FILE]...",description:"Concatenate FILE(s) to standard output. With no FILE, or when FILE is -, read standard input.",options:{"-e":"Display $ at end of each line"}}).addOption({short:"e",long:"show-ends",isInput:!1}).setExecute(async function(s,{workingDirectory:i,options:e,stdout:n,stderr:o,stdin:r,shell:d}){const c=t=>{if(!e.includes("e"))return t;const a=t.split(`
`).join(`$
`);return t.endsWith(`
`)?a:a+"$"};return await d.readFiles({paths:s,workingDirectory:i,stdin:r,stderr:o,commandName:this.name,onContent:async t=>{await n.write(c(t))},onStdinData:async t=>{await n.write(e.includes("e")?t.replace(/\n/g,`$
`):t)}})});export{u as cat};
