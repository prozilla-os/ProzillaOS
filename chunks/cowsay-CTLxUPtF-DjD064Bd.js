import{K as _,A as w,e as u}from"../index.js";const f=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;function m(p){const i=p.trim().split(/\s/),e=[];let s="",o=0;const c=t=>{t=t.trimEnd(),e.push(t),t.length>o&&(o=t.length)},l=t=>{c(s),s=t?t+" ":""};i.forEach(t=>{if(t===""){s+=" ";return}const n=t.split(`
`);for(let r=0;r<n.length;r++){const a=n[r];if(r>0&&l(),(s+a).length<=u)s+=a+" ";else if(a.length>u){const h=u-s.length;h>=2?(c(s+a.substring(0,h-1)+"-"),s=a.substring(h-1)+" "):l(a)}else l(a)}}),s.length>0&&c(s);const g=[` ${"_".repeat(o+2)} `];for(let t=0;t<e.length;t++){let n=e[t];const r=o-n.length;r>0&&(n+=" ".repeat(r)),e.length>1?t===0?n=`/ ${n} \\`:t===e.length-1?n=`\\ ${n} /`:n=`| ${n} |`:n=`< ${n} >`,g.push(n)}return g.push(` ${"-".repeat(o+2)} `),g.join(`
`)+f+`
`}const $=new _().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(async function(p,{rawLine:i,stdout:e,stdin:s}){return await w.readInput(i,s,async o=>{await w.printLn(e,m(o))})});export{$ as cowsay};
