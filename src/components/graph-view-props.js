// @flow
import { type LayoutEngineType } from '../utilities/layout-engine/layout-engine-types';
import { type IEdge } from './edge';
import { type INode } from './node';

export type IPoint = {
  x: number,
  y: number,
};

export type IBBox = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type SelectionT = {
  nodes: Map<string, INode> | null,
  edges: Map<string, IEdge> | null,
};

export type IGraphViewProps = {
  allowMultiselect?: boolean,
  backgroundFillId?: string,
  disableBackspace?: boolean,
  edges: any[],
  edgeArrowSize?: number,
  edgeHandleSize?: number,
  edgeTypes: any,
  gridDotSize?: number,
  gridSize?: number,
  gridSpacing?: number,
  layoutEngineType?: LayoutEngineType,
  maxTitleChars?: number,
  maxZoom?: number,
  minZoom?: number,
  nodeKey: string,
  nodes: any[],
  nodeSize?: number,
  nodeHeight?: number,
  nodeWidth?: number,
  nodeSpacingMultiplier?: number,
  nodeSubtypes: any,
  nodeTypes: any,
  readOnly?: boolean,
  selected?: null | SelectionT,
  showGraphControls?: boolean,
  zoomDelay?: number,
  zoomDur?: number,
  canCreateEdge?: (startNode?: INode, endNode?: INode) => boolean,
  canDeleteSelected?: (selected: SelectionT) => boolean,
  canSwapEdge?: (
    sourceNode: INode,
    hoveredNode: INode | null,
    swapEdge: IEdge
  ) => boolean,
  onBackgroundClick?: (x: number, y: number, event: any) => void,
  onCutSelected?: () => void,
  onCopySelected?: () => void,
  onCreateEdge?: (sourceNode: INode, targetNode: INode) => void,
  onCreateNode?: (x: number, y: number, event: any) => void,
  onContextMenu?: (x: number, y: number, event: any) => void,
  onDeleteSelected?: (selected: SelectionT) => void,
  onPasteSelected?: (selected?: SelectionT | null, xyCoords?: IPoint) => void,
  onSelect?: (selected: SelectionT, event?: any) => void,
  onSwapEdge?: (sourceNode: INode, targetNode: INode, edge: IEdge) => void,
  onUndo?: () => void,
  onRedo?: () => void,
  onUnhandledKeydown?: (e: React.KeyboardEvent) => void,
  onContextMenuNode?: (e: React.MouseEvent, data: INode) => void,
  onContextMenuEdge?: (e: React.MouseEvent, data: IEdge) => void,
  onUpdateNode?: (
    node: INode,
    updatedNodes?: Map<string, INode> | null
  ) => void,
  onArrowClicked?: (selectedEdge: IEdge) => void,
  renderBackground?: (gridSize?: number) => any,
  renderDefs?: () => any,
  renderNode?: (
    nodeRef: any,
    data: any,
    id: string,
    selected: boolean,
    hovered: boolean
  ) => any,
  renderDropShadowDef?: () => any,
  afterRenderEdge?: (
    id: string,
    element: any,
    edge: IEdge,
    edgeContainer: any,
    isEdgeSelected: boolean
  ) => void,
  renderNodeText?: (data: any, id: string | number, isSelected: boolean) => any,
  renderNodeHover?: (data: any, id: string | number) => any,
  rotateEdgeHandle?: boolean,
  centerNodeOnMove?: boolean,
  initialBBox?: IBBox,
};
