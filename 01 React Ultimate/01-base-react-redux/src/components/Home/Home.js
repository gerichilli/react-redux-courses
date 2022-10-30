import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import videoHomepage from "../../assets/video-homepage.mp4";

function Home(props) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleRegister() {
    navigate("/register");
  }

  function handleStartQuiz() {
    navigate("/users");
  }

  return (
    <div className="homepage-container">
      <video loop muted autoPlay>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="container">
        <div className="homepage-content">
          <h1>{t("homepage.title")}</h1>
          <p>{t("homepage.description")}</p>
          {!isAuthenticated ? (
            <button className="btn btn-mi-primary" onClick={handleRegister}>
              {t("homepage.ctaButton.register")}
            </button>
          ) : (
            <button className="btn btn-mi-primary" onClick={handleStartQuiz}>
              {t("homepage.ctaButton.users")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
