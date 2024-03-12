import { Direction, KeyStatus } from "../constants";
import arrowDown from "../assets/arrow_down.svg";

type ArrowKeyProps = {
    direction: Direction;
    status?: KeyStatus;
};

export const ArrowKey = ({ direction, status }: ArrowKeyProps) => {
    return (
        <img
            src={arrowDown}
            className={`key ${direction.toString().toLowerCase()} ${
                status ? status : "not-pressed"
            }`}
            alt="key"
        />
    );
};
