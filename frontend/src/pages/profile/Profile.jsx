import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Nouvelles valeurs :", { userName, firstName, lastName });
    // ici tu pourras appeler ton service updateUserProfile puis dispatch Redux
    setIsEditing(false);
  };

  const handleCancel = () => {
    // reset des champs
    setUserName(user?.userName || "");
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setIsEditing(false);
  };

  
  // useEffect(() => {
  //   console.dir(user);
  // }, [user]);

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
          {!isEditing ? (
            <>
              <h1>
                Welcome back <br />
                {user.firstName} {user.lastName}!
              </h1>

              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
                >
                Edit Name
              </button>
            </>
          ) : (
              <div className="edit-form">
                <h2>Edit user info</h2>
                <form onSubmit={handleSave} className="edit-form">
                  <div>
                    <label htmlFor="username">User name</label>
                    <input
                      type="text"
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder={user?.userName}
                    />
                  </div>
                  <div>
                    <label>First name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Last name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <button className="edit-button" type="submit">
                    Save
                  </button>
                  <button
                    className="edit-button"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
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
