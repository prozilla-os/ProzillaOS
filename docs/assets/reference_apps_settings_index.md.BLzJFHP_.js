import{_ as i,c as a,a3 as t,o as n}from"./chunks/framework.BAnOA2-A.js";const D=JSON.parse('{"title":"@prozilla-os/settings","description":"","frontmatter":{"outline":"deep","head":[["meta",{"name":"og:title","content":"@prozilla-os/settings | ProzillaOS Docs"}],["meta",{"name":"twitter:title","content":"@prozilla-os/settings | ProzillaOS Docs"}],["meta",{"name":"og:description","content":"Documentation for ProzillaOS and its packages."}],["meta",{"name":"twitter:description","content":"Documentation for ProzillaOS and its packages."}],["link",{"rel":"canonical","href":"https://os.prozilla.dev/docs/reference/apps/settings/"}],["meta",{"name":"og:url","content":"https://os.prozilla.dev/docs/reference/apps/settings/"}],["meta",{"name":"twitter:url","content":"https://os.prozilla.dev/docs/reference/apps/settings/"}],["meta",{"name":"og:locale","content":"en_US"}],["meta",{"name":"og:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"twitter:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"og:type","content":"website"}],["meta",{"name":"twitter:card","content":"summary_large_image"}]]},"headers":[],"relativePath":"reference/apps/settings/index.md","filePath":"reference/apps/settings/index.md"}'),l={name:"reference/apps/settings/index.md"};function e(h,s,p,k,r,o){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="prozilla-os-settings" tabindex="-1">@prozilla-os/settings <a class="header-anchor" href="#prozilla-os-settings" aria-label="Permalink to &quot;@prozilla-os/settings&quot;">​</a></h1><h2 id="about" tabindex="-1">About <a class="header-anchor" href="#about" aria-label="Permalink to &quot;About&quot;">​</a></h2><p><code>@prozilla-os/settings</code> is a ProzillaOS application for configuring settings.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p><code>@prozilla-os/core</code> is required to run this application.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes material-theme material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">npm</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> install</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> @prozilla-os/core</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> @prozilla-os/settings</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">yarn</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> add</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> @prozilla-os/core</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> @prozilla-os/settings</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">pnpm</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> add</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> @prozilla-os/core</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;"> @prozilla-os/settings</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="basic-setup" tabindex="-1">Basic setup <a class="header-anchor" href="#basic-setup" aria-label="Permalink to &quot;Basic setup&quot;">​</a></h3><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes material-theme material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#39ADB5;--shiki-light-font-style:italic;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> {</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> Desktop</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">,</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> ModalsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">,</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> ProzillaOS</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">,</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> Taskbar</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">,</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> WindowsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">,</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> AppsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> }</span><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#39ADB5;--shiki-light-font-style:italic;"> from</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> &quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;">@prozilla-os/core</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">&quot;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#39ADB5;--shiki-light-font-style:italic;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> {</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> settings</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> }</span><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#39ADB5;--shiki-light-font-style:italic;"> from</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> &quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;">@prozilla-os/settings</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">&quot;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#9C3EDA;">function</span><span style="--shiki-dark:#82AAFF;--shiki-light:#6182B8;"> App</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">()</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> {</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#39ADB5;--shiki-light-font-style:italic;">  return</span><span style="--shiki-dark:#F07178;--shiki-light:#E53935;"> (</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">    &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">ProzillaOS</span></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#9C3EDA;">      systemName</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">=</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">&quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;">Example</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">&quot;</span></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#9C3EDA;">      tagLine</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">=</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">&quot;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#91B859;">Powered by ProzillaOS</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">&quot;</span></span>
<span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#9C3EDA;">      config</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">={{</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">        apps</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> new</span><span style="--shiki-dark:#82AAFF;--shiki-light:#6182B8;"> AppsConfig</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;">(</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">{</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">          apps</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> [ settings ]</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">        }</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;">)</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">      }}</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">    &gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">Taskbar</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">WindowsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">ModalsView</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">      &lt;</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">Desktop</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">/&gt;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">    &lt;/</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">ProzillaOS</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">&gt;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">  )</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">}</span></span></code></pre></div><h3 id="window-options" tabindex="-1">Window options <a class="header-anchor" href="#window-options" aria-label="Permalink to &quot;Window options&quot;">​</a></h3><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes material-theme material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#546E7A;--shiki-dark-font-style:italic;--shiki-light:#90A4AE;--shiki-light-font-style:italic;">/**</span></span>
<span class="line"><span style="--shiki-dark:#546E7A;--shiki-dark-font-style:italic;--shiki-light:#90A4AE;--shiki-light-font-style:italic;"> * Initial tab to open</span></span>
<span class="line"><span style="--shiki-dark:#546E7A;--shiki-dark-font-style:italic;--shiki-light:#90A4AE;--shiki-light-font-style:italic;"> * </span><span style="--shiki-dark:#89DDFF;--shiki-dark-font-style:italic;--shiki-light:#39ADB5;--shiki-light-font-style:italic;">@</span><span style="--shiki-dark:#C792EA;--shiki-dark-font-style:italic;--shiki-light:#9C3EDA;--shiki-light-font-style:italic;">default</span><span style="--shiki-dark:#EEFFFF;--shiki-dark-font-style:italic;--shiki-light:#90A4AE;--shiki-light-font-style:italic;"> 0</span></span>
<span class="line"><span style="--shiki-dark:#546E7A;--shiki-dark-font-style:italic;--shiki-light:#90A4AE;--shiki-light-font-style:italic;"> */</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;">tab</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#EEFFFF;--shiki-light:#90A4AE;"> number</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span></code></pre></div><h2 id="links" tabindex="-1">Links <a class="header-anchor" href="#links" aria-label="Permalink to &quot;Links&quot;">​</a></h2><ul><li><a href="https://os.prozilla.dev/settings" target="_blank" rel="noreferrer">Demo</a></li><li><a href="https://os.prozilla.dev/docs/reference/apps/settings" target="_blank" rel="noreferrer">Docs</a></li><li><a href="https://github.com/prozilla-os/ProzillaOS/tree/main/packages/apps/settings" target="_blank" rel="noreferrer">GitHub</a></li><li><a href="https://www.npmjs.com/package/@prozilla-os/settings" target="_blank" rel="noreferrer">npm</a></li><li><a href="https://discord.gg/JwbyQP4tdz" target="_blank" rel="noreferrer">Discord</a></li><li><a href="https://ko-fi.com/prozilla" target="_blank" rel="noreferrer">Ko-fi</a></li></ul>`,13)]))}const g=i(l,[["render",e]]);export{D as __pageData,g as default};