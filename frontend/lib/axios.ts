import Axios from 'axios'

const axios = Axios.create({
    //baseURL: "http://192.168.3.3:8080",
    //baseURL: "http://163.44.121.223:8080",
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true, // 👈 これが「ポケットの合言葉を使う」命令
    xsrfCookieName: "XSRF-TOKEN", // 👈 これが「合言葉の名前」
    xsrfHeaderName: "X-XSRF-TOKEN", // 👈 これが「見せる時のヘッダー名」
});

// エラーが発生した際、スマホの画面に直接 Alert（警告）を射出する
axios.interceptors.response.use(
    response => response,
    error => {
        // 真犯人（ステータスコードやメッセージ）を 1ビットの狂いもなく表示
        alert(
            "【Axios Error Flash】\n" +
            "Status: " + (error.response ? error.response.status : "No Response") + "\n" +
            "Message: " + error.message + "\n" +
            "Target: " + (error.config ? error.config.url : "Unknown")
        );
        return Promise.reject(error);
    }
);

export default axios;
//export default axios;

