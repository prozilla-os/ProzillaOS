import{v as c}from"../index.js";import{o as f}from"./command-nBL1aO7T-CliNWZCP.js";const w=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,y=new f().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(function(m,_){const{rawInputValue:u}=_,p=u==null?void 0:u.split(" "),l=[];let e="",r=0;const i=t=>{t=t.trimEnd(),l.push(t),t.length>r&&(r=t.length)},g=t=>{i(e),t?e=t+" ":e=""};p==null||p.forEach(t=>{if(t===""){e+=" ";return}const n=t.split(`
`);for(let s=0;s<n.length;s++){const o=n[s];if(s>0&&g(),(e+o).length<=c)e+=o+" ";else if(o.length>c){const a=c-e.length;a>=2?(i(e+o.substring(0,a-1)+"-"),e=o.substring(a-1)+" "):g(o)}else g(o)}}),e.length>0&&i(e);const h=[` ${"_".repeat(r+2)} `];for(let t=0;t<l.length;t++){let n=l[t];const s=r-n.length;s>0&&(n+=" ".repeat(s)),l.length>1?t===0?n=`/ ${n} \\`:t===l.length-1?n=`\\ ${n} /`:n=`| ${n} |`:n=`< ${n} >`,h.push(n)}return h.push(` ${"-".repeat(r+2)} `),h.join(`
`)+w});export{y as cowsay};
