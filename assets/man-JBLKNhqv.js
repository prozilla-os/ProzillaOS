import{C as c,f,A as o}from"./index-CcOgn_VS.js";import{C as d}from"./command-b8KknBM2.js";const g=5,w=new d().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).setExecute(function(u,l){const{options:m}=l;if(m!=null&&m.includes("k"))return c.search(u[0].toLowerCase()).map(a=>{var i;return(i=a.manual)!=null&&i.purpose?`${a.name} - ${a.manual.purpose}`:a.name}).sort().join(`
`);const t=u[0].toLowerCase(),p=c.find(t);if(!p)return f(this.name,`${t}: Command not found`);const e=p.manual;if(!e)return f(this.name,`${t}: No manual found`);const r=n=>n.split(`
`).map(i=>" ".repeat(g)+i).join(`
`),s=[["NAME"]];return e.purpose?s[0].push(r(`${t} - ${o.decoration.dim}${o.fg.yellow}${e.purpose}${o.reset}`)):s[0].push(r(t)),e.usage&&s.push(["SYNOPSIS",r(e.usage)]),e.description&&s.push(["DESCRIPTION",r(e.description)]),e.options&&s.push(["OPTIONS",r(Object.entries(e.options).map(([n,a])=>`${n} ${o.decoration.dim}${o.fg.yellow}${a}${o.reset}`).join(`
`))]),s.map(n=>(n[0]=o.fg.yellow+n[0]+o.reset,n.join(`
`))).join(`

`)});export{w as man};
