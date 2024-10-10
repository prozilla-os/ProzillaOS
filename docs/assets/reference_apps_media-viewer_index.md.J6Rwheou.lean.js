import{_ as s,c as a,a1 as e,o as t}from"./chunks/framework.S1oRGgk6.js";const F=JSON.parse('{"title":"@prozilla-os/media-viewer","description":"","frontmatter":{"outline":"deep","head":[["meta",{"name":"og:title","content":"@prozilla-os/media-viewer | ProzillaOS Docs"}],["meta",{"name":"twitter:title","content":"@prozilla-os/media-viewer | ProzillaOS Docs"}],["meta",{"name":"og:description","content":"Documentation for ProzillaOS and its packages."}],["meta",{"name":"twitter:description","content":"Documentation for ProzillaOS and its packages."}],["link",{"rel":"canonical","href":"https://os.prozilla.dev/docs/reference/apps/media-viewer/"}],["meta",{"name":"og:url","content":"https://os.prozilla.dev/docs/reference/apps/media-viewer/"}],["meta",{"name":"twitter:url","content":"https://os.prozilla.dev/docs/reference/apps/media-viewer/"}],["meta",{"name":"og:locale","content":"en_US"}],["meta",{"name":"og:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"twitter:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"og:type","content":"website"}],["meta",{"name":"twitter:card","content":"summary_large_image"}]]},"headers":[],"relativePath":"reference/apps/media-viewer/index.md","filePath":"reference/apps/media-viewer/index.md"}'),l={name:"reference/apps/media-viewer/index.md"};function n(h,i,p,k,r,o){return t(),a("div",null,i[0]||(i[0]=[e(`<h1 id="prozilla-os-media-viewer" tabindex="-1">@prozilla-os/media-viewer <a class="header-anchor" href="#prozilla-os-media-viewer" aria-label="Permalink to &quot;@prozilla-os/media-viewer&quot;">​</a></h1><h2 id="about" tabindex="-1">About <a class="header-anchor" href="#about" aria-label="Permalink to &quot;About&quot;">​</a></h2><p><code>@prozilla-os/media-viewer</code> is a ProzillaOS application for viewing different kinds of media.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p><code>@prozilla-os/core</code> is required to run this application.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes material-theme-palenight material-theme-palenight vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">npm</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> install</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> @prozilla-os/core</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> @prozilla-os/media-viewer</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">yarn</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> add</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> @prozilla-os/core</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> @prozilla-os/media-viewer</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">pnpm</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> add</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> @prozilla-os/core</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;"> @prozilla-os/media-viewer</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="basic-setup" tabindex="-1">Basic setup <a class="header-anchor" href="#basic-setup" aria-label="Permalink to &quot;Basic setup&quot;">​</a></h3><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes material-theme-palenight material-theme-palenight vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#89DDFF;--shiki-light-font-style:italic;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> {</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> Desktop</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">,</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> ModalsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">,</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> ProzillaOS</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">,</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> Taskbar</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">,</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> WindowsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">,</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> AppsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> }</span><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#89DDFF;--shiki-light-font-style:italic;"> from</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> &quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;">@prozilla-os/core</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">&quot;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#89DDFF;--shiki-light-font-style:italic;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> {</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> mediaViewer</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> }</span><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#89DDFF;--shiki-light-font-style:italic;"> from</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> &quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;">@prozilla-os/media-viewer</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">&quot;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#C792EA;">function</span><span style="--shiki-dark:#82AAFF;--shiki-light:#82AAFF;"> App</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">()</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> {</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#89DDFF;--shiki-light-font-style:italic;">  return</span><span style="--shiki-dark:#F07178;--shiki-light:#F07178;"> (</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">    &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">ProzillaOS</span></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#C792EA;">      systemName</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">=</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">&quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;">Example</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">&quot;</span></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#C792EA;">      tagLine</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">=</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">&quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#C3E88D;">Powered by ProzillaOS</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">&quot;</span></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#C792EA;">      config</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">={{</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#F07178;">        apps</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;"> new</span><span style="--shiki-dark:#82AAFF;--shiki-light:#82AAFF;"> AppsConfig</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;">(</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">{</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#F07178;">          apps</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> [ mediaViewer ]</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">        }</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;">)</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">      }}</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">    &gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">Taskbar</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">WindowsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">ModalsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">Desktop</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">    &lt;/</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">ProzillaOS</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">&gt;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#F07178;">  )</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">}</span></span></code></pre></div><h3 id="window-options" tabindex="-1">Window options <a class="header-anchor" href="#window-options" aria-label="Permalink to &quot;Window options&quot;">​</a></h3><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes material-theme-palenight material-theme-palenight vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#676E95;--shiki-dark-font-style:italic;--shiki-light:#676E95;--shiki-light-font-style:italic;">/**</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-dark-font-style:italic;--shiki-light:#676E95;--shiki-light-font-style:italic;"> * A virtual file containing media to open</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-dark-font-style:italic;--shiki-light:#676E95;--shiki-light-font-style:italic;"> */</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#FFCB6B;">file</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#BABED8;"> VirtualFile</span><span style="--shiki-dark:#89DDFF;--shiki-light:#89DDFF;">;</span></span></code></pre></div><h2 id="links" tabindex="-1">Links <a class="header-anchor" href="#links" aria-label="Permalink to &quot;Links&quot;">​</a></h2><ul><li><a href="https://os.prozilla.dev/media-viewer" target="_blank" rel="noreferrer">Demo</a></li><li><a href="https://os.prozilla.dev/docs/reference/apps/media-viewer" target="_blank" rel="noreferrer">Docs</a></li><li><a href="https://github.com/prozilla-os/ProzillaOS/tree/main/packages/apps/media-viewer" target="_blank" rel="noreferrer">GitHub</a></li><li><a href="https://www.npmjs.com/package/@prozilla-os/media-viewer" target="_blank" rel="noreferrer">npm</a></li><li><a href="https://discord.gg/JwbyQP4tdz" target="_blank" rel="noreferrer">Discord</a></li><li><a href="https://ko-fi.com/prozilla" target="_blank" rel="noreferrer">Ko-fi</a></li></ul>`,13)]))}const d=s(l,[["render",n]]);export{F as __pageData,d as default};
