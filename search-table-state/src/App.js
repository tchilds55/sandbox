import "./styles/global.css";
import { Header } from "./components/Layout/Header/Header";
import { Main } from "./components/Layout/Main/Main";

// Search table state app
// This app creates a search table of data
function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
