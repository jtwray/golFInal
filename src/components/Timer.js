import * as React from "react";

export default function Timer(props) {
  const [seconds, setSeconds] = React.useState("0.00");
  const [timeElapsed, setTimeElapsed] = React.useState("0.00");
  const [timerRunning, setTimerRunning] = React.useState(props.state.isRunning);

  React.useEffect(() => {
    props.state.isRunning &&
      setTimeout(
        () =>
          setTimeElapsed(
            (Number(timeElapsed) + Number(props.state.delay / 1000)).toFixed(2)
          ),
        props.state.delay
      );
  }, [timeElapsed, props.state.isRunning]);

  React.useEffect(() => {
    props.state.generation === 0 ? setTimeElapsed(0) : null;
  }, [props.state.isRunning]);

  return <div>{timeElapsed}</div>;
}
