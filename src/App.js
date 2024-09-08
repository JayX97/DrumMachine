import './App.css';
import buttonsData from "./buttons.json";

function App() {
  buttonsData.buttons.forEach(key => console.log(key.key));

  return (
    <div className="wrapper">

    </div>
  );
}

export default App;
