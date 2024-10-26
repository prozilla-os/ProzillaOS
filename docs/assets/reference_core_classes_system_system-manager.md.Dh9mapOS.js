import{_ as a,c as i,a3 as e,o as t}from"./chunks/framework.BAnOA2-A.js";const k=JSON.parse('{"title":"Class SystemManager","description":"","frontmatter":{"outline":"deep","package":"@prozilla-os/core","head":[["meta",{"name":"og:title","content":"Class SystemManager | ProzillaOS Docs"}],["meta",{"name":"twitter:title","content":"Class SystemManager | ProzillaOS Docs"}],["meta",{"name":"og:description","content":"Documentation for ProzillaOS and its packages."}],["meta",{"name":"twitter:description","content":"Documentation for ProzillaOS and its packages."}],["link",{"rel":"canonical","href":"https://os.prozilla.dev/docs/reference/core/classes/system/system-manager"}],["meta",{"name":"og:url","content":"https://os.prozilla.dev/docs/reference/core/classes/system/system-manager"}],["meta",{"name":"twitter:url","content":"https://os.prozilla.dev/docs/reference/core/classes/system/system-manager"}],["meta",{"name":"og:locale","content":"en_US"}],["meta",{"name":"og:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"twitter:image","content":"https://os.prozilla.dev/docs/prozilla-os-title-banner.png"}],["meta",{"name":"og:type","content":"website"}],["meta",{"name":"twitter:card","content":"summary_large_image"}]]},"headers":[],"relativePath":"reference/core/classes/system/system-manager.md","filePath":"reference/core/classes/system/system-manager.md"}'),n={name:"reference/core/classes/system/system-manager.md"};function l(r,s,o,h,p,c){return t(),i("div",null,s[0]||(s[0]=[e(`<h1 id="class-systemmanager" tabindex="-1">Class <a href="https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/systemManager.ts" target="_blank" rel="noreferrer"><code>SystemManager</code></a> <a class="header-anchor" href="#class-systemmanager" aria-label="Permalink to &quot;Class [\`SystemManager\`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/system/systemManager.ts)&quot;">​</a></h1><h2 id="constructor" tabindex="-1">Constructor <a class="header-anchor" href="#constructor" aria-label="Permalink to &quot;Constructor&quot;">​</a></h2><blockquote><p><code>new SystemManager(params)</code></p></blockquote><h3 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><strong>params</strong><ul><li><strong>Type:</strong> <code>SystemManagerParams</code></li></ul></li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes material-theme material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#C792EA;--shiki-light:#9C3EDA;">interface</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> SystemManagerParams</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> {</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	systemName</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> string</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> |</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> null</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	tagLine</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> SystemMastring</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;"> |</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> null</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	skin</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">?:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> Skin</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	desktopConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> DesktopConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	appsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> AppsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	miscConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> MiscConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	modalsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> ModalsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	taskbarConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> TaskbarConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	trackingConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> TrackingConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	windowsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> WindowsConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#E53935;">	virtualDriveConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">:</span><span style="--shiki-dark:#FFCB6B;--shiki-light:#E2931D;"> VirtualDriveConfig</span><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#39ADB5;">}</span></span></code></pre></div><div class="note custom-block github-alert"><p class="custom-block-title">References</p><p></p><ul><li><a href="./../../../skins/classes/skin">Skin</a></li></ul></div><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="systemname" tabindex="-1">systemName <a class="header-anchor" href="#systemname" aria-label="Permalink to &quot;systemName&quot;">​</a></h3><ul><li><strong>Type:</strong> <code>string</code></li><li><strong>Default:</strong> <code>&quot;ProzillaOS&quot;</code></li></ul><h3 id="tagline" tabindex="-1">tagLine <a class="header-anchor" href="#tagline" aria-label="Permalink to &quot;tagLine&quot;">​</a></h3><ul><li><strong>Type:</strong> <code>string</code></li><li><strong>Default:</strong> <code>&quot;Web-based Operating System&quot;</code></li></ul><h3 id="skin" tabindex="-1">skin <a class="header-anchor" href="#skin" aria-label="Permalink to &quot;skin&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./../../../skins/classes/skin"><code>Skin</code></a></li><li><strong>Default:</strong> <code>new Skin()</code></li></ul><h3 id="appsconfig" tabindex="-1">appsConfig <a class="header-anchor" href="#appsconfig" aria-label="Permalink to &quot;appsConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./apps-config"><code>AppsConfig</code></a></li></ul><h3 id="desktopconfig" tabindex="-1">desktopConfig <a class="header-anchor" href="#desktopconfig" aria-label="Permalink to &quot;desktopConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./desktop-config"><code>DesktopConfig</code></a></li></ul><h3 id="miscconfig" tabindex="-1">miscConfig <a class="header-anchor" href="#miscconfig" aria-label="Permalink to &quot;miscConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./misc-config"><code>MiscConfig</code></a></li></ul><h3 id="modalsconfig" tabindex="-1">modalsConfig <a class="header-anchor" href="#modalsconfig" aria-label="Permalink to &quot;modalsConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./modals-config"><code>ModalsConfig</code></a></li></ul><h3 id="taskbarconfig" tabindex="-1">taskbarConfig <a class="header-anchor" href="#taskbarconfig" aria-label="Permalink to &quot;taskbarConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./taskbar-config"><code>TaskbarConfig</code></a></li></ul><h3 id="trackingconfig" tabindex="-1">trackingConfig <a class="header-anchor" href="#trackingconfig" aria-label="Permalink to &quot;trackingConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./tracking-config"><code>TrackingConfig</code></a></li></ul><h3 id="windowsconfig" tabindex="-1">windowsConfig <a class="header-anchor" href="#windowsconfig" aria-label="Permalink to &quot;windowsConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./windows-config"><code>WindowsConfig</code></a></li></ul><h3 id="virtualdriveconfig" tabindex="-1">virtualDriveConfig <a class="header-anchor" href="#virtualdriveconfig" aria-label="Permalink to &quot;virtualDriveConfig&quot;">​</a></h3><ul><li><strong>Type:</strong> <a href="./virtual-drive-config"><code>VirtualDriveConfig</code></a></li></ul><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="getuptime-precision" tabindex="-1">getUptime(precision) <a class="header-anchor" href="#getuptime-precision" aria-label="Permalink to &quot;getUptime(precision)&quot;">​</a></h3><ul><li><strong>Parameters</strong><ul><li><strong>precision</strong><ul><li><strong>Type:</strong> <code>getUptime</code></li><li><strong>Default:</strong> <code>2</code></li></ul></li></ul></li><li><strong>Returns</strong><ul><li><strong>Type:</strong> <code>string</code></li></ul></li></ul>`,33)]))}const d=a(n,[["render",l]]);export{k as __pageData,d as default};
