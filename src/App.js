import './App.css';
import DrumMachine from './DrumMachine';
import buttonsData from "./buttons.json";

function App() {
  buttonsData.buttons.forEach(key => console.log(key.letter));

  return (
    <div className="wrapper">
      <DrumMachine drumPads={buttonsData.buttons} />
    </div>
  );
}

export default App;
