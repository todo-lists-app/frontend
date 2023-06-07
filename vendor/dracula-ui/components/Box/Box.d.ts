import React, { AllHTMLAttributes } from 'react';
import { backgroundColors, borderColors, glowColors, scrollbarColors } from '../../base/colors';
import { MarginMixin, PaddingMixin } from '../../base/spacing';
declare type Element = HTMLElementTagNameMap;
export declare const roundedBorders: {
    none: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
};
export declare const displays: {
    none: string;
    block: string;
    flex: string;
    grid: string;
    table: string;
    inline: string;
    'inline-block': string;
    'inline-flex': string;
    'inline-grid': string;
    'inline-table': string;
};
export declare const widths: {
    auto: string;
    none: string;
    full: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
};
export declare const heights: {
    auto: string;
    none: string;
    full: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
};
/**
 * Box Props
 */
export declare type BoxProps<K extends keyof Element = 'div'> = {
    /** The background color. */
    color?: keyof typeof backgroundColors;
    /** The display of the element. */
    display?: keyof typeof displays;
    /** The glow color. */
    glowColor?: keyof typeof glowColors;
    /** The border color. */
    borderColor?: keyof typeof borderColors;
    /** The border radius. */
    rounded?: keyof typeof roundedBorders;
    /** The height of the element. */
    height?: keyof typeof heights;
    /** The width of the element. */
    width?: keyof typeof widths;
    /** The HTML element to be used */
    as?: K;
    /** If the custom scrollbar is to be used and its color. */
    scrollbar?: keyof typeof scrollbarColors | boolean;
} & AllHTMLAttributes<K> & PaddingMixin & MarginMixin;
/**
 * Box is the most primitive component of Dracula UI.
 * Using Box allows for consumers of the components library to compose
 * more complex patterns, components, and UIs.
 *
 * Box includes built-in Color and Spacing properties that make building
 * complex components convenient and consistent.
 */
