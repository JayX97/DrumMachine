import { useState, useEffect } from 'react';

const DrumMachine = (props) => {
    const drumPads = props.drumPads;
    const [displayText, setDisplayText] = useState("test");
    const [volume, setVolume] = useState("0.3"); //text for display
    const [power, setPower] = useState(true);
    const [style, setStyle] = useState({ float: "left" });

    const toggleSwitch = () => {
        setPower(!power);
        changeDisplayText("test"); 
        if (style.float === "left") setStyle({ float: "right" });
        else setStyle({ float: "left" });
    };

    const playAudio = (audio) => {// function for drum pad onClick attribute
        document.getElementById(audio).pause();
        document.getElementById(audio).currentTime = 0;
        document.getElementById(audio).play();
    };

    const changeDisplayText = (text) => {//function to change text in display element
        setDisplayText(text);
    };
    
    //Functions for controls
    const handleKeyInput = (event) => {// callback function for key listener
        document.querySelectorAll("audio").forEach(clip => {
            if (clip.id === event.key.toUpperCase()) document.getElementById(event.key.toUpperCase()).click();
        });
    };

    const changeVolume = (event) => {
        setVolume(event.target.value);
        document.querySelectorAll("audio").forEach(clip => clip.volume = event.target.value); //set volume for all audio elements while playing/paused
    };
    
    //Key listener
    useEffect(() => {
        document.addEventListener("keydown", handleKeyInput);

        return () => {
            document.removeEventListener("keydown", handleKeyInput);
        };
    });

    return (
        <div id="drum-machine">
            <div id="machine-interface">
                <div id="display">{displayText}</div>
                <div id="power-switch">
                    <p>Power</p>
                    <div id="switch" onClick={toggleSwitch}><div id="toggle" style={style} /></div>
                </div>
                <div id="volume-slider">
                    <input type="range" id="volume" onChange={changeVolume} value={volume} min="0" max="1" step="0.01" />
                    <p>{Math.floor(volume * 100)}</p>
                </div>
            </div>
            <div id="pad-grid">
            { //render each button inside buttons array in object
                drumPads.map(key => {
                    return (
                        <button onClick={() => {
                            if (power) {
                                playAudio(key.letter);
                                changeDisplayText(key.name);
                            }
                        }} className="drum-pad" id={key.name}>
                            <audio src={key.link} className="clip" id={key.letter} />
                            {key.letter}
                        </button>
                    )
                })
            }
            </div>
        </div>
    );
}

export default DrumMachine;