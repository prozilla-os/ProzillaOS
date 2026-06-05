import{d as S,b as f,j as r,i as $,s as p}from"../index.js";import"./react-jsx-runtime-VhLgLYuD.js";import"./react-gKvwg2Xh.js";import"./react-dom-DTDwsevO.js";const E=5,C=new S().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).addOption({short:"k",long:"apropos"}).setExecute(async function(l,{options:w,stdout:c,stderr:d}){if(w.includes("k")){const t=f.builtins.filter(o=>o.name.match(l[0].toLowerCase())).map(o=>o.manual?.purpose?`${o.name} - ${o.manual.purpose}`:o.name).sort().join(`
`);await r.printLn(c,t);return}const s=l[0].toLowerCase(),m=f.getBuiltin(s);if(!m)return r.writeError(d,this.name,`${s}: Command not found`);const n=m.manual;if(!n)return r.writeError(d,this.name,`${s}: No manual found`);const a=t=>t.split(`
`).map(o=>" ".repeat(E)+o).join(`
`),e=[["NAME"]];n.purpose?e[0].push(a(`${s} - ${$.decoration.dim}${p.yellow(n.purpose)}`)):e[0].push(a(s)),n.usage&&e.push(["SYNOPSIS",a(n.usage)]),n.description&&e.push(["DESCRIPTION",a(n.description)]),n.options&&e.push(["OPTIONS",a(Object.entries(n.options).map(([t,o])=>{let i=t.split(" ");const h=i[0].slice(1);i=i.slice(1);let u="-"+h;const g=m.options.find(y=>y.short==h);return g!==void 0&&(u+=", --"+g.long),i.length&&(u+=" "+p.dim(i.join(" "))),`${u} ${$.decoration.dim}${p.yellow(String(o))}`}).join(`
`))]);const j=e.map(t=>(t[0]=p.yellow(t[0]),t.join(`
`))).join(`

`);await r.printLn(c,j)});export{C as man};
