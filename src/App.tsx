import { useEffect, useState } from "react";
import "./App.css";
import Messages from "./Messages";
import AuthPage from "./AuthPage";
import Chats from "./Chats";

function App() {
  const apiUrl = localStorage.getItem("apiUrl");
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  const allConversations = localStorage.getItem("conversations");
  const [currentChat, setCurrentChat] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    receiptId: number;
    body: {
      timestamp: number;
      idMessage: string;
      messageData: {
        typeMessage: string;
        textMessageData: {
          textMessage: string;
        };
      };
    };
  }>();
  useEffect(() => {
    const controller = new AbortController(); // Для отмены запроса

    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
          {
            signal: controller.signal,
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    // Функция очистки: отменяем запрос при размонтировании или смене userId
    return () => controller.abort();
  }, [currentChat]); // Запрос перезапустится при изменении userId

  return idInstance && apiTokenInstance ? (
    <div className="a" style={{ height: "100%" }}>
      <div
        style={{ border: "black 1px solid", maxWidth: "64px" }}
        className="navigation"
      >
        кнопки
      </div>
      <Chats setCurrentChat={setCurrentChat} />
      <div style={{ border: "black 1px solid" }} className="main">
        {currentChat ? (
          <Messages currentChat={currentChat} data={data} />
        ) : null}
      </div>
    </div>
  ) : (
    <AuthPage />
  );
}

export default App;
