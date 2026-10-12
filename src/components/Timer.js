import * as React from "react";

export default function Timer(props) {
  const [timeElapsed, setTimeElapsed] = React.useState("0.00");
  let delayInMilliseconds = Number(props.state.delay / 1000);
  React.useEffect(() => {
    if (!props.state.isRunning) return;
    const timeout = setTimeout(
      () => setTimeElapsed((elapsed) =>
        (Number(elapsed) + delayInMilliseconds).toFixed(2)
      ),
      props.state.delay
    );
    return () => clearTimeout(timeout);
  }, [
    timeElapsed,
    delayInMilliseconds,
    props.state.delay,
    props.state.isRunning
  ]);

  React.useEffect(() => {
    if (props.state.generation === 0) {
      setTimeElapsed("0.00");
    }
  }, [props.state.isRunning, props.state.generation, props.state.timerResetKey]);

  return <div>{timeElapsed}</div>;
}
