import { useState } from "react";

const Messages = ({ data, currentChat }) => {
  const apiUrl = localStorage.getItem("apiUrl");
  const idInstance = localStorage.getItem("idInstance");
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  const allConversations = localStorage.getItem("conversations");

  const [message, setMessage] = useState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div className="">
        <div className="">сообщения {currentChat}</div>
        <div className="">содержимое чата</div>
        <div className="">{data?.body.messageData}</div>
      </div>
      <div
        className=""
        style={{
          padding: "10px",
          display: "flex",
          gap: "8px",
          maxHeight: "300px",
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await fetch(
                `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
                {
                  method: "POST",
                  body: {
                    // Считаем что мы в России, +7
                    chatId: `${currentChat.slice(2)}@c.us`,
                    message,
                  },
                },
              );
              setMessage(undefined);
            } catch (error) {}
          }}
          style={{ width: "100%" }}
        >
          <textarea
            placeholder="Message"
            name="message"
            id="messageField"
            rows={1}
            onInput={(e) => {
              e.preventDefault();
              setMessage(e.currentTarget.value);
            }}
            value={message}
            style={{
              display: "block",
              width: "100%",
              resize: "vertical",
              maxHeight: "300px",
            }}
          ></textarea>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
