//网站初始化
$(function () {
    if (!window.matchMedia("(min-width:1px)").matches) {
        //在不支持border-box的浏览器中消除浮动
        var clear = $('<div class="row-clear"></div>');
        $('.row, .container').each(function (){ $(this).append(clear.clone()) })
        for (var i = 0; i <= 20; i++) {
            $('.col-sm-' + i).addClass('col-xs-' + i);
            $('.col-md-' + i).addClass('col-xs-' + i);
            $('.col-lg-' + i).addClass('col-xs-' + i);
            $('.col-sm-offset-' + i).addClass('col-xs-offset-' + i);
            $('.col-md-offset-' + i).addClass('col-xs-offset-' + i);
            $('.col-lg-offset-' + i).addClass('col-xs-offset-' + i);
        }
        //为不支持border-box的浏览器，消除.form-control的宽度溢出
        $('.form-control,.btn-block').filter(':not(.form-control-inline)').each(function () {
            var self = $(this);
            if (self.css('display') == 'block') {
                var pw = self.parent().width(),
                    wa = self.outerWidth(),
                    w = self.width();
                self.width(w - (wa - pw));
            }
        });
    }       

    $('.toggle-btn').click(function (e) {
        jk.event(e);       
        $(this).next('.toggle-item').slideToggle('normal');
        $(this).parent().toggleClass('active');
    });
})


//兼容ie8以下，和不能够媒体查询的浏览器
//polyfill
window.matchMedia || (window.matchMedia = function () {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function (media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

//为不支持console的浏览器添加补丁，防止出错
if (console) {
    if (!console.log)
        console.log = function () { }
} else {
    var console = {};
    console.log = function () { };
}


//定义网站全局对象jskit，它有原型jk
function jskit() { };
var jk = jskit.prototype;


jk.media= function (mediaStr) {
    return window.matchMedia(mediaStr).matches;
}

//阻止默认事件
jk.event = function (event) {
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
}

jk.isMobileSet=function(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) 
        return true;
    else
        return false;
}

jk.confirm = function (options) {
    var defaults = {
        title: '警告',
        msg: '确认操作!',
        yesFun: function () { return true; },
        noFun: function () { return true; },
        css: {}
    };
    options = $.extend(true, {}, defaults, options);
    var firm = $('.modalConfirm');
    var backMsg = firm.find('.modal-body').html(options.msg);
    var backTitle = firm.find('.modal-title').html(options.title);
    firm.modal('show');
    var dialog = firm.find('.modal-dialog');
    dialog.css({
        'margin-top': ($(window).height() - dialog.height()) / 2
    }).css(options.css);
    firm.off();
    firm.find('.modalConfirmYes').unbind().on('click', function (event) {
        jk.event(event);
        if (typeof options.yesFun == "function" && options.yesFun(backTitle, backMsg)) {
            firm.find('.modalConfirmNo').off();
            firm.modal('hide');
        }
    });
    firm.find('.modalConfirmNo').unbind().on('click', function (event) {
        jk.event(event);
        if (typeof options.noFun == 'function' && options.noFun(backTitle, backMsg)) {
            firm.find('.modalConfirmYes').off();
            firm.modal('hide');

        }
    });
}

jk.alert = function (options) {
    var defaults = {
        title: '消息',
        msg: '完成!',
        yesFun: function () { return true; },
        css: {}
    };
    options = $.extend(true, {}, defaults, options);
    var firm = $('.modalAlert');
    var backMsg = firm.find('.modal-body').html(options.msg);
    var backTitle = firm.find('.modal-title').html(options.title);
    firm.modal('show');
    firm.off();
    var dialog = firm.find('.modal-dialog');
    if(!jk.isMobileSet())
        dialog.css({
            'margin-top': ($(window).height() - dialog.height()) / 2
        });
    dialog.css(options.css);
    firm.find('.modalConfirmYes').unbind().on('click', function (event) {
        jk.event(event);
        if (typeof options.yesFun == "function" && options.yesFun(backTitle, backMsg)) {
            firm.modal('hide');
        }
    });
}

jk.query = function (name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return null;
    }
    return result[1];
}

jk.automenu = function (parent,returnTop) {
    var p = $(parent),
        menu = $('<ul class="nav menu menu-vertical menu-pure menu-condensed"></ul>'),
        submenu = $(' <ul class="menu menu-vertical menu-pure menu-sub"></ul>'),
        li = $('<li><a></a></li>');
    $('.nb-section').each(function () {
        var self = $(this).find('.navHeader'),
            _li = li.clone(),
            _li_a = _li.find('a');
        _li_a.attr('href', '#' + self.attr('id')).text(self.text());
        menu.append(_li);
        var sub = $(this).find('.nb-sub-section');
        if (sub.length) {
            temp_submenu = submenu.clone();
            sub.each(function () {
                var inner = $(this).find('.subNavHeader'),
                    inner_li = li.clone(),
                    inner_li_a = inner_li.find('a');
                inner_li_a.attr('href', '#' + inner.attr('id')).text(inner.text());
                temp_submenu.append(inner_li);
            })
            _li.append(temp_submenu);
        }
    })
    if (returnTop) {
        menu.append('<li><a href="#top">返回顶部</a></li>');
    }
    p.append(menu);
}

jk.isSupportCss = function (style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };
    
    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));
    
    humpString.push(_toHumb(style));
    
    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;
    
    return false;
}