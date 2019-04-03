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
		$(r_cnt).html(compo.prod_post());
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
	return {init:init,get:get};
})();