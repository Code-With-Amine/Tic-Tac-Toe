import Game from "./components/Game";
import Header from "./components/Header";
import "./style.css";
import ScoresProvider from "./provider/ScoresProvider";

function App() {
  return (
    <div className="App">
      <ScoresProvider>
        <Header />
        <Game />
      </ScoresProvider>
    </div>
  );
}

export default App;
