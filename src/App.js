import './App.css';
import DrumMachine from './DrumMachine';
import buttonsData from "./buttons.json";

function App() {
  buttonsData.buttons.forEach(key => console.log(key.letter));

  return (
    <div className="wrapper">
      <DrumMachine drumPads={buttonsData.buttons} />
      <div className="footer">
        <p>by <a id="author-link" href="https://github.com/JayX97" target="_blank">JayX97</a></p>
      </div>
    </div>
  );
}

export default App;
