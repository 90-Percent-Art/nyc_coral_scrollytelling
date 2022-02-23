import Header from "./Header";
import Footer from "./Footer";
import ScrollManager from "./ScrollManager";
import steps from "./steps"; // the data for each step in the scrolly story.
import "./App.css";

const App = () => {

    return (
      <div className="main">
        <Header />
        <ScrollManager steps = {steps}/>
        <Footer />
      </div>
    );
}

export default App;
