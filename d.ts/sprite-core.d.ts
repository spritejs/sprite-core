export = spritejs;
export as namespace spritejs;

declare namespace spritejs {
  interface IColor {
    model: string;
    value: Array;
  };
  
  interface ITransformMatrix extends Array {
    [a: 0]: number;
    [b: 1]: number;
    [c: 2]: number;
    [d: 3]: number;
    [tx: 4]: number;
    [ty: 5]: number;      
  };
  
  interface IPoint extends Array {
    [x: 0]: number;
    [y: 1]: number;
  };

  interface ISize extends Array {
    [width: 0]: number;
    [height: 1]: number;
  };
  
  interface IPoint3D extends Array {
    [x: 0]: number;
    [y: 1]: number;
    [z: 2]: number;
  };
  
  interface IEventArguments {
    type: string;
    originalEvent: Object;
    terminated: boolean;
    x?: number;
    y?: number;
    layerX?: number;
    layerY?: number;
    parentX?: number;
    parentY?: number;
  };
  
  interface IBox extends Array {
    [left: 0]: number;
    [top: 1]: number;
    [right: 2]: number;
    [bottom: 3]: number;
  };

  interface IRelativePos extends Array {
    [top: 0]: number;
    [right: 1]: number;
    [bottom: 2]: number;
    [left: 3]: number;
  };
  
  interface IRect extends Array {
    [left: 0]: number;
    [top: 1]: number;
    [width: 2]: number;
    [height: 3]: number;
  };
  
  interface ITransform {
    translate?: IPoint;
    rotate?: number;
    scale?: IPoint;
    skew?: IPoint;
    matrix?: ITransformMatrix;
  };
  
  interface IDecorator {
    (target: any, prop: string, descriptor: PropertyDecorator): PropertyDecorator;
  };
  
  interface IBorder {
    width: number,
    color: string,
    style: string,
  }

  interface ITransition {
    end();
    reverse(): Promise;
    attr(name: string, value: any): Promise;
  }

  interface ITiming {
    duration: number;
    iterations: number;
    easing: string;
    fill: string;
    delay: number;
    endDelay: number;
    direction: string;
  }

  class Color {
    constructor(color: String|IColor) :void
    toString(): string
    get str(): string
  };

  declare namespace math {
    class Matrix {
      constructor(m: ITransformMatrix);
      unit(): Matrix;
      multiply(m: ITransformMatrix): Matrix;
      inverse(): Matrix;
      translate(x: number, y: number): Matrix;
      rotate(deg: number): Matrix;
      skew(x: number, y: number): Matrix;
      scale(x: number, y: number): Matrix;
      transformPoint(x: number, y: number): IPoint;
      transformVector(x: number, y: number): IPoint;
    }

    class Vector {
      constructor(p1: IPoint3D, p2: IPoint3D = [0, 0, 0]);
      get length(): number;
      unit(): Vector;
      dot(v: Vector): number;
      cross(v: Vector): Vector;
    }
  };

  class BaseNode {
    constructor();
    get dataset(): Object;
    data(prop: string, val?: any): any;
    getEventHandlers(type: string): Array;
    on(type: string, handler: Function): BaseNode;
    off(type: string, handler?: Function): BaseNode;
    addEventListener(type: string, handler: Function): BaseNode;
    removeEventListener(type: string, handler?: Function): BaseNode;
    pointCollision(event: IEventArguments): boolean;
    setMouseCapture();
    releaseMouseCapture();
    dispatchEvent(type: string, event: IEventArguments, collisionState: boolean, swallow: boolean): boolean;
    connect(parent: BaseNode, zOrder: number = 0): BaseNode;
    disconnect(parent: BaseNode): BaseNode;
  };

  private class Attr {
    constructor(subject: BaseNode);
    setDefault(attrs: Object, props: Object = {});
    saveObj(key: string, value: any);
    loadObj(key: string): any;
    quietSet(key: string, value: any);
    set(key: string, value: any);
    get(key: string): any;
    get attrs(): Object;
    clearCache(): Attr;
    clearFlow(): Attr;
    merge(attrs: Object): Attr;
    serialize(): string;
    subject(): BaseNode;
    id: string;
    name: string;
    anchor: IPoint;
    display: string;
    x: number;
    y: number;
    pos: IPoint;
    bgcolor: string;
    flex: string;
    order: number;
    position: string;
    alignSelf: string;
    rotate: number;
    scale: IPoint;
    translate: IPoint;
    skew: IPoint;
    transform: string;
    transformOrigin: number;
    transformMatrix: ITransformMatrix;
    border: IBorder;
    borderRadius: number;
    boxSizing: string;
    dashOffset: number;
    display: string;
    padding: IRelativePos;
    margin: IRelativePos;
    zIndex: number;
    offsetRotate: string|number;
    gradients: Object;
    offsetDistance: number;
    filter: Object;
    shadow: Object;
    bgimage: Object;
  };

