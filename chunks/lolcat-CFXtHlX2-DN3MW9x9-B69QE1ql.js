import{N as d,O as j,u as e}from"../index.js";const n=5,g=2,c=[e.fg.red,e.fg.yellow,e.fg.green,e.fg.cyan,e.fg.blue,e.fg.magenta],O=new d().setManual({purpose:"Display text with a rainbow effect"}).setExecute(function(M,i){const{rawInputValue:a,timestamp:p}=i;if(a==null)return;let l=j(a).split(`
`);const m=p/100;return l=l.map((o,h)=>{const r=[],u=h+m,s=n-g*u%n;let w=Math.floor(u/(n/g));const f=(t,b)=>{const y=o.substring(t,b),x=c[w++%c.length];r.push(x+y)};s>0&&f(0,s);for(let t=s;t<o.length;t+=n+1)f(t,t+n+1);return o.length===0?"":r.join("")}),l.join(`
`)});export{O as lolcat};
