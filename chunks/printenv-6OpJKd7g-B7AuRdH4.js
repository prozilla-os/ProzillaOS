import{B as s}from"../index.js";const p=new s().setManual({purpose:"Print all or part of environment",usage:"printenv [VARIABLE]...",description:"Print the values of the specified environment VARIABLE(s).  If no VARIABLE is specified, print name and value pairs for them all."}).setExecute(function(n,{stdout:i,env:o}){const r=o.exportedVariables;if(n.length>0){n.forEach(t=>{const e=r[t];e!==void 0&&i.write(`${e}
`)});return}Object.entries(r).forEach(([t,e])=>{i.write(`${t}=${e}
`)})});export{p as printenv};
