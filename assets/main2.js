(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('._Main_1w5gc_1{position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;overflow:hidden;pointer-events:none}._Main_1w5gc_1>*{pointer-events:auto}._Taskbar_z2v4w_1{--svg-drop-shadow-color: var(--taskbar-color);position:fixed;display:flex;bottom:0;left:0;width:100%;height:var(--taskbar-height);margin-bottom:env(safe-area-inset-bottom)}._Taskbar_z2v4w_1:after,._Taskbar_z2v4w_1:before{content:"";position:absolute;top:0;bottom:calc(env(safe-area-inset-bottom,0)*-1);left:0;right:0;pointer-events:none}._Taskbar_z2v4w_1:after{opacity:var(--taskbar-opacity);background-color:var(--taskbar-color);z-index:-2}._Taskbar_z2v4w_1:before{-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);z-index:-3}._Taskbar_z2v4w_1 button{display:flex;align-items:center;color:var(--foreground-color-0);background:none;cursor:pointer;border:none;outline:none;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);z-index:-1}._Taskbar_z2v4w_1 button:hover,._Taskbar_z2v4w_1 button:focus-visible{background-color:var(--taskbar-button-hover-color)}._Menus_z2v4w_52{display:flex;align-items:center;height:100%}._WindowedModal_u6mt7_1{--header-height: 2.5rem;--header-button-hover-color: rgba(255, 255, 255, 5%);position:absolute;display:flex;flex-direction:column;min-width:300px;min-height:150px;background-color:var(--background-color-2)!important;resize:both;overflow:hidden}._Header_u6mt7_15{--window-icon-size: 1.5rem;--window-icon-margin: .75rem;display:flex;align-items:center;height:var(--header-height);padding:.25rem;padding-left:var(--window-icon-margin);padding-right:0;background-color:var(--background-color-1);cursor:grab}._Window-icon_u6mt7_29,._Window-icon_u6mt7_29>div,._Window-icon_u6mt7_29>div>svg{height:100%;width:auto}._Window-icon_u6mt7_29{height:var(--window-icon-size);margin-right:calc(var(--window-icon-margin) - .1rem)}._Window-icon_u6mt7_29>div{display:flex;align-items:center}._Header_u6mt7_15>p{-webkit-user-select:none;user-select:none;width:auto;margin:0 auto 0 0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._Header-button_u6mt7_56{display:flex;align-items:center;justify-content:center;height:var(--header-height);margin:0;padding:.75rem;color:var(--foreground-color-0);background:none;cursor:pointer;border:none;outline:none;aspect-ratio:1}._Header-button_u6mt7_56>svg{height:100%}._Exit-button_u6mt7_75{--header-button-hover-color: var(--red-0)}._Header-button_u6mt7_56:hover,._Header-button_u6mt7_56:focus-visible{background-color:var(--header-button-hover-color)}._Window-content_u6mt7_83{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;overflow:hidden}._TextRegular_wjx57_1{font-size:1em;font-weight:400;letter-spacing:normal}._TextLight_wjx57_7{color:var(--foreground-color-1);font-size:.875em;font-weight:400;letter-spacing:normal}._TextSemibold_wjx57_14{font-weight:500;letter-spacing:normal}._TextBold_wjx57_19{font-weight:600;letter-spacing:normal}._DialogContent_lop64_1{position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;overflow:hidden}._DialogContent_lop64_1 button{margin-bottom:.75rem;padding:.5rem 1rem;width:fit-content;color:var(--foreground-color-0);background-color:var(--background-color-0);border:none;border-radius:var(--border-radius-1);outline:none;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);cursor:pointer}._DialogContent_lop64_1 button:hover,._DialogContent_lop64_1 button:focus-visible{background-color:var(--background-color-1)}._Actions_1a1pp_1{--left: 0;--top: 0;--right: calc(1 - var(--left));--bottom: calc(1 - var(--top));position:absolute;top:0;left:0;opacity:1;transition:opacity var(--transition-duration-0) ease-out}._Actions_1a1pp_1._Uninitiated_1a1pp_15{opacity:0}._Actions_1a1pp_1._AlignLeft_1a1pp_19{--left: 1;left:unset;right:0}._Actions_1a1pp_1._AlignTop_1a1pp_26{--top: 1;top:unset;bottom:0}._DropdownArrow_1a1pp_33{height:1em}._ContextMenu_1a1pp_39._Actions_1a1pp_1{--border-radius: var(--border-radius-1);--padding: .375rem;padding:var(--padding);border-top-left-radius:calc((1 - var(--right) * var(--bottom)) * var(--border-radius))!important;border-top-right-radius:calc((1 - var(--left) * var(--bottom)) * var(--border-radius))!important;border-bottom-left-radius:calc((1 - var(--right) * var(--top)) * var(--border-radius))!important;border-bottom-right-radius:calc((1 - var(--left) * var(--top)) * var(--border-radius))!important;background-color:var(--background-color-1)!important}._ContextMenu_1a1pp_39 ._Button_1a1pp_51,._ContextMenu_1a1pp_39 ._Dropdown_1a1pp_33{display:flex;gap:.75rem;justify-content:space-between;width:100%;padding:.25rem .5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;font-size:.875rem;text-align:start;white-space:nowrap;cursor:pointer}._ContextMenu_1a1pp_39 ._Button_1a1pp_51:hover,._ContextMenu_1a1pp_39 ._Button_1a1pp_51:focus-visible,._ContextMenu_1a1pp_39 ._Dropdown_1a1pp_33:hover,._ContextMenu_1a1pp_39 ._Dropdown_1a1pp_33:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._ContextMenu_1a1pp_39 ._Label_1a1pp_75{display:flex;gap:.5rem;justify-content:center;align-items:center}._ContextMenu_1a1pp_39 ._Label_1a1pp_75 p,._ContextMenu_1a1pp_39 ._Shortcut_1a1pp_83{margin:0}._ContextMenu_1a1pp_39 ._Icon_1a1pp_87{display:flex;justify-content:center;align-items:center;width:.875rem;height:.875rem}._ContextMenu_1a1pp_39 ._Icon_1a1pp_87>svg{width:100%;height:100%;object-fit:contain}._ContextMenu_1a1pp_39 ._ImageIcon_1a1pp_101{position:absolute;width:1rem;height:auto;aspect-ratio:1}._ContextMenu_1a1pp_39 ._ImageIcon_1a1pp_101 div{display:flex;width:100%;height:100%}._ContextMenu_1a1pp_39 ._ImageIcon_1a1pp_101 div>svg{width:100%;height:100%;object-fit:contain}._ContextMenu_1a1pp_39 ._Shortcut_1a1pp_83{color:var(--foreground-color-1)}._ContextMenu_1a1pp_39 ._Dropdown_1a1pp_33{position:relative}._ContextMenu_1a1pp_39 ._Dropdown_1a1pp_33 ._DropdownContent_1a1pp_128{opacity:1;position:absolute;top:calc(var(--padding) * -1);left:100%;padding:var(--padding);border-radius:var(--border-radius-1);border-top-left-radius:0;background-color:var(--background-color-1);transition:opacity var(--transition-duration-0) ease-out;cursor:auto}._ContextMenu_1a1pp_39 ._Dropdown_1a1pp_33:not(._Active_1a1pp_141) ._DropdownContent_1a1pp_128{opacity:0;pointer-events:none}._ContextMenu_1a1pp_39 ._Divider_1a1pp_146{width:calc(100% - .5rem);height:2px;border-radius:var(--border-radius-99);background-color:var(--foreground-color-2);margin:.5rem auto}._ContextMenu_1a1pp_39 ._TextDisplay_1a1pp_154{margin:0;padding:.25rem .75rem;color:var(--foreground-color-1);font-size:.875rem;text-align:start;white-space:nowrap}._HeaderMenu_1a1pp_165{display:flex;width:inherit;height:inherit}._HeaderMenu_1a1pp_165 ._Dropdown_1a1pp_33{position:relative;display:block;width:auto;height:100%;padding:0 .5rem;background:none;border:none;outline:none;font-size:.85rem;cursor:pointer}._HeaderMenu_1a1pp_165 ._Dropdown_1a1pp_33:hover,._HeaderMenu_1a1pp_165 ._Dropdown_1a1pp_33:focus-visible,._HeaderMenu_1a1pp_165 ._Dropdown_1a1pp_33._Active_1a1pp_141{background-color:#ffffff0d}._HeaderMenu_1a1pp_165 ._Dropdown_1a1pp_33>._Label_1a1pp_75{display:flex;justify-content:center;align-items:center;height:100%}._HeaderMenu_1a1pp_165 ._DropdownArrow_1a1pp_33:not(._DropdownContent_1a1pp_128 ._DropdownArrow_1a1pp_33){display:none}._HeaderMenu_1a1pp_165 ._DropdownContent_1a1pp_128{opacity:1;display:flex;flex-direction:column;position:absolute;top:100%;left:0;padding:.25rem;background-color:var(--background-color-1);border-bottom-left-radius:var(--border-radius-1);border-bottom-right-radius:var(--border-radius-1);transition:opacity var(--transition-duration-0) ease-out;cursor:default}._HeaderMenu_1a1pp_165 ._DropdownContent_1a1pp_128 ._DropdownContent_1a1pp_128{top:-.25rem;left:100%}._HeaderMenu_1a1pp_165 ._Dropdown_1a1pp_33:not(._Active_1a1pp_141) ._DropdownContent_1a1pp_128{opacity:0;pointer-events:none}._HeaderMenu_1a1pp_165 ._Button_1a1pp_51,._HeaderMenu_1a1pp_165 ._DropdownContent_1a1pp_128 ._Dropdown_1a1pp_33{--icon-size: 1.25rem;--icon-gap: .5rem;display:flex;gap:1.5rem;justify-content:space-between;align-items:center;width:100%;padding:.25rem .5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;font-size:.875rem;text-align:start;white-space:nowrap;cursor:pointer}._HeaderMenu_1a1pp_165 ._Button_1a1pp_51:not(:disabled):hover,._HeaderMenu_1a1pp_165 ._Button_1a1pp_51:not(:disabled):focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._HeaderMenu_1a1pp_165 ._Button_1a1pp_51:disabled{cursor:default}._HeaderMenu_1a1pp_165 ._Button_1a1pp_51>._Label_1a1pp_75{display:flex;gap:var(--icon-gap);flex-direction:row-reverse;justify-content:flex-start;align-items:center}._HeaderMenu_1a1pp_165 ._Toggle_1a1pp_264>._Label_1a1pp_75{gap:1.5rem;justify-content:space-between;width:100%}._HeaderMenu_1a1pp_165 ._Button_1a1pp_51>._Label_1a1pp_75 ._Icon_1a1pp_87 div,._HeaderMenu_1a1pp_165 ._Button_1a1pp_51>._Label_1a1pp_75 ._Icon_1a1pp_87 svg{height:var(--icon-size);width:var(--icon-size)}._HeaderMenu_1a1pp_165 ._Dropdown_1a1pp_33>._Label_1a1pp_75>p,._HeaderMenu_1a1pp_165 ._Button_1a1pp_51>._Label_1a1pp_75>p{margin:0}._HeaderMenu_1a1pp_165 ._Button_1a1pp_51:disabled>._Label_1a1pp_75>p{color:var(--foreground-color-1)}._HeaderMenu_1a1pp_165 ._Shortcut_1a1pp_83{color:var(--foreground-color-1);margin:0;font-size:.875rem}._HeaderMenu_1a1pp_165 ._Divider_1a1pp_146{width:calc(100% - .5rem);height:2px;border-radius:var(--border-radius-99);background-color:var(--foreground-color-2);margin:.25rem auto}._ImagePreview_djvki_1{height:100%;overflow:hidden;pointer-events:none}._ImagePreview_djvki_1>*{width:100%;height:100%;object-fit:contain}._ImagePreview_djvki_1>img{height:auto;max-height:100%;width:auto;max-width:100%;border-radius:inherit}._Button_1uqkw_1{--text-color: var(--foreground-color-0);--normal-color: var(--background-color-0);--hover-color: var(--background-color-1);color:var(--text-color);background-color:var(--normal-color);border:none;outline:none;font-size:.875em;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);cursor:pointer}._Button_1uqkw_1:hover,._Button_1uqkw_1:focus-visible{background-color:var(--hover-color)}._ButtonLink_1uqkw_19{text-decoration:none}._Button_1uqkw_1>svg{margin-left:.5rem}._DirectoryList_18ux0_1{--scale: 1rem;position:relative;width:100%;height:100%}._FileButton_18ux0_9,._FolderButton_18ux0_9{--gap: .25rem;display:flex;gap:var(--gap);flex-direction:column;align-items:center;justify-content:center;width:calc(var(--scale) * 7.5);height:calc(var(--scale) * 7.5);padding:.5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;cursor:pointer;transition:background-color var(--transition-duration-0) var(--ease-in-out-default)}._FileButton_18ux0_9[data-selected=true],._FolderButton_18ux0_9[data-selected=true]{background-color:color-mix(in srgb,var(--background-color-0) 40%,transparent)!important}._FileButton_18ux0_9:hover,._FolderButton_18ux0_9:hover,._FileButton_18ux0_9:focus-visible,._FolderButton_18ux0_9:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 20%,transparent)}._FileButton_18ux0_9 p,._FolderButton_18ux0_9 p{max-width:100%;margin:0;word-wrap:break-word}._FileIcon_18ux0_46,._FolderIcon_18ux0_46{max-height:calc(100% - 1rem - var(--gap));border-radius:inherit}._FileIcon_18ux0_46 div,._FolderIcon_18ux0_46 div{width:100%;height:100%;border-radius:inherit;overflow:hidden}._FileIcon_18ux0_46 svg,._FolderIcon_18ux0_46 svg{width:50%;height:auto;aspect-ratio:1}._SelectionRect_18ux0_64{opacity:25%;position:absolute;border-radius:var(--border-radius-0);background-color:var(--blue-1);border:.25rem solid var(--blue-0)}._DropdownButton_1f5hf_1{position:relative;height:100%}._Button_1f5hf_6{display:block;width:auto;height:100%;padding:0 .5rem;background:none;border:none;outline:none;font-size:.85rem;cursor:pointer}._Button_1f5hf_6:hover,._Button_1f5hf_6:focus-visible{background-color:#ffffff0d}._Dropdown_1f5hf_1{display:flex;flex-direction:column;position:absolute;top:100%;left:0;padding:.35rem;background-color:var(--background-color-1);border-bottom-left-radius:.5rem;border-bottom-right-radius:.5rem}._Dropdown_1f5hf_1>button{display:flex;gap:.75rem;justify-content:space-between;width:100%;padding:.25rem .5rem;background:none;border:none;border-radius:var(--border-radius-1);outline:none;font-size:.85rem;text-align:start;white-space:nowrap;cursor:pointer}._Dropdown_1f5hf_1>button:hover,._Dropdown_1f5hf_1>button:focus-visible{background-color:color-mix(in srgb,var(--background-color-0) 75%,transparent)}._Dropdown_1f5hf_1>button>p{margin:0}._Shortcut_1f5hf_58{color:var(--foreground-color-1)}._ProgressBar_115cj_1{position:relative;width:15rem;max-width:100%;min-height:2rem;max-height:100%;background-color:var(--background-color-4)}._Fill_115cj_10{--fill: 0%;position:absolute;left:0;top:0;width:var(--fill);min-width:1px;height:100%;background-color:var(--blue-0)}._HeaderMenu_1kc25_1{position:relative;display:flex;width:100%;height:1.5rem;min-height:1.5rem;background-color:var(--background-color-0)}._WebView_12eh1_1{display:flex;justify-content:center;align-items:center;width:100%;height:100%}._WebView_12eh1_1>iframe{width:100%;height:100%;border:none;background:none;pointer-events:initial}._MenuButton_1w3ho_1{height:100%;padding:.75rem}._MenuButton_1w3ho_1>svg{height:1.25rem}._MenuButton_1w3ho_1 div,._MenuButton_1w3ho_1 div>svg{height:100%;width:auto}._AppList_1w3ho_16{--scrollbar-color: rgba(0, 0, 0, 25%);display:flex;flex-direction:column;overflow-y:auto;max-height:100%;padding-bottom:.5rem;z-index:0}._AppButton_1w3ho_26{--size: 2rem;display:flex;gap:.75rem;width:100%;padding:.25rem .5rem;font-size:.875rem;border-radius:var(--border-radius-1)}._AppButton_1w3ho_26>div,._AppButton_1w3ho_26>div>div,._AppButton_1w3ho_26>div>div>svg{width:var(--size);height:var(--size)}._AppButton_1w3ho_26 svg{filter:var(--svg-drop-shadow-0)}._AppButton_1w3ho_26>p,._AppButton_1w3ho_26>h2{margin:0;white-space:nowrap}._HomeContainer_w9ozh_1{position:relative;padding:0!important}._HomeContainer_w9ozh_1,._HomeContainer_w9ozh_1>div{height:100%;width:auto}button._HomeButton_w9ozh_12{padding:.5rem}._HomeButton_w9ozh_12 *{fill:var(--foreground-color-0);filter:none}._HomeButton_w9ozh_12 img{height:100%;width:auto;object-fit:contain}._HomeMenuContainer_yebwt_1{position:absolute;left:0;bottom:100%;height:auto!important;overflow:hidden}._HomeMenuContainer_yebwt_1:not(._Active_yebwt_9){pointer-events:none}._HomeMenu_yebwt_1{opacity:1;display:flex;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);border-bottom-left-radius:var(--border-radius-1);transform:none;transition:opacity var(--transition-duration-1) var(--ease-in-out-default),transform var(--transition-duration-1) var(--ease-in-out-default);overflow:hidden;resize:horizontal}._HomeMenuContainer_yebwt_1:not(._Active_yebwt_9) ._HomeMenu_yebwt_1{opacity:0;transform:translateY(50%)}._HomeMenu_yebwt_1:after,._HomeMenuContainer_yebwt_1:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none}._HomeMenu_yebwt_1:after{opacity:var(--taskbar-menu-opacity);background-color:var(--taskbar-menu-color);z-index:-2}._HomeMenuContainer_yebwt_1:after{opacity:1;transition:opacity var(--transition-duration-1) var(--ease-in-out-default),top var(--transition-duration-1) var(--ease-in-out-default);-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);z-index:-3}._HomeMenuContainer_yebwt_1:not(._Active_yebwt_9):after{opacity:0;top:50%}._HomeMenu_yebwt_1{--default-buttons-width: 3rem;--buttons-count: 5;min-width:16rem;max-width:32rem;min-height:calc(var(--default-buttons-width) * var(--buttons-count));border-bottom-left-radius:0;border-bottom-right-radius:var(--border-radius-1)}._Buttons_yebwt_73{--buttons-width: var(--default-buttons-width);--padding: .25rem;--filter: blur(0px);position:absolute;display:flex;flex-direction:column-reverse;justify-content:flex-start;align-items:center;bottom:0;left:0;padding:var(--padding);margin-top:auto;width:var(--buttons-width);height:100%;border-radius:var(--border-radius-1);overflow:hidden;transition:width var(--transition-duration-1) var(--ease-in-out-default) var(--transition-duration-1);z-index:1}._Buttons_yebwt_73:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;-webkit-backdrop-filter:var(--filter);backdrop-filter:var(--filter);transition:backdrop-filter var(--transition-duration-1) var(--ease-in-out-default) var(--transition-duration-1)}._Buttons_yebwt_73:hover,._Buttons_yebwt_73:focus-visible{--buttons-width: 10rem;--filter: var(--taskbar-filter)}._Buttons_yebwt_73>button{--button-width: calc(var(--buttons-width) - var(--padding) * 2);--button-height: calc(var(--default-buttons-width) - var(--padding) * 2);position:relative;display:flex;justify-content:flex-start;align-items:center;padding:.5rem;width:var(--button-width);height:var(--button-height);border-radius:var(--border-radius-1);overflow:hidden;transition:inherit;z-index:1}._Buttons_yebwt_73>button>svg{height:1.5rem;width:1.5rem}._Buttons_yebwt_73>button>p{position:absolute;left:calc(var(--default-buttons-width) - var(--padding) * 2);margin:0;white-space:nowrap}._Apps_yebwt_143{display:flex;flex-direction:column;width:100%!important;max-height:20rem;padding:.5rem .25rem .5rem .5rem;padding-bottom:0;margin-left:var(--default-buttons-width)}._Logo_yebwt_154{display:flex;gap:.5rem;width:auto;margin-bottom:.5rem;justify-content:flex-start;align-items:center;-webkit-user-select:none;user-select:none}._Logo_yebwt_154 div,._Logo_yebwt_154 svg{width:auto;height:2.25rem;color:inherit;aspect-ratio:1}._Logo_yebwt_154 svg{object-fit:contain}._Logo_yebwt_154 svg *{color:inherit;fill:currentColor}._Logo_yebwt_154>h1{width:100%;text-align:left;margin:0;font-size:1rem;font-weight:600;letter-spacing:normal}._SearchContainer_trcry_1{position:relative;padding:0!important}._SearchContainer_trcry_1,._SearchContainer_trcry_1>div{height:100%;width:auto}._SearchMenuContainer_11e0k_1{position:absolute;display:flex;flex-direction:column;left:0;bottom:100%;max-height:20rem;overflow:hidden}._SearchMenu_11e0k_1{opacity:0;display:flex;gap:.5rem;flex-direction:column;min-width:13rem;max-width:19rem;padding:.5rem;margin-top:100px;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);border-bottom-right-radius:var(--border-radius-1);-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);transition:opacity var(--transition-duration-1) var(--ease-in-out-default),margin-top var(--transition-duration-1) var(--ease-in-out-default);overflow:hidden;resize:horizontal}._SearchMenu_11e0k_1:after{opacity:var(--taskbar-menu-opacity);content:"";position:absolute;inset:0;background-color:var(--taskbar-menu-color);z-index:-2}._SearchMenuContainer_11e0k_1._Active_11e0k_42 ._SearchMenu_11e0k_1{opacity:1;margin-top:0}._SearchMenuContainer_11e0k_1:not(._Active_11e0k_42){pointer-events:none}._SearchMenu_11e0k_1>div{margin-top:auto}._Input_11e0k_55{width:100%;padding:.25rem .5rem;color:var(--foreground-color-0);background-color:#00000040;border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._SearchMenu_11e0k_1>div>button:first-child{background-color:var(--taskbar-button-hover-color)}._AppIconsContainer_cauip_1{position:relative;width:100%;height:auto;overflow:hidden;pointer-events:none}._AppIcons_cauip_1{display:flex;align-items:center;height:100%;position:absolute;top:0;left:0;width:100%;overflow-x:auto;overflow-y:hidden;pointer-events:auto;z-index:-1}._AppIcons_cauip_1::-webkit-scrollbar{display:none}._AppIcons_cauip_1>*{height:100%;padding:.75rem}._AppIcons_cauip_1>*>svg{height:1.25rem}._AppIcons_cauip_1>button div,._AppIcons_cauip_1>button div>svg{height:100%;width:auto}._AppIcon_1bu4k_1{opacity:1;position:relative;width:var(--taskbar-height);height:var(--taskbar-height);aspect-ratio:1;animation:_appear_1bu4k_1 var(--transition-duration-0) ease-out forwards}._AppIcon_1bu4k_1 svg{filter:var(--svg-drop-shadow-0);transform:scale(1);transform-origin:center;transition:transform var(--transition-duration-1) ease-out var(--transition-duration-0)}._AppIcon_1bu4k_1:not(._Active_1bu4k_17):hover svg,._AppIcon_1bu4k_1:not(._Active_1bu4k_17):focus-visible svg{transform:scale(125%)}._AppIcon_1bu4k_1._Hidden_1bu4k_22{animation:_disappear_1bu4k_1 var(--transition-duration-2) var(--ease-in-out-default) forwards;pointer-events:none}@keyframes _appear_1bu4k_1{0%{opacity:0}to{opacity:1}}@keyframes _disappear_1bu4k_1{0%{opacity:1}25%{opacity:0;margin-right:0}to{opacity:0;margin-right:calc(var(--taskbar-height) * -1)}}._AppIcon_1bu4k_1:after{content:"";position:absolute;left:50%;bottom:0;width:90%;height:.15rem;background-color:var(--foreground-color-0);transition:height var(--transition-duration-1) var(--ease-in-out-default),width var(--transition-duration-1) var(--ease-in-out-default);transform:translate(-50%);-webkit-transform:translateX(-50%)}._AppIcon_1bu4k_1:hover:after,._AppIcon_1bu4k_1:focus-visible:after{width:100%}._AppIcon_1bu4k_1:not(._Active_1bu4k_17):after{height:0}._UtilIcons_yrzqh_1{display:flex;gap:0;justify-content:flex-end;align-items:center;height:100%;margin-left:auto;padding-left:.5rem;z-index:-1}._UtilIcons_yrzqh_1>div{position:relative;height:100%;width:min-content;z-index:-1}._UtilIcons_yrzqh_1>button,._UtilIcons_yrzqh_1>div>button{height:100%;width:min-content;margin:0;padding:.4rem}._UtilIcons_yrzqh_1>button>svg,._UtilIcons_yrzqh_1>div>button>svg{height:1rem;width:1rem;aspect-ratio:1}._Button_fsy4w_1{position:relative}._Charging-indicator_fsy4w_5{--outline-color: var(--background-color-2);--outline-width: 2px;position:absolute;top:.55rem;right:.15rem;height:.7rem!important}._Menu_fsy4w_15>div{display:flex;gap:.5rem;justify-content:center;align-items:center;padding:.5rem 1rem}._Menu_fsy4w_15>div>div,._Menu_fsy4w_15>div>div>svg{width:auto;height:1.25rem}._Menu_fsy4w_15>div>p{margin:0;font-size:1.25rem}._IndicatorMenuContainer_1diwo_1{position:absolute;right:0;bottom:100%;height:auto!important;overflow:hidden}._IndicatorMenuContainer_1diwo_1:not(._Active_1diwo_9){pointer-events:none}._IndicatorMenuContainer_1diwo_1:not(._Active_1diwo_9) ._IndicatorMenu_1diwo_1{opacity:0;transform:translateY(100px)}._IndicatorMenu_1diwo_1{opacity:1;display:flex;border-top-left-radius:var(--border-radius-1);border-top-right-radius:var(--border-radius-1);border-bottom-left-radius:var(--border-radius-1);-webkit-backdrop-filter:var(--taskbar-filter);backdrop-filter:var(--taskbar-filter);transform:none;transition:opacity var(--transition-duration-1) var(--ease-in-out-default),transform var(--transition-duration-1) var(--ease-in-out-default);overflow:hidden;resize:horizontal}._IndicatorMenu_1diwo_1:after{opacity:var(--taskbar-menu-opacity);content:"";position:absolute;inset:0;background-color:var(--taskbar-menu-color);z-index:-2}._Menu_vin43_1>div{display:flex;gap:.5rem;justify-content:center;align-items:center;padding:.5rem 1rem}._Menu_vin43_1>div>svg{width:auto;height:1rem}._Menu_vin43_1>div>p{margin:0;font-size:1rem}._Button_l4a7x_1{display:flex;flex-direction:column;white-space:nowrap;-webkit-user-select:none;user-select:none}._Button_l4a7x_1>p{margin:0}._Menu_l4a7x_12>div{display:flex;gap:.5rem;flex-direction:column;align-items:flex-start;padding:.5rem 1rem}._Time_l4a7x_20,._Date_l4a7x_20{margin:0}._Time_l4a7x_20{font-size:1.5rem}._Date_l4a7x_20{opacity:.5}._DesktopButton_1oktl_1{width:.5rem!important}._Window-container_1w3qi_1{--header-height: 2.5rem;--header-button-hover-color: rgba(255, 255, 255, 5%);position:absolute}._Window-container_1w3qi_1._Minimized_1w3qi_8{pointer-events:none}@keyframes _pop-in_1w3qi_1{0%{scale:0}to{scale:100%}}._Window-container_1w3qi_1._Maximized_1w3qi_21{width:100%;height:100%;transform:none!important}._Window-container_1w3qi_1._Maximized_1w3qi_21 ._Window-inner_1w3qi_27{width:100%;height:calc(100% - var(--taskbar-height));border-radius:0;resize:none}._Window-inner_1w3qi_27{display:flex;flex-direction:column;min-width:300px;min-height:150px;background-color:var(--background-color-2);border-radius:var(--border-radius-1);box-shadow:var(--window-box-shadow);resize:both;overflow:hidden;transform-origin:center center;animation:_appear_1w3qi_1 var(--transition-duration-1)var(--ease-in-out-default) forwards}._Window-container_1w3qi_1._Minimized_1w3qi_8 ._Window-inner_1w3qi_27{animation:_disappear_1w3qi_1 var(--transition-duration-1)var(--ease-in-out-default) forwards}@keyframes _appear_1w3qi_1{0%{opacity:0;transform:translateY(25vh) scale(0)}25%{opacity:0}to{opacity:1;transform:none}}@keyframes _disappear_1w3qi_1{0%{opacity:1;transform:none}75%{opacity:0}to{opacity:0;transform:translateY(25vh) scale(0)}}._Header_1w3qi_80{--window-icon-size: 1.5rem;--window-icon-margin: .75rem;display:flex;align-items:center;height:var(--header-height);padding:.25rem;padding-left:var(--window-icon-margin);padding-right:0;background-color:var(--background-color-1);cursor:grab}._Window-icon_1w3qi_94,._Window-icon_1w3qi_94>div,._Window-icon_1w3qi_94>div>svg{height:100%;width:auto}._Window-icon_1w3qi_94{height:var(--window-icon-size);margin-right:calc(var(--window-icon-margin) - .1rem)}._Window-icon_1w3qi_94>div{display:flex;align-items:center}._Header_1w3qi_80>p{-webkit-user-select:none;user-select:none;width:auto;margin:0 auto 0 0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._Header-button_1w3qi_121{display:flex;align-items:center;justify-content:center;height:var(--header-height);margin:0;padding:.75rem;color:var(--foreground-color-0);background:none;cursor:pointer;border:none;outline:none;aspect-ratio:1}._Header-button_1w3qi_121>svg{height:100%}._Exit-button_1w3qi_140{--header-button-hover-color: var(--red-0)}._Header-button_1w3qi_121:hover,._Header-button_1w3qi_121:focus-visible{background-color:var(--header-button-hover-color)}._Window-content_1w3qi_148{position:relative;overflow:hidden;height:100%}._Share_14fca_1{display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:1rem 0;overflow:hidden;pointer-events:none}._Top_14fca_12,._Bottom_14fca_12{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;overflow:hidden}._Share_14fca_1>._Top_14fca_12{flex-grow:1;pointer-events:none}._Title_14fca_25{margin-top:0;margin-left:1rem;font-size:1.5rem;pointer-events:auto}._FormContainer_14fca_32{position:relative;width:100%;height:100%;overflow:hidden;pointer-events:none}._Form_14fca_32{--margin: 1rem;position:absolute;display:flex;gap:.5rem;flex-direction:column;top:0;left:0;width:calc(100% - var(--margin) * 2);height:100%;margin:0 var(--margin);overflow-x:hidden;overflow-y:auto;pointer-events:auto;z-index:-1}._Label_14fca_58{--gap: .5rem;display:flex;gap:var(--gap);align-items:center;width:100%;height:1.75rem;min-height:1.75rem;z-index:1}._Label_14fca_58>p{width:calc(40% - var(--gap));min-width:40%;margin:0;text-align:start}._Input_14fca_77{width:auto;max-width:calc(60% - var(--gap));padding:.25rem .5rem;height:100%;color:var(--text-color);background-color:var(--background-color-1);border:none;border-radius:var(--border-radius-1);outline:none;font-size:.875em}select._Input_14fca_77>*{color:inherit;background-color:inherit;border:none;border-radius:var(--border-radius-1);outline:none;font-family:inherit;font-size:inherit}._Input_14fca_77:disabled~div,._Input_14fca_77:disabled~p{opacity:.25}._Input_14fca_77[type=checkbox]{display:none}._Checkbox_14fca_108{display:flex;justify-content:center;align-items:center;width:auto;height:87.5%;aspect-ratio:1;cursor:pointer}._Checkbox_14fca_108>svg{width:100%;height:100%;object-fit:contain;fill:var(--background-color-0)}._Checkbox_14fca_108>svg>*{fill:inherit}._Share_14fca_1>._Bottom_14fca_12{gap:.5rem;flex-direction:row;justify-content:space-between;align-items:center;margin:.75rem 1rem 0;pointer-events:auto}._Url_14fca_138{margin:0;text-align:start;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}._Button_14fca_146{--normal-color: var(--background-color-0) !important;--hover-color: var(--background-color-1) !important;padding:.5rem 1rem;border-radius:var(--border-radius-1);white-space:nowrap}._Desktop_1au3h_1{position:fixed;top:env(safe-area-inset-top,0);left:0;width:100%;height:100%;z-index:-1}._Wallpaper_1au3h_10{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;pointer-events:none}._Content_1au3h_20{--direction: column;position:absolute;display:flex;flex-direction:var(--direction);flex-wrap:wrap;align-content:flex-start;justify-content:flex-start;top:0;left:0;width:100%;height:100%;padding:.5rem;padding-bottom:calc(var(--taskbar-height) + .5rem);z-index:1}._Item_1au3h_38{padding:.25rem;text-shadow:.1rem .1rem .2rem color-mix(in srgb,var(--black-0) 75%,transparent)}._Item_1au3h_38 p{color:var(--white-0)}._Item_1au3h_38 svg{filter:var(--svg-drop-shadow-0)}._ModalView_tyrlb_1{--position-x: 0;--position-y: 0;position:fixed;top:calc(var(--position-y) * 1px);left:calc(var(--position-x) * 1px)}._ModalView_tyrlb_1>*{background:var(--background-color-0);border-radius:var(--border-radius-1);box-shadow:var(--window-box-shadow)}._ModalsView_1t8jt_1{position:relative;z-index:11}._StandaloneView_mfmlq_1{--header-height: 2.75rem;display:flex;flex-direction:column;width:100%;height:100%}._StandaloneWindow_mfmlq_10{position:relative;width:100%;height:calc(100% - var(--header-height));overflow:hidden}._Header_6mqb7_1{display:flex;width:100%;justify-content:space-between;height:var(--header-height);padding:.75rem 1rem;background-color:var(--background-color-1)}._Logo_6mqb7_10{display:flex;gap:.5rem;width:auto;justify-content:flex-start;align-items:center;color:var(--foreground-color-1);text-decoration:none;transition:color var(--transition-duration-1) var(--ease-in-out-default);-webkit-user-select:none;user-select:none}._Logo_6mqb7_10:hover{color:var(--foreground-color-0)}._Logo_6mqb7_10 div,._Logo_6mqb7_10 svg{width:auto;height:2.5rem;color:inherit;aspect-ratio:1}._Logo_6mqb7_10 svg{object-fit:contain}._Logo_6mqb7_10 svg *{color:inherit;fill:currentColor}._Logo_6mqb7_10>h1{margin:0;color:inherit;font-size:1.25rem;font-weight:600;letter-spacing:normal}._ExitButton_6mqb7_51{display:flex;justify-content:center;align-items:center;color:var(--foreground-color-1);background:none!important;font-size:1rem;transition:color var(--transition-duration-1) var(--ease-in-out-default)}._ExitButton_6mqb7_51:hover{color:var(--foreground-color-0)}._ExitButton_6mqb7_51>svg{height:1.25rem;color:inherit}._ExitButton_6mqb7_51>svg *{color:inherit}._NoRoute_1rria_1{display:flex;flex-direction:column;gap:1rem;justify-content:center;align-items:center;width:100%;height:100%}._Title_1rria_11{margin:0;font-size:2rem}._Link_1rria_16{--normal-color: var(--background-color-0) !important;--hover-color: var(--background-color-1) !important;margin-bottom:.75rem!important;padding:.5rem 1rem;border-radius:var(--border-radius-1)}:root{--red-0: #FF4D5B;--red-1: #B23640;--red-2: #661F25;--orange-0: #FF974D;--orange-1: #B26A36;--orange-2: #663C1F;--yellow-0: #FED24C;--yellow-1: #B29336;--yellow-2: #66541F;--green-0: #4DFF8B;--green-1: #36B261;--green-2: #1F6638;--cyan-0: #4DFFE1;--cyan-1: #36B29E;--cyan-2: #1F665A;--light-blue-0: #4CDFFF;--light-blue-1: #369CB2;--light-blue-2: #1F5966;--blue-0: #4D9CFF;--blue-1: #366DB2;--blue-2: #1F3E66;--purple-0: #974DFF;--purple-1: #6A36B2;--purple-2: #3C1F66;--pink-0: #FF4DFF;--pink-1: #B236B2;--pink-2: #661F66;--white-0: #E5F2FF;--white-1: #A0A9B2;--white-2: #5C6166;--white-3: #393C40;--white-4: #222426;--black-0: #29343F;--black-1: #1E262E;--black-2: #14191F;--black-3: #0D1114;--black-4: #080B0D}:root{--foreground-color-0: var(--white-0);--foreground-color-1: var(--white-1);--foreground-color-2: var(--white-2);--background-color-0: var(--black-0);--background-color-1: var(--black-1);--background-color-2: var(--black-2);--background-color-3: var(--black-3);--background-color-4: var(--black-4);--scrollbar-color: color-mix(in srgb, var(--background-color-0) 25%, transparent)}:root{--border-radius-0: .2rem;--border-radius-1: .375rem;--border-radius-99: 9999px;--svg-drop-shadow-color: var(--black-0);--svg-drop-shadow-0: drop-shadow(.05rem .1rem .15rem color-mix(in srgb, var(--svg-drop-shadow-color) 50%, transparent));--svg-drop-shadow-1: drop-shadow(.1rem .1rem .2rem color-mix(in srgb, var(--svg-drop-shadow-color) 75%, transparent));--window-shadow-size: .3rem;--window-shadow-opacity: 35%;--window-shadow-spread: 3;--window-box-shadow: calc(var(--window-shadow-size) * -1) var(--window-shadow-size) calc(var(--window-shadow-size) * var(--window-shadow-spread)) 0px rgba(0, 0, 0, var(--window-shadow-opacity));--taskbar-height: 3rem;--taskbar-color: var(--background-color-2);--taskbar-opacity: .75;--taskbar-menu-color: var(--background-color-1);--taskbar-menu-opacity: .5;--taskbar-button-hover-color: rgba(255, 255, 255, 5%);--taskbar-filter: blur(1rem);--transition-duration-0: 75ms;--transition-duration-1: .25s;--transition-duration-2: .4s;--ease-int-out-cubic: cubic-bezier(.65, 0, .35, 1);--ease-in-out-quart: cubic-bezier(.76, 0, .24, 1);--ease-in-out-expo: cubic-bezier(.87, 0, .13, 1);--ease-in-out-back: cubic-bezier(.68, -1, .32, 2);--ease-in-out-default: var(--ease-in-out-quart, ease-in-out)}:root{--body-font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;--mono-font-family: "Roboto Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace}@font-face{font-family:Outfit;src:url(/assets/fonts/outfit/Outfit-VariableFont_wght.ttf);font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Thin.ttf) format("truetype");font-weight:100;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-ThinItalic.ttf) format("truetype");font-weight:100;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Light.ttf) format("truetype");font-weight:300;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-LightItalic.ttf) format("truetype");font-weight:300;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Regular.ttf) format("truetype");font-weight:400;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Italic.ttf) format("truetype");font-weight:400;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Medium.ttf) format("truetype");font-weight:500;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-MediumItalic.ttf) format("truetype");font-weight:500;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-SemiBold.ttf) format("truetype");font-weight:600;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-SemiBoldItalic.ttf) format("truetype");font-weight:600;font-style:italic;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-Bold.ttf) format("truetype");font-weight:700;font-style:normal;font-display:block}@font-face{font-family:Roboto Mono;src:url(/assets/fonts/roboto-mono/RobotoMonoNerdFontMono-BoldItalic.ttf) format("truetype");font-weight:700;font-style:italic;font-display:block}.Light-theme{--foreground-color-0: var(--black-3);--foreground-color-1: var(--black-2);--foreground-color-2: var(--black-1);--background-color-0: var(--white-0);--background-color-1: var(--white-0);--background-color-2: var(--white-1);--background-color-3: var(--white-1);--background-color-4: var(--white-2);--taskbar-color: var(--white-0);--taskbar-menu-color: var(--white-0);--taskbar-button-hover-color: rgba(0, 0, 0, 5%)}.Cherry-theme{--background-color-0: var(--red-0);--background-color-1: var(--red-0);--background-color-2: var(--red-1);--background-color-3: var(--red-1);--background-color-4: var(--red-2);--taskbar-color: var(--red-2);--taskbar-menu-color: var(--red-1)}.Mango-theme{--foreground-color-0: var(--black-3);--foreground-color-1: var(--black-2);--foreground-color-2: var(--black-1);--background-color-0: var(--yellow-0);--background-color-1: var(--yellow-0);--background-color-2: var(--yellow-1);--background-color-3: var(--yellow-1);--background-color-4: var(--yellow-2);--taskbar-color: var(--yellow-0);--taskbar-menu-color: var(--yellow-0)}.Aqua-theme{--foreground-color-0: var(--black-3);--foreground-color-1: var(--black-2);--foreground-color-2: var(--black-1);--background-color-0: var(--cyan-0);--background-color-1: var(--cyan-0);--background-color-2: var(--cyan-1);--background-color-3: var(--cyan-1);--background-color-4: var(--cyan-2);--taskbar-color: var(--cyan-0);--taskbar-menu-color: var(--cyan-0)}.Grape-theme{--background-color-0: var(--purple-0);--background-color-1: var(--purple-0);--background-color-2: var(--purple-1);--background-color-3: var(--purple-1);--background-color-4: var(--purple-2);--taskbar-color: var(--purple-2);--taskbar-menu-color: var(--purple-1)}*{scrollbar-color:var(--scrollbar-color) transparent;scrollbar-width:thin}*::-webkit-scrollbar{width:1.25rem;height:1.25rem}*::-webkit-scrollbar-track{background:none}*::-webkit-scrollbar-thumb{border-radius:var(--border-radius-99);border:5px solid transparent;background-color:var(--scrollbar-color);background-clip:padding-box;-webkit-backdrop-filter:invert(100%);backdrop-filter:invert(100%);transition:var(--transition-duration-1) var(--ease-in-out-default);z-index:1}*::-webkit-scrollbar-corner{background-color:transparent}html,body,#root{width:100%;height:100%;pointer-events:none}html{scroll-behavior:smooth;overflow:hidden;background-color:var(--background-color-2);font-size:16px}body{margin:0;font-family:var(--body-font-family);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}*,:after,:before{color:var(--foreground-color-0);font-size:1rem;box-sizing:border-box;-webkit-tap-highlight-color:transparent;text-rendering:optimizelegibility}p,a,button,input,select,h1,h2,h3,h4,h5,h6{font-family:var(--body-font-family);letter-spacing:normal}p,a,div,span{font-size:1em}button,input{font-size:.875em}h1{font-size:2em}h2{font-size:1.8em}h3{font-size:1.6em}h4{font-size:1.4em}h5{font-size:1.2em}h6{font-size:1em}button,li[data-rttab=true]{margin:0;border:none;outline:none;transition:background-color var(--transition-duration-0) var(--ease-in-out-default);cursor:pointer;-webkit-user-select:none;user-select:none}code{font-family:var(--mono-font-family)}*::selection{color:var(--background-color-3);background-color:var(--foreground-color-0)}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { mergeDeep as tn, isValidUrl as jn, EventEmitter as Yt, Vector2 as U, formatRelativeTime as en, removeFromArray as vt, Result as B, ANSI as v, Ansi as ne, clamp as xe, getLongestCommonPrefix as Gn, parseBool as nn, randomRange as Oe, removeDuplicatesFromArray as Yn, isValidInteger as se } from "@prozilla-os/shared";
import { Vector2 as Za } from "@prozilla-os/shared";
import { jsx as a, jsxs as m, Fragment as Xt } from "react/jsx-runtime";
import { isValidElement as sn, Children as rn, createContext as ct, useContext as ut, useState as x, useEffect as y, useCallback as J, memo as at, useRef as lt, useMemo as gt, cloneElement as Xn, forwardRef as qn } from "react";
import { FontAwesomeIcon as F } from "@fortawesome/react-fontawesome";
import { faXmark as on, faExternalLink as Zn, faPowerOff as Jn, faGear as Qn, faCircleInfo as ts, faImage as es, faFileLines as ns, faSearch as ss, faCaretRight as is, faCircleDot as rs, faSquareCheck as pe, faMinus as Gt, faBatteryFull as os, faBatteryEmpty as as, faBatteryQuarter as ls, faBatteryHalf as cs, faBatteryThreeQuarters as us, faWifi as Fe, faVolumeHigh as Pe, faWindowMaximize as ds, faExpand as an, faTimes as ln, faCircleRight as hs, faEye as ps, faArrowsRotate as fs, faCompress as ms, faPaintBrush as gs, faTrash as Le, faArrowRight as ws } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG as Pt } from "react-svg";
import cn from "react-draggable";
import { faCircle as Es, faSquare as fe, faWindowMaximize as xs } from "@fortawesome/free-regular-svg-icons";
import { ErrorBoundary as Ss } from "react-error-boundary";
import { proxy as un, ref as dn, useSnapshot as vs } from "valtio";
import { Theme as Kt, Skin as Is } from "@prozilla-os/skins";
import Be from "lz-string";
import $e from "react-ga4";
import { BrowserRouter as _s, Routes as ys, Route as Wt } from "react-router-dom";
const As = /^[a-zA-Z0-9-]+$/;
class ie {
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
  constructor(t, e, n, s) {
    if (this.name = t, this.id = e, this.windowContent = n, this.windowOptions = s, this.id.match(As) == null)
      throw new Error(`Invalid app ID found: ${this.id}
App IDs may only contain letters (a-zA-Z), numbers (0-9) and dashes (-).`);
  }
  /**
   * Returns the component that renders the content of a window for this app.
   */
  WindowContent = (t) => (t = { ...t, ...this.windowOptions }, this.windowContent == null ? null : /* @__PURE__ */ a(this.windowContent, { ...t }));
  /**
   * Sets the display name of this application.
   */
  setName(t) {
    return this.name = t, this;
  }
  /**
   * Sets the description of this application.
   */
  setDescription(t) {
    return this.description = t, this;
  }
  /**
   * Sets the URL of the icon of this application.
   */
  setIconUrl(t) {
    return this.iconUrl = t, this;
  }
  /**
   * Sets the role of this application.
   */
  setRole(t) {
    return this.role = t, this;
  }
  /**
   * Sets the associated extensions of this application.
   */
  setAssociatedExtensions(t) {
    return this.associatedExtensions = t ?? [], this;
  }
  /**
   * Changes whether this application is pinned by default or not.
   */
  setPinnedByDefault(t) {
    return this.pinnedByDefault = t, this;
  }
  /**
   * Changes whether this application is launched at startup or not.
   */
  setLaunchAtStartup(t) {
    return this.launchAtStartup = t, this;
  }
  /**
   * Changes whether this application is installed by default or not.
   */
  setInstalled(t) {
    return this.isInstalled = t, this;
  }
  /**
   * Sets the category this application belongs to.
   */
  setCategory(t) {
    return this.category = t, this;
  }
  /**
   * Sets the metadata for this application.
   */
  setMetadata(t) {
    return this.metadata = t, this;
  }
  /**
   * Changes whether this application has a desktop icon in the default data.
   */
  setShowDesktopIcon(t) {
    return this.showDesktopIcon = t, this;
  }
  /**
   * Sets the default options for the {@link App.windowContent} component.
   */
  setWindowOptions(t) {
    return this.windowOptions = t, this;
  }
  /**
   * Replaces any existing skin overrides with the given overrides.
   * @param skinOverrides - The skin overrides to assign to this app.
   * @see {@link skinOverrides}
   */
  setSkinOverrides(t) {
    return this.skinOverrides = t, this;
  }
  /**
   * Adds skin overrides to this app.
   * 
   * If there is already an existing entry for the same skin, it is merged with the new overrides.
   * 
   * @see {@link skinOverrides}
   */
  addSkinOverride(t, e) {
    this.skinOverrides || (this.skinOverrides = /* @__PURE__ */ new Map());
    const n = this.skinOverrides.get(t), s = n ? tn(n, e) : e;
    return this.skinOverrides.set(t, s), this;
  }
  applySkin(t) {
    if (t.appNames && Object.keys(t.appNames).includes(this.id) && this.setName(t.appNames[this.id]), t.appIcons && Object.keys(t.appIcons).includes(this.id) && this.setIconUrl(t.appIcons[this.id]), this.skinOverrides)
      for (const [e, n] of this.skinOverrides)
        t instanceof e && this.applySkinOverrides(t, n);
    this.iconUrl && this.setIconUrl(t.resolveAssetUrl(this.iconUrl)), this.metadata?.screenshots && (this.metadata.screenshots = t.resolveAssetUrls(this.metadata.screenshots));
  }
  applySkinOverrides(t, e) {
    e.name && (this.name = e.name), e.iconUrl && (this.iconUrl = t.resolveAssetUrl(e.iconUrl)), e.description && (this.description = e.description), e.windowContent && (this.windowContent = e.windowContent), e.windowOptions && (this.windowOptions = e.windowOptions), e.metadata && (this.metadata = { ...this.metadata, ...e.metadata });
  }
}
const Cs = ["@prozilla-os/core", "@prozilla-os/shared", "react", "react/jsx-runtime", "react-dom"];
function bs(r) {
  const t = Cs.map(encodeURIComponent).join(",");
  return `https://esm.sh/${r}?external=${t}`;
}
function ks(r, t) {
  if (t != null) {
    const s = r[t];
    return s instanceof ie ? s : null;
  }
  const e = r.app;
  if (e instanceof ie)
    return e;
  const n = r.default;
  return n instanceof ie ? n : null;
}
async function Ts(r, t) {
  try {
    const e = await import(
      /* @vite-ignore */
      r
    ), n = ks(e, t?.exportName);
    if (n != null)
      return n;
    const s = t?.exportName != null ? `\`export { ${t.exportName} }\`` : "`export { app }` or `export default`";
    throw new Error(`Module does not export a valid App instance. Expected ${s}.`);
  } catch (e) {
    throw new Error(`Failed to load app from URL: ${e instanceof Error ? e.message : String(e)}`);
  }
}
async function Ns(r, t) {
  const e = jn(r) ? r : bs(r);
  return Ts(e, t);
}
class q extends Yt {
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
  constructor(t = {}) {
    super();
    const { apps: e } = t;
    if (e != null) {
      const n = [];
      e.forEach((s) => {
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
    return this.apps.filter((t) => t.isInstalled);
  }
  onAppsChange(t) {
    return this.on(q.APPS_CHANGE_EVENT, t), () => {
      this.off(q.APPS_CHANGE_EVENT, t);
    };
  }
  addApp(t, e) {
    if (this.getAppById(t.id, !0) != null)
      throw new Error(`Duplicate app ID found: ${t.id}
App IDs must be unique.`);
    t.applySkin(e.skin), this.apps.push(t), this.emit(q.APPS_CHANGE_EVENT);
  }
  removeApp(t) {
    const e = this.apps.findIndex((n) => n.id === t);
    return e === -1 ? !1 : (this.apps.splice(e, 1), this.emit(q.APPS_CHANGE_EVENT), !0);
  }
  /**
   * Load an app from a URL or npm package and register it in the system.
   * If an app with the same ID is already registered but uninstalled,
   * it will be re-enabled instead of loaded again.
   * @param target - The npm package name or URL to load the app from.
   * @returns The loaded (or re-enabled) app.
   */
  async installApp(t, e, n) {
    const s = await Ns(t, n), i = this.getAppById(s.id, !0);
    if (i != null) {
      if (!i.isInstalled)
        return i.setInstalled(!0), this.emit(q.APPS_CHANGE_EVENT), i;
      throw new Error(`An app with the ID "${s.id}" is already installed.`);
    }
    return this.addApp(s, e), s;
  }
  uninstallApp(t) {
    const e = this.getAppById(t);
    return e == null ? !1 : (e.setInstalled(!1), this.emit(q.APPS_CHANGE_EVENT), !0);
  }
  /**
   * @param id - The ID of the app.
   * @param includeUninstalled - Include apps that are not currently installed.
   */
  getAppById(t, e = !1) {
    let n = null;
    return this.apps.forEach((s) => {
      const i = s.isInstalled || e;
      if (n == null && s.id === t && i) {
        n = s;
        return;
      }
    }), n;
  }
  /**
   * Get the app associated with a file extension.
   */
  getAppByFileExtension(t) {
    let e = null;
    return this.installedApps.forEach((n) => {
      if (e == null && n.associatedExtensions.includes(t)) {
        e = n;
        return;
      }
    }), e ?? this.getAppByRole(q.APP_ROLES.textEditor);
  }
  /**
   * Get the app with a specific role.
   */
  getAppByRole(t) {
    let e = null;
    return this.installedApps.forEach((n) => {
      if (e == null && n.role == t) {
        e = n;
        return;
      }
    }), e;
  }
  /**
   * Get all applications (including uninstalled apps) that belong to a category.
   */
  getAppsByCategory(t) {
    const e = [];
    return this.apps.forEach((n) => {
      n.category == t && e.push(n);
    }), e;
  }
}
class Rs {
  defaultIconSize;
  defaultIconDirection;
  constructor(t = {}) {
    const { defaultIconSize: e, defaultIconDirection: n } = t;
    this.defaultIconSize = e ?? 1, this.defaultIconDirection = n ?? 0;
  }
}
class Ds {
  doubleClickDelay;
  constructor(t = {}) {
    const { doubleClickDelay: e } = t;
    this.doubleClickDelay = e ?? 250;
  }
}
class Se {
  defaultDialogSize;
  defaultFileSelectorSize;
  static DIALOG_CONTENT_TYPES = {
    closeButton: 0
  };
  constructor(t = {}) {
    const { defaultDialogSize: e, defaultFileSelectorSize: n } = t;
    this.defaultDialogSize = e ?? new U(400, 200), this.defaultFileSelectorSize = n ?? new U(700, 400);
  }
}
class Ms {
  height;
  constructor(t = {}) {
    const { height: e } = t;
    this.height = e ?? 48;
  }
}
class Os {
  enabled;
  googleAnalyticsMeasurementId;
  constructor(t = {}) {
    const { enabled: e, GAMeasurementId: n } = t;
    this.enabled = e ?? !0, this.googleAnalyticsMeasurementId = n ?? "G-ZFQRR9DP3C";
  }
}
class Fs {
  screenMargin;
  titleSeparator;
  minScreenSize;
  constructor(t = {}) {
    const { screenMargin: e, titleSeparator: n, minScreenSize: s } = t;
    this.screenMargin = e ?? 32, this.titleSeparator = n ?? "-", this.minScreenSize = s ?? new U(350, 350);
  }
}
class It extends Yt {
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
  constructor(t) {
    super(), this.name = t, this.isDeleted = !1;
  }
  get id() {
    return this.name;
  }
  setName(t) {
    return this.name === t || !this.canBeEdited ? this : (this.name = t, this.confirmChanges(), this);
  }
  setAlias(t) {
    return this.alias === t || !this.canBeEdited ? this : (this.alias = t, this.getRoot().addShortcut(t, this), this.confirmChanges(), this);
  }
  setParent(t) {
    return this.parent === t || !this.canBeEdited ? this : (this.parent = t, this.confirmChanges(), this);
  }
  setProtected(t) {
    return this.canBeEdited ? (this.isProtected = t, this) : this;
  }
  setIconUrl(t) {
    return this.iconUrl === t || !this.canBeEdited ? this : (this.iconUrl = t, this.confirmChanges(), this);
  }
  getIconUrl() {
    if (this.isDeleted) {
      const e = this.parent?.getRoot().systemManager;
      return e ? e.skin.fileIcons.generic : "";
    }
    if (this.iconUrl != null) return this.iconUrl;
    if (this.linkedFile?.iconUrl != null) return this.linkedFile.iconUrl;
    if (this.linkedFolder?.iconUrl != null) return this.linkedFolder.iconUrl;
    const { skin: t } = this.getRoot().systemManager;
    return t.fileIcons.generic;
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
    const t = this.parent;
    t != null && ((this.isFolder() || this.isFile()) && t.remove(this), this.isDeleted = !0, this.confirmChanges(t.getRoot()));
  }
  confirmChanges(t) {
    if (t == null) {
      if (this.isDeleted)
        return;
      t = this.getRoot();
    }
    t.loadedDefaultData && (this.editedByUser = !0), t.saveData(), this.emit(It.UPDATE_EVENT);
  }
  /**
   * Opens this item in the appropriate application.
   */
  open(...t) {
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
    const t = this.isProtected && this.getRoot().loadedDefaultData;
    return !t && this.parent != null ? this.parent.canBeEdited : !t;
  }
  /**
   * Returns the root folder.
   */
  getRoot() {
    const t = this.root ?? this.parent?.getRoot();
    if (t == null)
      throw new Error("Root not found");
    return t;
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
    const t = this.toJSON();
    return t == null ? null : JSON.stringify(t);
  }
}
const va = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "css",
  "html",
  "xml",
  "yml"
], hn = [
  "png",
  "jpeg",
  "svg",
  "gif",
  "webp",
  "ico"
], pn = [
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
], fn = [
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
], Ia = [
  ...hn,
  ...pn,
  ...fn
], st = {
  external: "ext://",
  app: "app://"
};
function Ps(r = !1, t) {
  r && window.confirm(`Are you sure you want to shut down ${t}?`) && (console.info("Closing viewport"), window.open("about:blank", "_self"));
}
function Ls() {
  console.info("Reloading viewport"), window.location.reload();
}
function mn(r) {
  document.title = r, document.querySelectorAll("meta[property='og:title'], meta[name='twitter:title']").forEach((t) => {
    t.setAttribute("content", r);
  });
}
function ve(r) {
  const t = document.querySelectorAll("link[rel~='icon'], link[rel~='apple-touch-icon']");
  if (t.length == 0) {
    const e = document.createElement("link");
    e.rel = "icon", e.href = r, document.head.appendChild(e);
  }
  t.forEach((e) => {
    e.href = r;
  });
}
function gn() {
  const r = window.location.search.slice(1), t = {};
  return r.split("&").forEach((e) => {
    const [n, s] = e.split("=").map((i) => decodeURIComponent(decodeURIComponent(i)));
    t[n] = s;
  }), t;
}
function Ie(r) {
  let t = window.location.origin + "/";
  if (!r || Object.keys(r).length === 0)
    return t;
  const { appId: e, fullscreen: n, standalone: s, ...i } = r, o = new URLSearchParams();
  return s && e ? t += e : (e && o.set("app", e), n && o.set("fullscreen", n.toString())), i && Object.keys(i).length > 0 && Object.entries(i).forEach(([u, l]) => {
    u && l && o.set(u, encodeURIComponent(l));
  }), o.size === 0 ? t : `${t}?${o.toString()}`;
}
function _e(r, t) {
  window.open(r, t ?? "_blank");
}
function Bs(r, t, e) {
  navigator.clipboard.writeText(r).then(t, e);
}
function We(r, t) {
  const e = document.createElement("a");
  e.href = r, e.download = t, e.style.display = "none", document.body.appendChild(e), e.click(), document.body.removeChild(e);
}
function qt(r) {
  const t = [], e = [];
  return r.forEach((n) => {
    if (n.length > 1)
      n === "Control" ? t.push("Ctrl") : t.push(n);
    else
      switch (n) {
        case "+":
          e.push("Plus");
          break;
        case "-":
          e.push("Minus");
          break;
        default:
          e.push(n.toUpperCase());
          break;
      }
  }), t.concat(e).join("+");
}
function wn(r) {
  if (r == null || typeof r == "boolean")
    return !0;
  if (typeof r == "string")
    return !r;
  if (typeof r == "number" || sn(r))
    return !1;
  let t = !1;
  return rn.forEach(r, (e) => {
    t || wn(e) || (t = !0);
  }), !t;
}
class me {
  static START_DATE;
  /**
   * Resets the time.
   */
  static reset() {
    me.START_DATE = /* @__PURE__ */ new Date();
  }
  /**
   * Get the current uptime.
   */
  static getUptime(t = 2) {
    return en(me.START_DATE, t, !1);
  }
}
class Z extends It {
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
  constructor(t, e) {
    super(t), this.extension = e;
  }
  setAlias(t) {
    return super.setAlias(t);
  }
  /**
   * Sets the source of this file and removes the content.
   */
  setSource(t) {
    return this.source === t || !this.canBeEdited ? this : (this.source = t, this.content = null, this.emit(Z.CONTENT_CHANGE_EVENT, this), this.confirmChanges(), this);
  }
  /**
   * Sets the content of this file and removes the source.
   */
  setContent(t) {
    return this.content === t || !this.canBeEdited ? this : (this.content = typeof t == "string" ? t : t.join(`
`), this.source = null, this.emit(Z.CONTENT_CHANGE_EVENT, this), this.confirmChanges(), this);
  }
  get id() {
    return this.extension == null || this.extension.trim() === "" ? this.name : `${this.name}.${this.extension}`;
  }
  static splitId(t) {
    if (!t.includes("."))
      return { name: t, extension: "" };
    const e = t.split("."), n = e.pop();
    return { name: e.join("."), extension: n };
  }
  /**
   * Opens this file in an app associated with its extension.
   */
  open(t) {
    return t.openFile(this);
  }
  async read() {
    return this.isDeleted ? null : this.content != null ? this.content : this.source == null ? null : this.extension == null || !Z.NON_TEXT_EXTENSIONS.includes(this.extension) ? this.getRoot().readSource(this.source) : this.source;
  }
  isFile() {
    return !0;
  }
  getIconUrl() {
    if (this.isDeleted)
      return super.getIconUrl();
    if (this.iconUrl != null)
      return this.iconUrl;
    const { skin: t, appsConfig: e } = this.getRoot().systemManager;
    if (this.source != null) {
      if (this.extension != null) {
        if (hn.includes(this.extension))
          return this.source;
        if (fn.includes(this.extension))
          return t.fileIcons.video ?? t.fileIcons.generic;
        if (pn.includes(this.extension))
          return t.fileIcons.audio ?? t.fileIcons.generic;
      } else if (this.source.startsWith(st.app)) {
        const s = e.getAppById(Z.removeFileScheme(this.source));
        if (s?.iconUrl != null)
          return s.iconUrl;
      } else if (this.source.startsWith(st.external) && t.fileIcons.external != null)
        return t.fileIcons.external;
    }
    let n = null;
    switch (this.extension) {
      case "txt":
      case "md":
        n = t.fileIcons.text ?? t.fileIcons.generic;
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
        n = t.fileIcons.code ?? t.fileIcons.generic;
        break;
      default:
        n = t.fileIcons.generic;
        break;
    }
    return n;
  }
  getType() {
    let t = "";
    if (this.extension == null) return "Unknown file";
    switch (this.extension) {
      case "png":
        t = "PNG Image";
        break;
      case "txt":
        t = "Text";
        break;
      case "md":
        t = "Markdown source";
        break;
      case "xml":
        t = "XML source";
        break;
    }
    return `${t} file (.${this.extension.toLowerCase()})`.trim();
  }
  download() {
    if (this.isDownloadable())
      try {
        if (this.source != null)
          We(this.source, this.id);
        else if (this.content != null) {
          const t = new Blob([this.content], { type: "text/plain" }), e = window.URL.createObjectURL(t);
          We(e, this.id), window.URL.revokeObjectURL(e);
        }
      } catch (t) {
        console.error("Error while downloading file:", t);
      }
  }
  isDownloadable() {
    return this.content != null ? !0 : this.source != null ? !this.source.startsWith(st.external) && !this.source.startsWith(st.app) : !1;
  }
  toJSON() {
    if (!this.canBeEdited || this.editedByUser == null || !this.editedByUser)
      return null;
    const t = super.toJSON();
    return t == null ? null : (this.extension != null && (t.ext = this.extension), this.content != null ? t.cnt = this.content : this.source != null && (t.src = this.source), t);
  }
  static removeFileScheme(t) {
    let e = !1;
    return Object.values(st).forEach((n) => {
      t.startsWith(n) && !e && (t.replace(n, ""), e = !0);
    }), t;
  }
}
class $s extends Z {
  linkedPath;
  constructor(t, e) {
    super(t), this.linkedFile = e;
  }
  setLinkedFile(t) {
    return this.linkedFile = t, t !== null && (this.linkedPath = t.path, this.extension = t.extension, this.content = t.content, this.source = t.source), this;
  }
  setLinkedPath(t) {
    if (this.linkedFile && this.linkedFile.path === t)
      return this;
    const e = this.parent?.navigate(t);
    return e instanceof Z ? this.setLinkedFile(e) : this.linkedFile = null, this;
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
  setAlias(...t) {
    return this.isValid() && this.linkedFile?.setAlias(...t), this;
  }
  setSource(...t) {
    return this.isValid() && this.linkedFile?.setSource(...t), this;
  }
  setContent(...t) {
    return this.isValid() && this.linkedFile?.setContent(...t), this;
  }
  get id() {
    return this.isValid() ? this.linkedFile?.id ?? "" : "";
  }
  open(...t) {
    return this.isValid() ? this.linkedFile?.open(...t) : null;
  }
  async read(...t) {
    if (this.isValid()) return await this.linkedFile?.read(...t);
  }
  getIconUrl(...t) {
    const { skin: e } = this.getRoot().systemManager, n = e.fileIcons.generic;
    return this.isValid() ? this.iconUrl ?? this.linkedFile?.getIconUrl(...t) ?? n : n;
  }
}
class Tt extends It {
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
  constructor(t, e) {
    super(t), this.subFolders = [], this.files = [], this.type = e ?? Tt.TYPE.general;
  }
  setAlias(t) {
    return super.setAlias(t);
  }
  /**
   * Returns true if this folder contains a file matching a name and extension.
   */
  hasFile(t, e) {
    return this.findFile(t, e) !== null;
  }
  /**
   * Returns true if this folder contains a folder matching a name.
   */
  hasFolder(t) {
    return this.findSubFolder(t) !== null;
  }
  /**
   * Finds and returns a file inside this folder matching a name and extension.
   */
  findFile(t, e) {
    if (this.isDeleted)
      return null;
    let n = null;
    return this.files.forEach((s) => {
      const i = s.name === t || s.alias && s.alias === t, o = e == null || s.extension === e;
      if (i && o)
        return n = s;
    }), n;
  }
  /**
   * Finds and returns a folder inside this folder matching a name.
   */
  findSubFolder(t) {
    if (this.isDeleted)
      return null;
    let e = null;
    return this.subFolders.forEach((n) => {
      if (n.name === t || n.alias && n.alias === t)
        return e = n;
    }), e;
  }
  addFile(t, e = !0) {
    return this.files.push(t), e ? t.setParent(this) : t.parent = this, this;
  }
  /**
   * Creates a file with a name and extension.
   */
  createFile(t, e, n) {
    if (!this.canBeEdited)
      return this;
    let s = this.findFile(t, e);
    return s == null && (s = new Z(t, e), this.addFile(s, !1)), n?.(s), s.confirmChanges(), this;
  }
  /**
   * Creates files based on an array of objects with file names and extensions.
   */
  createFiles(t) {
    return this.canBeEdited ? (t.forEach(({ name: e, extension: n }) => {
      this.createFile(e, n);
    }), this.confirmChanges(), this) : this;
  }
  /**
   * Creates a file link with a name.
   */
  createFileLink(t, e) {
    if (!this.canBeEdited)
      return this;
    let n = this.findFile(t);
    return n == null && (n = new $s(t), this.files.push(n), n.parent = this), e?.(n), n.confirmChanges(), this;
  }
  /**
   * Creates file links based on an array of objects with file names and extensions.
   */
  createFileLinks(t) {
    return this.canBeEdited ? (t.forEach(({ name: e }) => {
      this.createFileLink(e);
    }), this.confirmChanges(), this) : this;
  }
  addFolder(t, e = !0) {
    return this.subFolders.push(t), e ? t.setParent(this) : t.parent = this, this;
  }
  /**
   * Creates a folder with a name.
   */
  createFolder(t, e) {
    if (!this.canBeEdited)
      return this;
    let n = this.findSubFolder(t);
    return n == null && (n = new Tt(t), this.addFolder(n, !1)), e?.(n), n.confirmChanges(), this;
  }
  /**
   * Creates folders based on an array of folder names.
   */
  createFolders(t) {
    return this.canBeEdited ? (t.forEach((e) => {
      this.createFolder(e);
    }), this.confirmChanges(), this) : this;
  }
  /**
   * Creates a folder link with a name.
   */
  createFolderLink(t, e) {
    if (!this.canBeEdited)
      return this;
    let n = this.findSubFolder(t);
    return n == null && (n = new Ws(t), this.subFolders.push(n), n.parent = this), e?.(n), n.confirmChanges(), this;
  }
  /**
   * Creates folder links based on an array of folder names.
   */
  createFolderLinks(t) {
    return this.canBeEdited ? (t.forEach((e) => {
      this.createFolder(e);
    }), this.confirmChanges(), this) : this;
  }
  /**
   * Removes a file or folder from this folder.
   */
  remove(t) {
    return this.canBeEdited ? (t.parent = void 0, t.isFile() ? vt(t, this.files) : t.isFolder() && vt(t, this.subFolders), t.confirmChanges(this.getRoot()), this.emit(It.UPDATE_EVENT), this) : this;
  }
  create(t) {
    return this.navigate(t, !0);
  }
  /**
   * Returns the file or folder at a relative path or null if it doesn't exist.
   */
  navigate(t, e = !1) {
    const n = t.split("/");
    let s = this;
    const i = (c, u, l) => {
      if (u && c === "")
        return this.getRoot();
      if (u && Object.keys(this.getRoot().shortcuts).includes(c))
        return this.getRoot().shortcuts[c];
      if (c === ".")
        return this;
      if (c === "..")
        return s?.parent;
      if (s?.isFolder()) {
        let d = s.findSubFolder(c);
        return d == null && e && !l && s.createFolder(c, (h) => d = h), d;
      } else
        return null;
    };
    if (n.length === 1) {
      const c = i(n[0], !0, !0);
      if (c != null)
        return c;
    }
    for (let c = 0; c < n.length - 1; c++) {
      const u = n[c];
      s = i(u, c === 0, !1);
    }
    const o = n.at(-1);
    if (o)
      if (s != null && s.isFolder()) {
        const c = s.findSubFolder(o);
        if (c != null) return c;
        const { name: u, extension: l } = Z.splitId(o);
        let d = s.findFile(u, l);
        return d == null && e && s.createFile(u, l, (h) => d = h), d;
      } else
        return null;
    else return s;
  }
  navigateToFolder(t) {
    const e = this.navigate(t);
    return e !== null && e.isFolder() ? e : null;
  }
  navigateToFile(t) {
    const e = this.navigate(t);
    return e !== null && e.isFile() ? e : null;
  }
  /**
   * Opens this folder in file explorer.
   */
  open(t) {
    if (this.isDeleted)
      return;
    const { appsConfig: e } = this.getRoot().systemManager, n = e.getAppByRole(q.APP_ROLES.fileExplorer);
    if (n != null)
      return t.open(n.id, { path: this.path });
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
    ].forEach((e) => {
      e.delete();
    }), this.confirmChanges();
  }
  /**
   * Returns all files inside this folder.
   * @param showHidden - Whether to include hidden files.
   */
  getFiles(t = !1) {
    return this.isDeleted ? [] : t ? this.files : this.files.filter(
      ({ name: e }) => !e.startsWith(".")
    );
  }
  /**
   * Returns all sub-folders inside this folder.
   * @param showHidden - Whether to include hidden folders.
   */
  getSubFolders(t = !1) {
    return this.isDeleted ? [] : t ? this.subFolders : this.subFolders.filter(
      ({ name: e }) => !e.startsWith(".")
    );
  }
  /**
   * Returns the amount of files and sub-folders inside this folder.
   * @param includeHidden - Whether to include hidden files and folders in the count.
   */
  getItemCount(t = !1) {
    const e = this.getFiles(t).length, n = this.getSubFolders(t).length;
    return e + n;
  }
  isFolder() {
    return !0;
  }
  getIconUrl() {
    if (this.isDeleted)
      return super.getIconUrl();
    if (this.iconUrl != null)
      return this.iconUrl;
    const { skin: t } = this.getRoot().systemManager;
    return t.folderIcons.generic;
  }
  toJSON() {
    const t = super.toJSON();
    if (t == null)
      return null;
    if (this.files.length > 0) {
      const e = this.files.map((n) => n.toJSON()).filter((n) => n != null);
      e.length > 0 && (t.fls = e);
    }
    if (this.subFolders.length > 0) {
      const e = this.subFolders.map((n) => n.toJSON()).filter((n) => n != null);
      e.length > 0 && (t.fds = e);
    }
    return !this.editedByUser && (!t.fls || t.fls.length === 0) && (!t.fds || t.fds.length === 0) ? null : t;
  }
}
class Ws extends Tt {
  linkedPath;
  constructor(t, e) {
    super(t), this.linkedFolder = e;
  }
  setLinkedFolder(t) {
    return this.linkedFolder = t, t !== null && (this.linkedPath = t.path, this.type = t.type), this;
  }
  setLinkedPath(t) {
    if (this.linkedFolder && this.linkedFolder.path === t)
      return this;
    const e = this.navigate(t);
    return e instanceof Tt ? this.setLinkedFolder(e) : this.linkedFolder = null, this;
  }
  isValid() {
    return this.linkedPath ? (this.setLinkedPath(this.linkedPath), this.linkedFolder != null) : !1;
  }
  getIconUrl() {
    if (this.iconUrl != null)
      return this.iconUrl;
    if (this.isValid() && this.linkedFolder?.iconUrl)
      return this.linkedFolder.iconUrl;
    const { skin: t } = this.getRoot().systemManager;
    return t.folderIcons.link ?? t.folderIcons.generic;
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
  setAlias(...t) {
    return this.isValid() && this.linkedFolder?.setAlias(...t), this;
  }
  createFile(...t) {
    return this.isValid() && this.linkedFolder?.createFile(...t), this;
  }
  createFiles(...t) {
    return this.isValid() && this.linkedFolder?.createFiles(...t), this;
  }
  createFolder(...t) {
    return this.isValid() && this.linkedFolder?.createFolder(...t), this;
  }
  createFolders(...t) {
    return this.isValid() && this.linkedFolder?.createFolders(...t), this;
  }
  hasFile(...t) {
    return this.isValid() ? this.linkedFolder?.hasFile(...t) ?? !1 : !1;
  }
  hasFolder(...t) {
    return this.isValid() ? this.linkedFolder?.hasFolder(...t) ?? !1 : !1;
  }
  findFile(...t) {
    return this.isValid() ? this.linkedFolder?.findFile(...t) : null;
  }
  findSubFolder(...t) {
    return this.isValid() ? this.linkedFolder?.findSubFolder(...t) : null;
  }
  getFiles(...t) {
    return this.isValid() ? this.linkedFolder?.getFiles(...t) ?? [] : [];
  }
  getSubFolders(...t) {
    return this.isValid() ? this.linkedFolder?.getSubFolders(...t) ?? [] : [];
  }
  open(...t) {
    return this.isValid() ? this.linkedFolder?.open(...t) : null;
  }
  getItemCount(...t) {
    return this.isValid() ? this.linkedFolder?.getItemCount(...t) ?? 0 : 0;
  }
}
function Us(r, t) {
  const { skin: e, appsConfig: n, virtualDriveConfig: s } = r, i = {};
  t.createFolder("home", (o) => {
    o.createFolder("prozilla-os", (c) => {
      c.setAlias("~").createFolder(".config", (u) => {
        u.createFile("desktop", "xml", (l) => {
          l.setContent([
            "<options>",
            `	<wallpaper>${e.defaultWallpaper}</wallpaper>`,
            "	<show-icons>true</show-icons>",
            "</options>"
          ]);
        }).createFile("taskbar", "xml", (l) => {
          l.setContent([
            "<options>",
            `	<pins>${n.apps.filter((d) => d.pinnedByDefault).map(({ id: d }) => d).join(",")}</pins>`,
            "</options>"
          ]);
        }).createFile("apps", "xml", (l) => {
          l.setContent([
            "<options>",
            `	<startup>${n.apps.filter((d) => d.launchAtStartup).map(({ id: d }) => d).join(",")}</startup>`,
            "</options>"
          ]);
        }).createFile("theme", "xml", (l) => {
          l.setContent([
            "<options>",
            `	<theme>${e.defaultTheme ?? Kt.Dark}</theme>`,
            "</options>"
          ]);
        });
      }), s.defaultData.includePicturesFolder && c.createFolder("Pictures", (u) => {
        u.setIconUrl(e.folderIcons.images ?? e.folderIcons.generic), u.createFolder("Wallpapers", (l) => {
          l.setProtected(!0);
          for (let d = 0; d < e.wallpapers.length; d++) {
            const h = e.wallpapers[d];
            l.createFile(`Wallpaper${d + 1}`, "png", (p) => {
              p.setSource(h);
            });
          }
        }).createFile("ProzillaOS", "png", (l) => {
          l.setSource("/assets/banner-logo-title.png");
        }).createFile("Icon", "svg", (l) => {
          l.setSource("/icon.svg");
        }).createFolder("Crumbling City", (l) => {
          l.createFile("Japan", "png", (d) => {
            d.setSource("https://daisygames.org/media/Games/Crumbling%20City/CrumblingCityRelease.png");
          }).createFile("City Center", "png", (d) => {
            d.setSource("https://daisygames.org/media/Games/Crumbling%20City/Screenshot_City_Firegun.png");
          }).createFile("Farms", "png", (d) => {
            d.setSource("https://daisygames.org/media/Games/Crumbling%20City/Screenshot_Farms_Hammer.png");
          });
        }), i.images = u.path;
      }), s.defaultData.includeDocumentsFolder && c.createFolder("Documents", (u) => {
        u.setIconUrl(e.folderIcons.text ?? e.folderIcons.generic), u.createFile("text", "txt", (l) => {
          l.setContent("Hello world!");
        }).createFile("Info", "md", (l) => {
          l.setProtected(!0).setSource("/documents/info.md").setIconUrl(e.fileIcons.info ?? e.fileIcons.generic), i.info = l.path;
        }).createFile("Prozilla", "md", (l) => {
          l.setProtected(!0).setSource("/documents/prozilla.md"), i.links = l.path;
        }), i.documents = u.path;
      }), s.defaultData.includeDesktopFolder && c.createFolder("Desktop", (u) => {
        u.createFileLink("Info.md", (l) => {
          l.isLink() && l.setLinkedPath(i.info);
        }).createFileLink("Prozilla.md", (l) => {
          l.isLink() && l.setLinkedPath(i.links);
        }).createFolderLink("Pictures", (l) => {
          l.isLink() && l.setLinkedPath(i.images);
        }).createFolderLink("Documents", (l) => {
          l.isLink() && l.setLinkedPath(i.documents);
        }).createFile("Documentation", void 0, (l) => {
          l.setSource(st.external + "https://os.prozilla.dev/docs/");
        }), n.apps.forEach((l) => {
          l.showDesktopIcon && u.createFile(l.name, void 0, (d) => {
            d.setSource(st.app + l.id).setIconUrl(l.iconUrl);
          });
        });
      }), s.defaultData.includeVideoFolder && c.createFolder("Videos", (u) => {
        u.setIconUrl(e.folderIcons.video ?? e.folderIcons.generic).createFile("Weezer_Buddy-Holly", "yt", (l) => {
          l.setSource("https://www.youtube.com/watch?v=kemivUKb4f4");
        });
      }), s.defaultData.includeAudioFolder && c.createFolder("Audio", (u) => {
        u.setIconUrl(e.folderIcons.audio ?? e.folderIcons.generic).createFile("Andrew-Applepie_Im-So", "ogg", (l) => {
          l.setSource("/assets/audio/Andrew-Applepie_Im-So.ogg");
        }).createFile("Andrew-Applepie_Run-Part-2", "ogg", (l) => {
          l.setSource("/assets/audio/Andrew-Applepie_Run-Part-2.ogg");
        });
      }), s.defaultData.includeAppsFolder && c.createFolder("Apps", (u) => {
        n.apps.forEach((l) => {
          u.createFile(l.name, void 0, (d) => {
            d.setSource(st.app + l.id).setIconUrl(l.iconUrl);
          });
        });
      }), s.defaultData.includeScriptsFolder && c.createFolder("Scripts", (u) => {
        u.createFile("fizzbuzz", "", (l) => {
          l.setSource("/scripts/fizzbuzz");
        }).createFile("helloworld", "", (l) => {
          l.setSource("/scripts/helloworld");
        });
      });
    });
  }), s.defaultData.includeSourceTree && zs(t);
  try {
    s.defaultData.loadData?.(t);
  } catch (o) {
    console.error(o);
  }
}
function zs(r) {
  const t = [
    "/public/config/tree.json"
  ];
  fetch("/config/tree.json").then(
    (e) => e.json()
  ).then(({ files: e, folders: n }) => {
    n.forEach((s) => {
      const i = s.lastIndexOf("/");
      if (i === -1) {
        r.createFolder(s);
        return;
      }
      const o = s.substring(0, i), c = s.substring(i + 1);
      r.navigate(o).createFolder(c);
    }), e.forEach((s) => {
      if (t.includes(s))
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
      const c = s.substring(0, i), { name: u, extension: l } = Z.splitId(s.substring(i + 1));
      r.navigate(c).createFile(u, l, o);
    });
  }).catch(() => {
    console.warn("Failed to load source tree. Make sure the tree data is valid and up-to-date using the fetchRepository script.");
  });
}
class et {
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
  store(t, e) {
    const { result: n, size: s } = this.encode(e);
    if (this.prefix !== void 0 && !t.startsWith(this.prefix) && (t = this.prefix + t), et.getByteSize(t) + s > et.MAX_BYTES)
      throw new Error("Failed to store value: storage capacity exceeded.");
    localStorage.setItem(t, n);
  }
  /**
   * Loads a value associated with the given key.
   * @param key - The key of the item.
   * @returns The value of the item.
   */
  load(t) {
    this.prefix !== void 0 && !t.startsWith(this.prefix) && (t = this.prefix + t);
    let e = localStorage.getItem(t);
    if (e == null) {
      if (this.prefix === void 0 || !t.startsWith(this.prefix))
        return null;
      const n = t.replace(this.prefix, "");
      if (e = localStorage.getItem(n), e != null)
        localStorage.removeItem(n), localStorage.setItem(t, e);
      else
        return null;
    }
    return this.decode(e);
  }
  /**
   * Replaces the key of an item if it exists.
   * @param oldKey - The key to replace.
   * @param newKey - The new key.
   */
  rename(t, e) {
    const n = localStorage.getItem(t);
    return this.prefix !== void 0 && !e.startsWith(this.prefix) && (e = this.prefix + e), n == null ? (this.prefix !== void 0 && !t.startsWith(this.prefix) && this.rename(this.prefix + t, e), this) : (localStorage.removeItem(t), localStorage.setItem(e, n), this);
  }
  /**
   * Removes the item with the given key from this storage.
   * @param key - The key of the item.
   */
  remove(t) {
    return localStorage.removeItem(t), this;
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
  getItemByteSize(t, e) {
    return this.prefix !== void 0 && !t.startsWith(this.prefix) && (t = this.prefix + t), et.getByteSize(t) + this.getEncodedByteSize(e);
  }
  getEncodedByteSize(t) {
    return t == null ? 0 : this.encode(t).size;
  }
  encode(t) {
    const e = et.getByteSize(t);
    if (!this.enableCompression || !t.length)
      return { result: t, size: e };
    const n = Be.compressToUTF16(t), s = et.getByteSize(n);
    return e <= s ? { result: et.UNCOMPRESSED_PREFIX + t, size: e } : { result: et.COMPRESSED_PREFIX + n, size: s };
  }
  decode(t) {
    return t.length ? t.startsWith(et.COMPRESSED_PREFIX) ? Be.decompressFromUTF16(t.slice(1)) : t.startsWith(et.UNCOMPRESSED_PREFIX) ? t.slice(1) : t : t;
  }
  setPrefix(t) {
    return this.prefix = t, this;
  }
  static getByteSize(t) {
    return t == null ? 0 : new Blob([t]).size;
  }
  static byteToKilobyte(t) {
    return t / 1e3;
  }
}
class jt extends et {
  virtualDriveConfig;
  static KEY = "drive";
  constructor(t) {
    super(), this.virtualDriveConfig = t, this.synchronize(), this.virtualDriveConfig.saveData && this.virtualDriveConfig.saveData.migrations?.forEach(([e, n]) => this.rename(e, n));
  }
  load(t) {
    return this.synchronize(), super.load(t);
  }
  store(t, e) {
    this.synchronize(), super.store(t, e);
  }
  synchronize() {
    this.virtualDriveConfig.saveData && (this.enableCompression = this.virtualDriveConfig.saveData.enableCompression, this.prefix = this.virtualDriveConfig.saveData.prefix);
  }
}
class ye extends Tt {
  /** Aliases for files and folders. */
  shortcuts;
  initiated = !1;
  loadedDefaultData = !1;
  systemManager;
  storage;
  static ERROR_EVENT = "error";
  constructor(t) {
    super("root"), this.root = this, this.systemManager = t, this.storage = new jt(t.virtualDriveConfig), this.isRoot = !0, this.shortcuts = {};
  }
  loadDefaultData() {
    Us(this.systemManager, this);
  }
  loadData() {
    if (!this.systemManager.virtualDriveConfig.saveData)
      return;
    const t = this.storage.load(jt.KEY);
    if (t == null)
      return;
    let e = null;
    try {
      e = JSON.parse(t);
    } catch (o) {
      console.error(o);
    }
    if (e == null)
      return;
    const n = { ...e.scs }, s = ({
      nam: o,
      ext: c,
      src: u,
      cnt: l,
      lnk: d,
      ico: h
    }, p = this) => {
      if (d) {
        p.createFileLink(o, (f) => {
          f.setLinkedPath(d), h != null && f.setIconUrl(h);
        });
        return;
      }
      p.createFile(o, c, (f) => {
        u != null ? f.setSource(u) : l != null && f.setContent(l), h != null && f.setIconUrl(h);
      });
    }, i = ({
      nam: o,
      fds: c,
      fls: u,
      lnk: l,
      ico: d
    }, h = this) => {
      if (l) {
        h.createFolderLink(o, (p) => {
          p.setLinkedPath(l), d != null && p.setIconUrl(d);
        });
        return;
      }
      h.createFolder(o, (p) => {
        if (Object.values(n).includes(p.displayPath)) {
          let f = null;
          for (const [g, E] of Object.entries(n))
            E === p.displayPath && (f = g);
          f != null && p.setAlias(f);
        }
        c?.forEach((f) => {
          i(f, p);
        }), u?.forEach((f) => {
          s(f, p);
        }), d != null && p.setIconUrl(d);
      });
    };
    e.fds != null && e.fds.forEach((o) => {
      i(o);
    }), e.fls != null && e.fls.forEach((o) => {
      s(o);
    });
  }
  /**
   * Calls the storage manager's store function with this root's data as a string.
   */
  saveData() {
    if (!this.initiated || !this.systemManager.virtualDriveConfig.saveData)
      return;
    const t = this.toString();
    if (t != null)
      try {
        this.storage.store(jt.KEY, t);
      } catch (e) {
        console.error(e), this.emit(ye.ERROR_EVENT, {
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
  addShortcut(t, e) {
    return this.shortcuts[t] = e, this;
  }
  async readSource(t) {
    return await fetch(t).then(
      (e) => e.text()
    ).catch((e) => (console.error(`Error while reading file with ID: ${this.id}
`, e), null));
  }
  /**
   * Tells the storage manager to clear all data and reloads the window.
   */
  reset() {
    window.confirm("Are you sure you want to reset all your data?") && (this.systemManager.storage.clear(), window.location.reload());
  }
  static isValidName(t) {
    return !0;
  }
  static isValidFileName(t) {
    return !0;
  }
  static isValidFolderName(t) {
    return !0;
  }
  get path() {
    return "";
  }
  get displayPath() {
    return "/";
  }
  toJSON() {
    const t = super.toJSON();
    if (t == null)
      return null;
    if (Object.entries(this.shortcuts).length > 0) {
      t.scs = {};
      for (const [e, n] of Object.entries(this.shortcuts))
        n.root || (t.scs[e] = n.absolutePath);
    }
    return t;
  }
  toString() {
    const t = this.toJSON();
    return t == null ? null : JSON.stringify(t);
  }
}
class Vs {
  saveData;
  defaultData;
  constructor(t = {}) {
    const { saveData: e, defaultData: n } = t;
    this.saveData = e ?? {
      enableCompression: !1,
      prefix: "pos-",
      migrations: [["data", jt.KEY]]
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
class _a {
  #t;
  #e = [];
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
  setName(t) {
    return this.#t = t, t && !this.manual?.usage && (this.manual || (this.manual = {}), this.manual.usage = t), this;
  }
  matches(t) {
    return this.name === t || this.aliases.includes(t);
  }
  get name() {
    return this.#t ?? "";
  }
  get aliases() {
    return this.#e;
  }
  setExecute(t) {
    return this.execute = t, this;
  }
  setRequireArgs(t) {
    return this.requireArgs = t, this;
  }
  setRequireOptions(t) {
    return this.requireOptions = t, this;
  }
  setManual({ purpose: t, usage: e, description: n, options: s }) {
    return this.manual = { purpose: t, usage: e, description: n, options: s }, this;
  }
  /**
   * Registers a new option/flag for this command.
   */
  addOption({ short: t, long: e, isInput: n = !1 }) {
    return this.options.push({ short: t, long: e, isInput: n }), this;
  }
  /**
   * Retrieves an option definition by either its short or long name.
   */
  getOption(t) {
    return this.options.find((e) => e.short === t || e.long === t);
  }
  addAlias(t) {
    return this.#e.push(t), this;
  }
}
const Hs = /* @__PURE__ */ Object.assign({ "./commands/afire.ts": () => import("/assets/afire-DlRwSfiJ.js"), "./commands/banner.ts": () => import("/assets/banner-jSvYkuqB.js"), "./commands/cat.ts": () => import("/assets/cat-B_KOgu80.js"), "./commands/cd.ts": () => import("/assets/cd-DGILEGTs.js"), "./commands/clear.ts": () => import("/assets/clear-C8xhqHmC.js"), "./commands/cmatrix.ts": () => import("/assets/cmatrix-DvaWzvRn.js"), "./commands/compgen.ts": () => import("/assets/compgen-2kLzA1wV.js"), "./commands/cowsay.ts": () => import("/assets/cowsay-CTLxUPtF.js"), "./commands/date.ts": () => import("/assets/date-CA1ub92R.js"), "./commands/dir.ts": () => import("/assets/dir-w2XNd6oI.js"), "./commands/doubleBracket.ts": () => import("/assets/doubleBracket-B5nqIccY.js"), "./commands/echo.ts": () => import("/assets/echo-_hDVbupR.js"), "./commands/eval.ts": () => import("/assets/eval-4uLqmhXl.js"), "./commands/exit.ts": () => import("/assets/exit-w3PqRkwA.js"), "./commands/false.ts": () => import("/assets/false-D6AWAlcU.js"), "./commands/fortune.ts": () => import("/assets/fortune-D8ZK6xtX.js"), "./commands/grep.ts": () => import("/assets/grep-DZO92KaH.js"), "./commands/head.ts": () => import("/assets/head-C_bbNyUc.js"), "./commands/help.ts": () => import("/assets/help-OHTeCzgo.js"), "./commands/history.ts": () => import("/assets/history-DeQor0w1.js"), "./commands/hostname.ts": () => import("/assets/hostname-B-lPyRps.js"), "./commands/htop.ts": () => import("/assets/htop-l0sNRNKZ.js"), "./commands/install.ts": () => import("/assets/install-D2im81Ke.js"), "./commands/less.ts": () => import("/assets/less-wELkkcQx.js"), "./commands/lolcat.ts": () => import("/assets/lolcat-xpDAXsIt.js"), "./commands/ls.ts": () => import("/assets/ls-D2Ln7mue.js"), "./commands/man.ts": () => import("/assets/man-CAthVoAG.js"), "./commands/mkdir.ts": () => import("/assets/mkdir-BdEywO2H.js"), "./commands/nano.ts": () => import("/assets/nano-DsRjsQ-k.js"), "./commands/neofetch.ts": () => import("/assets/neofetch-CgwDNr-T.js"), "./commands/pipes.ts": () => import("/assets/pipes-CQ-pK6Kv.js"), "./commands/posh.ts": () => import("/assets/posh-MaU_ieMp.js"), "./commands/printenv.ts": () => import("/assets/printenv-Cq-skM9d.js"), "./commands/pwd.ts": () => import("/assets/pwd-CZ9IWAfu.js"), "./commands/rain.ts": () => import("/assets/rain-DT-V01dD.js"), "./commands/reboot.ts": () => import("/assets/reboot-nbAmZck6.js"), "./commands/reload.ts": () => import("/assets/reload-CE3ZVq6O.js"), "./commands/rev.ts": () => import("/assets/rev-C5m1qeoZ.js"), "./commands/rm.ts": () => import("/assets/rm-Uxuv-dEz.js"), "./commands/rmdir.ts": () => import("/assets/rmdir-BYWer3pb.js"), "./commands/sl.ts": () => import("/assets/sl-BGOMkvAR.js"), "./commands/sleep.ts": () => import("/assets/sleep-hEBW30R3.js"), "./commands/snow.ts": () => import("/assets/snow-DAlyPPxX.js"), "./commands/tail.ts": () => import("/assets/tail-BLlaoTxA.js"), "./commands/touch.ts": () => import("/assets/touch-BReUyL_z.js"), "./commands/true.ts": () => import("/assets/true-j1Uf2Nz9.js"), "./commands/uniq.ts": () => import("/assets/uniq-LncLpnFY.js"), "./commands/uptime.ts": () => import("/assets/uptime-pYltXMOi.js"), "./commands/vi.ts": () => import("/assets/vi-Cgo3qLR9.js"), "./commands/watch.ts": () => import("/assets/watch-B4Tgzgbn.js"), "./commands/whatis.ts": () => import("/assets/whatis-BPKA-MNF.js"), "./commands/whoami.ts": () => import("/assets/whoami-BS3xdQEI.js"), "./commands/yes.ts": () => import("/assets/yes-ilM2l2xq.js") });
class Ae {
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
  static async resolve(t, e, n) {
    return this.loadingTask && await this.loadingTask, t.includes("/") ? this.resolvePath(t, n) : B.nonNullOrElse(
      this.getBuiltin(t),
      () => this.resolveFromPathVariable(t, e, n)
    );
  }
  /**
   * Resolves a specific path to a {@link VirtualFile}.
   * @param path - The path to navigate to.
   * @param workingDirectory - The directory to start the navigation from.
   * @returns The resolved file or a failure if this is a directory or does not exist.
   */
  static resolvePath(t, e) {
    return B.nonNullOr(e.navigate(t), this.NOT_FOUND_ERROR).filter((n) => n.isFile(), () => this.IS_DIRECTORY_ERROR);
  }
  /**
   * Attempts to resolve an executable by searching through the directories defined in the PATH variable.
   * @param name - The name of the executable.
   * @param env - The environment containing the PATH variable.
   * @param workingDirectory - The directory to use for path resolution.
   * @returns The first matching executable found in the PATH.
   */
  static resolveFromPathVariable(t, e, n) {
    return B.nonNullOr(e.get("PATH"), this.NOT_FOUND_ERROR).next((s) => B.any(
      s.split(":"),
      (i) => this.resolvePath(`${i}/${t}`, n),
      B.error(this.NOT_FOUND_ERROR)
    ));
  }
  /**
   * Finds the builtin command with the given name.
   * @param name - The name of the builtin.
   * @returns The builtin with the given name, or `null` if there is none.
   */
  static getBuiltin(t) {
    return this.builtins.find((e) => e.matches(t)) ?? null;
  }
  /**
   * Loads all builtins.
   * @returns A promise that resolves when all builtins have finished loading.
   */
  static async loadBuiltins() {
    this.builtins = [];
    const t = Object.entries(Hs).map(async ([e, n]) => {
      const i = await n(), o = Object.keys(i)[0], c = i[o];
      c !== void 0 && (c.name || c.setName(o.toLowerCase()), this.builtins.push(c));
    });
    return this.loadingTask = Promise.all(t).then(() => {
      this.loadingTask = null;
    }), this.loadingTask;
  }
}
Ae.loadBuiltins();
class O extends Yt {
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
      const t = this.pendingReads.shift();
      t !== void 0 && t.resolve(B.ok(null));
    }
    return this.emit(O.END_EVENT), this;
  }
  /**
   * Emits a control signal. Standard termination signals will automatically close the stream.
   */
  signal(t) {
    for (this.currentSignal = t, this.emit(O.SIGNAL_EVENT, t); this.pendingReads.length; ) {
      const e = this.pendingReads.shift();
      e !== void 0 && e.resolve(B.error({ type: O.INTERRUPTED, signal: this.currentSignal }));
    }
    return O.TERMINATING_SIGNALS.includes(t) && this.end(), this;
  }
  /**
   * Broadcasts data to all listeners if the stream is open.
   */
  async write(t) {
    if (this.currentSignal !== null && O.TERMINATING_SIGNALS.includes(this.currentSignal))
      return Promise.resolve(B.error({ type: O.INTERRUPTED, signal: this.currentSignal }));
    if (this.isClosed)
      return console.warn("Data dropped by stream: " + JSON.stringify(t)), Promise.resolve(B.error({ type: O.CLOSED }));
    if (this.pendingReads.length) {
      const e = this.pendingReads.shift();
      e !== void 0 && e.resolve(B.ok(t));
    } else
      this.buffer.push(t);
    return this.emit(O.DATA_EVENT, t), Promise.resolve(B.ok(void 0));
  }
  /**
   * Resolves with the next available chunk, or null if the stream is closed (EOF).
   */
  async read() {
    if (this.currentSignal !== null && O.TERMINATING_SIGNALS.includes(this.currentSignal))
      return Promise.resolve(B.error({ type: O.INTERRUPTED, signal: this.currentSignal }));
    if (this.buffer.length) {
      const t = this.buffer.shift();
      if (t !== void 0)
        return Promise.resolve(B.ok(t));
    }
    return this.isClosed ? Promise.resolve(B.ok(null)) : new Promise((t) => {
      this.pendingReads.push({ resolve: t });
    });
  }
  /**
   * Forwards data, end events, and signals from this stream to another.
   * @param destination - The stream that will receive the forwarded data.
   * @returns The destination stream to allow for chainable piping.
   */
  pipe(t, e = !0) {
    return this.on(O.DATA_EVENT, async (n) => {
      await t.write(n);
    }), this.on(O.SIGNAL_EVENT, (n) => {
      t.signal(n);
    }), e && this.on(O.END_EVENT, () => {
      t.end();
    }), t;
  }
  async wait(t) {
    return new Promise((e) => {
      if (this.isClosed)
        return e(t);
      this.once(O.END_EVENT, () => e(t));
    });
  }
  /**
   * Iterates over a readable string stream and yields each line.
   */
  static async *readLines(t) {
    let e = "";
    for (; ; ) {
      const n = await t.read();
      if (n.isError()) {
        yield B.error(n.error);
        return;
      }
      const s = n.value;
      if (s === null) {
        e.length && (yield B.ok(e));
        return;
      }
      e += s;
      const i = e.split(`
`), o = i.pop();
      e = o !== void 0 ? o : "";
      for (let c = 0; c < i.length; c++)
        yield B.ok(i[c]);
    }
  }
}
const ge = "user", we = "prozilla-os", ya = 50, Ue = `${v.fg.cyan + v.decoration.dim}$APP_NAME - Made by Prozilla${v.reset}
${v.decoration.dim}Type 'help' for a list of commands.${v.reset}
`, Aa = `
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
                             `, Ca = v.fg.cyan, ba = `
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
                             `, L = {
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
  static SHELL = "SHELL";
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
  constructor(t = {}, e = null) {
    this.store = un({
      [$.EXIT_CODE]: "0",
      [$.PROCESS_ID]: Math.floor(Math.random() * 1e5).toString(),
      ...t
    }), this.parent = e, Object.keys(this.store).forEach((n) => {
      $.INTERNAL_VARS.includes(n) || this.exportedKeys.add(n);
    });
  }
  get(t) {
    return this.store[t] !== void 0 ? this.store[t] : this.parent?.get(t);
  }
  set(t, e, n = !1) {
    this.store[t] = e, n && !$.INTERNAL_VARS.includes(t) && this.exportedKeys.add(t);
  }
  /**
   * Marks an existing variable as exported.
   */
  export(t) {
    $.INTERNAL_VARS.includes(t) || this.exportedKeys.add(t);
  }
  /**
   * Replaces variable placeholders in a string with their corresponding values based on a pre-parsed node.
   * The expandedArgument must be pre-resolved by the interpreter to handle nested expansions.
   */
  expand(t, e = "") {
    const n = t.name, s = t.operator, i = this.get(n), o = i === void 0 || i === "";
    if (!s) return i ?? "";
    switch (s) {
      case "-":
        return o ? e : i;
      case "=":
        return o ? (this.set(n, e), e) : i;
      case "+":
        return o ? "" : e;
      case "?":
        if (o) {
          const c = e || "parameter null or not set";
          throw new Error(`${n}: ${c}`);
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
  parseAssignment(t) {
    const e = t.match(/^([a-zA-Z_][a-zA-Z0-9_]*)=(.*)$/);
    if (e) {
      const n = e[1], s = e[2].replace(/^["']|["']$/g, "");
      return this.set(n, s, !0), !0;
    }
    return !1;
  }
  setCommandArguments(t, e) {
    const n = e.join(" ");
    this.set("0", t), this.set("#", e.length.toString()), this.set("*", n), this.set("@", n), e.forEach((s, i) => this.set((i + 1).toString(), s));
  }
  /**
   * Returns only variables that are marked for export.
   */
  get exportedVariables() {
    const t = this.parent?.exportedVariables ?? {}, e = {};
    return this.exportedKeys.forEach((n) => {
      e[n] = this.store[n];
    }), { ...t, ...e };
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
const ka = [
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
class Ut {
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
  static parseScript(t) {
    const e = this.tokenize(t, { splitOnWhitespace: !1, handleComments: !0 });
    return this.parseStatements(e, 0, []).nodes;
  }
  static tokenizeLine(t) {
    return this.tokenize(t, { splitOnWhitespace: !0 });
  }
  /**
   * Splits an input string into tokens.
   * @param input - The raw string to tokenize.
   * @returns An array of trimmed, non-empty token strings.
   */
  static tokenize(t, { splitOnWhitespace: e, handleComments: n = !1 }) {
    const s = [];
    let i = "", o = !1, c = !1, u = !1, l = 0, d = 0, h = 0;
    const p = () => {
      i.trim() && s.push(i.trim()), i = "";
    };
    for (let f = 0; f < t.length; f++) {
      const g = t[f];
      if (u) {
        g === `
` && (u = !1, p());
        continue;
      }
      if (g === "'" && !c && h === 0)
        o = !o;
      else if (g === '"' && !o && h === 0)
        c = !c;
      else if (g === "`" && !o)
        h += h > 0 ? -1 : 1;
      else if (!o && !c && h === 0) {
        if (n && g === "#" && (i.trim() === "" || i.endsWith(" "))) {
          u = !0;
          continue;
        }
        g === "(" && l++, g === ")" && l--, g === "{" && t[f - 1] === "$" && d++, g === "}" && d > 0 && d--;
      }
      const E = !o && !c && h === 0 && l === 0 && d === 0, w = e ? g.trim() === "" : g === `
` || g === ";";
      E && w ? p() : i += g;
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
  static parseStatements(t, e, n) {
    const s = [];
    let i = e;
    for (; i < t.length; ) {
      const o = t[i], c = this.tokenizeLine(o), u = c[0] ?? "";
      if (n.includes(u))
        return { nodes: s, nextIndex: i, endToken: u };
      switch (u) {
        case this.KEYWORD_IF: {
          const l = this.parseIf(t, i);
          s.push(l.node), i = l.nextIndex;
          break;
        }
        case this.KEYWORD_WHILE: {
          const l = this.parseWhile(t, i);
          s.push(l.node), i = l.nextIndex;
          break;
        }
        case this.KEYWORD_FOR: {
          const l = this.parseFor(t, i);
          s.push(l.node), i = l.nextIndex;
          break;
        }
        case this.KEYWORD_THEN:
        case this.KEYWORD_DO: {
          c.length > 1 ? t[i] = o.substring(o.indexOf(c[1])) : i++;
          break;
        }
        case "": {
          i++;
          break;
        }
        default: {
          const l = o.startsWith(this.ARITHMETIC_PREFIX_TOKEN) && o.endsWith(this.ARITHMETIC_SUFFIX_TOKEN), d = /^[a-zA-Z_][a-zA-Z0-9_]*(\+|-|\*|\/|%)?=/.test(o);
          if (l) {
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
  static advancePastKeyword(t, e, n) {
    const s = this.tokenizeLine(t[e]), i = s.indexOf(n);
    return i !== -1 && i < s.length - 1 ? (t[e] = t[e].substring(t[e].indexOf(s[i + 1])), e) : e + 1;
  }
  /**
   * Parses `if`/`elif`/`else` blocks into an {@link ShellAST.IfNode}.
   * @param lines - The array of tokenized lines.
   * @param startIndex - The line index where the `if` starts.
   * @returns The generated {@link ShellAST.IfNode} and the index to resume parsing.
   */
  static parseIf(t, e) {
    let n = e;
    const s = t[n].replace(/^if\s+/i, "").split(/;?\s+then(?:\s|$)/i)[0].trim(), i = this.resolveCondition(s);
    n = this.advancePastKeyword(t, n, this.KEYWORD_THEN);
    const o = this.parseStatements(t, n, [this.KEYWORD_ELIF, this.KEYWORD_ELSE, this.KEYWORD_FI]), c = { type: N.ConditionalBlock, condition: i, thenBranch: o.nodes };
    n = o.nextIndex;
    let u = o.endToken;
    const l = [];
    for (; u === this.KEYWORD_ELIF; ) {
      const p = this.parseElifBranch(t, n);
      l.push(p.branch), n = p.nextIndex, u = p.endToken;
    }
    let d = [];
    if (u === this.KEYWORD_ELSE) {
      const p = this.parseElseBranch(t, n);
      d = p.nodes, n = p.nextIndex, u = p.endToken;
    }
    const h = { type: N.If, ifBranch: c, elifBranches: l, elseBranch: d };
    if (u === this.KEYWORD_FI) {
      const { redirections: p } = this.parseRedirections(this.tokenizeLine(t[n]).slice(1));
      p.length && (h.redirections = p), n++;
    }
    return { node: h, nextIndex: n };
  }
  /**
   * Parses an `elif` branch, returning the branch data and the end token that stopped it.
   */
  static parseElifBranch(t, e) {
    let n = e;
    const s = t[n].replace(/^elif\s+/i, "").split(/;?\s+then(?:\s|$)/i)[0].trim(), i = this.resolveCondition(s);
    n = this.advancePastKeyword(t, n, this.KEYWORD_THEN);
    const o = this.parseStatements(t, n, [this.KEYWORD_ELIF, this.KEYWORD_ELSE, this.KEYWORD_FI]);
    return {
      branch: {
        type: N.ConditionalBlock,
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
  static parseElseBranch(t, e) {
    let n = e;
    const s = this.tokenizeLine(t[n]);
    s.length > 1 ? t[n] = t[n].substring(t[n].indexOf(s[1])) : n++;
    const i = this.parseStatements(t, n, [this.KEYWORD_FI]);
    return { nodes: i.nodes, nextIndex: i.nextIndex, endToken: i.endToken };
  }
  /**
   * Parses a while-loop structure into a {@link ShellAST.WhileNode}.
   * @param lines - The tokenized lines.
   * @param startIndex - The line index where the `while` starts.
   * @returns The generated {@link ShellAST.WhileNode} and next index.
   */
  static parseWhile(t, e) {
    let n = e;
    const s = t[n].replace(/^while\s+/i, "").split(/;?\s+do(?:\s|$)/i)[0].trim(), i = this.resolveCondition(s);
    n = this.advancePastKeyword(t, n, this.KEYWORD_DO);
    const o = this.parseStatements(t, n, [this.KEYWORD_DONE]);
    n = o.nextIndex;
    const c = { type: N.While, condition: i, body: o.nodes };
    if (o.endToken === this.KEYWORD_DONE) {
      const { redirections: u } = this.parseRedirections(this.tokenizeLine(t[n]).slice(1));
      u.length && (c.redirections = u), n++;
    }
    return { node: c, nextIndex: n };
  }
  /**
   * Parses a for-loop structure into a {@link ShellAST.ForNode}, extracting the iterator variable and items.
   * @param lines - The tokenized lines.
   * @param startIndex - The line index where the `for` starts.
   * @returns The generated {@link ShellAST.ForNode} and next index.
   */
  static parseFor(t, e) {
    const n = t[e];
    return /for\s*\(\(/.test(n) ? this.parseForExpression(t, e) : this.parseForIn(t, e);
  }
  /**
   * Converts an array of lines into a {@link ShellAST.ForExpressionNode}.
   */
  static parseForExpression(t, e) {
    let n = e;
    const s = t[n], i = s.match(/for\s*\(\(\s*(.*?)\s*\)\)/);
    if (!i)
      throw new Error(`Invalid arithmetic for loop syntax at: ${s}`);
    const o = i[1].split(";").map((p) => p.trim()).filter(Boolean), c = this.parseArithmetic(o[0] || "0", !0), u = this.parseArithmetic(o[1] || "1", !0), l = this.parseArithmetic(o[2] || "0", !0);
    n = this.advancePastKeyword(t, n, this.KEYWORD_DO);
    const d = this.parseStatements(t, n, [this.KEYWORD_DONE]);
    n = d.nextIndex;
    const h = {
      type: N.ForExpression,
      setup: c,
      condition: u,
      step: l,
      body: d.nodes
    };
    if (d.endToken === this.KEYWORD_DONE) {
      const { redirections: p } = this.parseRedirections(this.tokenizeLine(t[n]).slice(1));
      p.length && (h.redirections = p), n++;
    }
    return { node: h, nextIndex: n };
  }
  /**
   * Converts an array of lines into a {@link ShellAST.ForInNode}.
   */
  static parseForIn(t, e) {
    let n = e;
    const s = this.tokenizeLine(t[n]), i = s[1], o = s.indexOf(this.KEYWORD_IN), c = s.indexOf(this.KEYWORD_DO), u = c !== -1 ? c : s.length, l = o !== -1 ? s.slice(o + 1, u).map((p) => this.parseArgument(p.replace(/;$/, ""))) : [];
    n = this.advancePastKeyword(t, n, this.KEYWORD_DO);
    const d = this.parseStatements(t, n, [this.KEYWORD_DONE]);
    n = d.nextIndex;
    const h = {
      type: N.ForIn,
      variableName: i,
      items: l,
      body: d.nodes
    };
    if (d.endToken === this.KEYWORD_DONE) {
      const { redirections: p } = this.parseRedirections(this.tokenizeLine(t[n]).slice(1));
      p.length && (h.redirections = p), n++;
    }
    return { node: h, nextIndex: n };
  }
  /**
   * Extracts redirection nodes from a sequence of tokens, returning the remaining 
   * arguments and the extracted redirections.
   */
  static parseRedirections(t) {
    const e = [], n = [];
    for (let s = 0; s < t.length; s++) {
      const i = t[s], o = i.match(/^(\d+)?(>>|>|<|>&|<&)$/);
      if (o) {
        const c = o[1] ? parseInt(o[1]) : o[2].includes("<") ? 0 : 1, u = o[2], l = t[++s];
        l && n.push({
          type: N.Redirection,
          fileDescriptor: c,
          operator: u,
          target: this.parseArgument(l)
        });
      } else
        e.push(i);
    }
    return { args: e, redirections: n };
  }
  /**
   * Converts a line into an {@link ShellAST.AssignmentNode}.
   */
  static parseAssignment(t) {
    const e = t.indexOf("=");
    let n = t.substring(0, e).trim();
    const s = t.substring(e + 1).trim(), i = n.match(/(\+|-|\*|\/|%)$/);
    if (i) {
      const o = i[0];
      return n = n.slice(0, -1).trim(), o === "+" ? {
        type: N.Assignment,
        name: n,
        value: this.parseArgument(`\${${n}}${s}`)
      } : {
        type: N.Assignment,
        name: n,
        value: this.parseArgument(`$((\${${n}}${o}${s}))`)
      };
    }
    return {
      type: N.Assignment,
      name: n,
      value: this.parseArgument(s)
    };
  }
  /**
   * Converts an expression string into an {@link ShellAST.ArithmeticNode}.
   */
  static parseArithmetic(t, e) {
    return {
      type: N.Arithmetic,
      expression: t.trim(),
      isCondition: e
    };
  }
  /**
   * Converts a condition string into an {@link ShellAST.ExecutableNode}.
   */
  static resolveCondition(t) {
    const e = t.trim();
    if (e.startsWith(this.ARITHMETIC_PREFIX_TOKEN) && e.endsWith(this.ARITHMETIC_SUFFIX_TOKEN)) {
      const n = this.ARITHMETIC_PREFIX_TOKEN.length, s = this.ARITHMETIC_SUFFIX_TOKEN.length, i = e.substring(n, e.length - s).trim();
      return this.parseArithmetic(i || "0", !0);
    }
    return this.parseCommand(t);
  }
  static splitByOperators(t, e) {
    let n = !1, s = !1, i = 0;
    for (let o = t.length - 1; o >= 0; o--) {
      const c = t[o];
      if (c === "'" && !s)
        n = !n;
      else if (c === '"' && !n)
        s = !s;
      else if (!n && !s && ((c === ")" || c === "}") && i++, (c === "(" || c === "{") && i--, i === 0)) {
        for (const u of e)
          if (t.substring(o - u.length + 1, o + 1) === u)
            return {
              left: t.substring(0, o - u.length + 1).trim(),
              operator: u,
              right: t.substring(o + 1).trim()
            };
      }
    }
    return null;
  }
  /**
   * Converts an input string into a {@link ShellAST.ExecutableNode}.
   */
  static parseCommand(t) {
    return this.parseLogical(t);
  }
  /**
   * Converts an input string into a {@link ShellAST.ExecutableNode},
   * that might contain logical operators.
   */
  static parseLogical(t) {
    const e = this.splitByOperators(t, ["&&", "||"]);
    return e ? {
      type: N.Logical,
      left: this.parseLogical(e.left),
      operator: e.operator,
      right: this.parseLogical(e.right)
    } : this.parsePipeline(t);
  }
  /**
   * Converts an input string into a {@link ShellAST.ExecutableNode},
   * that might contain pipes.
   */
  static parsePipeline(t) {
    const e = this.splitByOperators(t, ["|"]);
    if (e) {
      const n = this.parsePipeline(e.left), s = this.parseSimpleCommand(e.right), i = n.type === N.Pipeline ? [...n.commands, s] : [n, s];
      return { type: N.Pipeline, commands: i };
    }
    return this.parseSimpleCommand(t);
  }
  /**
   * Converts an input string into a {@link ShellAST.CommandNode}.
   */
  static parseSimpleCommand(t) {
    const e = this.tokenizeLine(t), { args: n, redirections: s } = this.parseRedirections(e), i = {
      type: N.Command,
      args: n.map((o) => this.parseArgument(o))
    };
    return s.length && (i.redirections = s), i;
  }
  /**
   * Converts an input string into a {@link ShellAST.ParameterExpansionNode}.
   */
  static parseParameterExpansion(t, e) {
    if (t[e + 1] === "{") {
      const i = t.indexOf("}", e);
      if (i !== -1) {
        const o = t.substring(e + 2, i), c = /^([^:-=?+]+)(?::([-=?+])(.*))?$/, u = o.match(c);
        if (u) {
          const d = u[1], h = u[2], p = u[3] ?? "";
          return { node: {
            type: N.ParameterExpansion,
            name: d,
            operator: h,
            argument: h ? this.parseArgument(p) : void 0
          }, nextIndex: i + 1 };
        }
        return { node: {
          type: N.ParameterExpansion,
          name: o
        }, nextIndex: i + 1 };
      }
    } else {
      let i = e + 1;
      const o = t[i];
      if (/[0-9?#$!*@-]/.test(o))
        i++;
      else
        for (; i < t.length && /[a-zA-Z0-9_]/.test(t[i]); )
          i++;
      return { node: {
        type: N.ParameterExpansion,
        name: t.substring(e + 1, i)
      }, nextIndex: i };
    }
    return { node: {
      type: N.ParameterExpansion,
      name: ""
    }, nextIndex: e + 1 };
  }
  /**
   * Converts an input string into an {@link ShellAST.ArithmeticExpansionNode}.
   */
  static parseArithmeticExpansion(t, e) {
    let n = 2;
    const s = 3;
    let i = e + s;
    for (; i < t.length && n > 0; )
      t[i] === "(" && n++, t[i] === ")" && n--, i++;
    const c = t.substring(e + s, i - 2);
    return { node: {
      type: N.ArithmeticExpansion,
      content: this.parseArithmetic(c, !1)
    }, nextIndex: i };
  }
  /**
   * Converts an input string into a {@link ShellAST.CommandSubstitutionNode}.
   */
  static parseCommandSubstitution(t, e) {
    const n = t[e] === "`", s = n ? 1 : 2;
    let i = 1, o = e + s;
    for (; o < t.length && i > 0; )
      n ? t[o] === "`" && i-- : (t[o] === "(" && i++, t[o] === ")" && i--), o++;
    return { node: {
      type: N.CommandSubstitution,
      content: this.parseScript(t.substring(e + s, o - 1))
    }, nextIndex: o };
  }
  /**
   * Converts an input string into an {@link ShellAST.Argument}.
   */
  static parseArgument(t) {
    const e = [];
    let n = 0;
    for (; n < t.length; ) {
      const s = t[n];
      if (s === "$" && n + 1 < t.length) {
        const o = t[n + 1];
        if (o === "(") {
          const { node: c, nextIndex: u } = t[n + 2] === "(" ? this.parseArithmeticExpansion(t, n) : this.parseCommandSubstitution(t, n);
          e.push(c), n = u;
          continue;
        }
        if (o === "{" || /[a-zA-Z_0-9?#$!*@-]/.test(o)) {
          const { node: c, nextIndex: u } = this.parseParameterExpansion(t, n);
          e.push(c), n = u;
          continue;
        }
      } else if (s === "`") {
        const { node: o, nextIndex: c } = this.parseCommandSubstitution(t, n);
        e.push(o), n = c;
        continue;
      }
      let i = t.indexOf("$", n + 1);
      i === -1 && (i = t.length), e.push(t.substring(n, i)), n = i;
    }
    return e;
  }
  /**
   * Expands braces in a shell argument (e.g., `"file{1..3}.txt"` or `"img.{jpg,png}"`).
   * Supports nested expansion and numeric sequences.
   * @param input - The raw string.
   * @returns An array of strings with all permutations expanded.
   */
  static expandBraces(t) {
    if (t.startsWith("'") || t.startsWith('"'))
      return [t];
    const e = t.match(/\{([^{}]+)\}/);
    if (!e)
      return [t];
    const [n, s] = e, i = t.slice(0, e.index), o = t.slice((e.index ?? 0) + n.length), c = s.match(/^(\d+)\.\.(\d+)$/);
    if (c) {
      const u = parseInt(c[1]), l = parseInt(c[2]), d = u <= l ? 1 : -1, h = [];
      for (let p = u; p !== l + d; p += d)
        h.push(...this.expandBraces(`${i}${p}${o}`));
      return h;
    }
    return s.includes(",") ? s.split(",").flatMap((u) => this.expandBraces(`${i}${u}${o}`)) : [t];
  }
  /**
   * Parses flags and options out of a mutable args array, returning the collected options and
   * input values. Flag args are removed from `commandArgs` in place as a side-effect.
   * @param command - The command used to validate and look up option definitions.
   * @param commandArgs - The mutable argument list to parse from. Modified in place.
   * @returns An object containing the parsed option keys and any input values keyed by the option's short name.
   */
  static parseOptions(t, e) {
    const n = [], s = {};
    for (const i of e.filter((o) => o.startsWith("-") && !o.startsWith('"'))) {
      const o = i.startsWith("--"), c = o ? [i.slice(2).toLowerCase()] : i.slice(1).split(""), u = [];
      let l = !1;
      for (const h of c) {
        const p = t.getOption(h);
        if (!p || p.long === void 0 && p.short === void 0) {
          u.push(h);
          continue;
        }
        l = !0;
        const f = p.short;
        if (f !== void 0 && !n.includes(f) && n.push(f), p.isInput) {
          const g = e.indexOf(i), E = e[g + 1];
          s[p.short ?? p.long ?? ""] = E, vt(E, e);
        }
      }
      if (!l)
        continue;
      const d = e.indexOf(i);
      u.length ? e[d] = (o ? "--" : "-") + u.join("") : vt(i, e);
    }
    return { options: n, inputs: s };
  }
}
const Ks = /* @__PURE__ */ new Set(["**=", "<<=", ">>="]), js = /* @__PURE__ */ new Set([
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
function Gs(r) {
  const t = [];
  let e = 0;
  for (; e < r.length; ) {
    if (/\s/.test(r[e])) {
      e++;
      continue;
    }
    if (/[0-9]/.test(r[e])) {
      let i = "";
      for (; e < r.length && /[0-9]/.test(r[e]); )
        i += r[e++];
      t.push({ type: "number", value: parseInt(i, 10) });
      continue;
    }
    if (/[a-zA-Z_]/.test(r[e])) {
      let i = "";
      for (; e < r.length && /[a-zA-Z0-9_]/.test(r[e]); )
        i += r[e++];
      t.push({ type: "ident", value: i });
      continue;
    }
    const n = r.slice(e, e + 3), s = r.slice(e, e + 2);
    Ks.has(n) ? (t.push({ type: "op", value: n }), e += 3) : js.has(s) ? (t.push({ type: "op", value: s }), e += 2) : t.push({ type: "op", value: r[e++] });
  }
  return t;
}
const Ys = /* @__PURE__ */ new Set([
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
class Xs {
  constructor(t) {
    this.env = t;
  }
  env;
  tokens = [];
  position = 0;
  evaluate(t) {
    return this.tokens = Gs(t), this.position = 0, this.parseAssignment();
  }
  peek() {
    return this.tokens[this.position];
  }
  pop() {
    return this.tokens[this.position++];
  }
  match(t) {
    return this.peek()?.value === t ? (this.position++, !0) : !1;
  }
  expect(t, e) {
    const n = this.peek();
    return B.require(
      n,
      (s) => this.match(t),
      () => {
      },
      () => e
    );
  }
  consume() {
    const t = this.pop();
    return B.require(
      t,
      (e) => !!e,
      (e) => e,
      () => "Unexpected end of arithmetic expression"
    );
  }
  readVar(t) {
    return parseInt(this.env.get(t) ?? "0", 10);
  }
  writeVar(t, e) {
    return this.env.set(t, e.toString()), e;
  }
  parseAssignment() {
    const t = this.position, e = this.peek();
    if (e?.type === "ident") {
      const n = e.value;
      this.position++;
      const i = this.peek()?.value.toString() ?? "";
      if (Ys.has(i)) {
        this.position++;
        const o = this.readVar(n);
        return this.parseAssignment().map(
          (c) => this.writeVar(n, this.applyAssign(i, o, c))
        );
      }
      this.position--;
    }
    return this.position = t, this.parseTernary();
  }
  applyAssign(t, e, n) {
    switch (t) {
      case "=":
        return n;
      case "+=":
        return e + n;
      case "-=":
        return e - n;
      case "*=":
        return e * n;
      case "/=":
        return Math.trunc(e / n);
      case "%=":
        return e % n;
      case "**=":
        return e ** n;
      case "&=":
        return e & n;
      case "|=":
        return e | n;
      case "^=":
        return e ^ n;
      case "<<=":
        return e << n;
      case ">>=":
        return e >> n;
      default:
        return n;
    }
  }
  parseTernary() {
    return this.parseOr().next((t) => this.match("?") ? this.parseAssignment().next(
      (e) => this.expect(":", "Expected ':' in ternary expression").next(() => this.parseAssignment()).map((n) => t ? e : n)
    ) : B.ok(t));
  }
  whileMatch(t, e, n) {
    return t().next((s) => B.repeat(
      s,
      () => {
        const i = this.peek();
        return !!(i && e.includes(i.value.toString()));
      },
      (i) => {
        const o = this.pop()?.value.toString() ?? "";
        return t().map((c) => n(i, o, c));
      }
    ));
  }
  parseOr() {
    return this.whileMatch(() => this.parseAnd(), ["||"], (t, e, n) => t || n ? 1 : 0);
  }
  parseAnd() {
    return this.whileMatch(() => this.parseBitOr(), ["&&"], (t, e, n) => t && n ? 1 : 0);
  }
  parseBitOr() {
    return this.whileMatch(() => this.parseBitXor(), ["|"], (t, e, n) => t | n);
  }
  parseBitXor() {
    return this.whileMatch(() => this.parseBitAnd(), ["^"], (t, e, n) => t ^ n);
  }
  parseBitAnd() {
    return this.whileMatch(() => this.parseEquality(), ["&"], (t, e, n) => t & n);
  }
  parseEquality() {
    return this.whileMatch(
      () => this.parseCompare(),
      ["==", "!="],
      (t, e, n) => e === "==" ? +(t === n) : +(t !== n)
    );
  }
  parseCompare() {
    const t = ["<", ">", "<=", ">="];
    return this.whileMatch(() => this.parseShift(), t, (e, n, s) => {
      switch (n) {
        case "<":
          return e < s ? 1 : 0;
        case ">":
          return e > s ? 1 : 0;
        case "<=":
          return e <= s ? 1 : 0;
        default:
          return e >= s ? 1 : 0;
      }
    });
  }
  parseShift() {
    return this.whileMatch(
      () => this.parseAdd(),
      ["<<", ">>"],
      (t, e, n) => e === "<<" ? t << n : t >> n
    );
  }
  parseAdd() {
    return this.whileMatch(
      () => this.parseMultiplication(),
      ["+", "-"],
      (t, e, n) => e === "+" ? t + n : t - n
    );
  }
  parseMultiplication() {
    const t = ["*", "/", "%"];
    return this.whileMatch(() => this.parseExponent(), t, (e, n, s) => {
      switch (n) {
        case "*":
          return e * s;
        case "/":
          return Math.trunc(e / s);
        default:
          return e % s;
      }
    });
  }
  parseExponent() {
    return this.parseUnary().next((t) => this.match("**") ? this.parseExponent().map((e) => t ** e) : B.ok(t));
  }
  parseUnary() {
    const t = this.peek()?.value;
    switch (t) {
      case "++":
      case "--": {
        this.pop();
        const e = this.peek();
        if (e?.type === "ident") {
          this.pop();
          const n = this.readVar(e.value), s = t === "++" ? n + 1 : n - 1;
          return B.ok(this.writeVar(e.value, s));
        }
        return B.error(`Expected identifier after prefix ${t}`);
      }
      case "+":
        return this.pop(), this.parseUnary().map((e) => +e);
      case "-":
        return this.pop(), this.parseUnary().map((e) => -e);
      case "!":
        return this.pop(), this.parseUnary().map((e) => e ? 0 : 1);
      case "~":
        return this.pop(), this.parseUnary().map((e) => ~e);
      default:
        return this.parsePrimary();
    }
  }
  parsePrimary() {
    return this.consume().next((t) => {
      if (t.type === "number")
        return B.ok(t.value);
      if (t.type === "ident") {
        const e = t.value, n = this.peek()?.value;
        if (n === "++" || n === "--") {
          this.pop();
          const s = this.readVar(e), i = n === "++" ? s + 1 : s - 1;
          return this.writeVar(e, i), B.ok(s);
        }
        return B.ok(this.readVar(e));
      }
      return t.value === "(" ? this.parseAssignment().next(
        (e) => this.expect(")", "Expected closing ')'").map(() => e)
      ) : B.error(`Unexpected token: '${t.value}'`);
    });
  }
}
class Ce {
  shell;
  pipeline = [];
  static PROMPT_ESCAPES = {
    u: (t) => t.get($.USER) ?? ge,
    h: (t) => t.get($.HOSTNAME) ?? we,
    w: (t) => {
      const e = t.get($.WORKING_DIRECTORY) ?? "/", n = t.get($.HOME) ?? "~";
      return e.startsWith(n) ? e.replace(n, "~") : e;
    },
    W: (t) => (t.get($.WORKING_DIRECTORY) ?? "/").split("/").pop() || "/",
    $: (t) => t.get($.USER) === "root" ? "#" : "$",
    n: () => `
`
  };
  constructor(t) {
    this.shell = t;
  }
  /**
   * Sends a termination signal to all processes currently in the pipeline.
   * @param signal - The signal to send.
   */
  terminatePipeline(t) {
    this.pipeline.length && (this.pipeline.forEach((e) => e.stdin.signal(t)), this.pipeline = []);
  }
  /**
   * Parses and executes a shell script.
   * @param input - The script content or a virtual file.
   * @param io - Optional output streams to override default TTY behavior.
   * @returns The exit code of the last command executed in the script.
   */
  async execute(t, e) {
    if (t instanceof Z) {
      const i = await t.read();
      if (!i)
        return L.commandNotExecutable;
      t = i;
    }
    const n = Ut.parseScript(t), s = e?.env ?? this.shell.env;
    return await this.executeBlock(n, { ...e, env: s });
  }
  /**
   * Executes a block of nodes, passing along stream overrides.
   */
  async executeBlock(t, e) {
    let n = L.success;
    for (const s of t)
      if (n = await this.executeNode(s, e), n === L.interrupted)
        break;
    return n;
  }
  /**
   * Dispatches an AST node to its specific execution logic.
   */
  async executeNode(t, e) {
    let n = L.success;
    const s = e?.env ?? this.shell.env;
    switch (t.type) {
      case N.Command:
        n = await this.executeCommands([t], e);
        break;
      case N.Pipeline:
        n = await this.executeCommands(t.commands, e);
        break;
      case N.Logical:
        n = await this.executeLogicalNode(t, e);
        break;
      case N.Assignment:
        n = await this.executeAssignmentNode(t, s);
        break;
      case N.Arithmetic:
        n = this.evaluateArithmetic(t, s);
        break;
      case N.If:
        n = await this.executeIfNode(t, e);
        break;
      case N.While:
        n = await this.executeWhileNode(t, e);
        break;
      case N.ForIn:
        n = await this.executeForInNode(t, s, e);
        break;
      case N.ForExpression:
        n = await this.executeForExpressionNode(t, s, e);
        break;
      default:
        throw new Error("Unknown node: " + JSON.stringify(t));
    }
    return s.set($.EXIT_CODE, n.toString()), n;
  }
  async executeLogicalNode(t, e) {
    let n = await this.executeNode(t.left, e);
    const s = t.operator === "&&" && n === L.success, i = t.operator === "||" && n !== L.success;
    return (s || i) && (n = await this.executeNode(t.right, e)), n;
  }
  async executeAssignmentNode(t, e) {
    const n = await this.evaluateArgument(t.value, e);
    return e.set(t.name, n), L.success;
  }
  async executeIfNode(t, e) {
    if (await this.executeNode(t.ifBranch.condition, e) === L.success)
      return await this.executeBlock(t.ifBranch.thenBranch, e);
    for (const s of t.elifBranches)
      if (await this.executeNode(s.condition, e) === L.success)
        return await this.executeBlock(s.thenBranch, e);
    return t.elseBranch.length ? await this.executeBlock(t.elseBranch, e) : L.success;
  }
  async executeWhileNode(t, e) {
    let n = L.success;
    for (; n !== L.interrupted && (n = await this.executeNode(t.condition, e)) === L.success; )
      n = await this.executeBlock(t.body, e);
    return n;
  }
  async executeForInNode(t, e, n) {
    let s = L.success;
    const i = [];
    for (const o of t.items) {
      const c = await this.evaluateArgument(o, e);
      i.push(...Ut.expandBraces(c));
    }
    for (const o of i)
      if (e.set(t.variableName, o), s = await this.executeBlock(t.body, n), s === L.interrupted)
        break;
    return s;
  }
  async executeForExpressionNode(t, e, n) {
    let s = this.evaluateArithmetic(t.setup, e);
    for (; this.evaluateArithmetic(t.condition, e) === L.success && (s = await this.executeBlock(t.body, n), s !== L.interrupted); )
      s = this.evaluateArithmetic(t.step, e);
    return s;
  }
  /**
   * Handles the piping logic for any list of executable nodes.
   */
  async executeCommands(t, e) {
    if (!t.length)
      return L.success;
    const n = this.pipeline, s = this.shell.state.stream, i = e?.env ?? this.shell.env, o = await this.createPipeline(t, i);
    this.pipeline = o, this.linkStreams(o, e);
    const c = o.at(-1);
    c && (this.shell.state.stream = dn(c.stdin));
    let u = !1;
    const l = (p) => {
      p === "SIGINT" && (u = !0);
    };
    o.forEach((p) => {
      p.stdin.on(O.SIGNAL_EVENT, l);
    });
    const d = [];
    for (let p = t.length - 1; p >= 0; p--) {
      const f = t[p], g = o[p];
      f.type === N.Command ? d.unshift(this.spawn(g, f.redirections)) : d.unshift(this.executeNode(f, {
        stdin: g.stdin,
        stdout: g.stdout,
        stderr: g.stderr,
        env: g.env
      }));
    }
    const h = await Promise.all(d);
    return this.pipeline = n, this.shell.state.stream = s, u ? L.interrupted : h.at(-1) ?? L.success;
  }
  async createPipeline(t, e) {
    const n = [];
    for (const s of t) {
      const i = { stdin: new O(), stdout: new O(), stderr: new O(), commandName: "", args: [], env: e };
      if (s.type === N.Command) {
        for (const o of s.args)
          i.args.push(await this.evaluateArgument(o, e));
        i.commandName = i.args[0] ?? "", i.commandName === K.SUDO_COMMAND && i.args.length > 1 && (i.commandName = i.args[1]);
      } else
        i.commandName = `<${s.type}>`;
      n.push(i);
    }
    return n;
  }
  linkStreams(t, e) {
    t.forEach((n, s) => {
      const i = t[s + 1];
      s === 0 && e?.stdin && e.stdin.pipe(n.stdin), i ? n.stdout.pipe(i.stdin) : e?.stdout ? n.stdout.pipe(e.stdout, !1) : n.stdout.on(O.DATA_EVENT, (o) => this.shell.write(o)), e?.stderr ? n.stderr.pipe(e.stderr, !1) : n.stderr.on(O.DATA_EVENT, (o) => this.shell.write(o));
    });
  }
  async evaluateArgument(t, e) {
    let n = "";
    for (const s of t) {
      if (typeof s == "string") {
        n += s;
        continue;
      }
      switch (s.type) {
        case N.ParameterExpansion: {
          const i = s.argument ? await this.evaluateArgument(s.argument, e) : "";
          n += e.expand(s, i);
          break;
        }
        case N.ArithmeticExpansion:
          n += this.evaluateArithmetic(s.content, e).toString();
          break;
        case N.CommandSubstitution:
          n += await this.captureCommandOutput(s.content, e);
          break;
      }
    }
    return this.removeQuotes(n);
  }
  async captureCommandOutput(t, e) {
    const n = new O();
    let s = "";
    return n.on(O.DATA_EVENT, (i) => {
      s += i;
    }), await this.executeBlock(t, { stdout: n, env: e }), n.end(), s.trim();
  }
  removeQuotes(t) {
    let e = "", n = !1, s = !1;
    for (const i of t)
      i === "'" && !s ? n = !n : i === '"' && !n ? s = !s : e += i;
    return e;
  }
  /**
   * Evaluates an arithmetic expression using an {@link ArithmeticParser} and returns an exit code.
   * @param node - The arithmetic operation.
   * @param env - The {@link ShellEnvironment} used for variable resolution within this instance.
   * @returns `EXIT_CODE.success` if the {@link ArithmeticParserResult} is successful and non-zero, 
   * or `EXIT_CODE.generalError` otherwise.
   */
  evaluateArithmetic(t, e) {
    return B.ok(t.expression.trim()).filter((n) => n.length !== 0, () => "Empty expression").next((n) => new Xs(e).evaluate(n)).match((n) => t.isCondition ? n !== 0 ? L.success : L.generalError : n, (n) => (console.error(n), L.generalError));
  }
  async executeRedirections(t, e) {
    const n = { 0: e.stdin, 1: e.stdout, 2: e.stderr };
    for (const s of t) {
      const i = await this.evaluateArgument(s.target, e.env), o = s.fileDescriptor;
      if (s.operator === ">&" || s.operator === "<&") {
        const l = parseInt(i), d = n[o], h = n[l];
        d && h && h.pipe(d);
        continue;
      }
      const c = s.operator === ">" || s.operator === ">>", u = this.shell.state.workingDirectory.navigate(i, c);
      if (!(!u || !u.isFile())) {
        if (s.operator === "<" && o === 0)
          e.stdin = new Zs(u);
        else if (c) {
          const l = new Js(u);
          if (s.operator === ">>") {
            const d = await u.read();
            d != null && await l.write(d);
          }
          o === 1 ? e.stdout = l : o === 2 ? e.stderr = l : n[o] && (n[o] = l);
        }
      }
    }
  }
  /**
   * Resolves a command, parses flags/options, and executes the command logic.
   * @returns The resulting exit code from the command execution.
   */
  async spawn(t, e = []) {
    const { stdin: n, stdout: s, stderr: i, commandName: o, args: c, env: u } = t, l = { stdin: n, stdout: s, stderr: i, env: u }, d = Date.now();
    try {
      if (!c.length)
        return L.generalError;
      const h = await Ae.resolve(o, u, this.shell.state.workingDirectory);
      if (h.isError())
        return K.writeError(i, o, h.error, L.commandNotFound);
      const p = c.slice(1);
      if (l.env = u.fork(), l.env.setCommandArguments(o, p), await this.executeRedirections(e, l), h.value instanceof Z)
        return await this.execute(h.value, l);
      const f = h.value, { options: g, inputs: E } = Ut.parseOptions(f, p), w = this.pipeline.indexOf(t) > 0;
      return f.requireArgs && !p.length && !w ? K.writeError(i, o, [K.USAGE_ERROR, `${o} ${K.MISSING_ARGS_ERROR}`]) : f.requireOptions && !g.length ? K.writeError(i, o, [K.USAGE_ERROR, `${o} ${K.MISSING_OPTIONS_ERROR}`]) : await f.execute(p, {
        stdin: l.stdin,
        stdout: l.stdout,
        stderr: l.stderr,
        shell: this.shell,
        workingDirectory: this.shell.state.workingDirectory,
        username: l.env.get("USER") ?? ge,
        hostname: l.env.get("HOSTNAME") ?? we,
        rawLine: p.join(" "),
        options: g,
        exit: () => this.shell.kill(),
        inputs: E,
        timestamp: d,
        virtualRoot: this.shell.config.virtualRoot,
        settingsManager: this.shell.config.settingsManager,
        systemManager: this.shell.config.systemManager,
        app: this.shell.config.app,
        size: this.shell.config.sizeRef.current,
        env: l.env
      }) ?? L.success;
    } catch (h) {
      return console.error(h), K.writeError(i, o);
    } finally {
      s.end(), i.end(), l.stdout !== s && l.stdout.end(), l.stderr !== i && l.stderr.end();
    }
  }
  /**
   * Evaluates a prompt string by resolving escape sequences and shell expansions.
   */
  async evaluatePrompt(t, e = this.shell.env) {
    const n = t.replace(/\\([uhwW$n])/g, (s, i) => {
      const o = Ce.PROMPT_ESCAPES[i];
      return o ? o(e) : s;
    });
    try {
      const s = Ut.parseArgument(n);
      return await this.evaluateArgument(s, this.shell.env);
    } catch {
      return n;
    }
  }
}
var qs = /* @__PURE__ */ ((r) => (r[r.None = 0] = "None", r[r.Command = 1] = "Command", r[r.Clear = 2] = "Clear", r))(qs || {});
class K {
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
    [v.screen.enterAltBuffer, v.screen.exitAltBuffer, v.screen.clear, v.screen.home].map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "g"
  );
  // eslint-disable-next-line no-control-regex
  static CURSOR_REGEX = /\x1b\[(\d+);(\d+)H/g;
  static KEY_TO_ANSI = {
    Enter: v.input.lineFeed,
    Tab: v.input.horizontalTab,
    Backspace: v.input.backspace,
    Delete: v.input.delete,
    ArrowUp: v.input.arrowUp,
    ArrowDown: v.input.arrowDown,
    ArrowRight: v.input.arrowRight,
    ArrowLeft: v.input.arrowLeft,
    Escape: v.input.escape,
    "Control+a": v.input.ctrlA,
    "Control+b": v.input.ctrlB,
    "Control+c": v.input.ctrlC,
    "Control+d": v.input.ctrlD,
    "Control+e": v.input.ctrlE,
    "Control+f": v.input.ctrlF,
    "Control+g": v.input.ctrlG,
    "Control+h": v.input.ctrlH,
    "Control+i": v.input.ctrlI,
    "Control+j": v.input.ctrlJ,
    "Control+k": v.input.ctrlK,
    "Control+l": v.input.ctrlL,
    "Control+m": v.input.ctrlM,
    "Control+n": v.input.ctrlN,
    "Control+o": v.input.ctrlO,
    "Control+p": v.input.ctrlP,
    "Control+q": v.input.ctrlQ,
    "Control+r": v.input.ctrlR,
    "Control+s": v.input.ctrlS,
    "Control+t": v.input.ctrlT,
    "Control+u": v.input.ctrlU,
    "Control+v": v.input.ctrlV,
    "Control+w": v.input.ctrlW,
    "Control+x": v.input.ctrlX,
    "Control+y": v.input.ctrlY,
    "Control+z": v.input.ctrlZ
  };
  constructor(t) {
    this.config = t;
    const e = t.virtualRoot.navigateToFolder(t.path ?? "~") ?? t.virtualRoot;
    this.env = new $({
      [$.USER]: ge,
      [$.HOSTNAME]: we,
      [$.PROMPT]: `${ne.cyan("\\u@\\h")}:${ne.blue("\\w")}$ `,
      [$.HOME]: t.virtualRoot.navigateToFolder("~")?.absolutePath ?? "~",
      [$.WORKING_DIRECTORY]: e.root ? "/" : e.path,
      [$.PREVIOUS_WORKING_DIRECTORY]: e.root ? "/" : e.path,
      [$.SHELL]: "posh",
      ...t.env
    }), this.state = un({
      history: [{
        displayText: t.app ? Ue.replace("$APP_NAME", t.app.name) : Ue,
        flags: 0
        /* None */
      }],
      line: t.input ?? "",
      historyOffset: 0,
      workingDirectory: dn(e),
      prompt: "",
      stream: null,
      ttyBuffer: null,
      isUsingAltScreen: !1,
      env: this.env.store,
      isRawMode: !1,
      cursorPosition: U.ZERO
    }), this.interpreter = new Ce(this), this.updatePrompt();
  }
  async handleKeyDown(t) {
    const { key: e, ctrlKey: n = !1, metaKey: s = !1, shiftKey: i = !1 } = t, o = n || s;
    if (o && e === "c" && !i) {
      t.preventDefault(), this.interrupt();
      return;
    }
    if (this.state.stream) {
      if (this.state.isRawMode) {
        t.preventDefault();
        const c = o ? `Control+${e.toLowerCase()}` : e, u = K.KEY_TO_ANSI[c] ?? (e.length === 1 ? e : "");
        u && await this.state.stream.write(u);
      }
      return;
    }
    e === "Tab" ? (t.preventDefault(), this.autoComplete()) : e === "Enter" ? await this.run(this.state.line) : e === "ArrowUp" ? (t.preventDefault(), this.historySearch(1)) : e === "ArrowDown" && (t.preventDefault(), this.historySearch(-1));
  }
  /**
   * Toggles raw mode, which forwards all keystrokes directly to the active stream.
   * @param rawMode - Whether to enable raw mode.
   */
  setRawMode(t) {
    this.state.isRawMode = t;
  }
  /**
   * Sends a signal to the shell or the currently active foreground process.
   * @param signal - The signal to send. Defaults to `"SIGTERM"`.
   */
  terminate(t = "SIGTERM") {
    if (t === "SIGKILL") {
      this.config.exit();
      return;
    }
    const e = t === "SIGINT", n = this.state.stream != null;
    if (n) {
      const s = (this.state.ttyBuffer ?? "") + (e ? "^C" : "");
      s && !this.state.isUsingAltScreen && this.pushHistory({
        displayText: s,
        flags: 0
        /* None */
      }), this.state.stream?.signal(t), this.state.stream?.end(), this.state.stream = null, this.state.ttyBuffer = null, this.state.isUsingAltScreen = !1, this.state.isRawMode = !1;
    }
    this.interpreter.terminatePipeline(t), e && !n && (this.pushHistory({
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
    const t = this.env.get($.PROMPT) ?? "\\u@\\h:\\w$ ";
    this.state.prompt = await this.interpreter.evaluatePrompt(t, this.env);
  }
  /**
   * Updates the text in the current input line.
   * @param value - The new string value or a function that receives the previous value.
   */
  setLine(t) {
    this.state.line = typeof t == "function" ? t(this.state.line) : t;
  }
  /**
   * Appends a new entry to the terminal history.
   * @param entry - The history entry to add.
   */
  pushHistory(t) {
    this.state.history.push(t);
  }
  /**
   * Writes raw text to the shell, handling ANSI escape codes for screen clearing and alt buffers.
   * @param text - The string data to write to the TTY.
   */
  write(t) {
    t.includes(v.screen.enterAltBuffer) && (this.state.isUsingAltScreen = !0, this.state.ttyBuffer = null), (t.includes(v.screen.clear) || t.includes(v.screen.home)) && (this.state.isUsingAltScreen || this.pushHistory({
      flags: 2
      /* Clear */
    }), this.state.ttyBuffer = null), t.includes(v.screen.exitAltBuffer) && (this.state.isUsingAltScreen = !1, this.state.ttyBuffer = null);
    let e;
    for (; (e = K.CURSOR_REGEX.exec(t)) !== null; ) {
      const s = parseInt(e[1]) - 1, i = parseInt(e[2]) - 1;
      this.state.cursorPosition = new U(i, s);
    }
    const n = t.replace(K.STRIP_ANSI_REGEX, "").replace(K.CURSOR_REGEX, "");
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
   * Commits the current input line and executes the given command string.
   * @param input - The command string to execute.
   * @returns A promise that resolves with the final exit code of the execution.
   */
  async run(t) {
    this.commitLine(t);
    const e = await this.interpreter.execute(t);
    return await this.updatePrompt(), e;
  }
  /**
   * Commits the current line or the given input string.
   * @param input - The input string.
   */
  commitLine(t = this.state.line) {
    const e = this.state.ttyBuffer ?? "";
    this.state.ttyBuffer = null, this.clearLine(), this.pushHistory({
      displayText: e + this.state.prompt + t,
      flags: 1,
      input: t
    });
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
  historySearch(t) {
    const e = this.state.history.filter(({ flags: s }) => (s & 1) !== 0), n = xe(this.state.historyOffset + t, 0, e.length);
    if (n === this.state.historyOffset) {
      t < 0 && (this.state.line = "");
      return;
    }
    this.state.line = n === 0 ? "" : e[e.length - n].input ?? "", this.state.historyOffset = n;
  }
  /**
   * Changes the current working directory and updates `PWD`/`OLDPWD` environment variables.
   * @param directory - The virtual folder to switch to.
   */
  setWorkingDirectory(t) {
    const e = t.root ? "/" : t.path, n = this.env.get($.WORKING_DIRECTORY);
    n !== e && (this.env.set($.PREVIOUS_WORKING_DIRECTORY, n ?? e), this.env.set($.WORKING_DIRECTORY, e)), this.state.workingDirectory = t;
  }
  /**
   * Calculates possible completions for the current input based on commands and file paths.
   * @returns An array of string suggestions.
   */
  getCompletions() {
    const t = this.state.line.split(" "), e = t.at(-1) ?? "", n = t.length <= 1;
    let s = [];
    if (n && !e.includes("/") && (s = Ae.builtins.filter((i) => i.name.startsWith(e)).map((i) => i.name)), !n || e.includes("/") || e.startsWith(".")) {
      const i = e.split("/"), o = i.pop() ?? "", c = i.join("/") || (e.startsWith("/") ? "/" : "."), u = this.state.workingDirectory.navigateToFolder(c);
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
    const t = this.getCompletions();
    if (!t.length)
      return;
    const e = this.state.line.split(" "), n = e.pop() ?? "", s = Gn(t), i = n.split("/"), o = i.pop() ?? "";
    if (s.length > o.length) {
      i.push(s), e.push(i.join("/")), this.setLine(e.join(" "));
      return;
    }
    t.length === 1 ? (i.push(t[0]), e.push(i.join("/")), this.setLine(e.join(" "))) : (this.pushHistory({
      displayText: this.state.prompt + this.state.line,
      flags: 1,
      input: this.state.line
    }), this.pushHistory({
      displayText: t.join("  "),
      flags: 0
      /* None */
    }));
  }
  /**
   * Sets the shell to raw mode, listens for input on stdin.
   * @param stdin - The standard input stream.
   * @param onData - The callback to handle incoming data chunks.
   */
  async readRawInput(t, e) {
    this.setRawMode(!0);
    const n = (s) => {
      e(s);
    };
    t.on(O.DATA_EVENT, n), await t.wait(), t.off(O.DATA_EVENT, n), this.setRawMode(!1);
  }
  /**
   * Processes a list of paths, falling back to standard input if the list is empty or contains "-".
   * @param params
   * @param params.paths - The list of file paths or "-" for stdin.
   * @param params.workingDirectory - The directory to resolve paths against.
   * @param params.commandName - The name of the command invoking this utility.
   * @param params.onContent - Callback for file content.
   * @param params.onStdinData - Callback for standard input data.
   */
  async readFiles({
    paths: t,
    workingDirectory: e,
    stdin: n,
    stderr: s,
    commandName: i,
    onContent: o,
    onStdinData: c
  }) {
    let u = L.success;
    if (!t.length)
      return await this.readRawInput(n, c), u;
    for (const l of t) {
      if (l === "-") {
        await this.readRawInput(n, c);
        continue;
      }
      const d = e.navigate(l);
      if (!d) {
        u = await K.writeError(s, i, `${l}: ${K.INVALID_PATH_ERROR}`);
        continue;
      }
      if (d.isFolder()) {
        u = await K.writeError(s, i, `${l}: Is a directory`);
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
  static async writeError(t, e, n = K.COMMAND_FAILED_ERROR, s = L.generalError) {
    return await K.printLn(t, ne.red(`${e}: ${typeof n == "string" ? n : n.join(": ")}`)), s;
  }
  /**
   * Executes a task repeatedly and writes its output to `stdout`.
   * @returns A promise that resolves when the loop is finished.
   */
  static async loop({ stdout: t, stdin: e, task: n, delay: s = 0, maxIterations: i }) {
    return await K.animate({
      stdout: t,
      stdin: e,
      render: (o) => (i !== void 0 && o >= i && e.end(), n()),
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
  static async animate({ stdout: t, stdin: e, render: n, delay: s, clear: i = !0, stopOnBlank: o = !0, useAltBuffer: c = !0 }) {
    let u = 0;
    c && await t.write(v.screen.enterAltBuffer);
    async function l(h) {
      clearInterval(h), c && await t.write(v.screen.exitAltBuffer), e.end();
    }
    const d = setInterval(() => {
      const h = n(u);
      let p = h;
      i && (p = v.screen.clear + v.screen.home + p), t.write(p).then(() => {
        u++, o && !h.trim().length && u > 1 && l(d);
      });
    }, s);
    return e.on(O.END_EVENT, () => {
      l(d);
    }), await e.wait(L.success);
  }
  /**
   * Reads input data. If `rawLine` is provided, it processes it immediately via the callback.
   * Otherwise, it waits for data from the `stdin` stream.
   * @param rawLine - The pre-provided input string.
   * @param stdin - The input stream to fall back on.
   * @param callback - Function to process the collected input data.
   */
  static async readInput(t, e, n) {
    if (t.length)
      return await n(t);
    let s = "";
    return e.on(O.DATA_EVENT, (i) => {
      s += i;
    }), await e.wait().then(async () => s.length ? await n(s) : L.success);
  }
  /**
   * Utility function that writes `text` followed by a newline (`"\n"`) to `stream`.
   * @param stream - The stream to write to.
   * @param text - The text to write.
   */
  static async printLn(t, e = "") {
    await t.write(e + `
`);
  }
  static quote(t) {
    return /^[\w@%+=:,./-]+$/.test(t) ? t : `'${t.replace(/'/g, "'\\''")}'`;
  }
}
class Zs extends O {
  file;
  constructor(t) {
    super(), this.file = t, this.init();
  }
  async init() {
    const t = await this.file.read();
    t != null && await this.write(t), this.end();
  }
}
class Js extends O {
  file;
  writeBuffer = "";
  constructor(t) {
    super(), this.file = t, this.on(O.DATA_EVENT, (e) => {
      this.writeBuffer += e;
    }), this.on(O.END_EVENT, () => {
      this.file.setContent(this.writeBuffer);
    });
  }
}
var N = /* @__PURE__ */ ((r) => (r.Command = "command", r.Logical = "logical", r.Pipeline = "pipeline", r.If = "if", r.ConditionalBlock = "conditionalBlock", r.While = "while", r.ForIn = "forIn", r.ForExpression = "forExpression", r.Assignment = "assignment", r.Arithmetic = "arithmetic", r.ParameterExpansion = "parameterExpansion", r.ArithmeticExpansion = "arithmeticExpansion", r.CommandSubstitution = "commandSubstitution", r.Redirection = "redirection", r))(N || {});
const Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NodeType: N
}, Symbol.toStringTag, { value: "Module" }));
class En {
  /**
   * The size of this modal.
   * @default new Vector2(400, 200)
   */
  size = new U(400, 200);
  /**
   * The position of this modal.
   * @default new Vector2(300, 300)
   */
  position = new U(300, 300);
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
  constructor(t, e) {
    this.element = t, this.callback = e, this.focus();
  }
  setIcon(t) {
    return this.icon = t, this;
  }
  setTitle(t) {
    return this.title = t, this;
  }
  setPosition(t) {
    return this.position = t, this;
  }
  setSize(t) {
    return this.size = t, this;
  }
  setProps(t) {
    return this.props = t, this;
  }
  /**
   * @param {boolean} dismissible 
   * @returns {Modal}
   */
  setDismissible(t) {
    return this.dismissible = t, this;
  }
  focus() {
    this.lastInteraction = Date.now();
  }
  finish(...t) {
    this.modalsManager == null || this.id == null || (this.modalsManager.close(this.id), this.callback?.(...t));
  }
  close() {
    this.finish();
  }
}
class bt {
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
  open(t, e = !0) {
    e && this.modalIds.forEach((s) => {
      this.close(s, !1);
    });
    let n = 0;
    for (; this.modalIds.includes(n.toString()); )
      n++;
    t.id = n, t.modalsManager = this, console.info(`Opening modal ${n}`), this.modals[n] = t, this.updateModals(this.modals);
  }
  /**
   * Closes a modal.
   * @param modalId - The ID of the modal to close.
   */
  close(t, e = !0) {
    if (t = t.toString(), !this.modalIds.includes(t)) {
      console.warn(`Failed to close modal ${t}: modal not found`);
      return;
    }
    console.info(`Closing modal ${t}`), delete this.modals[t], e && this.updateModals(this.modals);
  }
  /**
   * Brings a modal into focus.
   * @param modalId - The ID of the modal to bring into focus.
   */
  focus(t) {
    if (t = t.toString(), !this.modalIds.includes(t)) {
      console.warn(`Failed to focus modal ${t}: modal not found`);
      return;
    }
    this.modals[t].focus(), this.updateModals(this.modals);
  }
  setUpdateModals(t) {
    this.updateModals = t;
  }
  /**
   * Returns the IDs of all open modals.
   */
  get modalIds() {
    return Object.keys(this.modals);
  }
  static getModalIconUrl(t) {
    return `/assets/modals/icons/${t}.svg`;
  }
}
class mt {
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
  #t = {};
  #e = null;
  enableWarning;
  constructor(t, e = !0) {
    this.#e = t, this.enableWarning = e;
    const n = this.#e;
    Object.values(mt.VIRTUAL_PATHS).forEach((s) => {
      this.#t[s] = new ht(this, n, s);
    });
  }
  getSettings(t) {
    return this.#t[t];
  }
}
const ze = "options";
class ht {
  /**
   * The virtual path of the settings file.
   */
  path;
  /**
   * The settings file.
   */
  file;
  xmlDoc;
  #t;
  /**
   * Virtual path to the desktop settings.
   */
  static DESKTOP = mt.VIRTUAL_PATHS.desktop;
  /**
   * Virtual path to the taskbar settings.
   */
  static TASKBAR = mt.VIRTUAL_PATHS.taskbar;
  /**
   * Virtual path to the apps settings.
   */
  static APPS = mt.VIRTUAL_PATHS.apps;
  /**
   * Virtual path to the theme settings.
   */
  static THEME = mt.VIRTUAL_PATHS.theme;
  /**
   * Virtual path to the virtual drive settings.
   */
  static VIRTUAL_DRIVE = mt.VIRTUAL_PATHS.virtualDrive;
  constructor(t, e, n) {
    if (this.#t = e, this.path = n, this.file = this.#t.navigateToFile(this.path), t.enableWarning)
      if (this.file == null) {
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
    const t = await this.file.read();
    if (!t)
      return;
    const n = new DOMParser().parseFromString(t, "text/xml");
    this.xmlDoc = n;
  }
  write() {
    if (this.file == null || this.xmlDoc == null)
      return;
    const e = new XMLSerializer().serializeToString(this.xmlDoc);
    this.file.setContent(e);
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
  async get(t, e) {
    if (await this.isMissingXmlDoc())
      return { value: null };
    let n = this.xmlDoc?.getElementsByTagName(t)[0]?.textContent, s;
    return e && (n != null && e(n), s = this.file?.on(Z.CONTENT_CHANGE_EVENT, () => {
      (async () => {
        await this.read();
        const i = (await this.get(t)).value;
        i != null && i !== n && (e(i), n = i);
      })();
    })), { value: n, listener: s };
  }
  async #e(t, e, n) {
    let s = { value: null };
    return n !== void 0 ? s = await this.get(t, (i) => {
      n(e(i));
    }) : s = await this.get(t), {
      value: s.value ? e(s.value) : null,
      listener: s.listener
    };
  }
  /**
   * Gets a value by a given key as a boolean.
   */
  async getBool(t, e) {
    return await this.#e(t, nn, e);
  }
  /**
   * Gets a value by a given key as an integer.
   */
  async getInt(t, e) {
    return await this.#e(t, parseInt, e);
  }
  /**
   * Sets the value associated with a given key.
   * @param key - The key of the setting.
   * @param value - The new value.
   */
  async set(t, e) {
    if (!(await this.isMissingXmlDoc() || this.xmlDoc == null)) {
      if (this.xmlDoc.getElementsByTagName(t).length > 0)
        this.xmlDoc.getElementsByTagName(t)[0].textContent = e;
      else if (this.xmlDoc.getElementsByTagName(ze).length > 0) {
        const n = this.xmlDoc.createElement(t);
        n.textContent = e, this.xmlDoc.getElementsByTagName(ze)[0].appendChild(n);
      }
      this.write();
    }
  }
  /**
   * Removes a listener from the settings file.
   * @param listener - The listener to remove.
   */
  removeListener(t) {
    this.file?.off(Z.CONTENT_CHANGE_EVENT, t);
  }
}
class Na {
  static MAX_BYTES = 5e6;
  static store(t, e) {
    if (this.getByteSize(e) > this.MAX_BYTES)
      throw new Error("Failed to store value: storage capacity exceeded.");
    localStorage.setItem(t, e);
  }
  static load(t) {
    return localStorage.getItem(t);
  }
  static clear() {
    localStorage.clear();
  }
  static getByteSize(t) {
    return t == null ? 0 : new Blob([t]).size;
  }
  static byteToKilobyte(t) {
    return t / 1e3;
  }
}
class Qs {
  #t;
  measurementId;
  constructor(t) {
    this.#t = t;
  }
  init() {
    const { trackingConfig: t } = this.#t;
    this.measurementId = t.enabled ? t.googleAnalyticsMeasurementId : null;
    try {
      this.measurementId != null && $e.initialize(this.measurementId);
    } catch (e) {
      console.error(e);
    }
    return this;
  }
  event(t) {
    if (console.info(t), this.measurementId != null)
      try {
        $e.event(t);
      } catch (e) {
        console.error(e);
      }
  }
}
class ti {
  windows;
  /** Function that handles changes to the open windows. */
  updateWindows;
  startupComplete;
  #t;
  #e;
  constructor(t, e) {
    this.#t = t, this.#e = e, this.windows = {}, this.updateWindows = () => {
    }, this.startupComplete = !1;
  }
  /**
   * Opens a window for an application.
   * @param appId - The ID of the app.
   */
  open(t, e) {
    const { appsConfig: n, windowsConfig: s, taskbarConfig: i } = this.#t, o = n.getAppById(t);
    if (o == null)
      return console.warn(`Failed to open app ${t}: app not found`), null;
    const c = e?.size ?? o.windowOptions?.size ?? new U(700, 400), u = new U(
      window.innerWidth - s.screenMargin * 2,
      window.innerHeight - s.screenMargin * 2 - i.height
    );
    let l = !1;
    c.x > u.x ? (c.x = u.x, l = !0) : c.y > u.y && (c.y = u.y, l = !0);
    const d = new U(
      s.screenMargin + Oe(0, u.x - c.x),
      s.screenMargin + Oe(0, u.y - c.y)
    );
    e?.fullscreen && (typeof e.fullscreen == "string" ? l = e.fullscreen.toLowerCase() === "true" : l = e.fullscreen, delete e.fullscreen);
    let h = 0;
    for (; this.windowIds.includes(h.toString()); )
      h++;
    return h = h.toString(), this.#e.event({
      category: "Actions",
      action: "Opened window",
      label: o.id
    }), console.info(`Opening window ${h}:${o.id}`), this.windows[h] = {
      id: h,
      app: o,
      size: c,
      position: d,
      fullscreen: l,
      options: e
    }, this.focus(h), o.isActive = !0, this.updateWindows(this.windows), this.windows[h];
  }
  /**
   * Opens a file with the associated app or by a method specified by the file scheme.
   * @returns Opened window.
   */
  openFile(t, e = {}) {
    if (t.source != null) {
      if (t.source.startsWith(st.external))
        return _e(t.source.replace(st.external, ""), "_blank"), null;
      if (t.source.startsWith(st.app))
        return this.open(t.source.replace(st.app, ""));
    }
    if (t.extension == null)
      return null;
    const { appsConfig: n } = this.#t, s = n.getAppByFileExtension(t.extension);
    return s != null ? this.open(s.id, { file: t, ...e }) : null;
  }
  /**
   * Close a window.
   */
  close(t) {
    if (t = t.toString(), !this.windowIds.includes(t)) {
      console.warn(`Failed to close window ${t}: window not found`);
      return;
    }
    const { app: e } = this.windows[t];
    e != null && (e.isActive = this.isAppActive(e.id)), console.info(`Closing window ${t}`), delete this.windows[t], this.updateWindows(this.windows);
  }
  /**
   * Close all windows of a specific app.
   */
  closeAppWindows(t) {
    Object.keys(this.windows).forEach((e) => {
      this.windows[e].app?.id === t && this.close(e);
    });
  }
  /**
   * Focus on a specific window.
   */
  focus(t) {
    if (t = t.toString(), !this.windowIds.includes(t)) {
      console.warn(`Failed to focus window ${t}: window not found`);
      return;
    }
    Object.values(this.windows).forEach((e) => {
      const n = e.id === t;
      e.isFocused = n, n && (e.lastInteraction = Date.now().valueOf(), e.minimized = !1);
    }), this.updateWindows(this.windows);
  }
  /**
   * Check whether a window is focused.
   */
  isFocused(t) {
    return this.windows[t].isFocused;
  }
  /**
   * Check if any window is focused.
   */
  isAnyFocused() {
    let t = !1;
    return Object.values(this.windows).forEach((e) => {
      if (e.isFocused)
        return t = !0;
    }), t;
  }
  /**
   * Change the minimized state of a window.
   * @param windowId - The ID of the window.
   * @param minimized - Leave as undefined to toggle the window's minimization state.
   */
  setMinimized(t, e) {
    if (t = t.toString(), !this.windowIds.includes(t)) {
      console.warn(`Failed to set minimized on window ${t}: window not found`);
      return;
    }
    const n = this.windows[t];
    n.minimized = e ?? !n.minimized, this.updateWindows(this.windows);
  }
  /**
   * Minimize all windows.
   */
  minimizeAll() {
    Object.values(this.windows).forEach((t) => {
      t.minimized = !0;
    }), this.updateWindows(this.windows);
  }
  /**
   * Check if an app has an open window.
   */
  isAppActive(t) {
    let e = !1;
    return Object.values(this.windows).forEach((n) => {
      if (n.app?.id === t) {
        e = !0;
        return;
      }
    }), e;
  }
  /**
   * Get an opened window of a certain app.
   */
  getAppWindowId(t) {
    let e = null;
    return Object.values(this.windows).forEach((n) => {
      n.app?.id == t && (e = n.id);
    }), e;
  }
  setUpdateWindows(t) {
    this.updateWindows = t;
  }
  startup(t, e) {
    !t.length || this.startupComplete || (t.forEach((n) => {
      this.open(n, e);
    }), this.startupComplete = !0);
  }
  get windowIds() {
    return Object.keys(this.windows);
  }
}
class ei {
  length = 0;
  offset = 0;
  groupIndex = 0;
  zIndexManager = null;
  constructor(t, e) {
    this.setManager(t), this.setLength(e ?? 0);
  }
  setManager(t) {
    return this.zIndexManager = t, this;
  }
  setOffset(t) {
    return this.offset = t, this;
  }
  setLength(t) {
    return this.length === t ? this : (this.length = t, this.zIndexManager?.update(), this);
  }
  getIndex(t) {
    return this.length < t + 1 && this.setLength(t + 1), this.offset + t;
  }
}
class pt extends Yt {
  static GROUPS = {
    WINDOWS: 0,
    TASKBAR: 1,
    MODALS: 2
  };
  static INDEX_CHANGE_EVENT = "indexChange";
  groups = [];
  constructor() {
    super();
    for (let t = 0; t < Object.keys(pt.GROUPS).length; t++) {
      const e = new ei(this);
      this.groups.push(e);
    }
  }
  update() {
    let t = 0, e = !1;
    for (let n = 0; n < this.groups.length; n++) {
      const s = this.groups[n];
      s.offset !== t && (e = !0, s.setOffset(t)), t += s.length;
    }
    e && this.emit(pt.INDEX_CHANGE_EVENT);
  }
  getIndex(t, e) {
    return this.groups[t].getIndex(e);
  }
}
class ni {
  /** The name of the system. */
  systemName;
  /** The tagline/short description of the system. */
  tagLine;
  #t;
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
    systemName: t,
    tagLine: e,
    skin: n,
    desktopConfig: s,
    appsConfig: i,
    miscConfig: o,
    modalsConfig: c,
    taskbarConfig: u,
    trackingConfig: l,
    windowsConfig: d,
    virtualDriveConfig: h
  }) {
    this.systemName = t ?? "ProzillaOS", this.tagLine = e ?? "Web-based Operating System", this.skin = n ?? new Is(), this.desktopConfig = s, this.appsConfig = i, this.miscConfig = o, this.modalsConfig = c, this.taskbarConfig = u, this.trackingConfig = l, this.windowsConfig = d, this.virtualDriveConfig = h, this.storage = new et(), this.loadSkin(), this.#t = /* @__PURE__ */ new Date();
  }
  loadSkin() {
    const t = this.skin;
    this.appsConfig.apps.forEach((e) => {
      e.applySkin(t);
    }), t.loadStyleSheet != null && t.loadStyleSheet();
  }
  getUptime(t = 2) {
    return en(this.#t, t, !1);
  }
}
const xn = ct(void 0);
function Lt() {
  return ut(xn);
}
const Sn = ct(void 0);
function j() {
  const r = ut(Sn);
  if (r == null)
    throw new Error("SystemManager is missing");
  return r;
}
function Ra() {
  return j().storage;
}
function be() {
  return j().skin;
}
function Da(r) {
  const [t, e] = x(r ? [r] : []), [n, s] = x(0), i = (h) => {
    if (h === t[0])
      return;
    let p = [
      h,
      ...t.slice(n, t.length)
    ];
    p = p.filter((f, g) => f !== p[g + 1]), e(p), s(0);
  }, o = (h) => {
    const p = xe(n + h, 0, t.length - 1);
    p !== n && s(p);
  }, c = () => o(1), u = () => o(-1), l = n < t.length - 1, d = n >= 1;
  return { history: t, stateIndex: n, pushState: i, undo: c, redo: u, undoAvailable: l, redoAvailable: d };
}
function ke({ onKeyDown: r, onKeyUp: t }) {
  y(() => (r && document.addEventListener("keydown", r), t && document.addEventListener("keyup", t), () => {
    r && document.removeEventListener("keydown", r), t && document.removeEventListener("keyup", t);
  }), [r, t]);
}
function si(r) {
  const [t, e] = x([]), n = J((o, c = !0) => {
    if (!r.shortcuts) return;
    const u = [...t], l = (d, h) => {
      for (const [p, f] of Object.entries(d))
        f.every(
          (E) => u.includes(E) || o.key === E
        ) && (o.preventDefault(), o.stopPropagation(), !(!f.includes(o.key) || !c) && (h != null ? r.options[h]?.[p]?.(o) : r.options[p]?.(o)));
    };
    if (r.useCategories)
      for (const [d, h] of Object.entries(r.shortcuts))
        l(h, d);
    else
      l(r.shortcuts);
    e(u);
  }, [t, r]);
  y(() => {
    const o = () => e([]);
    return document.addEventListener("blur", o), () => document.removeEventListener("blur", o);
  }, []), ke({ onKeyDown: (o) => {
    const c = t.includes(o.key);
    n(o, c), c || e(t.concat([o.key]));
  }, onKeyUp: (o) => {
    if (n(o), t.includes(o.key)) {
      const c = [...t];
      vt(o.key, c), e(c);
    }
  } });
}
function Ma({ onMouseDown: r, onMouseUp: t, onClick: e, onContextMenu: n }) {
  y(() => (r && document.addEventListener("mousedown", r), t && document.addEventListener("mouseup", t), e && document.addEventListener("click", e), n && document.addEventListener("contextmenu", n), () => {
    r && document.removeEventListener("mousedown", r), t && document.removeEventListener("mouseup", t), e && document.removeEventListener("click", e), n && document.removeEventListener("contextmenu", n);
  }), [r, t, e, n]);
}
function ii(r, t) {
  y(() => {
    const e = (n) => {
      r.current && !r.current.contains(n.target) && t(n);
    };
    return document.addEventListener("mousedown", e), () => {
      document.removeEventListener("mousedown", e);
    };
  }, [r, t]);
}
const ft = at(({ onOutsideClick: r, children: t }) => {
  const e = lt(null);
  return ii(e, r), /* @__PURE__ */ a("div", { ref: e, children: t });
});
function Te() {
  const [r, t] = x(null), [e, n] = x(null);
  return y(() => {
    const s = new ResizeObserver((o) => {
      t(o[0].contentBoxSize[0].inlineSize), n(o[0].contentBoxSize[0].blockSize);
    }), i = document.getElementById("root");
    if (i == null)
      throw new Error("Root is null: No element with ID 'root' found");
    s.observe(i);
  }, []), [r, e];
}
function ri({ avoidTaskbar: r = !0 }) {
  const { taskbarConfig: t } = j(), e = lt(null), [n, s] = x(!1), [i, o] = x(!1), [c, u] = x(!1), [l, d] = Te();
  return y(() => {
    if (e.current == null || l == null || d == null)
      return;
    const h = e.current.getBoundingClientRect(), p = l;
    let f = d;
    r && (f -= t.height);
    const g = h.x + h.width > p, E = h.y + h.height > f;
    g && o(!0), E && u(!0), s(!0);
  }, [i, r, d, l]), { ref: e, initiated: n, alignLeft: i, alignTop: c };
}
function vn(r) {
  const [t, e] = x(!1), [n, s] = x(0), [i, o] = x(0), [c, u] = x(0);
  r == null && (r = {}), r.shadow == null && (r.shadow = {}), r.shadow.color == null && (r.shadow.color = {});
  const {
    ref: l,
    horizontal: d = !0,
    dynamicOffset: h = !0,
    dynamicOffsetFactor: p = 3,
    shadow: {
      offset: f = 8,
      blurRadius: g = 5,
      spreadRadius: E = -5,
      color: {
        r: w = 0,
        g: A = 0,
        b: R = 0,
        a: z = 50
      }
    }
  } = r, b = J((I) => {
    I && (s(d ? I.scrollLeft : I.scrollTop), o(d ? I.scrollWidth : I.scrollHeight), u(d ? I.clientWidth : I.clientHeight));
  }, [d]), k = (I) => {
    b(I.target);
  };
  return y(() => {
    const I = () => {
      l?.current != null && b(l.current);
    };
    return l?.current && !t && (e(!0), b(l.current)), window.addEventListener("resize", I), () => {
      window.removeEventListener("resize", I);
    };
  }, [l, b, t]), { boxShadow: (() => {
    const I = n, V = i - n - c, Q = I === 0, H = V === 0, C = n > 0 && c < i - n;
    let D = f, Y = f;
    h && (D = I * p - f, Y = V * p - f, D > f ? D = f : D < 0 && (D = 0), Y > f ? Y = f : Y < 0 && (Y = 0));
    const it = d ? `${D}px 0` : `0 ${D}px`, xt = d ? `-${Y}px 0` : `0 -${Y}px`, P = `inset ${it} ${g}px ${E}px rgba(${w}, ${A}, ${R}, ${z}%)`, dt = `inset ${xt} ${g}px ${E}px rgba(${w}, ${A}, ${R}, ${z}%)`;
    let rt = "none";
    return Q ? rt = dt : C ? rt = `${P}, ${dt}` : H && (rt = P), rt;
  })(), onUpdate: k };
}
const re = "ProzillaOS", oe = "-", ae = "__", Ve = "--";
function oi(r, t, e) {
  return gt(() => {
    if (r == null)
      return null;
    let n = `${re + oe + r}`;
    return t != null && (n += ae + t), typeof e == "string" ? (n += ` ${re + oe + r}`, t != null && (n += ae + t), n += Ve + e) : e?.forEach((s) => {
      n += ` ${re + oe + r}`, t != null && (n += ae + t), n += Ve + s;
    }), n.trim();
  }, [r, t, e]);
}
function S(r, t, e, n) {
  const s = oi(t, e, n);
  return gt(() => {
    const i = [...r];
    return s != null && i.unshift(s), i.join(" ");
  }, [r, s]);
}
function ai(r) {
  const t = lt(null);
  return t.current === null && (t.current = r()), t;
}
function wt(r) {
  return ai(r).current;
}
function Oa({
  containerRef: r,
  testString: t = "M".repeat(100)
}) {
  const e = lt(null), [n, s] = x(U.ZERO), [i, o] = x(U.ZERO);
  y(() => {
    let u;
    const l = () => {
      u = requestAnimationFrame(() => {
        const g = r.current, E = e.current;
        if (!g || !E)
          return;
        const w = E.getBoundingClientRect();
        if (!w.width || !w.height)
          return;
        const A = g.getBoundingClientRect(), R = g.offsetWidth > 0 ? A.width / g.offsetWidth : 1, z = g.offsetHeight > 0 ? A.height / g.offsetHeight : 1, b = w.width / R / t.length, k = w.height / z;
        if (b <= 0 || k <= 0)
          return;
        const M = getComputedStyle(g), I = parseFloat(M.paddingLeft) + parseFloat(M.paddingRight), V = parseFloat(M.paddingTop) + parseFloat(M.paddingBottom), Q = g.clientWidth - I, H = g.clientHeight - V, C = Math.floor(Q / b), D = Math.floor(H / k);
        s(new U(b, k)), o(new U(C, D));
      });
    }, d = r.current, h = e.current;
    if (!d || !h)
      return;
    const p = new ResizeObserver(l);
    p.observe(d), p.observe(h), d.addEventListener("transitionend", l), d.addEventListener("animationend", l);
    const f = getComputedStyle(d);
    return document.fonts.load(`${f.fontSize} ${f.fontFamily}`).then(l).catch(() => null), document.fonts.addEventListener("loadingdone", l), l(), () => {
      cancelAnimationFrame(u), p.disconnect(), d.removeEventListener("transitionend", l), d.removeEventListener("animationend", l), document.fonts.removeEventListener("loadingdone", l);
    };
  }, [r, t]);
  const c = gt(() => /* @__PURE__ */ a(
    "span",
    {
      ref: e,
      "aria-hidden": "true",
      style: {
        position: "absolute",
        pointerEvents: "none",
        visibility: "hidden",
        whiteSpace: "pre",
        left: 0,
        top: 0
      },
      children: t
    }
  ), [t]);
  return { charSize: n, containerSize: i, sentinel: c };
}
const li = ({ children: r }) => {
  const t = j(), e = wt(() => new ye(t).init());
  return /* @__PURE__ */ a(xn.Provider, { value: e, children: r });
}, In = ct(void 0);
function ci() {
  return ut(In);
}
const ui = ({ children: r }) => {
  const t = wt(() => new pt());
  return /* @__PURE__ */ a(In.Provider, { value: t, children: r });
}, _n = ct(void 0);
function Et() {
  return ut(_n);
}
const yn = ct(void 0);
function An() {
  return ut(yn);
}
const di = ({ children: r, windowsManager: t }) => {
  const [e, n] = x([]), s = J((i) => {
    n(Object.values(i));
  }, []);
  return t.setUpdateWindows(s), /* @__PURE__ */ a(yn.Provider, { value: e, children: r });
}, Cn = ct(void 0);
function hi() {
  return ut(Cn);
}
const pi = ({ children: r }) => {
  const t = j(), e = hi();
  if (e == null)
    throw new Error("WindowsManager is missing TrackingManager");
  const n = wt(() => new ti(t, e));
  return /* @__PURE__ */ a(_n.Provider, { value: n, children: /* @__PURE__ */ a(di, { windowsManager: n, children: r }) });
}, bn = ct(void 0);
function fi() {
  return ut(bn);
}
const mi = ({ children: r, modalsManager: t }) => {
  const [e, n] = x([]), s = J((i) => {
    n(Object.values(i));
  }, []);
  return t.setUpdateModals(s), /* @__PURE__ */ a(bn.Provider, { value: e, children: r });
}, kn = ct(void 0);
function Zt() {
  return ut(kn);
}
const gi = ({ children: r }) => {
  const t = wt(() => new bt());
  return /* @__PURE__ */ a(kn.Provider, { value: t, children: /* @__PURE__ */ a(mi, { modalsManager: t, children: r }) });
}, Tn = ct(void 0);
function Rt() {
  return ut(Tn);
}
const wi = ({ children: r }) => {
  const t = Lt();
  if (t == null) throw new Error("SettingsManager is missing VirtualRoot");
  const e = wt(() => new mt(t));
  return /* @__PURE__ */ a(Tn.Provider, { value: e, children: r });
};
function Ei({ children: r }) {
  const t = be(), [e, n] = x(t.defaultTheme ?? Kt.Dark), i = Rt()?.getSettings(ht.THEME);
  return y(() => {
    i?.get("theme", (o) => {
      n(parseInt(o) || 0);
    });
  }, [i]), /* @__PURE__ */ a("div", { className: `${Kt[e ?? Kt.Dark]}-theme`, children: r });
}
const xi = (r) => {
  const { children: t, ...e } = r, n = wt(() => new ni(e));
  return /* @__PURE__ */ a(Sn.Provider, { value: n, children: t });
}, Si = ({ children: r }) => {
  const t = j(), e = wt(() => new Qs(t).init());
  return /* @__PURE__ */ a(Cn.Provider, { value: e, children: r });
}, vi = "_Main_1w5gc_1", Ii = {
  Main: vi
};
function _i({ children: r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      onContextMenu: (t) => {
        t.preventDefault();
      },
      className: S([Ii.Main], "Main"),
      children: r
    }
  );
}
const Fa = at(function(r) {
  const { systemName: t, tagLine: e, skin: n, config: s, children: i } = r, o = {
    systemName: t,
    tagLine: e,
    skin: n,
    appsConfig: new q(s?.apps),
    desktopConfig: new Rs(s?.desktop),
    miscConfig: new Ds(s?.misc),
    modalsConfig: new Se(s?.modals),
    taskbarConfig: new Ms(s?.taskbar),
    trackingConfig: new Os(s?.tracking),
    windowsConfig: new Fs(s?.windows),
    virtualDriveConfig: new Vs(s?.virtualDrive)
  };
  return /* @__PURE__ */ a(xi, { ...o, children: /* @__PURE__ */ a(li, { children: /* @__PURE__ */ a(ui, { children: /* @__PURE__ */ a(Si, { children: /* @__PURE__ */ a(pi, { children: /* @__PURE__ */ a(gi, { children: /* @__PURE__ */ a(wi, { children: /* @__PURE__ */ a(Ei, { children: /* @__PURE__ */ a(_i, { children: i }) }) }) }) }) }) }) }) });
}), yi = "_Taskbar_z2v4w_1", Ai = "_Menus_z2v4w_52", Nn = {
  Taskbar: yi,
  Menus: Ai
};
function Rn({ defaults: r, slots: t, layout: e, children: n }) {
  return wn(n) ? /* @__PURE__ */ a(Ci, { defaults: r, slots: t, layout: e }) : n;
}
function Ci({ defaults: r, slots: t, layout: e }) {
  const n = gt(() => Object.fromEntries(Object.entries(r).map(([s, i]) => {
    const o = `render${s.charAt(0).toUpperCase() + s.slice(1)}`;
    return [s, t[o] ?? i];
  })), [r, t]);
  return e ? e(n) : Object.entries(n).map(([s, i]) => /* @__PURE__ */ a(i, {}, s));
}
const He = /* @__PURE__ */ Symbol("noContext");
function bi(r, t) {
  const e = ct(t ?? He);
  return e.displayName = `${r}Context`, {
    useSlotsContext: () => {
      const i = ut(e);
      if (i === He)
        throw new Error(`${r} slots must be rendered inside ${r} to read from its context, because there is no default value.`);
      return i;
    },
    SlotsProvider: ({ context: i, defaults: o, slots: c, layout: u, children: l }) => /* @__PURE__ */ a(e.Provider, { value: i, children: /* @__PURE__ */ a(Rn, { defaults: o, slots: c, layout: u, children: l }) })
  };
}
function Dn(r, t, e) {
  const n = e ?? r.displayName ?? r.name;
  if (n) {
    r.displayName = n;
    for (const [s, i] of Object.entries(t))
      typeof i == "function" && !i.displayName && (i.displayName = `${n}.${s}`);
  }
  return Object.assign(r, t);
}
var Ke;
((r) => {
  r.Empty = () => null, r.Empty.displayName = "Empty";
})(Ke || (Ke = {}));
function Pa(r) {
  const t = Lt(), [e, n] = x(null);
  return y(() => {
    if (e != null)
      return;
    const s = t?.navigateToFolder("~/Apps");
    if (s == null) {
      console.warn("Folder missing: '~/Apps'");
      return;
    }
    r != null && s.createFolder(r.id, (i) => {
      n(i);
    });
  }, [t]), e;
}
const je = (r, t) => r.name.localeCompare(t.name);
function Ne(r = {}) {
  const { sort: t, filter: e } = r, { appsConfig: n } = j(), [s, i] = x([]), o = J(() => {
    let c = [...n.installedApps];
    e != null && (c = c.filter(e)), typeof t == "boolean" ? t && c.sort(je) : c.sort(t ?? je), i(c);
  }, [n, t, e]);
  return y(() => (o(), n.onAppsChange(o)), [o]), s;
}
const ki = "_WindowedModal_u6mt7_1", Ti = "_Header_u6mt7_15", _t = {
  WindowedModal: ki,
  Header: Ti,
  "Window-icon": "_Window-icon_u6mt7_29",
  "Header-button": "_Header-button_u6mt7_56",
  "Exit-button": "_Exit-button_u6mt7_75",
  "Window-content": "_Window-content_u6mt7_83"
}, Ni = "_TextRegular_wjx57_1", Ri = "_TextLight_wjx57_7", Di = "_TextSemibold_wjx57_14", Mi = "_TextBold_wjx57_19", nt = {
  TextRegular: Ni,
  TextLight: Ri,
  TextSemibold: Di,
  TextBold: Mi
};
function Dt({ className: r, src: t, ...e }) {
  const [n, s] = x(U.ZERO);
  return y(() => {
    if (t == null)
      return;
    const i = new Image();
    i.onload = () => {
      s(new U(i.naturalWidth, i.naturalHeight));
    }, i.src = t;
  }, [t]), t?.endsWith(".svg") ? /* @__PURE__ */ a(Pt, { className: r, src: t, ...e }) : n.x > 0 && n.y > 0 ? /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
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
      ...e,
      children: /* @__PURE__ */ a("g", { transform: `scale(${200 / n.x})`, children: /* @__PURE__ */ a("image", { width: n.x, height: n.y, href: t, style: { imageRendering: "crisp-edges" } }) })
    }
  ) }) }) : /* @__PURE__ */ a("div", { className: r });
}
function Mn({ modal: r, params: t, children: e, ...n }) {
  const s = lt(null), [i, o] = x(r?.position), [c, u] = Te();
  return y(() => {
    c == null || u == null || (r?.position != null ? (r.position.x > c && (r.position.x = 0), r.position.y > u && (r.position.y = 0), o(r.position)) : o(new U(0, 0)));
  }, [r, u, c]), /* @__PURE__ */ a(
    cn,
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
        right: (c ?? 0) - 5 - (r?.position.x ?? 0)
      },
      cancel: "button",
      nodeRef: s,
      children: /* @__PURE__ */ m(
        "div",
        {
          className: _t.WindowedModal,
          ref: s,
          style: {
            width: r?.size.x ?? 0,
            height: r?.size.y ?? 0
          },
          children: [
            /* @__PURE__ */ m("div", { className: `${_t.Header} Window-handle`, children: [
              /* @__PURE__ */ a(
                Dt,
                {
                  className: _t["Window-icon"],
                  src: t?.iconUrl
                }
              ),
              /* @__PURE__ */ a("p", { className: nt.TextSemibold, children: t?.title }),
              /* @__PURE__ */ a(
                "button",
                {
                  "aria-label": "Close",
                  className: `${_t["Header-button"]} ${_t["Exit-button"]}`,
                  tabIndex: 0,
                  onClick: () => {
                    r?.close();
                  },
                  children: /* @__PURE__ */ a(F, { icon: on })
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: _t["Window-content"], ...n, children: e })
          ]
        }
      )
    }
  );
}
const Oi = "_DialogContent_lop64_1", Fi = {
  DialogContent: Oi
};
function Pi({ modal: r, params: t, children: e, ...n }) {
  return /* @__PURE__ */ a(Mn, { modal: r, params: t, onClick: (i) => {
    i.preventDefault();
    const o = i.target.getAttribute("data-type");
    if (o == null) return;
    parseInt(o) === Se.DIALOG_CONTENT_TYPES.closeButton && r?.close();
  }, ...n, children: /* @__PURE__ */ a("div", { className: Fi.DialogContent, children: e }) });
}
function Re() {
  const { modalsConfig: r } = j(), t = Zt();
  return { openWindowedModal: J(({ Modal: n, ...s }) => {
    const i = s.size ?? r.defaultDialogSize;
    let o = (window.innerWidth - i.x) / 4, c = (window.innerHeight - i.y) / 4;
    if (t?.containerRef?.current) {
      const d = t.containerRef.current.getBoundingClientRect();
      o -= d.x / 2, c -= d.y / 2;
    }
    const u = new En(n).setPosition(new U(o, c)).setSize(i).setDismissible(!1).setProps({ params: s }), l = s.single ?? !1;
    return t?.open(u, l), u;
  }, [t]) };
}
function On() {
  const { openWindowedModal: r } = Re();
  return { alert: J(({ title: e, text: n, iconUrl: s, size: i, single: o }) => {
    r({
      title: e ?? "Alert",
      iconUrl: s,
      size: i ?? new U(300, 150),
      single: o,
      Modal: (c) => /* @__PURE__ */ m(Pi, { ...c, children: [
        /* @__PURE__ */ a("p", { children: n }),
        /* @__PURE__ */ a("button", { "data-type": Se.DIALOG_CONTENT_TYPES.closeButton, children: "Ok" })
      ] })
    });
  }, [r]) };
}
class Jt {
  static MODES = {
    contextMenu: "ContextMenu",
    shortcutsListener: "ShortcutsListener",
    headerMenu: "HeaderMenu"
  };
}
function Li() {
  const r = Zt();
  return { openContextMenu: J((e, n, s = {}) => {
    const i = new En(n).setPosition(e).setProps({
      triggerParams: s,
      mode: Jt.MODES.contextMenu,
      onAnyTrigger: () => {
        i.close();
      }
    });
    return r?.open(i), i;
  }, [r]) };
}
function kt({ Actions: r }) {
  const t = Zt(), { openContextMenu: e } = Li();
  return { onContextMenu: J((i, o = {}) => {
    i.preventDefault(), i.stopPropagation();
    let c = i.clientX, u = i.clientY;
    if (t?.containerRef?.current != null) {
      const l = t.containerRef.current.getBoundingClientRect();
      c -= l.x, u -= l.y / 2;
    }
    return e(new U(c, u), r, o);
  }, [r, t]), ShortcutsListener: () => /* @__PURE__ */ a(r, { mode: Jt.MODES.shortcutsListener }) };
}
function La(r, t, e) {
  return Qt(r, t, e ?? null, (n) => n.length ? n : null, (n) => n ?? "");
}
function Ba(r, t, e) {
  return Qt(r, t, e ?? [], (n) => n.length ? n.split(",") : [], (n) => n.join(","));
}
function $a(r, t, e) {
  return Qt(r, t, e ?? !1, (n) => nn(n));
}
function Wa(r, t, e) {
  return Qt(r, t, e ?? 0, (n) => parseInt(n));
}
function Qt(r, t, e, n, s = (i) => String(i)) {
  const [i, o] = x(e), c = Rt();
  y(() => {
    const l = c?.getSettings(r);
    if (!l)
      return;
    let d;
    return l.get(t, (h) => o(n(h))).then((h) => {
      d = h.listener, h.value || o(e);
    }), () => {
      d && l.removeListener(d);
    };
  }, [c]);
  const u = J((l) => {
    const d = c?.getSettings(r);
    typeof l != "string" && (l = s(l)), d?.set(t, l);
  }, [c]);
  return [i, u];
}
function De({ groupIndex: r, index: t }) {
  const e = r * 10 + t, [n, s] = x(e), i = ci();
  return y(() => {
    const o = () => {
      const c = i?.getIndex(r, t);
      c != null && n !== c && s(c);
    };
    return o(), i?.on(pt.INDEX_CHANGE_EVENT, o), () => {
      i?.off(pt.INDEX_CHANGE_EVENT, o);
    };
  }, [r, t, n, i]), n;
}
function Ua({
  app: r,
  path: t,
  input: e,
  exit: n,
  sizeRef: s
}) {
  const i = Lt(), o = j(), c = Rt(), u = wt(() => new K({
    app: r,
    path: t,
    input: e,
    virtualRoot: i,
    systemManager: o,
    settingsManager: c,
    exit: n,
    sizeRef: s
  })), l = vs(u.state);
  return [u, l];
}
function za(r, t) {
  const e = be();
  return gt(() => {
    const i = Array.from(r.entries()).filter(([c]) => e instanceof c);
    if (i.length === 0)
      return t;
    const o = i.map(([, c]) => ({ override: c }));
    return tn({ override: t }, ...o).override;
  }, [e, r, t]);
}
const Bi = "_Actions_1a1pp_1", $i = "_Uninitiated_1a1pp_15", Wi = "_AlignLeft_1a1pp_19", Ui = "_AlignTop_1a1pp_26", zi = "_DropdownArrow_1a1pp_33", Vi = "_ContextMenu_1a1pp_39", Hi = "_Button_1a1pp_51", Ki = "_Dropdown_1a1pp_33", ji = "_Label_1a1pp_75", Gi = "_Shortcut_1a1pp_83", Yi = "_Icon_1a1pp_87", Xi = "_ImageIcon_1a1pp_101", qi = "_DropdownContent_1a1pp_128", Zi = "_Active_1a1pp_141", Ji = "_Divider_1a1pp_146", Qi = "_TextDisplay_1a1pp_154", tr = "_HeaderMenu_1a1pp_165", er = "_Toggle_1a1pp_264", W = {
  Actions: Bi,
  Uninitiated: $i,
  AlignLeft: Wi,
  AlignTop: Ui,
  DropdownArrow: zi,
  ContextMenu: Vi,
  Button: Hi,
  Dropdown: Ki,
  Label: ji,
  Shortcut: Gi,
  Icon: Yi,
  ImageIcon: Xi,
  DropdownContent: qi,
  Active: Zi,
  Divider: Ji,
  TextDisplay: Qi,
  HeaderMenu: tr,
  Toggle: er
};
function St({ children: r, mode: t, className: e, onAnyTrigger: n, triggerParams: s, avoidTaskbar: i = !0 }) {
  const o = t === Jt.MODES.shortcutsListener, { ref: c, initiated: u, alignLeft: l, alignTop: d } = ri({ avoidTaskbar: i }), h = {}, p = {};
  let f = 0;
  const g = (w) => rn.map(w, (R) => {
    if (!sn(R))
      return R;
    f++;
    const { label: z, shortcut: b, disabled: k, onTrigger: M } = R.props, I = (V, ...Q) => {
      k || (V && n?.(V, s, ...Q), M?.(V, s, ...Q));
    };
    return !k && z != null && M != null && (h[f] = I, b != null && (p[f] = b)), o ? g(R.props.children) : Xn(R, {
      ...R.props,
      actionId: f.toString(),
      children: g(R.props.children),
      onTrigger: I,
      disabled: k
    });
  });
  if (si({ options: h, shortcuts: p, useCategories: !1 }), o)
    return g(r);
  const E = [W.Actions];
  return t != null && E.push(W[t]), e != null && E.push(e), l && E.push(W.AlignLeft), d && E.push(W.AlignTop), u || E.push(W.Uninitiated), /* @__PURE__ */ a("div", { ref: c, className: S(E, "Actions", void 0, t), children: g(r) });
}
const nr = "_ImagePreview_djvki_1", sr = {
  ImagePreview: nr
};
function Ee({ source: r, className: t, onError: e, ...n }) {
  const s = be(), [i, o] = x(!1), c = () => {
    o(!0), e?.();
  }, u = [sr.ImagePreview];
  return t != null && u.push(t), /* @__PURE__ */ a("div", { className: u.join(" "), ...n, children: i ? /* @__PURE__ */ a(Pt, { src: s.fileIcons.generic }) : /* @__PURE__ */ a(Dt, { src: r, onError: c }) });
}
const G = at(({ actionId: r, label: t, shortcut: e, disabled: n, onTrigger: s, icon: i }) => {
  const o = [W.Button];
  return n && o.push(W.Disabled), /* @__PURE__ */ m("button", { className: S(o, "Actions", "Click"), tabIndex: 0, disabled: n, onClick: s, children: [
    /* @__PURE__ */ m("span", { className: S([W.Label], "Actions", "Label"), children: [
      i && /* @__PURE__ */ a("div", { className: W.Icon, children: typeof i == "string" ? /* @__PURE__ */ a(Ee, { source: i, className: W.ImageIcon }) : /* @__PURE__ */ a(F, { icon: i }) }),
      /* @__PURE__ */ a("p", { children: t })
    ] }),
    e && /* @__PURE__ */ a("p", { className: W.Shortcut, children: qt(e) })
  ] }, r);
}), ir = "_Button_1uqkw_1", rr = "_ButtonLink_1uqkw_19", Ge = {
  Button: ir,
  ButtonLink: rr
};
function Me({ className: r, href: t, children: e, icon: n, target: s, ...i }) {
  const o = [Ge.Button];
  return r != null && o.push(r), t != null ? (o.push(Ge.ButtonLink), /* @__PURE__ */ m(
    "a",
    {
      ...i,
      href: t,
      target: s ?? "_blank",
      rel: "noreferrer",
      tabIndex: 0,
      className: S(o, "Button", "Link"),
      children: [
        e,
        /* @__PURE__ */ a(F, { icon: n ?? Zn })
      ]
    }
  )) : /* @__PURE__ */ m(
    "button",
    {
      ...i,
      tabIndex: 0,
      className: S(o, "Button"),
      children: [
        e,
        n != null ? /* @__PURE__ */ a(F, { icon: n }) : null
      ]
    }
  );
}
const or = "_DirectoryList_18ux0_1", ar = "_FileButton_18ux0_9", lr = "_FolderButton_18ux0_9", cr = "_FileIcon_18ux0_46", ur = "_FolderIcon_18ux0_46", dr = "_SelectionRect_18ux0_64", yt = {
  DirectoryList: or,
  FileButton: ar,
  FolderButton: lr,
  FileIcon: cr,
  FolderIcon: ur,
  SelectionRect: dr
};
let le = null;
function Ye({ onClick: r, onDoubleClick: t, children: e, ...n }) {
  const { miscConfig: s } = j(), [i, o] = x(!1);
  return /* @__PURE__ */ a("button", { ...n, onClick: (u) => {
    if (u.preventDefault(), u.stopPropagation(), le != null && clearTimeout(le), i) {
      o(!1), t?.(u);
      return;
    }
    o(!0), r?.(u), le = window.setTimeout(() => {
      o(!1);
    }, s.doubleClickDelay);
  }, children: e });
}
function hr({
  directory: r,
  showHidden: t = !1,
  folderClassName: e,
  fileClassName: n,
  className: s,
  onContextMenuFile: i,
  onContextMenuFolder: o,
  onOpenFile: c,
  onOpenFolder: u,
  allowMultiSelect: l = !0,
  onSelectionChange: d,
  ...h
}) {
  const [p, f] = x([]), [g, E] = x([]), [w, A] = x([]), [R, z] = x([]), b = lt(null), [k, M] = x(null), [I, V] = x(null);
  y(() => {
    d?.({ files: R, folders: w, directory: r });
  }, [r, d, R, w]);
  const Q = () => {
    A([]), z([]);
  };
  y(() => {
    Q();
  }, [r]), y(() => {
    const _ = (tt) => {
      k != null && (tt.preventDefault(), V({ x: tt.clientX, y: tt.clientY }));
    }, T = (tt) => {
      if (k == null || I == null) {
        M(null), V(null);
        return;
      }
      tt.preventDefault(), M(null), V(null);
    };
    return document.addEventListener("mousemove", _), document.addEventListener("mouseup", T), () => {
      document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", T);
    };
  }), y(() => {
    const _ = () => {
      f([...r.getSubFolders(t)]), E([...r.getFiles(t)]), A((T) => T.filter((tt) => r.hasFolder(tt))), z((T) => T.filter((tt) => {
        const { name: Mt, extension: $t } = Z.splitId(tt);
        return r.hasFile(Mt, $t);
      }));
    };
    return _(), r.on(It.UPDATE_EVENT, _), () => {
      r.off(It.UPDATE_EVENT, _);
    };
  }, [r, t]);
  const H = (_, T = !1) => {
    l || (T = !0), A(T ? [_.id] : [...w, _.id]), T && z([]);
  }, C = (_, T = !1) => {
    l || (T = !0), z(T ? [_.id] : [...R, _.id]), T && A([]);
  }, D = (_) => {
    const T = [...w];
    vt(_.id, T), A(T);
  }, Y = (_) => {
    const T = [...R];
    vt(_.id, T), z(T);
  }, it = (_) => {
    _.preventDefault(), M({ x: _.clientX, y: _.clientY });
  }, xt = () => {
    let _, T, tt, Mt = 0;
    if (b.current == null || k == null || I == null)
      return { top: 0, left: 0, width: 0, height: 0 };
    const $t = b.current.getBoundingClientRect();
    return k.x < I.x ? (_ = k.x, tt = I.x - k.x) : (_ = I.x, tt = k.x - I.x), k.y < I.y ? (T = k.y, Mt = I.y - k.y) : (T = I.y, Mt = k.y - I.y), _ -= $t.x, T -= $t.y, { top: T, left: _, width: tt, height: Mt };
  }, P = [yt.DirectoryList], dt = [yt.FolderButton], rt = [yt.FileButton];
  return s && P.push(s), e && dt.push(e), n && rt.push(n), e = S(dt, "DirectoryList", "Folder"), n = S(rt, "DirectoryList", "File"), /* @__PURE__ */ m(
    "div",
    {
      ref: b,
      className: S(P, "DirectoryList"),
      onClick: Q,
      onMouseDown: it,
      ...h,
      children: [
        k != null && I != null ? /* @__PURE__ */ a("div", { className: yt.SelectionRect, style: xt() }) : null,
        p.map(
          (_) => /* @__PURE__ */ m(
            Ye,
            {
              tabIndex: 0,
              className: e,
              "data-selected": w.includes(_.id),
              onContextMenu: (T) => {
                o?.(T, _);
              },
              onClick: (T) => {
                H(_, !T.ctrlKey);
              },
              onDoubleClick: (T) => {
                u?.(T, _), D(_);
              },
              children: [
                /* @__PURE__ */ a("div", { className: yt.FolderIcon, children: /* @__PURE__ */ a(Ee, { source: _.getIconUrl(), onError: () => {
                  _.setIconUrl(null);
                } }) }),
                /* @__PURE__ */ a("p", { children: _.name })
              ]
            },
            _.id
          )
        ),
        g.map(
          (_) => /* @__PURE__ */ m(
            Ye,
            {
              tabIndex: 0,
              className: n,
              "data-selected": R.includes(_.id),
              onContextMenu: (T) => {
                i?.(T, _);
              },
              onClick: (T) => {
                C(_, !T.ctrlKey);
              },
              onDoubleClick: (T) => {
                c?.(T, _), Y(_);
              },
              children: [
                /* @__PURE__ */ a("div", { className: yt.FileIcon, children: /* @__PURE__ */ a(Ee, { source: _.getIconUrl(), onError: () => {
                  _.setIconUrl(null);
                } }) }),
                /* @__PURE__ */ a("p", { children: _.id })
              ]
            },
            _.id
          )
        )
      ]
    }
  );
}
const pr = "_DropdownButton_1f5hf_1", fr = "_Button_1f5hf_6", mr = "_Dropdown_1f5hf_1", gr = "_Shortcut_1f5hf_58", Ot = {
  DropdownButton: pr,
  Button: fr,
  Dropdown: mr,
  Shortcut: gr
};
function Va({ label: r, options: t, shortcuts: e }) {
  const [n, s] = x(!1), [i, o] = x(-1);
  return y(() => {
    o(n ? 0 : -1);
  }, [n]), /* @__PURE__ */ a(ft, { onOutsideClick: () => {
    s(!1);
  }, children: /* @__PURE__ */ m("div", { className: Ot.DropdownButton, children: [
    /* @__PURE__ */ a("button", { className: Ot.Button, tabIndex: 0, onClick: () => {
      s(!n);
    }, children: r }),
    n && t ? /* @__PURE__ */ a("div", { className: Ot.Dropdown, children: Object.entries(t).map(
      ([c, u]) => /* @__PURE__ */ m("button", { tabIndex: i, onClick: () => {
        s(!1), u();
      }, children: [
        /* @__PURE__ */ a("p", { className: Ot.Label, children: c }),
        Object.keys(e).includes(c) ? /* @__PURE__ */ a("p", { className: Ot.Shortcut, children: qt(e[c]) }) : null
      ] }, c)
    ) }) : null
  ] }) });
}
const wr = "_ProgressBar_115cj_1", Er = "_Fill_115cj_10", Xe = {
  ProgressBar: wr,
  Fill: Er
};
function Ha({ fillPercentage: r, fillColor: t, backgroundColor: e, align: n = "left", className: s }) {
  return /* @__PURE__ */ a("div", { className: S([Xe.ProgressBar, s], "ProgressBar"), style: { backgroundColor: e }, children: /* @__PURE__ */ a(
    "div",
    {
      className: `${Xe.Fill} ${n}`,
      style: { backgroundColor: t, "--fill": `${xe(r, 0.1, 100)}%` }
    }
  ) });
}
const xr = "_HeaderMenu_1kc25_1", Sr = {
  HeaderMenu: xr
};
function Ka({ children: r, ...t }) {
  const e = De({ groupIndex: pt.GROUPS.MODALS, index: 5 });
  return /* @__PURE__ */ a("div", { className: S([Sr.HeaderMenu], "HeaderMenu"), style: { zIndex: e }, children: /* @__PURE__ */ a(St, { mode: Jt.MODES.headerMenu, ...t, children: r }) });
}
const vr = "_WebView_12eh1_1", Ir = {
  WebView: vr
}, ja = qn(({ source: r, focus: t, ...e }, n) => {
  const [s, i] = x(!1);
  y(() => {
    window.focus();
    const l = (d) => {
      s && t?.(d, !0);
    };
    return window.addEventListener("blur", l), () => {
      window.removeEventListener("blur", l);
    };
  }, [t, s]);
  const o = (l) => {
    i(!0);
  }, c = (l) => {
    window.focus(), i(!1);
  }, u = { ...e };
  return delete u.active, delete u.close, delete u.setTitle, delete u.setIconUrl, delete u.standalone, /* @__PURE__ */ a("div", { className: Ir.WebView, onMouseOver: o, onMouseOut: c, children: /* @__PURE__ */ a(
    "iframe",
    {
      ref: n,
      src: r,
      referrerPolicy: "no-referrer",
      sandbox: "allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts",
      ...u
    }
  ) });
}), { useSlotsContext: Bt, SlotsProvider: _r } = bi("Taskbar"), yr = "_MenuButton_1w3ho_1", Ar = "_AppList_1w3ho_16", Cr = "_AppButton_1w3ho_26", Nt = {
  MenuButton: yr,
  AppList: Ar,
  AppButton: Cr
}, br = "_HomeContainer_w9ozh_1", kr = "_HomeButton_w9ozh_12", qe = {
  HomeContainer: br,
  HomeButton: kr
}, Tr = "_HomeMenuContainer_yebwt_1", Nr = "_Active_yebwt_9", Rr = "_HomeMenu_yebwt_1", Dr = "_Buttons_yebwt_73", Mr = "_Apps_yebwt_143", Or = "_Logo_yebwt_154", At = {
  HomeMenuContainer: Tr,
  Active: Nr,
  HomeMenu: Rr,
  Buttons: Dr,
  Apps: Mr,
  Logo: Or
};
function Fr() {
  const { activeMenu: r, setActiveMenu: t, toggleMenu: e } = Bt(), n = r === "home", { systemName: s, appsConfig: i, skin: o } = j(), c = Et(), u = Lt(), [l, d] = x(n ? 0 : -1);
  y(() => {
    d(n ? 0 : -1);
  }, [n]);
  const h = [At.HomeMenuContainer];
  n && h.push(At.Active);
  let p = !1;
  ke({ onKeyDown: (b) => {
    b.key === "Alt" ? (b.preventDefault(), p = !0) : (p = !1, n && b.key.length === 1 && t("search"));
  }, onKeyUp: (b) => {
    b.key === "Alt" && p && (b.preventDefault(), e("home")), p = !1;
  } });
  const E = Ne(), w = i.getAppByRole(q.APP_ROLES.fileExplorer), A = i.getAppByRole(q.APP_ROLES.settings), R = i.getAppByRole(q.APP_ROLES.textEditor), z = S([Nt.AppButton], "SearchMenu", "AppButton");
  return /* @__PURE__ */ a("div", { className: h.join(" "), children: /* @__PURE__ */ m("div", { className: S([At.HomeMenu], "Taskbar", "Menu", "Home"), children: [
    /* @__PURE__ */ m("div", { className: S([At.Buttons], "HomeMenu", "Buttons"), children: [
      /* @__PURE__ */ m("button", { tabIndex: l, onClick: () => {
        Ps(!0, s);
      }, children: [
        /* @__PURE__ */ a(F, { icon: Jn }),
        /* @__PURE__ */ a("p", { className: nt.TextRegular, children: "Shut down" })
      ] }),
      A != null && /* @__PURE__ */ m("button", { tabIndex: l, onClick: () => {
        e("home", !1), c?.open("settings");
      }, children: [
        /* @__PURE__ */ a(F, { icon: Qn }),
        /* @__PURE__ */ a("p", { className: nt.TextRegular, children: "Settings" })
      ] }),
      R != null && /* @__PURE__ */ m("button", { tabIndex: l, onClick: () => {
        e("home", !1), c?.open("text-editor", {
          mode: "view",
          file: u?.navigate("~/Documents/Info.md"),
          size: new U(575, 675)
        });
      }, children: [
        /* @__PURE__ */ a(F, { icon: ts }),
        /* @__PURE__ */ a("p", { className: nt.TextRegular, children: "Info" })
      ] }),
      w != null && /* @__PURE__ */ m(Xt, { children: [
        /* @__PURE__ */ m("button", { tabIndex: l, onClick: () => {
          e("home", !1), c?.open(w.id, { path: "~/Pictures" });
        }, children: [
          /* @__PURE__ */ a(F, { icon: es }),
          /* @__PURE__ */ a("p", { className: nt.TextRegular, children: "Images" })
        ] }),
        /* @__PURE__ */ m("button", { tabIndex: l, onClick: () => {
          e("home", !1), c?.open(w.id, { path: "~/Documents" });
        }, children: [
          /* @__PURE__ */ a(F, { icon: ns }),
          /* @__PURE__ */ a("p", { className: nt.TextRegular, children: "Documents" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m("div", { className: S([At.Apps], "HomeMenu", "Apps"), children: [
      /* @__PURE__ */ m("span", { className: S([At.Logo], "HomeMenu", "Logo"), children: [
        /* @__PURE__ */ a(Pt, { src: o.systemIcon }),
        /* @__PURE__ */ a("h1", { className: nt.TextBold, children: s })
      ] }),
      /* @__PURE__ */ a("div", { className: S([Nt.AppList], "HomeMenu", "AppList"), children: E.map(
        ({ name: b, id: k, iconUrl: M }) => /* @__PURE__ */ m(
          "button",
          {
            className: z,
            tabIndex: l,
            onClick: () => {
              e("home", !1), c?.open(k);
            },
            title: b,
            children: [
              /* @__PURE__ */ a(Dt, { src: M ?? "" }),
              /* @__PURE__ */ a("h2", { className: nt.TextRegular, children: b })
            ]
          },
          k
        )
      ) })
    ] })
  ] }) });
}
function Fn() {
  const { systemName: r, skin: t } = j(), { toggleMenu: e } = Bt();
  return /* @__PURE__ */ a("div", { className: qe.HomeContainer, children: /* @__PURE__ */ m(ft, { onOutsideClick: () => {
    e("home", !1);
  }, children: [
    /* @__PURE__ */ a(
      "button",
      {
        className: S([Nt.MenuButton, qe.HomeButton], "Taskbar", "HomeIcon"),
        title: "Home",
        tabIndex: 0,
        onClick: () => {
          e("home");
        },
        children: t.systemIcon.endsWith(".svg") ? /* @__PURE__ */ a(Pt, { src: t.systemIcon }) : /* @__PURE__ */ a("img", { src: t.systemIcon, alt: r })
      }
    ),
    /* @__PURE__ */ a(Fr, {})
  ] }) });
}
const Pr = "_SearchContainer_trcry_1", Lr = {
  SearchContainer: Pr
}, Br = "_SearchMenuContainer_11e0k_1", $r = "_SearchMenu_11e0k_1", Wr = "_Active_11e0k_42", Ur = "_Input_11e0k_55", zt = {
  SearchMenuContainer: Br,
  SearchMenu: $r,
  Active: Wr,
  Input: Ur
};
function zr() {
  const { searchQuery: r, setSearchQuery: t, searchInputRef: e, activeMenu: n, toggleMenu: s } = Bt(), i = n === "search", o = Et(), c = Ne(), [u, l] = x(i ? 0 : -1);
  y(() => {
    l(i ? 0 : -1);
  }, [i]), y(() => {
    e.current != null && (e.current.focus(), window.scrollTo(0, document.body.scrollHeight));
  }, [e]);
  const d = gt(() => {
    const E = r.toLowerCase().trim();
    return E === "" ? c : c.filter(
      ({ name: w, id: A }) => w.toLowerCase().includes(E) || A.toLowerCase().includes(E)
    );
  }, [c, r]), h = J((E) => {
    const w = E.target.value;
    t(w);
  }, [t]), p = gt(() => ({
    onKeyDown: (E) => {
      (E.key === "f" || E.key === "g") && E.ctrlKey && !i || E.key === "Escape" && i ? (E.preventDefault(), s("search", !1)) : E.key === "Enter" && i && (E.preventDefault(), d.length > 0 && o?.open(d[0].id), s("search", !1));
    }
  }), [i, s]);
  ke(p);
  const f = S([Nt.AppButton], "SearchMenu", "AppButton"), g = [zt.SearchMenuContainer];
  return i && g.push(zt.Active), /* @__PURE__ */ a("div", { className: S(g), children: /* @__PURE__ */ m("div", { className: S([zt.SearchMenu], "Taskbar", "Menu", "Search"), children: [
    /* @__PURE__ */ a("div", { className: S([Nt.AppList], "SearchMenu", "AppList"), children: d.map(
      ({ name: E, id: w, iconUrl: A }) => /* @__PURE__ */ m(
        "button",
        {
          className: f,
          tabIndex: u,
          onClick: () => {
            s("search", !1), o?.open(w);
          },
          children: [
            /* @__PURE__ */ a(Dt, { src: A ?? "" }),
            /* @__PURE__ */ a("p", { children: E })
          ]
        },
        w
      )
    ) }),
    /* @__PURE__ */ a(
      "input",
      {
        ref: e,
        className: S([zt.Input], "SearchMenu", "Input"),
        "aria-label": "Search query",
        tabIndex: u,
        value: r,
        onChange: h,
        spellCheck: !1,
        placeholder: "Search..."
      }
    )
  ] }) });
}
function Pn() {
  const { toggleMenu: r } = Bt();
  return /* @__PURE__ */ a("div", { className: Lr.SearchContainer, children: /* @__PURE__ */ m(ft, { onOutsideClick: () => {
    r("search", !1);
  }, children: [
    /* @__PURE__ */ a(
      "button",
      {
        className: S([Nt.MenuButton], "Taskbar", "SearchIcon"),
        title: "Search",
        tabIndex: 0,
        onClick: () => {
          r("search");
        },
        children: /* @__PURE__ */ a(F, { icon: ss })
      }
    ),
    /* @__PURE__ */ a(zr, {})
  ] }) });
}
const Vr = "_AppIconsContainer_cauip_1", Hr = "_AppIcons_cauip_1", Ze = {
  AppIconsContainer: Vr,
  AppIcons: Hr
};
function Ct() {
  return /* @__PURE__ */ a("div", { className: S([W.Divider], "Actions", "Divider") });
}
function Kr({ label: r, icon: t, children: e, showOnHover: n = !0 }) {
  const [s, i] = x(!1), o = [W.Dropdown];
  return s && o.push(W.Active), /* @__PURE__ */ a(ft, { onOutsideClick: () => {
    n || i(!1);
  }, children: /* @__PURE__ */ m(
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
        /* @__PURE__ */ m("span", { className: S([W.Label], "Actions", "Label"), children: [
          t && /* @__PURE__ */ a("div", { className: W.Icon, children: /* @__PURE__ */ a(F, { icon: t }) }),
          /* @__PURE__ */ a("p", { children: r })
        ] }),
        /* @__PURE__ */ a("div", { className: W.DropdownArrow, children: /* @__PURE__ */ a(F, { icon: is }) }),
        /* @__PURE__ */ a("div", { className: S([W.DropdownContent], "Actions", "Content"), children: e })
      ]
    },
    r
  ) });
}
function Je({ actionId: r, options: t, initialIndex: e = 0, onTrigger: n }) {
  const [s, i] = x(e);
  return /* @__PURE__ */ a("div", { className: S([], "Actions", "Radio"), children: t.map(
    ({ label: o, shortcut: c }, u) => /* @__PURE__ */ m("button", { className: W.Button, tabIndex: 0, onClick: (l) => {
      i(u), n?.(l, u);
    }, children: [
      /* @__PURE__ */ m("span", { className: S([W.Label], "Actions", "Label"), children: [
        /* @__PURE__ */ a("div", { className: W.Icon, children: s === u ? /* @__PURE__ */ a(F, { icon: rs }) : /* @__PURE__ */ a(F, { icon: Es }) }),
        /* @__PURE__ */ a("p", { children: o })
      ] }),
      c && /* @__PURE__ */ a("p", { className: W.Shortcut, children: qt(c) })
    ] }, o)
  ) }, r);
}
function Ga({ children: r }) {
  return /* @__PURE__ */ a("p", { className: S([W.TextDisplay], "Actions", "Text"), children: r });
}
function jr({ actionId: r, label: t, shortcut: e, initialValue: n = !1, onTrigger: s }) {
  const [i, o] = x(n);
  return /* @__PURE__ */ m("button", { className: S([W.Button, W.Toggle], "Actions", "Toggle", i ? "Active" : void 0), tabIndex: 0, onClick: (c) => {
    s?.(c, !i), o(!i);
  }, children: [
    /* @__PURE__ */ m("span", { className: S([W.Label], "Actions", "Label"), children: [
      /* @__PURE__ */ a("div", { className: W.Icon, children: i ? /* @__PURE__ */ a(F, { icon: pe }) : /* @__PURE__ */ a(F, { icon: fe }) }),
      /* @__PURE__ */ a("p", { children: t })
    ] }),
    e && /* @__PURE__ */ a("p", { className: W.Shortcut, children: qt(e) })
  ] }, r);
}
const Gr = "_AppIcon_1bu4k_1", Yr = "_Active_1bu4k_17", Xr = "_Hidden_1bu4k_22", ce = {
  AppIcon: Gr,
  Active: Yr,
  Hidden: Xr
}, qr = at(({ app: r, active: t, visible: e }) => {
  const n = Et(), { onContextMenu: s } = kt({
    Actions: (o) => /* @__PURE__ */ a(St, { avoidTaskbar: !1, ...o, children: /* @__PURE__ */ a(G, { label: r.name, icon: r.iconUrl, onTrigger: () => {
      n?.open(r.id);
    } }) })
  });
  if (!n)
    return;
  const i = [ce.AppIcon];
  return t && i.push(ce.Active), e || i.push(ce.Hidden), /* @__PURE__ */ a(
    "button",
    {
      tabIndex: 0,
      className: S(i, "Taskbar", "AppIcon"),
      onClick: () => {
        const o = n.getAppWindowId(r.id);
        !t || o == null ? n.open(r.id) : n.isFocused(o) ? n.setMinimized(o) : n.focus(o);
      },
      onContextMenu: (o) => {
        e && s(o);
      },
      title: r.name,
      children: /* @__PURE__ */ a(Dt, { src: r.iconUrl })
    },
    r.id
  );
});
function Ln({ renderApp: r = qr }) {
  const [t, e] = x([]), n = Rt(), s = An(), i = Ne({ sort: !1 }), o = lt(null), { boxShadow: c, onUpdate: u } = vn({ ref: o, shadow: {
    offset: 20,
    blurRadius: 10,
    spreadRadius: -10,
    color: { a: 25 }
  } });
  return y(() => {
    n?.getSettings(ht.TASKBAR)?.get("pins", (d) => {
      const h = d.split(","), p = [...i].sort((f, g) => {
        const E = h.indexOf(f.id), w = h.indexOf(g.id);
        return E < 0 && w > 0 ? 1 : E > 0 && w < 0 ? -1 : E < 0 && w < 0 ? 0 : E - w;
      }).map((f) => (f.isPinned = h.includes(f.id), f));
      e(p);
    });
  }, [i, n]), /* @__PURE__ */ a("div", { className: S([Ze.AppIconsContainer], "Taskbar", "AppIcons"), "data-allow-context-menu": !0, style: { boxShadow: c }, children: /* @__PURE__ */ a(
    "div",
    {
      className: Ze.AppIcons,
      "data-allow-context-menu": !0,
      onScroll: u,
      ref: o,
      children: t.map((l) => {
        if (s == null) return;
        const d = s.some((p) => p.app?.id === l.id), h = l.isPinned || d;
        return /* @__PURE__ */ a(
          r,
          {
            app: l,
            active: d,
            visible: h
          },
          l.id
        );
      })
    }
  ) });
}
const Zr = "_UtilIcons_yrzqh_1", Jr = {
  UtilIcons: Zr
}, Qr = "_Button_fsy4w_1", to = "_Menu_fsy4w_15", Vt = {
  Button: Qr,
  "Charging-indicator": "_Charging-indicator_fsy4w_5",
  Menu: to
}, eo = "_IndicatorMenuContainer_1diwo_1", no = "_Active_1diwo_9", so = "_IndicatorMenu_1diwo_1", ue = {
  IndicatorMenuContainer: eo,
  Active: no,
  IndicatorMenu: so
};
function te({ active: r, className: t, children: e }) {
  const n = [ue.IndicatorMenuContainer];
  r && n.push(ue.Active), t != null && n.push(t);
  const s = ["Util"];
  return r && s.push("Active"), /* @__PURE__ */ a("div", { className: S(n), children: /* @__PURE__ */ a("div", { className: S([ue.IndicatorMenu], "Taskbar", "Menu", s), children: e }) });
}
function ee() {
  const { activeMenu: r, toggleMenu: t } = Bt(), [e, n] = x(!1);
  y(() => {
    r !== "indicator" && e && n(!1);
  }, [r, e]);
  const s = J((i) => {
    t("indicator", i), n(i);
  }, [t, n]);
  return [e, s];
}
function Bn() {
  const [r, t] = ee(), [e, n] = x(!0), [s, i] = x(100);
  y(() => {
    const c = navigator.getBattery;
    if (!c) return;
    let u;
    return c().then((l) => {
      const d = () => {
        n(l.charging);
      }, h = () => {
        i(l.level * 100);
      };
      d(), h(), l.addEventListener("chargingchange", d), l.addEventListener("levelchange", h), u = () => {
        l.removeEventListener("chargingchange", d), l.removeEventListener("levelchange", h);
      };
    }), () => {
      u?.();
    };
  }, []);
  let o = os;
  return s < 10 ? o = as : s < 35 ? o = ls : s < 65 ? o = cs : s < 90 && (o = us), /* @__PURE__ */ m(ft, { onOutsideClick: () => {
    t(!1);
  }, children: [
    /* @__PURE__ */ m("button", { className: S([Vt.Button], "Taskbar", "Indicator", "Battery"), title: "Battery", tabIndex: 0, onClick: () => {
      t(!r);
    }, children: [
      e ? null : /* @__PURE__ */ a(F, { className: Vt["Charging-indicator"], icon: Gt }),
      /* @__PURE__ */ a(F, { icon: o })
    ] }),
    /* @__PURE__ */ m(te, { active: r, className: Vt.Menu, children: [
      /* @__PURE__ */ m("div", { children: [
        e ? null : /* @__PURE__ */ a(F, { className: Vt["Charging-indicator"], icon: Gt }),
        /* @__PURE__ */ a(F, { icon: o })
      ] }),
      /* @__PURE__ */ m("p", { children: [
        Math.round(s),
        "%"
      ] })
    ] })
  ] });
}
const io = "_Menu_vin43_1", ro = {
  Menu: io
};
function $n() {
  const [r, t] = ee();
  return /* @__PURE__ */ m(ft, { onOutsideClick: () => {
    t(!1);
  }, children: [
    /* @__PURE__ */ a("button", { title: "Network", className: S([], "Taskbar", "Indicator", "Network"), tabIndex: 0, onClick: () => {
      t(!r);
    }, children: /* @__PURE__ */ a(F, { icon: Fe }) }),
    /* @__PURE__ */ m(te, { active: r, className: ro.Menu, children: [
      /* @__PURE__ */ a(F, { icon: Fe }),
      /* @__PURE__ */ a("p", { children: "Connected" })
    ] })
  ] });
}
const oo = "_Menu_vin43_1", ao = {
  Menu: oo
};
function Wn() {
  const [r, t] = ee();
  return /* @__PURE__ */ m(ft, { onOutsideClick: () => {
    t(!1);
  }, children: [
    /* @__PURE__ */ a("button", { title: "Volume", className: S([], "Taskbar", "Indicator", "Volume"), tabIndex: 0, onClick: () => {
      t(!r);
    }, children: /* @__PURE__ */ a(F, { icon: Pe }) }),
    /* @__PURE__ */ m(te, { active: r, className: ao.Menu, children: [
      /* @__PURE__ */ a(F, { icon: Pe }),
      /* @__PURE__ */ a("p", { children: "100%" })
    ] })
  ] });
}
const lo = "_Button_l4a7x_1", co = "_Menu_l4a7x_12", uo = "_Time_l4a7x_20", Ht = {
  Button: lo,
  Menu: co,
  Time: uo,
  Date: "_Date_l4a7x_20"
};
function Un() {
  const [r, t] = x(/* @__PURE__ */ new Date()), [e, n] = ee();
  return y(() => {
    const s = setInterval(() => {
      t(/* @__PURE__ */ new Date());
    }, e ? 500 : 3e4);
    return () => {
      clearInterval(s);
    };
  }, [e]), /* @__PURE__ */ m(ft, { onOutsideClick: () => {
    n(!1);
  }, children: [
    /* @__PURE__ */ m("button", { className: S([Ht.Button], "Taskbar", "Indicator", "Calendar"), title: "Date & Time", tabIndex: 0, onClick: () => {
      n(!e);
    }, children: [
      /* @__PURE__ */ a("p", { children: r.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }) }),
      /* @__PURE__ */ a("p", { children: r.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) })
    ] }),
    /* @__PURE__ */ m(te, { active: e, className: Ht.Menu, children: [
      /* @__PURE__ */ a("p", { className: Ht.Time, children: r.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      }) }),
      /* @__PURE__ */ a("p", { className: Ht.Date, children: r.toLocaleString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }) })
    ] })
  ] });
}
const ho = "_DesktopButton_1oktl_1", po = {
  DesktopButton: ho
};
function zn() {
  const r = Et();
  return /* @__PURE__ */ a(
    "button",
    {
      title: "Show Desktop",
      className: S([po.DesktopButton], "Taskbar", "UtilIcon", "Desktop"),
      onClick: () => {
        r?.minimizeAll();
      }
    }
  );
}
const fo = {
  Battery: Bn,
  Network: $n,
  Volume: Wn,
  Calendar: Un,
  DesktopButton: zn
};
function mo({ children: r, ...t }) {
  return /* @__PURE__ */ a("div", { className: S([Jr.UtilIcons], "Taskbar", "UtilIcons"), children: /* @__PURE__ */ a(
    Rn,
    {
      defaults: fo,
      slots: t,
      children: r
    }
  ) });
}
const Vn = Dn(at(mo), {
  /** Component that renders the battery indicator in the taskbar. */
  Battery: Bn,
  /** Component that renders the network indicator in the taskbar. */
  Network: $n,
  /** Component that renders the volume indicator in the taskbar. */
  Volume: Wn,
  /** Component that renders the calendar indicator in the taskbar. */
  Calendar: Un,
  /** Component that renders the desktop button in the taskbar. */
  DesktopButton: zn
}, "Indicators"), go = {
  Home: Fn,
  Search: Pn,
  Apps: Ln,
  Indicators: Vn
};
function wo({ children: r, ...t }) {
  const { taskbarConfig: e, appsConfig: n } = j(), [s, i] = x(null), [o, c] = x(""), u = lt(null), l = Et(), d = De({ groupIndex: pt.GROUPS.TASKBAR, index: 0 }), h = n.getAppByRole(q.APP_ROLES.settings), { onContextMenu: p } = kt({
    Actions: (w) => /* @__PURE__ */ a(St, { avoidTaskbar: !1, ...w, children: h != null && /* @__PURE__ */ a(G, { label: `Open ${h.name}`, icon: h.iconUrl, onTrigger: () => {
      l?.open(h.id);
    } }) })
  }), f = J((w) => {
    s !== w && (i(w), w === "search" && (o !== "" && c(""), u.current && (u.current.focus(), window.scrollTo(0, document.body.scrollHeight))));
  }, [s, i, o, c, u]), g = gt(() => ({
    activeMenu: s,
    setActiveMenu: f,
    toggleMenu: (w, A = s !== w) => {
      w === s && !A ? f(null) : w !== s && A && f(w);
    },
    searchQuery: o,
    setSearchQuery: c,
    searchInputRef: u
  }), [s, f, o, c, u]), E = [];
  return s === "home" && E.push("HomeActive"), /* @__PURE__ */ a(
    "div",
    {
      style: { "--taskbar-height": `${e.height}px`, zIndex: d },
      className: S([Nn.Taskbar], "Taskbar", void 0, E),
      "data-allow-context-menu": !0,
      onContextMenu: (w) => {
        w.target.getAttribute("data-allow-context-menu") && p(w);
      },
      children: /* @__PURE__ */ a(
        _r,
        {
          context: g,
          defaults: go,
          slots: t,
          layout: Eo,
          children: r
        }
      )
    }
  );
}
function Eo({ Home: r, Search: t, Apps: e, Indicators: n }) {
  return /* @__PURE__ */ m(Xt, { children: [
    /* @__PURE__ */ m("div", { className: S([Nn.Menus], "Taskbar", "MenuIcons"), children: [
      /* @__PURE__ */ a(r, {}),
      /* @__PURE__ */ a(t, {})
    ] }),
    /* @__PURE__ */ a(e, {}),
    /* @__PURE__ */ a(n, {})
  ] });
}
const xo = Dn(at(wo), {
  /** Component that renders the home menu in the taskbar. */
  Home: Fn,
  /** Component that renders the search menu in the taskbar. */
  Search: Pn,
  /** Component that renders the pinned and active applications in the taskbar. */
  Apps: Ln,
  /** Component that renders the indicators in the taskbar. */
  Indicators: Vn
}, "Taskbar"), So = "_Minimized_1w3qi_8", vo = "_Maximized_1w3qi_21", Io = "_Header_1w3qi_80", ot = {
  "Window-container": "_Window-container_1w3qi_1",
  Minimized: So,
  Maximized: vo,
  "Window-inner": "_Window-inner_1w3qi_27",
  Header: Io,
  "Window-icon": "_Window-icon_1w3qi_94",
  "Header-button": "_Header-button_1w3qi_121",
  "Exit-button": "_Exit-button_1w3qi_140",
  "Window-content": "_Window-content_1w3qi_148"
}, _o = "_Share_14fca_1", yo = "_Top_14fca_12", Ao = "_Bottom_14fca_12", Co = "_Title_14fca_25", bo = "_FormContainer_14fca_32", ko = "_Form_14fca_32", To = "_Label_14fca_58", No = "_Input_14fca_77", Ro = "_Checkbox_14fca_108", Do = "_Url_14fca_138", Mo = "_Button_14fca_146", X = {
  Share: _o,
  Top: yo,
  Bottom: Ao,
  Title: Co,
  FormContainer: bo,
  Form: ko,
  Label: To,
  Input: No,
  Checkbox: Ro,
  Url: Do,
  Button: Mo
};
function Oo({ name: r, label: t, setOption: e }) {
  const [n, s] = x(""), i = (o) => {
    const c = o.target.value;
    s(c), e(r, c);
  };
  return /* @__PURE__ */ m("label", { className: X.Label, children: [
    /* @__PURE__ */ m("p", { children: [
      t,
      ":"
    ] }),
    /* @__PURE__ */ a("input", { className: X.Input, name: r, type: "text", value: n, onChange: i })
  ] });
}
const Fo = {
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
function Hn({ modal: r, params: t, ...e }) {
  const { appsConfig: n } = j(), [s, i] = x(t?.appId ?? ""), [o, c] = x(t?.fullscreen ?? !1), [u, l] = x(t?.standalone ?? !1), [d, h] = x({}), [p, f] = x(null), { alert: g } = On(), E = lt(null), { boxShadow: w, onUpdate: A } = vn({
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
    f(Ie({
      appId: s !== "" ? s : void 0,
      fullscreen: o,
      standalone: u,
      ...d
    }));
  }, [s, o, u, d]), y(() => {
    A({ target: E.current });
  }, [s]);
  const R = (M) => {
    const I = M.target.value;
    I !== s && i(I);
  }, z = (M) => {
    const I = M.target.checked;
    c(I);
  }, b = (M) => {
    const I = M.target.checked;
    l(I);
  }, k = (M, I) => {
    h((V = {}) => (V = { ...V }, V[M] = I, V));
  };
  return /* @__PURE__ */ m(Mn, { className: X.Share, modal: r, params: {
    ...t,
    title: "Share",
    iconUrl: bt.getModalIconUrl("share")
  }, ...e, children: [
    /* @__PURE__ */ m("div", { className: X.Top, children: [
      /* @__PURE__ */ a("h1", { className: X.Title, children: "Share options" }),
      /* @__PURE__ */ a("div", { className: X.FormContainer, style: { boxShadow: w }, children: /* @__PURE__ */ m(
        "form",
        {
          className: X.Form,
          onScroll: A,
          ref: E,
          children: [
            /* @__PURE__ */ m("label", { className: X.Label, children: [
              /* @__PURE__ */ a("p", { children: "App:" }),
              /* @__PURE__ */ m("select", { className: X.Input, name: "app", value: s, onChange: R, children: [
                /* @__PURE__ */ a("option", { value: "", children: "(None)" }),
                n.apps.map(
                  ({ name: M, id: I }) => /* @__PURE__ */ a("option", { value: I, children: M }, I)
                )
              ] })
            ] }),
            s !== "" ? /* @__PURE__ */ m("label", { className: X.Label, children: [
              /* @__PURE__ */ a("p", { children: "Standalone:" }),
              /* @__PURE__ */ a(
                "input",
                {
                  className: X.Input,
                  name: "standalone",
                  type: "checkbox",
                  checked: u,
                  value: u.toString(),
                  onChange: b
                }
              ),
              /* @__PURE__ */ a("div", { className: X.Checkbox, children: u ? /* @__PURE__ */ a(F, { icon: pe }) : /* @__PURE__ */ a(F, { icon: fe }) })
            ] }) : null,
            s !== "" ? /* @__PURE__ */ m("label", { className: X.Label, children: [
              /* @__PURE__ */ a(
                "input",
                {
                  className: X.Input,
                  name: "fullscreen",
                  type: "checkbox",
                  checked: o,
                  disabled: u,
                  value: o.toString(),
                  onChange: z
                }
              ),
              /* @__PURE__ */ a("p", { children: "Fullscreen:" }),
              /* @__PURE__ */ a("div", { className: X.Checkbox, children: o ? /* @__PURE__ */ a(F, { icon: pe }) : /* @__PURE__ */ a(F, { icon: fe }) })
            ] }) : null,
            Fo[s]?.map(
              ({ label: M, name: I }) => /* @__PURE__ */ a(Oo, { name: I, label: M, setOption: k }, I)
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ m("div", { className: X.Bottom, children: [
      /* @__PURE__ */ a("p", { className: `${X.Url} ${nt.TextLight}`, children: p }),
      /* @__PURE__ */ a(
        Me,
        {
          className: `${X.Button} ${nt.TextBold}`,
          onClick: () => {
            Bs(p, () => {
              g({
                title: "Share",
                iconUrl: bt.getModalIconUrl("share"),
                text: "Copied to clipboard!"
              });
            }, () => {
              g({
                title: "Share",
                iconUrl: bt.getModalIconUrl("share"),
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
function Po({ error: r, app: t, closeWindow: e }) {
  const { appsConfig: n } = j(), { alert: s } = On(), [i, o] = x(!1);
  y(() => {
    i || (o(!0), e?.(), t != null && r != null && s({
      title: `${t.name} has stopped working`,
      text: r instanceof Error ? `${r.name}: ${r.message}` : "Unknown error",
      iconUrl: n.getAppById(t.id)?.iconUrl,
      size: new U(350, 150),
      single: !0
    }));
  }, [i, s, t?.id, t?.name, r, e]);
}
const Lo = at(({ id: r, app: t, size: e, position: n, options: s, active: i, fullscreen: o, minimized: c, toggleMinimized: u, index: l }) => {
  const { systemName: d, windowsConfig: h, appsConfig: p } = j(), f = Et(), g = lt(null), { openWindowedModal: E } = Re(), [w, A] = x(n), [R, z] = x(o ?? !1), [b, k] = Te(), [M, I] = x(t?.name ?? ""), [V, Q] = x(t ? p.getAppById(t.id)?.iconUrl ?? "" : ""), H = De({ groupIndex: pt.GROUPS.WINDOWS, index: l ?? 0 }), { onContextMenu: C, ShortcutsListener: D } = kt({
    Actions: (P) => /* @__PURE__ */ m(St, { ...P, children: [
      /* @__PURE__ */ a(G, { label: "Minimize", icon: Gt, onTrigger: () => {
        u?.();
      } }),
      /* @__PURE__ */ a(G, { label: "Maximize", icon: an, shortcut: ["F11"], onTrigger: () => {
        z(!R);
      } }),
      /* @__PURE__ */ a(G, { label: "Close", icon: ln, shortcut: ["Control", "q"], onTrigger: () => {
        Y?.();
      } }),
      /* @__PURE__ */ a(Ct, {}),
      /* @__PURE__ */ a(G, { label: "Standalone mode", icon: hs, onTrigger: () => {
        t != null && _e(Ie({ appId: t.id, standalone: !0 }), "_self");
      } }),
      /* @__PURE__ */ a(G, { label: "Share", icon: bt.getModalIconUrl("share"), shortcut: ["Alt", "s"], onTrigger: () => {
        t != null && E({
          appId: t.id,
          fullscreen: R,
          size: new U(350, 350),
          Modal: (dt) => /* @__PURE__ */ a(Hn, { ...dt })
        });
      } })
    ] })
  });
  if (y(() => {
    b == null || k == null || (b < h.minScreenSize.x || k < h.minScreenSize.y ? z(!0) : n != null ? (n.x > b && (n.x = 0), n.y > k && (n.y = 0), A(n)) : A(new U(0, 0)));
  }, [n, e, k, b]), y(() => {
    const P = () => {
      mn(`${M} | ${d}`), ve(V);
    };
    return i && !c && P(), window.addEventListener("focus", P), () => {
      window.removeEventListener("focus", P);
    };
  }, [i, c, V, M]), t == null)
    return;
  const Y = J(((P) => {
    P?.preventDefault(), r != null && f?.close(r);
  }), [f, r]), it = J(((P, dt = !1) => {
    if (r === void 0) return;
    if (dt) {
      f?.focus(r);
      return;
    }
    if (P?.defaultPrevented)
      return;
    const rt = P?.target;
    (P == null || rt == null || rt.closest(".Handle") == null || rt.closest("button") == null) && f?.focus(r);
  }), [f, r]), xt = [ot["Window-container"]];
  return R && xt.push(ot.Maximized), c && xt.push(ot.Minimized), /* @__PURE__ */ m("div", { style: { zIndex: H, position: R ? void 0 : "relative" }, children: [
    /* @__PURE__ */ a(D, {}),
    /* @__PURE__ */ a(
      cn,
      {
        axis: "both",
        handle: ".Window-handle",
        defaultPosition: w?.round(),
        position: void 0,
        scale: 1,
        bounds: {
          top: 0,
          bottom: (k ?? 0) - 55,
          left: e ? -e.x + 85 : 85,
          right: (b ?? 0) - 5
        },
        cancel: "button",
        nodeRef: g,
        disabled: R,
        onStart: (P) => {
          it(P);
        },
        grid: [1, 1],
        children: /* @__PURE__ */ a(
          "div",
          {
            className: S(xt, "WindowView"),
            ref: g,
            onClick: it,
            children: /* @__PURE__ */ m(
              "div",
              {
                className: ot["Window-inner"],
                style: {
                  width: R || e == null ? void 0 : e.x,
                  height: R || e == null ? void 0 : e.y
                },
                children: [
                  /* @__PURE__ */ m(
                    "div",
                    {
                      className: S([ot.Header, "Window-handle"], "WindowHeader"),
                      onContextMenu: C,
                      onDoubleClick: (P) => {
                        z(!R), it(P, !0);
                      },
                      children: [
                        /* @__PURE__ */ a(
                          Dt,
                          {
                            className: S([ot["Window-icon"]], "WindowIcon"),
                            src: V
                          }
                        ),
                        /* @__PURE__ */ a("p", { className: S([nt.TextSemibold], "WindowTitle"), children: M }),
                        /* @__PURE__ */ a(
                          "button",
                          {
                            "aria-label": "Minimize",
                            className: ot["Header-button"],
                            tabIndex: 0,
                            id: "minimize-window",
                            onClick: (P) => {
                              u?.(P);
                            },
                            children: /* @__PURE__ */ a(F, { icon: Gt })
                          }
                        ),
                        b != null && k != null && b > h.minScreenSize.x && k > h.minScreenSize.y ? /* @__PURE__ */ a(
                          "button",
                          {
                            "aria-label": "Maximize",
                            className: ot["Header-button"],
                            tabIndex: 0,
                            id: "maximize-window",
                            onClick: (P) => {
                              P.preventDefault(), z(!R), it(P, !0);
                            },
                            children: /* @__PURE__ */ a(F, { icon: R ? ds : xs })
                          }
                        ) : null,
                        /* @__PURE__ */ a(
                          "button",
                          {
                            "aria-label": "Close",
                            className: `${ot["Header-button"]} ${ot["Exit-button"]}`,
                            tabIndex: 0,
                            id: "close-window",
                            onClick: Y,
                            children: /* @__PURE__ */ a(F, { icon: on })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ a("div", { className: S([ot["Window-content"]], "WindowContent"), children: /* @__PURE__ */ a(
                    Ss,
                    {
                      FallbackComponent: (P) => /* @__PURE__ */ a(Po, { app: t, closeWindow: Y, ...P }),
                      onError: (P) => {
                        console.error(P);
                      },
                      children: /* @__PURE__ */ a(
                        t.WindowContent,
                        {
                          ...s,
                          app: t,
                          setTitle: I,
                          setIconUrl: Q,
                          close: Y,
                          focus: it,
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
}), Bo = at(() => {
  const { systemName: r, tagLine: t, skin: e } = j(), n = Rt(), s = An(), i = Et(), [o, c] = x([]);
  return y(() => {
    s != null && c([...s].sort(
      (u, l) => (u.lastInteraction ?? 0) - (l.lastInteraction ?? 0)
    ));
  }, [s]), y(() => {
    const u = () => {
      mn(`${r} | ${t}`), ve(e.systemIcon);
    };
    return (o.length === 0 || o[o.length - 1].minimized) && u(), window.addEventListener("blur", u), () => {
      window.removeEventListener("blur", u);
    };
  }, [o]), y(() => {
    if (i?.startupComplete)
      return;
    let u = [];
    const l = gn(), d = l.app;
    d && u.push(d), delete l.app, n?.getSettings(ht.APPS)?.get("startup", (p) => {
      p !== "" && (u = p.split(",").concat(u), u = Yn(u)), i?.startup(u, l);
    });
  }, [n, i]), /* @__PURE__ */ a("div", { className: S([], "WindowsView"), children: s?.map((u) => {
    const { id: l, app: d, size: h, position: p, options: f, minimized: g, fullscreen: E } = u, w = o.indexOf(u);
    return /* @__PURE__ */ a(
      Lo,
      {
        active: w === o.length - 1,
        id: l,
        app: d,
        size: h,
        index: w,
        position: p,
        options: f,
        minimized: g,
        toggleMinimized: (A) => {
          A?.preventDefault(), A?.stopPropagation(), i?.setMinimized(l, !g);
        },
        fullscreen: E
      },
      l
    );
  }) });
}), $o = "_Desktop_1au3h_1", Wo = "_Wallpaper_1au3h_10", Uo = "_Content_1au3h_20", zo = "_Item_1au3h_38", Ft = {
  Desktop: $o,
  Wallpaper: Wo,
  Content: Uo,
  Item: zo
}, Vo = at(() => {
  const { desktopConfig: r, skin: t, appsConfig: e } = j(), n = Rt(), s = Et(), i = Lt(), [o, c] = x(null), [u, l] = x(!1), [d, h] = x(r.defaultIconSize), [p, f] = x(r.defaultIconDirection), { openWindowedModal: g } = Re(), E = i?.navigate("~/Desktop"), w = e.getAppByRole(q.APP_ROLES.fileExplorer), A = e.getAppByRole(q.APP_ROLES.terminal), R = e.getAppByRole(q.APP_ROLES.settings), { onContextMenu: z, ShortcutsListener: b } = kt({
    Actions: (H) => /* @__PURE__ */ m(St, { ...H, children: [
      /* @__PURE__ */ m(Kr, { label: "View", icon: ps, children: [
        /* @__PURE__ */ a(Je, { initialIndex: d, onTrigger: (C, D, Y) => {
          n?.getSettings(ht.DESKTOP)?.set("icon-size", Y);
        }, options: [
          { label: "Small icons" },
          { label: "Medium icons" },
          { label: "Large icons" }
        ] }),
        /* @__PURE__ */ a(Ct, {}),
        /* @__PURE__ */ a(Je, { initialIndex: p, onTrigger: (C, D, Y) => {
          n?.getSettings(ht.DESKTOP)?.set("icon-direction", Y);
        }, options: [
          { label: "Align vertically" },
          { label: "Align horizontally" }
        ] }),
        /* @__PURE__ */ a(Ct, {}),
        /* @__PURE__ */ a(jr, { label: "Show desktop icons", initialValue: u, onTrigger: () => {
          n?.getSettings(ht.DESKTOP)?.set("show-icons", (!u).toString());
        } })
      ] }),
      /* @__PURE__ */ a(G, { label: "Reload", shortcut: ["Control", "r"], icon: fs, onTrigger: () => {
        Ls();
      } }),
      /* @__PURE__ */ a(
        G,
        {
          label: document.fullscreenElement ? "Exit fullscreen" : "Enter fullscreen",
          shortcut: ["F11"],
          icon: document.fullscreenElement ? ms : an,
          onTrigger: () => {
            s?.isAnyFocused() || (document.fullscreenElement ? document.exitFullscreen().catch((C) => {
              console.error(C);
            }) : document.body.requestFullscreen().catch((C) => {
              console.error(C);
            }));
          }
        }
      ),
      R != null && /* @__PURE__ */ a(G, { label: "Change appearance", icon: gs, onTrigger: () => {
        s?.open(R.id, { tab: 1 });
      } }),
      /* @__PURE__ */ a(Ct, {}),
      w != null && /* @__PURE__ */ a(G, { label: `Open in ${w.name}`, icon: w.iconUrl, onTrigger: () => {
        s?.open(w.id, { path: E?.path });
      } }),
      A != null && /* @__PURE__ */ a(G, { label: `Open in ${A.name}`, icon: A.iconUrl, onTrigger: () => {
        s?.open(A.id, { path: E?.path });
      } }),
      /* @__PURE__ */ a(Ct, {}),
      /* @__PURE__ */ a(G, { label: "Share", icon: bt.getModalIconUrl("share"), onTrigger: () => {
        g({
          size: new U(350, 350),
          Modal: (C) => /* @__PURE__ */ a(Hn, { ...C })
        });
      } })
    ] })
  }), { onContextMenu: k } = kt({
    Actions: (H) => /* @__PURE__ */ m(St, { ...H, children: [
      /* @__PURE__ */ a(G, { label: "Open", onTrigger: (C, D) => {
        s != null && D.open(s);
      } }),
      w != null && /* @__PURE__ */ a(G, { label: `Reveal in ${w.name}`, icon: w.iconUrl, onTrigger: (C, D) => {
        s != null && D.parent?.open(s);
      } }),
      /* @__PURE__ */ a(G, { label: "Delete", icon: Le, onTrigger: (C, D) => {
        D.delete();
      } })
    ] })
  }), { onContextMenu: M } = kt({
    Actions: (H) => /* @__PURE__ */ m(St, { ...H, children: [
      /* @__PURE__ */ a(G, { label: "Open", onTrigger: (C, D) => {
        s != null && D.open(s);
      } }),
      w != null && /* @__PURE__ */ a(G, { label: `Open in ${w.name}`, icon: w.iconUrl, onTrigger: (C, D) => {
        s?.open(w.id, { path: D.path });
      } }),
      A != null && /* @__PURE__ */ a(G, { label: `Open in ${A.name}`, icon: A.iconUrl, onTrigger: (C, D) => {
        s != null && D.parent?.open(s);
      } }),
      /* @__PURE__ */ a(Ct, {}),
      /* @__PURE__ */ a(G, { label: "Delete", icon: Le, onTrigger: (C, D) => {
        D.delete();
      } })
    ] })
  });
  y(() => {
    const H = n?.getSettings(ht.DESKTOP);
    H?.get("wallpaper", c), H?.get("show-icons", (C) => {
      l(C === "true");
    }), H?.get("icon-size", (C) => {
      se(C) && h(parseInt(C));
    }), H?.get("icon-direction", (C) => {
      se(C) && f(parseInt(C));
    });
  }, [n]);
  const I = () => {
    n?.getSettings(ht.DESKTOP)?.set("wallpaper", t.defaultWallpaper);
  }, V = 1 + ((se(d) ? d : r.defaultIconSize) - 1) / 5, Q = S([Ft.Wallpaper], "Desktop", "Wallpaper");
  return /* @__PURE__ */ m(Xt, { children: [
    /* @__PURE__ */ a(b, {}),
    /* @__PURE__ */ m(
      "div",
      {
        className: S([Ft.Desktop], "Desktop"),
        onContextMenu: z,
        children: [
          u && /* @__PURE__ */ a(
            hr,
            {
              directory: E,
              className: Ft.Content,
              style: {
                "--scale": `${V}rem`,
                "--direction": p == 1 ? "row" : "column"
              },
              fileClassName: Ft.Item,
              folderClassName: Ft.Item,
              onOpenFile: (H, C) => {
                H.preventDefault();
                const D = {};
                C.name === "Info.md" && (D.size = new U(575, 675)), C.extension === "md" && (D.mode = "view"), s?.openFile(C, D);
              },
              onOpenFolder: (H, C) => {
                w != null && s?.open(w.id, {
                  path: C.linkedPath ?? C.path
                });
              },
              onContextMenuFile: k,
              onContextMenuFolder: M
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
}), Ho = "_ModalView_tyrlb_1", Ko = {
  ModalView: Ho
}, jo = at(({ modal: r }) => {
  if (y(() => {
    const n = (s) => {
      s.key === "Escape" && r?.close();
    };
    return document.addEventListener("keydown", n), () => {
      document.removeEventListener("keydown", n);
    };
  }, [r]), r?.element == null) return;
  const t = r.element, e = () => /* @__PURE__ */ a(
    "div",
    {
      className: S([Ko.ModalView], "ModalView"),
      style: { "--position-x": r.position.x, "--position-y": r.position.y },
      children: /* @__PURE__ */ a(t, { modal: r, ...r.props })
    }
  );
  return r.dismissible ? /* @__PURE__ */ a(ft, { onOutsideClick: () => {
    r.close();
  }, children: /* @__PURE__ */ a(e, {}) }) : /* @__PURE__ */ a(e, {});
}), Go = "_ModalsView_1t8jt_1", Yo = {
  ModalsView: Go
}, Kn = at(() => {
  const r = lt(null), t = fi(), e = Zt(), [n, s] = x([]);
  return y(() => {
    t != null && s([...t].sort(
      (i, o) => (i.lastInteraction ?? 0) - (o.lastInteraction ?? 0)
    ));
  }, [t]), y(() => {
    e != null && (e.containerRef = r);
  }, [e, r]), /* @__PURE__ */ a("div", { ref: r, className: S([Yo.ModalsView], "ModalsView"), children: n.map(
    (i) => /* @__PURE__ */ a(jo, { modal: i }, i.id)
  ) });
});
function Xo() {
  return /* @__PURE__ */ m(Xt, { children: [
    /* @__PURE__ */ a(xo, {}),
    /* @__PURE__ */ a(Bo, {}),
    /* @__PURE__ */ a(Kn, {}),
    /* @__PURE__ */ a(Vo, {})
  ] });
}
const qo = "_StandaloneView_mfmlq_1", Zo = "_StandaloneWindow_mfmlq_10", Qe = {
  StandaloneView: qo,
  StandaloneWindow: Zo
}, Jo = "_Header_6mqb7_1", Qo = "_Logo_6mqb7_10", ta = "_ExitButton_6mqb7_51", de = {
  Header: Jo,
  Logo: Qo,
  ExitButton: ta
};
function ea({ exit: r }) {
  const { systemName: t, skin: e } = j();
  return /* @__PURE__ */ m("header", { className: de.Header, children: [
    /* @__PURE__ */ m("a", { className: de.Logo, href: "/", tabIndex: 0, children: [
      /* @__PURE__ */ a(Pt, { src: e.systemIcon }),
      /* @__PURE__ */ a("h1", { children: t })
    ] }),
    /* @__PURE__ */ a(Me, { className: de.ExitButton, onClick: r, icon: ln, children: "Exit" })
  ] });
}
function na({ app: r }) {
  const { systemName: t } = j(), [e, n] = x(r.name), [s, i] = x(r.iconUrl ?? "");
  y(() => {
    ve(s);
  }, [s, e]);
  const o = gn(), c = J(() => {
    const u = Ie({ appId: r.id });
    _e(u, "_self");
  }, [r.id]);
  return /* @__PURE__ */ m("div", { className: Qe.StandaloneView, children: [
    /* @__PURE__ */ a(Kn, {}),
    /* @__PURE__ */ a(ea, { exit: c }),
    /* @__PURE__ */ a("div", { className: Qe.StandaloneWindow, children: /* @__PURE__ */ a(
      r.WindowContent,
      {
        app: r,
        setTitle: n,
        setIconUrl: i,
        active: !0,
        standalone: !0,
        close: () => {
          c();
        },
        ...o
      }
    ) })
  ] });
}
const sa = "_NoRoute_1rria_1", ia = "_Title_1rria_11", ra = "_Link_1rria_16", he = {
  NoRoute: sa,
  Title: ia,
  Link: ra
};
function oa() {
  return /* @__PURE__ */ m("span", { className: he.NoRoute, children: [
    /* @__PURE__ */ a("p", { className: `${he.Title} ${nt.TextSemibold}`, children: "404: Not Found" }),
    /* @__PURE__ */ a(Me, { className: he.Link, icon: ws, href: "/", target: "_self", children: "Home" })
  ] });
}
function Ya({ path: r = "/", homePage: t = /* @__PURE__ */ a(Xo, {}), fallbackPage: e = /* @__PURE__ */ a(oa, {}), children: n }) {
  const { appsConfig: s } = j();
  return /* @__PURE__ */ a(_s, { children: /* @__PURE__ */ m(ys, { children: [
    /* @__PURE__ */ m(Wt, { path: r, children: [
      /* @__PURE__ */ a(Wt, { index: !0, element: t }),
      s.apps.map(
        (i) => /* @__PURE__ */ a(Wt, { path: i.id, element: /* @__PURE__ */ a(na, { app: i }) }, i.id)
      ),
      /* @__PURE__ */ a(Wt, { path: "*", element: e })
    ] }),
    n
  ] }) });
}
export {
  ba as ANSI_ASCII_LOGO,
  Ca as ANSI_LOGO_COLOR,
  ka as APP_CATEGORIES,
  Aa as ASCII_LOGO,
  pn as AUDIO_EXTENSIONS,
  St as Actions,
  ie as App,
  q as AppsConfig,
  Xs as ArithmeticParser,
  Me as Button,
  va as CODE_EXTENSIONS,
  G as ClickAction,
  _a as Command,
  Xo as DefaultRoute,
  Vo as Desktop,
  Rs as DesktopConfig,
  Pi as DialogBox,
  hr as DirectoryList,
  Ct as Divider,
  Kr as DropdownAction,
  Va as DropdownButton,
  L as EXIT_CODE,
  Ae as ExecutableResolver,
  st as FILE_SCHEMES,
  Zs as FileInputStream,
  Js as FileOutputStream,
  we as HOSTNAME,
  Ka as HeaderMenu,
  qs as HistoryFlags,
  hn as IMAGE_EXTENSIONS,
  Dt as Image,
  Ee as ImagePreview,
  Ye as Interactable,
  ya as MAX_WIDTH,
  Ia as MEDIA_EXTENSIONS,
  Ds as MiscConfig,
  En as Modal,
  Se as ModalsConfig,
  bt as ModalsManager,
  Kn as ModalsView,
  oa as NoRoute,
  ft as OutsideClickListener,
  Ha as ProgressBar,
  Fa as ProzillaOS,
  Je as RadioAction,
  Ya as Router,
  ht as Settings,
  mt as SettingsManager,
  Tn as SettingsManagerContext,
  Hn as Share,
  K as Shell,
  Ta as ShellAST,
  $ as ShellEnvironment,
  Ce as ShellInterpreter,
  Ut as ShellParser,
  Ke as Slot,
  na as StandaloneRoute,
  et as Storage,
  Na as StorageManager,
  O as Stream,
  ni as SystemManager,
  Sn as SystemManagerContext,
  xo as Taskbar,
  Ms as TaskbarConfig,
  _r as TaskbarSlotsProvider,
  Ga as TextDisplay,
  me as TimeManager,
  jr as ToggleAction,
  Os as TrackingConfig,
  Qs as TrackingManager,
  Cn as TrackingManagerContext,
  ge as USERNAME,
  fn as VIDEO_EXTENSIONS,
  Za as Vector2,
  It as VirtualBase,
  Vs as VirtualDriveConfig,
  jt as VirtualDriveStorage,
  Z as VirtualFile,
  $s as VirtualFileLink,
  Tt as VirtualFolder,
  Ws as VirtualFolderLink,
  ye as VirtualRoot,
  xn as VirtualRootContext,
  Ue as WELCOME_MESSAGE,
  ja as WebView,
  Lo as WindowView,
  Mn as WindowedModal,
  Fs as WindowsConfig,
  ti as WindowsManager,
  _n as WindowsManagerContext,
  Bo as WindowsView,
  ei as ZIndexGroup,
  pt as ZIndexManager,
  Dn as attachSlots,
  Ps as closeViewport,
  Bs as copyToClipboard,
  bi as createSlots,
  We as downloadUrl,
  qt as formatShortcut,
  Ie as generateUrl,
  gn as getViewportParams,
  wn as isEmpty,
  Ns as loadApp,
  kn as modalsManagerContext,
  _e as openUrl,
  Ls as reloadViewport,
  ve as setViewportIcon,
  mn as setViewportTitle,
  On as useAlert,
  Pa as useAppFolder,
  $a as useBoolSetting,
  S as useClassNames,
  kt as useContextMenu,
  Oa as useFontMetrics,
  Da as useHistory,
  Ne as useInstalledApps,
  Wa as useIntSetting,
  ke as useKeyboardListener,
  ai as useLazyRef,
  Ba as useListSetting,
  Li as useManualContextMenu,
  Zt as useModalsManager,
  Ma as useMouseListener,
  ri as useScreenBounds,
  Te as useScreenDimensions,
  vn as useScrollWithShadow,
  Qt as useSetting,
  Rt as useSettingsManager,
  Ua as useShell,
  si as useShortcuts,
  wt as useSingleton,
  be as useSkin,
  za as useSkinOverrides,
  oi as useStaticClassName,
  Ra as useStorage,
  La as useStringSetting,
  j as useSystemManager,
  Bt as useTaskbarContext,
  hi as useTrackingManager,
  Lt as useVirtualRoot,
  Re as useWindowedModal,
  Et as useWindowsManager,
  De as useZIndex,
  nt as utilStyles
};
//# sourceMappingURL=main.js.map
