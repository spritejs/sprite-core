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
  };

  interface ITransition {
    end();
    reverse(): Promise;
    attr(name: string, value: any): Promise;
  };

  interface ITiming {
    duration: number;
    iterations: number;
    easing: string;
    fill: string;
    delay: number;
    endDelay: number;
    direction: string;
  };

  interface IPath {
    d: string;
    transform: ITransform;
    trim: boolean;
  };

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
    constructor(subject: BaseSprite);
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
    static Attr = Attr;
    static setAttributeEffects(effects: Object = {});
    static addAttributes(attrs: Object = {});
    static defineAttributes(attrs: Object, effects: Object): Attr;
    constructor(attr?: Object);
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
    constructor(layer: Layer);
    get baseNode(): BaseSprite;
    add(...nodes: BaseSprite);
    remove(...nodes: BaseSprite);
  };

  private class TextureAttr extends Attr {
    constructor(subject: Sprite);
    textures: Array;
    loadTextures(textures: Array);
  };
  
  class Sprite extends BaseSprite {
    static Attr = TextureAttr;
    constructor(attr?: Object);
    cloneNode(): Sprite;
    images: Array;
    textures: Array;
    get clientSize(): ISize;
    pointCollision(event: IEventArguments): boolean;
    cache: CanvasRenderingContext2D;
    render(t: number, context: CanvasRenderingContext2D);
    nodeType = 'sprite';
  };

  private class LabelSpriteAttr extends Attr {
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
  };
  
  class Label extends BaseSprite {
    static Attr = LabelSpriteAttr;
    constructor(attr?: Object);
    text: string;
    get textBoxSize(): ISize;
    get flexibleFont(): string;
    get contentSize(): ISize;
    render(t: number, context: CanvasRenderingContext2D);
    nodeType = 'label';
  };

  private class PathSpriteAttr {
    constructor(subject: Path);
    path: IPath;
    d: string;
    lineWidth: number;
    lineDash: Array;
    lineDashOffset: number;
    lineCap: string;
    lineJoin: string;
    strokeColor: string;
    fillColor: string;
    flexible: boolean;
    bounding: string;
  };

  class Path extends BaseSprite {
    static Attr = PathSpriteAttr;
    constructor(attr?: Object);
    path: IPath;
    getPointAtLength(length: number): IPoint;
    getPathLength(): number;
    findPath(offsetX: number, offsetY: number): SvgPath;
    get lineWidth(): number;
    get pathOffset(): IPoint;
    get pathSize(): ISize;
    get contentSize(): ISize;
    get originalRect(): IRect;
    pointCollision(event: IEventArguments): boolean;
    render(t: number, context: CanvasRenderingContext2D);
    nodeType = 'path';
  };

  interface ILayerOptions {
    context: CanvasRenderingContext2D;
    handleEvent: boolean;
    evaluteFPS: boolean;
    renderMode: string;
    autoRender: boolean;
  };

  interface ITimeMark {
    globalTime: number;
    localTime: number;
    entropy: number;
    playbackRate: number;
    globalEntropy: number;
  };

  class Timeline {
    constructor(options: Object, parent?: Timeline);
    get parent(): Timeline?;
    get lastTimeMark(): ITimeMark;
    markTime({time: number, entropy: number, playbackRate: number} = {});
    currentTime: number;
    entropy: number;
    get globalEntropy(): number;
    get globalTime(): number;
    fork(options: Object): Timeline;
    seekGlobalTime(entropy: number): number;
    seekLocalTime(entropy: number): number;
    seekTimeMark(entropy: number): ITimeMark;
    playbackRate: number;
    get paused(): boolean;
    updateTimers();
    clearTimeout(id: symbol);
    clearInterval(id: symbol);
    clear();
    setTimeout(handler: Function, time = {delay: 0}): symbol;
    setInterval(handler: Function, time = {delay: 0}): symbol;
  };

  class Layer extends BaseNode {
    constructor(options: ILayerOptions);
    autoRender: boolean;
    get layer(): Layer;
    get children(): Array;
    get timeline(): Timeline;
    get context(): CanvasRenderingContext2D;
    get canvas(): Canvas;
    get offset(): IPoint;
    clearContext(context: CanvasRenderingContext2D);
    remove(...children: BaseSprite): Array;
    prepareRender(): Promise;
    draw(clearContext: boolean = true);
    update(target: BaseSprite);
    isVisible(sprite: BaseSprite): boolean;
    get fps(): number;
    drawSprites(renderEls: Array, t: number);
    renderRepaintAll(t: number, clearContext = true);
    renderRepaintDirty(t: number, clearContext = true);
    pointCollision(event: IEventArguments): boolean;
    dispatchEvent(type: string, event: IEventArguments, collisionState: boolean, swallow: boolean): boolean;
    // connect(parent: Scene, zOrder:number = 0);
    // disconnect(parent: Scene);
    group(...sprites: BaseSprite): Group;
    batch(...sprites: BaseSprite): Batch;
    adjust(...handler: Function, update: boolean);
    clearUpdate();
    appendChild(sprite: BaseSprite, update = true): BaseSprite;
    append(...sprites: BaseSprite);
    removeChild(sprite: BaseSprite): BaseSprite;
    clear(): Array;
    insertBefore(newChild: BaseSprite, refChild: BaseSprite): BaseSprite;
    nodeType = 'layer';
  };

  private class GroupAttr extends Attr {
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
  };

  interface ILayout {
    attrs: Object;
    relayout(container: Group, items: Array);
  };

  class Group extends BaseSprite {
    static Attr = GroupAttr;
    static applyLayout(name, layout: ILayout);
    constructor(attr: Object);
    get isVirtual(): boolean;
    scrollTo(x: number, y: number);
    scrollBy(dx: number, dy: number);
    cloneNode(deepCopy: boolean);
    get children(): Array;
    update(child: BaseSprite);
    pointCollision(event: IEventArguments);
    get contentSize(): ISize;
    dispatchEvent(type: string, event: IEventArguments, collisionState: boolean, swallow: boolean): boolean;
    relayout();
    clearLayout();
    render(t: number, context: CanvasRenderingContext2D);
    appendChild(sprite: BaseSprite, update = true): BaseSprite;
    append(...sprites: BaseSprite);
    removeChild(sprite: BaseSprite): BaseSprite;
    clear(): Array;
    insertBefore(newChild: BaseSprite, refChild: BaseSprite): BaseSprite;
    nodeType = 'group';
  };


  declare var Effects = {
    default: (from: number, to: number, p: number, s: number, e: number) => number
  };
  
  declare var Easings = {
    linear: (p) => number,
    ease: (p) => number,
    'ease-in': (p) => number,
    'ease-out': (p) => number,
    'ease-in-out': (p) => number,
    'step-start': (p) => number,
    'step-end': (p) => number,
  };

  function registerNodeType();
  function createNode();
  function createElement();

  class SvgPath {
    constructor(d: string);
    save();
    restore();
    get bounds(): IRect;
    get size(): ISize;
    get center(): IPoint;
    get d(): string;
    get path(): IPath;
    isPointInPath(x: number, y: number): boolean;
    getPointAtLength(len: number): IPoint;
    getTotalLength(): number;
    transform(...args: number): SvgPath;
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