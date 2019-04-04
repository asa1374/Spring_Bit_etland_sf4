"use strict";
var emp = emp || {};
emp = (()=>{
	let _,js,compojs,r_cnt ,l_cnt,prodjs;
	
	let path = ()=>{
		_ = $.ctx();
        js = $.js();
        compojs = js+"/component/compo.js";
        prodjs = js+"/prod/prod.js";
        r_cnt = "#right_content";
        l_cnt = "#left_content";
	};
	let init = ()=>{
		path();
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView = ()=>{
		$.getScript(compojs,()=>{
			$(l_cnt +" > .nav").empty();
			$('#l_nav_con').text('창준s 프로젝트');
			
			$.each(emp_nav(),(i,j)=>{
				$('<li><a>'+j.text+'</a></li>')
				.appendTo(l_cnt+' .nav')
				.attr('name',j.name)
				.click(function (){
					let that = $(this).attr('name');
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					switch(that){
					case 'cus_list':
						
						break;
					case 'pro_regi':
						$.getScript(prodjs,()=>{
							prod.post();
						});
						break;
					case 'pro_list':
						$.getScript(prodjs,()=>{
							prod.get();
						});
						break;
					case 'pro_update':
						
						break;
					case 'pro_delete':
						
						break;
					case 'pro_stati':
						
						break;
					}
				});
			});
			$('.nav li[name=cus_list]').addClass('active');
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	let emp_nav = () => { 
			return [{name :"cus_list",text :"고객 목록"},
			{name :"pro_regi",text :"상품 등록"},
			{name :"pro_list",text :"상품 목록"},
			{name :"pro_update",text :"상품 수정"},
			{name :"pro_delete",text :"상품 삭제"},
			{name :"pro_stati",text :"상품 통계"}];
	};
	let pro_regi = ()=>{
		$(r_cnt).html(compo.product_post());
		
	};
	return {init:init};
})();