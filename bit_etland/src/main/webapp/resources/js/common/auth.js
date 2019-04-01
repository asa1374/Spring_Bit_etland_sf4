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
			let arr = [
				{name :"login",text :"로그인"},
				{name :"join",text :"회원가입"},
				{name :"regist",text :"사원등록"},
				{name :"access",text :"사원로그인"}];
			$.each(arr,(i,j)=>{
				$('<li><a>'+j.text+'</a></li>')
				.appendTo(l_cnt +' > .nav')
				.attr('name',j.name)
				.click(function(){
					let that = $(this).attr('name');
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					switch(that){
					case 'login':
						$(r_cnt).empty();
						$(compo.cust_login_form()).appendTo(r_cnt);
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
						});
						break;
					case 'join':
						$(r_cnt).empty();
						$(compo.cust_join_form()).appendTo(r_cnt);
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							join();
						});
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
			$('.nav li[name=login]').addClass('active');
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
                url : _+'/customers/'+data.customerID,
                type : 'POST',
                data : JSON.stringify(data),
                dataType : 'json',
                contentType : 'application/json',
                success : d=>{
                	if(d.customerID!==''){
                		$.getScript($.js()+"/cust/cust.js")
                		.done(()=>{
                			cust.init(d);
                			cust.mypage(d);
                		})
                		.fail(()=>{
                			alert('cust/cust.js 를 찾지 못했다.');
                		});
                	}else{
                		alert('error');
                	}
                },
                error : e=>{}
           });
	};
	let join = ()=>{
			let data = {
					customerID:$('form input[name=customerID]').val(),
					password:$('form input[name=password]').val(),
					customerName:$('form input[name=customerName]').val(),
					ssn:$('form input[name=ssn]').val(),
					phone:$('form input[name=phone]').val(),
					city:$('form input[name=city]').val(),
					address:$('form input[name=address]').val(),
					postalCode:$('form input[name=postalCode]').val()
			};
			alert(data.customerID);
			$.ajax({
				url:_+'/customers/'+data.customerID,
				type:'POST',
				data:JSON.stringify(data),
				dataType:'json',
				contentType:'application/json',
				success:d=>{
					if(d.s==='s'){
						alert('회원가입을 축하드립니다.');
						$(r_cnt).html(compo.cust_login_form());
						$('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
						});
					}else{
						alert('회원가입에 실패하였습니다.');
						$(r_cnt).html(compo.cust_join_form());
						join();
					}
				},
				error:e=>{
					alert('회원가입에 실패하였습니다.');
				}
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
	let regist = ()=>{
		let data = {
		employeeID:$('form input[name=employeeID]').val(),
		manager:$('form input[name=manager]').val(),
		name:$('form input[name=name]').val(),
		birthDate:$('form input[name=birthDate]').val(),
		note:$('form input[name=note]').val()
		};
		alert(data.customerID);
		$.ajax({
			url:_+'/emp/',
			type:'POST',
			data:JSON.stringify(data),
			dataType:'json',
			contentType:'application/json',
			success:d=>{
				if(d.s==='s'){
					alert('등록을 성공했다.');
					$(r_cnt).html(compo.cust_login_form());
					$('form button[type=submit]').click(e=>{
						e.preventDefault();
						login();
					});
				}else{
					alert('등록에 실패하였습니다.');
					$(r_cnt).html(compo.cust_join_form());
					join();
				}
			},
			error:e=>{
				alert('등록 실패하였습니다.');
			}
		});
	};
	/*let update = ()=>{
		let data = {
				customerID:$('form input[name=customerID]').val(),
				password:$('form input[name=password]').val(),
				customerName:$('form input[name=customerName]').val(),
				ssn:$('form input[name=ssn]').val(),
				phone:$('form input[name=phone]').val(),
				city:$('form input[name=city]').val(),
				address:$('form input[name=address]').val(),
				postalCode:$('form input[name=postalCode]').val()
		};
		alert(data.customerID);
		$.ajax({
			url:_+'/cust/u',
			type:'PUT',
			data:JSON.stringify(data),
			dataType:'json',
			contentType:'application/json',
			success:d=>{
				if(d.customerID!==''){
					alert('업데이트 성공');
					$(r_cnt).html(compo.cust_mypage(d));
				}else{
					alert('업데이트 실패하였습니다.');
				}
			},
			error:e=>{
				alert('실패하였습니다.');
			}
		});
	};*/
	let access = ()=>{
		let data = {
				employeeID:$('form  input[name=uname]').val(),
				name:$('form  input[name=psw]').val()};
       $.ajax({
            url : _+'/users/emp/'+data.employeeID,
            type : 'POST',
            data : JSON.stringify(data),
            dataType : 'json',
            contentType : 'application/json',
            success : d=>{
            	if(d.customerID!==''){
            		alert('success');
            		$(r_cnt).html(compo.cust_mypage(d));
            		$('#update').click(e=>{
						e.preventDefault();
						$(r_cnt).html(compo.cust_update_form(d));
						$('#my_update').click(e=>{
							e.preventDefault();
							update();
						});
					});
            	}else{
            		alert('error');
            	}
            },
            error : e=>{}
       });
	};
	return {init : init};
})();
