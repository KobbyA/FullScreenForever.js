/**
 * FullScreenForever jQuery plugin
 * makes an element (usually image) always fullscreen width to the window and in ratio
 * Author: Kobby Appiah
 * kobby@kobby-appiah.com
 * @param opts
 * @constructor
 */
$.fn.FullScreenForever = function(opts){

    var $window = $(window);
    var $el = this;
    var $parent = $el.parent();
    var pwidth = $parent.width();
    var pHeight = $parent.height();

    var defaults = {
        useCSS : false,
        useOverflow: false,
        onResizeBefore : null,
        onResizeAfter :null
    };

    if(opts) $.extend(defaults, opts);
    if(defaults.useOverflow) $parent.css('overflow', 'hidden');

    if(!$.FullScreenForeverInit){
        $.FullScreenForeverInit = true;
        $window.on('resize', function(){
            scaleImage();
            $window.trigger('fullScreenForever');
        });
    }

    $(window).bind('resize', function(){
        pwidth = $parent.width();
        pHeight = $parent.height();
        callback(defaults.onResizeBefore, this);
        scaleImage();
        callback(defaults.onResizeAfter, this);
    });

    function callback(fn, ctx, args){
        if(!args) args = {};
        if(fn && typeof fn == "function"){
            if(ctx){
                fn.apply(ctx, [args]);
            } else {
                fn.apply(args);
            }
        }

    }

    function scaleImage() {
        var ratio = Math.max(pwidth / $el.width(), pHeight / $el.height());
        defaults.useCSS ? scaleByTransform(ratio) : scaleByWidthHeight(ratio);
    }

    function scaleByTransform(ratio) {
        var transform = 'translate3d(' + [-($el.width()) / 2, -($el.height()) / 2, 0].join('px,') + 'px) scale3d(' + ratio + ',' + ratio + ',1) translate3d(' + [pwidth / 2 / ratio, pHeight / 2 / ratio, 0].join('px,') + ')';
        $el.css({
            "-moz-transform": transform,
            "-ms-transform": transform,
            "-o-transform": transform,
            "-webkit-transform": transform,
            "transform": transform
        });
    }

    function scaleByWidthHeight(ratio) {
        var _h = $el.height() * ratio, _w = $el.width() * ratio;
        var left = (pwidth - _w) / 2, top = (pHeight - _h) / 2;
        $el.css({position:'absolute', width: _w + 'px', height: _h + "px", top: top + 'px', left: left + 'px'});
    }
};

;