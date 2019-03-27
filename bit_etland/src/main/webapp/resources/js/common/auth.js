var auth = auth || {};
auth = (()=>{
	let _,js,compojs,r_cnt ,l_cnt;
	
	let init = ()=>{
		_ = $.ctx();
        js = $.js();
        compojs = js+'/component/compo.js';
        r_cnt = '#right_content';
        l_cnt = '#left_content';
				
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView = ()=>{
		$.getScript(compojs)
		.done(()=>{
			$(l_cnt +' > .nav').empty();
			$(r_cnt).html(compo.cust_login_form());
			login();
			let arr = [
				{name :'login',text :'로그인'},
				{name :'sign',text :'회원가입'},
				{name :'regist',text :'사원등록'},
				{name :'access',text :'사원로그인'}];
			$.each(arr,(i,j)=>{
				$('<li><a>'+j.text+'</a></li>')
				.appendTo(l_cnt +' > .nav')
				.attr('name',j.name)
				.click(function(){
					let that = $(this).attr('name');
					switch(that){
					case 'login':
						$(r_cnt).empty();
						$(compo.cust_login_form()).appendTo(r_cnt);
						login();
						break;
					case 'sign':
						$(r_cnt).empty();
						$(compo.cust_join_form()).appendTo(r_cnt);
						break;
					case 'regist':
						$(r_cnt).empty();
						$(compo.cust_login_form()).appendTo(r_cnt);
						break;
					case 'access':
						$(r_cnt).empty();
						$(compo.cust_login_form()).appendTo(r_cnt);
						break;
					}
				});
			})
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
		let login = ()=>{
			 $('form button[type=submit]').click(e=>{
	              let data = {
	                        customerID:$('form  input[name=uname]').val(),
	                        password:$('form  input[name=psw]').val()};
	               $.ajax({
	                    url : _+'/cust/login',
	                    type : 'POST',
	                    dataType : 'json',
	                    data : JSON.stringify(data),
	                    contentType : 'application/json',
	                    success : d =>{
	                         alert('success '+d.customerID);
	                    },
	                    error : e=>{
	                         alert('실패');
	                    }
	               });
	           });
	};
	let join = ()=>{
		$.getScript(compojs)
		.done(()=>{
			$(r_cnt).html(compo.cust_join_form());
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	let mypage = ()=>{};
	return {init : init};
})();
