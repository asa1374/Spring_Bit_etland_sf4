var cust = cust || {}
cust = (()=>{
	let init = ()=>{
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView = ()=>{
		mypage();
	};
	let mypage = (d)=>{
		$.getScript($.js+'/component/compo.js')
		.done(()=>{
			$('#right_content').html(compo.cust_mypage(d));
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	return {init : init,mypage:mypage};
})();