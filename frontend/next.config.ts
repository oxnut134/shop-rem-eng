import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 💡 静的書き出しモード： out フォルダを爆誕させる（READY） */
  output: "export",
  
  /* 💡 終端パッチ： /login を /login/index.html として物理配置する（DONE） */
  trailingSlash: true,
  
  /* 画像最適化エラー（ABEND）を物理回避（DONE） */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
