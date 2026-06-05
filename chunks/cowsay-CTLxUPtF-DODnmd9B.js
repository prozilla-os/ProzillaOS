import{d as _,j as w,h as p}from"../index.js";import"./react-jsx-runtime-VhLgLYuD.js";import"./react-gKvwg2Xh.js";import"./react-dom-DTDwsevO.js";const f=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;function m(u){const a=u.trim().split(/\s/),e=[];let s="",o=0;const h=t=>{t=t.trimEnd(),e.push(t),t.length>o&&(o=t.length)},c=t=>{h(s),s=t?t+" ":""};a.forEach(t=>{if(t===""){s+=" ";return}const n=t.split(`
`);for(let r=0;r<n.length;r++){const i=n[r];if(r>0&&c(),(s+i).length<=p)s+=i+" ";else if(i.length>p){const g=p-s.length;g>=2?(h(s+i.substring(0,g-1)+"-"),s=i.substring(g-1)+" "):c(i)}else c(i)}}),s.length>0&&h(s);const l=[` ${"_".repeat(o+2)} `];for(let t=0;t<e.length;t++){let n=e[t];const r=o-n.length;r>0&&(n+=" ".repeat(r)),e.length>1?t===0?n=`/ ${n} \\`:t===e.length-1?n=`\\ ${n} /`:n=`| ${n} |`:n=`< ${n} >`,l.push(n)}return l.push(` ${"-".repeat(o+2)} `),l.join(`
`)+f+`
`}const E=new _().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(async function(u,{rawLine:a,stdout:e,stdin:s}){return await w.readInput(a,s,async o=>{await w.printLn(e,m(o))})});export{E as cowsay};
