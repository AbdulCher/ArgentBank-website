import { useEffect } from "react";
import { loginUser } from "../src/services/userService";

function App() {
  useEffect(() => {
    const testLogin = async () => {
      try {
        const data = await loginUser("alice@example.com", "MotDePasse123");
        console.log("Réponse login :", data);
      } catch (err) {
        console.error(err);
      }
    };

    testLogin();
  }, []);

  return (
    <div>
      <h1>Test Login Frontend</h1>
    </div>
  );
}

export default App;