export declare function Box<T extends keyof Element>(props: BoxProps<T>): React.ReactElement<Pick<{
    className: string;
    accept?: string | undefined;
    acceptCharset?: string | undefined;
    action?: string | undefined;
    allowFullScreen?: boolean | undefined;
    allowTransparency?: boolean | undefined;
    alt?: string | undefined;
    async?: boolean | undefined;
    autoComplete?: string | undefined;
    autoFocus?: boolean | undefined;
    autoPlay?: boolean | undefined;
    capture?: boolean | "user" | "environment" | undefined;
    cellPadding?: string | number | undefined;
    cellSpacing?: string | number | undefined;
    charSet?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    cite?: string | undefined;
    classID?: string | undefined;
    cols?: number | undefined;
    colSpan?: number | undefined;
    content?: string | undefined;
    controls?: boolean | undefined;
    coords?: string | undefined;
    crossOrigin?: string | undefined;
    data?: string | undefined;
    dateTime?: string | undefined;
    default?: boolean | undefined;
    defer?: boolean | undefined;
    disabled?: boolean | undefined;
    download?: any;
    encType?: string | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    frameBorder?: string | number | undefined;
    headers?: string | undefined;
    high?: number | undefined;
    href?: string | undefined;
    hrefLang?: string | undefined;
    htmlFor?: string | undefined;
    httpEquiv?: string | undefined;
    integrity?: string | undefined;
    keyParams?: string | undefined;
    keyType?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    list?: string | undefined;
    loop?: boolean | undefined;
    low?: number | undefined;
    manifest?: string | undefined;
    marginHeight?: number | undefined;
    marginWidth?: number | undefined;
    max?: string | number | undefined;
    maxLength?: number | undefined;
    media?: string | undefined;
    mediaGroup?: string | undefined;
    method?: string | undefined;
    min?: string | number | undefined;
    minLength?: number | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    nonce?: string | undefined;
    noValidate?: boolean | undefined;
    open?: boolean | undefined;
    optimum?: number | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    preload?: string | undefined;
    readOnly?: boolean | undefined;
    rel?: string | undefined;
    required?: boolean | undefined;
    reversed?: boolean | undefined;
    rows?: number | undefined;
    rowSpan?: number | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    size?: number | undefined;
    sizes?: string | undefined;
    span?: number | undefined;
    src?: string | undefined;
    srcDoc?: string | undefined;
    srcLang?: string | undefined;
    srcSet?: string | undefined;
    start?: number | undefined;
    step?: string | number | undefined;
    summary?: string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    useMap?: string | undefined;
    value?: string | number | readonly string[] | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;
    defaultChecked?: boolean | undefined;
    defaultValue?: string | number | readonly string[] | undefined;
    suppressContentEditableWarning?: boolean | undefined;
    suppressHydrationWarning?: boolean | undefined;
    accessKey?: string | undefined;
    contentEditable?: boolean | "true" | "false" | "inherit" | undefined;
    contextMenu?: string | undefined;
    dir?: string | undefined;
    draggable?: boolean | "true" | "false" | undefined;
    hidden?: boolean | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    slot?: string | undefined;
    spellCheck?: boolean | "true" | "false" | undefined;
    style?: React.CSSProperties | undefined;
    tabIndex?: number | undefined;
    title?: string | undefined;
    translate?: "yes" | "no" | undefined;
    radioGroup?: string | undefined;
    role?: "none" | "article" | "button" | "dialog" | "figure" | "form" | "img" | "link" | "main" | "marquee" | "menu" | "option" | "table" | "grid" | "scrollbar" | "list" | "alert" | "alertdialog" | "application" | "banner" | "cell" | "checkbox" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "directory" | "document" | "feed" | "gridcell" | "group" | "heading" | "listbox" | "listitem" | "log" | "math" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "note" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "switch" | "tab" | "tablist" | "tabpanel" | "term" | "textbox" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem" | (string & {}) | undefined;
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autoCapitalize?: string | undefined;
    autoCorrect?: string | undefined;
    autoSave?: string | undefined;
    itemProp?: string | undefined;
    itemScope?: boolean | undefined;
    itemType?: string | undefined;
    itemID?: string | undefined;
    itemRef?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: "on" | "off" | undefined;
    inputMode?: "none" | "search" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
    is?: string | undefined;
    'aria-activedescendant'?: string | undefined;
    'aria-atomic'?: boolean | "true" | "false" | undefined;
    'aria-autocomplete'?: "none" | "inline" | "list" | "both" | undefined;
    'aria-busy'?: boolean | "true" | "false" | undefined;
    'aria-checked'?: boolean | "true" | "false" | "mixed" | undefined;
    'aria-colcount'?: number | undefined;
    'aria-colindex'?: number | undefined;
    'aria-colspan'?: number | undefined;
    'aria-controls'?: string | undefined;
    'aria-current'?: boolean | "time" | "step" | "true" | "false" | "page" | "location" | "date" | undefined;
    'aria-describedby'?: string | undefined;
    'aria-details'?: string | undefined;
    'aria-disabled'?: boolean | "true" | "false" | undefined;
    'aria-dropeffect'?: "none" | "link" | "copy" | "execute" | "move" | "popup" | undefined;
    'aria-errormessage'?: string | undefined;
    'aria-expanded'?: boolean | "true" | "false" | undefined;
    'aria-flowto'?: string | undefined;
    'aria-grabbed'?: boolean | "true" | "false" | undefined;
    'aria-haspopup'?: boolean | "dialog" | "menu" | "grid" | "true" | "false" | "listbox" | "tree" | undefined;
    'aria-hidden'?: boolean | "true" | "false" | undefined;
    'aria-invalid'?: boolean | "true" | "false" | "grammar" | "spelling" | undefined;
    'aria-keyshortcuts'?: string | undefined;
    'aria-label'?: string | undefined;
    'aria-labelledby'?: string | undefined;
    'aria-level'?: number | undefined;
    'aria-live'?: "off" | "assertive" | "polite" | undefined;
    'aria-modal'?: boolean | "true" | "false" | undefined;
    'aria-multiline'?: boolean | "true" | "false" | undefined;
    'aria-multiselectable'?: boolean | "true" | "false" | undefined;
    'aria-orientation'?: "horizontal" | "vertical" | undefined;
    'aria-owns'?: string | undefined;
    'aria-placeholder'?: string | undefined;
    'aria-posinset'?: number | undefined;
    'aria-pressed'?: boolean | "true" | "false" | "mixed" | undefined;
    'aria-readonly'?: boolean | "true" | "false" | undefined;
    'aria-relevant'?: "text" | "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | undefined;
    'aria-required'?: boolean | "true" | "false" | undefined;
    'aria-roledescription'?: string | undefined;
    'aria-rowcount'?: number | undefined;
    'aria-rowindex'?: number | undefined;
    'aria-rowspan'?: number | undefined;
    'aria-selected'?: boolean | "true" | "false" | undefined;
    'aria-setsize'?: number | undefined;
    'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined;
    'aria-valuemax'?: number | undefined;
    'aria-valuemin'?: number | undefined;
    'aria-valuenow'?: number | undefined;
    'aria-valuetext'?: string | undefined;
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: {
        __html: string;
    } | undefined;
    onCopy?: ((event: React.ClipboardEvent<T>) => void) | undefined;
    onCopyCapture?: ((event: React.ClipboardEvent<T>) => void) | undefined;
    onCut?: ((event: React.ClipboardEvent<T>) => void) | undefined;
    onCutCapture?: ((event: React.ClipboardEvent<T>) => void) | undefined;
    onPaste?: ((event: React.ClipboardEvent<T>) => void) | undefined;
    onPasteCapture?: ((event: React.ClipboardEvent<T>) => void) | undefined;
    onCompositionEnd?: ((event: React.CompositionEvent<T>) => void) | undefined;
    onCompositionEndCapture?: ((event: React.CompositionEvent<T>) => void) | undefined;
    onCompositionStart?: ((event: React.CompositionEvent<T>) => void) | undefined;
    onCompositionStartCapture?: ((event: React.CompositionEvent<T>) => void) | undefined;
    onCompositionUpdate?: ((event: React.CompositionEvent<T>) => void) | undefined;
    onCompositionUpdateCapture?: ((event: React.CompositionEvent<T>) => void) | undefined;
    onFocus?: ((event: React.FocusEvent<T, globalThis.Element>) => void) | undefined;
    onFocusCapture?: ((event: React.FocusEvent<T, globalThis.Element>) => void) | undefined;
    onBlur?: ((event: React.FocusEvent<T, globalThis.Element>) => void) | undefined;
    onBlurCapture?: ((event: React.FocusEvent<T, globalThis.Element>) => void) | undefined;
    onChange?: ((event: React.FormEvent<T>) => void) | undefined;
    onChangeCapture?: ((event: React.FormEvent<T>) => void) | undefined;
    onBeforeInput?: ((event: React.FormEvent<T>) => void) | undefined;
    onBeforeInputCapture?: ((event: React.FormEvent<T>) => void) | undefined;
    onInput?: ((event: React.FormEvent<T>) => void) | undefined;
    onInputCapture?: ((event: React.FormEvent<T>) => void) | undefined;
    onReset?: ((event: React.FormEvent<T>) => void) | undefined;
    onResetCapture?: ((event: React.FormEvent<T>) => void) | undefined;
    onSubmit?: ((event: React.FormEvent<T>) => void) | undefined;
    onSubmitCapture?: ((event: React.FormEvent<T>) => void) | undefined;
    onInvalid?: ((event: React.FormEvent<T>) => void) | undefined;
    onInvalidCapture?: ((event: React.FormEvent<T>) => void) | undefined;
    onLoad?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onLoadCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onError?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onErrorCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onKeyDown?: ((event: React.KeyboardEvent<T>) => void) | undefined;
    onKeyDownCapture?: ((event: React.KeyboardEvent<T>) => void) | undefined;
    onKeyPress?: ((event: React.KeyboardEvent<T>) => void) | undefined;
    onKeyPressCapture?: ((event: React.KeyboardEvent<T>) => void) | undefined;
    onKeyUp?: ((event: React.KeyboardEvent<T>) => void) | undefined;
    onKeyUpCapture?: ((event: React.KeyboardEvent<T>) => void) | undefined;
    onAbort?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onAbortCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onCanPlay?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onCanPlayCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onCanPlayThrough?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onCanPlayThroughCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onDurationChange?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onDurationChangeCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onEmptied?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onEmptiedCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onEncrypted?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onEncryptedCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onEnded?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onEndedCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onLoadedData?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onLoadedDataCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onLoadedMetadata?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onLoadedMetadataCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onLoadStart?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onLoadStartCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onPause?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onPauseCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onPlay?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onPlayCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onPlaying?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onPlayingCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onProgress?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onProgressCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onRateChange?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onRateChangeCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onSeeked?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onSeekedCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onSeeking?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onSeekingCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onStalled?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onStalledCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onSuspend?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onSuspendCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onTimeUpdate?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onTimeUpdateCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onVolumeChange?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onVolumeChangeCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onWaiting?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onWaitingCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onAuxClick?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onAuxClickCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onClick?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onClickCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onContextMenu?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onContextMenuCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onDoubleClick?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onDoubleClickCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onDrag?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragEnd?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragEndCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragEnter?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragEnterCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragExit?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragExitCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragLeave?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragLeaveCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragOver?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragOverCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragStart?: ((event: React.DragEvent<T>) => void) | undefined;
    onDragStartCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onDrop?: ((event: React.DragEvent<T>) => void) | undefined;
    onDropCapture?: ((event: React.DragEvent<T>) => void) | undefined;
    onMouseDown?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseDownCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseEnter?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseLeave?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseMove?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseMoveCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseOut?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseOutCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseOver?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseOverCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseUp?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onMouseUpCapture?: ((event: React.MouseEvent<T, MouseEvent>) => void) | undefined;
    onSelect?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onSelectCapture?: ((event: React.SyntheticEvent<T, Event>) => void) | undefined;
    onTouchCancel?: ((event: React.TouchEvent<T>) => void) | undefined;
    onTouchCancelCapture?: ((event: React.TouchEvent<T>) => void) | undefined;
    onTouchEnd?: ((event: React.TouchEvent<T>) => void) | undefined;
    onTouchEndCapture?: ((event: React.TouchEvent<T>) => void) | undefined;
    onTouchMove?: ((event: React.TouchEvent<T>) => void) | undefined;
    onTouchMoveCapture?: ((event: React.TouchEvent<T>) => void) | undefined;
    onTouchStart?: ((event: React.TouchEvent<T>) => void) | undefined;
    onTouchStartCapture?: ((event: React.TouchEvent<T>) => void) | undefined;
    onPointerDown?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerDownCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerMove?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerMoveCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerUp?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerUpCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerCancel?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerCancelCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerEnter?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerEnterCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerLeave?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerLeaveCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerOver?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerOverCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerOut?: ((event: React.PointerEvent<T>) => void) | undefined;
    onPointerOutCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onGotPointerCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onGotPointerCaptureCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onLostPointerCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onLostPointerCaptureCapture?: ((event: React.PointerEvent<T>) => void) | undefined;
    onScroll?: ((event: React.UIEvent<T, UIEvent>) => void) | undefined;
    onScrollCapture?: ((event: React.UIEvent<T, UIEvent>) => void) | undefined;
    onWheel?: ((event: React.WheelEvent<T>) => void) | undefined;
    onWheelCapture?: ((event: React.WheelEvent<T>) => void) | undefined;
    onAnimationStart?: ((event: React.AnimationEvent<T>) => void) | undefined;
    onAnimationStartCapture?: ((event: React.AnimationEvent<T>) => void) | undefined;
    onAnimationEnd?: ((event: React.AnimationEvent<T>) => void) | undefined;
    onAnimationEndCapture?: ((event: React.AnimationEvent<T>) => void) | undefined;
    onAnimationIteration?: ((event: React.AnimationEvent<T>) => void) | undefined;
    onAnimationIterationCapture?: ((event: React.AnimationEvent<T>) => void) | undefined;
    onTransitionEnd?: ((event: React.TransitionEvent<T>) => void) | undefined;
    onTransitionEndCapture?: ((event: React.TransitionEvent<T>) => void) | undefined;
    p?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    py?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    px?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    pt?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    pb?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    pl?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    pr?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    m?: "auto" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    my?: "auto" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    mx?: "auto" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    mt?: "auto" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    mb?: "auto" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    ml?: "auto" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
    mr?: "auto" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | undefined;
}, "cite" | "data" | "dir" | "form" | "label" | "slot" | "span" | "style" | "summary" | "title" | "accept" | "acceptCharset" | "action" | "allowFullScreen" | "allowTransparency" | "alt" | "async" | "autoComplete" | "autoFocus" | "autoPlay" | "capture" | "cellPadding" | "cellSpacing" | "charSet" | "challenge" | "checked" | "classID" | "cols" | "colSpan" | "content" | "controls" | "coords" | "crossOrigin" | "dateTime" | "default" | "defer" | "disabled" | "download" | "encType" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "frameBorder" | "headers" | "high" | "href" | "hrefLang" | "htmlFor" | "httpEquiv" | "integrity" | "keyParams" | "keyType" | "kind" | "list" | "loop" | "low" | "manifest" | "marginHeight" | "marginWidth" | "max" | "maxLength" | "media" | "mediaGroup" | "method" | "min" | "minLength" | "multiple" | "muted" | "name" | "nonce" | "noValidate" | "open" | "optimum" | "pattern" | "placeholder" | "playsInline" | "poster" | "preload" | "readOnly" | "rel" | "required" | "reversed" | "rows" | "rowSpan" | "sandbox" | "scope" | "scoped" | "scrolling" | "seamless" | "selected" | "shape" | "size" | "sizes" | "src" | "srcDoc" | "srcLang" | "srcSet" | "start" | "step" | "target" | "type" | "useMap" | "value" | "wmode" | "wrap" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "className" | "contentEditable" | "contextMenu" | "draggable" | "hidden" | "id" | "lang" | "spellCheck" | "tabIndex" | "translate" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "children" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture">, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
export declare namespace Box {
    var displayName: string;
}
export {};
