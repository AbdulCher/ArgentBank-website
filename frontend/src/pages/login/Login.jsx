import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/userSlice";
import { loginUser, getUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "../../styles/login.css";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
  localStorage.getItem("rememberMe") === "true"
);

useEffect(() => {
  const savedRememberMe = localStorage.getItem("rememberMe") === "true";
  const savedEmail = localStorage.getItem("email") || "";
  

  setRememberMe(savedRememberMe);
  if (savedRememberMe) {
    setEmail(savedEmail);
    
  }
}, []);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Login -> récupération du token
      const data = await loginUser(email, password);
      const token = data.body.token;

      // 2. Récupération du profil utilisateur avec le token
      const profileData = await getUserProfile(token);

      // 3. Mise à jour du Redux store avec le user et le token
      dispatch(loginSuccess({ user: profileData.body, token }));

      // 4. Gestion du Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", email);

      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
        
      }



      console.log("Connexion réussie :", profileData);

      // 5. Redirection vers la page Profil
      navigate("/profile");
    } catch (err) {
      console.error("Erreur loginUser:", err);
      setError("Identifiants invalides. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Header />
      <main className="login-main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
