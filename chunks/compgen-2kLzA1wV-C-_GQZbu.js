import{d as i,j as n,b as a}from"../index.js";import"./react-jsx-runtime-VhLgLYuD.js";import"./react-gKvwg2Xh.js";import"./react-dom-DTDwsevO.js";const c=new i().setManual({purpose:"Display a list of all commands"}).setRequireOptions(!0).setExecute(async function(e,{options:t,stdout:o}){t.includes("c")&&await n.printLn(o,a.builtins.map(s=>s.name).sort().join(`
`))});export{c as compgen};
