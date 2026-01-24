import{E,b as M,A as e}from"../index.js";const n=5,g=2,c=[e.fg.red,e.fg.yellow,e.fg.green,e.fg.cyan,e.fg.blue,e.fg.magenta],I=new E().setManual({purpose:"Display text with a rainbow effect"}).setExecute(function(d,i){const{rawInputValue:r,timestamp:p}=i;if(r==null)return;let o=M(r).split(`
`);const h=p/100;return o=o.map((l,m)=>{const s=[],f=m+h,a=n-g*f%n;let w=Math.floor(f/(n/g));const u=(t,b)=>{const x=l.substring(t,b),y=c[w++%c.length];s.push(y+x)};a>0&&u(0,a);for(let t=a;t<l.length;t+=n+1)u(t,t+n+1);return l.length===0?"":s.join("")}),o.join(`
`)});export{I as lolcat};
