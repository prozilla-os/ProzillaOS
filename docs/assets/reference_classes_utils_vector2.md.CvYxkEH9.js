import{_ as i,D as n,c as r,j as e,a as t,I as a,a2 as o,o as c}from"./chunks/framework.DjNjcvZH.js";const he=JSON.parse('{"title":"Class Vector2","description":"","frontmatter":{"outline":"deep","head":[["meta",{"name":"og:title","content":"Class Vector2 | ProzillaOS Docs"}],["meta",{"name":"twitter:title","content":"Class Vector2 | ProzillaOS Docs"}],["meta",{"name":"og:description","content":"Documentation for ProzillaOS and its packages."}],["meta",{"name":"twitter:description","content":"Documentation for ProzillaOS and its packages."}],["link",{"rel":"canonical","href":"https://os.prozilla.dev/docs/reference/classes/utils/vector2"}],["meta",{"name":"og:url","content":"https://os.prozilla.dev/docs/reference/classes/utils/vector2"}],["meta",{"name":"twitter:url","content":"https://os.prozilla.dev/docs/reference/classes/utils/vector2"}],["meta",{"name":"og:locale","content":"en_US"}],["meta",{"name":"og:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"twitter:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"og:type","content":"website"}],["meta",{"name":"twitter:card","content":"summary_large_image"}]]},"headers":[],"relativePath":"reference/classes/utils/vector2.md","filePath":"reference/classes/utils/vector2.md"}'),l={name:"reference/classes/utils/vector2.md"},h=o('<h1 id="class-vector2" tabindex="-1">Class <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/math/vector2.ts" target="_blank" rel="noreferrer"><code>Vector2</code></a> <a class="header-anchor" href="#class-vector2" aria-label="Permalink to &quot;Class [`Vector2`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/math/vector2.ts)&quot;">​</a></h1><h2 id="constructor" tabindex="-1">Constructor <a class="header-anchor" href="#constructor" aria-label="Permalink to &quot;Constructor&quot;">​</a></h2><blockquote><p><code>new Vector2(x, y)</code></p></blockquote><h3 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><p><strong>x</strong> : <code>number</code></p></li><li><p><strong>y</strong> : <code>number</code> (optional)</p></li></ul><div class="tip custom-block github-alert"><p class="custom-block-title">TIP</p><p>If you leave out the parameter <code>y</code>, the properties <code>x</code> and <code>y</code> will be set to the same value, e.g.:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Vector2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Vector2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div></div><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="x" tabindex="-1">x : <code>number</code> <a class="header-anchor" href="#x" aria-label="Permalink to &quot;x : `number` {#x}&quot;">​</a></h3><h3 id="y" tabindex="-1">y : <code>number</code> <a class="header-anchor" href="#y" aria-label="Permalink to &quot;y : `number` {#y}&quot;">​</a></h3>',9),d={id:"zero",tabindex:"-1"},p=e("code",null,"Vector2",-1),k=e("a",{class:"header-anchor",href:"#zero","aria-label":'Permalink to "ZERO : `Vector2` <Badge type="info" text="static"/> {#zero}"'},"​",-1),u=o('<p>Returns a vector with each value set to zero</p><blockquote><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vector2.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ZERO</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> --&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Vector2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div></blockquote><h3 id="clone" tabindex="-1">clone : <code>Vector2</code> <a class="header-anchor" href="#clone" aria-label="Permalink to &quot;clone : `Vector2` {#clone}&quot;">​</a></h3><p>Returns a clone of this vector</p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="round" tabindex="-1">round () =&gt; <code>this</code> <a class="header-anchor" href="#round" aria-label="Permalink to &quot;round () =&gt; `this` {#round}&quot;">​</a></h3><p>Round the values of this vector to full numbers</p><blockquote><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Vector2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Vector2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div></blockquote><h3 id="get-distance" tabindex="-1">getDistance (x : <code>number</code>, y : <code>number</code>) =&gt; <code>number</code> <a class="header-anchor" href="#get-distance" aria-label="Permalink to &quot;getDistance (x : `number`, y : `number`) =&gt; `number` {#get-distance}&quot;">​</a></h3><h3 id="getdistance-vector2-vector2-number" tabindex="-1">getDistance (vector2 : <code>Vector2</code>) =&gt; <code>number</code> <a class="header-anchor" href="#getdistance-vector2-vector2-number" aria-label="Permalink to &quot;getDistance (vector2 : `Vector2`) =&gt; `number`&quot;">​</a></h3><p>Get the distance between this vector and another</p>',11),_={id:"add",tabindex:"-1"},g=e("code",null,"Vector2",-1),m=e("code",null,"Vector2",-1),b=e("code",null,"Vector2",-1),v=e("a",{class:"header-anchor",href:"#add","aria-label":'Permalink to "add (vector2A : `Vector2`, vector2B: `Vector2`) => `Vector2` <Badge type="info" text="static"/> {#add}"'},"​",-1),y=e("p",null,"Add two vectors together",-1),E={id:"subtract",tabindex:"-1"},f=e("code",null,"Vector2",-1),V=e("code",null,"Vector2",-1),x=e("code",null,"Vector2",-1),C=e("a",{class:"header-anchor",href:"#subtract","aria-label":'Permalink to "subtract (vector2A : `Vector2`, vector2B: `Vector2`) => `Vector2` <Badge type="info" text="static"/> {#subtract}"'},"​",-1),F=e("p",null,"Subtract two vectors",-1),B={id:"scale",tabindex:"-1"},P=e("code",null,"Vector2",-1),q=e("code",null,"number",-1),z=e("code",null,"Vector2",-1),A=e("a",{class:"header-anchor",href:"#scale","aria-label":'Permalink to "scale (vector2 : `Vector2`, scalar: `number`) => `Vector2` <Badge type="info" text="static"/> {#scale}"'},"​",-1),D=e("p",null,"Scale a vector",-1),w={id:"magnitude",tabindex:"-1"},S=e("code",null,"Vector2",-1),T=e("code",null,"number",-1),O=e("a",{class:"header-anchor",href:"#magnitude","aria-label":'Permalink to "magnitude (vector2 : `Vector2`) => `number` <Badge type="info" text="static"/> {#magnitude}"'},"​",-1),R=e("p",null,"Get the magnitude of a vector",-1),I={id:"normalize",tabindex:"-1"},N=e("code",null,"Vector2",-1),G=e("code",null,"Vector2",-1),$=e("a",{class:"header-anchor",href:"#normalize","aria-label":'Permalink to "normalize (vector2 : `Vector2`) => `Vector2` <Badge type="info" text="static"/> {#normalize}"'},"​",-1),Z=e("p",null,"Get the magnitude of a vector",-1),M={id:"sqr-distance",tabindex:"-1"},j=e("code",null,"Vector2",-1),J=e("code",null,"Vector2",-1),L=e("code",null,"number",-1),U=e("a",{class:"header-anchor",href:"#sqr-distance","aria-label":'Permalink to "sqrDistance (vector2A : `Vector2`, vector2B : `Vector2`) => `number` <Badge type="info" text="static"/> {#sqr-distance}"'},"​",-1),H=e("p",null,"Get the square distance of two vectors",-1),K={id:"lerp",tabindex:"-1"},Q=e("code",null,"Vector2",-1),W=e("code",null,"Vector2",-1),X=e("code",null,"number",-1),Y=e("code",null,"Vector2",-1),ee=e("a",{class:"header-anchor",href:"#lerp","aria-label":'Permalink to "lerp (vector2A : `Vector2`, vector2B : `Vector2`, t : `number`) => `Vector2` <Badge type="info" text="static"/> {#lerp}"'},"​",-1),te=e("p",null,"Lerp between two vectors",-1);function se(ae,oe,ie,ne,re,ce){const s=n("Badge");return c(),r("div",null,[h,e("h3",d,[t("ZERO : "),p,t(),a(s,{type:"info",text:"static"}),t(),k]),u,e("h3",_,[t("add (vector2A : "),g,t(", vector2B: "),m,t(") => "),b,t(),a(s,{type:"info",text:"static"}),t(),v]),y,e("h3",E,[t("subtract (vector2A : "),f,t(", vector2B: "),V,t(") => "),x,t(),a(s,{type:"info",text:"static"}),t(),C]),F,e("h3",B,[t("scale (vector2 : "),P,t(", scalar: "),q,t(") => "),z,t(),a(s,{type:"info",text:"static"}),t(),A]),D,e("h3",w,[t("magnitude (vector2 : "),S,t(") => "),T,t(),a(s,{type:"info",text:"static"}),t(),O]),R,e("h3",I,[t("normalize (vector2 : "),N,t(") => "),G,t(),a(s,{type:"info",text:"static"}),t(),$]),Z,e("h3",M,[t("sqrDistance (vector2A : "),j,t(", vector2B : "),J,t(") => "),L,t(),a(s,{type:"info",text:"static"}),t(),U]),H,e("h3",K,[t("lerp (vector2A : "),Q,t(", vector2B : "),W,t(", t : "),X,t(") => "),Y,t(),a(s,{type:"info",text:"static"}),t(),ee]),te])}const de=i(l,[["render",se]]);export{he as __pageData,de as default};
