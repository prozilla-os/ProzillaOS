import{M as p}from"./index-2Gh5Oyah.js";import{C as _}from"./command-DZiH-9YI.js";const m=`
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,x=new _().setRequireArgs(!0).setManual({purpose:"Show a cow saying something",usage:"cowsay text",description:"Show ASCII art of a cow saying something."}).setExecute(function(w,u){const{rawInputValue:c}=u,l=c==null?void 0:c.split(" "),o=[];let s="",r=0;const a=e=>{e=e.trimEnd(),o.push(e),e.length>r&&(r=e.length)},h=e=>{a(s),e?s=e+" ":s=""};l==null||l.forEach(e=>{if(e===""){s+=" ";return}const t=e.split(`
`);for(let n=0;n<t.length;n++){const i=t[n];if(n>0&&h(),(s+i).length<=p)s+=i+" ";else if(i.length>p){const f=p-s.length;f>=2?(a(s+i.substring(0,f-1)+"-"),s=i.substring(f-1)+" "):h(i)}else h(i)}}),s.length>0&&a(s);const g=[` ${"_".repeat(r+2)} `];for(let e=0;e<o.length;e++){let t=o[e];const n=r-t.length;n>0&&(t+=" ".repeat(n)),o.length>1?e===0?t=`/ ${t} \\`:e===o.length-1?t=`\\ ${t} /`:t=`| ${t} |`:t=`< ${t} >`,g.push(t)}return g.push(` ${"-".repeat(r+2)} `),g.join(`
`)+m});export{x as cowsay};
