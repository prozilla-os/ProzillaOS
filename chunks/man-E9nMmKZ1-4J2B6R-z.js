import{K as y,D as f,A as r,c as w,u as p}from"../index.js";const E=5,O=new y().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).addOption({short:"k",long:"apropos"}).setExecute(async function(l,{options:$,stdout:c,stderr:d}){if($.includes("k")){const e=f.builtins.filter(n=>n.name.match(l[0].toLowerCase())).map(n=>n.manual?.purpose?`${n.name} - ${n.manual.purpose}`:n.name).sort().join(`
`);await r.printLn(c,e);return}const s=l[0].toLowerCase(),u=f.getBuiltin(s);if(!u)return r.writeError(d,this.name,`${s}: Command not found`);const o=u.manual;if(!o)return r.writeError(d,this.name,`${s}: No manual found`);const a=e=>e.split(`
`).map(n=>" ".repeat(E)+n).join(`
`),t=[["NAME"]];o.purpose?t[0].push(a(`${s} - ${w.decoration.dim}${p.yellow(o.purpose)}`)):t[0].push(a(s)),o.usage&&t.push(["SYNOPSIS",a(o.usage)]),o.description&&t.push(["DESCRIPTION",a(o.description)]),o.options&&t.push(["OPTIONS",a(Object.entries(o.options).map(([e,n])=>{let i=e.split(" ");const h=i[0].slice(1);i=i.slice(1);let m="-"+h;const g=u.options.find(j=>j.short==h);return g!==void 0&&(m+=", --"+g.long),i.length&&(m+=" "+p.dim(i.join(" "))),`${m} ${w.decoration.dim}${p.yellow(String(n))}`}).join(`
`))]);const S=t.map(e=>(e[0]=p.yellow(e[0]),e.join(`
`))).join(`

`);await r.printLn(c,S)});export{O as man};
