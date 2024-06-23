import { UserConfig } from "vite";
/**
 * Helper function for creating Vite configurations for ProzillaOS apps
 * @param basePath - Path of base directory
 * @param entryPath - Path of library entry
 * @returns Vite configuration
 * @see https://vitejs.dev/config/
 */
export declare const appViteConfig: (basePath: string, entryPath: string) => UserConfig;
