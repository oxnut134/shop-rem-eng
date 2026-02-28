FROM node:20-alpine

WORKDIR /app

# 依存関係のインストール（キャッシュ利用のため先にコピー）
COPY package*.json ./
RUN npm install

# ソースコードのコピー
COPY . .

# Next.js 開発サーバーの起動
# -H 0.0.0.0 はコンテナ外からのアクセスを許可するために必須
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
