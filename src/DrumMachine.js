import { useState, useEffect } from 'react';

const DrumMachine = (props) => {
    const drumPads = props.drumPads;
    const [displayText, setDisplayText] = useState("");
    const [volume, setVolume] = useState("0.3"); //text for display
    const [power, setPower] = useState(true);
    const [style, setStyle] = useState({ float: "left" });

    const toggleSwitch = () => {
        setPower(!power);
        changeDisplayText("");
        if (style.float === "left") setStyle({ float: "right" });
        else setStyle({ float: "left" });
    };

    const playAudio = (audio) => {// function for drum pad onClick attribute
        const sound = document.getElementById(audio);
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    };

    const changeDisplayText = (text) => {// function to change text in display element
        setDisplayText(text);
    };

    const resetDisplayText = () => {
        setDisplayText("");
    };
    
    //Functions for controls
    const handleKeyInput = (event) => {// callback function for key listener
        document.querySelectorAll("audio").forEach(clip => {
            if (clip.id === event.key.toUpperCase()) {
                const clipPad = document.getElementById(event.key.toUpperCase()).parentNode; //parentNode is the button element wrapping the audio element
                clipPad.click();
                // emulate pressing using CSS class styling
                clipPad.classList.add("active");
                setTimeout(() => {
                    clipPad.classList.remove("active");
                }, 100);
            };
        });
    };

    const changeVolume = (event) => {
        setVolume(event.target.value);
        document.querySelectorAll("audio").forEach(clip => clip.volume = event.target.value); //set volume for all audio elements while playing/paused
        if (power) {
            changeDisplayText("Volume: " + Math.floor(event.target.value * 100));
            setTimeout(resetDisplayText, 1500);
        };
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
                    <p>POWER</p>
                    <div id="switch" onClick={toggleSwitch}><div id="toggle" style={style} /></div>
                </div>
                <div id="volume-slider">
                    <input type="range" id="volume" onChange={changeVolume} value={volume} min="0" max="1" step="0.01" />
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