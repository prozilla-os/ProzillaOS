import{I as O,H as g,V as f,h as w,n as r}from"../index.js";const y=5,I=new O().setRequireArgs(!0).setManual({purpose:"Show system reference manuals",usage:`man [options] page
man -k [options] regexp`,description:`Each page arguments given to man is normally the name of a command.
The manual page associated with this command is then found and displayed.`,options:{"-k":"Search for manual page using regexp"}}).addOption({short:"k",long:"apropos"}).setExecute(function(u,{options:$,stdout:d,stderr:l}){if($.includes("k")){const e=g.search(u[0].toLowerCase()).map(n=>n.manual?.purpose?`${n.name} - ${n.manual.purpose}`:n.name).sort().join(`
`);d.write(e+`
`);return}const t=u[0].toLowerCase(),p=g.find(t);if(!p)return f.writeError(l,this.name,`${t}: Command not found`);const o=p.manual;if(!o)return f.writeError(l,this.name,`${t}: No manual found`);const a=e=>e.split(`
`).map(n=>" ".repeat(y)+n).join(`
`),s=[["NAME"]];o.purpose?s[0].push(a(`${t} - ${w.decoration.dim}${r.yellow(o.purpose)}`)):s[0].push(a(t)),o.usage&&s.push(["SYNOPSIS",a(o.usage)]),o.description&&s.push(["DESCRIPTION",a(o.description)]),o.options&&s.push(["OPTIONS",a(Object.entries(o.options).map(([e,n])=>{let i=e.split(" ");const c=i[0].slice(1);i=i.slice(1);let m="-"+c;const h=p.options.find(j=>j.short==c);return h!==void 0&&(m+=", --"+h.long),i.length&&(m+=" "+r.dim(i.join(" "))),`${m} ${w.decoration.dim}${r.yellow(String(n))}`}).join(`
`))]);const S=s.map(e=>(e[0]=r.yellow(e[0]),e.join(`
`))).join(`

`);d.write(S+`
`)});export{I as man};
