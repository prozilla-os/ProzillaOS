import{I as s}from"../index.js";const t=new s().setManual({purpose:"Clear terminal screen"}).setExecute(function(a,{shell:e}){e.pushHistory({clear:!0,isCommand:!1})});export{t as clear};
