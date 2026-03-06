import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 💡 ここに「静的書き出しモード」を 1ビット刻み込む（READY） */
  output: "export",
  
  /* 画像最適化エラー（ABEND）を物理回避する設定（DONE） */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
