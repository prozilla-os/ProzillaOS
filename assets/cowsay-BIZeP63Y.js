import{M as h}from"./index-BzGRhk09.js";import{C as u}from"./command-Clc1HLU6.js";const _=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,$=new u().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(function(m,{rawInputValue:f}){const p=f.split(" "),o=[];let s="",r=0;const l=e=>{e=e.trimEnd(),o.push(e),e.length>r&&(r=e.length)},a=e=>{l(s),e?s=e+" ":s=""};p.forEach(e=>{if(e===""){s+=" ";return}const t=e.split(`
`);for(let n=0;n<t.length;n++){const i=t[n];if(n>0&&a(),(s+i).length<=h)s+=i+" ";else if(i.length>h){const g=h-s.length;g>=2?(l(s+i.substring(0,g-1)+"-"),s=i.substring(g-1)+" "):a(i)}else a(i)}}),s.length>0&&l(s);const c=[` ${"_".repeat(r+2)} `];for(let e=0;e<o.length;e++){let t=o[e];const n=r-t.length;n>0&&(t+=" ".repeat(n)),o.length>1?e===0?t=`/ ${t} \\`:e===o.length-1?t=`\\ ${t} /`:t=`| ${t} |`:t=`< ${t} >`,c.push(t)}return c.push(` ${"-".repeat(r+2)} `),c.join(`
`)+_});export{$ as cowsay};
