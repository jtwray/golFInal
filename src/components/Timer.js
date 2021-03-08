import * as React from "react";

export default function Timer(props) {
  const [timeElapsed, setTimeElapsed] = React.useState("0.00");
  let delayInMilliseconds = Number(props.state.delay / 1000);
  React.useEffect(() => {
    props.state.isRunning &&
      setTimeout(
        () =>
          setTimeElapsed(
            (Number(timeElapsed) + delayInMilliseconds).toFixed(2)
          ),
        props.state.delay
      );
  }, [
    timeElapsed,
    delayInMilliseconds,
    props.state.delay,
    props.state.isRunning
  ]);

  React.useEffect(() => {
    if (props.state.generation === 0) {
      setTimeElapsed(0);
    }
  }, [props.state.isRunning, props.state.generation]);

  return <div>{timeElapsed}</div>;
}
