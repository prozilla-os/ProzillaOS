import{C as p,f as c,A as a}from"./index-BHE-uA0X.js";import{C as f}from"./command-Clc1HLU6.js";const d=5,$=new f().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).setExecute(function(u,{options:l}){if(l.includes("k"))return p.search(u[0].toLowerCase()).map(o=>{var i;return(i=o.manual)!=null&&i.purpose?`${o.name} - ${o.manual.purpose}`:o.name}).sort().join(`
`);const t=u[0].toLowerCase(),m=p.find(t);if(!m)return c(this.name,`${t}: Command not found`);const e=m.manual;if(!e)return c(this.name,`${t}: No manual found`);const r=n=>n.split(`
`).map(i=>" ".repeat(d)+i).join(`
`),s=[["NAME"]];return e.purpose?s[0].push(r(`${t} - ${a.decoration.dim}${a.fg.yellow}${m.manual.purpose}${a.reset}`)):s[0].push(r(t)),e.usage&&s.push(["SYNOPSIS",r(e.usage)]),e.description&&s.push(["DESCRIPTION",r(e.description)]),e.options&&s.push(["OPTIONS",r(Object.entries(e.options).map(([n,o])=>`${n} ${a.decoration.dim}${a.fg.yellow}${o}${a.reset}`).join(`
`))]),s.map(n=>(n[0]=a.fg.yellow+n[0]+a.reset,n.join(`
`))).join(`

`)});export{$ as man};
