$(function(){
			//左侧下拉菜单折叠效果
			$('#navList').on('click','li a.link-common',function(e){
					if(!$(this).siblings())return;
					$('#navList li .link-common').not(this).removeClass('active');
					$('.icon-zuo.hover').removeClass('hover');
					$('.nav-menu .link-detail').removeClass('hover');
					$('#navList .nav-menu').slideUp(500).siblings().removeClass('active');
					$('.iconfont.icon-zuo').removeClass('icon-hover');
					$(this).children('.iconfont.icon-zuo').addClass('icon-hover');
					if($(this).siblings().css('display')=='block'){
						$(this).removeClass('active').siblings().slideUp(500);
						$(this).children('.iconfont.icon-zuo').removeClass('icon-hover');
					}else{
						$(this).toggleClass('active').siblings().slideToggle(500);
					}
					
					$(this).parent().hover(function(){
						if(parseFloat($(this).css('width'))<230){
							$(this).children('.nav-menu').css('display','block');
						}
						
					},function(){
						if(parseFloat($(this).css('width'))<230){
							$(this).children('.nav-menu').css('display','none');
						}
					});
			});
			//左侧菜单栏向左收起向右展出效果
			$('.navbar-menu').click(function(e){
				e.preventDefault();
				$('#navList .nav-menu').removeAttr('style').siblings().removeClass('active');
				//console.log(document.body.clientWidth);
				$('.navbar-brand').toggleClass('hover');
				$('.con-sidebar').toggleClass('hover');
				$('.con-main').toggleClass('hover');
				//console.log(!!$('.navbar-brand').hasClass('hover'));
				if(!!$('.navbar-brand').hasClass('hover')){
					//alert($('.con-sidebar').css('width'));
					$('.navbar-brand').children('.logo-lg').addClass('hidden-sm').siblings().removeClass('hidden-sm');
					if($('#navList .icon-zuo').hasClass('icon-hover')){
						$('#navList .icon-zuo.icon-hover').parent().siblings().slideUp(0);
					}
				}else{
					$('.navbar-brand').children('.logo-mini').addClass('hidden-sm').siblings().removeClass('hidden-sm');
					$('#navList .icon-zuo.icon-hover').parent().addClass('active').siblings().slideDown(0);
				};
				$('.con-sidebar').hasClass('hover')?$('.con-main').css('margin-left',""):$('.con-main').css('margin-left',"230px");
			});
			//左侧labels菜单折叠效果
			$('.labels-sidebar .header-sidebar').click(function(){
				var $this=$(this);
				var $children=$this.children('.iconfont');
				$children.toggleClass('icon-hover');
				$children.hasClass('icon-hover')?$this.siblings().stop(true,true).slideDown(500):$this.siblings().slideUp(500);
			})
			var keyWords;
			var srchMenuObj={			
				init:function(){
					var me=this;
					$('#btnSrch').click(function(){
							me.srchMenu();
					});
					document.onkeydown=function(e){
						//e.preventDefault();
						var e=e||window.event;
						var keycode=e.keyCode||e.charCode;
						if(keycode==13&&$('#srchKeywords').is(':focus')){
							me.srchMenu();
						}
					}
				},
				srchMenu:function(){
					var me=this;
					keyWords=$('#srchKeywords').val();
					if(!keyWords){
						$('#srchKeywords').blur();
						dialog.alert({
							content:'请输入你要查找的菜单名字',
							modal:true,
							position:'absolute'
						});
						return;
					}
					var matchData=$('#navList>li');
					//一次过滤
					var foundData=matchData.filter(this.isFirData);
					$('.link-detail').removeClass('hover');
					$('.link-common').removeClass('active').children('.icon-zuo').removeClass('icon-hover');
					matchData.children('.nav-menu').slideUp(0);
					//匹配到的菜单展开
					if(foundData&&foundData.length){
						foundData.each(function(i,v){
							if(!$(v).children('.nav-menu').length){
								$(v).children('.link-common').addClass('active');
								return;
							}
							$(v).children('.nav-menu').slideDown().siblings().children('.icon-zuo').addClass('icon-hover');
							//二次过滤
							var secResult=$(v).find('.link-detail').filter(me.isSecData);
							if(secResult&&!secResult.length)$(v).children('.link-common').addClass('active');
							secResult.each(function(idx,val){
								$(val).addClass('hover').parent().parents('li').children('.link-detail').removeClass('hover');
								$('#navList li .link-common').removeClass('active');
							});
						});
					}else{
						$('#srchKeywords').blur();
						dialog.alert({
							content:"匹配不到任何菜单，请重新输入"
						})
						$('#navList li .link-detail').removeClass('hover');
						$('#navList li .link-common').removeClass('active');
					}
				},
				isFirData:function(k,v){//一次过滤搜索关键词不匹配的内容
					var parentMenu=$(v).find('.nav-text'),
					 childMenu=$(v).find('.link-detail'),
					 parentRes=parentMenu.text().toLowerCase().match(keyWords.toLowerCase());
					//console.log(!$(v).children('.nav-menu')[0],$(v).children(''));
					if(parentRes){
						return parentRes!=null;
					}
					if(!$(v).children('.nav-menu').length){
						return parentRes!=null;
					}
					return childMenu.text().toLowerCase().match(keyWords.toLowerCase())!=null;
				},
				isSecData:function(k,v){//二次过滤搜索关键词不匹配的内容
					return $(v).text().toLowerCase().match(keyWords.toLowerCase())!=null;
				}

			}
			srchMenuObj.init();

			//获取右侧内容区域的宽度
			$('#iframe').load(function(){
				function txtInnerWidthCalc(){
					var mainWidth=$('#conMain').innerWidth(),
					mainPaddingLR=parseFloat($('#conMain').css('padding-left'))+parseFloat($('#conMain').css('padding-right')),
					mainPaddingTB=parseFloat($('#conMain').css('padding-top'))+parseFloat($('#conMain').css('padding-bottom'));
					calcWidth=mainWidth-mainPaddingLR;
					if(arguments.length<1){
						iframeHeight=$("#iframe").contents().find('body')[0].scrollHeight;
						$('#iframe').css({'height':iframeHeight});
					}
					$('#conMain').css('height',iframeHeight+mainPaddingTB);
					$('#iframe').css({'width':calcWidth});
				}
				txtInnerWidthCalc();
				$(window).resize(function(){
					txtInnerWidthCalc(false);
				});
			})
	});