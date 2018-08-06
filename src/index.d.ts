export = spritejs;
export as namespace spritejs;

declare namespace spritejs {
  interface IColor {
    model: string;
    value: Array<number>;
  }
  
  interface ITransformMatrix extends Array<number> {
    [0]: number;
    [1]: number;
    [2]: number;
    [3]: number;
    [4]: number;
    [5]: number;      
  }
  
  interface IPoint extends Array<number> {
    [0]: number;
    [1]: number;
  }

  interface ISize extends Array<number> {
    [0]: number;
    [1]: number;
  }
  
  interface IPoint3D extends Array<number> {
    [0]: number;
    [1]: number;
    [2]: number;
  }
  
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
  }
  
  interface IBox extends Array<number> {
    [0]: number;
    [1]: number;
    [2]: number;
    [3]: number;
  }

  interface IRelativePos extends Array<number> {
    [0]: number;
    [1]: number;
    [2]: number;
    [3]: number;
  }
  
  interface IRect extends Array<number> {
    [0]: number;
    [1]: number;
    [2]: number;
    [3]: number;
  }
  
  interface ITransform {
    translate?: IPoint;
    rotate?: number;
    scale?: IPoint;
    skew?: IPoint;
    matrix?: ITransformMatrix;
  }
  
  interface IDecorator {
    (target: any, prop: string, descriptor: PropertyDecorator): PropertyDecorator;
  }
  
  interface IBorder {
    width: number,
    color: string,
    style: string,
  }

  interface ITransition {
    end();
    reverse(): Promise<Object>;
    attr(name: string, value: any): Promise<Object>;
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

  interface IPath {
    d: string;
    transform: ITransform;
    trim: boolean;
  }

  class Color {
    constructor(color: String|IColor);
    toString(): string;
    readonly str: string;
  }

  namespace math {
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
      constructor(p1: IPoint3D, p2: IPoint3D);
      readonly length: number;
      unit(): Vector;
      dot(v: Vector): number;
      cross(v: Vector): Vector;
    }
  }

  class BaseNode {
    constructor();
    readonly dataset: Object;
    data(prop: string, val?: any): any;
    getEventHandlers(type: string): Array<Function>;
    on(type: string, handler: Function): BaseNode;
    off(type: string, handler?: Function): BaseNode;
    addEventListener(type: string, handler: Function): BaseNode;
    removeEventListener(type: string, handler?: Function): BaseNode;
    pointCollision(event: IEventArguments): boolean;
    setMouseCapture();
    releaseMouseCapture();
    dispatchEvent(type: string, event: IEventArguments, collisionState: boolean, swallow: boolean): boolean;
    connect(parent: BaseNode, zOrder: number): BaseNode;
    disconnect(parent: BaseNode): BaseNode;
  }

  class Attr {
    constructor(subject: BaseSprite);
    setDefault(attrs: Object, props: Object);
    saveObj(key: string, value: any);
    loadObj(key: string): any;
    quietSet(key: string, value: any);
    set(key: string, value: any);
    get(key: string): any;
    readonly attrs: Object;
    clearCache(): Attr;
    clearFlow(): Attr;
    merge(attrs: Object): Attr;
    serialize(): string;
    subject(): BaseSprite;
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
    padding: IRelativePos;
    margin: IRelativePos;
    zIndex: number;
    offsetRotate: string|number;
    gradients: Object;
    offsetDistance: number;
    filter: Object;
    shadow: Object;
    bgimage: Object;
  }

  class BaseSprite extends BaseNode{
    static Attr;
    static setAttributeEffects(effects: Object);
    static addAttributes(attrs: Object);
    static defineAttributes(attrs: Object, effects: Object): Attr;
    constructor(attr?: Object);
    cachePriority: number;
    readonly layer: Layer;
    reflow();
    flow(prop: string, value: any);
    serialize(): string;
    merge(attrs: Object);
    cloneNode(): BaseSprite;
    id: string;
    name: string;
    readonly hasLayout: boolean;
    readonly zIndex: number;
    getAttribute(name: string): any;
    setAttribute(name: string, value: any): BaseSprite;
    removeAttribute(name: string): BaseSprite;
    attr(name: string): any;
    attr(name: string, value: any): BaseSprite;
    attr(attrs: Object): BaseSprite;
    attr(): Object;
    readonly attributes: Attr;
    readonly isVirtual: boolean;
    isVisible(): boolean;
    readonly transform: ITransformMatrix;
    transition(sec: number, easing: string): ITransition;
    animate(frames: Array<Object>, timing: ITiming): Animation;
    connect(parent: Group|Layer, zOrder:number);
    disconnect(parent: Group|Layer);
    readonly attrSize: ISize;
    readonly contentSize: ISize;
    readonly clientSize: ISize;
    readonly offsetSize: ISize;
    readonly outerSize: ISize;
    readonly innerSize: ISize;
    readonly layoutSize: ISize;
    getLayerXY(dx: number, dy: number): IPoint;
    readonly boundingRect: IRect;
    readonly originalRect: IRect;
    readonly originalRenderRect: IRect;
    readonly renderBox: IBox;
    readonly renderRect: IRect;
    readonly verticles: Array<IPoint>;
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
    nodeType: string;
  }

  class Batch {
    constructor(layer: Layer);
    readonly baseNode: BaseSprite;
    add(...nodes: Array<BaseSprite>);
    remove(...nodes: Array<BaseSprite>);
  }

  class TextureAttr extends Attr {
    constructor(subject: Sprite);
    textures: Array<Object|string>;
    loadTextures(textures: Array<Object|string>);
  }
  
  class Sprite extends BaseSprite {
    static Attr;
    constructor(attr?: Object);
    cloneNode(): Sprite;
    images: Array<ImageBitmap>;
    textures: Array<Object|string>;
    readonly clientSize: ISize;
    pointCollision(event: IEventArguments): boolean;
    cache: CanvasRenderingContext2D;
    render(t: number, context: CanvasRenderingContext2D);
  }

  class LabelSpriteAttr extends Attr {
    constructor(subject: Label);
    text: string;
    font: string;
    lineHeight: number;
    textAlign: string;
    color: string;
    strokeColor: string;
    fillColor: string;
    flexible: boolean;
    lineBreak: string;
    wordBreak: string;
    letterSpacing: number;
    textIndent: number;
    width: number;
    layoutWidth: number;
  }
  
  class Label extends BaseSprite {
    static Attr;
    constructor(attr?: Object);
    text: string;
    readonly textBoxSize: ISize;
    readonly flexibleFont: string;
    readonly contentSize: ISize;
    render(t: number, context: CanvasRenderingContext2D);
  }

  class PathSpriteAttr {
    constructor(subject: Path);
    path: IPath;
    d: string;
    lineWidth: number;
    lineDash: Array<number>;
    lineDashOffset: number;
    lineCap: string;
    lineJoin: string;
    strokeColor: string;
    fillColor: string;
    flexible: boolean;
    bounding: string;
  }

  class Path extends BaseSprite {
    static Attr;
    constructor(attr?: Object);
    path: IPath;
    getPointAtLength(length: number): IPoint;
    getPathLength(): number;
    findPath(offsetX: number, offsetY: number): SvgPath;
    readonly lineWidth: number;
    readonly pathOffset: IPoint;
    readonly pathSize: ISize;
    readonly contentSize: ISize;
    readonly originalRect: IRect;
    pointCollision(event: IEventArguments): boolean;
    render(t: number, context: CanvasRenderingContext2D);
  }

  interface ILayerOptions {
    context: CanvasRenderingContext2D;
    handleEvent: boolean;
    evaluteFPS: boolean;
    renderMode: string;
    autoRender: boolean;
  }

  interface ITimeMark {
    globalTime: number;
    localTime: number;
    entropy: number;
    playbackRate: number;
    globalEntropy: number;
  }

  class Timeline {
    constructor(options: Object, parent?: Timeline);
    readonly parent: Timeline;
    readonly lastTimeMark: ITimeMark;
    markTime(time: Object);
    currentTime: number;
    entropy: number;
    readonly globalEntropy: number;
    readonly globalTime: number;
    fork(options: Object): Timeline;
    seekGlobalTime(entropy: number): number;
    seekLocalTime(entropy: number): number;
    seekTimeMark(entropy: number): ITimeMark;
    playbackRate: number;
    readonly paused: boolean;
    updateTimers();
    clearTimeout(id: symbol);
    clearInterval(id: symbol);
    clear();
    setTimeout(handler: Function, time): symbol;
    setInterval(handler: Function, time): symbol;
  }

  class Layer extends BaseNode {
    constructor(options: ILayerOptions);
    autoRender: boolean;
    readonly layer: Layer;
    readonly children: Array<BaseSprite>;
    readonly timeline: Timeline;
    readonly context: CanvasRenderingContext2D;
    readonly canvas: HTMLCanvasElement;
    readonly offset: IPoint;
    clearContext(context: CanvasRenderingContext2D);
    remove(...children: Array<BaseSprite>): Array<BaseSprite>;
    prepareRender(): Promise<Object>;
    draw(clearContext: boolean);
    update(target: BaseSprite);
    isVisible(sprite: BaseSprite): boolean;
    readonly fps: number;
    drawSprites(renderEls: Array<BaseSprite>, t: number);
    renderRepaintAll(t: number, clearContext);
    renderRepaintDirty(t: number, clearContext);
    pointCollision(event: IEventArguments): boolean;
    dispatchEvent(type: string, event: IEventArguments, collisionState: boolean, swallow: boolean): boolean;
    // connect(parent: Scene, zOrder:number = 0);
    // disconnect(parent: Scene);
    group(...sprites: Array<BaseSprite>): Group;
    batch(...sprites: Array<BaseSprite>): Batch;
    adjust(handler: Function, update: boolean);
    clearUpdate();
    appendChild(sprite: BaseSprite, update): BaseSprite;
    append(...sprites: Array<BaseSprite>);
    removeChild(sprite: BaseSprite): BaseSprite;
    clear(): Array<BaseSprite>;
    insertBefore(newChild: BaseSprite, refChild: BaseSprite): BaseSprite;
  }

  class GroupAttr extends Attr {
    constructor(subject: Group);
    clip: IPath;
    width: number;
    height: number;
    layoutWidth: number;
    layoutHeight: number;
    display: string;
    scrollLeft: number;
    scrollTop: number;
    flexDirection: string;
    flexWrap: string;
    justifyContent: string;
    alignItems: string;
    alignContent: string;
  }

  interface ILayout {
    attrs: Object;
    relayout(container: Group, items: Array<BaseSprite>);
  }

  class Group extends BaseSprite {
    static Attr;
    static applyLayout(name, layout: ILayout);
    constructor(attr: Object);
    readonly isVirtual: boolean;
    scrollTo(x: number, y: number);
    scrollBy(dx: number, dy: number);
    cloneNode(): BaseSprite;
    cloneNode(deepCopy: boolean): BaseSprite;
    readonly children: Array<BaseSprite>;
    update(child: BaseSprite);
    pointCollision(event: IEventArguments);
    readonly contentSize: ISize;
    dispatchEvent(type: string, event: IEventArguments, collisionState: boolean, swallow: boolean): boolean;
    relayout();
    clearLayout();
    render(t: number, context: CanvasRenderingContext2D);
    appendChild(sprite: BaseSprite, update: boolean): BaseSprite;
    append(...sprites: Array<BaseSprite>);
    removeChild(sprite: BaseSprite): BaseSprite;
    clear(): Array<BaseSprite>;
    insertBefore(newChild: BaseSprite, refChild: BaseSprite): BaseSprite;
  }


  interface Effects {
    default: (from: number, to: number, p: number, s: number, e: number) => number;
  }
  
  interface Easings {
    linear: (p) => number;
    ease: (p) => number;
    'ease-in': (p) => number;
    'ease-out': (p) => number;
    'ease-in-out': (p) => number;
    'step-start': (p) => number;
    'step-end': (p) => number;
  }

  function registerNodeType();
  function createNode();
  function createElement();

  class SvgPath {
    constructor(d: string);
    save();
    restore();
    readonly bounds: IRect;
    readonly size: ISize;
    readonly center: IPoint;
    readonly d: string;
    readonly path: IPath;
    isPointInPath(x: number, y: number): boolean;
    getPointAtLength(len: number): IPoint;
    getTotalLength(): number;
    transform(...args: Array<number>): SvgPath;
    translate(x: number, y: number): SvgPath;
    rotate(deg: number): SvgPath;
    scale(x: number, y: number): SvgPath;
    skew(x: number, y: number): SvgPath;
    trim(): SvgPath;
    beginPath(): SvgPath;
    to(context: CanvasRenderingContext2D);
    strokeStyle(value: string): SvgPath;
    fillStyle(value: string): SvgPath;
    lineWidth(value: number): SvgPath;
    lineCap(value: string): SvgPath;
    lineJoin(value: string): SvgPath;
  }

  namespace utils {
    function appendUnit(value: number|string, defaultUnit: string): string;
    function attr(target: any, prop: string, descriptor: PropertyDecorator): PropertyDescriptor;
    function boxEqual(box1: IBox, box2: IBox): boolean;
    function boxIntersect(box1: IBox, box2: IBox): boolean;
    function boxToRect(box: IBox): IRect;
    function boxUnion(box1: IBox, box2: IBox): IBox;
    interface cacheContextPool {
      get: (context: CanvasRenderingContext2D) => CanvasRenderingContext2D;
      put: (...contexts: Array<CanvasRenderingContext2D>) => undefined;
      readonly size: number;
    }
    function deprecate(...args: Array<string>): IDecorator;
    function findColor(context: CanvasRenderingContext2D, sprite: BaseSprite, prop: string);
    function flow(target: any, prop: string, descriptor: PropertyDecorator): PropertyDescriptor;
    function fourValuesShortCut(value: number|Array<number>): Array<number>;
    function notice(msg: string, level: string);
    function oneOrTwoValues(value: number|Array<number>): Array<number>;
    function parseColor(color: string|IColor): Color;
    function parseColorString(color: string|IColor): string;
    function praseString(str: string): Array<any>;
    function parseStringFloat(str: string): Array<number>;
    function parseStringInt(str: string): Array<number>;
    function parseStringTransform(str: string): ITransform;
    function parseValue(...parsers: Array<Function>): IDecorator;
    function rectToBox(rect: IRect): IBox;
    function rectVertices(rect: IRect): Array<IPoint>;
    function resolveValue(...resolvers: Array<Function>): IDecorator;
    function sortOrderedSprites(sprites: Array<BaseSprite>, reversed: boolean);
  }
}