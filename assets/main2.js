(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('._Main_1w5gc_1{position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;overflow:hidden;pointer-events:none}._Main_1w5gc_1>*{pointer-events:auto}._Taskbar_etcj3_1{--svg-drop-shadow-color: var(--taskbar-color);position:fixed;display:flex;bottom:0;left:0;width:100%;height:var(--taskbar-height);margin-bottom:env(safe-area-inset-bottom)}._Taskbar_etcj3_1:after,._Taskbar_etcj3_1:before{content:"";position:absolute;top:0;bottom:calc(env(safe-area-inset-bottom,0)*-1);left:0;right:0;pointer-events:none}._Taskbar_etcj3_1:after{opacity:var(--taskbar-opacity);background-color:var(--taskbar-color);z-index:-2}._Taskbar_etcj3_1:before{-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);z-index:-3}._Taskbar_etcj3_1 button{display:flex;align-items:center;color:var(--foreground-color-0);background:none;cursor:pointer;border:none;outline:none;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);z-index:-1}._Taskbar_etcj3_1 button:hover,._Taskbar_etcj3_1 button:focus-visible{background-color:var(--taskbar-button-hover-color)}._HomeContainer_etcj3_52,._SearchContainer_etcj3_53{position:relative;padding:0!important}._HomeContainer_etcj3_52,._HomeContainer_etcj3_52>div,._SearchContainer_etcj3_53,._SearchContainer_etcj3_53>div{height:100%;width:auto}button._HomeButton_etcj3_66{padding:.5rem}._HomeButton_etcj3_66 *{fill:var(--foreground-color-0);filter:none}._HomeButton_etcj3_66 img{height:100%;width:auto;object-fit:contain}._MenuIcons_etcj3_81,._AppIcons_etcj3_82{display:flex;align-items:center;height:100%}._AppIconsContainer_etcj3_88{position:relative;width:100%;height:auto;overflow:hidden;pointer-events:none}._AppIcons_etcj3_82{position:absolute;top:0;left:0;width:100%;height:100%;overflow-x:auto;overflow-y:hidden;pointer-events:auto;z-index:-1}._AppIcons_etcj3_82::-webkit-scrollbar{display:none}._AppIcons_etcj3_82>*,._MenuButton_etcj3_113{height:100%;padding:.75rem}._AppIcons_etcj3_82>*>svg,._MenuButton_etcj3_113>svg{height:1.25rem}._AppIcons_etcj3_82>button div,._AppIcons_etcj3_82>button div>svg,._MenuButton_etcj3_113 div,._MenuButton_etcj3_113 div>svg{height:100%;width:auto}._UtilIcons_etcj3_131{display:flex;gap:0;justify-content:flex-end;align-items:center;height:100%;margin-left:auto;padding-left:.5rem;z-index:-1}._UtilIcons_etcj3_131>div{height:100%;width:min-content;z-index:-1}._UtilIcons_etcj3_131>button,._UtilIcons_etcj3_131>div>button{height:100%;width:min-content;margin:0;padding:.4rem}._UtilIcons_etcj3_131>button>svg,._UtilIcons_etcj3_131>div>button>svg{height:1rem;width:1rem;aspect-ratio:1}._DesktopButton_etcj3_163{width:.5rem!important}._MenuContainer_etcj3_167{position:absolute;right:0;bottom:100%;height:auto!important;overflow:hidden}._MenuContainer_etcj3_167:not(._Active_etcj3_175){pointer-events:none}._Menu_etcj3_81{opacity:1;display:flex;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);border-bottom-left-radius:var(--border-radius-1);transform:none;transition:opacity var(--transition-duration-1) var(--ease-in-out-default),transform var(--transition-duration-1) var(--ease-in-out-default);overflow:hidden;resize:horizontal}._MenuContainer_etcj3_167:not(._Active_etcj3_175) ._Menu_etcj3_81{opacity:0;transform:translateY(50%)}._Menu_etcj3_81:after,._MenuContainer_etcj3_167:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none}._Menu_etcj3_81:after{opacity:var(--taskbar-menu-opacity);background-color:var(--taskbar-menu-color);z-index:-2}._MenuContainer_etcj3_167:after{opacity:1;transition:opacity var(--transition-duration-1) var(--ease-in-out-default),top var(--transition-duration-1) var(--ease-in-out-default);-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);z-index:-3}._MenuContainer_etcj3_167:not(._Active_etcj3_175):after{opacity:0;top:50%}._HomeMenuContainer_ki7xi_1{right:unset;left:0}._HomeMenu_ki7xi_1{--default-buttons-width: 3rem;--buttons-count: 5;min-width:16rem;max-width:32rem;min-height:calc(var(--default-buttons-width) * var(--buttons-count));border-bottom-left-radius:0;border-bottom-right-radius:var(--border-radius-1)}._Buttons_ki7xi_17{--buttons-width: var(--default-buttons-width);--padding: .25rem;--filter: blur(0px);position:absolute;display:flex;flex-direction:column-reverse;justify-content:flex-start;align-items:center;bottom:0;left:0;padding:var(--padding);margin-top:auto;width:var(--buttons-width);height:100%;border-radius:var(--border-radius-1);overflow:hidden;transition:width var(--transition-duration-1) var(--ease-in-out-default) var(--transition-duration-1);z-index:1}._Buttons_ki7xi_17:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;-webkit-backdrop-filter:var(--filter);backdrop-filter:var(--filter);transition:backdrop-filter var(--transition-duration-1) var(--ease-in-out-default) var(--transition-duration-1)}._Buttons_ki7xi_17:hover,._Buttons_ki7xi_17:focus-visible{--buttons-width: 10rem;--filter: var(--taskbar-filter)}._Buttons_ki7xi_17>button{--button-width: calc(var(--buttons-width) - var(--padding) * 2);--button-height: calc(var(--default-buttons-width) - var(--padding) * 2);position:relative;display:flex;justify-content:flex-start;align-items:center;padding:.5rem;width:var(--button-width);height:var(--button-height);border-radius:var(--border-radius-1);overflow:hidden;transition:inherit;z-index:1}._Buttons_ki7xi_17>button>svg{height:1.5rem;width:1.5rem}._Buttons_ki7xi_17>button>p{position:absolute;left:calc(var(--default-buttons-width) - var(--padding) * 2);margin:0;white-space:nowrap}._Apps_ki7xi_87{display:flex;flex-direction:column;width:100%!important;max-height:20rem;padding:.5rem .25rem .5rem .5rem;padding-bottom:0;margin-left:var(--default-buttons-width)}._Logo_ki7xi_98{display:flex;gap:.5rem;width:auto;margin-bottom:.5rem;justify-content:flex-start;align-items:center;-webkit-user-select:none;user-select:none}._Logo_ki7xi_98 div,._Logo_ki7xi_98 svg{width:auto;height:2.25rem;color:inherit;aspect-ratio:1}._Logo_ki7xi_98 svg{object-fit:contain}._Logo_ki7xi_98 svg *{color:inherit;fill:currentColor}._Logo_ki7xi_98>h1{width:100%;text-align:left;margin:0;font-size:1rem;font-weight:600;letter-spacing:normal}._AppList_19mh1_1{--scrollbar-color: rgba(0, 0, 0, 25%);display:flex;flex-direction:column;overflow-y:auto;max-height:100%;padding-bottom:.5rem;z-index:0}._AppButton_19mh1_11{--size: 2rem;display:flex;gap:.75rem;width:100%;padding:.25rem .5rem;font-size:.875rem;border-radius:var(--border-radius-1)}._AppButton_19mh1_11>div,._AppButton_19mh1_11>div>div,._AppButton_19mh1_11>div>div>svg{width:var(--size);height:var(--size)}._AppButton_19mh1_11 svg{filter:var(--svg-drop-shadow-0)}._AppButton_19mh1_11>p,._AppButton_19mh1_11>h2{margin:0;white-space:nowrap}._WindowedModal_u6mt7_1{--header-height: 2.5rem;--header-button-hover-color: rgba(255, 255, 255, 5%);position:absolute;display:flex;flex-direction:column;min-width:300px;min-height:150px;background-color:var(--background-color-2)!important;resize:both;overflow:hidden}._Header_u6mt7_15{--window-icon-size: 1.5rem;--window-icon-margin: .75rem;display:flex;align-items:center;height:var(--header-height);padding:.25rem;padding-left:var(--window-icon-margin);padding-right:0;background-color:var(--background-color-1);cursor:grab}._Window-icon_u6mt7_29,._Window-icon_u6mt7_29>div,._Window-icon_u6mt7_29>div>svg{height:100%;width:auto}._Window-icon_u6mt7_29{height:var(--window-icon-size);margin-right:calc(var(--window-icon-margin) - .1rem)}._Window-icon_u6mt7_29>div{display:flex;align-items:center}._Header_u6mt7_15>p{-webkit-user-select:none;user-select:none;width:auto;margin:0 auto 0 0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._Header-button_u6mt7_56{display:flex;align-items:center;justify-content:center;height:var(--header-height);margin:0;padding:.75rem;color:var(--foreground-color-0);background:none;cursor:pointer;border:none;outline:none;aspect-ratio:1}._Header-button_u6mt7_56>svg{height:100%}._Exit-button_u6mt7_75{--header-button-hover-color: var(--red-0)}._Header-button_u6mt7_56:hover,._Header-button_u6mt7_56:focus-visible{background-color:var(--header-button-hover-color)}._Window-content_u6mt7_83{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;overflow:hidden}._TextRegular_wjx57_1{font-size:1em;font-weight:400;letter-spacing:normal}._TextLight_wjx57_7{color:var(--foreground-color-1);font-size:.875em;font-weight:400;letter-spacing:normal}._TextSemibold_wjx57_14{font-weight:500;letter-spacing:normal}._TextBold_wjx57_19{font-weight:600;letter-spacing:normal}._DialogContent_lop64_1{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;overflow:hidden}._DialogContent_lop64_1 button{margin-bottom:.75rem;padding:.5rem 1rem;width:fit-content;color:var(--foreground-color-0);background-color:var(--background-color-0);border:none;border-radius:var(--border-radius-1);outline:none;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);cursor:pointer}._DialogContent_lop64_1 button:hover,._DialogContent_lop64_1 button:focus-visible{background-color:var(--background-color-1)}._SearchMenuContainer_11e0k_1{position:absolute;display:flex;flex-direction:column;left:0;bottom:100%;max-height:20rem;overflow:hidden}._SearchMenu_11e0k_1{opacity:0;display:flex;gap:.5rem;flex-direction:column;min-width:13rem;max-width:19rem;padding:.5rem;margin-top:100px;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);border-bottom-right-radius:var(--border-radius-1);-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);transition:opacity var(--transition-duration-1) var(--ease-in-out-default),margin-top var(--transition-duration-1) var(--ease-in-out-default);overflow:hidden;resize:horizontal}._SearchMenu_11e0k_1:after{opacity:var(--taskbar-menu-opacity);content:"";position:absolute;inset:0;background-color:var(--taskbar-menu-color);z-index:-2}._SearchMenuContainer_11e0k_1._Active_11e0k_42 ._SearchMenu_11e0k_1{opacity:1;margin-top:0}._SearchMenuContainer_11e0k_1:not(._Active_11e0k_42){pointer-events:none}._SearchMenu_11e0k_1>div{margin-top:auto}._Input_11e0k_55{width:100%;padding:.25rem .5rem;color:var(--foreground-color-0);background-color:#00000040;border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._SearchMenu_11e0k_1>div>button:first-child{background-color:var(--taskbar-button-hover-color)}._AppIcon_tgzjr_1{opacity:1;position:relative;width:var(--taskbar-height);height:var(--taskbar-height);aspect-ratio:1;animation:_appear_tgzjr_1 var(--transition-duration-0) ease-out forwards}._AppIcon_tgzjr_1 svg{filter:var(--svg-drop-shadow-0);transform:scale(1);transform-origin:center;transition:transform var(--transition-duration-1) ease-out var(--transition-duration-0)}._AppIcon_tgzjr_1:not(._Active_tgzjr_17):hover svg,._AppIcon_tgzjr_1:not(._Active_tgzjr_17):focus-visible svg{transform:scale(125%)}._AppIcon_tgzjr_1._Hidden_tgzjr_22{animation:_disappear_tgzjr_1 var(--transition-duration-2)var(--ease-in-out-default) forwards;pointer-events:none}@keyframes _appear_tgzjr_1{0%{opacity:0}to{opacity:1}}@keyframes _disappear_tgzjr_1{0%{opacity:1}25%{opacity:0;margin-right:0}to{opacity:0;margin-right:calc(var(--taskbar-height) * -1)}}._AppIcon_tgzjr_1:after{content:"";position:absolute;left:50%;bottom:0;width:90%;height:.15rem;background-color:var(--foreground-color-0);transition:height var(--transition-duration-1)var(--ease-in-out-default),width var(--transition-duration-1) var(--ease-in-out-default);transform:translate(-50%);-webkit-transform:translateX(-50%)}._AppIcon_tgzjr_1:hover:after,._AppIcon_tgzjr_1:focus-visible:after{width:100%}._AppIcon_tgzjr_1:not(._Active_tgzjr_17):after{height:0}._Actions_aai42_1{--left: 0;--top: 0;--right: calc(1 - var(--left));--bottom: calc(1 - var(--top));position:absolute;top:0;left:0;opacity:1;transition:opacity var(--transition-duration-0) ease-out}._Actions_aai42_1._Uninitiated_aai42_15{opacity:0}._Actions_aai42_1._AlignLeft_aai42_19{--left: 1;left:unset;right:0}._Actions_aai42_1._AlignTop_aai42_26{--top: 1;top:unset;bottom:0}._ContextMenu_aai42_35._Actions_aai42_1{--border-radius: var(--border-radius-1);--padding: .375rem;padding:var(--padding);border-top-left-radius:calc((1 - var(--right) * var(--bottom)) * var(--border-radius))!important;border-top-right-radius:calc((1 - var(--left) * var(--bottom)) * var(--border-radius))!important;border-bottom-left-radius:calc((1 - var(--right) * var(--top)) * var(--border-radius))!important;border-bottom-right-radius:calc((1 - var(--left) * var(--top)) * var(--border-radius))!important;background-color:var(--background-color-1)!important}._ContextMenu_aai42_35 ._Button_aai42_47,._ContextMenu_aai42_35 ._Dropdown_aai42_48{display:flex;gap:.75rem;justify-content:space-between;width:100%;padding:.25rem .5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;font-size:.875rem;text-align:start;white-space:nowrap;cursor:pointer}._ContextMenu_aai42_35 ._Button_aai42_47:hover,._ContextMenu_aai42_35 ._Button_aai42_47:focus-visible,._ContextMenu_aai42_35 ._Dropdown_aai42_48:hover,._ContextMenu_aai42_35 ._Dropdown_aai42_48:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._ContextMenu_aai42_35 ._Label_aai42_71{display:flex;gap:.5rem;justify-content:center;align-items:center}._ContextMenu_aai42_35 ._Label_aai42_71 p,._ContextMenu_aai42_35 ._Shortcut_aai42_79{margin:0}._ContextMenu_aai42_35 ._Icon_aai42_83{display:flex;justify-content:center;align-items:center;width:.875rem;height:.875rem}._ContextMenu_aai42_35 ._Icon_aai42_83>svg{width:100%;height:100%;object-fit:contain}._ContextMenu_aai42_35 ._ImageIcon_aai42_97{position:absolute;width:1rem;height:auto;aspect-ratio:1}._ContextMenu_aai42_35 ._ImageIcon_aai42_97 div{display:flex;width:100%;height:100%}._ContextMenu_aai42_35 ._ImageIcon_aai42_97 div>svg{width:100%;height:100%;object-fit:contain}._ContextMenu_aai42_35 ._Shortcut_aai42_79{color:var(--foreground-color-1)}._ContextMenu_aai42_35 ._Dropdown_aai42_48{position:relative}._ContextMenu_aai42_35 ._Dropdown_aai42_48 ._DropdownContent_aai42_124{opacity:1;position:absolute;top:calc(var(--padding) * -1);left:100%;padding:var(--padding);border-radius:var(--border-radius-1);border-top-left-radius:0;background-color:var(--background-color-1);transition:opacity var(--transition-duration-0) ease-out;cursor:auto}._ContextMenu_aai42_35 ._Dropdown_aai42_48:not(._Active_aai42_137) ._DropdownContent_aai42_124{opacity:0;pointer-events:none}._ContextMenu_aai42_35 ._Divider_aai42_142{width:calc(100% - .5rem);height:2px;border-radius:var(--border-radius-99);background-color:var(--foreground-color-2);margin:.5rem auto}._ContextMenu_aai42_35 ._TextDisplay_aai42_150{margin:0;padding:.25rem .75rem;color:var(--foreground-color-1);font-size:.875rem;text-align:start;white-space:nowrap}._HeaderMenu_aai42_161{display:flex;width:inherit;height:inherit}._HeaderMenu_aai42_161 ._Dropdown_aai42_48{position:relative;display:block;width:auto;height:100%;padding:0 .5rem;background:none;border:none;outline:none;font-size:.85rem;cursor:pointer}._HeaderMenu_aai42_161 ._Dropdown_aai42_48:hover,._HeaderMenu_aai42_161 ._Dropdown_aai42_48:focus-visible,._HeaderMenu_aai42_161 ._Dropdown_aai42_48._Active_aai42_137{background-color:#ffffff0d}._HeaderMenu_aai42_161 ._Dropdown_aai42_48>._Label_aai42_71{display:flex;justify-content:center;align-items:center;height:100%}._HeaderMenu_aai42_161 ._DropdownArrow_aai42_193{display:none}._HeaderMenu_aai42_161 ._DropdownContent_aai42_124{opacity:1;display:flex;flex-direction:column;position:absolute;top:100%;left:0;padding:.25rem;background-color:var(--background-color-1);border-bottom-left-radius:var(--border-radius-1);border-bottom-right-radius:var(--border-radius-1);transition:opacity var(--transition-duration-0) ease-out;cursor:default}._HeaderMenu_aai42_161 ._Dropdown_aai42_48:not(._Active_aai42_137) ._DropdownContent_aai42_124{opacity:0;pointer-events:none}._HeaderMenu_aai42_161 ._Button_aai42_47{--icon-size: 1.25rem;--icon-gap: .5rem;display:flex;gap:1.5rem;justify-content:space-between;align-items:center;width:100%;padding:.25rem .5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;font-size:.875rem;text-align:start;white-space:nowrap;cursor:pointer}._HeaderMenu_aai42_161 ._Button_aai42_47:not(:disabled):hover,._HeaderMenu_aai42_161 ._Button_aai42_47:not(:disabled):focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._HeaderMenu_aai42_161 ._Button_aai42_47:disabled{cursor:default}._HeaderMenu_aai42_161 ._Button_aai42_47>._Label_aai42_71{display:flex;gap:var(--icon-gap);flex-direction:row-reverse;justify-content:flex-start;align-items:center}._HeaderMenu_aai42_161 ._Button_aai42_47>._Label_aai42_71 ._Icon_aai42_83 div,._HeaderMenu_aai42_161 ._Button_aai42_47>._Label_aai42_71 ._Icon_aai42_83 svg{height:var(--icon-size);width:var(--icon-size)}._HeaderMenu_aai42_161 ._Dropdown_aai42_48>._Label_aai42_71>p,._HeaderMenu_aai42_161 ._Button_aai42_47>._Label_aai42_71>p{margin:0}._HeaderMenu_aai42_161 ._Button_aai42_47:disabled>._Label_aai42_71>p{color:var(--foreground-color-1)}._HeaderMenu_aai42_161 ._Shortcut_aai42_79{color:var(--foreground-color-1);margin:0;font-size:.875rem}._HeaderMenu_aai42_161 ._Divider_aai42_142{width:calc(100% - .5rem);height:2px;border-radius:var(--border-radius-99);background-color:var(--foreground-color-2);margin:.25rem auto}._ImagePreview_djvki_1{height:100%;overflow:hidden;pointer-events:none}._ImagePreview_djvki_1>*{width:100%;height:100%;object-fit:contain}._ImagePreview_djvki_1>img{height:auto;max-height:100%;width:auto;max-width:100%;border-radius:inherit}._Button_fsy4w_1{position:relative}._Charging-indicator_fsy4w_5{--outline-color: var(--background-color-2);--outline-width: 2px;position:absolute;top:.55rem;right:.15rem;height:.7rem!important}._Menu_fsy4w_15>div{display:flex;gap:.5rem;justify-content:center;align-items:center;padding:.5rem 1rem}._Menu_fsy4w_15>div>div,._Menu_fsy4w_15>div>div>svg{width:auto;height:1.25rem}._Menu_fsy4w_15>div>p{margin:0;font-size:1.25rem}._UtilMenuContainer_1y60h_1{position:absolute;right:0;bottom:100%;height:auto!important;overflow:hidden}._UtilMenu_1y60h_1{opacity:1;display:flex;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);border-bottom-left-radius:var(--border-radius-1);-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);transform:none;transition:opacity var(--transition-duration-1) var(--ease-in-out-default),transform var(--transition-duration-1) var(--ease-in-out-default);overflow:hidden;resize:horizontal}._UtilMenu_1y60h_1:after{opacity:var(--taskbar-menu-opacity);content:"";position:absolute;inset:0;background-color:var(--taskbar-menu-color);z-index:-2}._UtilMenuContainer_1y60h_1:not(._Active_1y60h_35){pointer-events:none}._UtilMenuContainer_1y60h_1:not(._Active_1y60h_35) ._UtilMenu_1y60h_1{opacity:0;transform:translateY(100px)}._Button_1uqkw_1{--text-color: var(--foreground-color-0);--normal-color: var(--background-color-0);--hover-color: var(--background-color-1);color:var(--text-color);background-color:var(--normal-color);border:none;outline:none;font-size:.875em;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);cursor:pointer}._Button_1uqkw_1:hover,._Button_1uqkw_1:focus-visible{background-color:var(--hover-color)}._ButtonLink_1uqkw_19{text-decoration:none}._Button_1uqkw_1>svg{margin-left:.5rem}._DirectoryList_18ux0_1{--scale: 1rem;position:relative;width:100%;height:100%}._FileButton_18ux0_9,._FolderButton_18ux0_9{--gap: .25rem;display:flex;gap:var(--gap);flex-direction:column;align-items:center;justify-content:center;width:calc(var(--scale) * 7.5);height:calc(var(--scale) * 7.5);padding:.5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;cursor:pointer;transition:background-color var(--transition-duration-0) var(--ease-in-out-default)}._FileButton_18ux0_9[data-selected=true],._FolderButton_18ux0_9[data-selected=true]{background-color:color-mix(in srgb,var(--background-color-0) 40%,transparent)!important}._FileButton_18ux0_9:hover,._FolderButton_18ux0_9:hover,._FileButton_18ux0_9:focus-visible,._FolderButton_18ux0_9:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 20%,transparent)}._FileButton_18ux0_9 p,._FolderButton_18ux0_9 p{max-width:100%;margin:0;word-wrap:break-word}._FileIcon_18ux0_46,._FolderIcon_18ux0_46{max-height:calc(100% - 1rem - var(--gap));border-radius:inherit}._FileIcon_18ux0_46 div,._FolderIcon_18ux0_46 div{width:100%;height:100%;border-radius:inherit;overflow:hidden}._FileIcon_18ux0_46 svg,._FolderIcon_18ux0_46 svg{width:50%;height:auto;aspect-ratio:1}._SelectionRect_18ux0_64{opacity:25%;position:absolute;border-radius:var(--border-radius-0);background-color:var(--blue-1);border:.25rem solid var(--blue-0)}._DropdownButton_1f5hf_1{position:relative;height:100%}._Button_1f5hf_6{display:block;width:auto;height:100%;padding:0 .5rem;background:none;border:none;outline:none;font-size:.85rem;cursor:pointer}._Button_1f5hf_6:hover,._Button_1f5hf_6:focus-visible{background-color:#ffffff0d}._Dropdown_1f5hf_1{display:flex;flex-direction:column;position:absolute;top:100%;left:0;padding:.35rem;background-color:var(--background-color-1);border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem}._Dropdown_1f5hf_1>button{display:flex;gap:.75rem;justify-content:space-between;width:100%;padding:.25rem .5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;font-size:.85rem;text-align:start;white-space:nowrap;cursor:pointer}._Dropdown_1f5hf_1>button:hover,._Dropdown_1f5hf_1>button:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._Dropdown_1f5hf_1>button>p{margin:0}._Shortcut_1f5hf_58{color:var(--foreground-color-1)}._ProgressBar_115cj_1{position:relative;width:15rem;max-width:100%;min-height:2rem;max-height:100%;background-color:var(--background-color-4)}._Fill_115cj_10{--fill: 0%;position:absolute;left:0;top:0;width:var(--fill);min-width:1px;height:100%;background-color:var(--blue-0)}._HeaderMenu_1kc25_1{position:relative;display:flex;width:100%;height:1.5rem;min-height:1.5rem;background-color:var(--background-color-0)}._WebView_12eh1_1{display:flex;justify-content:center;align-items:center;width:100%;height:100%}._WebView_12eh1_1>iframe{width:100%;height:100%;border:none;background:none;pointer-events:initial}._Button_l4a7x_1{display:flex;flex-direction:column;white-space:nowrap;-webkit-user-select:none;user-select:none}._Button_l4a7x_1>p{margin:0}._Menu_l4a7x_12>div{display:flex;gap:.5rem;flex-direction:column;align-items:flex-start;padding:.5rem 1rem}._Time_l4a7x_20,._Date_l4a7x_20{margin:0}._Time_l4a7x_20{font-size:1.5rem}._Date_l4a7x_20{opacity:.5}._Menu_vin43_1>div{display:flex;gap:.5rem;justify-content:center;align-items:center;padding:.5rem 1rem}._Menu_vin43_1>div>svg{width:auto;height:1rem}._Menu_vin43_1>div>p{margin:0;font-size:1rem}._Window-container_1w3qi_1{--header-height: 2.5rem;--header-button-hover-color: rgba(255, 255, 255, 5%);position:absolute}._Window-container_1w3qi_1._Minimized_1w3qi_8{pointer-events:none}@keyframes _pop-in_1w3qi_1{0%{scale:0}to{scale:100%}}._Window-container_1w3qi_1._Maximized_1w3qi_21{width:100%;height:100%;transform:none!important}._Window-container_1w3qi_1._Maximized_1w3qi_21 ._Window-inner_1w3qi_27{width:100%;height:calc(100% - var(--taskbar-height));border-radius:0;resize:none}._Window-inner_1w3qi_27{display:flex;flex-direction:column;min-width:300px;min-height:150px;background-color:var(--background-color-2);border-radius:var(--border-radius-1);box-shadow:var(--window-box-shadow);resize:both;overflow:hidden;transform-origin:center center;animation:_appear_1w3qi_1 var(--transition-duration-1)var(--ease-in-out-default) forwards}._Window-container_1w3qi_1._Minimized_1w3qi_8 ._Window-inner_1w3qi_27{animation:_disappear_1w3qi_1 var(--transition-duration-1)var(--ease-in-out-default) forwards}@keyframes _appear_1w3qi_1{0%{opacity:0;transform:translateY(25vh) scale(0)}25%{opacity:0}to{opacity:1;transform:none}}@keyframes _disappear_1w3qi_1{0%{opacity:1;transform:none}75%{opacity:0}to{opacity:0;transform:translateY(25vh) scale(0)}}._Header_1w3qi_80{--window-icon-size: 1.5rem;--window-icon-margin: .75rem;display:flex;align-items:center;height:var(--header-height);padding:.25rem;padding-left:var(--window-icon-margin);padding-right:0;background-color:var(--background-color-1);cursor:grab}._Window-icon_1w3qi_94,._Window-icon_1w3qi_94>div,._Window-icon_1w3qi_94>div>svg{height:100%;width:auto}._Window-icon_1w3qi_94{height:var(--window-icon-size);margin-right:calc(var(--window-icon-margin) - .1rem)}._Window-icon_1w3qi_94>div{display:flex;align-items:center}._Header_1w3qi_80>p{-webkit-user-select:none;user-select:none;width:auto;margin:0 auto 0 0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._Header-button_1w3qi_121{display:flex;align-items:center;justify-content:center;height:var(--header-height);margin:0;padding:.75rem;color:var(--foreground-color-0);background:none;cursor:pointer;border:none;outline:none;aspect-ratio:1}._Header-button_1w3qi_121>svg{height:100%}._Exit-button_1w3qi_140{--header-button-hover-color: var(--red-0)}._Header-button_1w3qi_121:hover,._Header-button_1w3qi_121:focus-visible{background-color:var(--header-button-hover-color)}._Window-content_1w3qi_148{position:relative;overflow:hidden;height:100%}._Share_14fca_1{display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:1rem 0;overflow:hidden;pointer-events:none}._Top_14fca_12,._Bottom_14fca_12{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;overflow:hidden}._Share_14fca_1>._Top_14fca_12{flex-grow:1;pointer-events:none}._Title_14fca_25{margin-top:0;margin-left:1rem;font-size:1.5rem;pointer-events:auto}._FormContainer_14fca_32{position:relative;width:100%;height:100%;overflow:hidden;pointer-events:none}._Form_14fca_32{--margin: 1rem;position:absolute;display:flex;gap:.5rem;flex-direction:column;top:0;left:0;width:calc(100% - var(--margin) * 2);height:100%;margin:0 var(--margin);overflow-x:hidden;overflow-y:auto;pointer-events:auto;z-index:-1}._Label_14fca_58{--gap: .5rem;display:flex;gap:var(--gap);align-items:center;width:100%;height:1.75rem;min-height:1.75rem;z-index:1}._Label_14fca_58>p{width:calc(40% - var(--gap));min-width:40%;margin:0;text-align:start}._Input_14fca_77{width:auto;max-width:calc(60% - var(--gap));padding:.25rem .5rem;height:100%;color:var(--text-color);background-color:var(--background-color-1);border:none;border-radius:var(--border-radius-1);outline:none;font-size:.875em}select._Input_14fca_77>*{color:inherit;background-color:inherit;border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._Input_14fca_77:disabled~div,._Input_14fca_77:disabled~p{opacity:.25}._Input_14fca_77[type=checkbox]{display:none}._Checkbox_14fca_108{display:flex;justify-content:center;align-items:center;width:auto;height:87.5%;aspect-ratio:1;cursor:pointer}._Checkbox_14fca_108>svg{width:100%;height:100%;object-fit:contain;fill:var(--background-color-0)}._Checkbox_14fca_108>svg>*{fill:inherit}._Share_14fca_1>._Bottom_14fca_12{gap:.5rem;flex-direction:row;justify-content:space-between;align-items:center;margin:.75rem 1rem 0;pointer-events:auto}._Url_14fca_138{margin:0;text-align:start;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._Button_14fca_146{--normal-color: var(--background-color-0) !important;--hover-color: var(--background-color-1) !important;padding:.5rem 1rem;border-radius:var(--border-radius-1);white-space:nowrap}._Desktop_1au3h_1{position:fixed;top:env(safe-area-inset-top,0);left:0;width:100%;height:100%;z-index:-1}._Wallpaper_1au3h_10{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;pointer-events:none}._Content_1au3h_20{--direction: column;position:absolute;display:flex;flex-direction:var(--direction);flex-wrap:wrap;align-content:flex-start;justify-content:flex-start;top:0;left:0;width:100%;height:100%;padding:.5rem;padding-bottom:calc(var(--taskbar-height) + .5rem);z-index:1}._Item_1au3h_38{padding:.25rem;text-shadow:.1rem .1rem .2rem color-mix(in srgb,var(--black-0) 75%,transparent)}._Item_1au3h_38 p{color:var(--white-0)}._Item_1au3h_38 svg{filter:var(--svg-drop-shadow-0)}._ModalView_tyrlb_1{--position-x: 0;--position-y: 0;position:fixed;top:calc(var(--position-y) * 1px);left:calc(var(--position-x) * 1px)}._ModalView_tyrlb_1>*{background:var(--background-color-0);border-radius:var(--border-radius-1);box-shadow:var(--window-box-shadow)}._ModalsView_1t8jt_1{position:relative;z-index:11}._StandaloneView_mfmlq_1{--header-height: 2.75rem;display:flex;flex-direction:column;width:100%;height:100%}._StandaloneWindow_mfmlq_10{position:relative;width:100%;height:calc(100% - var(--header-height));overflow:hidden}._Header_6mqb7_1{display:flex;width:100%;justify-content:space-between;height:var(--header-height);padding:.75rem 1rem;background-color:var(--background-color-1)}._Logo_6mqb7_10{display:flex;gap:.5rem;width:auto;justify-content:flex-start;align-items:center;color:var(--foreground-color-1);text-decoration:none;transition:color var(--transition-duration-1) var(--ease-in-out-default);-webkit-user-select:none;user-select:none}._Logo_6mqb7_10:hover{color:var(--foreground-color-0)}._Logo_6mqb7_10 div,._Logo_6mqb7_10 svg{width:auto;height:2.5rem;color:inherit;aspect-ratio:1}._Logo_6mqb7_10 svg{object-fit:contain}._Logo_6mqb7_10 svg *{color:inherit;fill:currentColor}._Logo_6mqb7_10>h1{margin:0;color:inherit;font-size:1.25rem;font-weight:600;letter-spacing:normal}._ExitButton_6mqb7_51{display:flex;justify-content:center;align-items:center;color:var(--foreground-color-1);background:none!important;font-size:1rem;transition:color var(--transition-duration-1) var(--ease-in-out-default)}._ExitButton_6mqb7_51:hover{color:var(--foreground-color-0)}._ExitButton_6mqb7_51>svg{height:1.25rem;color:inherit}._ExitButton_6mqb7_51>svg *{color:inherit}._NoRoute_1rria_1{display:flex;flex-direction:column;gap:1rem;justify-content:center;align-items:center;width:100%;height:100%}._Title_1rria_11{margin:0;font-size:2rem}._Link_1rria_16{--normal-color: var(--background-color-0) !important;--hover-color: var(--background-color-1) !important;margin-bottom:.75rem!important;padding:.5rem 1rem;border-radius:var(--border-radius-1)}:root{--red-0: #FF4D5B;--red-1: #B23640;--red-2: #661F25;--orange-0: #FF974D;--orange-1: #B26A36;--orange-2: #663C1F;--yellow-0: #FED24C;--yellow-1: #B29336;--yellow-2: #66541F;--green-0: #4DFF8B;--green-1: #36B261;--green-2: #1F6638;--cyan-0: #4DFFE1;--cyan-1: #36B29E;--cyan-2: #1F665A;--light-blue-0: #4CDFFF;--light-blue-1: #369CB2;--light-blue-2: #1F5966;--blue-0: #4D9CFF;--blue-1: #366DB2;--blue-2: #1F3E66;--purple-0: #974DFF;--purple-1: #6A36B2;--purple-2: #3C1F66;--pink-0: #FF4DFF;--pink-1: #B236B2;--pink-2: #661F66;--white-0: #E5F2FF;--white-1: #A0A9B2;--white-2: #5C6166;--white-3: #393C40;--white-4: #222426;--black-0: #29343F;--black-1: #1E262E;--black-2: #14191F;--black-3: #0D1114;--black-4: #080B0D}:root{--foreground-color-0: var(--white-0);--foreground-color-1: var(--white-1);--foreground-color-2: var(--white-2);--background-color-0: var(--black-0);--background-color-1: var(--black-1);--background-color-2: var(--black-2);--background-color-3: var(--black-3);--background-color-4: var(--black-4);--scrollbar-color: color-mix(in srgb, var(--background-color-0) 25%, transparent)}:root{--border-radius-0: .2rem;--border-radius-1: .375rem;--border-radius-99: 9999px;--svg-drop-shadow-color: var(--black-0);--svg-drop-shadow-0: drop-shadow(.05rem .1rem .15rem color-mix(in srgb, var(--svg-drop-shadow-color) 50%, transparent));--svg-drop-shadow-1: drop-shadow(.1rem .1rem .2rem color-mix(in srgb, var(--svg-drop-shadow-color) 75%, transparent));--window-shadow-size: .3rem;--window-shadow-opacity: 35%;--window-shadow-spread: 3;--window-box-shadow: calc(var(--window-shadow-size) * -1) var(--window-shadow-size) calc(var(--window-shadow-size) * var(--window-shadow-spread)) 0px rgba(0, 0, 0, var(--window-shadow-opacity));--taskbar-height: 3rem;--taskbar-color: var(--background-color-2);--taskbar-opacity: .75;--taskbar-menu-color: var(--background-color-1);--taskbar-menu-opacity: .5;--taskbar-button-hover-color: rgba(255, 255, 255, 5%);--taskbar-filter: blur(1rem);--transition-duration-0: 75ms;--transition-duration-1: .25s;--transition-duration-2: .4s;--ease-int-out-cubic: cubic-bezier(.65, 0, .35, 1);--ease-in-out-quart: cubic-bezier(.76, 0, .24, 1);--ease-in-out-expo: cubic-bezier(.87, 0, .13, 1);--ease-in-out-back: cubic-bezier(.68, -1, .32, 2);--ease-in-out-default: var(--ease-in-out-quart, ease-in-out)}:root{--body-font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;--mono-font-family: "Roboto Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace}@font-face{font-family:Outfit;src:url(/assets/fonts/outfit/Outfit-VariableFont_wght.ttf);font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Thin.ttf) format("truetype");font-weight:100;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-ThinItalic.ttf) format("truetype");font-weight:100;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Light.ttf) format("truetype");font-weight:300;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-LightItalic.ttf) format("truetype");font-weight:300;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Regular.ttf) format("truetype");font-weight:400;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Italic.ttf) format("truetype");font-weight:400;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Medium.ttf) format("truetype");font-weight:500;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-MediumItalic.ttf) format("truetype");font-weight:500;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-SemiBold.ttf) format("truetype");font-weight:600;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-SemiBoldItalic.ttf) format("truetype");font-weight:600;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Bold.ttf) format("truetype");font-weight:700;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-BoldItalic.ttf) format("truetype");font-weight:700;font-style:italic;font-display:block}.Light-theme{--foreground-color-0: var(--black-3);--foreground-color-1: var(--black-2);--foreground-color-2: var(--black-1);--background-color-0: var(--white-0);--background-color-1: var(--white-0);--background-color-2: var(--white-1);--background-color-3: var(--white-1);--background-color-4: var(--white-2);--taskbar-color: var(--white-0);--taskbar-menu-color: var(--white-0);--taskbar-button-hover-color: rgba(0, 0, 0, 5%)}.Cherry-theme{--background-color-0: var(--red-0);--background-color-1: var(--red-0);--background-color-2: var(--red-1);--background-color-3: var(--red-1);--background-color-4: var(--red-2);--taskbar-color: var(--red-2);--taskbar-menu-color: var(--red-1)}.Mango-theme{--foreground-color-0: var(--black-3);--foreground-color-1: var(--black-2);--foreground-color-2: var(--black-1);--background-color-0: var(--yellow-0);--background-color-1: var(--yellow-0);--background-color-2: var(--yellow-1);--background-color-3: var(--yellow-1);--background-color-4: var(--yellow-2);--taskbar-color: var(--yellow-0);--taskbar-menu-color: var(--yellow-0)}.Aqua-theme{--foreground-color-0: var(--black-3);--foreground-color-1: var(--black-2);--foreground-color-2: var(--black-1);--background-color-0: var(--cyan-0);--background-color-1: var(--cyan-0);--background-color-2: var(--cyan-1);--background-color-3: var(--cyan-1);--background-color-4: var(--cyan-2);--taskbar-color: var(--cyan-0);--taskbar-menu-color: var(--cyan-0)}.Grape-theme{--background-color-0: var(--purple-0);--background-color-1: var(--purple-0);--background-color-2: var(--purple-1);--background-color-3: var(--purple-1);--background-color-4: var(--purple-2);--taskbar-color: var(--purple-2);--taskbar-menu-color: var(--purple-1)}*{scrollbar-color:var(--scrollbar-color) transparent;scrollbar-width:thin}*::-webkit-scrollbar{width:1.25rem;height:1.25rem}*::-webkit-scrollbar-track{background:none}*::-webkit-scrollbar-thumb{border-radius:var(--border-radius-99);border:5px solid transparent;background-color:var(--scrollbar-color);background-clip:padding-box;-webkit-backdrop-filter:invert(100%);backdrop-filter:invert(100%);transition:var(--transition-duration-1) var(--ease-in-out-default);z-index:1}*::-webkit-scrollbar-corner{background-color:transparent}html,body,#root{width:100%;height:100%;pointer-events:none}html{scroll-behavior:smooth;overflow:hidden;background-color:var(--background-color-2);font-size:16px}body{margin:0;font-family:var(--body-font-family);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}*,:after,:before{color:var(--foreground-color-0);font-size:1rem;box-sizing:border-box;-webkit-tap-highlight-color:transparent;text-rendering:optimizelegibility}p,a,button,input,select,h1,h2,h3,h4,h5,h6{font-family:var(--body-font-family);letter-spacing:normal}p,a,div,span{font-size:1em}button,input{font-size:.875em}h1{font-size:2em}h2{font-size:1.8em}h3{font-size:1.6em}h4{font-size:1.4em}h5{font-size:1.2em}h6{font-size:1em}button,li[data-rttab=true]{margin:0;border:none;outline:none;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);cursor:pointer;-webkit-user-select:none;user-select:none}code{font-family:var(--mono-font-family)}*::selection{color:var(--background-color-3);background-color:var(--foreground-color-0)}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { mergeDeep as Qt, isValidUrl as Ln, EventEmitter as Ye, Vector2 as z, formatRelativeTime as en, removeFromArray as _e, Result as U, ANSI as _, Ansi as et, clamp as wt, getLongestCommonPrefix as Bn, parseBool as tn, randomRange as Ot, removeDuplicatesFromArray as Un, isValidInteger as tt } from "@prozilla-os/shared";
import { Vector2 as Ua } from "@prozilla-os/shared";
import { jsx as a, jsxs as g, Fragment as Et } from "react/jsx-runtime";
import { isValidElement as nn, Children as sn, createContext as ce, useContext as ue, useState as w, useEffect as y, useCallback as te, memo as de, useRef as le, useMemo as Ne, cloneElement as $n, forwardRef as Wn } from "react";
import { FontAwesomeIcon as O } from "@fortawesome/react-fontawesome";
import { faXmark as rn, faPowerOff as zn, faGear as Vn, faCircleInfo as Hn, faImage as jn, faFileLines as Kn, faExternalLink as Gn, faMinus as Ke, faBatteryFull as Yn, faBatteryEmpty as Xn, faBatteryQuarter as qn, faBatteryHalf as Zn, faBatteryThreeQuarters as Jn, faWifi as Ft, faVolumeHigh as Pt, faSearch as Qn, faSquareCheck as dt, faWindowMaximize as es, faExpand as on, faTimes as an, faCircleRight as ts, faCaretRight as ns, faCircleDot as ss, faEye as is, faArrowsRotate as rs, faCompress as os, faPaintBrush as as, faTrash as Lt, faArrowRight as ls } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG as Pe } from "react-svg";
import ln from "react-draggable";
import { faSquare as ht, faWindowMaximize as cs, faCircle as us } from "@fortawesome/free-regular-svg-icons";
import { ErrorBoundary as ds } from "react-error-boundary";
import { proxy as cn, ref as un, useSnapshot as hs } from "valtio";
import { Theme as He, Skin as ps } from "@prozilla-os/skins";
import Bt from "lz-string";
import Ut from "react-ga4";
import { BrowserRouter as fs, Routes as ms, Route as Ue } from "react-router-dom";
const gs = /^[a-zA-Z0-9-]+$/;
class nt {
  /**
   * The display name of this application.
   */
  name = "App";
  /**
   * The unique ID of this application.
   */
  id = "app";
  /**
   * Main component that renders this app inside a window.
   */
  windowContent;
  /**
   * Default options that get passed to the {@link App.windowContent} component.
   */
  windowOptions;
  /**
   * Description of this application.
   */
  description = null;
  /**
   * URL of the icon of this application.
   */
  iconUrl = null;
  /**
   * Defines what the app can handle and how it can be used elsewhere in the system.
   */
  role = null;
  /**
   * An array of file extensions that this application can interpret.
   */
  associatedExtensions = [];
  /**
   * Determines whether the app is pinned by default.
   * @default true
   */
  pinnedByDefault = !0;
  /**
   * Determines whether the app is launched at startup.
   * @default false
   */
  launchAtStartup = !1;
  /**
   * The category the app belongs to.
   */
  category = null;
  /**
   * Metadata of the app's package.
   */
  metadata = null;
  /**
   * Determines whether a desktop icon is added to the default data.
   * @default false
   */
  showDesktopIcon = !1;
  /**
   * Defines the overrides to apply to this app based on the current skin.
   * 
   * For each entry, if the key is (a subclass of) the current type of skin, the overrides are applied to this app.
   * If multiple entries match the current skin, they are merged.
   * 
   * @see {@link setSkinOverrides}
   * @see {@link addSkinOverride}
   */
  skinOverrides;
  isActive = !1;
  isPinned;
  isInstalled = !0;
  constructor(e, t, n, s) {
    if (this.name = e, this.id = t, this.windowContent = n, this.windowOptions = s, this.id.match(gs) == null)
      throw new Error(`Invalid app ID found: ${this.id}
App IDs may only contain letters (a-zA-Z), numbers (0-9) and dashes (-).`);
  }
  /**
   * Returns the component that renders the content of a window for this app.
   */
  WindowContent = (e) => (e = { ...e, ...this.windowOptions }, this.windowContent == null ? null : /* @__PURE__ */ a(this.windowContent, { ...e }));
  /**
   * Sets the display name of this application.
   */
  setName(e) {
    return this.name = e, this;
  }
  /**
   * Sets the description of this application.
   */
  setDescription(e) {
    return this.description = e, this;
  }
  /**
   * Sets the URL of the icon of this application.
   */
  setIconUrl(e) {
    return this.iconUrl = e, this;
  }
  /**
   * Sets the role of this application.
   */
  setRole(e) {
    return this.role = e, this;
  }
  /**
   * Sets the associated extensions of this application.
   */
  setAssociatedExtensions(e) {
    return this.associatedExtensions = e ?? [], this;
  }
  /**
   * Changes whether this application is pinned by default or not.
   */
  setPinnedByDefault(e) {
    return this.pinnedByDefault = e, this;
  }
  /**
   * Changes whether this application is launched at startup or not.
   */
  setLaunchAtStartup(e) {
    return this.launchAtStartup = e, this;
  }
  /**
   * Changes whether this application is installed by default or not.
   */
  setInstalled(e) {
    return this.isInstalled = e, this;
  }
  /**
   * Sets the category this application belongs to.
   */
  setCategory(e) {
    return this.category = e, this;
  }
  /**
   * Sets the metadata for this application.
   */
  setMetadata(e) {
    return this.metadata = e, this;
  }
  /**
   * Changes whether this application has a desktop icon in the default data.
   */
  setShowDesktopIcon(e) {
    return this.showDesktopIcon = e, this;
  }
  /**
   * Sets the default options for the {@link App.windowContent} component.
   */
  setWindowOptions(e) {
    return this.windowOptions = e, this;
  }
  /**
   * Replaces any existing skin overrides with the given overrides.
   * @param skinOverrides - The skin overrides to assign to this app.
   * @see {@link skinOverrides}
   */
  setSkinOverrides(e) {
    return this.skinOverrides = e, this;
  }
  /**
   * Adds skin overrides to this app.
   * 
   * If there is already an existing entry for the same skin, it is merged with the new overrides.
   * 
   * @see {@link skinOverrides}
   */
  addSkinOverride(e, t) {
    this.skinOverrides || (this.skinOverrides = /* @__PURE__ */ new Map());
    const n = this.skinOverrides.get(e), s = n ? Qt(n, t) : t;
    return this.skinOverrides.set(e, s), this;
  }
  applySkin(e) {
    if (e.appNames && Object.keys(e.appNames).includes(this.id) && this.setName(e.appNames[this.id]), e.appIcons && Object.keys(e.appIcons).includes(this.id) && this.setIconUrl(e.appIcons[this.id]), this.skinOverrides)
      for (const [t, n] of this.skinOverrides)
        e instanceof t && this.applySkinOverrides(e, n);
    this.iconUrl && this.setIconUrl(e.resolveAssetUrl(this.iconUrl)), this.metadata?.screenshots && (this.metadata.screenshots = e.resolveAssetUrls(this.metadata.screenshots));
  }
  applySkinOverrides(e, t) {
    t.name && (this.name = t.name), t.iconUrl && (this.iconUrl = e.resolveAssetUrl(t.iconUrl)), t.description && (this.description = t.description), t.windowContent && (this.windowContent = t.windowContent), t.windowOptions && (this.windowOptions = t.windowOptions), t.metadata && (this.metadata = { ...this.metadata, ...t.metadata });
  }
}
const ws = ["@prozilla-os/core", "@prozilla-os/shared", "react", "react/jsx-runtime", "react-dom"];
function Es(r) {
  const e = ws.map(encodeURIComponent).join(",");
  return `https://esm.sh/${r}?external=${e}`;
}
function xs(r, e) {
  if (e != null) {
    const s = r[e];
    return s instanceof nt ? s : null;
  }
  const t = r.app;
  if (t instanceof nt)
    return t;
  const n = r.default;
  return n instanceof nt ? n : null;
}
async function Ss(r, e) {
  try {
    const t = await import(
      /* @vite-ignore */
      r
    ), n = xs(t, e?.exportName);
    if (n != null)
      return n;
    const s = e?.exportName != null ? `\`export { ${e.exportName} }\`` : "`export { app }` or `export default`";
    throw new Error(`Module does not export a valid App instance. Expected ${s}.`);
  } catch (t) {
    throw new Error(`Failed to load app from URL: ${t instanceof Error ? t.message : String(t)}`);
  }
}
async function _s(r, e) {
  const t = Ln(r) ? r : Es(r);
  return Ss(t, e);
}
class q extends Ye {
  apps = [];
  static APPS_CHANGE_EVENT = "appsChange";
  static APP_ROLES = {
    fileExplorer: "file-explorer",
    terminal: "terminal",
    textEditor: "text-editor",
    settings: "settings",
    mediaViewer: "media-viewer",
    browser: "browser"
  };
  constructor(e = {}) {
    super();
    const { apps: t } = e;
    if (t != null) {
      const n = [];
      t.forEach((s) => {
        if (n.includes(s.id))
          throw new Error(`Duplicate app ID found: ${s.id}
App IDs must be unique.`);
        this.apps.push(s), n.push(s.id);
      });
    }
  }
  /**
   * Returns a list of all installed apps.
   */
  get installedApps() {
    return this.apps.filter((e) => e.isInstalled);
  }
  onAppsChange(e) {
    return this.on(q.APPS_CHANGE_EVENT, e), () => {
      this.off(q.APPS_CHANGE_EVENT, e);
    };
  }
  addApp(e, t) {
    if (this.getAppById(e.id, !0) != null)
      throw new Error(`Duplicate app ID found: ${e.id}
App IDs must be unique.`);
    e.applySkin(t.skin), this.apps.push(e), this.emit(q.APPS_CHANGE_EVENT);
  }
  removeApp(e) {
    const t = this.apps.findIndex((n) => n.id === e);
    return t === -1 ? !1 : (this.apps.splice(t, 1), this.emit(q.APPS_CHANGE_EVENT), !0);
  }
  /**
   * Load an app from a URL or npm package and register it in the system.
   * If an app with the same ID is already registered but uninstalled,
   * it will be re-enabled instead of loaded again.
   * @param target - The npm package name or URL to load the app from.
   * @returns The loaded (or re-enabled) app.
   */
  async installApp(e, t, n) {
    const s = await _s(e, n), i = this.getAppById(s.id, !0);
    if (i != null) {
      if (!i.isInstalled)
        return i.setInstalled(!0), this.emit(q.APPS_CHANGE_EVENT), i;
      throw new Error(`An app with the ID "${s.id}" is already installed.`);
    }
    return this.addApp(s, t), s;
  }
  uninstallApp(e) {
    const t = this.getAppById(e);
    return t == null ? !1 : (t.setInstalled(!1), this.emit(q.APPS_CHANGE_EVENT), !0);
  }
  /**
   * @param id - The ID of the app.
   * @param includeUninstalled - Include apps that are not currently installed.
   */
  getAppById(e, t = !1) {
    let n = null;
    return this.apps.forEach((s) => {
      const i = s.isInstalled || t;
      if (n == null && s.id === e && i) {
        n = s;
        return;
      }
    }), n;
  }
  /**
   * Get the app associated with a file extension.
   */
  getAppByFileExtension(e) {
    let t = null;
    return this.installedApps.forEach((n) => {
      if (t == null && n.associatedExtensions.includes(e)) {
        t = n;
        return;
      }
    }), t ?? this.getAppByRole(q.APP_ROLES.textEditor);
  }
  /**
   * Get the app with a specific role.
   */
  getAppByRole(e) {
    let t = null;
    return this.installedApps.forEach((n) => {
      if (t == null && n.role == e) {
        t = n;
        return;
      }
    }), t;
  }
  /**
   * Get all applications (including uninstalled apps) that belong to a category.
   */
  getAppsByCategory(e) {
    const t = [];
    return this.apps.forEach((n) => {
      n.category == e && t.push(n);
    }), t;
  }
}
class Is {
  defaultIconSize;
  defaultIconDirection;
  constructor(e = {}) {
    const { defaultIconSize: t, defaultIconDirection: n } = e;
    this.defaultIconSize = t ?? 1, this.defaultIconDirection = n ?? 0;
  }
}
class vs {
  doubleClickDelay;
  constructor(e = {}) {
    const { doubleClickDelay: t } = e;
    this.doubleClickDelay = t ?? 250;
  }
}
class xt {
  defaultDialogSize;
  defaultFileSelectorSize;
  static DIALOG_CONTENT_TYPES = {
    closeButton: 0
  };
  constructor(e = {}) {
    const { defaultDialogSize: t, defaultFileSelectorSize: n } = e;
    this.defaultDialogSize = t ?? new z(400, 200), this.defaultFileSelectorSize = n ?? new z(700, 400);
  }
}
class ys {
  height;
  constructor(e = {}) {
    const { height: t } = e;
    this.height = t ?? 48;
  }
}
class Cs {
  enabled;
  googleAnalyticsMeasurementId;
  constructor(e = {}) {
    const { enabled: t, GAMeasurementId: n } = e;
    this.enabled = t ?? !0, this.googleAnalyticsMeasurementId = n ?? "G-ZFQRR9DP3C";
  }
}
class As {
  screenMargin;
  titleSeparator;
  minScreenSize;
  constructor(e = {}) {
    const { screenMargin: t, titleSeparator: n, minScreenSize: s } = e;
    this.screenMargin = t ?? 32, this.titleSeparator = n ?? "-", this.minScreenSize = s ?? new z(350, 350);
  }
}
class Ie extends Ye {
  /** The name of this item. */
  name;
  /** The alias of this item. */
  alias;
  /** The folder this item is in. */
  parent;
  /** Whether this item is protected from changes. */
  isProtected;
  /** The URL of the icon of this item. */
  iconUrl;
  /** The file this item links to. */
  linkedFile;
  /** The folder this item links to. */
  linkedFolder;
  /** Whether this item has been edited by the user. */
  editedByUser;
  /** Whether this item is the root folder. */
  isRoot;
  /** The root folder. */
  root;
  /** Whether this item has been deleted. */
  isDeleted;
  static UPDATE_EVENT = "update";
  constructor(e) {
    super(), this.name = e, this.isDeleted = !1;
  }
  get id() {
    return this.name;
  }
  setName(e) {
    return this.name === e || !this.canBeEdited ? this : (this.name = e, this.confirmChanges(), this);
  }
  setAlias(e) {
    return this.alias === e || !this.canBeEdited ? this : (this.alias = e, this.getRoot().addShortcut(e, this), this.confirmChanges(), this);
  }
  setParent(e) {
    return this.parent === e || !this.canBeEdited ? this : (this.parent = e, this.confirmChanges(), this);
  }
  setProtected(e) {
    return this.canBeEdited ? (this.isProtected = e, this) : this;
  }
  setIconUrl(e) {
    return this.iconUrl === e || !this.canBeEdited ? this : (this.iconUrl = e, this.confirmChanges(), this);
  }
  getIconUrl() {
    if (this.isDeleted) {
      const t = this.parent?.getRoot().systemManager;
      return t ? t.skin.fileIcons.generic : "";
    }
    if (this.iconUrl != null) return this.iconUrl;
    if (this.linkedFile?.iconUrl != null) return this.linkedFile.iconUrl;
    if (this.linkedFolder?.iconUrl != null) return this.linkedFolder.iconUrl;
    const { skin: e } = this.getRoot().systemManager;
    return e.fileIcons.generic;
  }
  getType() {
    return "None";
  }
  /**
   * Tries to delete this item.
   */
  delete() {
    if (!this.canBeEdited)
      return;
    const e = this.parent;
    e != null && ((this.isFolder() || this.isFile()) && e.remove(this), this.isDeleted = !0, this.confirmChanges(e.getRoot()));
  }
  confirmChanges(e) {
    if (e == null) {
      if (this.isDeleted)
        return;
      e = this.getRoot();
    }
    e.loadedDefaultData && (this.editedByUser = !0), e.saveData(), this.emit(Ie.UPDATE_EVENT);
  }
  /**
   * Opens this item in the appropriate application.
   */
  open(...e) {
    return null;
  }
  /**
   * Returns the path of this item.
   */
  get path() {
    return this.alias ?? this.displayPath;
  }
  /**
   * Returns path without using this item's alias.
   */
  get displayPath() {
    return this.parent?.path + "/" + this.id;
  }
  /**
   * Returns path without using any aliases.
   */
  get absolutePath() {
    return this.parent?.isRoot ? "/" + this.id : this.parent?.absolutePath + "/" + this.id;
  }
  /**
   * Returns whether this can be edited in its current state.
   */
  get canBeEdited() {
    if (this.isDeleted)
      return !1;
    const e = this.isProtected && this.getRoot().loadedDefaultData;
    return !e && this.parent != null ? this.parent.canBeEdited : !e;
  }
  /**
   * Returns the root folder.
   */
  getRoot() {
    const e = this.root ?? this.parent?.getRoot();
    if (e == null)
      throw new Error("Root not found");
    return e;
  }
  isFile() {
    return !1;
  }
  isFolder() {
    return !1;
  }
  isLink() {
    return !1;
  }
  toJSON() {
    return this.isDeleted ? null : {
      nam: this.name,
      ico: this.iconUrl
    };
  }
  toString() {
    const e = this.toJSON();
    return e == null ? null : JSON.stringify(e);
  }
}
const ca = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "css",
  "html",
  "xml",
  "yml"
], dn = [
  "png",
  "jpeg",
  "svg",
  "gif",
  "webp",
  "ico"
], hn = [
  "mp3",
  "wav",
  "aac",
  "flac",
  "ogg",
  "m4a",
  "wma",
  "alac",
  "aiff",
  "pcm"
], pn = [
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  "mpeg",
  "mpg",
  "m4v",
  "yt"
], ua = [
  ...dn,
  ...hn,
  ...pn
], ie = {
  external: "ext://",
  app: "app://"
};
function bs(r = !1, e) {
  r && window.confirm(`Are you sure you want to shut down ${e}?`) && (console.info("Closing viewport"), window.open("about:blank", "_self"));
}
function ks() {
  console.info("Reloading viewport"), window.location.reload();
}
function fn(r) {
  document.title = r, document.querySelectorAll("meta[property='og:title'], meta[name='twitter:title']").forEach((e) => {
    e.setAttribute("content", r);
  });
}
function St(r) {
  const e = document.querySelectorAll("link[rel~='icon'], link[rel~='apple-touch-icon']");
  if (e.length == 0) {
    const t = document.createElement("link");
    t.rel = "icon", t.href = r, document.head.appendChild(t);
  }
  e.forEach((t) => {
    t.href = r;
  });
}
function mn() {
  const r = window.location.search.slice(1), e = {};
  return r.split("&").forEach((t) => {
    const [n, s] = t.split("=").map((i) => decodeURIComponent(decodeURIComponent(i)));
    e[n] = s;
  }), e;
}
function _t(r) {
  let e = window.location.origin + "/";
  if (!r || Object.keys(r).length === 0)
    return e;
  const { appId: t, fullscreen: n, standalone: s, ...i } = r, o = new URLSearchParams();
  return s && t ? e += t : (t && o.set("app", t), n && o.set("fullscreen", n.toString())), i && Object.keys(i).length > 0 && Object.entries(i).forEach(([u, c]) => {
    u && c && o.set(u, encodeURIComponent(c));
  }), o.size === 0 ? e : `${e}?${o.toString()}`;
}
function It(r, e) {
  window.open(r, e ?? "_blank");
}
function Ns(r, e, t) {
  navigator.clipboard.writeText(r).then(e, t);
}
function $t(r, e) {
  const t = document.createElement("a");
  t.href = r, t.download = e, t.style.display = "none", document.body.appendChild(t), t.click(), document.body.removeChild(t);
}
function Xe(r) {
  const e = [], t = [];
  return r.forEach((n) => {
    if (n.length > 1)
      n === "Control" ? e.push("Ctrl") : e.push(n);
    else
      switch (n) {
        case "+":
          t.push("Plus");
          break;
        case "-":
          t.push("Minus");
          break;
        default:
          t.push(n.toUpperCase());
          break;
      }
  }), e.concat(t).join("+");
}
function gn(r) {
  if (r == null || typeof r == "boolean")
    return !0;
  if (typeof r == "string")
    return !r;
  if (typeof r == "number" || nn(r))
    return !1;
  let e = !1;
  return sn.forEach(r, (t) => {
    e || gn(t) || (e = !0);
  }), !e;
}
class pt {
  static START_DATE;
  /**
   * Resets the time.
   */
  static reset() {
    pt.START_DATE = /* @__PURE__ */ new Date();
  }
  /**
   * Get the current uptime.
   */
  static getUptime(e = 2) {
    return en(pt.START_DATE, e, !1);
  }
}
class Z extends Ie {
  /** The extension of this file. */
  extension;
  /** The URL of the source of this file. */
  source;
  /** The content of this file. */
  content;
  static NON_TEXT_EXTENSIONS = [
    "png"
  ];
  static CONTENT_CHANGE_EVENT = "contentChange";
  constructor(e, t) {
    super(e), this.extension = t;
  }
  setAlias(e) {
    return super.setAlias(e);
  }
  /**
   * Sets the source of this file and removes the content.
   */
  setSource(e) {
    return this.source === e || !this.canBeEdited ? this : (this.source = e, this.content = null, this.emit(Z.CONTENT_CHANGE_EVENT, this), this.confirmChanges(), this);
  }
  /**
   * Sets the content of this file and removes the source.
   */
  setContent(e) {
    return this.content === e || !this.canBeEdited ? this : (this.content = typeof e == "string" ? e : e.join(`
`), this.source = null, this.emit(Z.CONTENT_CHANGE_EVENT, this), this.confirmChanges(), this);
  }
  get id() {
    return this.extension == null || this.extension.trim() === "" ? this.name : `${this.name}.${this.extension}`;
  }
  static splitId(e) {
    if (!e.includes("."))
      return { name: e, extension: "" };
    const t = e.split("."), n = t.pop();
    return { name: t.join("."), extension: n };
  }
  /**
   * Opens this file in an app associated with its extension.
   */
  open(e) {
    return e.openFile(this);
  }
  async read() {
    return this.isDeleted ? null : this.content != null ? this.content : this.source == null ? null : this.extension == null || !Z.NON_TEXT_EXTENSIONS.includes(this.extension) ? await fetch(this.source).then(
      (t) => t.text()
    ).catch((t) => (console.error(`Error while reading file with ID: ${this.id}
`, t), null)) : this.source;
  }
  isFile() {
    return !0;
  }
  getIconUrl() {
    if (this.isDeleted)
      return super.getIconUrl();
    if (this.iconUrl != null)
      return this.iconUrl;
    const { skin: e, appsConfig: t } = this.getRoot().systemManager;
    if (this.source != null) {
      if (this.extension != null) {
        if (dn.includes(this.extension))
          return this.source;
        if (pn.includes(this.extension))
          return e.fileIcons.video ?? e.fileIcons.generic;
        if (hn.includes(this.extension))
          return e.fileIcons.audio ?? e.fileIcons.generic;
      } else if (this.source.startsWith(ie.app)) {
        const s = t.getAppById(Z.removeFileScheme(this.source));
        if (s?.iconUrl != null)
          return s.iconUrl;
      } else if (this.source.startsWith(ie.external) && e.fileIcons.external != null)
        return e.fileIcons.external;
    }
    let n = null;
    switch (this.extension) {
      case "txt":
      case "md":
        n = e.fileIcons.text ?? e.fileIcons.generic;
        break;
      case "xml":
      case "js":
      case "json":
      case "jsx":
      case "ts":
      case "tsx":
      case "css":
      case "html":
      case "yml":
        n = e.fileIcons.code ?? e.fileIcons.generic;
        break;
      default:
        n = e.fileIcons.generic;
        break;
    }
    return n;
  }
  getType() {
    let e = "";
    if (this.extension == null) return "Unknown file";
    switch (this.extension) {
      case "png":
        e = "PNG Image";
        break;
      case "txt":
        e = "Text";
        break;
      case "md":
        e = "Markdown source";
        break;
      case "xml":
        e = "XML source";
        break;
    }
    return `${e} file (.${this.extension.toLowerCase()})`.trim();
  }
  download() {
    if (this.isDownloadable())
      try {
        if (this.source != null)
          $t(this.source, this.id);
        else if (this.content != null) {
          const e = new Blob([this.content], { type: "text/plain" }), t = window.URL.createObjectURL(e);
          $t(t, this.id), window.URL.revokeObjectURL(t);
        }
      } catch (e) {
        console.error("Error while downloading file:", e);
      }
  }
  isDownloadable() {
    return this.content != null ? !0 : this.source != null ? !this.source.startsWith(ie.external) && !this.source.startsWith(ie.app) : !1;
  }
  toJSON() {
    if (!this.canBeEdited || this.editedByUser == null || !this.editedByUser)
      return null;
    const e = super.toJSON();
    return e == null ? null : (this.extension != null && (e.ext = this.extension), this.content != null ? e.cnt = this.content : this.source != null && (e.src = this.source), e);
  }
  static removeFileScheme(e) {
    let t = !1;
    return Object.values(ie).forEach((n) => {
      e.startsWith(n) && !t && (e.replace(n, ""), t = !0);
    }), e;
  }
}
class Ts extends Z {
  linkedPath;
  constructor(e, t) {
    super(e), this.linkedFile = t;
  }
  setLinkedFile(e) {
    return this.linkedFile = e, e !== null && (this.linkedPath = e.path, this.extension = e.extension, this.content = e.content, this.source = e.source), this;
  }
  setLinkedPath(e) {
    if (this.linkedFile && this.linkedFile.path === e)
      return this;
    const t = this.parent?.navigate(e);
    return t instanceof Z ? this.setLinkedFile(t) : this.linkedFile = null, this;
  }
  isValid() {
    return this.linkedPath ? (this.setLinkedPath(this.linkedPath), this.linkedFile != null) : !1;
  }
  toJSON() {
    return this.linkedPath == null ? null : {
      nam: this.name,
      lnk: this.linkedPath
    };
  }
  isLink() {
    return !0;
  }
  // Point certain methods to linked file
  setAlias(...e) {
    return this.isValid() && this.linkedFile?.setAlias(...e), this;
  }
  setSource(...e) {
    return this.isValid() && this.linkedFile?.setSource(...e), this;
  }
  setContent(...e) {
    return this.isValid() && this.linkedFile?.setContent(...e), this;
  }
  get id() {
    return this.isValid() ? this.linkedFile?.id ?? "" : "";
  }
  open(...e) {
    return this.isValid() ? this.linkedFile?.open(...e) : null;
  }
  async read(...e) {
    if (this.isValid()) return await this.linkedFile?.read(...e);
  }
  getIconUrl(...e) {
    const { skin: t } = this.getRoot().systemManager, n = t.fileIcons.generic;
    return this.isValid() ? this.iconUrl ?? this.linkedFile?.getIconUrl(...e) ?? n : n;
  }
}
class ke extends Ie {
  /** The folders inside this folder. */
  subFolders;
  /** The files inside this folder. */
  files;
  /**
   * The type of this folder.
   * @default VirtualFolder.TYPE.general
   */
  type;
  static TYPE = {
    general: 0,
    media: 1
  };
  constructor(e, t) {
    super(e), this.subFolders = [], this.files = [], this.type = t ?? ke.TYPE.general;
  }
  setAlias(e) {
    return super.setAlias(e);
  }
  /**
   * Returns true if this folder contains a file matching a name and extension.
   */
  hasFile(e, t) {
    return this.findFile(e, t) !== null;
  }
  /**
   * Returns true if this folder contains a folder matching a name.
   */
  hasFolder(e) {
    return this.findSubFolder(e) !== null;
  }
  /**
   * Finds and returns a file inside this folder matching a name and extension.
   */
  findFile(e, t) {
    if (this.isDeleted)
      return null;
    let n = null;
    return this.files.forEach((s) => {
      const i = s.name === e || s.alias && s.alias === e, o = t == null || s.extension === t;
      if (i && o)
        return n = s;
    }), n;
  }
  /**
   * Finds and returns a folder inside this folder matching a name.
   */
  findSubFolder(e) {
    if (this.isDeleted)
      return null;
    let t = null;
    return this.subFolders.forEach((n) => {
      if (n.name === e || n.alias && n.alias === e)
        return t = n;
    }), t;
  }
  addFile(e, t = !0) {
    return this.files.push(e), t ? e.setParent(this) : e.parent = this, this;
  }
  /**
   * Creates a file with a name and extension.
   */
  createFile(e, t, n) {
    if (!this.canBeEdited)
      return this;
    let s = this.findFile(e, t);
    return s == null && (s = new Z(e, t), this.addFile(s, !1)), n?.(s), s.confirmChanges(), this;
  }
  /**
   * Creates files based on an array of objects with file names and extensions.
   */
  createFiles(e) {
    return this.canBeEdited ? (e.forEach(({ name: t, extension: n }) => {
      this.createFile(t, n);
    }), this.confirmChanges(), this) : this;
  }
  /**
   * Creates a file link with a name.
   */
  createFileLink(e, t) {
    if (!this.canBeEdited)
      return this;
    let n = this.findFile(e);
    return n == null && (n = new Ts(e), this.files.push(n), n.parent = this), t?.(n), n.confirmChanges(), this;
  }
  /**
   * Creates file links based on an array of objects with file names and extensions.
   */
  createFileLinks(e) {
    return this.canBeEdited ? (e.forEach(({ name: t }) => {
      this.createFileLink(t);
    }), this.confirmChanges(), this) : this;
  }
  addFolder(e, t = !0) {
    return this.subFolders.push(e), t ? e.setParent(this) : e.parent = this, this;
  }
  /**
   * Creates a folder with a name.
   */
  createFolder(e, t) {
    if (!this.canBeEdited)
      return this;
    let n = this.findSubFolder(e);
    return n == null && (n = new ke(e), this.addFolder(n, !1)), t?.(n), n.confirmChanges(), this;
  }
  /**
   * Creates folders based on an array of folder names.
   */
  createFolders(e) {
    return this.canBeEdited ? (e.forEach((t) => {
      this.createFolder(t);
    }), this.confirmChanges(), this) : this;
  }
  /**
   * Creates a folder link with a name.
   */
  createFolderLink(e, t) {
    if (!this.canBeEdited)
      return this;
    let n = this.findSubFolder(e);
    return n == null && (n = new Ms(e), this.subFolders.push(n), n.parent = this), t?.(n), n.confirmChanges(), this;
  }
  /**
   * Creates folder links based on an array of folder names.
   */
  createFolderLinks(e) {
    return this.canBeEdited ? (e.forEach((t) => {
      this.createFolder(t);
    }), this.confirmChanges(), this) : this;
  }
  /**
   * Removes a file or folder from this folder.
   */
  remove(e) {
    return this.canBeEdited ? (e.parent = void 0, e.isFile() ? _e(e, this.files) : e.isFolder() && _e(e, this.subFolders), e.confirmChanges(this.getRoot()), this.emit(Ie.UPDATE_EVENT), this) : this;
  }
  create(e) {
    return this.navigate(e, !0);
  }
  /**
   * Returns the file or folder at a relative path or null if it doesn't exist.
   */
  navigate(e, t = !1) {
    const n = e.split("/");
    let s = this;
    const i = (l, u, c) => {
      if (u && l === "")
        return this.getRoot();
      if (u && Object.keys(this.getRoot().shortcuts).includes(l))
        return this.getRoot().shortcuts[l];
      if (l === ".")
        return this;
      if (l === "..")
        return s?.parent;
      if (s?.isFolder()) {
        let d = s.findSubFolder(l);
        return d == null && t && !c && s.createFolder(l, (h) => d = h), d;
      } else
        return null;
    };
    if (n.length === 1) {
      const l = i(n[0], !0, !0);
      if (l != null)
        return l;
    }
    for (let l = 0; l < n.length - 1; l++) {
      const u = n[l];
      s = i(u, l === 0, !1);
    }
    const o = n.at(-1);
    if (o)
      if (s != null && s.isFolder()) {
        const l = s.findSubFolder(o);
        if (l != null) return l;
        const { name: u, extension: c } = Z.splitId(o);
        let d = s.findFile(u, c);
        return d == null && t && s.createFile(u, c, (h) => d = h), d;
      } else
        return null;
    else return s;
  }
  navigateToFolder(e) {
    const t = this.navigate(e);
    return t !== null && t.isFolder() ? t : null;
  }
  navigateToFile(e) {
    const t = this.navigate(e);
    return t !== null && t.isFile() ? t : null;
  }
  /**
   * Opens this folder in file explorer.
   */
  open(e) {
    if (this.isDeleted)
      return;
    const { appsConfig: t } = this.getRoot().systemManager, n = t.getAppByRole(q.APP_ROLES.fileExplorer);
    if (n != null)
      return e.open(n.id, { path: this.path });
  }
  /**
   * Deletes this folder and all its files and sub-folders recursively.
   */
  delete() {
    if (!this.canBeEdited)
      return;
    super.delete(), [
      ...this.files,
      ...this.subFolders
    ].forEach((t) => {
      t.delete();
    }), this.confirmChanges();
  }
  /**
   * Returns all files inside this folder.
   * @param showHidden - Whether to include hidden files.
   */
  getFiles(e = !1) {
    return this.isDeleted ? [] : e ? this.files : this.files.filter(
      ({ name: t }) => !t.startsWith(".")
    );
  }
  /**
   * Returns all sub-folders inside this folder.
   * @param showHidden - Whether to include hidden folders.
   */
  getSubFolders(e = !1) {
    return this.isDeleted ? [] : e ? this.subFolders : this.subFolders.filter(
      ({ name: t }) => !t.startsWith(".")
    );
  }
  /**
   * Returns the amount of files and sub-folders inside this folder.
   * @param includeHidden - Whether to include hidden files and folders in the count.
   */
  getItemCount(e = !1) {
    const t = this.getFiles(e).length, n = this.getSubFolders(e).length;
    return t + n;
  }
  isFolder() {
    return !0;
  }
  getIconUrl() {
    if (this.isDeleted)
      return super.getIconUrl();
    if (this.iconUrl != null)
      return this.iconUrl;
    const { skin: e } = this.getRoot().systemManager;
    return e.folderIcons.generic;
  }
  toJSON() {
    const e = super.toJSON();
    if (e == null)
      return null;
    if (this.files.length > 0) {
      const t = this.files.map((n) => n.toJSON()).filter((n) => n != null);
      t.length > 0 && (e.fls = t);
    }
    if (this.subFolders.length > 0) {
      const t = this.subFolders.map((n) => n.toJSON()).filter((n) => n != null);
      t.length > 0 && (e.fds = t);
    }
    return !this.editedByUser && (!e.fls || e.fls.length === 0) && (!e.fds || e.fds.length === 0) ? null : e;
  }
}
class Ms extends ke {
  linkedPath;
  constructor(e, t) {
    super(e), this.linkedFolder = t;
  }
  setLinkedFolder(e) {
    return this.linkedFolder = e, e !== null && (this.linkedPath = e.path, this.type = e.type), this;
  }
  setLinkedPath(e) {
    if (this.linkedFolder && this.linkedFolder.path === e)
      return this;
    const t = this.navigate(e);
    return t instanceof ke ? this.setLinkedFolder(t) : this.linkedFolder = null, this;
  }
  isValid() {
    return this.linkedPath ? (this.setLinkedPath(this.linkedPath), this.linkedFolder != null) : !1;
  }
  getIconUrl() {
    if (this.iconUrl != null)
      return this.iconUrl;
    if (this.isValid() && this.linkedFolder?.iconUrl)
      return this.linkedFolder.iconUrl;
    const { skin: e } = this.getRoot().systemManager;
    return e.folderIcons.link ?? e.folderIcons.generic;
  }
  toJSON() {
    return this.linkedPath == null ? null : {
      nam: this.name,
      lnk: this.linkedPath
    };
  }
  isLink() {
    return !0;
  }
  // Point certain methods to linked folder
  setAlias(...e) {
    return this.isValid() && this.linkedFolder?.setAlias(...e), this;
  }
  createFile(...e) {
    return this.isValid() && this.linkedFolder?.createFile(...e), this;
  }
  createFiles(...e) {
    return this.isValid() && this.linkedFolder?.createFiles(...e), this;
  }
  createFolder(...e) {
    return this.isValid() && this.linkedFolder?.createFolder(...e), this;
  }
  createFolders(...e) {
    return this.isValid() && this.linkedFolder?.createFolders(...e), this;
  }
  hasFile(...e) {
    return this.isValid() ? this.linkedFolder?.hasFile(...e) ?? !1 : !1;
  }
  hasFolder(...e) {
    return this.isValid() ? this.linkedFolder?.hasFolder(...e) ?? !1 : !1;
  }
  findFile(...e) {
    return this.isValid() ? this.linkedFolder?.findFile(...e) : null;
  }
  findSubFolder(...e) {
    return this.isValid() ? this.linkedFolder?.findSubFolder(...e) : null;
  }
  getFiles(...e) {
    return this.isValid() ? this.linkedFolder?.getFiles(...e) ?? [] : [];
  }
  getSubFolders(...e) {
    return this.isValid() ? this.linkedFolder?.getSubFolders(...e) ?? [] : [];
  }
  open(...e) {
    return this.isValid() ? this.linkedFolder?.open(...e) : null;
  }
  getItemCount(...e) {
    return this.isValid() ? this.linkedFolder?.getItemCount(...e) ?? 0 : 0;
  }
}
function Ds(r, e) {
  const { skin: t, appsConfig: n, virtualDriveConfig: s } = r, i = {};
  e.createFolder("home", (o) => {
    o.createFolder("prozilla-os", (l) => {
      l.setAlias("~").createFolder(".config", (u) => {
        u.createFile("desktop", "xml", (c) => {
          c.setContent([
            "<options>",
            `	<wallpaper>${t.defaultWallpaper}</wallpaper>`,
            "	<show-icons>true</show-icons>",
            "</options>"
          ]);
        }).createFile("taskbar", "xml", (c) => {
          c.setContent([
            "<options>",
            `	<pins>${n.apps.filter((d) => d.pinnedByDefault).map(({ id: d }) => d).join(",")}</pins>`,
            "</options>"
          ]);
        }).createFile("apps", "xml", (c) => {
          c.setContent([
            "<options>",
            `	<startup>${n.apps.filter((d) => d.launchAtStartup).map(({ id: d }) => d).join(",")}</startup>`,
            "</options>"
          ]);
        }).createFile("theme", "xml", (c) => {
          c.setContent([
            "<options>",
            `	<theme>${t.defaultTheme ?? He.Dark}</theme>`,
            "</options>"
          ]);
        });
      }), s.defaultData.includePicturesFolder && l.createFolder("Pictures", (u) => {
        u.setIconUrl(t.folderIcons.images ?? t.folderIcons.generic), u.createFolder("Wallpapers", (c) => {
          c.setProtected(!0);
          for (let d = 0; d < t.wallpapers.length; d++) {
            const h = t.wallpapers[d];
            c.createFile(`Wallpaper${d + 1}`, "png", (p) => {
              p.setSource(h);
            });
          }
        }).createFile("ProzillaOS", "png", (c) => {
          c.setSource("/assets/banner-logo-title.png");
        }).createFile("Icon", "svg", (c) => {
          c.setSource("/icon.svg");
        }).createFolder("Crumbling City", (c) => {
          c.createFile("Japan", "png", (d) => {
            d.setSource("https://daisygames.org/media/Games/Crumbling%20City/CrumblingCityRelease.png");
          }).createFile("City Center", "png", (d) => {
            d.setSource("https://daisygames.org/media/Games/Crumbling%20City/Screenshot_City_Firegun.png");
          }).createFile("Farms", "png", (d) => {
            d.setSource("https://daisygames.org/media/Games/Crumbling%20City/Screenshot_Farms_Hammer.png");
          });
        }), i.images = u.path;
      }), s.defaultData.includeDocumentsFolder && l.createFolder("Documents", (u) => {
        u.setIconUrl(t.folderIcons.text ?? t.folderIcons.generic), u.createFile("text", "txt", (c) => {
          c.setContent("Hello world!");
        }).createFile("Info", "md", (c) => {
          c.setProtected(!0).setSource("/documents/info.md").setIconUrl(t.fileIcons.info ?? t.fileIcons.generic), i.info = c.path;
        }).createFile("Prozilla", "md", (c) => {
          c.setProtected(!0).setSource("/documents/prozilla.md"), i.links = c.path;
        }), i.documents = u.path;
      }), s.defaultData.includeDesktopFolder && l.createFolder("Desktop", (u) => {
        u.createFileLink("Info.md", (c) => {
          c.isLink() && c.setLinkedPath(i.info);
        }).createFileLink("Prozilla.md", (c) => {
          c.isLink() && c.setLinkedPath(i.links);
        }).createFolderLink("Pictures", (c) => {
          c.isLink() && c.setLinkedPath(i.images);
        }).createFolderLink("Documents", (c) => {
          c.isLink() && c.setLinkedPath(i.documents);
        }).createFile("Documentation", void 0, (c) => {
          c.setSource(ie.external + "https://os.prozilla.dev/docs/");
        }), n.apps.forEach((c) => {
          c.showDesktopIcon && u.createFile(c.name, void 0, (d) => {
            d.setSource(ie.app + c.id).setIconUrl(c.iconUrl);
          });
        });
      }), s.defaultData.includeVideoFolder && l.createFolder("Videos", (u) => {
        u.setIconUrl(t.folderIcons.video ?? t.folderIcons.generic).createFile("Weezer_Buddy-Holly", "yt", (c) => {
          c.setSource("https://www.youtube.com/watch?v=kemivUKb4f4");
        });
      }), s.defaultData.includeAudioFolder && l.createFolder("Audio", (u) => {
        u.setIconUrl(t.folderIcons.audio ?? t.folderIcons.generic).createFile("Andrew-Applepie_Im-So", "ogg", (c) => {
          c.setSource("/assets/audio/Andrew-Applepie_Im-So.ogg");
        }).createFile("Andrew-Applepie_Run-Part-2", "ogg", (c) => {
          c.setSource("/assets/audio/Andrew-Applepie_Run-Part-2.ogg");
        });
      }), s.defaultData.includeAppsFolder && l.createFolder("Apps", (u) => {
        n.apps.forEach((c) => {
          u.createFile(c.name, void 0, (d) => {
            d.setSource(ie.app + c.id).setIconUrl(c.iconUrl);
          });
        });
      }), s.defaultData.includeScriptsFolder && l.createFolder("Scripts", (u) => {
        u.createFile("fizzbuzz", "sh", (c) => {
          c.setSource("/scripts/fizzbuzz.sh");
        }).createFile("helloworld", "sh", (c) => {
          c.setSource("/scripts/helloworld.sh");
        });
      });
    });
  }), s.defaultData.includeSourceTree && Rs(e);
  try {
    s.defaultData.loadData?.(e);
  } catch (o) {
    console.error(o);
  }
}
function Rs(r) {
  const e = [
    "/public/config/tree.json"
  ];
  fetch("/config/tree.json").then(
    (t) => t.json()
  ).then(({ files: t, folders: n }) => {
    n.forEach((s) => {
      const i = s.lastIndexOf("/");
      if (i === -1) {
        r.createFolder(s);
        return;
      }
      const o = s.substring(0, i), l = s.substring(i + 1);
      r.navigate(o).createFolder(l);
    }), t.forEach((s) => {
      if (e.includes(s))
        return;
      const i = s.lastIndexOf("/"), o = (h) => {
        const p = h.absolutePath;
        p.startsWith("/public/") ? h.setSource(p.replace(/^\/public\//, "/")) : h.setSource(`https://raw.githubusercontent.com/prozilla-os/ProzillaOS/main${p}`);
      };
      if (i === -1) {
        const { name: h, extension: p } = Z.splitId(s);
        r.createFile(h, p, o);
        return;
      }
      const l = s.substring(0, i), { name: u, extension: c } = Z.splitId(s.substring(i + 1));
      r.navigate(l).createFile(u, c, o);
    });
  }).catch(() => {
    console.warn("Failed to load source tree. Make sure the tree data is valid and up-to-date using the fetchRepository script.");
  });
}
class ne {
  /**
   * Enables compression of values stored in this storage.
   * @default false
   */
  enableCompression = !1;
  /**
   * The prefix to prepend to keys.
   * @default undefined
   */
  prefix;
  /**
   * The maximum amount of bytes of a value in this storage.
   */
  static MAX_BYTES = 5e6;
  static COMPRESSED_PREFIX = "";
  static UNCOMPRESSED_PREFIX = "";
  /**
   * Stores a key and value pair in this storage.
   * @param key - The key to store.
   * @param value - The value to store.
   */
  store(e, t) {
    const { result: n, size: s } = this.encode(t);
    if (this.prefix !== void 0 && !e.startsWith(this.prefix) && (e = this.prefix + e), ne.getByteSize(e) + s > ne.MAX_BYTES)
      throw new Error("Failed to store value: storage capacity exceeded.");
    localStorage.setItem(e, n);
  }
  /**
   * Loads a value associated with the given key.
   * @param key - The key of the item.
   * @returns The value of the item.
   */
  load(e) {
    this.prefix !== void 0 && !e.startsWith(this.prefix) && (e = this.prefix + e);
    let t = localStorage.getItem(e);
    if (t == null) {
      if (this.prefix === void 0 || !e.startsWith(this.prefix))
        return null;
      const n = e.replace(this.prefix, "");
      if (t = localStorage.getItem(n), t != null)
        localStorage.removeItem(n), localStorage.setItem(e, t);
      else
        return null;
    }
    return this.decode(t);
  }
  /**
   * Replaces the key of an item if it exists.
   * @param oldKey - The key to replace.
   * @param newKey - The new key.
   */
  rename(e, t) {
    const n = localStorage.getItem(e);
    return this.prefix !== void 0 && !t.startsWith(this.prefix) && (t = this.prefix + t), n == null ? (this.prefix !== void 0 && !e.startsWith(this.prefix) && this.rename(this.prefix + e, t), this) : (localStorage.removeItem(e), localStorage.setItem(t, n), this);
  }
  /**
   * Removes the item with the given key from this storage.
   * @param key - The key of the item.
   */
  remove(e) {
    return localStorage.removeItem(e), this;
  }
  /**
   * Clears all items stored in this storage.
   */
  clear() {
    return localStorage.clear(), this;
  }
  /**
   * Returns the byte size of a key and value pair.
   * @param key - The key of the item.
   * @param value - The value of the item.
   */
  getItemByteSize(e, t) {
    return this.prefix !== void 0 && !e.startsWith(this.prefix) && (e = this.prefix + e), ne.getByteSize(e) + this.getEncodedByteSize(t);
  }
  getEncodedByteSize(e) {
    return e == null ? 0 : this.encode(e).size;
  }
  encode(e) {
    const t = ne.getByteSize(e);
    if (!this.enableCompression || !e.length)
      return { result: e, size: t };
    const n = Bt.compressToUTF16(e), s = ne.getByteSize(n);
    return t <= s ? { result: ne.UNCOMPRESSED_PREFIX + e, size: t } : { result: ne.COMPRESSED_PREFIX + n, size: s };
  }
  decode(e) {
    return e.length ? e.startsWith(ne.COMPRESSED_PREFIX) ? Bt.decompressFromUTF16(e.slice(1)) : e.startsWith(ne.UNCOMPRESSED_PREFIX) ? e.slice(1) : e : e;
  }
  setPrefix(e) {
    return this.prefix = e, this;
  }
  static getByteSize(e) {
    return e == null ? 0 : new Blob([e]).size;
  }
  static byteToKilobyte(e) {
    return e / 1e3;
  }
}
class je extends ne {
  virtualDriveConfig;
  static KEY = "drive";
  constructor(e) {
    super(), this.virtualDriveConfig = e, this.synchronize(), this.virtualDriveConfig.saveData && this.virtualDriveConfig.saveData.migrations?.forEach(([t, n]) => this.rename(t, n));
  }
  load(e) {
    return this.synchronize(), super.load(e);
  }
  store(e, t) {
    this.synchronize(), super.store(e, t);
  }
  synchronize() {
    this.virtualDriveConfig.saveData && (this.enableCompression = this.virtualDriveConfig.saveData.enableCompression, this.prefix = this.virtualDriveConfig.saveData.prefix);
  }
}
class vt extends ke {
  /** Aliases for files and folders. */
  shortcuts;
  initiated = !1;
  loadedDefaultData = !1;
  systemManager;
  storage;
  static ERROR_EVENT = "error";
  constructor(e) {
    super("root"), this.root = this, this.systemManager = e, this.storage = new je(e.virtualDriveConfig), this.isRoot = !0, this.shortcuts = {};
  }
  loadDefaultData() {
    Ds(this.systemManager, this);
  }
  loadData() {
    if (!this.systemManager.virtualDriveConfig.saveData)
      return;
    const e = this.storage.load(je.KEY);
    if (e == null)
      return;
    let t = null;
    try {
      t = JSON.parse(e);
    } catch (o) {
      console.error(o);
    }
    if (t == null)
      return;
    const n = { ...t.scs }, s = ({
      nam: o,
      ext: l,
      src: u,
      cnt: c,
      lnk: d,
      ico: h
    }, p = this) => {
      if (d) {
        p.createFileLink(o, (f) => {
          f.setLinkedPath(d), h != null && f.setIconUrl(h);
        });
        return;
      }
      p.createFile(o, l, (f) => {
        u != null ? f.setSource(u) : c != null && f.setContent(c), h != null && f.setIconUrl(h);
      });
    }, i = ({
      nam: o,
      fds: l,
      fls: u,
      lnk: c,
      ico: d
    }, h = this) => {
      if (c) {
        h.createFolderLink(o, (p) => {
          p.setLinkedPath(c), d != null && p.setIconUrl(d);
        });
        return;
      }
      h.createFolder(o, (p) => {
        if (Object.values(n).includes(p.displayPath)) {
          let f = null;
          for (const [m, E] of Object.entries(n))
            E === p.displayPath && (f = m);
          f != null && p.setAlias(f);
        }
        l?.forEach((f) => {
          i(f, p);
        }), u?.forEach((f) => {
          s(f, p);
        }), d != null && p.setIconUrl(d);
      });
    };
    t.fds != null && t.fds.forEach((o) => {
      i(o);
    }), t.fls != null && t.fls.forEach((o) => {
      s(o);
    });
  }
  /**
   * Calls the storage manager's store function with this root's data as a string.
   */
  saveData() {
    if (!this.initiated || !this.systemManager.virtualDriveConfig.saveData)
      return;
    const e = this.toString();
    if (e != null)
      try {
        this.storage.store(je.KEY, e);
      } catch (t) {
        console.error(t), this.emit(vt.ERROR_EVENT, {
          message: "Failed to save data"
        });
      }
  }
  /**
   * Initializes this root by loading the default data and then the user's data on top.
   */
  init() {
    return this.initiated = !1, this.loadedDefaultData = !1, this.setAlias("/"), this.loadDefaultData(), this.loadedDefaultData = !0, this.loadData(), this.initiated = !0, this;
  }
  /**
   * Adds a shortcut to a file or folder.
   */
  addShortcut(e, t) {
    return this.shortcuts[e] = t, this;
  }
  /**
   * Tells the storage manager to clear all data and reloads the window.
   */
  reset() {
    window.confirm("Are you sure you want to reset all your data?") && (this.systemManager.storage.clear(), window.location.reload());
  }
  static isValidName(e) {
    return !0;
  }
  static isValidFileName(e) {
    return !0;
  }
  static isValidFolderName(e) {
    return !0;
  }
  get path() {
    return "";
  }
  get displayPath() {
    return "/";
  }
  toJSON() {
    const e = super.toJSON();
    if (e == null)
      return null;
    if (Object.entries(this.shortcuts).length > 0) {
      e.scs = {};
      for (const [t, n] of Object.entries(this.shortcuts))
        n.root || (e.scs[t] = n.absolutePath);
    }
    return e;
  }
  toString() {
    const e = this.toJSON();
    return e == null ? null : JSON.stringify(e);
  }
}
class Os {
  saveData;
  defaultData;
  constructor(e = {}) {
    const { saveData: t, defaultData: n } = e;
    this.saveData = t ?? {
      enableCompression: !1,
      prefix: "pos-",
      migrations: [["data", je.KEY]]
    }, this.defaultData = {
      includePicturesFolder: !0,
      includeDocumentsFolder: !0,
      includeDesktopFolder: !0,
      includeSourceTree: !0,
      includeAppsFolder: !0,
      includeScriptsFolder: !0,
      includeAudioFolder: !0,
      includeVideoFolder: !0,
      ...n
    };
  }
}
class da {
  #e;
  options = [];
  manual;
  requireArgs;
  requireOptions;
  /**
   * The core logic to run when the command is invoked.
   */
  execute = () => {
  };
  /**
   * Sets the command name and initializes the default usage string if not already set.
   */
  setName(e) {
    return this.#e = e, e && !this.manual?.usage && (this.manual || (this.manual = {}), this.manual.usage = e), this;
  }
  get name() {
    return this.#e ?? "";
  }
  setExecute(e) {
    return this.execute = e, this;
  }
  setRequireArgs(e) {
    return this.requireArgs = e, this;
  }
  setRequireOptions(e) {
    return this.requireOptions = e, this;
  }
  setManual({ purpose: e, usage: t, description: n, options: s }) {
    return this.manual = { purpose: e, usage: t, description: n, options: s }, this;
  }
  /**
   * Registers a new option/flag for this command.
   */
  addOption({ short: e, long: t, isInput: n = !1 }) {
    return this.options.push({ short: e, long: t, isInput: n }), this;
  }
  /**
   * Retrieves an option definition by either its short or long name.
   */
  getOption(e) {
    return this.options.find((t) => t.short === e || t.long === e);
  }
}
const Fs = /* @__PURE__ */ Object.assign({ "./commands/afire.ts": () => import("/assets/afire-DlRwSfiJ.js"), "./commands/banner.ts": () => import("/assets/banner-jSvYkuqB.js"), "./commands/cat.ts": () => import("/assets/cat-B_KOgu80.js"), "./commands/cd.ts": () => import("/assets/cd-DGILEGTs.js"), "./commands/clear.ts": () => import("/assets/clear-C8xhqHmC.js"), "./commands/cmatrix.ts": () => import("/assets/cmatrix-DvaWzvRn.js"), "./commands/compgen.ts": () => import("/assets/compgen-2kLzA1wV.js"), "./commands/cowsay.ts": () => import("/assets/cowsay-CTLxUPtF.js"), "./commands/date.ts": () => import("/assets/date-CA1ub92R.js"), "./commands/dir.ts": () => import("/assets/dir-w2XNd6oI.js"), "./commands/doubleBracket.ts": () => import("/assets/doubleBracket-B5nqIccY.js"), "./commands/echo.ts": () => import("/assets/echo-_hDVbupR.js"), "./commands/eval.ts": () => import("/assets/eval-4uLqmhXl.js"), "./commands/exit.ts": () => import("/assets/exit-w3PqRkwA.js"), "./commands/false.ts": () => import("/assets/false-D6AWAlcU.js"), "./commands/fortune.ts": () => import("/assets/fortune-D8ZK6xtX.js"), "./commands/grep.ts": () => import("/assets/grep-DZO92KaH.js"), "./commands/head.ts": () => import("/assets/head-C_bbNyUc.js"), "./commands/help.ts": () => import("/assets/help-OHTeCzgo.js"), "./commands/history.ts": () => import("/assets/history-DeQor0w1.js"), "./commands/hostname.ts": () => import("/assets/hostname-B-lPyRps.js"), "./commands/htop.ts": () => import("/assets/htop-l0sNRNKZ.js"), "./commands/install.ts": () => import("/assets/install-D2im81Ke.js"), "./commands/less.ts": () => import("/assets/less-wELkkcQx.js"), "./commands/lolcat.ts": () => import("/assets/lolcat-xpDAXsIt.js"), "./commands/ls.ts": () => import("/assets/ls-D2Ln7mue.js"), "./commands/man.ts": () => import("/assets/man-E9nMmKZ1.js"), "./commands/mkdir.ts": () => import("/assets/mkdir-BdEywO2H.js"), "./commands/nano.ts": () => import("/assets/nano-DsRjsQ-k.js"), "./commands/neofetch.ts": () => import("/assets/neofetch-Dyre2Ik0.js"), "./commands/pipes.ts": () => import("/assets/pipes-CQ-pK6Kv.js"), "./commands/printenv.ts": () => import("/assets/printenv-Cq-skM9d.js"), "./commands/pwd.ts": () => import("/assets/pwd-CZ9IWAfu.js"), "./commands/rain.ts": () => import("/assets/rain-DT-V01dD.js"), "./commands/reboot.ts": () => import("/assets/reboot-nbAmZck6.js"), "./commands/reload.ts": () => import("/assets/reload-CE3ZVq6O.js"), "./commands/rev.ts": () => import("/assets/rev-C5m1qeoZ.js"), "./commands/rm.ts": () => import("/assets/rm-Uxuv-dEz.js"), "./commands/rmdir.ts": () => import("/assets/rmdir-BYWer3pb.js"), "./commands/sh.ts": () => import("/assets/sh-CIyBHb8C.js"), "./commands/sl.ts": () => import("/assets/sl-CVLteJLH.js"), "./commands/sleep.ts": () => import("/assets/sleep-hEBW30R3.js"), "./commands/snow.ts": () => import("/assets/snow-DAlyPPxX.js"), "./commands/tail.ts": () => import("/assets/tail-BLlaoTxA.js"), "./commands/touch.ts": () => import("/assets/touch-BReUyL_z.js"), "./commands/true.ts": () => import("/assets/true-j1Uf2Nz9.js"), "./commands/uniq.ts": () => import("/assets/uniq-LncLpnFY.js"), "./commands/uptime.ts": () => import("/assets/uptime-pYltXMOi.js"), "./commands/vi.ts": () => import("/assets/vi-Cgo3qLR9.js"), "./commands/watch.ts": () => import("/assets/watch-B4Tgzgbn.js"), "./commands/whatis.ts": () => import("/assets/whatis-BPKA-MNF.js"), "./commands/whoami.ts": () => import("/assets/whoami-BS3xdQEI.js"), "./commands/yes.ts": () => import("/assets/yes-ilM2l2xq.js") });
class yt {
  static builtins = [];
  static loadingTask = null;
  static NOT_FOUND_ERROR = "Command not found";
  static IS_DIRECTORY_ERROR = "Is a directory";
  /**
   * Finds the executable with the given name.
   * @param name - The name of the executable.
   * @param env - The environment to read the path variable from.
   * @param workingDirectory - The directory to search in.
   */
  static async resolve(e, t, n) {
    return this.loadingTask && await this.loadingTask, e.includes("/") ? this.resolvePath(e, n) : U.nonNullOrElse(
      this.getBuiltin(e),
      () => this.resolveFromPathVariable(e, t, n)
    );
  }
  /**
   * Resolves a specific path to a {@link VirtualFile}.
   * @param path - The path to navigate to.
   * @param workingDirectory - The directory to start the navigation from.
   * @returns The resolved file or a failure if this is a directory or does not exist.
   */
  static resolvePath(e, t) {
    return U.nonNullOr(t.navigate(e), this.NOT_FOUND_ERROR).filter((n) => n.isFile(), () => this.IS_DIRECTORY_ERROR);
  }
  /**
   * Attempts to resolve an executable by searching through the directories defined in the PATH variable.
   * @param name - The name of the executable.
   * @param env - The environment containing the PATH variable.
   * @param workingDirectory - The directory to use for path resolution.
   * @returns The first matching executable found in the PATH.
   */
  static resolveFromPathVariable(e, t, n) {
    return U.nonNullOr(t.get("PATH"), this.NOT_FOUND_ERROR).next((s) => U.any(
      s.split(":"),
      (i) => this.resolvePath(`${i}/${e}`, n),
      U.error(this.NOT_FOUND_ERROR)
    ));
  }
  /**
   * Finds the builtin command with the given name.
   * @param name - The name of the builtin.
   * @returns The builtin with the given name, or `null` if there is none.
   */
  static getBuiltin(e) {
    return this.builtins.find((t) => t.name === e) ?? null;
  }
  /**
   * Loads all builtins.
   * @returns A promise that resolves when all builtins have finished loading.
   */
  static async loadBuiltins() {
    this.builtins = [];
    const e = Object.entries(Fs).map(async ([t, n]) => {
      const i = await n(), o = Object.keys(i)[0], l = i[o];
      l !== void 0 && (l.name || l.setName(o.toLowerCase()), this.builtins.push(l));
    });
    return this.loadingTask = Promise.all(e).then(() => {
      this.loadingTask = null;
    }), this.loadingTask;
  }
}
yt.loadBuiltins();
class R extends Ye {
  isClosed = !1;
  buffer = [];
  pendingReads = [];
  currentSignal = null;
  static DATA_EVENT = "data";
  static END_EVENT = "end";
  static SIGNAL_EVENT = "signal";
  static ERROR_EVENT = "error";
  static INTERRUPTED = "interrupted";
  static CLOSED = "closed";
  static TERMINATING_SIGNALS = ["SIGINT", "SIGKILL", "SIGTERM", "SIGHUP", "SIGQUIT", "SIGPIPE"];
  /**
   * Closes the stream (EOF). Subsequent calls to write will be rejected.
   */
  end() {
    if (this.isClosed)
      return this;
    for (this.isClosed = !0; this.pendingReads.length; ) {
      const e = this.pendingReads.shift();
      e !== void 0 && e.resolve(U.ok(null));
    }
    return this.emit(R.END_EVENT), this;
  }
  /**
   * Emits a control signal. Standard termination signals will automatically close the stream.
   */
  signal(e) {
    for (this.currentSignal = e, this.emit(R.SIGNAL_EVENT, e); this.pendingReads.length; ) {
      const t = this.pendingReads.shift();
      t !== void 0 && t.resolve(U.error({ type: R.INTERRUPTED, signal: this.currentSignal }));
    }
    return R.TERMINATING_SIGNALS.includes(e) && this.end(), this;
  }
  /**
   * Broadcasts data to all listeners if the stream is open.
   */
  async write(e) {
    if (this.currentSignal !== null && R.TERMINATING_SIGNALS.includes(this.currentSignal))
      return Promise.resolve(U.error({ type: R.INTERRUPTED, signal: this.currentSignal }));
    if (this.isClosed)
      return console.warn("Data dropped by stream: " + JSON.stringify(e)), Promise.resolve(U.error({ type: R.CLOSED }));
    if (this.pendingReads.length) {
      const t = this.pendingReads.shift();
      t !== void 0 && t.resolve(U.ok(e));
    } else
      this.buffer.push(e);
    return this.emit(R.DATA_EVENT, e), Promise.resolve(U.ok(void 0));
  }
  /**
   * Resolves with the next available chunk, or null if the stream is closed (EOF).
   */
  async read() {
    if (this.currentSignal !== null && R.TERMINATING_SIGNALS.includes(this.currentSignal))
      return Promise.resolve(U.error({ type: R.INTERRUPTED, signal: this.currentSignal }));
    if (this.buffer.length) {
      const e = this.buffer.shift();
      if (e !== void 0)
        return Promise.resolve(U.ok(e));
    }
    return this.isClosed ? Promise.resolve(U.ok(null)) : new Promise((e) => {
      this.pendingReads.push({ resolve: e });
    });
  }
  /**
   * Forwards data, end events, and signals from this stream to another.
   * @param destination - The stream that will receive the forwarded data.
   * @returns The destination stream to allow for chainable piping.
   */
  pipe(e, t = !0) {
    return this.on(R.DATA_EVENT, async (n) => {
      await e.write(n);
    }), this.on(R.SIGNAL_EVENT, (n) => {
      e.signal(n);
    }), t && this.on(R.END_EVENT, () => {
      e.end();
    }), e;
  }
  async wait(e) {
    return new Promise((t) => {
      if (this.isClosed)
        return t(e);
      this.once(R.END_EVENT, () => t(e));
    });
  }
  /**
   * Iterates over a readable string stream and yields each line.
   */
  static async *readLines(e) {
    let t = "";
    for (; ; ) {
      const n = await e.read();
      if (n.isError()) {
        yield U.error(n.error);
        return;
      }
      const s = n.value;
      if (s === null) {
        t.length && (yield U.ok(t));
        return;
      }
      t += s;
      const i = t.split(`
`), o = i.pop();
      t = o !== void 0 ? o : "";
      for (let l = 0; l < i.length; l++)
        yield U.ok(i[l]);
    }
  }
}
const ft = "user", mt = "prozilla-os", ha = 50, Wt = `${_.fg.cyan + _.decoration.dim}$APP_NAME - Made by Prozilla${_.reset}
${_.decoration.dim}Type 'help' for a list of commands.${_.reset}
`, pa = `
           *                 
         ****                
    **** *****               
    **: @@@@@@       @@@@@@@ 
  ** @@@@@@@@@@@@  @@@@@@@@@%
:**+@@@@@    +@@@@ @@@@   :  
  : @@@*       @@@ %@@@@@@@  
 ** @@@@       @@@   *@@@@@@@
:***#@@@@     @@@@  @    @@@@
   **=@@@@@@@@@@% @@@@@@@@@@@
   **- :@@@@@@:    :@@@@@@@: 
                             `, fa = _.fg.cyan, ma = `
           *                 
         ****                
    **** *****               
    **: @@@@@@       @@@@@@@ 
  ** @@@@@@@@@@@@  @@@@@@@@@%
:**+@@@@@    +@@@@ @@@@   :  
  : @@@*       @@@ %@@@@@@@  
 ** @@@@       @@@   *@@@@@@@
:***#@@@@     @@@@  @    @@@@
   **=@@@@@@@@@@% @@@@@@@@@@@
   **- :@@@@@@:    :@@@@@@@: 
                             `, B = {
  success: 0,
  generalError: 1,
  misuseOfBuiltins: 2,
  commandNotExecutable: 126,
  commandNotFound: 127,
  invalidExitArgument: 128,
  interrupted: 130
};
class $ {
  store = {};
  parent = null;
  exportedKeys = /* @__PURE__ */ new Set();
  static USER = "USER";
  static HOSTNAME = "HOSTNAME";
  static WORKING_DIRECTORY = "PWD";
  static PREVIOUS_WORKING_DIRECTORY = "OLDPWD";
  static HOME = "HOME";
  static PROMPT = "PS1";
  static EXIT_CODE = "?";
  static ARGUMENT_COUNT = "#";
  static PROCESS_ID = "$";
  /** Array of variables that should never be exported. */
  static INTERNAL_VARS = [
    $.EXIT_CODE,
    $.ARGUMENT_COUNT,
    $.PROCESS_ID,
    "!",
    "*",
    "@"
  ];
  constructor(e = {}, t = null) {
    this.store = cn({
      [$.EXIT_CODE]: "0",
      [$.PROCESS_ID]: Math.floor(Math.random() * 1e5).toString(),
      ...e
    }), this.parent = t, Object.keys(this.store).forEach((n) => {
      $.INTERNAL_VARS.includes(n) || this.exportedKeys.add(n);
    });
  }
  get(e) {
    return this.store[e] !== void 0 ? this.store[e] : this.parent?.get(e);
  }
  set(e, t, n = !1) {
    this.store[e] = t, n && !$.INTERNAL_VARS.includes(e) && this.exportedKeys.add(e);
  }
  /**
   * Marks an existing variable as exported.
   */
  export(e) {
    $.INTERNAL_VARS.includes(e) || this.exportedKeys.add(e);
  }
  /**
   * Replaces variable placeholders in a string with their corresponding values based on a pre-parsed node.
   * The expandedArgument must be pre-resolved by the interpreter to handle nested expansions.
   */
  expand(e, t = "") {
    const n = e.name, s = e.operator, i = this.get(n), o = i === void 0 || i === "";
    if (!s) return i ?? "";
    switch (s) {
      case "-":
        return o ? t : i;
      case "=":
        return o ? (this.set(n, t), t) : i;
      case "+":
        return o ? "" : t;
      case "?":
        if (o) {
          const l = t || "parameter null or not set";
          throw new Error(`${n}: ${l}`);
        }
        return i;
      default:
        return this.get(n) ?? "";
    }
  }
  /**
   * Parses an assignment string (e.g., KEY=VALUE) and updates the environment.
   * @returns `true` if the string was a valid assignment.
   */
  parseAssignment(e) {
    const t = e.match(/^([a-zA-Z_][a-zA-Z0-9_]*)=(.*)$/);
    if (t) {
      const n = t[1], s = t[2].replace(/^["']|["']$/g, "");
      return this.set(n, s, !0), !0;
    }
    return !1;
  }
  setCommandArguments(e, t) {
    const n = t.join(" ");
    this.set("0", e), this.set("#", t.length.toString()), this.set("*", n), this.set("@", n), t.forEach((s, i) => this.set((i + 1).toString(), s));
  }
  /**
   * Returns only variables that are marked for export.
   */
  get exportedVariables() {
    const e = this.parent?.exportedVariables ?? {}, t = {};
    return this.exportedKeys.forEach((n) => {
      t[n] = this.store[n];
    }), { ...e, ...t };
  }
  /**
   * Returns all variables visible to this scope (including internal).
   */
  get variables() {
    return { ...this.parent?.variables, ...this.store };
  }
  /**
   * Creates a child scope for subshells or command execution.
   */
  fork() {
    return new $({}, this);
  }
}
const ga = [
  "Business",
  "Developer tools",
  "Education",
  "Entertainment",
  "Food & dining",
  "Health & fitness",
  "Kids & family",
  "Lifestyle",
  "Media",
  "Medical",
  "Multimedia design",
  "Music",
  "Navigation & maps",
  "News & weather",
  "Personal finance",
  "Personalization",
  "Photo & video",
  "Productivity",
  "Security",
  "Shopping",
  "Social",
  "Sports",
  "Travel",
  "Utilities & tools"
];
class $e {
  static KEYWORD_IF = "if";
  static KEYWORD_THEN = "then";
  static KEYWORD_ELIF = "elif";
  static KEYWORD_ELSE = "else";
  static KEYWORD_FI = "fi";
  static KEYWORD_WHILE = "while";
  static KEYWORD_FOR = "for";
  static KEYWORD_DO = "do";
  static KEYWORD_DONE = "done";
  static KEYWORD_IN = "in";
  static ARITHMETIC_PREFIX_TOKEN = "((";
  static ARITHMETIC_SUFFIX_TOKEN = "))";
  /**
   * High-level method to transform a raw script string into a structured AST.
   * @param script - The raw shell script string.
   * @returns An array of AST nodes representing the script execution flow.
   */
  static parseScript(e) {
    const t = this.tokenize(e, { splitOnWhitespace: !1, handleComments: !0 });
    return this.parseStatements(t, 0, []).nodes;
  }
  static tokenizeLine(e) {
    return this.tokenize(e, { splitOnWhitespace: !0 });
  }
  /**
   * Splits an input string into tokens.
   * @param input - The raw string to tokenize.
   * @returns An array of trimmed, non-empty token strings.
   */
  static tokenize(e, { splitOnWhitespace: t, handleComments: n = !1 }) {
    const s = [];
    let i = "", o = !1, l = !1, u = !1, c = 0, d = 0, h = 0;
    const p = () => {
      i.trim() && s.push(i.trim()), i = "";
    };
    for (let f = 0; f < e.length; f++) {
      const m = e[f];
      if (u) {
        m === `
` && (u = !1, p());
        continue;
      }
      if (m === "'" && !l && h === 0)
        o = !o;
      else if (m === '"' && !o && h === 0)
        l = !l;
      else if (m === "`" && !o)
        h += h > 0 ? -1 : 1;
      else if (!o && !l && h === 0) {
        if (n && m === "#" && (i.trim() === "" || i.endsWith(" "))) {
          u = !0;
          continue;
        }
        m === "(" && c++, m === ")" && c--, m === "{" && e[f - 1] === "$" && d++, m === "}" && d > 0 && d--;
      }
      const E = !o && !l && h === 0 && c === 0 && d === 0, x = t ? m.trim() === "" : m === `
` || m === ";";
      E && x ? p() : i += m;
    }
    return p(), s;
  }
  /**
   * Iteratively parses lines into AST nodes until an end token is reached or lines run out.
   * @param lines - The array of tokenized lines.
   * @param startIndex - The index to start parsing from.
   * @param endTokens - Tokens that signal the end of a block (e.g., `fi`, `done`).
   * @returns An object containing the parsed nodes and the stopping context.
   */
  static parseStatements(e, t, n) {
    const s = [];
    let i = t;
    for (; i < e.length; ) {
      const o = e[i], l = this.tokenizeLine(o), u = l[0] ?? "";
      if (n.includes(u))
        return { nodes: s, nextIndex: i, endToken: u };
      switch (u) {
        case this.KEYWORD_IF: {
          const c = this.parseIf(e, i);
          s.push(c.node), i = c.nextIndex;
          break;
        }
        case this.KEYWORD_WHILE: {
          const c = this.parseWhile(e, i);
          s.push(c.node), i = c.nextIndex;
          break;
        }
        case this.KEYWORD_FOR: {
          const c = this.parseFor(e, i);
          s.push(c.node), i = c.nextIndex;
          break;
        }
        case this.KEYWORD_THEN:
        case this.KEYWORD_DO: {
          l.length > 1 ? e[i] = o.substring(o.indexOf(l[1])) : i++;
          break;
        }
        case "": {
          i++;
          break;
        }
        default: {
          const c = o.startsWith(this.ARITHMETIC_PREFIX_TOKEN) && o.endsWith(this.ARITHMETIC_SUFFIX_TOKEN), d = /^[a-zA-Z_][a-zA-Z0-9_]*(\+|-|\*|\/|%)?=/.test(o);
          if (c) {
            const h = this.ARITHMETIC_PREFIX_TOKEN.length, p = this.ARITHMETIC_SUFFIX_TOKEN.length;
            s.push(this.parseArithmetic(o.substring(h, o.length - p), !1));
          } else d ? s.push(this.parseAssignment(o)) : s.push(this.parseCommand(o));
          i++;
        }
      }
    }
    return { nodes: s, nextIndex: i };
  }
  /**
   * If `keyword` appears on `lines[index]` and has trailing content, rewrites the line to
   * start at that content and returns the same index (so it gets re-processed). Otherwise
   * advances past the keyword-only line and returns the incremented index.
   */
  static advancePastKeyword(e, t, n) {
    const s = this.tokenizeLine(e[t]), i = s.indexOf(n);
    return i !== -1 && i < s.length - 1 ? (e[t] = e[t].substring(e[t].indexOf(s[i + 1])), t) : t + 1;
  }
  /**
   * Parses `if`/`elif`/`else` blocks into an {@link ShellAST.IfNode}.
   * @param lines - The array of tokenized lines.
   * @param startIndex - The line index where the `if` starts.
   * @returns The generated {@link ShellAST.IfNode} and the index to resume parsing.
   */
  static parseIf(e, t) {
    let n = t;
    const s = e[n].replace(/^if\s+/i, "").split(/;?\s+then(?:\s|$)/i)[0].trim(), i = this.resolveCondition(s);
    n = this.advancePastKeyword(e, n, this.KEYWORD_THEN);
    const o = this.parseStatements(e, n, [this.KEYWORD_ELIF, this.KEYWORD_ELSE, this.KEYWORD_FI]), l = { type: b.ConditionalBlock, condition: i, thenBranch: o.nodes };
    n = o.nextIndex;
    let u = o.endToken;
    const c = [];
    for (; u === this.KEYWORD_ELIF; ) {
      const p = this.parseElifBranch(e, n);
      c.push(p.branch), n = p.nextIndex, u = p.endToken;
    }
    let d = [];
    if (u === this.KEYWORD_ELSE) {
      const p = this.parseElseBranch(e, n);
      d = p.nodes, n = p.nextIndex, u = p.endToken;
    }
    const h = { type: b.If, ifBranch: l, elifBranches: c, elseBranch: d };
    if (u === this.KEYWORD_FI) {
      const { redirections: p } = this.parseRedirections(this.tokenizeLine(e[n]).slice(1));
      p.length && (h.redirections = p), n++;
    }
    return { node: h, nextIndex: n };
  }
  /**
   * Parses an `elif` branch, returning the branch data and the end token that stopped it.
   */
  static parseElifBranch(e, t) {
    let n = t;
    const s = e[n].replace(/^elif\s+/i, "").split(/;?\s+then(?:\s|$)/i)[0].trim(), i = this.resolveCondition(s);
    n = this.advancePastKeyword(e, n, this.KEYWORD_THEN);
    const o = this.parseStatements(e, n, [this.KEYWORD_ELIF, this.KEYWORD_ELSE, this.KEYWORD_FI]);
    return {
      branch: {
        type: b.ConditionalBlock,
        condition: i,
        thenBranch: o.nodes
      },
      nextIndex: o.nextIndex,
      endToken: o.endToken
    };
  }
  /**
   * Parses an `else` branch of an `if` block, returning its body and the end token (`fi`).
   */
  static parseElseBranch(e, t) {
    let n = t;
    const s = this.tokenizeLine(e[n]);
    s.length > 1 ? e[n] = e[n].substring(e[n].indexOf(s[1])) : n++;
    const i = this.parseStatements(e, n, [this.KEYWORD_FI]);
    return { nodes: i.nodes, nextIndex: i.nextIndex, endToken: i.endToken };
  }
  /**
   * Parses a while-loop structure into a {@link ShellAST.WhileNode}.
   * @param lines - The tokenized lines.
   * @param startIndex - The line index where the `while` starts.
   * @returns The generated {@link ShellAST.WhileNode} and next index.
   */
  static parseWhile(e, t) {
    let n = t;
    const s = e[n].replace(/^while\s+/i, "").split(/;?\s+do(?:\s|$)/i)[0].trim(), i = this.resolveCondition(s);
    n = this.advancePastKeyword(e, n, this.KEYWORD_DO);
    const o = this.parseStatements(e, n, [this.KEYWORD_DONE]);
    n = o.nextIndex;
    const l = { type: b.While, condition: i, body: o.nodes };
    if (o.endToken === this.KEYWORD_DONE) {
      const { redirections: u } = this.parseRedirections(this.tokenizeLine(e[n]).slice(1));
      u.length && (l.redirections = u), n++;
    }
    return { node: l, nextIndex: n };
  }
  /**
   * Parses a for-loop structure into a {@link ShellAST.ForNode}, extracting the iterator variable and items.
   * @param lines - The tokenized lines.
   * @param startIndex - The line index where the `for` starts.
   * @returns The generated {@link ShellAST.ForNode} and next index.
   */
  static parseFor(e, t) {
    const n = e[t];
    return /for\s*\(\(/.test(n) ? this.parseForExpression(e, t) : this.parseForIn(e, t);
  }
  /**
   * Converts an array of lines into a {@link ShellAST.ForExpressionNode}.
   */
  static parseForExpression(e, t) {
    let n = t;
    const s = e[n], i = s.match(/for\s*\(\(\s*(.*?)\s*\)\)/);
    if (!i)
      throw new Error(`Invalid arithmetic for loop syntax at: ${s}`);
    const o = i[1].split(";").map((p) => p.trim()).filter(Boolean), l = this.parseArithmetic(o[0] || "0", !0), u = this.parseArithmetic(o[1] || "1", !0), c = this.parseArithmetic(o[2] || "0", !0);
    n = this.advancePastKeyword(e, n, this.KEYWORD_DO);
    const d = this.parseStatements(e, n, [this.KEYWORD_DONE]);
    n = d.nextIndex;
    const h = {
      type: b.ForExpression,
      setup: l,
      condition: u,
      step: c,
      body: d.nodes
    };
    if (d.endToken === this.KEYWORD_DONE) {
      const { redirections: p } = this.parseRedirections(this.tokenizeLine(e[n]).slice(1));
      p.length && (h.redirections = p), n++;
    }
    return { node: h, nextIndex: n };
  }
  /**
   * Converts an array of lines into a {@link ShellAST.ForInNode}.
   */
  static parseForIn(e, t) {
    let n = t;
    const s = this.tokenizeLine(e[n]), i = s[1], o = s.indexOf(this.KEYWORD_IN), l = s.indexOf(this.KEYWORD_DO), u = l !== -1 ? l : s.length, c = o !== -1 ? s.slice(o + 1, u).map((p) => this.parseArgument(p.replace(/;$/, ""))) : [];
    n = this.advancePastKeyword(e, n, this.KEYWORD_DO);
    const d = this.parseStatements(e, n, [this.KEYWORD_DONE]);
    n = d.nextIndex;
    const h = {
      type: b.ForIn,
      variableName: i,
      items: c,
      body: d.nodes
    };
    if (d.endToken === this.KEYWORD_DONE) {
      const { redirections: p } = this.parseRedirections(this.tokenizeLine(e[n]).slice(1));
      p.length && (h.redirections = p), n++;
    }
    return { node: h, nextIndex: n };
  }
  /**
   * Extracts redirection nodes from a sequence of tokens, returning the remaining 
   * arguments and the extracted redirections.
   */
  static parseRedirections(e) {
    const t = [], n = [];
    for (let s = 0; s < e.length; s++) {
      const i = e[s], o = i.match(/^(\d+)?(>>|>|<|>&|<&)$/);
      if (o) {
        const l = o[1] ? parseInt(o[1]) : o[2].includes("<") ? 0 : 1, u = o[2], c = e[++s];
        c && n.push({
          type: b.Redirection,
          fileDescriptor: l,
          operator: u,
          target: this.parseArgument(c)
        });
      } else
        t.push(i);
    }
    return { args: t, redirections: n };
  }
  /**
   * Converts a line into an {@link ShellAST.AssignmentNode}.
   */
  static parseAssignment(e) {
    const t = e.indexOf("=");
    let n = e.substring(0, t).trim();
    const s = e.substring(t + 1).trim(), i = n.match(/(\+|-|\*|\/|%)$/);
    if (i) {
      const o = i[0];
      return n = n.slice(0, -1).trim(), o === "+" ? {
        type: b.Assignment,
        name: n,
        value: this.parseArgument(`\${${n}}${s}`)
      } : {
        type: b.Assignment,
        name: n,
        value: this.parseArgument(`$((\${${n}}${o}${s}))`)
      };
    }
    return {
      type: b.Assignment,
      name: n,
      value: this.parseArgument(s)
    };
  }
  /**
   * Converts an expression string into an {@link ShellAST.ArithmeticNode}.
   */
  static parseArithmetic(e, t) {
    return {
      type: b.Arithmetic,
      expression: e.trim(),
      isCondition: t
    };
  }
  /**
   * Converts a condition string into an {@link ShellAST.ExecutableNode}.
   */
  static resolveCondition(e) {
    const t = e.trim();
    if (t.startsWith(this.ARITHMETIC_PREFIX_TOKEN) && t.endsWith(this.ARITHMETIC_SUFFIX_TOKEN)) {
      const n = this.ARITHMETIC_PREFIX_TOKEN.length, s = this.ARITHMETIC_SUFFIX_TOKEN.length, i = t.substring(n, t.length - s).trim();
      return this.parseArithmetic(i || "0", !0);
    }
    return this.parseCommand(e);
  }
  static splitByOperators(e, t) {
    let n = !1, s = !1, i = 0;
    for (let o = e.length - 1; o >= 0; o--) {
      const l = e[o];
      if (l === "'" && !s)
        n = !n;
      else if (l === '"' && !n)
        s = !s;
      else if (!n && !s && ((l === ")" || l === "}") && i++, (l === "(" || l === "{") && i--, i === 0)) {
        for (const u of t)
          if (e.substring(o - u.length + 1, o + 1) === u)
            return {
              left: e.substring(0, o - u.length + 1).trim(),
              operator: u,
              right: e.substring(o + 1).trim()
            };
      }
    }
    return null;
  }
  /**
   * Converts an input string into a {@link ShellAST.ExecutableNode}.
   */
  static parseCommand(e) {
    return this.parseLogical(e);
  }
  /**
   * Converts an input string into a {@link ShellAST.ExecutableNode},
   * that might contain logical operators.
   */
  static parseLogical(e) {
    const t = this.splitByOperators(e, ["&&", "||"]);
    return t ? {
      type: b.Logical,
      left: this.parseLogical(t.left),
      operator: t.operator,
      right: this.parseLogical(t.right)
    } : this.parsePipeline(e);
  }
  /**
   * Converts an input string into a {@link ShellAST.ExecutableNode},
   * that might contain pipes.
   */
  static parsePipeline(e) {
    const t = this.splitByOperators(e, ["|"]);
    if (t) {
      const n = this.parsePipeline(t.left), s = this.parseSimpleCommand(t.right), i = n.type === b.Pipeline ? [...n.commands, s] : [n, s];
      return { type: b.Pipeline, commands: i };
    }
    return this.parseSimpleCommand(e);
  }
  /**
   * Converts an input string into a {@link ShellAST.CommandNode}.
   */
  static parseSimpleCommand(e) {
    const t = this.tokenizeLine(e), { args: n, redirections: s } = this.parseRedirections(t), i = {
      type: b.Command,
      args: n.map((o) => this.parseArgument(o))
    };
    return s.length && (i.redirections = s), i;
  }
  /**
   * Converts an input string into a {@link ShellAST.ParameterExpansionNode}.
   */
  static parseParameterExpansion(e, t) {
    if (e[t + 1] === "{") {
      const i = e.indexOf("}", t);
      if (i !== -1) {
        const o = e.substring(t + 2, i), l = /^([^:-=?+]+)(?::([-=?+])(.*))?$/, u = o.match(l);
        if (u) {
          const d = u[1], h = u[2], p = u[3] ?? "";
          return { node: {
            type: b.ParameterExpansion,
            name: d,
            operator: h,
            argument: h ? this.parseArgument(p) : void 0
          }, nextIndex: i + 1 };
        }
        return { node: {
          type: b.ParameterExpansion,
          name: o
        }, nextIndex: i + 1 };
      }
    } else {
      let i = t + 1;
      const o = e[i];
      if (/[0-9?#$!*@-]/.test(o))
        i++;
      else
        for (; i < e.length && /[a-zA-Z0-9_]/.test(e[i]); )
          i++;
      return { node: {
        type: b.ParameterExpansion,
        name: e.substring(t + 1, i)
      }, nextIndex: i };
    }
    return { node: {
      type: b.ParameterExpansion,
      name: ""
    }, nextIndex: t + 1 };
  }
  /**
   * Converts an input string into an {@link ShellAST.ArithmeticExpansionNode}.
   */
  static parseArithmeticExpansion(e, t) {
    let n = 2;
    const s = 3;
    let i = t + s;
    for (; i < e.length && n > 0; )
      e[i] === "(" && n++, e[i] === ")" && n--, i++;
    const l = e.substring(t + s, i - 2);
    return { node: {
      type: b.ArithmeticExpansion,
      content: this.parseArithmetic(l, !1)
    }, nextIndex: i };
  }
  /**
   * Converts an input string into a {@link ShellAST.CommandSubstitutionNode}.
   */
  static parseCommandSubstitution(e, t) {
    const n = e[t] === "`", s = n ? 1 : 2;
    let i = 1, o = t + s;
    for (; o < e.length && i > 0; )
      n ? e[o] === "`" && i-- : (e[o] === "(" && i++, e[o] === ")" && i--), o++;
    return { node: {
      type: b.CommandSubstitution,
      content: this.parseScript(e.substring(t + s, o - 1))
    }, nextIndex: o };
  }
  /**
   * Converts an input string into an {@link ShellAST.Argument}.
   */
  static parseArgument(e) {
    const t = [];
    let n = 0;
    for (; n < e.length; ) {
      const s = e[n];
      if (s === "$" && n + 1 < e.length) {
        const o = e[n + 1];
        if (o === "(") {
          const { node: l, nextIndex: u } = e[n + 2] === "(" ? this.parseArithmeticExpansion(e, n) : this.parseCommandSubstitution(e, n);
          t.push(l), n = u;
          continue;
        }
        if (o === "{" || /[a-zA-Z_0-9?#$!*@-]/.test(o)) {
          const { node: l, nextIndex: u } = this.parseParameterExpansion(e, n);
          t.push(l), n = u;
          continue;
        }
      } else if (s === "`") {
        const { node: o, nextIndex: l } = this.parseCommandSubstitution(e, n);
        t.push(o), n = l;
        continue;
      }
      let i = e.indexOf("$", n + 1);
      i === -1 && (i = e.length), t.push(e.substring(n, i)), n = i;
    }
    return t;
  }
  /**
   * Expands braces in a shell argument (e.g., `"file{1..3}.txt"` or `"img.{jpg,png}"`).
   * Supports nested expansion and numeric sequences.
   * @param input - The raw string.
   * @returns An array of strings with all permutations expanded.
   */
  static expandBraces(e) {
    if (e.startsWith("'") || e.startsWith('"'))
      return [e];
    const t = e.match(/\{([^{}]+)\}/);
    if (!t)
      return [e];
    const [n, s] = t, i = e.slice(0, t.index), o = e.slice((t.index ?? 0) + n.length), l = s.match(/^(\d+)\.\.(\d+)$/);
    if (l) {
      const u = parseInt(l[1]), c = parseInt(l[2]), d = u <= c ? 1 : -1, h = [];
      for (let p = u; p !== c + d; p += d)
        h.push(...this.expandBraces(`${i}${p}${o}`));
      return h;
    }
    return s.includes(",") ? s.split(",").flatMap((u) => this.expandBraces(`${i}${u}${o}`)) : [e];
  }
  /**
   * Parses flags and options out of a mutable args array, returning the collected options and
   * input values. Flag args are removed from `commandArgs` in place as a side-effect.
   * @param command - The command used to validate and look up option definitions.
   * @param commandArgs - The mutable argument list to parse from. Modified in place.
   * @returns An object containing the parsed option keys and any input values keyed by the option's short name.
   */
  static parseOptions(e, t) {
    const n = [], s = {};
    for (const i of t.filter((o) => o.startsWith("-") && !o.startsWith('"'))) {
      const o = i.startsWith("--"), l = o ? [i.slice(2).toLowerCase()] : i.slice(1).split(""), u = [];
      let c = !1;
      for (const h of l) {
        const p = e.getOption(h);
        if (!p) {
          u.push(h);
          continue;
        }
        c = !0;
        const f = p.short;
        if (n.includes(f) || n.push(f), p.isInput) {
          const m = t.indexOf(i), E = t[m + 1];
          s[p.short] = E, _e(E, t);
        }
      }
      if (!c)
        continue;
      const d = t.indexOf(i);
      u.length ? t[d] = (o ? "--" : "-") + u.join("") : _e(i, t);
    }
    return { options: n, inputs: s };
  }
}
const Ps = /* @__PURE__ */ new Set(["**=", "<<=", ">>="]), Ls = /* @__PURE__ */ new Set([
  "**",
  "++",
  "--",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "&=",
  "|=",
  "^=",
  "==",
  "!=",
  "<=",
  ">=",
  "<<",
  ">>",
  "&&",
  "||"
]);
function Bs(r) {
  const e = [];
  let t = 0;
  for (; t < r.length; ) {
    if (/\s/.test(r[t])) {
      t++;
      continue;
    }
    if (/[0-9]/.test(r[t])) {
      let i = "";
      for (; t < r.length && /[0-9]/.test(r[t]); )
        i += r[t++];
      e.push({ type: "number", value: parseInt(i, 10) });
      continue;
    }
    if (/[a-zA-Z_]/.test(r[t])) {
      let i = "";
      for (; t < r.length && /[a-zA-Z0-9_]/.test(r[t]); )
        i += r[t++];
      e.push({ type: "ident", value: i });
      continue;
    }
    const n = r.slice(t, t + 3), s = r.slice(t, t + 2);
    Ps.has(n) ? (e.push({ type: "op", value: n }), t += 3) : Ls.has(s) ? (e.push({ type: "op", value: s }), t += 2) : e.push({ type: "op", value: r[t++] });
  }
  return e;
}
const Us = /* @__PURE__ */ new Set([
  "=",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "**=",
  "&=",
  "|=",
  "^=",
  "<<=",
  ">>="
]);
class $s {
  constructor(e) {
    this.env = e;
  }
  env;
  tokens = [];
  position = 0;
  evaluate(e) {
    return this.tokens = Bs(e), this.position = 0, this.parseAssignment();
  }
  peek() {
    return this.tokens[this.position];
  }
  pop() {
    return this.tokens[this.position++];
  }
  match(e) {
    return this.peek()?.value === e ? (this.position++, !0) : !1;
  }
  expect(e, t) {
    const n = this.peek();
    return U.require(
      n,
      (s) => this.match(e),
      () => {
      },
      () => t
    );
  }
  consume() {
    const e = this.pop();
    return U.require(
      e,
      (t) => !!t,
      (t) => t,
      () => "Unexpected end of arithmetic expression"
    );
  }
  readVar(e) {
    return parseInt(this.env.get(e) ?? "0", 10);
  }
  writeVar(e, t) {
    return this.env.set(e, t.toString()), t;
  }
  parseAssignment() {
    const e = this.position, t = this.peek();
    if (t?.type === "ident") {
      const n = t.value;
      this.position++;
      const i = this.peek()?.value.toString() ?? "";
      if (Us.has(i)) {
        this.position++;
        const o = this.readVar(n);
        return this.parseAssignment().map(
          (l) => this.writeVar(n, this.applyAssign(i, o, l))
        );
      }
      this.position--;
    }
    return this.position = e, this.parseTernary();
  }
  applyAssign(e, t, n) {
    switch (e) {
      case "=":
        return n;
      case "+=":
        return t + n;
      case "-=":
        return t - n;
      case "*=":
        return t * n;
      case "/=":
        return Math.trunc(t / n);
      case "%=":
        return t % n;
      case "**=":
        return t ** n;
      case "&=":
        return t & n;
      case "|=":
        return t | n;
      case "^=":
        return t ^ n;
      case "<<=":
        return t << n;
      case ">>=":
        return t >> n;
      default:
        return n;
    }
  }
  parseTernary() {
    return this.parseOr().next((e) => this.match("?") ? this.parseAssignment().next(
      (t) => this.expect(":", "Expected ':' in ternary expression").next(() => this.parseAssignment()).map((n) => e ? t : n)
    ) : U.ok(e));
  }
  whileMatch(e, t, n) {
    return e().next((s) => U.repeat(
      s,
      () => {
        const i = this.peek();
        return !!(i && t.includes(i.value.toString()));
      },
      (i) => {
        const o = this.pop()?.value.toString() ?? "";
        return e().map((l) => n(i, o, l));
      }
    ));
  }
  parseOr() {
    return this.whileMatch(() => this.parseAnd(), ["||"], (e, t, n) => e || n ? 1 : 0);
  }
  parseAnd() {
    return this.whileMatch(() => this.parseBitOr(), ["&&"], (e, t, n) => e && n ? 1 : 0);
  }
  parseBitOr() {
    return this.whileMatch(() => this.parseBitXor(), ["|"], (e, t, n) => e | n);
  }
  parseBitXor() {
    return this.whileMatch(() => this.parseBitAnd(), ["^"], (e, t, n) => e ^ n);
  }
  parseBitAnd() {
    return this.whileMatch(() => this.parseEquality(), ["&"], (e, t, n) => e & n);
  }
  parseEquality() {
    return this.whileMatch(
      () => this.parseCompare(),
      ["==", "!="],
      (e, t, n) => t === "==" ? +(e === n) : +(e !== n)
    );
  }
  parseCompare() {
    const e = ["<", ">", "<=", ">="];
    return this.whileMatch(() => this.parseShift(), e, (t, n, s) => {
      switch (n) {
        case "<":
          return t < s ? 1 : 0;
        case ">":
          return t > s ? 1 : 0;
        case "<=":
          return t <= s ? 1 : 0;
        default:
          return t >= s ? 1 : 0;
      }
    });
  }
  parseShift() {
    return this.whileMatch(
      () => this.parseAdd(),
      ["<<", ">>"],
      (e, t, n) => t === "<<" ? e << n : e >> n
    );
  }
  parseAdd() {
    return this.whileMatch(
      () => this.parseMultiplication(),
      ["+", "-"],
      (e, t, n) => t === "+" ? e + n : e - n
    );
  }
  parseMultiplication() {
    const e = ["*", "/", "%"];
    return this.whileMatch(() => this.parseExponent(), e, (t, n, s) => {
      switch (n) {
        case "*":
          return t * s;
        case "/":
          return Math.trunc(t / s);
        default:
          return t % s;
      }
    });
  }
  parseExponent() {
    return this.parseUnary().next((e) => this.match("**") ? this.parseExponent().map((t) => e ** t) : U.ok(e));
  }
  parseUnary() {
    const e = this.peek()?.value;
    switch (e) {
      case "++":
      case "--": {
        this.pop();
        const t = this.peek();
        if (t?.type === "ident") {
          this.pop();
          const n = this.readVar(t.value), s = e === "++" ? n + 1 : n - 1;
          return U.ok(this.writeVar(t.value, s));
        }
        return U.error(`Expected identifier after prefix ${e}`);
      }
      case "+":
        return this.pop(), this.parseUnary().map((t) => +t);
      case "-":
        return this.pop(), this.parseUnary().map((t) => -t);
      case "!":
        return this.pop(), this.parseUnary().map((t) => t ? 0 : 1);
      case "~":
        return this.pop(), this.parseUnary().map((t) => ~t);
      default:
        return this.parsePrimary();
    }
  }
  parsePrimary() {
    return this.consume().next((e) => {
      if (e.type === "number")
        return U.ok(e.value);
      if (e.type === "ident") {
        const t = e.value, n = this.peek()?.value;
        if (n === "++" || n === "--") {
          this.pop();
          const s = this.readVar(t), i = n === "++" ? s + 1 : s - 1;
          return this.writeVar(t, i), U.ok(s);
        }
        return U.ok(this.readVar(t));
      }
      return e.value === "(" ? this.parseAssignment().next(
        (t) => this.expect(")", "Expected closing ')'").map(() => t)
      ) : U.error(`Unexpected token: '${e.value}'`);
    });
  }
}
class Ct {
  shell;
  pipeline = [];
  static PROMPT_ESCAPES = {
    u: (e) => e.get($.USER) ?? ft,
    h: (e) => e.get($.HOSTNAME) ?? mt,
    w: (e) => {
      const t = e.get($.WORKING_DIRECTORY) ?? "/", n = e.get($.HOME) ?? "~";
      return t.startsWith(n) ? t.replace(n, "~") : t;
    },
    W: (e) => (e.get($.WORKING_DIRECTORY) ?? "/").split("/").pop() || "/",
    $: (e) => e.get($.USER) === "root" ? "#" : "$",
    n: () => `
`
  };
  constructor(e) {
    this.shell = e;
  }
  /**
   * Sends a termination signal to all processes currently in the pipeline.
   * @param signal - The signal to send.
   */
  terminatePipeline(e) {
    this.pipeline.length && (this.pipeline.forEach((t) => t.stdin.signal(e)), this.pipeline = []);
  }
  /**
   * Parses and executes a shell script.
   * @param input - The script content or a virtual file.
   * @param io - Optional output streams to override default TTY behavior.
   * @returns The exit code of the last command executed in the script.
   */
  async execute(e, t) {
    if (e instanceof Z) {
      const i = await e.read();
      if (!i)
        return B.commandNotExecutable;
      e = i;
    }
    const n = $e.parseScript(e), s = t?.env ?? this.shell.env;
    return await this.executeBlock(n, { ...t, env: s });
  }
  /**
   * Executes a block of nodes, passing along stream overrides.
   */
  async executeBlock(e, t) {
    let n = B.success;
    for (const s of e)
      if (n = await this.executeNode(s, t), n === B.interrupted)
        break;
    return n;
  }
  /**
   * Dispatches an AST node to its specific execution logic.
   */
  async executeNode(e, t) {
    let n = B.success;
    const s = t?.env ?? this.shell.env;
    switch (e.type) {
      case b.Command:
        n = await this.executeCommands([e], t);
        break;
      case b.Pipeline:
        n = await this.executeCommands(e.commands, t);
        break;
      case b.Logical:
        n = await this.executeLogicalNode(e, t);
        break;
      case b.Assignment:
        n = await this.executeAssignmentNode(e, s);
        break;
      case b.Arithmetic:
        n = this.evaluateArithmetic(e, s);
        break;
      case b.If:
        n = await this.executeIfNode(e, t);
        break;
      case b.While:
        n = await this.executeWhileNode(e, t);
        break;
      case b.ForIn:
        n = await this.executeForInNode(e, s, t);
        break;
      case b.ForExpression:
        n = await this.executeForExpressionNode(e, s, t);
        break;
      default:
        throw new Error("Unknown node: " + JSON.stringify(e));
    }
    return s.set($.EXIT_CODE, n.toString()), n;
  }
  async executeLogicalNode(e, t) {
    let n = await this.executeNode(e.left, t);
    const s = e.operator === "&&" && n === B.success, i = e.operator === "||" && n !== B.success;
    return (s || i) && (n = await this.executeNode(e.right, t)), n;
  }
  async executeAssignmentNode(e, t) {
    const n = await this.evaluateArgument(e.value, t);
    return t.set(e.name, n), B.success;
  }
  async executeIfNode(e, t) {
    if (await this.executeNode(e.ifBranch.condition, t) === B.success)
      return await this.executeBlock(e.ifBranch.thenBranch, t);
    for (const s of e.elifBranches)
      if (await this.executeNode(s.condition, t) === B.success)
        return await this.executeBlock(s.thenBranch, t);
    return e.elseBranch.length ? await this.executeBlock(e.elseBranch, t) : B.success;
  }
  async executeWhileNode(e, t) {
    let n = B.success;
    for (; n !== B.interrupted && (n = await this.executeNode(e.condition, t)) === B.success; )
      n = await this.executeBlock(e.body, t);
    return n;
  }
  async executeForInNode(e, t, n) {
    let s = B.success;
    const i = [];
    for (const o of e.items) {
      const l = await this.evaluateArgument(o, t);
      i.push(...$e.expandBraces(l));
    }
    for (const o of i)
      if (t.set(e.variableName, o), s = await this.executeBlock(e.body, n), s === B.interrupted)
        break;
    return s;
  }
  async executeForExpressionNode(e, t, n) {
    let s = this.evaluateArithmetic(e.setup, t);
    for (; this.evaluateArithmetic(e.condition, t) === B.success && (s = await this.executeBlock(e.body, n), s !== B.interrupted); )
      s = this.evaluateArithmetic(e.step, t);
    return s;
  }
  /**
   * Handles the piping logic for any list of executable nodes.
   */
  async executeCommands(e, t) {
    if (!e.length)
      return B.success;
    const n = this.pipeline, s = this.shell.state.stream, i = t?.env ?? this.shell.env, o = await this.createPipeline(e, i);
    this.pipeline = o, this.linkStreams(o, t);
    const l = o.at(-1);
    l && (this.shell.state.stream = un(l.stdin));
    let u = !1;
    const c = (p) => {
      p === "SIGINT" && (u = !0);
    };
    o.forEach((p) => {
      p.stdin.on(R.SIGNAL_EVENT, c);
    });
    const d = [];
    for (let p = e.length - 1; p >= 0; p--) {
      const f = e[p], m = o[p];
      f.type === b.Command ? d.unshift(this.spawn(m, f.redirections)) : d.unshift(this.executeNode(f, {
        stdin: m.stdin,
        stdout: m.stdout,
        stderr: m.stderr,
        env: m.env
      }));
    }
    const h = await Promise.all(d);
    return this.pipeline = n, this.shell.state.stream = s, u ? B.interrupted : h.at(-1) ?? B.success;
  }
  async createPipeline(e, t) {
    const n = [];
    for (const s of e) {
      const i = { stdin: new R(), stdout: new R(), stderr: new R(), commandName: "", args: [], env: t };
      if (s.type === b.Command) {
        for (const o of s.args)
          i.args.push(await this.evaluateArgument(o, t));
        i.commandName = i.args[0] ?? "", i.commandName === j.SUDO_COMMAND && i.args.length > 1 && (i.commandName = i.args[1]);
      } else
        i.commandName = `<${s.type}>`;
      n.push(i);
    }
    return n;
  }
  linkStreams(e, t) {
    e.forEach((n, s) => {
      const i = e[s + 1];
      s === 0 && t?.stdin && t.stdin.pipe(n.stdin), i ? n.stdout.pipe(i.stdin) : t?.stdout ? n.stdout.pipe(t.stdout, !1) : n.stdout.on(R.DATA_EVENT, (o) => this.shell.write(o)), t?.stderr ? n.stderr.pipe(t.stderr, !1) : n.stderr.on(R.DATA_EVENT, (o) => this.shell.write(o));
    });
  }
  async evaluateArgument(e, t) {
    let n = "";
    for (const s of e) {
      if (typeof s == "string") {
        n += s;
        continue;
      }
      switch (s.type) {
        case b.ParameterExpansion: {
          const i = s.argument ? await this.evaluateArgument(s.argument, t) : "";
          n += t.expand(s, i);
          break;
        }
        case b.ArithmeticExpansion:
          n += this.evaluateArithmetic(s.content, t).toString();
          break;
        case b.CommandSubstitution:
          n += await this.captureCommandOutput(s.content, t);
          break;
      }
    }
    return this.removeQuotes(n);
  }
  async captureCommandOutput(e, t) {
    const n = new R();
    let s = "";
    return n.on(R.DATA_EVENT, (i) => {
      s += i;
    }), await this.executeBlock(e, { stdout: n, env: t }), n.end(), s.trim();
  }
  removeQuotes(e) {
    let t = "", n = !1, s = !1;
    for (const i of e)
      i === "'" && !s ? n = !n : i === '"' && !n ? s = !s : t += i;
    return t;
  }
  /**
   * Evaluates an arithmetic expression using an {@link ArithmeticParser} and returns an exit code.
   * @param node - The arithmetic operation.
   * @param env - The {@link ShellEnvironment} used for variable resolution within this instance.
   * @returns `EXIT_CODE.success` if the {@link ArithmeticParserResult} is successful and non-zero, 
   * or `EXIT_CODE.generalError` otherwise.
   */
  evaluateArithmetic(e, t) {
    return U.ok(e.expression.trim()).filter((n) => n.length !== 0, () => "Empty expression").next((n) => new $s(t).evaluate(n)).match((n) => e.isCondition ? n !== 0 ? B.success : B.generalError : n, (n) => (console.error(n), B.generalError));
  }
  async executeRedirections(e, t) {
    const n = { 0: t.stdin, 1: t.stdout, 2: t.stderr };
    for (const s of e) {
      const i = await this.evaluateArgument(s.target, t.env), o = s.fileDescriptor;
      if (s.operator === ">&" || s.operator === "<&") {
        const c = parseInt(i), d = n[o], h = n[c];
        d && h && h.pipe(d);
        continue;
      }
      const l = s.operator === ">" || s.operator === ">>", u = this.shell.state.workingDirectory.navigate(i, l);
      if (!(!u || !u.isFile())) {
        if (s.operator === "<" && o === 0)
          t.stdin = new zs(u);
        else if (l) {
          const c = new Vs(u);
          if (s.operator === ">>") {
            const d = await u.read();
            d != null && await c.write(d);
          }
          o === 1 ? t.stdout = c : o === 2 ? t.stderr = c : n[o] && (n[o] = c);
        }
      }
    }
  }
  /**
   * Resolves a command, parses flags/options, and executes the command logic.
   * @returns The resulting exit code from the command execution.
   */
  async spawn(e, t = []) {
    const { stdin: n, stdout: s, stderr: i, commandName: o, args: l, env: u } = e, c = { stdin: n, stdout: s, stderr: i, env: u }, d = Date.now();
    try {
      if (!l.length)
        return B.generalError;
      const h = await yt.resolve(o, u, this.shell.state.workingDirectory);
      if (h.isError())
        return j.writeError(i, o, h.error, B.commandNotFound);
      const p = l.slice(1);
      if (c.env = u.fork(), c.env.setCommandArguments(o, p), await this.executeRedirections(t, c), h.value instanceof Z)
        return await this.execute(h.value, c);
      const f = h.value, { options: m, inputs: E } = $e.parseOptions(f, p), x = this.pipeline.indexOf(e) > 0;
      return f.requireArgs && !p.length && !x ? j.writeError(i, o, [j.USAGE_ERROR, `${o} ${j.MISSING_ARGS_ERROR}`]) : f.requireOptions && !m.length ? j.writeError(i, o, [j.USAGE_ERROR, `${o} ${j.MISSING_OPTIONS_ERROR}`]) : await f.execute(p, {
        stdin: c.stdin,
        stdout: c.stdout,
        stderr: c.stderr,
        shell: this.shell,
        workingDirectory: this.shell.state.workingDirectory,
        username: c.env.get("USER") ?? ft,
        hostname: c.env.get("HOSTNAME") ?? mt,
        rawLine: p.join(" "),
        options: m,
        exit: () => this.shell.kill(),
        inputs: E,
        timestamp: d,
        virtualRoot: this.shell.config.virtualRoot,
        settingsManager: this.shell.config.settingsManager,
        systemManager: this.shell.config.systemManager,
        app: this.shell.config.app,
        size: this.shell.config.sizeRef.current,
        env: c.env
      }) ?? B.success;
    } catch (h) {
      return console.error(h), j.writeError(i, o);
    } finally {
      s.end(), i.end(), c.stdout !== s && c.stdout.end(), c.stderr !== i && c.stderr.end();
    }
  }
  /**
   * Evaluates a prompt string by resolving escape sequences and shell expansions.
   */
  async evaluatePrompt(e, t = this.shell.env) {
    const n = e.replace(/\\([uhwW$n])/g, (s, i) => {
      const o = Ct.PROMPT_ESCAPES[i];
      return o ? o(t) : s;
    });
    try {
      const s = $e.parseArgument(n);
      return await this.evaluateArgument(s, this.shell.env);
    } catch {
      return n;
    }
  }
}
var Ws = /* @__PURE__ */ ((r) => (r[r.None = 0] = "None", r[r.Command = 1] = "Command", r[r.Clear = 2] = "Clear", r))(Ws || {});
class j {
  /** The reactive state of this shell. */
  state;
  /** The configuration used to initialize this shell. */
  config;
  /** The environment variable manager for this shell. */
  env;
  /** The logic handler for parsing and executing command strings. */
  interpreter;
  static MISSING_ARGS_ERROR = "requires at least 1 argument";
  static MISSING_OPTIONS_ERROR = "requires at least 1 option";
  static COMMAND_FAILED_ERROR = "Command failed";
  static USAGE_ERROR = "Incorrect usage";
  static INVALID_PATH_ERROR = "No such file or directory";
  static SUDO_COMMAND = "sudo";
  /** Regex used to strip specific ANSI escape codes from the TTY buffer. */
  static STRIP_ANSI_REGEX = new RegExp(
    [_.screen.enterAltBuffer, _.screen.exitAltBuffer, _.screen.clear, _.screen.home].map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "g"
  );
  // eslint-disable-next-line no-control-regex
  static CURSOR_REGEX = /\x1b\[(\d+);(\d+)H/g;
  static KEY_TO_ANSI = {
    Enter: _.input.lineFeed,
    Tab: _.input.horizontalTab,
    Backspace: _.input.backspace,
    Delete: _.input.delete,
    ArrowUp: _.input.arrowUp,
    ArrowDown: _.input.arrowDown,
    ArrowRight: _.input.arrowRight,
    ArrowLeft: _.input.arrowLeft,
    Escape: _.input.escape,
    "Control+a": _.input.ctrlA,
    "Control+b": _.input.ctrlB,
    "Control+c": _.input.ctrlC,
    "Control+d": _.input.ctrlD,
    "Control+e": _.input.ctrlE,
    "Control+f": _.input.ctrlF,
    "Control+g": _.input.ctrlG,
    "Control+h": _.input.ctrlH,
    "Control+i": _.input.ctrlI,
    "Control+j": _.input.ctrlJ,
    "Control+k": _.input.ctrlK,
    "Control+l": _.input.ctrlL,
    "Control+m": _.input.ctrlM,
    "Control+n": _.input.ctrlN,
    "Control+o": _.input.ctrlO,
    "Control+p": _.input.ctrlP,
    "Control+q": _.input.ctrlQ,
    "Control+r": _.input.ctrlR,
    "Control+s": _.input.ctrlS,
    "Control+t": _.input.ctrlT,
    "Control+u": _.input.ctrlU,
    "Control+v": _.input.ctrlV,
    "Control+w": _.input.ctrlW,
    "Control+x": _.input.ctrlX,
    "Control+y": _.input.ctrlY,
    "Control+z": _.input.ctrlZ
  };
  constructor(e) {
    this.config = e;
    const t = e.virtualRoot.navigateToFolder(e.path ?? "~") ?? e.virtualRoot;
    this.env = new $({
      [$.USER]: ft,
      [$.HOSTNAME]: mt,
      [$.PROMPT]: `${et.cyan("\\u@\\h")}:${et.blue("\\w")}$ `,
      [$.HOME]: e.virtualRoot.navigateToFolder("~")?.absolutePath ?? "~",
      [$.WORKING_DIRECTORY]: t.root ? "/" : t.path,
      [$.PREVIOUS_WORKING_DIRECTORY]: t.root ? "/" : t.path,
      ...e.env
    }), this.state = cn({
      history: [{
        displayText: e.app ? Wt.replace("$APP_NAME", e.app.name) : Wt,
        flags: 0
        /* None */
      }],
      line: e.input ?? "",
      historyOffset: 0,
      workingDirectory: un(t),
      prompt: "",
      stream: null,
      ttyBuffer: null,
      isUsingAltScreen: !1,
      env: this.env.store,
      isRawMode: !1,
      cursorPosition: z.ZERO
    }), this.interpreter = new Ct(this), this.updatePrompt();
  }
  async handleKeyDown(e) {
    const { key: t, ctrlKey: n = !1, metaKey: s = !1, shiftKey: i = !1 } = e, o = n || s;
    if (o && t === "c" && !i) {
      e.preventDefault(), this.interrupt();
      return;
    }
    if (this.state.stream) {
      if (this.state.isRawMode) {
        e.preventDefault();
        const l = o ? `Control+${t.toLowerCase()}` : t, u = j.KEY_TO_ANSI[l] ?? (t.length === 1 ? t : "");
        u && await this.state.stream.write(u);
      }
      return;
    }
    t === "Tab" ? (e.preventDefault(), this.autoComplete()) : t === "Enter" ? await this.run(this.state.line) : t === "ArrowUp" ? (e.preventDefault(), this.historySearch(1)) : t === "ArrowDown" && (e.preventDefault(), this.historySearch(-1));
  }
  /**
   * Toggles raw mode, which forwards all keystrokes directly to the active stream.
   * @param rawMode - Whether to enable raw mode.
   */
  setRawMode(e) {
    this.state.isRawMode = e;
  }
  /**
   * Sends a signal to the shell or the currently active foreground process.
   * @param signal - The signal to send. Defaults to `"SIGTERM"`.
   */
  terminate(e = "SIGTERM") {
    if (e === "SIGKILL") {
      this.config.exit();
      return;
    }
    const t = e === "SIGINT", n = this.state.stream != null;
    if (n) {
      const s = (this.state.ttyBuffer ?? "") + (t ? "^C" : "");
      s && !this.state.isUsingAltScreen && this.pushHistory({
        displayText: s,
        flags: 0
        /* None */
      }), this.state.stream?.signal(e), this.state.stream?.end(), this.state.stream = null, this.state.ttyBuffer = null, this.state.isUsingAltScreen = !1, this.state.isRawMode = !1;
    }
    this.interpreter.terminatePipeline(e), t && !n && (this.pushHistory({
      displayText: this.state.prompt + this.state.line + "^C",
      flags: 1,
      input: this.state.line
    }), this.clearLine());
  }
  /**
   * Convenience method to send the `SIGINT` (Interrupt) signal.
   * @see {@link Shell.terminate}
   */
  interrupt() {
    this.terminate("SIGINT");
  }
  /**
   * Convenience method to send the `SIGKILL` (Kill) signal, closing the shell.
   * @see {@link Shell.terminate}
   */
  kill() {
    this.terminate("SIGKILL");
  }
  /**
   * Refreshes the prompt string based on the current user, hostname, and working directory.
   */
  async updatePrompt() {
    const e = this.env.get($.PROMPT) ?? "\\u@\\h:\\w$ ";
    this.state.prompt = await this.interpreter.evaluatePrompt(e, this.env);
  }
  /**
   * Updates the text in the current input line.
   * @param value - The new string value or a function that receives the previous value.
   */
  setLine(e) {
    this.state.line = typeof e == "function" ? e(this.state.line) : e;
  }
  /**
   * Appends a new entry to the terminal history.
   * @param entry - The history entry to add.
   */
  pushHistory(e) {
    this.state.history.push(e);
  }
  /**
   * Writes raw text to the shell, handling ANSI escape codes for screen clearing and alt buffers.
   * @param text - The string data to write to the TTY.
   */
  write(e) {
    e.includes(_.screen.enterAltBuffer) && (this.state.isUsingAltScreen = !0, this.state.ttyBuffer = null), (e.includes(_.screen.clear) || e.includes(_.screen.home)) && (this.state.isUsingAltScreen || this.pushHistory({
      flags: 2
      /* Clear */
    }), this.state.ttyBuffer = null), e.includes(_.screen.exitAltBuffer) && (this.state.isUsingAltScreen = !1, this.state.ttyBuffer = null);
    let t;
    for (; (t = j.CURSOR_REGEX.exec(e)) !== null; ) {
      const s = parseInt(t[1]) - 1, i = parseInt(t[2]) - 1;
      this.state.cursorPosition = new z(i, s);
    }
    const n = e.replace(j.STRIP_ANSI_REGEX, "").replace(j.CURSOR_REGEX, "");
    if (n.length && (this.state.ttyBuffer = (this.state.ttyBuffer ?? "") + n, !this.state.isUsingAltScreen && this.state.ttyBuffer.includes(`
`))) {
      const s = this.state.ttyBuffer.split(`
`), i = s.pop() ?? "";
      for (const o of s)
        this.pushHistory({
          displayText: o,
          flags: 0
          /* None */
        });
      this.state.ttyBuffer = i;
    }
  }
  /**
   * Submits the current input line and executes the given command string.
   * @param input - The command string to execute.
   * @returns A promise that resolves with the final exit code of the execution.
   */
  async run(e) {
    const t = this.state.ttyBuffer ?? "";
    this.state.ttyBuffer = null, this.clearLine(), this.pushHistory({
      displayText: t + this.state.prompt + e,
      flags: 1,
      input: e
    });
    const n = await this.interpreter.execute(e);
    return await this.updatePrompt(), n;
  }
  /**
   * Clears the current input line and resets the history search offset.
   */
  clearLine() {
    this.state.line = "", this.state.historyOffset = 0;
  }
  /**
   * Navigates through command history.
   * @param direction - Positive to go back in time, negative to go forward.
   */
  historySearch(e) {
    const t = this.state.history.filter(({ flags: s }) => (s & 1) !== 0), n = wt(this.state.historyOffset + e, 0, t.length);
    if (n === this.state.historyOffset) {
      e < 0 && (this.state.line = "");
      return;
    }
    this.state.line = n === 0 ? "" : t[t.length - n].input ?? "", this.state.historyOffset = n;
  }
  /**
   * Changes the current working directory and updates `PWD`/`OLDPWD` environment variables.
   * @param directory - The virtual folder to switch to.
   */
  setWorkingDirectory(e) {
    const t = e.root ? "/" : e.path, n = this.env.get($.WORKING_DIRECTORY);
    n !== t && (this.env.set($.PREVIOUS_WORKING_DIRECTORY, n ?? t), this.env.set($.WORKING_DIRECTORY, t)), this.state.workingDirectory = e;
  }
  /**
   * Calculates possible completions for the current input based on commands and file paths.
   * @returns An array of string suggestions.
   */
  getCompletions() {
    const e = this.state.line.split(" "), t = e.at(-1) ?? "", n = e.length <= 1;
    let s = [];
    if (n && !t.includes("/") && (s = yt.builtins.filter((i) => i.name.startsWith(t)).map((i) => i.name)), !n || t.includes("/") || t.startsWith(".")) {
      const i = t.split("/"), o = i.pop() ?? "", l = i.join("/") || (t.startsWith("/") ? "/" : "."), u = this.state.workingDirectory.navigateToFolder(l);
      if (u) {
        const d = [...u.getSubFolders(!0), ...u.getFiles(!0)].map((h) => h.id + (h.isFolder() ? "/" : "")).filter((h) => h.startsWith(o));
        s = [...s, ...d];
      }
    }
    return s;
  }
  /**
   * Performs an auto-completion action. If one match is found, it completes the line. 
   * If multiple are found, it lists them in the history.
   */
  autoComplete() {
    const e = this.getCompletions();
    if (!e.length)
      return;
    const t = this.state.line.split(" "), n = t.pop() ?? "", s = Bn(e), i = n.split("/"), o = i.pop() ?? "";
    if (s.length > o.length) {
      i.push(s), t.push(i.join("/")), this.setLine(t.join(" "));
      return;
    }
    e.length === 1 ? (i.push(e[0]), t.push(i.join("/")), this.setLine(t.join(" "))) : (this.pushHistory({
      displayText: this.state.prompt + this.state.line,
      flags: 1,
      input: this.state.line
    }), this.pushHistory({
      displayText: e.join("  "),
      flags: 0
      /* None */
    }));
  }
  /**
   * Sets the shell to raw mode, listens for input on stdin.
   * @param stdin - The standard input stream.
   * @param onData - The callback to handle incoming data chunks.
   */
  async readRawInput(e, t) {
    this.setRawMode(!0);
    const n = (s) => {
      t(s);
    };
    e.on(R.DATA_EVENT, n), await e.wait(), e.off(R.DATA_EVENT, n), this.setRawMode(!1);
  }
  /**
   * Processes a list of paths, falling back to standard input if the list is empty or contains "-".
   * @param params.paths - The list of file paths or "-" for stdin.
   * @param params.workingDirectory - The directory to resolve paths against.
   * @param params.commandName - The name of the command invoking this utility.
   * @param params.onContent - Callback for file content.
   * @param params.onStdinData - Callback for standard input data.
   */
  async readFiles({
    paths: e,
    workingDirectory: t,
    stdin: n,
    stderr: s,
    commandName: i,
    onContent: o,
    onStdinData: l
  }) {
    let u = B.success;
    if (!e.length)
      return await this.readRawInput(n, l), u;
    for (const c of e) {
      if (c === "-") {
        await this.readRawInput(n, l);
        continue;
      }
      const d = t.navigate(c);
      if (!d) {
        u = await j.writeError(s, i, `${c}: ${j.INVALID_PATH_ERROR}`);
        continue;
      }
      if (d.isFolder()) {
        u = await j.writeError(s, i, `${c}: Is a directory`);
        continue;
      }
      const h = await d.read();
      h != null && await o(h);
    }
    return u;
  }
  /**
   * Utility to write a formatted error message to a stream and return an exit code.
   * @param stream - The stream to receive the error output.
   * @param commandName - The name of the command reporting the error.
   * @param error - A single string or array of strings representing the error message.
   * @param exitCode - The numerical exit code to return.
   * @returns `exitCode`.
   */
  static async writeError(e, t, n = j.COMMAND_FAILED_ERROR, s = B.generalError) {
    return await j.printLn(e, et.red(`${t}: ${typeof n == "string" ? n : n.join(": ")}`)), s;
  }
  /**
   * Executes a task repeatedly and writes its output to `stdout`.
   * @returns A promise that resolves when the loop is finished.
   */
  static async loop({ stdout: e, stdin: t, task: n, delay: s = 0, maxIterations: i }) {
    return await j.animate({
      stdout: e,
      stdin: t,
      render: (o) => (i !== void 0 && o >= i && t.end(), n()),
      delay: s,
      clear: !1,
      stopOnBlank: !1,
      useAltBuffer: !1
    });
  }
  /**
   * Executes a frame-based animation in the terminal using the Alternate Screen Buffer.
   * @returns A promise that resolves when the animation is stopped.
   */
  static async animate({ stdout: e, stdin: t, render: n, delay: s, clear: i = !0, stopOnBlank: o = !0, useAltBuffer: l = !0 }) {
    let u = 0;
    l && await e.write(_.screen.enterAltBuffer);
    async function c(h) {
      clearInterval(h), l && await e.write(_.screen.exitAltBuffer), t.end();
    }
    const d = setInterval(() => {
      const h = n(u);
      let p = h;
      i && (p = _.screen.clear + _.screen.home + p), e.write(p).then(() => {
        u++, o && !h.trim().length && u > 1 && c(d);
      });
    }, s);
    return t.on(R.END_EVENT, () => {
      c(d);
    }), await t.wait(B.success);
  }
  /**
   * Reads input data. If `rawLine` is provided, it processes it immediately via the callback.
   * Otherwise, it waits for data from the `stdin` stream.
   * @param rawLine - The pre-provided input string.
   * @param stdin - The input stream to fall back on.
   * @param callback - Function to process the collected input data.
   */
  static async readInput(e, t, n) {
    if (e.length)
      return await n(e);
    let s = "";
    return t.on(R.DATA_EVENT, (i) => {
      s += i;
    }), await t.wait().then(async () => s.length ? await n(s) : B.success);
  }
  /**
   * Utility function that writes `text` followed by a newline (`"\n"`) to `stream`.
   * @param stream - The stream to write to.
   * @param text - The text to write.
   */
  static async printLn(e, t = "") {
    await e.write(t + `
`);
  }
}
class zs extends R {
  file;
  constructor(e) {
    super(), this.file = e, this.init();
  }
  async init() {
    const e = await this.file.read();
    e != null && await this.write(e), this.end();
  }
}
class Vs extends R {
  file;
  writeBuffer = "";
  constructor(e) {
    super(), this.file = e, this.on(R.DATA_EVENT, (t) => {
      this.writeBuffer += t;
    }), this.on(R.END_EVENT, () => {
      this.file.setContent(this.writeBuffer);
    });
  }
}
var b = /* @__PURE__ */ ((r) => (r.Command = "command", r.Logical = "logical", r.Pipeline = "pipeline", r.If = "if", r.ConditionalBlock = "conditionalBlock", r.While = "while", r.ForIn = "forIn", r.ForExpression = "forExpression", r.Assignment = "assignment", r.Arithmetic = "arithmetic", r.ParameterExpansion = "parameterExpansion", r.ArithmeticExpansion = "arithmeticExpansion", r.CommandSubstitution = "commandSubstitution", r.Redirection = "redirection", r))(b || {});
const wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NodeType: b
}, Symbol.toStringTag, { value: "Module" }));
class wn {
  /**
   * The size of this modal.
   * @default new Vector2(400, 200)
   */
  size = new z(400, 200);
  /**
   * The position of this modal.
   * @default new Vector2(300, 300)
   */
  position = new z(300, 300);
  /**
   * The icon of this modal.
   * @default null
   */
  icon = null;
  /**
   * The title of this modal.
   * @default null
   */
  title = null;
  /**
   * The manager that handles all modals.
   */
  modalsManager = null;
  /**
   * The content of this modal.
   * @default null
   */
  element = null;
  props = {};
  callback = null;
  /** The ID of this modal. */
  id = null;
  /**
   * Whether this modal can be dismissed (e.g., by pressing ESC).
   * @default true
   */
  dismissible = !0;
  /** Timestamp of the most recent interaction with this modal. */
  lastInteraction;
  constructor(e, t) {
    this.element = e, this.callback = t, this.focus();
  }
  setIcon(e) {
    return this.icon = e, this;
  }
  setTitle(e) {
    return this.title = e, this;
  }
  setPosition(e) {
    return this.position = e, this;
  }
  setSize(e) {
    return this.size = e, this;
  }
  setProps(e) {
    return this.props = e, this;
  }
  /**
   * @param {boolean} dismissible 
   * @returns {Modal}
   */
  setDismissible(e) {
    return this.dismissible = e, this;
  }
  focus() {
    this.lastInteraction = Date.now();
  }
  finish(...e) {
    this.modalsManager == null || this.id == null || (this.modalsManager.close(this.id), this.callback?.(...e));
  }
  close() {
    this.finish();
  }
}
class Ae {
  /** Maps every modal ID to the corresponding modal. */
  modals = {};
  containerRef;
  /** Function that handles changes to modals. */
  updateModals = () => {
  };
  /**
   * Opens a modal.
   * @param modal - The modal to open.
   * @param single - Set to false to preserve other open modals.
   */
  open(e, t = !0) {
    t && this.modalIds.forEach((s) => {
      this.close(s, !1);
    });
    let n = 0;
    for (; this.modalIds.includes(n.toString()); )
      n++;
    e.id = n, e.modalsManager = this, console.info(`Opening modal ${n}`), this.modals[n] = e, this.updateModals(this.modals);
  }
  /**
   * Closes a modal.
   * @param modalId - The ID of the modal to close.
   */
  close(e, t = !0) {
    if (e = e.toString(), !this.modalIds.includes(e)) {
      console.warn(`Failed to close modal ${e}: modal not found`);
      return;
    }
    console.info(`Closing modal ${e}`), delete this.modals[e], t && this.updateModals(this.modals);
  }
  /**
   * Brings a modal into focus.
   * @param modalId - The ID of the modal to bring into focus.
   */
  focus(e) {
    if (e = e.toString(), !this.modalIds.includes(e)) {
      console.warn(`Failed to focus modal ${e}: modal not found`);
      return;
    }
    this.modals[e].focus(), this.updateModals(this.modals);
  }
  setUpdateModals(e) {
    this.updateModals = e;
  }
  /**
   * Returns the IDs of all open modals.
   */
  get modalIds() {
    return Object.keys(this.modals);
  }
  static getModalIconUrl(e) {
    return `/assets/modals/icons/${e}.svg`;
  }
}
class ge {
  /**
   * @deprecated - Use constants from {@link Settings} instead.
   */
  static VIRTUAL_PATHS = {
    desktop: "~/.config/desktop.xml",
    taskbar: "~/.config/taskbar.xml",
    apps: "~/.config/apps.xml",
    theme: "~/.config/theme.xml",
    virtualDrive: "~/.config/virtual-drive.xml"
  };
  #e = {};
  #t = null;
  constructor(e) {
    this.#t = e;
    const t = this.#t;
    Object.values(ge.VIRTUAL_PATHS).forEach((n) => {
      this.#e[n] = new pe(t, n);
    });
  }
  getSettings(e) {
    return this.#e[e];
  }
}
const zt = "options";
class pe {
  /**
   * The virtual path of the settings file.
   */
  path;
  /**
   * The settings file.
   */
  file;
  xmlDoc;
  #e;
  /**
   * Virtual path to the desktop settings.
   */
  static DESKTOP = ge.VIRTUAL_PATHS.desktop;
  /**
   * Virtual path to the taskbar settings.
   */
  static TASKBAR = ge.VIRTUAL_PATHS.taskbar;
  /**
   * Virtual path to the apps settings.
   */
  static APPS = ge.VIRTUAL_PATHS.apps;
  /**
   * Virtual path to the theme settings.
   */
  static THEME = ge.VIRTUAL_PATHS.theme;
  /**
   * Virtual path to the virtual drive settings.
   */
  static VIRTUAL_DRIVE = ge.VIRTUAL_PATHS.virtualDrive;
  constructor(e, t) {
    if (this.#e = e, this.path = t, this.file = this.#e.navigateToFile(this.path), this.file == null) {
      console.warn(`Unable to read settings from path: ${this.path}
No such file or directory.`);
      return;
    } else if (this.file instanceof Z) {
      if (this.file.extension !== "xml") {
        console.warn(`Unable to read settings from path: ${this.path}
File does not have extension "xml".`);
        return;
      }
    } else {
      console.warn(`Unable to read settings from path: ${this.path}
Path does not point to VirtualFile.`);
      return;
    }
  }
  /**
   * Reads the xml doc from the given path and assigns it to itself.
   */
  async read() {
    if (!this.file)
      return;
    const e = await this.file.read();
    if (!e)
      return;
    const n = new DOMParser().parseFromString(e, "text/xml");
    this.xmlDoc = n;
  }
  write() {
    if (this.file == null || this.xmlDoc == null)
      return;
    const t = new XMLSerializer().serializeToString(this.xmlDoc);
    this.file.setContent(t);
  }
  /**
   * Checks if xml doc is missing.
   */
  async isMissingXmlDoc() {
    return this.xmlDoc == null && await this.read(), this.xmlDoc == null;
  }
  /**
   * Gets a value by a given key if it exists and optionally calls a callback function whenever the value changes.
   * @param key - The key of the setting.
   * @param callback - The callback function to call whenever the value changes.
   */
  async get(e, t) {
    if (await this.isMissingXmlDoc())
      return { value: null };
    let n = this.xmlDoc?.getElementsByTagName(e)[0]?.textContent, s;
    return t && (n != null && t(n), s = this.file?.on(Z.CONTENT_CHANGE_EVENT, () => {
      (async () => {
        await this.read();
        const i = (await this.get(e)).value;
        i != null && i !== n && (t(i), n = i);
      })();
    })), { value: n, listener: s };
  }
  async #t(e, t, n) {
    let s = { value: null };
    return n !== void 0 ? s = await this.get(e, (i) => {
      n(t(i));
    }) : s = await this.get(e), {
      value: s.value ? t(s.value) : null,
      listener: s.listener
    };
  }
  /**
   * Gets a value by a given key as a boolean.
   */
  async getBool(e, t) {
    return await this.#t(e, tn, t);
  }
  /**
   * Gets a value by a given key as an integer.
   */
  async getInt(e, t) {
    return await this.#t(e, parseInt, t);
  }
  /**
   * Sets the value associated with a given key.
   * @param key - The key of the setting.
   * @param value - The new value.
   */
  async set(e, t) {
    if (!(await this.isMissingXmlDoc() || this.xmlDoc == null)) {
      if (this.xmlDoc.getElementsByTagName(e).length > 0)
        this.xmlDoc.getElementsByTagName(e)[0].textContent = t;
      else if (this.xmlDoc.getElementsByTagName(zt).length > 0) {
        const n = this.xmlDoc.createElement(e);
        n.textContent = t, this.xmlDoc.getElementsByTagName(zt)[0].appendChild(n);
      }
      this.write();
    }
  }
  /**
   * Removes a listener from the settings file.
   * @param listener - The listener to remove.
   */
  removeListener(e) {
    this.file?.off(Z.CONTENT_CHANGE_EVENT, e);
  }
}
class Ea {
  static MAX_BYTES = 5e6;
  static store(e, t) {
    if (this.getByteSize(t) > this.MAX_BYTES)
      throw new Error("Failed to store value: storage capacity exceeded.");
    localStorage.setItem(e, t);
  }
  static load(e) {
    return localStorage.getItem(e);
  }
  static clear() {
    localStorage.clear();
  }
  static getByteSize(e) {
    return e == null ? 0 : new Blob([e]).size;
  }
  static byteToKilobyte(e) {
    return e / 1e3;
  }
}
class Hs {
  #e;
  measurementId;
  constructor(e) {
    this.#e = e;
  }
  init() {
    const { trackingConfig: e } = this.#e;
    this.measurementId = e.enabled ? e.googleAnalyticsMeasurementId : null;
    try {
      this.measurementId != null && Ut.initialize(this.measurementId);
    } catch (t) {
      console.error(t);
    }
    return this;
  }
  event(e) {
    if (console.info(e), this.measurementId != null)
      try {
        Ut.event(e);
      } catch (t) {
        console.error(t);
      }
  }
}
class js {
  windows;
  /** Function that handles changes to the open windows. */
  updateWindows;
  startupComplete;
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t, this.windows = {}, this.updateWindows = () => {
    }, this.startupComplete = !1;
  }
  /**
   * Opens a window for an application.
   * @param appId - The ID of the app.
   */
  open(e, t) {
    const { appsConfig: n, windowsConfig: s, taskbarConfig: i } = this.#e, o = n.getAppById(e);
    if (o == null)
      return console.warn(`Failed to open app ${e}: app not found`), null;
    const l = t?.size ?? o.windowOptions?.size ?? new z(700, 400), u = new z(
      window.innerWidth - s.screenMargin * 2,
      window.innerHeight - s.screenMargin * 2 - i.height
    );
    let c = !1;
    l.x > u.x ? (l.x = u.x, c = !0) : l.y > u.y && (l.y = u.y, c = !0);
    const d = new z(
      s.screenMargin + Ot(0, u.x - l.x),
      s.screenMargin + Ot(0, u.y - l.y)
    );
    t?.fullscreen && (typeof t.fullscreen == "string" ? c = t.fullscreen.toLowerCase() === "true" : c = t.fullscreen, delete t.fullscreen);
    let h = 0;
    for (; this.windowIds.includes(h.toString()); )
      h++;
    return h = h.toString(), this.#t.event({
      category: "Actions",
      action: "Opened window",
      label: o.id
    }), console.info(`Opening window ${h}:${o.id}`), this.windows[h] = {
      id: h,
      app: o,
      size: l,
      position: d,
      fullscreen: c,
      options: t
    }, this.focus(h), o.isActive = !0, this.updateWindows(this.windows), this.windows[h];
  }
  /**
   * Opens a file with the associated app or by a method specified by the file scheme.
   * @returns Opened window.
   */
  openFile(e, t = {}) {
    if (e.source != null) {
      if (e.source.startsWith(ie.external))
        return It(e.source.replace(ie.external, ""), "_blank"), null;
      if (e.source.startsWith(ie.app))
        return this.open(e.source.replace(ie.app, ""));
    }
    if (e.extension == null)
      return null;
    const { appsConfig: n } = this.#e, s = n.getAppByFileExtension(e.extension);
    return s != null ? this.open(s.id, { file: e, ...t }) : null;
  }
  /**
   * Close a window.
   */
  close(e) {
    if (e = e.toString(), !this.windowIds.includes(e)) {
      console.warn(`Failed to close window ${e}: window not found`);
      return;
    }
    const { app: t } = this.windows[e];
    t != null && (t.isActive = this.isAppActive(t.id)), console.info(`Closing window ${e}`), delete this.windows[e], this.updateWindows(this.windows);
  }
  /**
   * Close all windows of a specific app.
   */
  closeAppWindows(e) {
    Object.keys(this.windows).forEach((t) => {
      this.windows[t].app?.id === e && this.close(t);
    });
  }
  /**
   * Focus on a specific window.
   */
  focus(e) {
    if (e = e.toString(), !this.windowIds.includes(e)) {
      console.warn(`Failed to focus window ${e}: window not found`);
      return;
    }
    Object.values(this.windows).forEach((t) => {
      const n = t.id === e;
      t.isFocused = n, n && (t.lastInteraction = Date.now().valueOf(), t.minimized = !1);
    }), this.updateWindows(this.windows);
  }
  /**
   * Check whether a window is focused.
   */
  isFocused(e) {
    return this.windows[e].isFocused;
  }
  /**
   * Check if any window is focused.
   */
  isAnyFocused() {
    let e = !1;
    return Object.values(this.windows).forEach((t) => {
      if (t.isFocused)
        return e = !0;
    }), e;
  }
  /**
   * Change the minimized state of a window.
   * @param windowId - The ID of the window.
   * @param minimized - Leave as undefined to toggle the window's minimization state.
   */
  setMinimized(e, t) {
    if (e = e.toString(), !this.windowIds.includes(e)) {
      console.warn(`Failed to set minimized on window ${e}: window not found`);
      return;
    }
    const n = this.windows[e];
    n.minimized = t ?? !n.minimized, this.updateWindows(this.windows);
  }
  /**
   * Minimize all windows.
   */
  minimizeAll() {
    Object.values(this.windows).forEach((e) => {
      e.minimized = !0;
    }), this.updateWindows(this.windows);
  }
  /**
   * Check if an app has an open window.
   */
  isAppActive(e) {
    let t = !1;
    return Object.values(this.windows).forEach((n) => {
      if (n.app?.id === e) {
        t = !0;
        return;
      }
    }), t;
  }
  /**
   * Get an opened window of a certain app.
   */
  getAppWindowId(e) {
    let t = null;
    return Object.values(this.windows).forEach((n) => {
      n.app?.id == e && (t = n.id);
    }), t;
  }
  setUpdateWindows(e) {
    this.updateWindows = e;
  }
  startup(e, t) {
    !e.length || this.startupComplete || (e.forEach((n) => {
      this.open(n, t);
    }), this.startupComplete = !0);
  }
  get windowIds() {
    return Object.keys(this.windows);
  }
}
class Ks {
  length = 0;
  offset = 0;
  groupIndex = 0;
  zIndexManager = null;
  constructor(e, t) {
    this.setManager(e), this.setLength(t ?? 0);
  }
  setManager(e) {
    return this.zIndexManager = e, this;
  }
  setOffset(e) {
    return this.offset = e, this;
  }
  setLength(e) {
    return this.length === e ? this : (this.length = e, this.zIndexManager?.update(), this);
  }
  getIndex(e) {
    return this.length < e + 1 && this.setLength(e + 1), this.offset + e;
  }
}
class fe extends Ye {
  static GROUPS = {
    WINDOWS: 0,
    TASKBAR: 1,
    MODALS: 2
  };
  static INDEX_CHANGE_EVENT = "indexChange";
  groups = [];
  constructor() {
    super();
    for (let e = 0; e < Object.keys(fe.GROUPS).length; e++) {
      const t = new Ks(this);
      this.groups.push(t);
    }
  }
  update() {
    let e = 0, t = !1;
    for (let n = 0; n < this.groups.length; n++) {
      const s = this.groups[n];
      s.offset !== e && (t = !0, s.setOffset(e)), e += s.length;
    }
    t && this.emit(fe.INDEX_CHANGE_EVENT);
  }
  getIndex(e, t) {
    return this.groups[e].getIndex(t);
  }
}
class Gs {
  /** The name of the system. */
  systemName;
  /** The tagline/short description of the system. */
  tagLine;
  #e;
  skin;
  appsConfig;
  desktopConfig;
  miscConfig;
  modalsConfig;
  taskbarConfig;
  trackingConfig;
  windowsConfig;
  virtualDriveConfig;
  storage;
  constructor({
    systemName: e,
    tagLine: t,
    skin: n,
    desktopConfig: s,
    appsConfig: i,
    miscConfig: o,
    modalsConfig: l,
    taskbarConfig: u,
    trackingConfig: c,
    windowsConfig: d,
    virtualDriveConfig: h
  }) {
    this.systemName = e ?? "ProzillaOS", this.tagLine = t ?? "Web-based Operating System", this.skin = n ?? new ps(), this.desktopConfig = s, this.appsConfig = i, this.miscConfig = o, this.modalsConfig = l, this.taskbarConfig = u, this.trackingConfig = c, this.windowsConfig = d, this.virtualDriveConfig = h, this.storage = new ne(), this.loadSkin(), this.#e = /* @__PURE__ */ new Date();
  }
  loadSkin() {
    const e = this.skin;
    this.appsConfig.apps.forEach((t) => {
      t.applySkin(e);
    }), e.loadStyleSheet != null && e.loadStyleSheet();
  }
  getUptime(e = 2) {
    return en(this.#e, e, !1);
  }
}
const En = ce(void 0);
function Le() {
  return ue(En);
}
const xn = ce(void 0);
function K() {
  const r = ue(xn);
  if (r == null)
    throw new Error("SystemManager is missing");
  return r;
}
function xa() {
  return K().storage;
}
function At() {
  return K().skin;
}
function Sa(r) {
  const [e, t] = w(r ? [r] : []), [n, s] = w(0), i = (h) => {
    if (h === e[0])
      return;
    let p = [
      h,
      ...e.slice(n, e.length)
    ];
    p = p.filter((f, m) => f !== p[m + 1]), t(p), s(0);
  }, o = (h) => {
    const p = wt(n + h, 0, e.length - 1);
    p !== n && s(p);
  }, l = () => o(1), u = () => o(-1), c = n < e.length - 1, d = n >= 1;
  return { history: e, stateIndex: n, pushState: i, undo: l, redo: u, undoAvailable: c, redoAvailable: d };
}
function bt({ onKeyDown: r, onKeyUp: e }) {
  y(() => (r && document.addEventListener("keydown", r), e && document.addEventListener("keyup", e), () => {
    r && document.removeEventListener("keydown", r), e && document.removeEventListener("keyup", e);
  }), [r, e]);
}
function Ys(r) {
  const [e, t] = w([]), n = te((o, l = !0) => {
    if (!r.shortcuts) return;
    const u = [...e], c = (d, h) => {
      for (const [p, f] of Object.entries(d))
        f.every(
          (E) => u.includes(E) || o.key === E
        ) && (o.preventDefault(), o.stopPropagation(), !(!f.includes(o.key) || !l) && (h != null ? r.options[h]?.[p]?.(o) : r.options[p]?.(o)));
    };
    if (r.useCategories)
      for (const [d, h] of Object.entries(r.shortcuts))
        c(h, d);
    else
      c(r.shortcuts);
    t(u);
  }, [e, r]);
  y(() => {
    const o = () => t([]);
    return document.addEventListener("blur", o), () => document.removeEventListener("blur", o);
  }, []), bt({ onKeyDown: (o) => {
    const l = e.includes(o.key);
    n(o, l), l || t(e.concat([o.key]));
  }, onKeyUp: (o) => {
    if (n(o), e.includes(o.key)) {
      const l = [...e];
      _e(o.key, l), t(l);
    }
  } });
}
function _a({ onMouseDown: r, onMouseUp: e, onClick: t, onContextMenu: n }) {
  y(() => (r && document.addEventListener("mousedown", r), e && document.addEventListener("mouseup", e), t && document.addEventListener("click", t), n && document.addEventListener("contextmenu", n), () => {
    r && document.removeEventListener("mousedown", r), e && document.removeEventListener("mouseup", e), t && document.removeEventListener("click", t), n && document.removeEventListener("contextmenu", n);
  }), [r, e, t, n]);
}
function Xs(r, e) {
  y(() => {
    const t = (n) => {
      r.current && !r.current.contains(n.target) && e(n);
    };
    return document.addEventListener("mousedown", t), () => {
      document.removeEventListener("mousedown", t);
    };
  }, [r, e]);
}
const me = de(({ onOutsideClick: r, children: e }) => {
  const t = le(null);
  return Xs(t, r), /* @__PURE__ */ a("div", { ref: t, children: e });
});
function kt() {
  const [r, e] = w(null), [t, n] = w(null);
  return y(() => {
    const s = new ResizeObserver((o) => {
      e(o[0].contentBoxSize[0].inlineSize), n(o[0].contentBoxSize[0].blockSize);
    }), i = document.getElementById("root");
    if (i == null)
      throw new Error("Root is null: No element with ID 'root' found");
    s.observe(i);
  }, []), [r, t];
}
function qs({ avoidTaskbar: r = !0 }) {
  const { taskbarConfig: e } = K(), t = le(null), [n, s] = w(!1), [i, o] = w(!1), [l, u] = w(!1), [c, d] = kt();
  return y(() => {
    if (t.current == null || c == null || d == null)
      return;
    const h = t.current.getBoundingClientRect(), p = c;
    let f = d;
    r && (f -= e.height);
    const m = h.x + h.width > p, E = h.y + h.height > f;
    m && o(!0), E && u(!0), s(!0);
  }, [i, r, d, c]), { ref: t, initiated: n, alignLeft: i, alignTop: l };
}
function Sn(r) {
  const [e, t] = w(!1), [n, s] = w(0), [i, o] = w(0), [l, u] = w(0);
  r == null && (r = {}), r.shadow == null && (r.shadow = {}), r.shadow.color == null && (r.shadow.color = {});
  const {
    ref: c,
    horizontal: d = !0,
    dynamicOffset: h = !0,
    dynamicOffsetFactor: p = 3,
    shadow: {
      offset: f = 8,
      blurRadius: m = 5,
      spreadRadius: E = -5,
      color: {
        r: x = 0,
        g: M = 0,
        b: k = 0,
        a: D = 50
      }
    }
  } = r, F = te((I) => {
    I && (s(d ? I.scrollLeft : I.scrollTop), o(d ? I.scrollWidth : I.scrollHeight), u(d ? I.clientWidth : I.clientHeight));
  }, [d]), N = (I) => {
    F(I.target);
  };
  return y(() => {
    const I = () => {
      c?.current != null && F(c.current);
    };
    return c?.current && !e && (t(!0), F(c.current)), window.addEventListener("resize", I), () => {
      window.removeEventListener("resize", I);
    };
  }, [c, F, e]), { boxShadow: (() => {
    const I = n, V = i - n - l, Q = I === 0, H = V === 0, C = n > 0 && l < i - n;
    let T = f, Y = f;
    h && (T = I * p - f, Y = V * p - f, T > f ? T = f : T < 0 && (T = 0), Y > f ? Y = f : Y < 0 && (Y = 0));
    const re = d ? `${T}px 0` : `0 ${T}px`, xe = d ? `-${Y}px 0` : `0 -${Y}px`, L = `inset ${re} ${m}px ${E}px rgba(${x}, ${M}, ${k}, ${D}%)`, he = `inset ${xe} ${m}px ${E}px rgba(${x}, ${M}, ${k}, ${D}%)`;
    let oe = "none";
    return Q ? oe = he : C ? oe = `${L}, ${he}` : H && (oe = L), oe;
  })(), onUpdate: N };
}
const st = "ProzillaOS", it = "-", rt = "__", Vt = "--";
function Zs(r, e, t) {
  return Ne(() => {
    if (r == null)
      return null;
    let n = `${st + it + r}`;
    return e != null && (n += rt + e), typeof t == "string" ? (n += ` ${st + it + r}`, e != null && (n += rt + e), n += Vt + t) : t?.forEach((s) => {
      n += ` ${st + it + r}`, e != null && (n += rt + e), n += Vt + s;
    }), n.trim();
  }, [r, e, t]);
}
function S(r, e, t, n) {
  const s = Zs(e, t, n);
  return Ne(() => {
    const i = [...r];
    return s != null && i.unshift(s), i.join(" ");
  }, [r, s]);
}
function Js(r) {
  const e = le(null);
  return e.current === null && (e.current = r()), e;
}
function we(r) {
  return Js(r).current;
}
function Ia({
  containerRef: r,
  testString: e = "M".repeat(100)
}) {
  const t = le(null), [n, s] = w(z.ZERO), [i, o] = w(z.ZERO);
  y(() => {
    let u;
    const c = () => {
      u = requestAnimationFrame(() => {
        const m = r.current, E = t.current;
        if (!m || !E)
          return;
        const x = E.getBoundingClientRect();
        if (!x.width || !x.height)
          return;
        const M = m.getBoundingClientRect(), k = m.offsetWidth > 0 ? M.width / m.offsetWidth : 1, D = m.offsetHeight > 0 ? M.height / m.offsetHeight : 1, F = x.width / k / e.length, N = x.height / D;
        if (F <= 0 || N <= 0)
          return;
        const P = getComputedStyle(m), I = parseFloat(P.paddingLeft) + parseFloat(P.paddingRight), V = parseFloat(P.paddingTop) + parseFloat(P.paddingBottom), Q = m.clientWidth - I, H = m.clientHeight - V, C = Math.floor(Q / F), T = Math.floor(H / N);
        s(new z(F, N)), o(new z(C, T));
      });
    }, d = r.current, h = t.current;
    if (!d || !h)
      return;
    const p = new ResizeObserver(c);
    p.observe(d), p.observe(h), d.addEventListener("transitionend", c), d.addEventListener("animationend", c);
    const f = getComputedStyle(d);
    return document.fonts.load(`${f.fontSize} ${f.fontFamily}`).then(c).catch(() => null), document.fonts.addEventListener("loadingdone", c), c(), () => {
      cancelAnimationFrame(u), p.disconnect(), d.removeEventListener("transitionend", c), d.removeEventListener("animationend", c), document.fonts.removeEventListener("loadingdone", c);
    };
  }, [r, e]);
  const l = Ne(() => /* @__PURE__ */ a(
    "span",
    {
      ref: t,
      "aria-hidden": "true",
      style: {
        position: "absolute",
        pointerEvents: "none",
        visibility: "hidden",
        whiteSpace: "pre",
        left: 0,
        top: 0
      },
      children: e
    }
  ), [e]);
  return { charSize: n, containerSize: i, sentinel: l };
}
const Qs = ({ children: r }) => {
  const e = K(), t = we(() => new vt(e).init());
  return /* @__PURE__ */ a(En.Provider, { value: t, children: r });
}, _n = ce(void 0);
function ei() {
  return ue(_n);
}
const ti = ({ children: r }) => {
  const e = we(() => new fe());
  return /* @__PURE__ */ a(_n.Provider, { value: e, children: r });
}, In = ce(void 0);
function Ee() {
  return ue(In);
}
const vn = ce(void 0);
function yn() {
  return ue(vn);
}
const ni = ({ children: r, windowsManager: e }) => {
  const [t, n] = w([]), s = te((i) => {
    n(Object.values(i));
  }, []);
  return e.setUpdateWindows(s), /* @__PURE__ */ a(vn.Provider, { value: t, children: r });
}, Cn = ce(void 0);
function si() {
  return ue(Cn);
}
const ii = ({ children: r }) => {
  const e = K(), t = si();
  if (t == null)
    throw new Error("WindowsManager is missing TrackingManager");
  const n = we(() => new js(e, t));
  return /* @__PURE__ */ a(In.Provider, { value: n, children: /* @__PURE__ */ a(ni, { windowsManager: n, children: r }) });
}, An = ce(void 0);
function ri() {
  return ue(An);
}
const oi = ({ children: r, modalsManager: e }) => {
  const [t, n] = w([]), s = te((i) => {
    n(Object.values(i));
  }, []);
  return e.setUpdateModals(s), /* @__PURE__ */ a(An.Provider, { value: t, children: r });
}, bn = ce(void 0);
function qe() {
  return ue(bn);
}
const ai = ({ children: r }) => {
  const e = we(() => new Ae());
  return /* @__PURE__ */ a(bn.Provider, { value: e, children: /* @__PURE__ */ a(oi, { modalsManager: e, children: r }) });
}, kn = ce(void 0);
function Te() {
  return ue(kn);
}
const li = ({ children: r }) => {
  const e = Le();
  if (e == null) throw new Error("SettingsManager is missing VirtualRoot");
  const t = we(() => new ge(e));
  return /* @__PURE__ */ a(kn.Provider, { value: t, children: r });
};
function ci({ children: r }) {
  const e = At(), [t, n] = w(e.defaultTheme ?? He.Dark), i = Te()?.getSettings(pe.THEME);
  return y(() => {
    i?.get("theme", (o) => {
      n(parseInt(o) || 0);
    });
  }, [i]), /* @__PURE__ */ a("div", { className: `${He[t ?? He.Dark]}-theme`, children: r });
}
const ui = (r) => {
  const { children: e, ...t } = r, n = we(() => new Gs(t));
  return /* @__PURE__ */ a(xn.Provider, { value: n, children: e });
}, di = ({ children: r }) => {
  const e = K(), t = we(() => new Hs(e).init());
  return /* @__PURE__ */ a(Cn.Provider, { value: t, children: r });
}, hi = "_Main_1w5gc_1", pi = {
  Main: hi
};
function fi({ children: r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      onContextMenu: (e) => {
        e.preventDefault();
      },
      className: S([pi.Main], "Main"),
      children: r
    }
  );
}
const va = de(function(r) {
  const { systemName: e, tagLine: t, skin: n, config: s, children: i } = r, o = {
    systemName: e,
    tagLine: t,
    skin: n,
    appsConfig: new q(s?.apps),
    desktopConfig: new Is(s?.desktop),
    miscConfig: new vs(s?.misc),
    modalsConfig: new xt(s?.modals),
    taskbarConfig: new ys(s?.taskbar),
    trackingConfig: new Cs(s?.tracking),
    windowsConfig: new As(s?.windows),
    virtualDriveConfig: new Os(s?.virtualDrive)
  };
  return /* @__PURE__ */ a(ui, { ...o, children: /* @__PURE__ */ a(Qs, { children: /* @__PURE__ */ a(ti, { children: /* @__PURE__ */ a(di, { children: /* @__PURE__ */ a(ii, { children: /* @__PURE__ */ a(ai, { children: /* @__PURE__ */ a(li, { children: /* @__PURE__ */ a(ci, { children: /* @__PURE__ */ a(fi, { children: i }) }) }) }) }) }) }) }) });
}), mi = "_Taskbar_etcj3_1", gi = "_HomeContainer_etcj3_52", wi = "_SearchContainer_etcj3_53", Ei = "_HomeButton_etcj3_66", xi = "_MenuIcons_etcj3_81", Si = "_AppIcons_etcj3_82", _i = "_AppIconsContainer_etcj3_88", Ii = "_MenuButton_etcj3_113", vi = "_UtilIcons_etcj3_131", yi = "_DesktopButton_etcj3_163", Ci = "_MenuContainer_etcj3_167", Ai = "_Active_etcj3_175", bi = "_Menu_etcj3_81", J = {
  Taskbar: mi,
  HomeContainer: gi,
  SearchContainer: wi,
  HomeButton: Ei,
  MenuIcons: xi,
  AppIcons: Si,
  AppIconsContainer: _i,
  MenuButton: Ii,
  UtilIcons: vi,
  DesktopButton: yi,
  MenuContainer: Ci,
  Active: Ai,
  Menu: bi
}, Ht = /* @__PURE__ */ Symbol("noContext");
function ki(r, e) {
  const t = ce(e ?? Ht);
  t.displayName = `${r}Context`;
  function n() {
    const i = ue(t);
    if (i === Ht)
      throw new Error(`${r} slots must be rendered inside ${r} to read from its context, because there is no default value.`);
    return i;
  }
  function s({ context: i, defaults: o, slots: l, children: u }) {
    return /* @__PURE__ */ a(t.Provider, { value: i, children: gn(u) ? /* @__PURE__ */ a(Ni, { defaults: o, slots: l }) : u });
  }
  return {
    useSlotsContext: n,
    SlotsProvider: s
  };
}
function Ni({ defaults: r, slots: e }) {
  return Ne(() => Object.entries(r).map(([t, n]) => {
    const s = `render${t.charAt(0).toUpperCase() + t.slice(1)}`, i = e[s] ?? n;
    return /* @__PURE__ */ a(i, {}, t);
  }), [r, e]);
}
function jt(r, e, t) {
  const n = t ?? r.displayName ?? r.name;
  if (n) {
    r.displayName = n;
    for (const [s, i] of Object.entries(e))
      typeof i == "function" && !i.displayName && (i.displayName = `${n}.${s}`);
  }
  return Object.assign(r, e);
}
var Kt;
((r) => {
  r.Empty = () => null, r.Empty.displayName = "Empty";
})(Kt || (Kt = {}));
const Ti = "_HomeMenuContainer_ki7xi_1", Mi = "_HomeMenu_ki7xi_1", Di = "_Buttons_ki7xi_17", Ri = "_Apps_ki7xi_87", Oi = "_Logo_ki7xi_98", Re = {
  HomeMenuContainer: Ti,
  HomeMenu: Mi,
  Buttons: Di,
  Apps: Ri,
  Logo: Oi
}, Fi = "_AppList_19mh1_1", Pi = "_AppButton_19mh1_11", Ge = {
  AppList: Fi,
  AppButton: Pi
};
function ya(r) {
  const e = Le(), [t, n] = w(null);
  return y(() => {
    if (t != null)
      return;
    const s = e?.navigateToFolder("~/Apps");
    if (s == null) {
      console.warn("Folder missing: '~/Apps'");
      return;
    }
    r != null && s.createFolder(r.id, (i) => {
      n(i);
    });
  }, [e]), t;
}
const Gt = (r, e) => r.name.localeCompare(e.name);
function Nt(r = {}) {
  const { sort: e, filter: t } = r, { appsConfig: n } = K(), [s, i] = w([]), o = te(() => {
    let l = [...n.installedApps];
    t != null && (l = l.filter(t)), typeof e == "boolean" ? e && l.sort(Gt) : l.sort(e ?? Gt), i(l);
  }, [n, e, t]);
  return y(() => (o(), n.onAppsChange(o)), [o]), s;
}
const Li = "_WindowedModal_u6mt7_1", Bi = "_Header_u6mt7_15", ve = {
  WindowedModal: Li,
  Header: Bi,
  "Window-icon": "_Window-icon_u6mt7_29",
  "Header-button": "_Header-button_u6mt7_56",
  "Exit-button": "_Exit-button_u6mt7_75",
  "Window-content": "_Window-content_u6mt7_83"
}, Ui = "_TextRegular_wjx57_1", $i = "_TextLight_wjx57_7", Wi = "_TextSemibold_wjx57_14", zi = "_TextBold_wjx57_19", se = {
  TextRegular: Ui,
  TextLight: $i,
  TextSemibold: Wi,
  TextBold: zi
};
function Me({ className: r, src: e, ...t }) {
  const [n, s] = w(z.ZERO);
  return y(() => {
    if (e == null)
      return;
    const i = new Image();
    i.onload = () => {
      s(new z(i.naturalWidth, i.naturalHeight));
    }, i.src = e;
  }, [e]), e?.endsWith(".svg") ? /* @__PURE__ */ a(Pe, { className: r, src: e, ...t }) : /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
    "svg",
    {
      width: 200,
      height: 200,
      className: r,
      viewBox: "0 0 200 200",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      shapeRendering: "crispEdges",
      ...t,
      children: /* @__PURE__ */ a("g", { transform: `scale(${200 / n.x})`, children: /* @__PURE__ */ a("image", { width: n.x, height: n.y, href: e, style: { imageRendering: "crisp-edges" } }) })
    }
  ) }) });
}
function Nn({ modal: r, params: e, children: t, ...n }) {
  const s = le(null), [i, o] = w(r?.position), [l, u] = kt();
  return y(() => {
    l == null || u == null || (r?.position != null ? (r.position.x > l && (r.position.x = 0), r.position.y > u && (r.position.y = 0), o(r.position)) : o(new z(0, 0)));
  }, [r, u, l]), /* @__PURE__ */ a(
    ln,
    {
      axis: "both",
      handle: ".Window-handle",
      defaultPosition: i,
      position: void 0,
      scale: 1,
      bounds: {
        top: -(r?.position.y ?? 0) - 1,
        bottom: (u ?? 0) - 55 - (r?.position.y ?? 0),
        left: -(r?.size.x ?? 0) + 85 - (r?.position.x ?? 0),
        right: (l ?? 0) - 5 - (r?.position.x ?? 0)
      },
      cancel: "button",
      nodeRef: s,
      children: /* @__PURE__ */ g(
        "div",
        {
          className: ve.WindowedModal,
          ref: s,
          style: {
            width: r?.size.x ?? 0,
            height: r?.size.y ?? 0
          },
          children: [
            /* @__PURE__ */ g("div", { className: `${ve.Header} Window-handle`, children: [
              /* @__PURE__ */ a(
                Me,
                {
                  className: ve["Window-icon"],
                  src: e?.iconUrl
                }
              ),
              /* @__PURE__ */ a("p", { className: se.TextSemibold, children: e?.title }),
              /* @__PURE__ */ a(
                "button",
                {
                  "aria-label": "Close",
                  className: `${ve["Header-button"]} ${ve["Exit-button"]}`,
                  tabIndex: 0,
                  onClick: () => {
                    r?.close();
                  },
                  children: /* @__PURE__ */ a(O, { icon: rn })
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: ve["Window-content"], ...n, children: t })
          ]
        }
      )
    }
  );
}
const Vi = "_DialogContent_lop64_1", Hi = {
  DialogContent: Vi
};
function ji({ modal: r, params: e, children: t, ...n }) {
  return /* @__PURE__ */ a(Nn, { modal: r, params: e, onClick: (i) => {
    i.preventDefault();
    const o = i.target.getAttribute("data-type");
    if (o == null) return;
    parseInt(o) === xt.DIALOG_CONTENT_TYPES.closeButton && r?.close();
  }, ...n, children: /* @__PURE__ */ a("div", { className: Hi.DialogContent, children: t }) });
}
function Tt() {
  const { modalsConfig: r } = K(), e = qe();
  return { openWindowedModal: te(({ Modal: n, ...s }) => {
    const i = s.size ?? r.defaultDialogSize;
    let o = (window.innerWidth - i.x) / 4, l = (window.innerHeight - i.y) / 4;
    if (e?.containerRef?.current) {
      const d = e.containerRef.current.getBoundingClientRect();
      o -= d.x / 2, l -= d.y / 2;
    }
    const u = new wn(n).setPosition(new z(o, l)).setSize(i).setDismissible(!1).setProps({ params: s }), c = s.single ?? !1;
    return e?.open(u, c), u;
  }, [e]) };
}
function Tn() {
  const { openWindowedModal: r } = Tt();
  return { alert: te(({ title: t, text: n, iconUrl: s, size: i, single: o }) => {
    r({
      title: t ?? "Alert",
      iconUrl: s,
      size: i ?? new z(300, 150),
      single: o,
      Modal: (l) => /* @__PURE__ */ g(ji, { ...l, children: [
        /* @__PURE__ */ a("p", { children: n }),
        /* @__PURE__ */ a("button", { "data-type": xt.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
      ] })
    });
  }, [r]) };
}
class Ze {
  static MODES = {
    contextMenu: "ContextMenu",
    shortcutsListener: "ShortcutsListener",
    headerMenu: "HeaderMenu"
  };
}
function Ki() {
  const r = qe();
  return { openContextMenu: te((t, n, s = {}) => {
    const i = new wn(n).setPosition(t).setProps({
      triggerParams: s,
      mode: Ze.MODES.contextMenu,
      onAnyTrigger: () => {
        i.close();
      }
    });
    return r?.open(i), i;
  }, [r]) };
}
function be({ Actions: r }) {
  const e = qe(), { openContextMenu: t } = Ki();
  return { onContextMenu: te((i, o = {}) => {
    i.preventDefault(), i.stopPropagation();
    let l = i.clientX, u = i.clientY;
    if (e?.containerRef?.current != null) {
      const c = e.containerRef.current.getBoundingClientRect();
      l -= c.x, u -= c.y / 2;
    }
    return t(new z(l, u), r, o);
  }, [r, e]), ShortcutsListener: () => /* @__PURE__ */ a(r, { mode: Ze.MODES.shortcutsListener }) };
}
function Ca(r, e, t) {
  return Je(r, e, t ?? null, (n) => n.length ? n : null, (n) => n ?? "");
}
function Aa(r, e, t) {
  return Je(r, e, t ?? [], (n) => n.length ? n.split(",") : [], (n) => n.join(","));
}
function ba(r, e, t) {
  return Je(r, e, t ?? !1, (n) => tn(n));
}
function ka(r, e, t) {
  return Je(r, e, t ?? 0, (n) => parseInt(n));
}
function Je(r, e, t, n, s = (i) => String(i)) {
  const [i, o] = w(t), l = Te();
  y(() => {
    const c = l?.getSettings(r);
    if (!c)
      return;
    let d;
    return c.get(e, (h) => o(n(h))).then((h) => {
      d = h.listener, h.value || o(t);
    }), () => {
      d && c.removeListener(d);
    };
  }, [l]);
  const u = te((c) => {
    const d = l?.getSettings(r);
    typeof c != "string" && (c = s(c)), d?.set(e, c);
  }, [l]);
  return [i, u];
}
function Mt({ groupIndex: r, index: e }) {
  const t = r * 10 + e, [n, s] = w(t), i = ei();
  return y(() => {
    const o = () => {
      const l = i?.getIndex(r, e);
      l != null && n !== l && s(l);
    };
    return o(), i?.on(fe.INDEX_CHANGE_EVENT, o), () => {
      i?.off(fe.INDEX_CHANGE_EVENT, o);
    };
  }, [r, e, n, i]), n;
}
function Na({
  app: r,
  path: e,
  input: t,
  exit: n,
  sizeRef: s
}) {
  const i = Le(), o = K(), l = Te(), u = we(() => new j({
    app: r,
    path: e,
    input: t,
    virtualRoot: i,
    systemManager: o,
    settingsManager: l,
    exit: n,
    sizeRef: s
  })), c = hs(u.state);
  return [u, c];
}
function Ta(r, e) {
  const t = At();
  return Ne(() => {
    const i = Array.from(r.entries()).filter(([l]) => t instanceof l);
    if (i.length === 0)
      return e;
    const o = i.map(([, l]) => ({ override: l }));
    return Qt({ override: e }, ...o).override;
  }, [t, r, e]);
}
function Gi({ active: r, setActive: e, search: t }) {
  const { systemName: n, appsConfig: s, skin: i } = K(), o = Ee(), l = Le(), [u, c] = w(r ? 0 : -1);
  y(() => {
    c(r ? 0 : -1);
  }, [r]);
  const d = [Re.HomeMenuContainer, J.MenuContainer];
  r && d.push(J.Active);
  let h = !1;
  bt({ onKeyDown: (D) => {
    D.key === "Alt" ? (D.preventDefault(), h = !0) : (h = !1, r && D.key.length === 1 && t(D.key));
  }, onKeyUp: (D) => {
    D.key === "Alt" && h && (D.preventDefault(), e(!r)), h = !1;
  } });
  const m = Nt(), E = s.getAppByRole(q.APP_ROLES.fileExplorer), x = s.getAppByRole(q.APP_ROLES.settings), M = s.getAppByRole(q.APP_ROLES.textEditor), k = S([Ge.AppButton], "SearchMenu", "AppButton");
  return /* @__PURE__ */ a("div", { className: d.join(" "), children: /* @__PURE__ */ g("div", { className: S([Re.HomeMenu, J.Menu], "Taskbar", "Menu", "Home"), children: [
    /* @__PURE__ */ g("div", { className: S([Re.Buttons], "HomeMenu", "Buttons"), children: [
      /* @__PURE__ */ g("button", { tabIndex: u, onClick: () => {
        bs(!0, n);
      }, children: [
        /* @__PURE__ */ a(O, { icon: zn }),
        /* @__PURE__ */ a("p", { className: se.TextRegular, children: "Shut down" })
      ] }),
      x != null && /* @__PURE__ */ g("button", { tabIndex: u, onClick: () => {
        e(!1), o?.open("settings");
      }, children: [
        /* @__PURE__ */ a(O, { icon: Vn }),
        /* @__PURE__ */ a("p", { className: se.TextRegular, children: "Settings" })
      ] }),
      M != null && /* @__PURE__ */ g("button", { tabIndex: u, onClick: () => {
        e(!1), o?.open("text-editor", {
          mode: "view",
          file: l?.navigate("~/Documents/Info.md"),
          size: new z(575, 675)
        });
      }, children: [
        /* @__PURE__ */ a(O, { icon: Hn }),
        /* @__PURE__ */ a("p", { className: se.TextRegular, children: "Info" })
      ] }),
      E != null && /* @__PURE__ */ g(Et, { children: [
        /* @__PURE__ */ g("button", { tabIndex: u, onClick: () => {
          e(!1), o?.open(E.id, { path: "~/Pictures" });
        }, children: [
          /* @__PURE__ */ a(O, { icon: jn }),
          /* @__PURE__ */ a("p", { className: se.TextRegular, children: "Images" })
        ] }),
        /* @__PURE__ */ g("button", { tabIndex: u, onClick: () => {
          e(!1), o?.open(E.id, { path: "~/Documents" });
        }, children: [
          /* @__PURE__ */ a(O, { icon: Kn }),
          /* @__PURE__ */ a("p", { className: se.TextRegular, children: "Documents" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g("div", { className: S([Re.Apps], "HomeMenu", "Apps"), children: [
      /* @__PURE__ */ g("span", { className: S([Re.Logo], "HomeMenu", "Logo"), children: [
        /* @__PURE__ */ a(Pe, { src: i.systemIcon }),
        /* @__PURE__ */ a("h1", { className: se.TextBold, children: n })
      ] }),
      /* @__PURE__ */ a("div", { className: S([Ge.AppList], "HomeMenu", "AppList"), children: m.map(
        ({ name: D, id: F, iconUrl: N }) => /* @__PURE__ */ g(
          "button",
          {
            className: k,
            tabIndex: u,
            onClick: () => {
              e(!1), o?.open(F);
            },
            title: D,
            children: [
              /* @__PURE__ */ a(Me, { src: N ?? "" }),
              /* @__PURE__ */ a("h2", { className: se.TextRegular, children: D })
            ]
          },
          F
        )
      ) })
    ] })
  ] }) });
}
const Yi = "_SearchMenuContainer_11e0k_1", Xi = "_SearchMenu_11e0k_1", qi = "_Active_11e0k_42", Zi = "_Input_11e0k_55", We = {
  SearchMenuContainer: Yi,
  SearchMenu: Xi,
  Active: qi,
  Input: Zi
};
function Ji({ active: r, setActive: e, searchQuery: t, setSearchQuery: n, inputRef: s }) {
  const i = Ee(), o = Nt(), [l, u] = w(r ? 0 : -1);
  y(() => {
    u(r ? 0 : -1);
  }, [r]), y(() => {
    s.current != null && (s.current.focus(), window.scrollTo(0, document.body.scrollHeight));
  }, [s]);
  const c = Ne(() => {
    const m = t.toLowerCase().trim();
    return m === "" ? o : o.filter(
      ({ name: E, id: x }) => E.toLowerCase().includes(m) || x.toLowerCase().includes(m)
    );
  }, [o, t]), d = (m) => {
    const E = m.target.value;
    n(E);
  }, h = [We.SearchMenuContainer];
  r && h.push(We.Active), bt({ onKeyDown: (m) => {
    (m.key === "f" || m.key === "g") && m.ctrlKey && !r ? (m.preventDefault(), e(!0)) : m.key === "Escape" && r ? (m.preventDefault(), e(!1)) : m.key === "Enter" && r && (m.preventDefault(), i?.open(c[0].id), e(!1));
  } });
  const f = S([Ge.AppButton], "SearchMenu", "AppButton");
  return /* @__PURE__ */ a("div", { className: S(h), children: /* @__PURE__ */ g("div", { className: S([We.SearchMenu], "Taskbar", "Menu", "Search"), children: [
    /* @__PURE__ */ a("div", { className: S([Ge.AppList], "SearchMenu", "AppList"), children: c.map(
      ({ name: m, id: E, iconUrl: x }) => /* @__PURE__ */ g(
        "button",
        {
          className: f,
          tabIndex: l,
          onClick: () => {
            e(!1), i?.open(E);
          },
          children: [
            /* @__PURE__ */ a(Me, { src: x ?? "" }),
            /* @__PURE__ */ a("p", { children: m })
          ]
        },
        E
      )
    ) }),
    /* @__PURE__ */ a(
      "input",
      {
        ref: s,
        className: S([We.Input], "SearchMenu", "Input"),
        "aria-label": "Search query",
        tabIndex: l,
        value: t,
        onChange: d,
        spellCheck: !1,
        placeholder: "Search..."
      }
    )
  ] }) });
}
const Qi = "_AppIcon_tgzjr_1", er = "_Active_tgzjr_17", tr = "_Hidden_tgzjr_22", ot = {
  AppIcon: Qi,
  Active: er,
  Hidden: tr
}, nr = "_Actions_aai42_1", sr = "_Uninitiated_aai42_15", ir = "_AlignLeft_aai42_19", rr = "_AlignTop_aai42_26", or = "_ContextMenu_aai42_35", ar = "_Button_aai42_47", lr = "_Dropdown_aai42_48", cr = "_Label_aai42_71", ur = "_Shortcut_aai42_79", dr = "_Icon_aai42_83", hr = "_ImageIcon_aai42_97", pr = "_DropdownContent_aai42_124", fr = "_Active_aai42_137", mr = "_Divider_aai42_142", gr = "_TextDisplay_aai42_150", wr = "_HeaderMenu_aai42_161", Er = "_DropdownArrow_aai42_193", W = {
  Actions: nr,
  Uninitiated: sr,
  AlignLeft: ir,
  AlignTop: rr,
  ContextMenu: or,
  Button: ar,
  Dropdown: lr,
  Label: cr,
  Shortcut: ur,
  Icon: dr,
  ImageIcon: hr,
  DropdownContent: pr,
  Active: fr,
  Divider: mr,
  TextDisplay: gr,
  HeaderMenu: wr,
  DropdownArrow: Er
};
function Se({ children: r, mode: e, className: t, onAnyTrigger: n, triggerParams: s, avoidTaskbar: i = !0 }) {
  const o = e === Ze.MODES.shortcutsListener, { ref: l, initiated: u, alignLeft: c, alignTop: d } = qs({ avoidTaskbar: i }), h = {}, p = {};
  let f = 0;
  const m = (x) => sn.map(x, (k) => {
    if (!nn(k))
      return k;
    f++;
    const { label: D, shortcut: F, disabled: N, onTrigger: P } = k.props, I = (V, ...Q) => {
      N || (V && n?.(V, s, ...Q), P?.(V, s, ...Q));
    };
    return !N && D != null && P != null && (h[f] = I, F != null && (p[f] = F)), o ? m(k.props.children) : $n(k, {
      ...k.props,
      actionId: f.toString(),
      children: m(k.props.children),
      onTrigger: I,
      disabled: N
    });
  });
  if (Ys({ options: h, shortcuts: p, useCategories: !1 }), o)
    return m(r);
  const E = [W.Actions];
  return e != null && E.push(W[e]), t != null && E.push(t), c && E.push(W.AlignLeft), d && E.push(W.AlignTop), u || E.push(W.Uninitiated), /* @__PURE__ */ a("div", { ref: l, className: S(E, "Actions", void 0, e), children: m(r) });
}
const xr = "_ImagePreview_djvki_1", Sr = {
  ImagePreview: xr
};
function gt({ source: r, className: e, onError: t, ...n }) {
  const s = At(), [i, o] = w(!1), l = () => {
    o(!0), t?.();
  }, u = [Sr.ImagePreview];
  return e != null && u.push(e), /* @__PURE__ */ a("div", { className: u.join(" "), ...n, children: i ? /* @__PURE__ */ a(Pe, { src: s.fileIcons.generic }) : /* @__PURE__ */ a(Me, { src: r, onError: l }) });
}
const G = de(({ actionId: r, label: e, shortcut: t, disabled: n, onTrigger: s, icon: i }) => {
  const o = [W.Button];
  return n && o.push(W.Disabled), /* @__PURE__ */ g("button", { className: S(o, "Actions", "Click"), tabIndex: 0, disabled: n, onClick: s, children: [
    /* @__PURE__ */ g("span", { className: S([W.Label], "Actions", "Label"), children: [
      i && /* @__PURE__ */ a("div", { className: W.Icon, children: typeof i == "string" ? /* @__PURE__ */ a(gt, { source: i, className: W.ImageIcon }) : /* @__PURE__ */ a(O, { icon: i }) }),
      /* @__PURE__ */ a("p", { children: e })
    ] }),
    t && /* @__PURE__ */ a("p", { className: W.Shortcut, children: Xe(t) })
  ] }, r);
}), _r = de(({ app: r, active: e, visible: t }) => {
  const n = Ee(), { onContextMenu: s } = be({
    Actions: (o) => /* @__PURE__ */ a(Se, { avoidTaskbar: !1, ...o, children: /* @__PURE__ */ a(G, { label: r.name, icon: r.iconUrl, onTrigger: () => {
      n?.open(r.id);
    } }) })
  });
  if (!n)
    return;
  const i = [ot.AppIcon];
  return e && i.push(ot.Active), t || i.push(ot.Hidden), /* @__PURE__ */ a(
    "button",
    {
      tabIndex: 0,
      className: S(i, "Taskbar", "AppIcon"),
      onClick: () => {
        const o = n.getAppWindowId(r.id);
        !e || o == null ? n.open(r.id) : n.isFocused(o) ? n.setMinimized(o) : n.focus(o);
      },
      onContextMenu: (o) => {
        t && s(o);
      },
      title: r.name,
      children: /* @__PURE__ */ a(Me, { src: r.iconUrl })
    },
    r.id
  );
}), Ir = "_Button_fsy4w_1", vr = "_Menu_fsy4w_15", ze = {
  Button: Ir,
  "Charging-indicator": "_Charging-indicator_fsy4w_5",
  Menu: vr
}, yr = "_UtilMenuContainer_1y60h_1", Cr = "_UtilMenu_1y60h_1", Ar = "_Active_1y60h_35", at = {
  UtilMenuContainer: yr,
  UtilMenu: Cr,
  Active: Ar
};
function Qe({ active: r, setActive: e, className: t, children: n }) {
  const s = [at.UtilMenuContainer];
  r && s.push(at.Active), t != null && s.push(t);
  const i = ["Util"];
  return r && i.push("Active"), /* @__PURE__ */ a("div", { className: s.join(" "), children: /* @__PURE__ */ a("div", { className: S([at.UtilMenu], "Taskbar", "Menu", i), children: n }) });
}
const br = "_Button_1uqkw_1", kr = "_ButtonLink_1uqkw_19", Yt = {
  Button: br,
  ButtonLink: kr
};
function Dt({ className: r, href: e, children: t, icon: n, target: s, ...i }) {
  const o = [Yt.Button];
  return r != null && o.push(r), e != null ? (o.push(Yt.ButtonLink), /* @__PURE__ */ g(
    "a",
    {
      ...i,
      href: e,
      target: s ?? "_blank",
      rel: "noreferrer",
      tabIndex: 0,
      className: S(o, "Button", "Link"),
      children: [
        t,
        /* @__PURE__ */ a(O, { icon: n ?? Gn })
      ]
    }
  )) : /* @__PURE__ */ g(
    "button",
    {
      ...i,
      tabIndex: 0,
      className: S(o, "Button"),
      children: [
        t,
        n != null ? /* @__PURE__ */ a(O, { icon: n }) : null
      ]
    }
  );
}
const Nr = "_DirectoryList_18ux0_1", Tr = "_FileButton_18ux0_9", Mr = "_FolderButton_18ux0_9", Dr = "_FileIcon_18ux0_46", Rr = "_FolderIcon_18ux0_46", Or = "_SelectionRect_18ux0_64", ye = {
  DirectoryList: Nr,
  FileButton: Tr,
  FolderButton: Mr,
  FileIcon: Dr,
  FolderIcon: Rr,
  SelectionRect: Or
};
let lt = null;
function Xt({ onClick: r, onDoubleClick: e, children: t, ...n }) {
  const { miscConfig: s } = K(), [i, o] = w(!1);
  return /* @__PURE__ */ a("button", { ...n, onClick: (u) => {
    if (u.preventDefault(), u.stopPropagation(), lt != null && clearTimeout(lt), i) {
      o(!1), e?.(u);
      return;
    }
    o(!0), r?.(u), lt = window.setTimeout(() => {
      o(!1);
    }, s.doubleClickDelay);
  }, children: t });
}
function Fr({
  directory: r,
  showHidden: e = !1,
  folderClassName: t,
  fileClassName: n,
  className: s,
  onContextMenuFile: i,
  onContextMenuFolder: o,
  onOpenFile: l,
  onOpenFolder: u,
  allowMultiSelect: c = !0,
  onSelectionChange: d,
  ...h
}) {
  const [p, f] = w([]), [m, E] = w([]), [x, M] = w([]), [k, D] = w([]), F = le(null), [N, P] = w(null), [I, V] = w(null);
  y(() => {
    d?.({ files: k, folders: x, directory: r });
  }, [r, d, k, x]);
  const Q = () => {
    M([]), D([]);
  };
  y(() => {
    Q();
  }, [r]), y(() => {
    const v = (ee) => {
      N != null && (ee.preventDefault(), V({ x: ee.clientX, y: ee.clientY }));
    }, A = (ee) => {
      if (N == null || I == null) {
        P(null), V(null);
        return;
      }
      ee.preventDefault(), P(null), V(null);
    };
    return document.addEventListener("mousemove", v), document.addEventListener("mouseup", A), () => {
      document.removeEventListener("mousemove", v), document.removeEventListener("mouseup", A);
    };
  }), y(() => {
    const v = () => {
      f([...r.getSubFolders(e)]), E([...r.getFiles(e)]), M((A) => A.filter((ee) => r.hasFolder(ee))), D((A) => A.filter((ee) => {
        const { name: De, extension: Be } = Z.splitId(ee);
        return r.hasFile(De, Be);
      }));
    };
    return v(), r.on(Ie.UPDATE_EVENT, v), () => {
      r.off(Ie.UPDATE_EVENT, v);
    };
  }, [r, e]);
  const H = (v, A = !1) => {
    c || (A = !0), M(A ? [v.id] : [...x, v.id]), A && D([]);
  }, C = (v, A = !1) => {
    c || (A = !0), D(A ? [v.id] : [...k, v.id]), A && M([]);
  }, T = (v) => {
    const A = [...x];
    _e(v.id, A), M(A);
  }, Y = (v) => {
    const A = [...k];
    _e(v.id, A), D(A);
  }, re = (v) => {
    v.preventDefault(), P({ x: v.clientX, y: v.clientY });
  }, xe = () => {
    let v, A, ee, De = 0;
    if (F.current == null || N == null || I == null)
      return { top: 0, left: 0, width: 0, height: 0 };
    const Be = F.current.getBoundingClientRect();
    return N.x < I.x ? (v = N.x, ee = I.x - N.x) : (v = I.x, ee = N.x - I.x), N.y < I.y ? (A = N.y, De = I.y - N.y) : (A = I.y, De = N.y - I.y), v -= Be.x, A -= Be.y, { top: A, left: v, width: ee, height: De };
  }, L = [ye.DirectoryList], he = [ye.FolderButton], oe = [ye.FileButton];
  return s && L.push(s), t && he.push(t), n && oe.push(n), t = S(he, "DirectoryList", "Folder"), n = S(oe, "DirectoryList", "File"), /* @__PURE__ */ g(
    "div",
    {
      ref: F,
      className: S(L, "DirectoryList"),
      onClick: Q,
      onMouseDown: re,
      ...h,
      children: [
        N != null && I != null ? /* @__PURE__ */ a("div", { className: ye.SelectionRect, style: xe() }) : null,
        p.map(
          (v) => /* @__PURE__ */ g(
            Xt,
            {
              tabIndex: 0,
              className: t,
              "data-selected": x.includes(v.id),
              onContextMenu: (A) => {
                o?.(A, v);
              },
              onClick: (A) => {
                H(v, !A.ctrlKey);
              },
              onDoubleClick: (A) => {
                u?.(A, v), T(v);
              },
              children: [
                /* @__PURE__ */ a("div", { className: ye.FolderIcon, children: /* @__PURE__ */ a(gt, { source: v.getIconUrl(), onError: () => {
                  v.setIconUrl(null);
                } }) }),
                /* @__PURE__ */ a("p", { children: v.name })
              ]
            },
            v.id
          )
        ),
        m.map(
          (v) => /* @__PURE__ */ g(
            Xt,
            {
              tabIndex: 0,
              className: n,
              "data-selected": k.includes(v.id),
              onContextMenu: (A) => {
                i?.(A, v);
              },
              onClick: (A) => {
                C(v, !A.ctrlKey);
              },
              onDoubleClick: (A) => {
                l?.(A, v), Y(v);
              },
              children: [
                /* @__PURE__ */ a("div", { className: ye.FileIcon, children: /* @__PURE__ */ a(gt, { source: v.getIconUrl(), onError: () => {
                  v.setIconUrl(null);
                } }) }),
                /* @__PURE__ */ a("p", { children: v.id })
              ]
            },
            v.id
          )
        )
      ]
    }
  );
}
const Pr = "_DropdownButton_1f5hf_1", Lr = "_Button_1f5hf_6", Br = "_Dropdown_1f5hf_1", Ur = "_Shortcut_1f5hf_58", Oe = {
  DropdownButton: Pr,
  Button: Lr,
  Dropdown: Br,
  Shortcut: Ur
};
function Ma({ label: r, options: e, shortcuts: t }) {
  const [n, s] = w(!1), [i, o] = w(-1);
  return y(() => {
    o(n ? 0 : -1);
  }, [n]), /* @__PURE__ */ a(me, { onOutsideClick: () => {
    s(!1);
  }, children: /* @__PURE__ */ g("div", { className: Oe.DropdownButton, children: [
    /* @__PURE__ */ a("button", { className: Oe.Button, tabIndex: 0, onClick: () => {
      s(!n);
    }, children: r }),
    n && e ? /* @__PURE__ */ a("div", { className: Oe.Dropdown, children: Object.entries(e).map(
      ([l, u]) => /* @__PURE__ */ g("button", { tabIndex: i, onClick: () => {
        s(!1), u();
      }, children: [
        /* @__PURE__ */ a("p", { className: Oe.Label, children: l }),
        Object.keys(t).includes(l) ? /* @__PURE__ */ a("p", { className: Oe.Shortcut, children: Xe(t[l]) }) : null
      ] }, l)
    ) }) : null
  ] }) });
}
const $r = "_ProgressBar_115cj_1", Wr = "_Fill_115cj_10", qt = {
  ProgressBar: $r,
  Fill: Wr
};
function Da({ fillPercentage: r, fillColor: e, backgroundColor: t, align: n = "left", className: s }) {
  return /* @__PURE__ */ a("div", { className: S([qt.ProgressBar, s], "ProgressBar"), style: { backgroundColor: t }, children: /* @__PURE__ */ a(
    "div",
    {
      className: `${qt.Fill} ${n}`,
      style: { backgroundColor: e, "--fill": `${wt(r, 0.1, 100)}%` }
    }
  ) });
}
const zr = "_HeaderMenu_1kc25_1", Vr = {
  HeaderMenu: zr
};
function Ra({ children: r, ...e }) {
  const t = Mt({ groupIndex: fe.GROUPS.MODALS, index: 5 });
  return /* @__PURE__ */ a("div", { className: S([Vr.HeaderMenu], "HeaderMenu"), style: { zIndex: t }, children: /* @__PURE__ */ a(Se, { mode: Ze.MODES.headerMenu, ...e, children: r }) });
}
const Hr = "_WebView_12eh1_1", jr = {
  WebView: Hr
}, Oa = Wn(({ source: r, focus: e, ...t }, n) => {
  const [s, i] = w(!1);
  y(() => {
    window.focus();
    const c = (d) => {
      s && e?.(d, !0);
    };
    return window.addEventListener("blur", c), () => {
      window.removeEventListener("blur", c);
    };
  }, [e, s]);
  const o = (c) => {
    i(!0);
  }, l = (c) => {
    window.focus(), i(!1);
  }, u = { ...t };
  return delete u.active, delete u.close, delete u.setTitle, delete u.setIconUrl, delete u.standalone, /* @__PURE__ */ a("div", { className: jr.WebView, onMouseOver: o, onMouseOut: l, children: /* @__PURE__ */ a(
    "iframe",
    {
      ref: n,
      src: r,
      referrerPolicy: "no-referrer",
      sandbox: "allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts",
      ...u
    }
  ) });
}), { useSlotsContext: Rt, SlotsProvider: Kr } = ki("Taskbar");
function Mn() {
  const { showUtilMenus: r, hideUtilMenus: e } = Rt(), [t, n] = w(!0), [s, i] = w(100), [o, l] = w(!1);
  y(() => {
    navigator.getBattery?.()?.then((d) => {
      const h = () => {
        n(d.charging);
      }, p = () => {
        i(d.level * 100);
      };
      return h(), p(), d.addEventListener("chargingchange", h), d.addEventListener("levelchange", p), () => {
        d.removeEventListener("chargingchange", h), d.removeEventListener("levelchange", p);
      };
    });
  }, []), y(() => {
    e && o && l(!1);
  }, [e, o]);
  const u = (d) => {
    d && r(), l(d);
  };
  let c = Yn;
  return s < 10 ? c = Xn : s < 35 ? c = qn : s < 65 ? c = Zn : s < 90 && (c = Jn), /* @__PURE__ */ g(me, { onOutsideClick: () => {
    u(!1);
  }, children: [
    /* @__PURE__ */ g("button", { className: S([ze.Button], "Taskbar", "Indicator", "Battery"), title: "Battery", tabIndex: 0, onClick: () => {
      u(!o);
    }, children: [
      t ? null : /* @__PURE__ */ a(O, { className: ze["Charging-indicator"], icon: Ke }),
      /* @__PURE__ */ a(O, { icon: c })
    ] }),
    /* @__PURE__ */ g(Qe, { active: o, setActive: l, className: ze.Menu, children: [
      /* @__PURE__ */ g("div", { children: [
        t ? null : /* @__PURE__ */ a(O, { className: ze["Charging-indicator"], icon: Ke }),
        /* @__PURE__ */ a(O, { icon: c })
      ] }),
      /* @__PURE__ */ g("p", { children: [
        Math.round(s),
        "%"
      ] })
    ] })
  ] });
}
const Gr = "_Button_l4a7x_1", Yr = "_Menu_l4a7x_12", Xr = "_Time_l4a7x_20", Ve = {
  Button: Gr,
  Menu: Yr,
  Time: Xr,
  Date: "_Date_l4a7x_20"
};
function qr({ hideUtilMenus: r, showUtilMenu: e }) {
  const [t, n] = w(/* @__PURE__ */ new Date()), [s, i] = w(!1);
  y(() => {
    const l = setInterval(() => {
      n(/* @__PURE__ */ new Date());
    }, s ? 500 : 3e4);
    return () => {
      clearInterval(l);
    };
  }, [s]), y(() => {
    r && s && i(!1);
  }, [r, s]);
  const o = (l) => {
    l && e(), i(l);
  };
  return /* @__PURE__ */ g(me, { onOutsideClick: () => {
    o(!1);
  }, children: [
    /* @__PURE__ */ g("button", { className: S([Ve.Button], "Taskbar", "Indicator", "Calendar"), title: "Date & Time", tabIndex: 0, onClick: () => {
      o(!s);
    }, children: [
      /* @__PURE__ */ a("p", { children: t.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }) }),
      /* @__PURE__ */ a("p", { children: t.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) })
    ] }),
    /* @__PURE__ */ g(Qe, { active: s, setActive: i, className: Ve.Menu, children: [
      /* @__PURE__ */ a("p", { className: Ve.Time, children: t.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      }) }),
      /* @__PURE__ */ a("p", { className: Ve.Date, children: t.toLocaleString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }) })
    ] })
  ] });
}
const Zr = "_Menu_vin43_1", Jr = {
  Menu: Zr
};
function Qr({ hideUtilMenus: r, showUtilMenu: e }) {
  const [t, n] = w(!1);
  y(() => {
    r && t && n(!1);
  }, [r, t]);
  const s = (i) => {
    i && e(), n(i);
  };
  return /* @__PURE__ */ g(me, { onOutsideClick: () => {
    s(!1);
  }, children: [
    /* @__PURE__ */ a("button", { title: "Network", className: S([], "Taskbar", "Indicator", "Network"), tabIndex: 0, onClick: () => {
      s(!t);
    }, children: /* @__PURE__ */ a(O, { icon: Ft }) }),
    /* @__PURE__ */ g(Qe, { active: t, setActive: n, className: Jr.Menu, children: [
      /* @__PURE__ */ a(O, { icon: Ft }),
      /* @__PURE__ */ a("p", { children: "Connected" })
    ] })
  ] });
}
const eo = "_Menu_vin43_1", to = {
  Menu: eo
};
function no({ hideUtilMenus: r, showUtilMenu: e }) {
  const [t, n] = w(!1);
  y(() => {
    r && t && n(!1);
  }, [r, t]);
  const s = (i) => {
    i && e(), n(i);
  };
  return /* @__PURE__ */ g(me, { onOutsideClick: () => {
    s(!1);
  }, children: [
    /* @__PURE__ */ a("button", { title: "Volume", className: S([], "Taskbar", "Indicator", "Volume"), tabIndex: 0, onClick: () => {
      s(!t);
    }, children: /* @__PURE__ */ a(O, { icon: Pt }) }),
    /* @__PURE__ */ g(Qe, { active: t, setActive: n, className: to.Menu, children: [
      /* @__PURE__ */ a(O, { icon: Pt }),
      /* @__PURE__ */ a("p", { children: "100%" })
    ] })
  ] });
}
function Dn() {
  const { systemName: r, skin: e } = K(), t = le(null), [n, s] = w(""), { showHome: i, setShowHome: o, showSearch: l, setShowSearch: u, setHideUtilMenus: c } = Rt(), d = (f) => {
    o(f), f && (u(!1), c(!0));
  }, h = (f) => {
    u(f), f ? (n !== "" && s(""), o(!1), c(!0), t.current && (t.current.focus(), window.scrollTo(0, document.body.scrollHeight))) : setTimeout(() => {
      l || s("");
    }, 200);
  }, p = (f) => {
    h(!0);
  };
  return /* @__PURE__ */ g("div", { className: S([J.MenuIcons], "Taskbar", "MenuIcons"), children: [
    /* @__PURE__ */ a("div", { className: J.HomeContainer, children: /* @__PURE__ */ g(me, { onOutsideClick: () => {
      d(!1);
    }, children: [
      /* @__PURE__ */ a(
        "button",
        {
          className: S([J.MenuButton, J.HomeButton], "Taskbar", "HomeIcon"),
          title: "Home",
          tabIndex: 0,
          onClick: () => {
            d(!i);
          },
          children: e.systemIcon.endsWith(".svg") ? /* @__PURE__ */ a(Pe, { src: e.systemIcon }) : /* @__PURE__ */ a("img", { src: e.systemIcon, alt: r })
        }
      ),
      /* @__PURE__ */ a(Gi, { active: i, setActive: d, search: p })
    ] }) }),
    /* @__PURE__ */ a("div", { className: J.SearchContainer, children: /* @__PURE__ */ g(me, { onOutsideClick: () => {
      h(!1);
    }, children: [
      /* @__PURE__ */ a(
        "button",
        {
          className: S([J.MenuButton], "Taskbar", "SearchIcon"),
          title: "Search",
          tabIndex: 0,
          onClick: () => {
            h(!l);
          },
          children: /* @__PURE__ */ a(O, { icon: Qn })
        }
      ),
      /* @__PURE__ */ a(
        Ji,
        {
          active: l,
          setActive: h,
          searchQuery: n,
          setSearchQuery: s,
          inputRef: t
        }
      )
    ] }) })
  ] });
}
function Rn({ renderApp: r = _r }) {
  const [e, t] = w([]), n = Te(), s = yn(), i = Nt({ sort: !1 }), o = le(null), { boxShadow: l, onUpdate: u } = Sn({ ref: o, shadow: {
    offset: 20,
    blurRadius: 10,
    spreadRadius: -10,
    color: { a: 25 }
  } });
  return y(() => {
    n?.getSettings(pe.TASKBAR)?.get("pins", (d) => {
      const h = d.split(","), p = [...i].sort((f, m) => {
        const E = h.indexOf(f.id), x = h.indexOf(m.id);
        return E < 0 && x > 0 ? 1 : E > 0 && x < 0 ? -1 : E < 0 && x < 0 ? 0 : E - x;
      }).map((f) => (f.isPinned = h.includes(f.id), f));
      t(p);
    });
  }, [i, n]), /* @__PURE__ */ a("div", { className: S([J.AppIconsContainer], "Taskbar", "AppIcons"), "data-allow-context-menu": !0, style: { boxShadow: l }, children: /* @__PURE__ */ a(
    "div",
    {
      className: J.AppIcons,
      "data-allow-context-menu": !0,
      onScroll: u,
      ref: o,
      children: e.map((c) => {
        if (s == null) return;
        const d = s.some((p) => p.app?.id === c.id), h = c.isPinned || d;
        return /* @__PURE__ */ a(
          r,
          {
            app: c,
            active: d,
            visible: h
          },
          c.id
        );
      })
    }
  ) });
}
function On() {
  const { showUtilMenus: r, hideUtilMenus: e } = Rt(), t = Ee();
  return /* @__PURE__ */ g("div", { className: S([J.UtilIcons], "Taskbar", "UtilIcons"), children: [
    /* @__PURE__ */ a(Mn, {}),
    /* @__PURE__ */ a(Qr, { showUtilMenu: r, hideUtilMenus: e }),
    /* @__PURE__ */ a(no, { showUtilMenu: r, hideUtilMenus: e }),
    /* @__PURE__ */ a(qr, { showUtilMenu: r, hideUtilMenus: e }),
    /* @__PURE__ */ a(
      "button",
      {
        title: "Show Desktop",
        className: S([J.DesktopButton], "Taskbar", "UtilIcon", "Desktop"),
        onClick: () => {
          t?.minimizeAll();
        }
      }
    )
  ] });
}
function so({ children: r, ...e }) {
  const { taskbarConfig: t, appsConfig: n } = K(), [s, i] = w(!1), [o, l] = w(!1), [u, c] = w(!1), d = Ee(), h = Mt({ groupIndex: fe.GROUPS.TASKBAR, index: 0 }), p = n.getAppByRole(q.APP_ROLES.settings), { onContextMenu: f } = be({
    Actions: (x) => /* @__PURE__ */ a(Se, { avoidTaskbar: !1, ...x, children: p != null && /* @__PURE__ */ a(G, { label: `Open ${p.name}`, icon: p.iconUrl, onTrigger: () => {
      d?.open(p.id);
    } }) })
  }), m = () => {
    i(!1), l(!1), c(!1);
  }, E = [];
  return s && E.push("HomeActive"), /* @__PURE__ */ a(
    "div",
    {
      style: { "--taskbar-height": `${t.height}px`, zIndex: h },
      className: S([J.Taskbar], "Taskbar", void 0, E),
      "data-allow-context-menu": !0,
      onContextMenu: (x) => {
        x.target.getAttribute("data-allow-context-menu") && f(x);
      },
      children: /* @__PURE__ */ a(
        Kr,
        {
          context: { showHome: s, setShowHome: i, showSearch: o, setShowSearch: l, hideUtilMenus: u, setHideUtilMenus: c, showUtilMenus: m },
          defaults: { Menus: Dn, Apps: Rn, Utils: On },
          slots: e,
          children: r
        }
      )
    }
  );
}
const io = jt(de(so), {
  /** Components that renders the home and search menus in the taskbar. */
  Menus: Dn,
  /** Components that renders the pinned and active applications in the taskbar. */
  Apps: Rn,
  /** Component that renders the indicators in the taskbar. */
  Utils: jt(On, {
    /** Components that renders the battery indicator in the taskbar. */
    Battery: Mn
  }, "Utils")
}, "Taskbar"), ro = "_Minimized_1w3qi_8", oo = "_Maximized_1w3qi_21", ao = "_Header_1w3qi_80", ae = {
  "Window-container": "_Window-container_1w3qi_1",
  Minimized: ro,
  Maximized: oo,
  "Window-inner": "_Window-inner_1w3qi_27",
  Header: ao,
  "Window-icon": "_Window-icon_1w3qi_94",
  "Header-button": "_Header-button_1w3qi_121",
  "Exit-button": "_Exit-button_1w3qi_140",
  "Window-content": "_Window-content_1w3qi_148"
};
function Ce() {
  return /* @__PURE__ */ a("div", { className: S([W.Divider], "Actions", "Divider") });
}
const lo = "_Share_14fca_1", co = "_Top_14fca_12", uo = "_Bottom_14fca_12", ho = "_Title_14fca_25", po = "_FormContainer_14fca_32", fo = "_Form_14fca_32", mo = "_Label_14fca_58", go = "_Input_14fca_77", wo = "_Checkbox_14fca_108", Eo = "_Url_14fca_138", xo = "_Button_14fca_146", X = {
  Share: lo,
  Top: co,
  Bottom: uo,
  Title: ho,
  FormContainer: po,
  Form: fo,
  Label: mo,
  Input: go,
  Checkbox: wo,
  Url: Eo,
  Button: xo
};
function So({ name: r, label: e, setOption: t }) {
  const [n, s] = w(""), i = (o) => {
    const l = o.target.value;
    s(l), t(r, l);
  };
  return /* @__PURE__ */ g("label", { className: X.Label, children: [
    /* @__PURE__ */ g("p", { children: [
      e,
      ":"
    ] }),
    /* @__PURE__ */ a("input", { className: X.Input, name: r, type: "text", value: n, onChange: i })
  ] });
}
const _o = {
  terminal: [
    {
      label: "Command",
      name: "input"
    },
    {
      label: "Path",
      name: "path"
    }
  ],
  browser: [
    {
      label: "Website",
      name: "url"
    }
  ],
  "file-explorer": [
    {
      label: "Path",
      name: "path"
    }
  ],
  "text-editor": [
    {
      label: "Path",
      name: "path"
    }
  ]
};
function Fn({ modal: r, params: e, ...t }) {
  const { appsConfig: n } = K(), [s, i] = w(e?.appId ?? ""), [o, l] = w(e?.fullscreen ?? !1), [u, c] = w(e?.standalone ?? !1), [d, h] = w({}), [p, f] = w(null), { alert: m } = Tn(), E = le(null), { boxShadow: x, onUpdate: M } = Sn({
    ref: E,
    horizontal: !1,
    dynamicOffsetFactor: 1,
    shadow: {
      offset: 20,
      blurRadius: 10,
      spreadRadius: -10,
      color: { a: 25 }
    }
  });
  y(() => {
    f(_t({
      appId: s !== "" ? s : void 0,
      fullscreen: o,
      standalone: u,
      ...d
    }));
  }, [s, o, u, d]), y(() => {
    M({ target: E.current });
  }, [s]);
  const k = (P) => {
    const I = P.target.value;
    I !== s && i(I);
  }, D = (P) => {
    const I = P.target.checked;
    l(I);
  }, F = (P) => {
    const I = P.target.checked;
    c(I);
  }, N = (P, I) => {
    h((V = {}) => (V = { ...V }, V[P] = I, V));
  };
  return /* @__PURE__ */ g(Nn, { className: X.Share, modal: r, params: {
    ...e,
    title: "Share",
    iconUrl: Ae.getModalIconUrl("share")
  }, ...t, children: [
    /* @__PURE__ */ g("div", { className: X.Top, children: [
      /* @__PURE__ */ a("h1", { className: X.Title, children: "Share options" }),
      /* @__PURE__ */ a("div", { className: X.FormContainer, style: { boxShadow: x }, children: /* @__PURE__ */ g(
        "form",
        {
          className: X.Form,
          onScroll: M,
          ref: E,
          children: [
            /* @__PURE__ */ g("label", { className: X.Label, children: [
              /* @__PURE__ */ a("p", { children: "App:" }),
              /* @__PURE__ */ g("select", { className: X.Input, name: "app", value: s, onChange: k, children: [
                /* @__PURE__ */ a("option", { value: "", children: "(None)" }),
                n.apps.map(
                  ({ name: P, id: I }) => /* @__PURE__ */ a("option", { value: I, children: P }, I)
                )
              ] })
            ] }),
            s !== "" ? /* @__PURE__ */ g("label", { className: X.Label, children: [
              /* @__PURE__ */ a("p", { children: "Standalone:" }),
              /* @__PURE__ */ a(
                "input",
                {
                  className: X.Input,
                  name: "standalone",
                  type: "checkbox",
                  checked: u,
                  value: u.toString(),
                  onChange: F
                }
              ),
              /* @__PURE__ */ a("div", { className: X.Checkbox, children: u ? /* @__PURE__ */ a(O, { icon: dt }) : /* @__PURE__ */ a(O, { icon: ht }) })
            ] }) : null,
            s !== "" ? /* @__PURE__ */ g("label", { className: X.Label, children: [
              /* @__PURE__ */ a(
                "input",
                {
                  className: X.Input,
                  name: "fullscreen",
                  type: "checkbox",
                  checked: o,
                  disabled: u,
                  value: o.toString(),
                  onChange: D
                }
              ),
              /* @__PURE__ */ a("p", { children: "Fullscreen:" }),
              /* @__PURE__ */ a("div", { className: X.Checkbox, children: o ? /* @__PURE__ */ a(O, { icon: dt }) : /* @__PURE__ */ a(O, { icon: ht }) })
            ] }) : null,
            _o[s]?.map(
              ({ label: P, name: I }) => /* @__PURE__ */ a(So, { name: I, label: P, setOption: N }, I)
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ g("div", { className: X.Bottom, children: [
      /* @__PURE__ */ a("p", { className: `${X.Url} ${se.TextLight}`, children: p }),
      /* @__PURE__ */ a(
        Dt,
        {
          className: `${X.Button} ${se.TextBold}`,
          onClick: () => {
            Ns(p, () => {
              m({
                title: "Share",
                iconUrl: Ae.getModalIconUrl("share"),
                text: "Copied to clipboard!"
              });
            }, () => {
              m({
                title: "Share",
                iconUrl: Ae.getModalIconUrl("share"),
                text: "Failed to copy."
              });
            });
          },
          children: "Copy"
        }
      )
    ] })
  ] });
}
function Io({ error: r, app: e, closeWindow: t }) {
  const { appsConfig: n } = K(), { alert: s } = Tn(), [i, o] = w(!1);
  y(() => {
    i || (o(!0), t?.(), e != null && r != null && s({
      title: `${e.name} has stopped working`,
      text: r instanceof Error ? `${r.name}: ${r.message}` : "Unknown error",
      iconUrl: n.getAppById(e.id)?.iconUrl,
      size: new z(350, 150),
      single: !0
    }));
  }, [i, s, e?.id, e?.name, r, t]);
}
const vo = de(({ id: r, app: e, size: t, position: n, options: s, active: i, fullscreen: o, minimized: l, toggleMinimized: u, index: c }) => {
  const { systemName: d, windowsConfig: h, appsConfig: p } = K(), f = Ee(), m = le(null), { openWindowedModal: E } = Tt(), [x, M] = w(n), [k, D] = w(o ?? !1), [F, N] = kt(), [P, I] = w(e?.name ?? ""), [V, Q] = w(e ? p.getAppById(e.id)?.iconUrl ?? "" : ""), H = Mt({ groupIndex: fe.GROUPS.WINDOWS, index: c ?? 0 }), { onContextMenu: C, ShortcutsListener: T } = be({
    Actions: (L) => /* @__PURE__ */ g(Se, { ...L, children: [
      /* @__PURE__ */ a(G, { label: "Minimize", icon: Ke, onTrigger: () => {
        u?.();
      } }),
      /* @__PURE__ */ a(G, { label: "Maximize", icon: on, shortcut: ["F11"], onTrigger: () => {
        D(!k);
      } }),
      /* @__PURE__ */ a(G, { label: "Close", icon: an, shortcut: ["Control", "q"], onTrigger: () => {
        Y?.();
      } }),
      /* @__PURE__ */ a(Ce, {}),
      /* @__PURE__ */ a(G, { label: "Standalone mode", icon: ts, onTrigger: () => {
        e != null && It(_t({ appId: e.id, standalone: !0 }), "_self");
      } }),
      /* @__PURE__ */ a(G, { label: "Share", icon: Ae.getModalIconUrl("share"), shortcut: ["Alt", "s"], onTrigger: () => {
        e != null && E({
          appId: e.id,
          fullscreen: k,
          size: new z(350, 350),
          Modal: (he) => /* @__PURE__ */ a(Fn, { ...he })
        });
      } })
    ] })
  });
  if (y(() => {
    F == null || N == null || (F < h.minScreenSize.x || N < h.minScreenSize.y ? D(!0) : n != null ? (n.x > F && (n.x = 0), n.y > N && (n.y = 0), M(n)) : M(new z(0, 0)));
  }, [n, t, N, F]), y(() => {
    const L = () => {
      fn(`${P} | ${d}`), St(V);
    };
    return i && !l && L(), window.addEventListener("focus", L), () => {
      window.removeEventListener("focus", L);
    };
  }, [i, l, V, P]), e == null)
    return;
  const Y = te(((L) => {
    L?.preventDefault(), r != null && f?.close(r);
  }), [f, r]), re = te(((L, he = !1) => {
    if (r === void 0) return;
    if (he) {
      f?.focus(r);
      return;
    }
    if (L?.defaultPrevented)
      return;
    const oe = L?.target;
    (L == null || oe == null || oe.closest(".Handle") == null || oe.closest("button") == null) && f?.focus(r);
  }), [f, r]), xe = [ae["Window-container"]];
  return k && xe.push(ae.Maximized), l && xe.push(ae.Minimized), /* @__PURE__ */ g("div", { style: { zIndex: H, position: k ? void 0 : "relative" }, children: [
    /* @__PURE__ */ a(T, {}),
    /* @__PURE__ */ a(
      ln,
      {
        axis: "both",
        handle: ".Window-handle",
        defaultPosition: x?.round(),
        position: void 0,
        scale: 1,
        bounds: {
          top: 0,
          bottom: (N ?? 0) - 55,
          left: t ? -t.x + 85 : 85,
          right: (F ?? 0) - 5
        },
        cancel: "button",
        nodeRef: m,
        disabled: k,
        onStart: (L) => {
          re(L);
        },
        grid: [1, 1],
        children: /* @__PURE__ */ a(
          "div",
          {
            className: S(xe, "WindowView"),
            ref: m,
            onClick: re,
            children: /* @__PURE__ */ g(
              "div",
              {
                className: ae["Window-inner"],
                style: {
                  width: k || t == null ? void 0 : t.x,
                  height: k || t == null ? void 0 : t.y
                },
                children: [
                  /* @__PURE__ */ g(
                    "div",
                    {
                      className: S([ae.Header, "Window-handle"], "WindowHeader"),
                      onContextMenu: C,
                      onDoubleClick: (L) => {
                        D(!k), re(L, !0);
                      },
                      children: [
                        /* @__PURE__ */ a(
                          Me,
                          {
                            className: S([ae["Window-icon"]], "WindowIcon"),
                            src: V
                          }
                        ),
                        /* @__PURE__ */ a("p", { className: S([se.TextSemibold], "WindowTitle"), children: P }),
                        /* @__PURE__ */ a(
                          "button",
                          {
                            "aria-label": "Minimize",
                            className: ae["Header-button"],
                            tabIndex: 0,
                            id: "minimize-window",
                            onClick: (L) => {
                              u?.(L);
                            },
                            children: /* @__PURE__ */ a(O, { icon: Ke })
                          }
                        ),
                        F != null && N != null && F > h.minScreenSize.x && N > h.minScreenSize.y ? /* @__PURE__ */ a(
                          "button",
                          {
                            "aria-label": "Maximize",
                            className: ae["Header-button"],
                            tabIndex: 0,
                            id: "maximize-window",
                            onClick: (L) => {
                              L.preventDefault(), D(!k), re(L, !0);
                            },
                            children: /* @__PURE__ */ a(O, { icon: k ? es : cs })
                          }
                        ) : null,
                        /* @__PURE__ */ a(
                          "button",
                          {
                            "aria-label": "Close",
                            className: `${ae["Header-button"]} ${ae["Exit-button"]}`,
                            tabIndex: 0,
                            id: "close-window",
                            onClick: Y,
                            children: /* @__PURE__ */ a(O, { icon: rn })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ a("div", { className: S([ae["Window-content"]], "WindowContent"), children: /* @__PURE__ */ a(
                    ds,
                    {
                      FallbackComponent: (L) => /* @__PURE__ */ a(Io, { app: e, closeWindow: Y, ...L }),
                      onError: (L) => {
                        console.error(L);
                      },
                      children: /* @__PURE__ */ a(
                        e.WindowContent,
                        {
                          ...s,
                          app: e,
                          setTitle: I,
                          setIconUrl: Q,
                          close: Y,
                          focus: re,
                          active: i,
                          standalone: !1
                        }
                      )
                    }
                  ) })
                ]
              }
            )
          }
        )
      },
      r
    )
  ] });
}), yo = de(() => {
  const { systemName: r, tagLine: e, skin: t } = K(), n = Te(), s = yn(), i = Ee(), [o, l] = w([]);
  return y(() => {
    s != null && l([...s].sort(
      (u, c) => (u.lastInteraction ?? 0) - (c.lastInteraction ?? 0)
    ));
  }, [s]), y(() => {
    const u = () => {
      fn(`${r} | ${e}`), St(t.systemIcon);
    };
    return (o.length === 0 || o[o.length - 1].minimized) && u(), window.addEventListener("blur", u), () => {
      window.removeEventListener("blur", u);
    };
  }, [o]), y(() => {
    if (i?.startupComplete)
      return;
    let u = [];
    const c = mn(), d = c.app;
    d && u.push(d), delete c.app, n?.getSettings(pe.APPS)?.get("startup", (p) => {
      p !== "" && (u = p.split(",").concat(u), u = Un(u)), i?.startup(u, c);
    });
  }, [n, i]), /* @__PURE__ */ a("div", { className: S([], "WindowsView"), children: s?.map((u) => {
    const { id: c, app: d, size: h, position: p, options: f, minimized: m, fullscreen: E } = u, x = o.indexOf(u);
    return /* @__PURE__ */ a(
      vo,
      {
        active: x === o.length - 1,
        id: c,
        app: d,
        size: h,
        index: x,
        position: p,
        options: f,
        minimized: m,
        toggleMinimized: (M) => {
          M?.preventDefault(), M?.stopPropagation(), i?.setMinimized(c, !m);
        },
        fullscreen: E
      },
      c
    );
  }) });
}), Co = "_Desktop_1au3h_1", Ao = "_Wallpaper_1au3h_10", bo = "_Content_1au3h_20", ko = "_Item_1au3h_38", Fe = {
  Desktop: Co,
  Wallpaper: Ao,
  Content: bo,
  Item: ko
};
function No({ actionId: r, label: e, shortcut: t, initialValue: n = !1, onTrigger: s }) {
  const [i, o] = w(n);
  return /* @__PURE__ */ g("button", { className: S([W.Button], "Actions", "Toggle", i ? "Active" : void 0), tabIndex: 0, onClick: (l) => {
    s?.(l, !i), o(!i);
  }, children: [
    /* @__PURE__ */ g("span", { className: S([W.Label], "Actions", "Label"), children: [
      /* @__PURE__ */ a("div", { className: W.Icon, children: i ? /* @__PURE__ */ a(O, { icon: dt }) : /* @__PURE__ */ a(O, { icon: ht }) }),
      /* @__PURE__ */ a("p", { children: e })
    ] }),
    t && /* @__PURE__ */ a("p", { className: W.Shortcut, children: Xe(t) })
  ] }, r);
}
function To({ label: r, icon: e, children: t, showOnHover: n = !0 }) {
  const [s, i] = w(!1), o = [W.Dropdown];
  return s && o.push(W.Active), /* @__PURE__ */ a(me, { onOutsideClick: () => {
    n || i(!1);
  }, children: /* @__PURE__ */ g(
    "div",
    {
      className: S(o, "Actions", "Dropdown"),
      tabIndex: 0,
      onMouseEnter: () => {
        n && i(!0);
      },
      onMouseLeave: () => {
        n && i(!1);
      },
      onClick: () => {
        n || i(!s);
      },
      children: [
        /* @__PURE__ */ g("span", { className: S([W.Label], "Actions", "Label"), children: [
          e && /* @__PURE__ */ a("div", { className: W.Icon, children: /* @__PURE__ */ a(O, { icon: e }) }),
          /* @__PURE__ */ a("p", { children: r })
        ] }),
        /* @__PURE__ */ a("div", { className: W.DropdownArrow, children: /* @__PURE__ */ a(O, { icon: ns }) }),
        /* @__PURE__ */ a("div", { className: S([W.DropdownContent], "Actions", "Content"), children: t })
      ]
    },
    r
  ) });
}
function Zt({ actionId: r, options: e, initialIndex: t = 0, onTrigger: n }) {
  const [s, i] = w(t);
  return /* @__PURE__ */ a("div", { className: S([], "Actions", "Radio"), children: e.map(
    ({ label: o, shortcut: l }, u) => /* @__PURE__ */ g("button", { className: W.Button, tabIndex: 0, onClick: (c) => {
      i(u), n?.(c, u);
    }, children: [
      /* @__PURE__ */ g("span", { className: S([W.Label], "Actions", "Label"), children: [
        /* @__PURE__ */ a("div", { className: W.Icon, children: s === u ? /* @__PURE__ */ a(O, { icon: ss }) : /* @__PURE__ */ a(O, { icon: us }) }),
        /* @__PURE__ */ a("p", { children: o })
      ] }),
      l && /* @__PURE__ */ a("p", { className: W.Shortcut, children: Xe(l) })
    ] }, o)
  ) }, r);
}
const Mo = de(() => {
  const { desktopConfig: r, skin: e, appsConfig: t } = K(), n = Te(), s = Ee(), i = Le(), [o, l] = w(null), [u, c] = w(!1), [d, h] = w(r.defaultIconSize), [p, f] = w(r.defaultIconDirection), { openWindowedModal: m } = Tt(), E = i?.navigate("~/Desktop"), x = t.getAppByRole(q.APP_ROLES.fileExplorer), M = t.getAppByRole(q.APP_ROLES.terminal), k = t.getAppByRole(q.APP_ROLES.settings), { onContextMenu: D, ShortcutsListener: F } = be({
    Actions: (H) => /* @__PURE__ */ g(Se, { ...H, children: [
      /* @__PURE__ */ g(To, { label: "View", icon: is, children: [
        /* @__PURE__ */ a(Zt, { initialIndex: d, onTrigger: (C, T, Y) => {
          n?.getSettings(pe.DESKTOP)?.set("icon-size", Y);
        }, options: [
          { label: "Small icons" },
          { label: "Medium icons" },
          { label: "Large icons" }
        ] }),
        /* @__PURE__ */ a(Ce, {}),
        /* @__PURE__ */ a(Zt, { initialIndex: p, onTrigger: (C, T, Y) => {
          n?.getSettings(pe.DESKTOP)?.set("icon-direction", Y);
        }, options: [
          { label: "Align vertically" },
          { label: "Align horizontally" }
        ] }),
        /* @__PURE__ */ a(Ce, {}),
        /* @__PURE__ */ a(No, { label: "Show dekstop icons", initialValue: u, onTrigger: () => {
          n?.getSettings(pe.DESKTOP)?.set("show-icons", (!u).toString());
        } })
      ] }),
      /* @__PURE__ */ a(G, { label: "Reload", shortcut: ["Control", "r"], icon: rs, onTrigger: () => {
        ks();
      } }),
      /* @__PURE__ */ a(
        G,
        {
          label: document.fullscreenElement ? "Exit fullscreen" : "Enter fullscreen",
          shortcut: ["F11"],
          icon: document.fullscreenElement ? os : on,
          onTrigger: () => {
            s?.isAnyFocused() || (document.fullscreenElement ? document.exitFullscreen().catch((C) => {
              console.error(C);
            }) : document.body.requestFullscreen().catch((C) => {
              console.error(C);
            }));
          }
        }
      ),
      k != null && /* @__PURE__ */ a(G, { label: "Change appearance", icon: as, onTrigger: () => {
        s?.open(k.id, { tab: 1 });
      } }),
      /* @__PURE__ */ a(Ce, {}),
      x != null && /* @__PURE__ */ a(G, { label: `Open in ${x.name}`, icon: x.iconUrl, onTrigger: () => {
        s?.open(x.id, { path: E?.path });
      } }),
      M != null && /* @__PURE__ */ a(G, { label: `Open in ${M.name}`, icon: M.iconUrl, onTrigger: () => {
        s?.open(M.id, { path: E?.path });
      } }),
      /* @__PURE__ */ a(Ce, {}),
      /* @__PURE__ */ a(G, { label: "Share", icon: Ae.getModalIconUrl("share"), onTrigger: () => {
        m({
          size: new z(350, 350),
          Modal: (C) => /* @__PURE__ */ a(Fn, { ...C })
        });
      } })
    ] })
  }), { onContextMenu: N } = be({
    Actions: (H) => /* @__PURE__ */ g(Se, { ...H, children: [
      /* @__PURE__ */ a(G, { label: "Open", onTrigger: (C, T) => {
        s != null && T.open(s);
      } }),
      x != null && /* @__PURE__ */ a(G, { label: `Reveal in ${x.name}`, icon: x.iconUrl, onTrigger: (C, T) => {
        s != null && T.parent?.open(s);
      } }),
      /* @__PURE__ */ a(G, { label: "Delete", icon: Lt, onTrigger: (C, T) => {
        T.delete();
      } })
    ] })
  }), { onContextMenu: P } = be({
    Actions: (H) => /* @__PURE__ */ g(Se, { ...H, children: [
      /* @__PURE__ */ a(G, { label: "Open", onTrigger: (C, T) => {
        s != null && T.open(s);
      } }),
      x != null && /* @__PURE__ */ a(G, { label: `Open in ${x.name}`, icon: x.iconUrl, onTrigger: (C, T) => {
        s?.open(x.id, { path: T.path });
      } }),
      M != null && /* @__PURE__ */ a(G, { label: `Open in ${M.name}`, icon: M.iconUrl, onTrigger: (C, T) => {
        s != null && T.parent?.open(s);
      } }),
      /* @__PURE__ */ a(Ce, {}),
      /* @__PURE__ */ a(G, { label: "Delete", icon: Lt, onTrigger: (C, T) => {
        T.delete();
      } })
    ] })
  });
  y(() => {
    const H = n?.getSettings(pe.DESKTOP);
    H?.get("wallpaper", l), H?.get("show-icons", (C) => {
      c(C === "true");
    }), H?.get("icon-size", (C) => {
      tt(C) && h(parseInt(C));
    }), H?.get("icon-direction", (C) => {
      tt(C) && f(parseInt(C));
    });
  }, [n]);
  const I = () => {
    n?.getSettings(pe.DESKTOP)?.set("wallpaper", e.defaultWallpaper);
  }, V = 1 + ((tt(d) ? d : r.defaultIconSize) - 1) / 5, Q = S([Fe.Wallpaper], "Desktop", "Wallpaper");
  return /* @__PURE__ */ g(Et, { children: [
    /* @__PURE__ */ a(F, {}),
    /* @__PURE__ */ g(
      "div",
      {
        className: S([Fe.Desktop], "Desktop"),
        onContextMenu: D,
        children: [
          u && /* @__PURE__ */ a(
            Fr,
            {
              directory: E,
              className: Fe.Content,
              style: {
                "--scale": `${V}rem`,
                "--direction": p == 1 ? "row" : "column"
              },
              fileClassName: Fe.Item,
              folderClassName: Fe.Item,
              onOpenFile: (H, C) => {
                H.preventDefault();
                const T = {};
                C.name === "Info.md" && (T.size = new z(575, 675)), C.extension === "md" && (T.mode = "view"), s?.openFile(C, T);
              },
              onOpenFolder: (H, C) => {
                x != null && s?.open(x.id, {
                  path: C.linkedPath ?? C.path
                });
              },
              onContextMenuFile: N,
              onContextMenuFolder: P
            }
          ),
          o ? /* @__PURE__ */ a(
            "img",
            {
              src: o,
              className: Q,
              alt: "Desktop wallpaper",
              onError: I
            }
          ) : null
        ]
      }
    )
  ] });
});
function Fa({ children: r }) {
  return /* @__PURE__ */ a("p", { className: S([W.TextDisplay], "Actions", "Text"), children: r });
}
const Do = "_ModalView_tyrlb_1", Ro = {
  ModalView: Do
}, Oo = de(({ modal: r }) => {
  if (y(() => {
    const n = (s) => {
      s.key === "Escape" && r?.close();
    };
    return document.addEventListener("keydown", n), () => {
      document.removeEventListener("keydown", n);
    };
  }, [r]), r?.element == null) return;
  const e = r.element, t = () => /* @__PURE__ */ a(
    "div",
    {
      className: S([Ro.ModalView], "ModalView"),
      style: { "--position-x": r.position.x, "--position-y": r.position.y },
      children: /* @__PURE__ */ a(e, { modal: r, ...r.props })
    }
  );
  return r.dismissible ? /* @__PURE__ */ a(me, { onOutsideClick: () => {
    r.close();
  }, children: /* @__PURE__ */ a(t, {}) }) : /* @__PURE__ */ a(t, {});
}), Fo = "_ModalsView_1t8jt_1", Po = {
  ModalsView: Fo
}, Pn = de(() => {
  const r = le(null), e = ri(), t = qe(), [n, s] = w([]);
  return y(() => {
    e != null && s([...e].sort(
      (i, o) => (i.lastInteraction ?? 0) - (o.lastInteraction ?? 0)
    ));
  }, [e]), y(() => {
    t != null && (t.containerRef = r);
  }, [t, r]), /* @__PURE__ */ a("div", { ref: r, className: S([Po.ModalsView], "ModalsView"), children: n.map(
    (i) => /* @__PURE__ */ a(Oo, { modal: i }, i.id)
  ) });
});
function Lo() {
  return /* @__PURE__ */ g(Et, { children: [
    /* @__PURE__ */ a(io, {}),
    /* @__PURE__ */ a(yo, {}),
    /* @__PURE__ */ a(Pn, {}),
    /* @__PURE__ */ a(Mo, {})
  ] });
}
const Bo = "_StandaloneView_mfmlq_1", Uo = "_StandaloneWindow_mfmlq_10", Jt = {
  StandaloneView: Bo,
  StandaloneWindow: Uo
}, $o = "_Header_6mqb7_1", Wo = "_Logo_6mqb7_10", zo = "_ExitButton_6mqb7_51", ct = {
  Header: $o,
  Logo: Wo,
  ExitButton: zo
};
function Vo({ exit: r }) {
  const { systemName: e, skin: t } = K();
  return /* @__PURE__ */ g("header", { className: ct.Header, children: [
    /* @__PURE__ */ g("a", { className: ct.Logo, href: "/", tabIndex: 0, children: [
      /* @__PURE__ */ a(Pe, { src: t.systemIcon }),
      /* @__PURE__ */ a("h1", { children: e })
    ] }),
    /* @__PURE__ */ a(Dt, { className: ct.ExitButton, onClick: r, icon: an, children: "Exit" })
  ] });
}
function Ho({ app: r }) {
  const { systemName: e } = K(), [t, n] = w(r.name), [s, i] = w(r.iconUrl ?? "");
  y(() => {
    St(s);
  }, [s, t]);
  const o = mn(), l = te(() => {
    const u = _t({ appId: r.id });
    It(u, "_self");
  }, [r.id]);
  return /* @__PURE__ */ g("div", { className: Jt.StandaloneView, children: [
    /* @__PURE__ */ a(Pn, {}),
    /* @__PURE__ */ a(Vo, { exit: l }),
    /* @__PURE__ */ a("div", { className: Jt.StandaloneWindow, children: /* @__PURE__ */ a(
      r.WindowContent,
      {
        app: r,
        setTitle: n,
        setIconUrl: i,
        active: !0,
        standalone: !0,
        close: () => {
          l();
        },
        ...o
      }
    ) })
  ] });
}
const jo = "_NoRoute_1rria_1", Ko = "_Title_1rria_11", Go = "_Link_1rria_16", ut = {
  NoRoute: jo,
  Title: Ko,
  Link: Go
};
function Yo() {
  return /* @__PURE__ */ g("span", { className: ut.NoRoute, children: [
    /* @__PURE__ */ a("p", { className: `${ut.Title} ${se.TextSemibold}`, children: "404: Not Found" }),
    /* @__PURE__ */ a(Dt, { className: ut.Link, icon: ls, href: "/", target: "_self", children: "Home" })
  ] });
}
function Pa({ path: r = "/", homePage: e = /* @__PURE__ */ a(Lo, {}), fallbackPage: t = /* @__PURE__ */ a(Yo, {}), children: n }) {
  const { appsConfig: s } = K();
  return /* @__PURE__ */ a(fs, { children: /* @__PURE__ */ g(ms, { children: [
    /* @__PURE__ */ g(Ue, { path: r, children: [
      /* @__PURE__ */ a(Ue, { index: !0, element: e }),
      s.apps.map(
        (i) => /* @__PURE__ */ a(Ue, { path: i.id, element: /* @__PURE__ */ a(Ho, { app: i }) }, i.id)
      ),
      /* @__PURE__ */ a(Ue, { path: "*", element: t })
    ] }),
    n
  ] }) });
}
export {
  ma as ANSI_ASCII_LOGO,
  fa as ANSI_LOGO_COLOR,
  ga as APP_CATEGORIES,
  pa as ASCII_LOGO,
  hn as AUDIO_EXTENSIONS,
  Se as Actions,
  nt as App,
  q as AppsConfig,
  $s as ArithmeticParser,
  Dt as Button,
  ca as CODE_EXTENSIONS,
  G as ClickAction,
  da as Command,
  Lo as DefaultRoute,
  Mo as Desktop,
  Is as DesktopConfig,
  ji as DialogBox,
  Fr as DirectoryList,
  Ce as Divider,
  To as DropdownAction,
  Ma as DropdownButton,
  B as EXIT_CODE,
  yt as ExecutableResolver,
  ie as FILE_SCHEMES,
  zs as FileInputStream,
  Vs as FileOutputStream,
  mt as HOSTNAME,
  Ra as HeaderMenu,
  Ws as HistoryFlags,
  dn as IMAGE_EXTENSIONS,
  Me as Image,
  gt as ImagePreview,
  Xt as Interactable,
  ha as MAX_WIDTH,
  ua as MEDIA_EXTENSIONS,
  vs as MiscConfig,
  wn as Modal,
  xt as ModalsConfig,
  Ae as ModalsManager,
  Pn as ModalsView,
  Yo as NoRoute,
  me as OutsideClickListener,
  Da as ProgressBar,
  va as ProzillaOS,
  Zt as RadioAction,
  Pa as Router,
  pe as Settings,
  ge as SettingsManager,
  kn as SettingsManagerContext,
  Fn as Share,
  j as Shell,
  wa as ShellAST,
  $ as ShellEnvironment,
  Ct as ShellInterpreter,
  $e as ShellParser,
  Kt as Slot,
  Ho as StandaloneRoute,
  ne as Storage,
  Ea as StorageManager,
  R as Stream,
  Gs as SystemManager,
  xn as SystemManagerContext,
  io as Taskbar,
  ys as TaskbarConfig,
  Kr as TaskbarSlotsProvider,
  Fa as TextDisplay,
  pt as TimeManager,
  No as ToggleAction,
  Cs as TrackingConfig,
  Hs as TrackingManager,
  Cn as TrackingManagerContext,
  ft as USERNAME,
  pn as VIDEO_EXTENSIONS,
  Ua as Vector2,
  Ie as VirtualBase,
  Os as VirtualDriveConfig,
  je as VirtualDriveStorage,
  Z as VirtualFile,
  Ts as VirtualFileLink,
  ke as VirtualFolder,
  Ms as VirtualFolderLink,
  vt as VirtualRoot,
  En as VirtualRootContext,
  Wt as WELCOME_MESSAGE,
  Oa as WebView,
  vo as WindowView,
  Nn as WindowedModal,
  As as WindowsConfig,
  js as WindowsManager,
  In as WindowsManagerContext,
  yo as WindowsView,
  Ks as ZIndexGroup,
  fe as ZIndexManager,
  jt as attachSlots,
  bs as closeViewport,
  Ns as copyToClipboard,
  ki as createSlots,
  $t as downloadUrl,
  Xe as formatShortcut,
  _t as generateUrl,
  mn as getViewportParams,
  gn as isEmpty,
  _s as loadApp,
  bn as modalsManagerContext,
  It as openUrl,
  ks as reloadViewport,
  St as setViewportIcon,
  fn as setViewportTitle,
  Tn as useAlert,
  ya as useAppFolder,
  ba as useBoolSetting,
  S as useClassNames,
  be as useContextMenu,
  Ia as useFontMetrics,
  Sa as useHistory,
  Nt as useInstalledApps,
  ka as useIntSetting,
  bt as useKeyboardListener,
  Js as useLazyRef,
  Aa as useListSetting,
  Ki as useManualContextMenu,
  qe as useModalsManager,
  _a as useMouseListener,
  qs as useScreenBounds,
  kt as useScreenDimensions,
  Sn as useScrollWithShadow,
  Je as useSetting,
  Te as useSettingsManager,
  Na as useShell,
  Ys as useShortcuts,
  we as useSingleton,
  At as useSkin,
  Ta as useSkinOverrides,
  Zs as useStaticClassName,
  xa as useStorage,
  Ca as useStringSetting,
  K as useSystemManager,
  Rt as useTaskbarContext,
  si as useTrackingManager,
  Le as useVirtualRoot,
  Tt as useWindowedModal,
  Ee as useWindowsManager,
  Mt as useZIndex,
  se as utilStyles
};
//# sourceMappingURL=main.js.map
