import logo from './logo.svg';
import './App.css';
import Footer from './components/FooterComponent/Footer';
import Navbar from './components/NavbarComponent/Navbar';
import Homepage from './components/HomepageComponent/Homepage';

function App() {
  return (
    <>
        <div className="App">
            <Navbar />
            <Homepage />
            <Footer />
        </div>
    </>
  );
}

export default App;
