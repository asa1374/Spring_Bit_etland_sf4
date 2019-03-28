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
		$.getScript($.js()+'/component/compo.js')
		.done(()=>{
			$('#right_content').html(compo.cust_mypage(d));
			$('#update').click(e=>{
				e.preventDefault();
				$('#right_content').html(compo.cust_update_form(d));
				$('#my_update').click(e=>{
					e.preventDefault();
					update();
				});
			});
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	let update = ()=>{
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
			url: $.ctx()+'/users/cust/u',
			type:'PUT',
			data:JSON.stringify(data),
			dataType:'json',
			contentType:'application/json',
			success:d=>{
				if(d.customerID!==''){
					alert('업데이트 성공');
					$('#right_content').html(compo.cust_mypage(d));
				}else{
					alert('업데이트 실패하였습니다.');
				}
			},
			error:e=>{
				alert('실패하였습니다.');
			}
		});
	};
	return {init : init,mypage:mypage};
})();

