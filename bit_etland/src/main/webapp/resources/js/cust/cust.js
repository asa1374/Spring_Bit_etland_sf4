var cust = cust || {}
cust = (()=>{
	let _,js,compojs,r_cnt ,l_cnt,prodjs;
	
	let path = ()=>{
		_ = $.ctx();
        js = $.js();
        compojs = js+"/component/compo.js";
        empjs = js+"/emp/emp.js";
        prodjs = js+"/prod/prod.js";
        r_cnt = "#right_content";
        l_cnt = "#left_content";
	};
	
	let init = (d)=>{
		path();
		onCreate(d);
	};
	let onCreate = (d)=>{
		setContentView(d);
	};
	let setContentView = (d)=>{
		cus_nav(d);
	};
	let cus_nav = (d) =>{
		$.getScript(compojs)
		.done(()=>{
			$(l_cnt +" > .nav").empty();
			let arr = [
				{name :"mypage",text :"마이페이지"},
				{name :"update",text :"정보수정"},
				{name :"leave",text :"회원탈퇴"},
				{name :"shop",text :"쇼핑몰"},
				{name :"history",text :"구매내역"},
				{name :"basket",text :"장바구니"}];
			mypage(d);
			$.each(arr,(i,j)=>{
				$('<li><a>'+j.text+'</a></li>')
				.appendTo(l_cnt+' .nav')
				.attr('name',j.name)
				.click(function (){
					let that = $(this).attr('name');
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
					switch(that){
					case 'mypage':
						mypage(d);
						break;
					case 'update':
						$('#right_content').html(compo.cust_update_form(d));
						$('#my_update').click(e=>{
							e.preventDefault();
							update();
						});
						break;
					case 'leave':
						
						break;
					case 'shop':
						$.getScript(prodjs,()=>{
							prod.init();
						})
						.fail(()=>{
							alert('실패');
						});
						break;
					case 'history':
						
						break;
					case 'basket':
						
						break;
					}
				});
			});
			$('.nav li[name=mypage]').addClass('active');
		})
		.fail(()=>{
			alert('component/compo.js 를 찾지 못했다.');
		});
	};
	let mypage = (d)=>{
		$.getScript(compojs)
		.done(()=>{
			$('#right_content').html(compo.cust_mypage(d));
			$('#myphoto').attr('src',$.img()+'/chang.jpg');
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
			url: $.ctx()+'/customers/'+data.customerID,
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
	let list = (x)=>{
		path();
		$('#customers').empty();
		$.getScript(empjs,()=>{
			emp.emp_nav();
		});
		$.getJSON( _+'/customers/page/'+x,d=>{
			alert(x+'번페이지로 간다잉');
			$('#r_con').text('고객 목록');
			$.each(d.ls,(i,j)=>{
				$('<tr> <td>'+j.rownum+'</td><td>'+j.customerID+'</td><td> '+j.customerName+'</td><td>'+j.ssn+'</td><td> '+j.phone+'</td><td>'+j.city
						+'</td><td>'+j.address+'</td><td>'+j.postalCode+'</td>').appendTo('#customers');
			});
			html = '<div class="pagination">';
			if(d.pxy.existPrev){
				html += '<a href="${ctx}/customer.do?cmd=cus_list&page=list&page_size=5&page_num=${pagination.prevBlock}" >&laquo;</a>';
			}
			for(let i=d.pxy.startPage;i<=d.pxy.endPage;i++){
				if(d.pxy.pageNum){
					html += '<a href="#" class="page active">'+i+'</a>';
				}else{
					html += '<a href="#" class="page">'+i+'</a>';
				}
			}
			if(d.pxy.existnext){
				html += '<a href="${ctx}/customer.do?cmd=cus_list&page=list&page_size=5&page_num=${pagination.nextBlock}" class="posblock">&raquo;</a>';
			}
			html += '</div>';
			
			$('#pagination').empty();
			$(html).appendTo('#pagination');
			
			$('.page').each(function(i){
				$(this).click(function(){
					alert(i+1+'번 클릭함');
					list(i+1);
				});
			});
		});
	};
	return {init : init,mypage:mypage,cus_nav:cus_nav,list:list};
})();

