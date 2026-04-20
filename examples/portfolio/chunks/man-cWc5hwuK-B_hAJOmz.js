import{q as j,k as f,O as r,a as $,s as p}from"../index.js";const E=5,y=new j().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).addOption({short:"k",long:"apropos"}).setExecute(function(l,{options:w,stdout:c,stderr:d}){if(w.includes("k")){const e=f.builtins.filter(o=>o.name.match(l[0].toLowerCase())).map(o=>o.manual?.purpose?`${o.name} - ${o.manual.purpose}`:o.name).sort().join(`
`);r.printLn(c,e);return}const s=l[0].toLowerCase(),u=f.getBuiltin(s);if(!u)return r.writeError(d,this.name,`${s}: Command not found`);const n=u.manual;if(!n)return r.writeError(d,this.name,`${s}: No manual found`);const a=e=>e.split(`
`).map(o=>" ".repeat(E)+o).join(`
`),t=[["NAME"]];n.purpose?t[0].push(a(`${s} - ${$.decoration.dim}${p.yellow(n.purpose)}`)):t[0].push(a(s)),n.usage&&t.push(["SYNOPSIS",a(n.usage)]),n.description&&t.push(["DESCRIPTION",a(n.description)]),n.options&&t.push(["OPTIONS",a(Object.entries(n.options).map(([e,o])=>{let i=e.split(" ");const h=i[0].slice(1);i=i.slice(1);let m="-"+h;const g=u.options.find(S=>S.short==h);return g!==void 0&&(m+=", --"+g.long),i.length&&(m+=" "+p.dim(i.join(" "))),`${m} ${$.decoration.dim}${p.yellow(String(o))}`}).join(`
`))]);const O=t.map(e=>(e[0]=p.yellow(e[0]),e.join(`
`))).join(`

`);r.printLn(c,O)});export{y as man};
