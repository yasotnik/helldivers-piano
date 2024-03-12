import { useState, useCallback, useEffect } from "react";
import "./App.css";
import { Stratagem } from "./components/Stratagem";
import { AllowedKeys, KeyStatus, StratagemCode } from "./constants";
import { createStratagemCodePiano, parsedDirectionFromKey } from "./utils";
import { Status } from "./components/Status";

function App() {
    const keys = Object.keys(StratagemCode);
    const randIdx = Math.floor(Math.random() * 3);
    const randomStratagemName = keys[randIdx] as keyof typeof StratagemCode;

    const [status, setStatus] = useState("");
    const [score, setScore] = useState(0);
    const [timeStart, setTimeStart] = useState(0);

    const stratagemCode = StratagemCode[randomStratagemName];
    const [keyPresses, setKeyPresses] = useState(0);
    const [stratagemCodePiano, setStratagemCodePiano] = useState(
        createStratagemCodePiano(stratagemCode)
    );

    const resetPiano = useCallback(() => { 
        setKeyPresses(0);
        setStratagemCodePiano(createStratagemCodePiano(stratagemCode));
        setStatus("");
        setScore(0);
        setTimeStart(0);
    }, [stratagemCode])
        
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            const keyPressed = event.key.toLowerCase();
            if (status || AllowedKeys.includes(keyPressed) === false) { 
                return;
            }
            const directionPressed = parsedDirectionFromKey(keyPressed);
            if (keyPressed === "enter") {
                // RESET
                resetPiano();
            } else {
                if (stratagemCodePiano[keyPresses].direction === directionPressed) {
                    if (keyPresses === 0) {
                        setTimeStart(new Date().getTime());
                    }
                    stratagemCodePiano[keyPresses].status = KeyStatus.ok;
                } else {
                    stratagemCodePiano[keyPresses].status = KeyStatus.error;
                    setStatus("error");
                }
                setKeyPresses((keyPresses) => keyPresses + 1);
            }
        },
        [keyPresses, resetPiano, status, stratagemCodePiano]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        if (status === "error") {
            document.removeEventListener("keydown", handleKeyPress);
            setScore(0);
        }
    }, [status, handleKeyPress, keyPresses, stratagemCode.length]);

    useEffect(() => {
        if (keyPresses === stratagemCodePiano.length) {
            setStatus("ok");
            const score = 1000 - (new Date().getTime() - timeStart)
            if (score > 0) {
                setScore(score);
            } else {
                setScore(0);
            }
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, [keyPresses, stratagemCode.length, handleKeyPress, stratagemCodePiano.length, timeStart]);

    return (
        <>  
           <Status status={status} />
            <div className="score">
                Score: {score}
            </div>
            <div className="card">
                <Stratagem stratagemCode={stratagemCodePiano} name={randomStratagemName} />
            </div>
            <div className="reset-container">
                <button onClick={resetPiano}>Reset</button>
            </div>
        </>
    );
}

export default App;
