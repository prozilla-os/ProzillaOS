// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Layout from "./Layout.vue";
import { Component } from "vue";

export default {
	extends: DefaultTheme,
	Layout: Layout as Component,
} satisfies Theme;
