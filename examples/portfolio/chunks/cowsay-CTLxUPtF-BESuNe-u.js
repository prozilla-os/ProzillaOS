import{d as _,j as w,h as u}from"../index.js";const f=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;function d(p){const i=p.trim().split(/\s/),e=[];let s="",o=0;const h=t=>{t=t.trimEnd(),e.push(t),t.length>o&&(o=t.length)},c=t=>{h(s),s=t?t+" ":""};i.forEach(t=>{if(t===""){s+=" ";return}const n=t.split(`
`);for(let r=0;r<n.length;r++){const a=n[r];if(r>0&&c(),(s+a).length<=u)s+=a+" ";else if(a.length>u){const g=u-s.length;g>=2?(h(s+a.substring(0,g-1)+"-"),s=a.substring(g-1)+" "):c(a)}else c(a)}}),s.length>0&&h(s);const l=[` ${"_".repeat(o+2)} `];for(let t=0;t<e.length;t++){let n=e[t];const r=o-n.length;r>0&&(n+=" ".repeat(r)),e.length>1?t===0?n=`/ ${n} \\`:t===e.length-1?n=`\\ ${n} /`:n=`| ${n} |`:n=`< ${n} >`,l.push(n)}return l.push(` ${"-".repeat(o+2)} `),l.join(`
`)+f+`
`}const y=new _().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(async function(p,{rawLine:i,stdout:e,stdin:s}){return await w.readInput(i,s,async o=>{await w.printLn(e,d(o))})});export{y as cowsay};
