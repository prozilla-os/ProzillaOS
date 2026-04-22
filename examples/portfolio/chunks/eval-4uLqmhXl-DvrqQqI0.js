import{K as o,h as i,A as u}from"../index.js";const h=new o().setRequireArgs(!0).setManual({purpose:"Evaluate and execute JavaScript code",usage:"eval [input]",description:"Executes JavaScript code with access to the shell."}).setExecute(async function(s,t){const{stdout:r,stderr:a}=t,n=s.join(" ");try{const e=new Function("context",`
				with(context) { 
					return (${n}); 
				}
			`)(t);return e!==void 0&&await r.write(String(e)),i.success}catch(e){const c=e instanceof Error?e.message:"Execution error";return u.writeError(a,this.name,c)}});export{h as eval,h as evalCommand};
