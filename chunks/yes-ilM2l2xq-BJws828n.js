import{s as o,B as a}from"../index.js";const u=new o().setManual({purpose:"Output a string repeatedly until killed",usage:"yes [STRING]...",description:"Repeatedly output a line with all specified STRING(s), or 'y'."}).setExecute(async function(t,{stdout:s,stdin:e}){const n=(t.length>0?t.join(" "):"y")+`
`;return await a.loop({stdout:s,stdin:e,task:()=>n})});export{u as yes};
