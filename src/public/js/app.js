function application(){
    this.nodata = '';
    this.phone = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
    this.api = '4DD845D1BB619BEEFB641EC49A7D8735';
    // 导航
    $('body').bind({
        'click': function(){
            $('.shownav').removeClass('hover').siblings('.nav').hide();
        },
        'touchmove': function(){
            $('.shownav').removeClass('hover').siblings('.nav').hide();
        }
    })
    // 返回顶部
    $("#goTop").click(function(){ $("body, html").stop().animate({"scrollTop":0}); });
    $('.shownav').bind('click', function(e){
        if($(this).hasClass('hover')){
            $(this).removeClass('hover').siblings('.nav').hide();
        }else{
            $(this).addClass('hover').siblings('.nav').show();
        }
        e.stopPropagation();
    })

    // 菜单
    if($('#menu dd').length > 0){
        $('#showmenu').show().bind('click', function(){
            if($('#menu').is(':hidden')){
                $(this).addClass('current');
                $('#menu').slideDown();
            }else{
                $(this).removeClass('current');
                $('#menu').slideUp();
            }
        });
    }
}
application.prototype = {
    constructor: app,
    ini: function(){
        if(typeof(this.api) == 'undefined' || this.api.substr(13,4) != 'BEEF'){
            return false;
        }
        // 上下关联页
        if($('[ig-link]').length){
            if($('[ig-link] .prev a').length){ $('[ig-link] .prev a').text('上一篇'); }
            if($('[ig-link] .next a').length){ $('[ig-link] .next a').text('下一篇'); }
        }

        // 公用
        $('[ig-back]').click(function(){ history.go(-1); })
        $('[ig-top]').click(function(){ $('html, body').animate({'scrollTop': 0}, 300); })

        this.ajaxLoading();
        this.scroller();
    },
    map: function(type){
        if(type == 'show'){
            $('#location').css({'visibility': 'visible', 'animation': 'show_smaller .3s ease both'});
        }else if(type == 'hide'){
            $('#location').css({'visibility': 'hidden', 'animation': 'hide_smaller .3s ease both'});
        }
    },
    scroller: function(){
        !function(){
            if($('#banner li').length > 1){
                var $a = $('#banner'), length = $a.find('li').length, vi = 0, wid, t, autoPlayTime = 8000, autoAnimateTime = 500, loop = true;
                var clone = $a.find('li').eq(0).clone().addClass('clone'), tipHtml = '';;
                $a.children('.list').append(clone);
                if(length > 1){
                    for(var i=0; i<length; i++){
                        i == 0 ? tipHtml += '<span class="cur"></span>' : tipHtml += '<span></span>';
                    }
                    $a.children('.tip').show();
                }
                $a.children('.tip').html(tipHtml);
                var _init = function(){
                    wid = $a.width();
                    $a.children('.list').width(wid*(length+1));
                    $a.find('li').width(wid);
                    $a.find('img').css({'width':wid});
                    $a.css({'opacity':1});
                }
                var _func = function(){
                    if(vi >= length){
                        vi = 0;
                        _func();
                    }else{
                        vi++;
                        $a.children('.list').css({'-webkit-transform':'translate3d(-' + wid*vi + 'px, 0px, 0px)', '-webkit-transition':'-webkit-transform ' + autoAnimateTime + 'ms linear'});
                        if(vi == length){
                            $a.children('.tip').children('span').eq(0).addClass('cur').siblings().removeClass('cur');
                            setTimeout(function(){
                                $a.children('.list').css({'-webkit-transform':'translate3d(0px, 0px, 0px)', '-webkit-transition':'-webkit-transform 0ms linear'});
                            }, autoAnimateTime);
                        }else{
                            $a.children('.tip').children('span').eq(vi).addClass('cur').siblings().removeClass('cur');
                        }
                    }
                }
                var _touch = function(){
                    var o_pagex = 0, o_pagey = 0,   // 接触记录值
                        e_pagex = 0, e_pagey = 0;   // 离开记录值
                    $a.bind({
                        'touchstart':function(e){
                            clearInterval(t);
                            o_pagex = e.originalEvent.targetTouches[0].pageX;
                            o_pagey = e.originalEvent.targetTouches[0].pageY;
                        },
                        'touchmove':function(e){
                            e_pagex = e.originalEvent.changedTouches[0].pageX;
                            e_pagey = e.originalEvent.changedTouches[0].pageY;
                            var xpage = e_pagex - o_pagex;   //::负数-向左边滑动::正数-向右边滑动
                            var ypage = e_pagey - o_pagey;
                            if(Math.abs(xpage) > Math.abs(ypage)){
                                if(xpage >= 0){
                                    if(vi <= 0){
                                        $a.children('.list').css({'-webkit-transform':'translate3d(-' + (wid*length - xpage) + 'px, 0px, 0px)', '-webkit-transition':'-webkit-transform 0ms linear'});
                                        vi = length;
                                    }
                                }else{
                                    if(vi >= length){
                                        $a.children('.list').css({'-webkit-transform':'translate3d(0px, 0px, 0px)', '-webkit-transition':'-webkit-transform 0ms linear'});
                                        vi = 0;
                                    }
                                }
                                $a.children('.list').css({'-webkit-transform':'translate3d(-' + (wid*vi - xpage) + 'px, 0px, 0px)', '-webkit-transition':'-webkit-transform 0ms linear'});
                                e.preventDefault();
                            }
                        },
                        'touchend':function(e){
                            $a.children('.list').css({'-webkit-transition':'-webkit-transform ' + autoAnimateTime + 'ms linear'});
                            e_pagex = e.originalEvent.changedTouches[0].pageX
                            e_pagey = e.originalEvent.changedTouches[0].pageY
                            if(Math.abs(e_pagey - o_pagey) > 0 && Math.abs(e_pagex - o_pagex) < 50){
                                vi -=1;
                                _func();
                            }else{
                                if(e_pagex - o_pagex > 0){  // 手指向右边滑动
                                    vi-=2;
                                    _func();
                                }else if(e_pagex - o_pagex < 0){  // 手指向左边滑动
                                    _func();
                                }
                            }
                            t = setInterval(_func, autoPlayTime);
                        }
                    });
                }
                _touch();
                _init();
                t = setInterval(_func, autoPlayTime);
                $(window).resize(_init);
                window.onorientationchange = function() {
                    _init();
                };
            }
        }()
    },
    ajaxLoading: function(){
        var self = this,
            bool = true,
            pageNum = '';
        if(!$('#ajaxLoading').length || !$('.pager').length){ return false; }
        if(!$('.pager span:contains("下一页")').length){ $('#ig-load').show(); }
        $('#ig-load').bind('click', function(){
            bool = false;
            var p = $('.pager a:contains("下一页")'),
                url = p.attr('href');
            if(pageNum == url || !$('.pager a:contains("下一页")').length){
                if(self.nodata == ''){
                    $('#ig-load').hide();
                }else{
                    $('#ig-load').html(self.nodata);
                }
                return false;
            }else{
                pageNum = url
            }
            $.ajax({
                url : url,
                type:'GET',
                dataType:'html',
                beforeSend: function(){
                    $('#ig-load').html('正在努力加载');
                },
                success: function(data){
                    var html = $(data).children('#ajaxLoading .list').html(),
                        pager = $(data).find('.pager  a:contains("下一页")').attr('href');
                    $('#ajaxLoading .list').append(html);
                    if(pager == undefined){
                        $('#ig-load').show().html('已经到底部').unbind();
                    }else{
                        p.attr({'href': pager});
                        $('#ig-load').html('点击加载更多');
                    }
                    bool = true;
                }
            });
        });
    },
    checkForm: function(){
        var _self = this;
        var $form = $('#formPost');
        if($form.find('[name="Name"]').val() == ''){
            alert($form.find('[name="Name"]').attr('null'));
            $form.find('[name="Name"]').focus();
            return false;
        }else if($form.find('[name="Phone"]').val() == ''){
            alert($form.find('[name="Phone"]').attr('null'));
            $form.find('[name="Phone"]').focus();
            return false;
        }else if(!$form.find('[name="Phone"]').val().match(_self.phone)){
            alert($form.find('[name="Phone"]').attr('error'));
            $form.find('[name="Phone"]').focus();
            return false;
        }else if($form.find('[name="Content"]').val() == ''){
            alert($form.find('[name="Content"]').attr('null'));
            $form.find('[name="Content"]').focus();
            return false;
        }else{
            return true;
        }
    }
}
var app = new application();
app.ini();

