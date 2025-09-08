// src/pages/Profile/Profile.jsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirection si pas connecté
    }
  }, [token, navigate]);

  if (!user) {
    return (
      <>
        <Header />
        <main className="main bg-dark">
          <p>Chargement du profil...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} showLogout />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back <br />
            {user.firstName} {user.lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
