import{I as _,V as f,b as u}from"../index.js";const w=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;function m(p){const a=p.split(" "),s=[];let n="",o=0;const l=t=>{t=t.trimEnd(),s.push(t),t.length>o&&(o=t.length)},g=t=>{l(n),n=t?t+" ":""};a.forEach(t=>{if(t===""){n+=" ";return}const e=t.split(`
`);for(let r=0;r<e.length;r++){const i=e[r];if(r>0&&g(),(n+i).length<=u)n+=i+" ";else if(i.length>u){const c=u-n.length;c>=2?(l(n+i.substring(0,c-1)+"-"),n=i.substring(c-1)+" "):g(i)}else g(i)}}),n.length>0&&l(n);const h=[` ${"_".repeat(o+2)} `];for(let t=0;t<s.length;t++){let e=s[t];const r=o-e.length;r>0&&(e+=" ".repeat(r)),s.length>1?t===0?e=`/ ${e} \\`:t===s.length-1?e=`\\ ${e} /`:e=`| ${e} |`:e=`< ${e} >`,h.push(e)}return h.push(` ${"-".repeat(o+2)} `),h.join(`
`)+w+`
`}const d=new _().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(function(p,{rawLine:a,stdout:s,stdin:n}){return f.readInput(a,n,o=>{s.write(m(o))})});export{d as cowsay};
