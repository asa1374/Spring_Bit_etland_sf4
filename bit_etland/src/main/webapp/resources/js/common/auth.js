var auth = auth || {};
auth = (()=>{
	let _,js,compojs,r_cnt ,l_cnt;
	
	let init = ()=>{
		_ = $.ctx();
        js = $.js();
        compojs = js+"/component/compo.js";
        r_cnt = "#right_content";
        l_cnt = "#left_content";
		onCreate();
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView = ()=>{
		$.getScript(compojs)
		.done(()=>{
			$(l_cnt +" > .nav").empty();
			$(r_cnt).html(compo.cust_login_form());
			$('form button[type=submit]').click(e=>{
				e.preventDefault();
				login();
			});
			login();
			let arr = [
				{name :"login",text :"로그인"},
				{name :"sign",text :"회원가입"},
				{name :"regist",text :"사원등록"},
				{name :"access",text :"사원로그인"}];
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
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
						});
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
          let data = {
                    customerID:$('form  input[name=uname]').val(),
                    password:$('form  input[name=psw]').val()};
           $.ajax({
                url : _+'/cust/login',
                type : 'POST',
                dataType : 'json',
                data : JSON.stringify(data),
                contentType : 'application/json',
                success : d=>{
                	if(d.customerID!==''){
                		alert('success');
                		$(r_cnt).html(compo.cust_mypage());
                		//$(compo.cust_mypage()).appendTo(r_cnt);
                	}else{
                		alert('error');
                	}
                },
                error : e=>{}
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
	let mypage = ()=>{
		$.getScript(compojs)
		.done(()=>{
			$(r_cnt).html(compo.cust_mypage());
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	return {init : init};
})();
