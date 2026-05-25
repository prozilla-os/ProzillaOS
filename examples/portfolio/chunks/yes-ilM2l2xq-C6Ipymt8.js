import{v as o,B as a}from"../index.js";const u=new o().setManual({purpose:"Output a string repeatedly until killed",usage:"yes [STRING]...",description:"Repeatedly output a line with all specified STRING(s), or 'y'."}).setExecute(async function(t,{stdout:e,stdin:s}){const n=(t.length>0?t.join(" "):"y")+`
`;return await a.loop({stdout:e,stdin:s,task:()=>n})});export{u as yes};
