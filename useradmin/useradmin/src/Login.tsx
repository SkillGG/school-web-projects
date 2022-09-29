import React, { useEffect, useRef, useState } from "react";

// admin: zaq@WSX
// user: User1234
type User = { id: number; username: string; password: string };

export const Login: React.FunctionComponent<{
  setUID(n: number): void;
}> = ({ setUID }) => {
  const [reg, setReg] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState("");
  const [inf, setInf] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          { id: 0, username: "admin", password: "zaq@WSX" },
          { id: 1, username: "user", password: "User1234" },
        ])
      );
    }
  }, []);

  return (
    <div style={{ margin: "0 auto", width: "fit-content" }}>
      <label htmlFor="un">Username: </label>
      <input
        type="text"
        ref={usernameRef}
        id="un"
        name="un"
        onChange={() => setErr("")}
      />
      <br />
      <label htmlFor="ps">Password: </label>
      <input
        type="password"
        id="ps"
        name="ps"
        ref={passwordRef}
        onChange={() => setErr("")}
      />
      <br />
      <input
        type="button"
        value="Login"
        onClick={() => {
          const users: User[] = JSON.parse(
            localStorage.getItem("users") || "{}"
          );
          if (Array.isArray(users)) {
            const id = users.find(
              (u) => u.username === usernameRef.current?.value
            )?.id;
            if (id === 0) {
              setUID(0);
            } else if (id) {
              setUID(id);
            } else {
              setErr("Zla nazwa uzytkownika lub haslo");
            }
          } else {
            console.log("Couldn't load users!");
          }
        }}
      />
      <input
        type="button"
        value="Rejestruj"
        onClick={() => {
          const users: User[] = JSON.parse(
            localStorage.getItem("users") || "{}"
          );
          if (Array.isArray(users)) {
            users.sort((a, b) => a.id - b.id);
            const id = users[users.length - 1].id;
            const newid = id + 1;
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            if (username && password) {
              if (users.find((u) => u.username === username)) {
                usernameRef.current.value = "";
                passwordRef.current.value = "";
                setErr("Nazwa uzytkownika zajeta!");
                return;
              }
              users.push({ id: newid, username, password });
              localStorage.setItem("users", JSON.stringify(users));
              setInf("Mozesz sie zalogowac!");
              usernameRef.current.value = "";
              passwordRef.current.value = "";
            }
          } else {
            console.log("Couldn't load users!");
          }
        }}
      />
      <p style={{ color: "red" }}>{err}</p>
      <p style={{ color: "green" }}>{inf}</p>
    </div>
  );
};
