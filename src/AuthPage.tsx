const AuthPage = () => {
  return (
    <div className="">
      <div className="">Надо авторизоваться</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const a = new FormData(e.target);
          const setValueInName = (name: string) =>
            localStorage.setItem(name, a.get(name));
          setValueInName("idInstance");
          setValueInName("apiTokenInstance");
          location.reload();
        }}
      >
        <label htmlFor="idInstance">ID Пользователя</label>
        <input type="text" name="idInstance" />
        <label htmlFor="apiTokenInstance">Токен</label>
        <input type="text" name="apiTokenInstance" />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default AuthPage;
