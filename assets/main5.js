import { BASE_URL as i, fillTemplate as n, resolveUrl as o, removeBaseUrl as c } from "@prozilla-os/shared";
class s {
  baseUrl;
  systemIcon;
  appIcons;
  appNames;
  wallpapers;
  defaultWallpaper;
  fileIcons;
  folderIcons;
  loadStyleSheet;
  defaultTheme;
  static TEMPLATE_KEYS = {
    /** Template key that will be replaced by {@link Skin.baseUrl}. */
    baseUrl: "base"
  };
  /**
   * The default options for this skin.
   */
  static DEFAULTS = {
    baseUrl: i,
    systemIcon: this.assetUrl("/icon.svg"),
    wallpapers: [
      this.assetUrl("/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"),
      this.assetUrl("/assets/wallpapers/abstract-mesh-gradient-orange-red-purple.png"),
      this.assetUrl("/assets/wallpapers/vibrant-wallpaper-purple-yellow.png"),
      this.assetUrl("/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png"),
      this.assetUrl("/assets/wallpapers/colorful-abstract-wallpaper-blue-red-green.png"),
      this.assetUrl("/assets/wallpapers/mesh-gradient-wallpaper-red-purple.png"),
      this.assetUrl("/assets/wallpapers/colorful-mesh-gradient-red-green.png"),
      this.assetUrl("/assets/wallpapers/flame-abstract-wallpaper-orange.png"),
      this.assetUrl("/assets/wallpapers/wave-abstract-wallpaper-teal.png"),
      this.assetUrl("/assets/wallpapers/abstract-wallpaper-gradient-blue-dark.png"),
      this.assetUrl("/assets/wallpapers/abstract-wallpaper-gradient-red.png")
    ],
    defaultWallpaper: this.assetUrl("/assets/wallpapers/vibrant-wallpaper-blue-purple-red.png"),
    fileIcons: {
      generic: this.assetUrl("/assets/apps/file-explorer/icons/file.svg"),
      text: this.assetUrl("/assets/apps/file-explorer/icons/file-text.svg"),
      info: this.assetUrl("/assets/apps/file-explorer/icons/file-info.svg"),
      code: this.assetUrl("/assets/apps/file-explorer/icons/file-code.svg"),
      external: this.assetUrl("/assets/apps/file-explorer/icons/file-external.svg"),
      video: this.assetUrl("/assets/apps/file-explorer/icons/file-video.svg"),
      audio: this.assetUrl("/assets/apps/file-explorer/icons/file-audio.svg")
    },
    folderIcons: {
      generic: this.assetUrl("/assets/apps/file-explorer/icons/folder.svg"),
      images: this.assetUrl("/assets/apps/file-explorer/icons/folder-images.svg"),
      text: this.assetUrl("/assets/apps/file-explorer/icons/folder-text.svg"),
      link: this.assetUrl("/assets/apps/file-explorer/icons/folder-link.svg"),
      video: this.assetUrl("/assets/apps/file-explorer/icons/folder-video.svg"),
      audio: this.assetUrl("/assets/apps/file-explorer/icons/folder-audio.svg")
    }
  };
  constructor(e = {}) {
    const { DEFAULTS: l } = this.constructor;
    this.baseUrl = e.baseUrl ?? l.baseUrl, this.systemIcon = this.resolveAssetUrl(e.systemIcon ?? l.systemIcon);
    const r = e.appIcons ?? l.appIcons;
    r && (this.appIcons = this.resolveAssetUrls(r)), this.appNames = e.appNames ?? l.appNames, this.wallpapers = this.resolveAssetUrls(e.wallpapers ?? l.wallpapers), this.defaultWallpaper = this.resolveAssetUrl(e.defaultWallpaper ?? l.defaultWallpaper), this.fileIcons = this.resolveAssetUrls(e.fileIcons ?? l.fileIcons), this.folderIcons = this.resolveAssetUrls(e.folderIcons ?? l.folderIcons), this.loadStyleSheet = e.loadStyleSheet ?? l.loadStyleSheet, this.defaultTheme = e.defaultTheme ?? l.defaultTheme;
  }
  resolveAssetUrls(e) {
    if (Array.isArray(e))
      return e.map(this.resolveAssetUrl.bind(this));
    const l = {};
    for (const [r, p] of Object.entries(e))
      l[r] = this.resolveAssetUrl(p);
    return l;
  }
  resolveAssetUrl(e) {
    const l = n(e, { [s.TEMPLATE_KEYS.baseUrl]: this.baseUrl }, { join: !1 });
    return o(...l);
  }
  /**
   * Prepends {@link Skin.TEMPLATE_KEYS.baseUrl} to the URL, if it is a relative URL.
   * 
   * This makes the URL automatically adapt to the value of {@link Skin.baseUrl} when it is used as a value of a property in {@link SkinOptions} that specifies the URL to an asset (e.g., {@link SkinOptions.systemIcon}).
   * @param url - The URL of the asset.
   */
  static assetUrl(e) {
    return c(e) === e ? `{${s.TEMPLATE_KEYS.baseUrl}}${e}` : e;
  }
}
class d extends s {
  static DEFAULTS = {
    ...super.DEFAULTS,
    wallpapers: [
      s.assetUrl("/assets/skins/mac/wallpapers/macos-monterey.jpg"),
      s.assetUrl("/assets/skins/mac/wallpapers/macos-big-sur.jpg"),
      s.assetUrl("/assets/skins/mac/wallpapers/macos-sequoia.jpg"),
      s.assetUrl("/assets/skins/mac/wallpapers/macos-sonoma.jpg"),
      s.assetUrl("/assets/skins/mac/wallpapers/macos-ventura.jpg")
    ],
    defaultWallpaper: s.assetUrl("/assets/skins/mac/wallpapers/macos-monterey.jpg"),
    fileIcons: {
      generic: s.assetUrl("/assets/skins/mac/apps/file-explorer/file.svg")
    },
    folderIcons: {
      generic: s.assetUrl("/assets/skins/mac/apps/file-explorer/folder.svg")
    },
    loadStyleSheet: () => {
      import(
        /*'./chunks/macOs-DrzxegJ4.js'*/
        "/assets/macOs.css"
      );
    }
  };
}
const h = new d();
class g extends s {
  static DEFAULTS = {
    ...super.DEFAULTS,
    defaultWallpaper: s.assetUrl("/assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png"),
    fileIcons: {
      generic: s.assetUrl("/assets/skins/minimal/apps/file-explorer/file.svg")
    },
    folderIcons: {
      generic: s.assetUrl("/assets/skins/minimal/apps/file-explorer/folder.svg")
    },
    loadStyleSheet: () => {
      import(
        /*'./chunks/minimal-Be8X8qbA.js'*/
        "/assets/minimal.css"
      );
    }
  };
}
const u = new g();
class f extends s {
  static DEFAULTS = {
    ...super.DEFAULTS,
    wallpapers: [
      s.assetUrl("/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/abstract-mesh-gradient-orange-red-purple.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/vibrant-wallpaper-purple-yellow.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/colorful-abstract-wallpaper-blue-red-green.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/mesh-gradient-wallpaper-red-purple.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/colorful-mesh-gradient-red-green.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/flame-abstract-wallpaper-orange.png"),
      s.assetUrl("/assets/skins/pixel/wallpapers/wave-abstract-wallpaper-teal.png")
    ],
    defaultWallpaper: s.assetUrl("/assets/skins/pixel/wallpapers/vibrant-wallpaper-blue-purple-red.png"),
    fileIcons: {
      generic: s.assetUrl("/assets/skins/pixel/apps/file-explorer/file.png")
    },
    folderIcons: {
      generic: s.assetUrl("/assets/skins/pixel/apps/file-explorer/folder.png")
    },
    loadStyleSheet: () => {
      import(
        /*'./chunks/pixel-C1In9WJY.js'*/
        "/assets/pixel.css"
      );
    }
  };
}
const m = new f();
var t = /* @__PURE__ */ ((a) => (a[a.Dark = 0] = "Dark", a[a.Light = 1] = "Light", a[a.Cherry = 2] = "Cherry", a[a.Mango = 3] = "Mango", a[a.Aqua = 4] = "Aqua", a[a.Grape = 5] = "Grape", a))(t || {});
class U extends s {
  static DEFAULTS = {
    ...super.DEFAULTS,
    systemIcon: s.assetUrl("/assets/skins/windows95/system-icon.png"),
    wallpapers: [
      s.assetUrl("/assets/skins/windows95/wallpapers/default.png"),
      s.assetUrl("/assets/skins/windows95/wallpapers/clouds.png")
    ],
    defaultWallpaper: s.assetUrl("/assets/skins/windows95/wallpapers/default.png"),
    fileIcons: {
      generic: s.assetUrl("/assets/skins/windows95/apps/file-explorer/file.svg")
    },
    folderIcons: {
      generic: s.assetUrl("/assets/skins/windows95/apps/file-explorer/folder.svg")
    },
    defaultTheme: t.Light,
    loadStyleSheet: () => {
      import(
        /*'./chunks/windows95-DpoqVYG-.js'*/
        "/assets/windows95.css"
      );
    }
  };
}
const v = new U();
export {
  d as MacOsSkin,
  g as MinimalSkin,
  f as PixelSkin,
  s as Skin,
  t as Theme,
  U as Windows95Skin,
  h as macOsSkin,
  u as minimalSkin,
  m as pixelSkin,
  v as windows95Skin
};
//# sourceMappingURL=main.js.map
