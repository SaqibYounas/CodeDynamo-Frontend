import React, { Profiler } from 'react';

export const ProfilerWrapper = ({ id, children }) => {
  const onRenderCallback = (id, phase, actualDuration) => {
    const seconds = (actualDuration / 1000).toFixed(2); // milliseconds to seconds

    const color =
      actualDuration < 100
        ? 'color: green'
        : actualDuration < 500
          ? 'color: orange'
          : 'color: red';

    console.log(
      `%c🕒 ${id} - ${phase.toUpperCase()} took ${seconds}s`,
      `${color}; font-weight: bold;`
    );
  };

  return (
    <Profiler id={id} onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
};
