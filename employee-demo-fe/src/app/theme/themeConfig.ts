import { theme } from "antd";

const config = {
  algorithm: theme.defaultAlgorithm, // 默认主题算法
  token: {
    colorPrimary: "#005eff", // 主色调
    // 其他自定义主题变量
    Button: {
      colorBgContainerDisabled: "rgba(0, 94, 255, 0.1)",
      borderColorDisabled: "rgba(0, 94, 255, 0.1)",
      color: "#000",
    },
  },
};

export default config;
