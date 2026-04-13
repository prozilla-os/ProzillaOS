import{B as _,a as f,c as u}from"../index.js";const w=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;function m(p){const i=p.split(" "),s=[];let n="",o=0;const l=t=>{t=t.trimEnd(),s.push(t),t.length>o&&(o=t.length)},c=t=>{l(n),n=t?t+" ":""};i.forEach(t=>{if(t===""){n+=" ";return}const e=t.split(`
`);for(let r=0;r<e.length;r++){const a=e[r];if(r>0&&c(),(n+a).length<=u)n+=a+" ";else if(a.length>u){const h=u-n.length;h>=2?(l(n+a.substring(0,h-1)+"-"),n=a.substring(h-1)+" "):c(a)}else c(a)}}),n.length>0&&l(n);const g=[` ${"_".repeat(o+2)} `];for(let t=0;t<s.length;t++){let e=s[t];const r=o-e.length;r>0&&(e+=" ".repeat(r)),s.length>1?t===0?e=`/ ${e} \\`:t===s.length-1?e=`\\ ${e} /`:e=`| ${e} |`:e=`< ${e} >`,g.push(e)}return g.push(` ${"-".repeat(o+2)} `),g.join(`
`)+w+`
`}const d=new _().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(function(p,{rawLine:i,stdout:s,stdin:n}){return f.readInput(i,n,o=>{s.write(m(o))})});export{d as cowsay};
