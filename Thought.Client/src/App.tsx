import "./App.css";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import Routes from "./routes/routes";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
