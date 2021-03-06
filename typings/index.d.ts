

declare module '@cellfind/react-digraph' {
  export type INode = {
    title: string;
    x?: number | null;
    y?: number | null;
    type?: string;
    subtype?: string | null;
    [key: string]: any;
  };

  export type IPoint = {
    x: number;
    y: number;
  };

  export type IBBox = {
    x: number,
    y: number,
    width: number,
    height: number,
  };

  export type INodeProps = {
    data: INode;
    id: string;
    nodeTypes: any; // TODO: make a nodeTypes interface
    nodeSubtypes: any; // TODO: make a nodeSubtypes interface
    opacity?: number;
    nodeKey: string;
    nodeSize?: number;
    onNodeMouseEnter: (event: any, data: any, hovered: boolean) => void;
    onNodeMouseLeave: (event: any, data: any) => void;
    onNodeMove: (point: IPoint, id: string, shiftKey: boolean) => void;
    onNodeSelected: (data: any, id: string, shiftKey: boolean) => void;
    onNodeUpdate: (point: IPoint, id: string, shiftKey: boolean) => void;
    renderNode?: (
      nodeRef: any,
      data: any,
      id: string,
      selected: boolean,
      hovered: boolean
    ) => any;
    renderNodeText?: (
      data: any,
      id: string | number,
      isSelected: boolean
    ) => any;
    renderNodeHover?: (data: any, id: string | number) => any,
    isSelected: boolean;
    layoutEngine?: any;
    viewWrapperElem: HTMLDivElement;
  };

  export const Node: React.ComponentClass<INodeProps>;

  export type IEdge = {
    source: string;
    target: string;
    type?: string;
    handleText?: string;
    handleTooltipText?: string;
    [key: string]: any;
  };

  export type ITargetPosition = {
    x: number;
    y: number;
  };

  export type IEdgeProps = {
    data: IEdge;
    edgeTypes: any; // TODO: create an edgeTypes interface
    edgeHandleSize?: number;
    nodeSize?: number;
    sourceNode: INode | null;
    targetNode: INode | ITargetPosition;
    isSelected: boolean;
    nodeKey: string;
    viewWrapperElem: HTMLDivElement;
  };

  export type SelectionT = { 
    nodes: Map<string, INode> | null, 
    edges: Map<string, INode> | null 
  };

  export const Edge: React.Component<IEdgeProps>;

  export type IGraphViewProps = {
    allowMultiselect?: boolean;
    backgroundFillId?: string;
    edges: any[];
    edgeArrowSize?: number;
    edgeHandleSize?: number;
    edgeTypes: any;
    gridDotSize?: number;
    gridSize?: number;
    gridSpacing?: number;
    layoutEngineType?: LayoutEngineType;
    maxTitleChars?: number;
    maxZoom?: number;
    minZoom?: number;
    nodeKey: string;
    nodes: any[];
    nodeSize?: number;
    nodeHeight?: number,
    nodeWidth?: number,
    nodeSpacingMultiplier?: number,
    nodeSubtypes: any;
    nodeTypes: any;
    readOnly?: boolean;
    selected?: null | SelectionT;
    showGraphControls?: boolean;
    zoomDelay?: number;
    zoomDur?: number;
    canCreateEdge?: (startNode?: INode, endNode?: INode) => boolean;
    /*
    canDeleteEdge?: (selected: any) => boolean; -> changed to more generic - CanDeleteSelected
    canDeleteNode?: (selected: any) => boolean; -> changed to more generic - CanDeleteSelected
    
    onDeleteEdge: (selectedEdge: IEdge, edges: IEdge[]) => void; -> changed to more generic - onDeleteSelected
    onDeleteNode: (selected: any, nodeId: string, nodes: any[]) => void; -> changed to more generic - onDeleteSelected

    onPasteSelected?: () => void; -> Added variables

    onSelectEdge: (selectedEdge: IEdge) => void; -> changed to more generic - onSelect
    onSelectNode: (node: INode | null, event: any) => void; -> changed to more generic - onSelect
    
    onUpdateNode: (node: INode) => void; -> changed variables/implementation
    onUnhandledKeydown?: (e: React.KeyboardEvent) => void,
    */
    canDeleteSelected?: (selected: SelectionT) => boolean;
    canSwapEdge?: (
      sourceNode: INode,
      hoveredNode: INode | null,
      swapEdge: IEdge
    ) => boolean;
    onBackgroundClick?: (x: number, y: number, event: any) => void;
    onCopySelected?: () => void;
    onCutSelected?: () => void;
    onCreateEdge?: (sourceNode: INode, targetNode: INode) => void;
    onCreateNode?: (x: number, y: number, event: any) => void;
    onDeleteSelected?: (selected: SelectionT) => void;
    onPasteSelected?: (
      selected?: SelectionT | null,
      xyCoords?: IPoint
    ) => void,
    onSelect?: (selected: SelectionT, event?: any) => void;
    onSwapEdge?: (sourceNode: INode, targetNode: INode, edge: IEdge) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onUpdateNode?: (node: INode, updatedNodes?: Map<string, INode> | null) => void;
    onUnhandledKeydown?: (e: React.KeyboardEvent) => void;
    onContextMenuNode?: (e: React.MouseEvent, data: INode) => void,
    onContextMenuEdge?: (e: React.MouseEvent, data: IEdge) => void,
    renderBackground?: (gridSize?: number) => any;
    renderDefs?: () => any;
    renderDropShadowDef?: () => any;
    renderNode?: (
      nodeRef: any,
      data: any,
      id: string,
      selected: boolean,
      hovered: boolean
    ) => any;
    afterRenderEdge?: (
      id: string,
      element: any,
      edge: IEdge,
      edgeContainer: any,
      isEdgeSelected: boolean
    ) => void;
    renderNodeText?: (
      data: any,
      id: string | number,
      isSelected: boolean
    ) => any;
    rotateEdgeHandle?: boolean;
    centerNodeOnMove?: boolean;
    initialBBox?: IBBox;
    renderNodeHover?: (data: any, id: string | number) => any,
  };

