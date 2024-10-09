import{e as u,F as l,A as o}from"../index.js";import{o as d}from"./command-nBL1aO7T-CliNWZCP.js";const g=5,$=new d().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).setExecute(function(i,c){const{options:p}=c;if(p!=null&&p.includes("k"))return u.search(i[0].toLowerCase()).map(e=>{var a;return(a=e.manual)!=null&&a.purpose?`${e.name} - ${e.manual.purpose}`:e.name}).sort().join(`
`);const t=i[0].toLowerCase(),m=u.find(t);if(!m)return l(this.name,`${t}: Command not found`);const n=m.manual;if(!n)return l(this.name,`${t}: No manual found`);const r=e=>e.split(`
`).map(a=>" ".repeat(g)+a).join(`
`),s=[["NAME"]];return n.purpose?s[0].push(r(`${t} - ${o.decoration.dim}${o.fg.yellow}${n.purpose}${o.reset}`)):s[0].push(r(t)),n.usage&&s.push(["SYNOPSIS",r(n.usage)]),n.description&&s.push(["DESCRIPTION",r(n.description)]),n.options&&s.push(["OPTIONS",r(Object.entries(n.options).map(([e,a])=>`${e} ${o.decoration.dim}${o.fg.yellow}${a}${o.reset}`).join(`
`))]),s.map(e=>(e[0]=o.fg.yellow+e[0]+o.reset,e.join(`
`))).join(`

`)});export{$ as man};
