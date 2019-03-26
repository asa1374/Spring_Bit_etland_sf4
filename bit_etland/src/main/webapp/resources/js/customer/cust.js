var cust = cust || {}
cust.permission = (()=>{
	let login = ()=>{
		alert('로그인들어옴');
		$('#left_content > .nav').empty();
		let arr = [
			{name :'login',text :'로그인'},
			{name :'sign',text :'회원가입'},
			{name :'regist',text :'사원등록'},
			{name :'access',text :'사원로그인'}];
		
		$.each(arr,(i,j)=>{
			$('<li><a>'+j.text+'</a></li>')
			.appendTo('#left_content > .nav')
			.attr('name',j.name)
			.click(function(){
				let that = $(this).attr('name');
				switch(that){
				case 'login':
					$(compo.cust_login_form()).appendTo('#right_content');
					break;
				case 'sign':
					$(compo.cust_join_form()).appendTo('#right_content');
					break;
				case 'regist':
					$(compo.cust_login_form()).appendTo('#right_content');
					break;
				case 'access':
					$(compo.cust_login_form()).appendTo('#right_content');
					break;
				}
			});
		})
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			$('#right_content').html(compo.cust_login_form());
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	let join = ()=>{
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			$('#right_content').html(compo.cust_join_form());
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	let mypage = ()=>{};
	return {
		login : login,
		join : join,
		mypage : mypage
	};
})();
