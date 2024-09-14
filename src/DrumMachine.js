const DrumMachine = (props) => {
    const drumPads = props.drumPads;
    const displayText = "test";

    const playAudio = (audio) => {// function for drum pad onClick attribute
        document.getElementById(audio).play();
    }

    return (
        <div id="drum-machine">
            <div id="display">{displayText}</div>
            {
                drumPads.map(key => {
                    return (
                        <button onClick={() => playAudio(key.letter)} className="drum-pad" id={key.name}>
                            <audio src={key.link} className="clip" id={key.letter} />
                            {key.letter}
                        </button>
                    )
                }) //render each button inside buttons array in object
            }
        </div>
    );
}

export default DrumMachine;