  export type IGraphInput = {
    nodes: INode[];
    edges: IEdge[];
  };

  export class BwdlTransformer extends Transformer { }

  export class Transformer {
    /**
     * Converts an input from the specified type to IGraphInput type.
     * @param input
     * @returns IGraphInput
     */
    static transform(input: any): IGraphInput;

    /**
     * Converts a graphInput to the specified transformer type.
     * @param graphInput
     * @returns any
     */
    static revert(graphInput: IGraphInput): any;
  }

  export type LayoutEngineType = 'None' | 'SnapToGrid' | 'VerticalTree' | 'HorizontalTree';

  type IGraphViewState = {
    viewTransform?: IViewTransform,
    hoveredNode: boolean,
    nodesMap: any,
    edgesMap: any,
    nodes: any[],
    edges: any[],
    selectingNode: boolean,
    hoveredNodeData: INode | null,
    edgeEndNode: INode | null,
    draggingEdge: boolean,
    draggedEdge: any,
    componentUpToDate: boolean,
    selectedEdgeObj: any,
    selectedNodeObj: any,
    documentClicked: boolean,
    svgClicked: boolean,
    focused: boolean,
  };

  export interface IGraphView extends React.Component<IGraphViewProps, IGraphViewState> {
    nodeTimeouts: any;
    edgeTimeouts: any;
    renderNodesTimeout: any;
    renderEdgesTimeout: any;
    zoom: any;
    viewWrapper: React.RefObject<HTMLDivElement>;
    graphSvg: React.RefObject<SVGElement>;
    entities: any;
    customGroup: any;
    selectedView: any;
    view: any;
    graphControls: any;
    layoutEngine: any;
    panToNode: (id: string, zoom?: boolean) => void;
    panToEdge: (source: string, target: string, zoom?: boolean) => void;
  }

  export const GraphView: React.ComponentClass<IGraphViewProps>;

  export type INodeMapNode = {
    node: INode;
    originalArrIndex: number;
    incomingEdges: IEdge[];
    outgoingEdges: IEdge[];
    parents: INode[];
    children: INode[];
  };

  type ObjectMap<T> = { [key: string]: T };

  export type NodesMap = ObjectMap<INodeMapNode>;

  export type EdgesMap = ObjectMap<IEdgeMapNode>;

  export interface IEdgeMapNode {
    edge: IEdge;
    originalArrIndex: number;
  }

  export type Element = any;

  export class GraphUtils {
    static getNodesMap(arr: INode[], key: string): NodesMap;

    static getEdgesMap(arr: IEdge[]): EdgesMap;

    static linkNodesAndEdges(nodesMap: NodesMap, edges: IEdge[]): void;

    static removeElementFromDom(id: string): boolean;

    static findParent(element: Element, selector: string, stopAtSelector?: string): Element | null;

    static classNames(...args: any[]): string;

    static yieldingLoop(
      count: number,
      chunksize: number,
      callback: (i: number) => void,
      finished?: () => void
    ): void;

    static hasNodeShallowChanged(prevNode: INode, newNode: INode): boolean;

    static isEqual(prevNode: any, newNode: any): boolean;
  }
}
