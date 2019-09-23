if(window.plus) {
	chacklogin();
} else {
	document.addEventListener('plusready', chacklogin, false);
}

function chacklogin() {
	$('.js-login').on('click', function() {
		var name = $('input[name=username]').val(),
			password = $('input[name=password]').val(),
			url = '/Login/Index';
		if(!(/^1[34578]\d{9}$/.test(name))) {
			mui.toast("请输入用户名！");
			return;
		};
		if(!password) {
			mui.toast("请输入密码！");
			return;
		};
		console.log(AliceHost);
		var aaa = plus.push.getClientInfo();
		var clientid = aaa.clientid;
		var token = aaa.token;
		var uuid = plus.device.uuid;
		console.log(clientid);
		console.log(token);
		console.log(uuid);
		plus.nativeUI.showWaiting('登录中...');
		getAjax(url, {
			phone: name,
			pwd: password,
			clientid: uuid,
			uuid: clientid,
			token: token
		}) || {};
	});

	function getAjax(url, val, el, ck) {
		var domEl = el,
			dataVal = val,
			ajaxUrl = url,
			cabk = ck;
		mui.ajax(AliceHost + ajaxUrl,{
			data: dataVal,
			dataType: 'json',
			type: 'post',
			timeout: 3e3,
			success: function(data) {
				plus.nativeUI.closeWaiting();
				console.log(data.code);
				if(data.code == "1") {
					var pwdfo = $('input[name=password]').val();
					plus.storage.setItem('usename', "" + data.data.ID);
					plus.storage.setItem('mobile', data.data.LoginID + "");
					plus.storage.setItem('headimg', data.data.Headimg ? data.data.Headimg : "images/head@2x.png");
					plus.storage.setItem('apptoken', data.data.Apptoken);
					if(data.data.SchoolID != 2) {
						var abc = plus.webview.getLaunchWebview();
						plus.webview.show(abc, '', '', function() {
							mui.fire(abc, 'gousercenter');
						});
					} else {
						var abc = plus.webview.getLaunchWebview();
						plus.webview.show(abc, '', '', function() {});
					}

				} else {
					mui.toast(data.msg);
				}
			},
			error: function(e, msg) {
				plus.nativeUI.closeWaiting();
				if(e.status == 0) {
					mui.toast("网络异常，请检查网络稍后再试...");
				} else {
					mui.toast("服务器异常，请稍后再试..." + msg);
				}
			}
		});
	}
}