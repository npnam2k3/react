import videoHonePage from "../../assets/homepage.mp4";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHonePage} type="video/mp4" />
      </video>
    </div>
  );
};

export default HomePage;