// 搜索
function searcher(){
    var bool = true, deValue = "请输入关键词搜索！", _search = $("#search"), _searcher = $("#searcher");
    $("#SearchSubmit").click(function(){
        if($("#SearchTxt").val() == "" || $("#SearchTxt").val() == deValue){
            alert(deValue);
        }else{
            search();
        }
    });
    $("#SearchTxt").val(deValue).focus(function(){
        $(this).val("");
    }).blur(function(){
        if($(this).val() == ""){
            $(this).val(deValue);
        }
    });
    if(!$("#skeyLoading").length){  return false }
    var bool = true, aut = 100;
    $(window).scroll(function(){
        if($(window).scrollTop()+$(window).height()>=$(document).height()-aut && bool == true){

            $("#skeyLoading").find(".loadingData").show();
        }
    });
}

function tel400() {
    // 格式化电话号码
    $('[ig-phone]').each(function(index, element){
        var tel400 = $.trim($(this).text()), telLength = tel400.length;
        if(telLength == 11){  // 手机号码 OR 座机号码
            var firstNum = tel400.substr(0,1);
            if(firstNum == 0){
                var tel1 = tel400.substr(0, 4);
                var tel2 = tel400.substr(4, 7);
                tel400 = tel1+ "-" + tel2;
            }else{
                var tel1 = tel400.substr(0, 3);
                var tel2 = tel400.substr(3, 4);
                var tel3 = tel400.substr(7, 4);
                tel400 = tel1+ "-" + tel2 + "-" + tel3;
            }
        }else if(telLength == 12){
            var tel1 = tel400.substr(0, 4);
            var tel2 = tel400.substr(4, 8);
            tel400 = tel1+ "-" + tel2;
        }else if(telLength == 10){
            var tel1 = tel400.substr(0, 3);
            var tel2 = tel400.substr(3, 4);
            var tel3 = tel400.substr(7, 3);
            tel400 = tel1+ "-" + tel2 + "-" + tel3;
        }
        $(this).html(tel400);
    });
}

