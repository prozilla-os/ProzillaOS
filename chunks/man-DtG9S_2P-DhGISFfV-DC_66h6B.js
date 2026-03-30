import{N as l,F as u,g as m,u as a}from"../index.js";const g=5,h=new l().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).setExecute(function(i,c){const{options:d}=c;if(d?.includes("k"))return u.search(i[0].toLowerCase()).map(e=>e.manual?.purpose?`${e.name} - ${e.manual.purpose}`:e.name).sort().join(`
`);const s=i[0].toLowerCase(),p=u.find(s);if(!p)return m(this.name,`${s}: Command not found`);const n=p.manual;if(!n)return m(this.name,`${s}: No manual found`);const t=e=>e.split(`
`).map(r=>" ".repeat(g)+r).join(`
`),o=[["NAME"]];return n.purpose?o[0].push(t(`${s} - ${a.decoration.dim}${a.fg.yellow}${n.purpose}${a.reset}`)):o[0].push(t(s)),n.usage&&o.push(["SYNOPSIS",t(n.usage)]),n.description&&o.push(["DESCRIPTION",t(n.description)]),n.options&&o.push(["OPTIONS",t(Object.entries(n.options).map(([e,r])=>`${e} ${a.decoration.dim}${a.fg.yellow}${r}${a.reset}`).join(`
`))]),o.map(e=>(e[0]=a.fg.yellow+e[0]+a.reset,e.join(`
`))).join(`

`)});export{h as man};
