FullScreenForever.js
====================

A small utility jQuery plugin that makes an element, usually an image, stay fullscreen centered within a container. This does mean there will be some overflow of this element within its container.

Options are pretty simple here are the defaults

var defaults = {
    useCSS : false,// handle scaling by css transform or use width, height, top, left, and absolute position
    useOverflow: false,// make the parent element overflow hidden or not. If false the full screen element can bleed beyond the edges of its parent causing scrollbars possibly
    onResizeBefore : null, //callback function to be called before resizing in the context of the element being resized
    onResizeAfter :null //callback function to be called after resizing in the context of the element being resized
};

