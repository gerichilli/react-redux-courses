import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import videoHomepage from "../../assets/video-homepage.mp4";

function Home(props) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  console.log(useSelector((state) => state.user.account.access_token));

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
          <h1>There's a better way to ask</h1>
          <p>
            You don't want to make a boring form. And your audience won't answer one. Create a
            typeform instead—and make everyone happy.
          </p>
          {!isAuthenticated ? (
            <button className="btn btn-mi-primary" onClick={handleRegister}>
              Get started - it's free
            </button>
          ) : (
            <button className="btn btn-mi-primary" onClick={handleStartQuiz}>
              Do quiz now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
