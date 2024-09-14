import { useState, useEffect } from 'react';

const DrumMachine = (props) => {
    const drumPads = props.drumPads;
    const [displayText, setDisplayText] = useState("test");

    const playAudio = (audio) => {// function for drum pad onClick attribute
        document.getElementById(audio).pause();
        document.getElementById(audio).currentTime = 0;
        document.getElementById(audio).play();
    };

    const changeDisplayText = (text) => {//function to change text in display element
        setDisplayText(text);
    };

    const handleKeyInput = (event) => {
        switch(event.key) {
            case "q":
            case "w":
            case "e":
            case "a":
            case "s":
            case "d":
            case "z":
            case "x":
            case "c":
                document.getElementById(event.key.toUpperCase()).click();
                break;
            default:
                break;
        }
    };
    
    useEffect(() => {
        document.addEventListener("keydown", handleKeyInput);

        return () => {
            document.removeEventListener("keydown", handleKeyInput);
        };
    });

    return (
        <div id="drum-machine">
            <div id="display">{displayText}</div>
            <div id="pad-grid">
            {
                drumPads.map(key => {
                    return (
                        <button onClick={() => {
                            playAudio(key.letter);
                            changeDisplayText(key.name);
                        }} className="drum-pad" id={key.name}>
                            <audio src={key.link} className="clip" id={key.letter} />
                            {key.letter}
                        </button>
                    )
                }) //render each button inside buttons array in object
            }
            </div>
        </div>
    );
}

export default DrumMachine;