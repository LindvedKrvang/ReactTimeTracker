import React from "react";
import './time-tracker.scss';
import {Button, ButtonGroup} from "@mui/material";
import {FormatTime} from "./format-time";
import {Laps} from "./laps";

interface Props {
    deleteCallback: () => void
}

interface State {
    startDate?: Date,
    elapsedTimeInMs: number,
    elapsedTimeBeforeCurrentStart: number,
    isRunning: boolean,
    intervalId?: number,
    laps: number[]
}

export class TimeTracker extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            elapsedTimeInMs: 0,
            elapsedTimeBeforeCurrentStart: 0,
            isRunning: false,
            laps: []
        }
    }

    startTimer(): void {
        const intervalId: number = window.setInterval(() => {
            if (this.state.startDate === undefined) {
                return;
            }
            const now = new Date();
            const timeElapsedInMs = now.getTime() - this.state.startDate.getTime();
            this.setState({
                elapsedTimeInMs: timeElapsedInMs + this.state.elapsedTimeBeforeCurrentStart
            })
        }, 10);

        this.setState({
            startDate: new Date(),
            isRunning: true,
            intervalId: intervalId
        });
    }

    stopTimer(): void {
        if (!this.state.isRunning || this.state.intervalId === undefined) {
            return;
        }
        clearInterval(this.state.intervalId);
        this.setState({
            isRunning: false,
            intervalId: undefined,
            startDate: undefined,
            elapsedTimeBeforeCurrentStart: this.state.elapsedTimeInMs
        })
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    resetTimer(): void {
        this.stopTimer();
        this.setState({
            elapsedTimeInMs: 0,
            elapsedTimeBeforeCurrentStart: 0,
            laps: []
        })
    }

    plusSeconds(secondsToBeAdded: number): void {
        const updatedTime: number = this.state.elapsedTimeBeforeCurrentStart + (secondsToBeAdded * 1000);
        this.setState({
            elapsedTimeBeforeCurrentStart: updatedTime,
            elapsedTimeInMs: updatedTime
        });
    }

    markLap(): void {
        if (!this.state.isRunning) {
            return;
        }
        const laps = this.state.laps;
        laps.push(this.state.elapsedTimeInMs);
        this.setState({
            laps: laps
        })
    }

    render() {
        const running = this.state.isRunning;
        const timeInMs: number = this.state.elapsedTimeInMs;

        return (
            <div className="time-tracker">
                <h1><FormatTime timeInMs={timeInMs}/></h1>
                <ButtonGroup>
                    {running
                        ? <Button variant="contained" color="error" onClick={() => this.stopTimer()}>Stop</Button>
                        : <Button variant="contained" onClick={() => this.startTimer()}>Start</Button>
                    }
                    <Button disabled={!running} variant="contained" color="warning" onClick={() => this.markLap()}>Lap</Button>
                    <Button disabled={timeInMs === 0} variant="contained" color="error" onClick={() => this.resetTimer()}>Reset</Button>
                    <Button variant="contained" color="error" onClick={() => this.props.deleteCallback()}>Delete</Button>
                </ButtonGroup>
                <Laps laps={this.state.laps}/>
                <ButtonGroup className="add-time-button-group">
                    <Button variant="contained" onClick={() => this.plusSeconds(30)}>+ 30 sec</Button>
                    <Button variant="contained" onClick={() => this.plusSeconds(10 * 60)}>+ 10 min</Button>
                    <Button variant="contained" onClick={() => this.plusSeconds(60 * 60)}>+ 1 hour</Button>
                </ButtonGroup>
            </div>
        );
    }
}