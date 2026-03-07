import { redirect } from "next/navigation";

/**
 * 💡 玄関（/）に届いたパケットを 1ビットの淀みもなく /login へ転送（READY）
 */
export default function RootPage() {
  // ① サーバーサイドで 1秒でリダイレクトを射出
  redirect("/login");

  // ② 転送中のダミー表示（物理的には 1秒も見えません）
  return null;
}