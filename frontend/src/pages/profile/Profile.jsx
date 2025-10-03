import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../../services/userService";
import { updateProfileSuccess } from "../../store/userSlice";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "../../styles/profile.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || "");
  
  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirection si pas connecté
    }
  }, [token, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(token, { userName });
      dispatch(updateProfileSuccess(response.body)); // on garde Redux à jour
      setIsEditing(false)
    } catch (err) {
      console.error("Erreur update profile:", err);
    }
  };

  const handleCancel = () => {
    setUserName(user?.userName || "");
    setIsEditing(false);
  };
  
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
                  <div className="edit-input">
                    <div>
                      <label htmlFor="username">User name:</label>
                      <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        placeholder={user?.userName}
                        className="input-form-user"
                      />
                    </div>
                    
                    <div>
                      <label>First name:</label>
                      <input
                        type="text"
                        defaultValue={user.firstName}
                        className="input-form"
                      />
                    </div>

                    <div>
                      <label>Last name:</label>
                      <input
                        type="text"
                        defaultValue={user.lastName}
                        className="input-form"
                      />
                    </div>
                  </div>
                  <div className="edit-button-form">
                    <button className="edit-button" type="submit">
                      Save
                    </button>
                    <button className="edit-button" type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
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
        <Footer />
      </main>
      
    </>
  );
}

export default Profile;
