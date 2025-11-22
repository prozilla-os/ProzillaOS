import { Skin, macOsSkin } from '@prozilla-os/skins';

const defaultSkin = new Skin({
  ...macOsSkin,
  appNames: {
    ...macOsSkin.appNames,
  },
  defaultWallpaper: 'assets/wallpapers/abstract-wallpaper-mesh-gradient-cyan.png',
});

export { defaultSkin };
