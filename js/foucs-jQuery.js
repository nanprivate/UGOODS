;(function($){
	var MainFun = function(poster){
		var self = this;

		this.poster = poster;
		this.posterMain = poster.find("#pic_list");
		this.posterItems = poster.find("img.i-list");
		this.nextBtn = poster.find("i#next");
		this.prevBtn = poster.find("i#prev");
		this.bottomBtns = poster.find("#button_list");
		this.bottomBtnItem = poster.find("span");	
		
		// console.log(n)
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		this.index = 0;
		this.flag = false;
		this.timer;
		//默认配置参数
		this.setting = {
			"width":600,
			"height":370,
			"speed":500,
			"autoPlay":false,
			"delay":3000
		};


		$.extend(this.setting,this.getSetting());
		n =this.posterItems.length;
		w =this.setting.width;
		this.setSettingValue();

		this.nextBtn.click(function(){
			if(!self.flag){
				self.flag = true;
				if(self.index == n-1){
					self.index = 0;
				}else{
					self.index += 1; 
				}
				self.animateFn(w);
				self.showButton();
			}

		});

		this.prevBtn.click(function(){
			if(!self.flag){
				self.flag = true;
				if(self.index == 0){
					self.index = n-1;
				}else{
					self.index -= 1; 
				}
				self.animateFn(-w);
				self.showButton();
			}	
		});

	    this.bottomBtnItem.each(function(i){
	    	$(this).click(function(){
				if(this.className == 'on'){
					return false;
				}
			var offset = w * (i - self.index);
			self.animateFn(offset);
			self.index = i;
			self.showButton();
	    	})
	    });

	    if(this.setting.autoPlay){
	    	this.play();
	    	this.poster.hover(function(){
	    		self.stop();
	    	},function(){
	    		self.play();
	    	})
	    };
	};
	MainFun.prototype = {
		showButton:function(){
			var self = this;
			self.bottomBtnItem.each(function(i){
				if($(this).attr("class") == "on"){
		            $(this).attr("class","");
		            return false;
				}
			});
			self.bottomBtnItem[self.index].className = 'on';
		},
		animateFn:function(dir){
			var _this_ =this;
			var oldLeft = parseInt(this.posterMain.css("left"));
			// console.log(_this_.flag)
			if(dir === w){
				if(oldLeft < -w*(n-2)){
					this.posterMain.animate({
					left: "0px"
					},_this_.setting.speed,function(){
						_this_.flag = false;
					});
				}else{
				this.posterMain.animate({
					left:"-="+w+"px"
					},_this_.setting.speed,function(){
						_this_.flag = false;
					});
				}
			}else if(dir === -w){
				if(oldLeft > -w){
					this.posterMain.animate({
					left:(n-1)*-w + "px"
					},_this_.setting.speed,function(){
						_this_.flag = false;
					});
				}else{
				this.posterMain.animate({
					left:"-="+-w+"px"
					},_this_.setting.speed,function(){
						_this_.flag = false;
					});
				}
			}else{
				this.posterMain.animate({
					left:"-="+dir+"px"
				},_this_.setting.speed,function(){
					_this_.flag = false;
				})
			};
		},

		play:function(){
			var self = this;
			self.timer = setInterval(function(){
				self.nextBtn.click();
			},self.setting.delay);
		},

		stop:function(){
			var self =this;
			clearInterval(self.timer);
		},

		setSettingValue:function(){

			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterMain.css({
				width:n*this.setting.width,
				height:this.setting.height
			});
			this.posterItems.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.nextBtn.css({
				lineHeight:w/12+"px",
				width:w/12,
				height:w/12,
				top:this.setting.height/2 - w/24,
				fontSize:w/16,
				right:w/30
			});
			this.prevBtn.css({
				lineHeight:w/12+"px",
				width:w/12,
				height:w/12,
				top:this.setting.height/2 - w/24,
				fontSize:w/16,
				left:w/30
			});
			this.bottomBtns.css({
				width:"30%",
				height:this.setting.height/37,
				bottom:w/30,
				left:(w-w/4)/2
			});
			this.bottomBtnItem.css({
				maxWidth:"10%",
				height:this.setting.height/37,
				marginLeft:((w/(4*n))-(w/60))/2,
				marginRight:((w/(4*n))-(w/60))/2 
			})
		},
		getSetting:function(){
			var setting = this.poster.attr('data-setting');
			if(setting&&setting!=""){
				return $.parseJSON(setting);
			}else{
				return {};
			};
		}
	};
	MainFun.init = function(posters){
		var _this = this;
		posters.each(function(){
			new _this($(this));
		})
	};
	window.MainFun = MainFun;
})(jQuery);