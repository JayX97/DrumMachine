const DrumMachine = (props) => {
    const drumPads = props.drumPads;
    const displayText = "test";

    return (
        <div id="drum-machine">
            <div id="display">{displayText}</div>
            {
                drumPads.map(key => {
                    return (
                        <button className="drum-pad" id={key.name}>
                            <audio src={key.link} className="clip" id={key.key} />
                            {key.key}
                        </button>
                    )
                }) //render each button inside buttons array in object
            }
        </div>
    );
}

export default DrumMachine;