import React from "react";

interface ButtonCounter {
    stuff: string,
    counter: number
}

const Button: React.FC = () => {
    return <button>Click me!</button>;
}

class ButtonList extends React.Component<{}, ButtonCounter> {



    render() {
        return <ul></ul>;
    }
}