const Chats = ({
  setCurrentChat,
}: {
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const allConversations = localStorage.getItem("conversations");

  return (
    <div
      style={{
        border: "black 1px solid",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
      }}
      className="aside"
    >
      чаты
      <div
        style={{
          padding: "2px",
          outline: "red 1px solid",
          maxWidth: "180px",
          margin: "8px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const a = new FormData(e.target);
            const phone = a.get("conversationPhoneNumber");
            const b = localStorage.getItem("conversations");
            if (b) {
              const storage = JSON.parse(b);
              storage.push(phone);
              localStorage.setItem(
                "conversations",
                JSON.stringify(Array.from(new Set(storage.filter(Boolean)))),
              );
            } else {
              localStorage.setItem("conversations", JSON.stringify([phone]));
            }
          }}
        >
          <label htmlFor="conversationPhoneNumber">
            Номер телефона нового собеседника
          </label>
          <input
            name="conversationPhoneNumber"
            type="tel"
            pattern="+7[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="+79998887777"
          />
          <button type="submit">Создать чат</button>
        </form>
      </div>
      <div
        style={{
          outline: "orange 1px solid",
          padding: "2px",
          maxWidth: "180px",
          margin: "8px",
          gap: "4px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {JSON.parse(allConversations).map((a) => (
          <div className="" key={a}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setCurrentChat(a);
              }}
              title={`Перейти к чату с ${a}`}
            >
              {a}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
