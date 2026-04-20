import{q as f,O as _,d as u}from"../index.js";const w=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;function d(p){const a=p.split(" "),s=[];let e="",o=0;const l=t=>{t=t.trimEnd(),s.push(t),t.length>o&&(o=t.length)},g=t=>{l(e),e=t?t+" ":""};a.forEach(t=>{if(t===""){e+=" ";return}const n=t.split(`
`);for(let r=0;r<n.length;r++){const i=n[r];if(r>0&&g(),(e+i).length<=u)e+=i+" ";else if(i.length>u){const c=u-e.length;c>=2?(l(e+i.substring(0,c-1)+"-"),e=i.substring(c-1)+" "):g(i)}else g(i)}}),e.length>0&&l(e);const h=[` ${"_".repeat(o+2)} `];for(let t=0;t<s.length;t++){let n=s[t];const r=o-n.length;r>0&&(n+=" ".repeat(r)),s.length>1?t===0?n=`/ ${n} \\`:t===s.length-1?n=`\\ ${n} /`:n=`| ${n} |`:n=`< ${n} >`,h.push(n)}return h.push(` ${"-".repeat(o+2)} `),h.join(`
`)+w+`
`}const $=new f().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(function(p,{rawLine:a,stdout:s,stdin:e}){return _.readInput(a,e,o=>{_.printLn(s,d(o))})});export{$ as cowsay};
