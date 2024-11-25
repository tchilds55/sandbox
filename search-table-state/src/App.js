import "./styles/global.css";
import { Header } from "./components/Layout/Header/Header";
import { Main } from "./components/Layout/Main/Main";

// Adding documentation here
// This is an app to create a table with search functionality
function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
