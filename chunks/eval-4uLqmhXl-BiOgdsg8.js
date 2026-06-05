import{d as c,B as i,j as u}from"../index.js";import"./react-jsx-runtime-VhLgLYuD.js";import"./react-gKvwg2Xh.js";import"./react-dom-DTDwsevO.js";const v=new c().setRequireArgs(!0).setManual({purpose:"Evaluate and execute JavaScript code",usage:"eval [input]",description:"Executes JavaScript code with access to the shell."}).setExecute(async function(r,e){const{stdout:o,stderr:s}=e,n=r.join(" ");try{const t=new Function("context",`
				with(context) { 
					return (${n}); 
				}
			`)(e);return t!==void 0&&await o.write(String(t)),i.success}catch(t){const a=t instanceof Error?t.message:"Execution error";return u.writeError(s,this.name,a)}});export{v as eval,v as evalCommand};
