import{B as c,$ as i,a as u}from"../index.js";const l=new c().setRequireArgs(!0).setManual({purpose:"Evaluate and execute JavaScript code",usage:"eval [input]",description:"Executes JavaScript code with access to the shell."}).setExecute(function(r,t){const{stdout:s,stderr:a}=t,n=r.join(" ");try{const e=new Function("context",`
				with(context) { 
					return (${n}); 
				}
			`)(t);return e!==void 0&&s.write(String(e)),i.success}catch(e){const o=e instanceof Error?e.message:"Execution error";return u.writeError(a,this.name,o)}});export{l as eval,l as evalCommand};
