import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    localStorage.setItem("name", "Irfan");

    const name = localStorage.getItem("name");
    if (name) {
      setUser(name);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
