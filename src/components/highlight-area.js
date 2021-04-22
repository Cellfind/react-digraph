import React from 'react';

export default React.forwardRef(function HighlightArea(props, ref) {
  const { startPoint, endPoint } = props;
  const width = endPoint.x - startPoint.x;
  const height = endPoint.y - startPoint.y;

  return (
    <rect
      className="highlight-area"
      width={Math.abs(width)}
      height={Math.abs(height)}
      ref={ref}
      x={width > 0 ? startPoint.x : endPoint.x}
      y={height > 0 ? startPoint.y : endPoint.y}
    ></rect>
  );
});