function casescroll(){
    var n=$("#case").find("li").length,wid=$("#case").find(".box").eq(0).width(),$ul=$("#case").find("ul"),$li=$("#case").find("li"),
        vi = 0, t, autoPlayTime = 3000, autoAnimateTime = 300, loop = true;
    $li.width(wid+"px");$("#case").find("img").width(wid-12+"px");
    $ul.append($li.eq(0).clone());
    $ul.width((n+1)*wid+"px");
    var heig=$li.height();
    $("#case").find(".box").height(heig+10+"px");
    var _func = function(){
        if(vi >= n){
            vi = 1;
            $ul.css({"-webkit-transform":"translate3d(-" + wid*vi + "px, 0px, 0px)", "-webkit-transition":"-webkit-transform " + autoAnimateTime + "ms linear"});
        }else{
            vi++;
            $ul.css({"-webkit-transform":"translate3d(-" + wid*vi + "px, 0px, 0px)", "-webkit-transition":"-webkit-transform " + autoAnimateTime + "ms linear"});
            if(vi == n){
                setTimeout(function(){
                    $ul.css({"-webkit-transform":"translate3d(0px, 0px, 0px)", "-webkit-transition":"-webkit-transform 0ms linear"});
                }, autoAnimateTime);
            }
        }
    }
    // 滑动触发效果
    var _touch = function(){
        var o_pagex = 0,   // 接触记录值
            e_pagex = 0;   // 离开记录值
        $("#case").find(".box").bind({
            "touchstart":function(e){
                clearInterval(t);
                o_pagex = e.originalEvent.targetTouches[0].pageX;
            },
            "touchmove":function(e){
                e_pagex = e.originalEvent.changedTouches[0].pageX;
                var xpage = e_pagex - o_pagex;   //::负数-向左边滑动::正数-向右边滑动
                if(xpage >= 0){
                    if(vi <= 0){
                        $ul.css({"-webkit-transform":"translate3d(-" + (wid*length - xpage) + "px, 0px, 0px)", "-webkit-transition":"-webkit-transform 0ms linear"});
                        vi = n;
                    }
                }else{
                    if(vi >= n){
                        $ul.css({"-webkit-transform":"translate3d(0px, 0px, 0px)", "-webkit-transition":"-webkit-transform 0ms linear"});
                        vi = 0;
                    }
                }
                $ul.css({"-webkit-transform":"translate3d(-" + (wid*vi - xpage) + "px, 0px, 0px)", "-webkit-transition":"-webkit-transform 0ms linear"});
            },
            "touchend":function(e){
                $ul.css({"-webkit-transition":"-webkit-transform " + autoAnimateTime + "ms linear"});
                e_pagex = e.originalEvent.changedTouches[0].pageX
                if(e_pagex - o_pagex > 0){  // 手指向右边滑动
                    vi-=2;
                    _func();
                }else{  // 手指向左边滑动
                    _func();
                }
                t = setInterval(_func, autoPlayTime);
            }
        });
    }
    _touch();  // 手指滑动触发
    t = setInterval(_func, autoPlayTime);
    $("#left").click(function(){
        clearInterval(t);
        _func();
        t = setInterval(_func, autoPlayTime);
    })
    $("#right").click(function(){
        clearInterval(t);
        vi--;
        $ul.css({"-webkit-transform":"translate3d(-" + wid*vi + "px, 0px, 0px)", "-webkit-transition":"-webkit-transform " + autoAnimateTime + "ms linear"});
        if(vi <0){
            vi=n;
            $ul.css({"-webkit-transform":"translate3d(-" + wid*vi + "px, 0px, 0px)", "-webkit-transition":"-webkit-transform " + autoAnimateTime + "ms linear"});
        }
        t = setInterval(_func, autoPlayTime);
    })
}

$(function(){
    searcher();
    tel400();
    casescroll();
});
