import React, {useState}  from "react";

function Player({initialName, symbol, isActivePlayer}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setEditing] = useState(false);

    function handleEditClick(){
        setEditing((editing) => !editing);
    }

    function handleChange(event){
        console.log(event);
        setPlayerName(event.target.value);
    }

    let EditableplayerName = <span className="player-name">{playerName}</span>

    if(isEditing){
       EditableplayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }

    return(
        <>
        <li className={isActivePlayer ? 'active' : undefined}>
            <span className="player">
                {EditableplayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button className="reset-button"  onClick={handleEditClick}>{isEditing ? 'Save': 'Edit'}</button>
        </li>
        </>
    )
}

export default Player