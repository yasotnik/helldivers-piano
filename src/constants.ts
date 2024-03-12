export enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

export enum KeyStatus {
    ok = "ok",
    error = "error",
    notPressed = "not-pressed",
}

export const StratagemCode = {
    resupply: [Direction.Down, Direction.Down, Direction.Up, Direction.Right],
    eagle500kg: [
        Direction.Up,
        Direction.Right,
        Direction.Down,
        Direction.Down,
        Direction.Down,
    ],
    reinforce: [
        Direction.Up,
        Direction.Down,
        Direction.Right,
        Direction.Left,
        Direction.Up,
    ],
};
