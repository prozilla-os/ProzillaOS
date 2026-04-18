import{G as c,y as i,O as u}from"../index.js";const l=new c().setRequireArgs(!0).setManual({purpose:"Evaluate and execute JavaScript code",usage:"eval [input]",description:"Executes JavaScript code with access to the shell."}).setExecute(function(r,t){const{stdout:s,stderr:n}=t,o=r.join(" ");try{const e=new Function("context",`
				with(context) { 
					return (${o}); 
				}
			`)(t);return e!==void 0&&s.write(String(e)),i.success}catch(e){const a=e instanceof Error?e.message:"Execution error";return u.writeError(n,this.name,a)}});export{l as eval,l as evalCommand};
