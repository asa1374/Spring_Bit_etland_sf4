var app = app || {};
app = (()=>{
	let init = x =>{
		app.$.init(x);
	};
	let onCreate = ()=>{
		setContentView();
	};
	let setContentView = ()=>{
		$.when(
				$.getScript($.js()+'/component/compo.js'),
				$.getScript($.js()+'/customer/cust.js'),
				$.getScript($.js()+'/employee/emp.js')
		).done(()=>{
			compo.common_nav();
			cust.permission.login();
			$('#sign').click(()=>{
				cust.permission.join();
			});
		});
	};
	return {init:init,
		onCreate:onCreate};
})();

app.$ = {
		init : (x)=>{
			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x));
				app.onCreate();
			})
		}
	};