import{N as f,b as c}from"../index.js";const w=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,y=new f().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(function($,u){const{rawInputValue:p}=u,_=p?.split(" "),l=[];let s="",r=0;const a=e=>{e=e.trimEnd(),l.push(e),e.length>r&&(r=e.length)},g=e=>{a(s),e?s=e+" ":s=""};_?.forEach(e=>{if(e===""){s+=" ";return}const t=e.split(`
`);for(let n=0;n<t.length;n++){const o=t[n];if(n>0&&g(),(s+o).length<=c)s+=o+" ";else if(o.length>c){const i=c-s.length;i>=2?(a(s+o.substring(0,i-1)+"-"),s=o.substring(i-1)+" "):g(o)}else g(o)}}),s.length>0&&a(s);const h=[` ${"_".repeat(r+2)} `];for(let e=0;e<l.length;e++){let t=l[e];const n=r-t.length;n>0&&(t+=" ".repeat(n)),l.length>1?e===0?t=`/ ${t} \\`:e===l.length-1?t=`\\ ${t} /`:t=`| ${t} |`:t=`< ${t} >`,h.push(t)}return h.push(` ${"-".repeat(r+2)} `),h.join(`
`)+w});export{y as cowsay};
