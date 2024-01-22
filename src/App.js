import { useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState("");

  const [userData, setUserData] = useState([]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const data = await response.json();

      const { name, bio, avatar_url } = data;

      setUserData({
        nome: name,
        bio: bio,
        avatar: avatar_url,
      });

      setUser("");
    } catch (error) {
      console.error("Ocorreu um erro", error);
    }
  }
  console.log(user, "user");

  return (
      <main>
        <div className="container">
          <div className="container-buscar">
            <h1>Buscando usuário no github</h1>

            <form
              className="container-form"
              onSubmit={handleFormSubmit}
            >
              <button 
              type="submit">Buscar</button>

              <input
                className="container-input"
                type="text"
                placeholder="Digite user Name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </form>
          </div>

          <div className="container-perfil">
            <h2>{userData.nome}</h2>
            <img src={userData.avatar} alt="Perfil" />
          </div>
          <div className="container-bio">
            <ul>{userData.bio}</ul>
          </div>
        </div>
      </main>
  );
}
