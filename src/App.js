import "./App.css";
import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const swtichTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp);
      });
    });
  }, []);
  console.warn(users);
  return (
    <div className="App" data-theme={theme}>
      <button onClick={swtichTheme}>
        {" "}
        DarkMode
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <h1>Get API Call </h1>
      <table border="1">
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile</td>
          </tr>
          {users.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
