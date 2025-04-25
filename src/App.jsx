import Navbar from "./components/Navbar";
import { SmoothScrollHero as Hero } from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