  class BaseSprite extends BaseNode{
    static Attr: Attr;
    static setAttributeEffects(effects: Object = {});
    static addAttributes(attrs: Object = {});
    static defineAttributes(attrs: Object, effects: Object): Attr
    cachePriority: number;
    get layer(): Layer;
    reflow();
    flow(prop: string, value: any);
    serialize(): string;
    merge(attrs: Object);
    cloneNode(): BaseSprite;
    id: string;
    name: string;
    get hasLayout(): boolean;
    get zIndex(): number;
    getAttribute(name: string): any;
    setAttribute(name: string, value: any): BaseSprite;
    removeAttribute(name: string): BaseSprite;
    attr(name: string): any;
    attr(name: string, value: any): BaseSprite;
    attr(attrs: Object): BaseSprite;
    attr(): Object;
    get attributes(): Attr;
    get isVirtual(): boolean;
    isVisible(): boolean;
    get transform(): ITransformMatrix;
    transition(sec: number, easing: string): ITransition;
    animate(frames: Array, timing: ITiming): Animation;
    connect(parent: Group|Layer, zOrder:number = 0);
    disconnect(parent: Group|Layer);
    get attrSize(): ISize;
    get contentSize(): ISize;
    get clientSize(): ISize;
    get offsetSize(): ISize;
    get outerSize(): ISize;
    get innerSize(): ISize;
    get layoutSize(): ISize;
    getLayerXY(dx: number = 0, dy: number = 0): IPoint;
    get boundingRect(): IRect;
    get originalRect(): IRect;
    get originalRenderRect(): IRect;
    get renderBox(): IBox;
    get renderRect(): IRect;
    get verticles(): Array;
    cache: CanvasRenderingContext2D;
    clearCache();
    remove();
    appendTo(parent: Group|Layer);
    forceUpdate(clearCache: boolean);
    pointToOffset(x: number, y: number): IPoint;
    offsetToPoint(dx: number, dy: number): IPoint;
    pointCollision(event: IEventArguments): boolean;
    OBBCollision(sprite: BaseSprite): boolean;
    relayout();
    draw(t: number, context: CanvasRenderingContext2D);
    render(t: number, context: CanvasRenderingContext2D);
    nodeType = 'basesprite';
  };

  class Batch {
    
  };
  
  class Sprite extends BaseSprite {

  };
  
  class Label extends BaseSprite {

  };

  class Path extends BaseSprite {

  };

  class Layer extends BaseNode {

  };

  class Group extends BaseSprite {

  };


  declare var Effects = {

  };
  
  declare var Easings = {

  };

  function registerNodeType();
  function createNode();
  function createElement();

  class SvgPath {

  };

  declare namespace utils {
    function appendUnit(value: number|string, defaultUnit: string = 'px'): string;
    function attr(target: any, prop: string, descriptor: PropertyDecorator): PropertyDescriptor;
    function boxEqual(box1: IBox, box2: IBox): boolean;
    function boxIntersect(box1: IBox, box2: IBox): boolean;
    function boxToRect(box: IBox): IRect;
    function boxUnion(box1: IBox, box2: IBox): IBox;
    declare var cacheContextPool = {
      get: (context: CanvasRenderingContext2D) => CanvasRenderingContext2D,
      put: (...contexts: CanvasRenderingContext2D) => undefined,
      get size(): number
    };
    function deprecate(...args: string): IDecorator;
    function findColor(context: CanvasRenderingContext2D, sprite: BaseSprite, prop: string);
    function flow(target: any, prop: string, descriptor: PropertyDecorator): PropertyDescriptor;
    function fourValuesShortCut(value: number|Array): Array;
    function notice(msg: string, level: string = 'warn');
    function oneOrTwoValues(value: number|Array): Array;
    function parseColor(color: string|IColor): Color;
    function parseColorString(color: string|IColor): string;
    function praseString(str: string): Array;
    function parseStringFloat(str: string): Array;
    function parseStringInt(str: string): Array;
    function parseStringTransform(str: string): ITransform;
    function parseValue(...parsers: Function): IDecorator;
    function rectToBox(rect: IRect): IBox;
    function rectVertices(rect: IRect): Array;
    function resolveValue(...resolvers: Function): IDecorator;
    function sortOrderedSprites(sprites: Array, reversed: boolean = false);
  };
}