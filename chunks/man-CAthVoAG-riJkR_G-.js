import{_ as y,A as $,K as r,s as f,o as p}from"../index.js";import"./react-jsx-runtime-VhLgLYuD.js";import"./react-gKvwg2Xh.js";import"./react-dom-DTDwsevO.js";const E=5,A=new y().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).addOption({short:"k",long:"apropos"}).setExecute(async function(c,{options:w,stdout:d,stderr:h}){if(w.includes("k")){const e=$.builtins.filter(o=>o.name.match(c[0].toLowerCase())).map(o=>o.manual?.purpose?`${o.name} - ${o.manual.purpose}`:o.name).sort().join(`
`);await r.printLn(d,e);return}const m=c[0].toLowerCase(),s=$.getBuiltin(m);if(!s)return r.writeError(h,this.name,`${m}: Command not found`);const n=s.manual;if(!n)return r.writeError(h,this.name,`${m}: No manual found`);const a=e=>e.split(`
`).map(o=>" ".repeat(E)+o).join(`
`),t=[["NAME"]];n.purpose?t[0].push(a(`${s.name} - ${f.decoration.dim}${p.yellow(n.purpose)}`)):t[0].push(a(s.name)),n.usage&&t.push(["SYNOPSIS",a(n.usage)]),n.description&&t.push(["DESCRIPTION",a(n.description)]),n.options&&t.push(["OPTIONS",a(Object.entries(n.options).map(([e,o])=>{let i=e.split(" ");const g=i[0].slice(1);i=i.slice(1);let u="-"+g;const l=s.options.find(j=>j.short==g);return l!==void 0&&l.long!==void 0&&(u+=", --"+l.long),i.length&&(u+=" "+p.dim(i.join(" "))),`${u} ${f.decoration.dim}${p.yellow(String(o))}`}).join(`
`))]);const S=t.map(e=>(e[0]=p.yellow(e[0]),e.join(`
`))).join(`

`);await r.printLn(d,S)});export{A as man};
