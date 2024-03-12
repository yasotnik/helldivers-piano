import { Direction, KeyStatus } from "../constants";
import { ArrowKey } from "./ArrowKey";

type StratagemProps = {
    stratagemCode: {
        direction: Direction;
        status: KeyStatus;
    }[];
    name: string;
};

export const Stratagem = ({ stratagemCode, name }: StratagemProps) => {


    return (
        <>
            <h3>{name.toUpperCase()}</h3>
                {stratagemCode.map((item, index) => (
                    <ArrowKey
                        key={index}
                        direction={item.direction}
                        status={item.status}
                    />
                ))}
        </>
    );
};
