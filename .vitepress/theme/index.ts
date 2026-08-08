import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "virtual:group-icons.css";
import "./style.css";

export default {
  extends: DefaultTheme,
} satisfies Theme;
