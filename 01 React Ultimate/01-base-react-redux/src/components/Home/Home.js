import videoHomepage from "../../assets/video-homepage.mp4";
function Home(props) {
  return (
    <div className="homepage-container">
      <video loop muted autoPlay>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="container">
        <div className="homepage-content">
          <h1>There's a better way to ask</h1>
          <p>
            You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make
            everyone happy.
          </p>
          <button className="btn btn-mi-primary">Get started - it's free</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
