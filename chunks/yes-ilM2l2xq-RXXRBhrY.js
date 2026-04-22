import{K as n,A as o}from"../index.js";const u=new n().setManual({purpose:"Output a string repeatedly until killed",usage:"yes [STRING]...",description:"Repeatedly output a line with all specified STRING(s), or 'y'."}).setExecute(async function(t,{stdout:e,stdin:s}){const a=(t.length>0?t.join(" "):"y")+`
`;return await o.loop({stdout:e,stdin:s,task:()=>a})});export{u as yes};
