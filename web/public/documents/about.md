# About kuhlekt1vOS

A custom web OS built to explore, experiment, and run real tools in real time.

---

## What is kuhlekt1vOS?

kuhlekt1vOS is my experiment in bending the rules of what a “web app” is allowed to be.

Instead of porting traditional CLI tools into clunky browser UI equivalents, I’m building a system where real utilities run behind the scenes—powered by Azure Functions—but feel like native terminal tools inside a browser-based OS.

At its core, kühlEkt1vOS is built on top of [**ProzillaOS**](https://os.prozilla.dev/docs/), a component-driven web desktop framework. I took the open‑source packages apart, rebuilt the pieces I needed, and customized the rest until they behaved _exactly_ how I wanted.

## System Architecture
flowchart LR
	subgraph Client["User Browser"]
		A[Main Web App]
	end

	A --> B[Prozilla OS<br/>Azure App Service]

	subgraph Backend["Microservices Layer"]
		B --> C1[Azure Function<br/>Utility 1]
		B --> C2[Azure Function<br/>Utility 2]
		B --> C3[Azure Function<br/>Utility N]
	end
	
	C1 -. optional .-> D[(Database)]
	C2 -. optional .-> E[(Blob Storage)]
	C3 -. optional .-> F[(Key-Value / Cache)]
	
## Why Build a Browser-Based OS?

Because the browser isn’t just where the tools run — it *is* part of the toolset.

kuhlekt1vOS is my way of building a dedicated environment to house everything I’ve been experimenting with: custom utilities, microservices, UI frameworks, terminal-style interfaces, and cloud-backed workflows. Instead of scattering these projects across repos or demos, the OS becomes a centralized system where each piece can evolve together.

This OS turns the browser into a curated workspace, a living portfolio, and an experimental platform for trying ideas that don’t fit neatly into traditional applications.
