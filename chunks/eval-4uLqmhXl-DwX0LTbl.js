import{d as o,B as i,j as u}from"../index.js";const l=new o().setRequireArgs(!0).setManual({purpose:"Evaluate and execute JavaScript code",usage:"eval [input]",description:"Executes JavaScript code with access to the shell."}).setExecute(async function(r,t){const{stdout:s,stderr:n}=t,a=r.join(" ");try{const e=new Function("context",`
				with(context) { 
					return (${a}); 
				}
			`)(t);return e!==void 0&&await s.write(String(e)),i.success}catch(e){const c=e instanceof Error?e.message:"Execution error";return u.writeError(n,this.name,c)}});export{l as eval,l as evalCommand};
