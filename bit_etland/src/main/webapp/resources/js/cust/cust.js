"use strict";
var cust = cust || {}
cust = (()=>{
	let _,js,compojs,r_cnt ,l_cnt,prodjs,empjs;
	
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
		$.getScript(compojs)
		.done(()=>{
			$(l_cnt +" > .nav").empty();
			mypage(d);
			$('#search_btn').click(()=>{
				alert('검색 버튼을 눌러버렸따잉  검색어는 : ' +$('#search_word').val());
				let arr = {y : '1',x:$('#search_word').val()}
				search(arr);
			});
			$.each(cus_nav(),(i,j)=>{
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
	let search = (arr) =>{
		$.getJSON(_+'/transaction/'+arr.y+'/'+arr.x,d=>{
			if(d.s==='s'){
				alert('보내기 성공');
				$('#right_content').empty();
				$('<div id="prod_serch_list">'
				+'<h2>검색된 상품 목록</h2>'
				+'<button id="grid_btn">그리드로 보기</button>'
				+'</div>'
				+'<div class="center"><div id="pagination" class="pagination"></div></div>'
				).appendTo('#right_content');
				
				let table = '<table id="search_prod">'
					+'  <tr>'
					+'    <th>No.</th>'
					+'    <th>상품이름</th>'
					+'    <th>제조사이름</th>'
					+'    <th>상품수량</th>'
					+'    <th>상품가격</th>'
					+'  </tr>';
				$.each(d.ls,(i,j)=>{
					table += '<tr> <td>'+j.color+'</td><td>'+j.productName+'</td><td>'
					+j.supplierID+'</td><td>'+j.unit+'</td><td> '+j.price+'</td>';
				});
				
				table +='</table>';
				$(table)
				.addClass('w3-table-all')
				.appendTo('#prod_serch_list');
				
				if(d.pxy.existPrev){
					$('<a class="preblock">&laquo;</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(()=>{
						let a={y:d.pxy.prevBlock,x:arr.x};
						search(a);
					});
				}
				let i=0;
				for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
					if(d.pxy.pageNum){
						$('<a class="page active">'+i+'</a>')
						.addClass('cursor')
						.appendTo('#pagination')
						.click(function(){
							let a={y:$(this).text(),x:arr.x};
							search(a);
						});
					}else{
						$('<a class="page">'+i+'</a>')
						.addClass('cursor')
						.appendTo('#pagination')
						.click(function(){
							let a={y:$(this).text(),x:arr.x};
							search(a);
						});
					}
				}
				if(d.pxy.existnext){
					$('<a class="posblock">&raquo;</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(function(){
						let a={y:d.pxy.nextBlock,x:arr.x};
						search(a);
					});
				}
				
				$('#grid_btn').click(e=>{
					e.preventDefault();
					alert('그리드버튼 클릭');
					let a = {y:1,x:arr.x}
					grid_list(a);
				});
			}
		});
	};
	let grid_list = arr =>{
		$.getJSON(_+'/phones/'+arr.y+'/'+arr.x,d=>{
			$('#right_content').empty();
			$('<button id="list_btn">리스트로 보기</button>'
				+'<div class="grid"></div>'
				+'<div class="center"><div id="pagination" class="pagination"></div></div>'
			).appendTo('#right_content');
				let grid = '<div id="grid_images" class="row">';
				$.each(d.ls,(i,j)=>{
					grid +='<div class="col-md-4">' 
						+'<div class="thumbnail">'
					      	+'<a href="#" target="_blank">'
					      		+'<img src="https://img.insight.co.kr/static/2018/07/21/700/cdt6jm54pmm377qokn80.jpg" alt="Lights" style="width:100%">'
					      		+'<div class="caption">'
					      			+'<p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>'
					      		+'</div>'
					      	+'</a>'
					      +'</div>'
					+'</div>';
				});
				grid +='</div>';
				$(grid)
				.appendTo('.grid');
				
				if(d.pxy.existPrev){
					$('<a class="preblock">&laquo;</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(()=>{
						let a={y:d.pxy.prevBlock,x:arr.x};
						grid_list(a);
					});
				}
				let i=0;
				for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
					if(d.pxy.pageNum){
						$('<a class="page active">'+i+'</a>')
						.addClass('cursor')
						.appendTo('#pagination')
						.click(function(){
							let a={y:$(this).text(),x:arr.x};
							grid_list(a);
						});
					}else{
						$('<a class="page">'+i+'</a>')
						.addClass('cursor')
						.appendTo('#pagination')
						.click(function(){
							let a={y:$(this).text(),x:arr.x};
							grid_list(a);
						});
					}
				}
				if(d.pxy.existnext){
					$('<a class="posblock">&raquo;</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(function(){
						let a={y:d.pxy.nextBlock,x:arr.x};
						grid_list(a);
					});
				}
				$('#list_btn').click(e=>{
					e.preventDefault();
					alert('리스트버튼 클릭');
					let a = {y:1,x:arr.x}
					search(a);
				});
		});
	};
	let cus_nav = () =>{
		return [{name :"mypage",text :"마이페이지"},
			{name :"update",text :"정보수정"},
			{name :"leave",text :"회원탈퇴"},
			{name :"shop",text :"쇼핑몰"},
			{name :"history",text :"구매내역"},
			{name :"basket",text :"장바구니"}];
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
			emp.init();
		});
		$.getJSON( _+'/customers/page/'+x,d=>{
			$('#right_content').empty();
			$('<div id="cust_list">'
			+'<h2>사원 리스트</h2>'
			+'</div>'
			+'<div class="center"><div id="pagination" class="pagination"></div></div>'
			).appendTo('#right_content');
			let table = '<table id="customers">'
			+'  <tr>'
			+'    <th>No.</th>'
			+'    <th>아이디</th>'
			+'    <th>이름</th>'
			+'    <th>생년월일</th>'
			+'    <th>전화번호</th>'
			+'    <th>주소</th>'
			+'    <th>상세주소</th>'
			+'    <th>우편번호</th>'
			+'  </tr>';
			$.each(d.ls,(i,j)=>{
				table += '<tr> <td>'+j.rownum+'</td><td>'+j.customerID+'</td><td> '+j.customerName+'</td><td>'+j.ssn+'</td><td> '+j.phone+'</td><td>'+j.city
						+'</td><td>'+j.address+'</td><td>'+j.postalCode+'</td>';
			});
			
			table +='</table>';
			$(table)
			.addClass('w3-table-all')
			.appendTo('#cust_list');
			
			if(d.pxy.existPrev){
				$('<a class="preblock">&laquo;</a>')
				.addClass('cursor')
				.appendTo('#pagination')
				.click(()=>{
					list(d.pxy.prevBlock);
				});
			}
			let i=0;
			for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
				if(d.pxy.pageNum){
					$('<a class="page active">'+i+'</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(function(){
						list($(this).text());
					});
				}else{
					$('<a class="page">'+i+'</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(function(){
						list($(this).text());
					});
				}
			}
			if(d.pxy.existnext){
				$('<a class="posblock">&raquo;</a>')
				.addClass('cursor')
				.appendTo('#pagination')
				.click(function(){
					list(d.pxy.nextBlock);
				});
			}
		});
	};
	return {init : init,mypage:mypage,cus_nav:cus_nav,list:list};
})();

