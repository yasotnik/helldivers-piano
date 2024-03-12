import { Direction, KeyStatus } from "./constants";

export const parsedDirectionFromKey = (keyPressed: string) => {
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

export const createStratagemCodePiano = (stratagemCode: Direction[]) => {
    return stratagemCode.map((direction) => {
        return {
            direction,
            status: KeyStatus.notPressed,
        };
    });
};