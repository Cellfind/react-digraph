import React from 'react';
import { type IPoint } from './graph-view-props';

export type IRegion = {
  id: string,
  title: string,
  start: IPoint,
  end: IPoint,
  [key: string]: any,
};

type IRegionTopBar = {
  height: number,
  padding: { x?: number, y?: number },
};

type IRegionProps = {
  data: IRegion,
  borderRadius?: number,
  topBar?: IRegionTopBar,
  className?: string,
};

export default React.forwardRef(function Region(props: IRegionProps, ref) {
  const {
    data,
    className,
    borderRadius = 4,
    topBar = { height: 36, padding: { x: 10, y: 24 } },
  } = props;
  const { id, start, end, title = 'Untitled Region' } = data;
  const width = end.x - start.x;
  const height = end.y - start.y;

  const newX = width > 0 ? start.x : end.x;
  const newY = height > 0 ? start.y : end.y;

  return (
    <g className={className} id={id} ref={ref}>
      <rect
        className="region"
        width={Math.abs(width)}
        height={Math.abs(height)}
        x={newX}
        y={newY}
        rx={borderRadius}
        ry={borderRadius}
      ></rect>
      <rect
        className="region-top"
        width={Math.abs(width)}
        height={topBar.height}
        x={newX}
        y={newY}
        rx={borderRadius}
        ry={borderRadius}
      ></rect>
      <text
        className="region-text"
        x={newX + topBar.padding.x}
        y={newY + topBar.padding.y}
      >
        {title}
      </text>
    </g>
  );
});
