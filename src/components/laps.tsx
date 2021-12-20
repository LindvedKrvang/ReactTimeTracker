import React from "react";
import {FormatTime} from "./format-time";
import "./laps.scss";

interface Props {
    laps: number[]
}

export const Laps: React.FC<Props> = (props: Props) => {
    return (
        <>
            {props.laps.map((lap, index) =>
                <div className="lap" key={lap}>
                    Lap {index + 1}: <FormatTime timeInMs={getLapValue(props.laps, index)} />
                </div>
            )}
        </>
    );
}

function getLapValue(laps: number[], index: number): number {
    if (index === 0) {
        return laps[index];
    }
    return laps[index] - laps[index - 1];
}
