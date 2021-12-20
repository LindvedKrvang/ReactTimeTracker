import React from "react";

const TIME_CONST: number = 60;
const NUMBER_OF_FRAMES: number = 25;
const MILLISECONDS_PR_FRAME: number = 1000 / NUMBER_OF_FRAMES;
const MS_PR_SECOND: number = 1000;
const MS_PR_MINUTE: number = MS_PR_SECOND * TIME_CONST;
const MS_PR_HOUR: number = MS_PR_MINUTE * TIME_CONST;

interface Props {
    timeInMs: number | undefined
}

export const FormatTime: React.FC<Props> = (props: Props) => {
    if (props.timeInMs === undefined)
    {
        return (
            <>00:00:00</>
        );
    }

    return (
        <>{formatTime(props.timeInMs)}</>
    )
}

function formatTime(timeInMs: number): string {
    const frames: number = Math.floor(timeInMs / MILLISECONDS_PR_FRAME) % NUMBER_OF_FRAMES;
    const seconds: number = Math.floor(timeInMs / MS_PR_SECOND) % TIME_CONST;
    const minutes: number = Math.floor(timeInMs / MS_PR_MINUTE) % TIME_CONST;
    const hours: number = Math.floor(timeInMs / MS_PR_HOUR) % TIME_CONST;

    return `${formatLessThanTen(hours)}:${formatLessThanTen(minutes)}:${formatLessThanTen(seconds)}.${formatLessThanTen(frames)}`;
}

function formatLessThanTen(value: number): string {
    return value < 10 ? `0${value}` : value + '';
}