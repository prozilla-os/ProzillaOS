import{_ as w,K as _,a as u}from"../index.js";const f=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;function y(p){const i=p.trim().split(/\s/),e=[];let s="",o=0;const c=t=>{t=t.trimEnd(),e.push(t),t.length>o&&(o=t.length)},l=t=>{c(s),s=t?t+" ":""};i.forEach(t=>{if(t===""){s+=" ";return}const n=t.split(`
`);for(let a=0;a<n.length;a++){const r=n[a];if(a>0&&l(),(s+r).length<=u)s+=r+" ";else if(r.length>u){const h=u-s.length;h>=2?(c(s+r.substring(0,h-1)+"-"),s=r.substring(h-1)+" "):l(r)}else l(r)}}),s.length>0&&c(s);const g=[` ${"_".repeat(o+2)} `];for(let t=0;t<e.length;t++){let n=e[t];const a=o-n.length;a>0&&(n+=" ".repeat(a)),e.length>1?t===0?n=`/ ${n} \\`:t===e.length-1?n=`\\ ${n} /`:n=`| ${n} |`:n=`< ${n} >`,g.push(n)}return g.push(` ${"-".repeat(o+2)} `),g.join(`
`)+f+`
`}const $=new w().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(async function(p,{rawLine:i,stdout:e,stdin:s}){return await _.readInput(i,s,async o=>{await _.printLn(e,y(o))})});export{$ as cowsay};
