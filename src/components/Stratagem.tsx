import { useCallback, useState, useEffect } from "react";
import { Direction, KeyStatus, StratagemCode } from "../constants";
import { ArrowKey } from "./ArrowKey";
import { KeyboardEvent } from "react";

type StratagemProps = {
    stratagem: keyof typeof StratagemCode;
};

const parsedDirectionFromKey = (keyPressed: string) => {
    if (keyPressed === "w" || keyPressed === "ArrowUp") {
        return Direction.Up;
    }
    if (keyPressed === "a" || keyPressed === "ArrowLeft") {
        return Direction.Left;
    }
    if (keyPressed === "s" || keyPressed === "ArrowDown") {
        return Direction.Down;
    }
    if (keyPressed === "d" || keyPressed === "ArrowRight") {
        return Direction.Right;
    }
};

const createStratagemCodePiano = (stratagemCode: Direction[]) => {
    return stratagemCode.map((direction) => {
        return {
            direction,
            status: KeyStatus.notPressed,
        };
    });
};

export const Stratagem = ({ stratagem }: StratagemProps) => {
    const stratagemCode = StratagemCode[stratagem];
    const [keyPresses, setKeyPresses] = useState(0);
    const [stratagemCodePiano, setStratagemCodePiano] = useState(
        createStratagemCodePiano(stratagemCode)
    );

    console.log(stratagemCodePiano);

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            const keyPressed = event.key.toLowerCase();
            const directionPressed = parsedDirectionFromKey(keyPressed);
            console.log(keyPressed);
            if (keyPressed === "enter") {
                setKeyPresses(0);
                setStratagemCodePiano(createStratagemCodePiano(stratagemCode));
            } else {
                if (stratagemCode[keyPresses] === directionPressed) {
                    console.log("OK");
                    stratagemCodePiano[keyPresses].status = KeyStatus.ok;
                } else {
                    console.log("Error");
                    stratagemCodePiano[keyPresses].status = KeyStatus.error;
                }
                setKeyPresses((keyPresses) => keyPresses + 1);
            }
        },
        [keyPresses, stratagemCode, stratagemCodePiano]
    );

    useEffect(() => {
        // @ts-expect-error weird typing problem, don't want to deal with it rn.
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            // @ts-expect-error weird typing problem, don't want to deal with it rn.
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <>
            <h3>{stratagem.toUpperCase()}</h3>
            <div onKeyDown={handleKeyPress} key={keyPresses}>
                {stratagemCodePiano.map((item, index) => (
                    <ArrowKey
                        key={index}
                        direction={item.direction}
                        status={item.status}
                    />
                ))}
            </div>
        </>
    );
};
