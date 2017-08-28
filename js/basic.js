         //登录注册切换
$(function(){
            //整体框出现，背景变化
            var bigShow = function(){
               $('.passport-iframe-shadow').css('display','block');
               $('#login').css('display','block');
            }
            //登录页
            var loginShow =function(){
               $('.l-body form .signup-group').addClass("hide");
               $('.l-body form .login-group').removeClass("hide");
            }
            //注册页
            var signupShow =function(){
               $('.l-body form .login-group').addClass("hide");
               $('.l-body form .signup-group').removeClass("hide");
            }
            //首页登录按钮点击时
            $('.bar_ul .login_btn').click(function(){
               bigShow();
               $('.login-btn').addClass("active");
               $('.login-btn').next().removeClass("active");
               loginShow();
            });
            //首页注册按钮点击时
            $('.bar_ul .signup_btn').click(function(){
               bigShow();
               $('.signup-btn').addClass("active");
               $('.signup-btn').prev().removeClass("active");
               signupShow();
            })
            //关闭按钮
            $('.close').click(function(){
               $('.passport-iframe-shadow').css('display','none');
               $('#login').css('display','none');
            })
            //登录注册页面按钮转换
            $('.l-header span').click(function(){
               $(this).addClass("active");
               $(this).siblings().removeClass("active");
            })
            $('.login-btn').click(function(){
               loginShow();
            })
            $('.signup-btn').click(function(){
               signupShow();
            })

         //回到顶部
            $('.wechat').hover(function(){
               $('.wechat-pic').filter(':not(:animated)').fadeIn();
               },
               function(){
                  $('.wechat-pic').fadeOut();
               }
            )
            if($(this).scrollTop()==0){
               $('.return').hide();
            }
            $(window).scroll(function(event){
               if($(this).scrollTop()==0){
                  $(".return").hide();
               }
               if($(this).scrollTop()!=0){
                  $(".return").show();
               }
            })
            $(".return").click(function(event){
                     /* Act on the event */
                  $("html,body").animate({scrollTop:"0px"},500)
            });
})