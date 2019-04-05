"use strict";
var prod = prod || {};
prod = (()=>{
	let _,js,compojs,r_cnt ,l_cnt;
	let path = ()=>{
		_ = $.ctx();
        js = $.js();
        compojs = js+"/component/compo.js";
        r_cnt = "#right_content";
        l_cnt = "#left_content";
	};
	let init = ()=>{
		path();
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
		path();
		$(r_cnt).html(compo.product_post());
		$('#prd_post_btn').click(e=>{
			e.preventDefault();
			 let checkboxValues = [];
			 $(".checks:checked").each(function(i) {
			    checkboxValues.push($(this).val());
			});
			let pname =  $('#product_name').val();
			let price =  $('#price').val();
			let unit =  $('#unit').val();
			let comment =  $('#comment').val();
			if($.fn.nullChecker([pname,price,unit])){
				alert('입력란을 확인 해주세요');
			}else{
				alert('잘입력했습니다.');
			}
				
			let data = {categoryID:$('#category_name').val(),
						productName:pname,
						price:price,
						unit:unit,
						supplierID:$('#supplier_name').val(),
						color:$('.radi:checked').val(),
						freesbies:checkboxValues,
						comment:comment};
			$.ajax({
				url:_+'/phones',
				type:'post',
				data:JSON.stringify(data),
				dataType:'json',
				contentType:'application/json',
				success:d=>{
					alert('성공');
					lst(1);
				},
				error:e=>{
					alert('에러');
				}
			});//ajax끝
		});
		$('#img_upload_btn').click(function(e){
			e.preventDefault();
			let ok = ($(this).files[0].name.match(/jpg|gif|png|jpeg/i))?true:false;

			if(ok){
				let fd = new FormData();
				fd.append('file',$(this).files[0]);
				$.ajax({
					url :_+'/phones/files',
					type :'post',
					data : fd,
					async : false,
					cache : false,
					contentType : false,
					processData : false,
					success : d=>{
						alert('파일업로드 성공');
					},
					error : e=>{
						alert('파일업로드 실패');
					}
				});
			}else{
				alert('gif,png,jpg,jpeg 파일만 업로드 가능');
			}
		});
	};
	let get = ()=>{
		pro_list(1);
	};
	let put = ()=>{
		
	};
	let del = ()=>{
		
	};
	let pro_list = (x)=>{
		path();
		$.getJSON( _+'/phones/page/'+x,d=>{
			$('#right_content').empty();
			$('<div id="prod_list">'
			+'<h2>상품 리스트</h2>'
			+'</div>'
			+'<div class="center"><div id="pagination" class="pagination"></div></div>'
			).appendTo('#right_content');
			
			let table = '<table id="products">'
			+'  <tr>'
			+'    <th>No.</th>'
			+'    <th>상품명</th>'
			//+'    <th>제조사 이름</th>'
			//+'    <th>카테고리 이름</th>'
			+'    <th>수량</th>'
			+'    <th>가격</th>'
			+'  </tr>';
			$.each(d.ls,(i,j)=>{
				table += '<tr> <td>'+i+1+'</td><td>'+j.productName+'</td><td> '+j.unit+'</td><td>'+j.price+'</td>';
			});
			table +='</table>';
			$(table)
			.addClass('w3-table-all')
			.appendTo('#prod_list');
			
			if(d.pxy.existPrev){
				$('<a class="preblock">&laquo;</a>')
				.addClass('cursor')
				.appendTo('#pagination')
				.click(()=>{
					pro_list(d.pxy.prevBlock);
				});
			}
			let i=0;
			for(i=d.pxy.startPage;i<=d.pxy.endPage;i++){
				if(d.pxy.pageNum){
					$('<a class="page active">'+i+'</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(function(){
						pro_list($(this).text());
					});
				}else{
					$('<a class="page">'+i+'</a>')
					.addClass('cursor')
					.appendTo('#pagination')
					.click(function(){
						pro_list($(this).text());
					});
				}
			}
			if(d.pxy.existnext){
				$('<a class="posblock">&raquo;</a>')
				.addClass('cursor')
				.appendTo('#pagination')
				.click(function(){
					pro_list(d.pxy.nextBlock);
				});
			}
		});
	};
	let shop = ()=>{
		$(r_cnt).html(compo.carousel());
		$('#prod1').attr('src',$.img()+"/한지민.jpg").css('width','600px');
		$('#prod2').attr('src',$.img()+"/한효주.jpeg").css('width','600px');
		$('#prod3').attr('src',$.img()+"/해서웨이.jpg").css('width','600px');
	};
	return {init:init,get:get,post:post};
})();