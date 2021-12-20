import React, {useState} from "react";
import './time-tracker-container.scss';
import {TimeTracker} from "./time-tracker";
import {Button} from "@mui/material";
import {v4 as uuid } from 'uuid';

export const TimeTrackerContainer: React.FC = () => {
    const [timeTrackers, setTimeTrackers] = useState<string[]>([]);
    return (
        <div className="container">
            <Button variant="contained" onClick={() => setTimeTrackers(prevState => [...prevState, uuid()])}>Add timer</Button>
            {timeTrackers.map(id => <TimeTracker key={id} deleteCallback={() => setTimeTrackers(prevState => [...removeTimeTracker(id, prevState)])}/>)}
        </div>
    );
}

function removeTimeTracker(uuidToRemove: string, array: string[]): string[] {
    const indexToRemove = array.indexOf(uuidToRemove);
    array.splice(indexToRemove, 1);
    return array;
}