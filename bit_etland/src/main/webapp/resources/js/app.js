"use strict";
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
				$.getScript($.js()+'/cust/cust.js'),
				$.getScript($.js()+'/comm/auth.js'),
				$.getScript($.js()+'/emp/emp.js'),
				$.getScript($.js()+'/prod/prod.js')
		).done(()=>{
			auth.init();
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