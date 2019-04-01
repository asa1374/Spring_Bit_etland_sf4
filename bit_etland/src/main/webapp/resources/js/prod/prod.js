var prod = prod || {};
prod = (()=>{
	let _,js,compojs,r_cnt ,l_cnt;
	let init = ()=>{
		_ = $.ctx();
        js = $.js();
        compojs = js+"/component/compo.js";
        r_cnt = "#right_content";
        l_cnt = "#left_content";
		onCreate();
	};
	let onCreate =()=>{
		setContentView();
	};
	let setContentView =()=>{
		$.getScript(compojs,()=>{
			shop();
			//post();
		});
	};
	let post = ()=>{
		$(r_cnt).html(compo.prod_post());
	};
	let get = ()=>{
		
	};
	let put = ()=>{
		
	};
	let del = ()=>{
		
	};
	let shop = ()=>{
		$(r_cnt).html(compo.carousel());
		$('#prod1').attr('src',$.img()+"/한지민.jpg").css('width','600px');
		$('#prod2').attr('src',$.img()+"/한효주.jpeg").css('width','600px');
		$('#prod3').attr('src',$.img()+"/해서웨이.jpg").css('width','600px');
	};
	return {init:init};
})();