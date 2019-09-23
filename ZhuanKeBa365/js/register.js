mui.plusReady(function() {
	$('.js-Verify').on('click', function() {
		if(!$('.js-Verify').hasClass("Verify_tmp")) {
			var name = $('input[name=username]').val();
			if(!(/^1[34578]\d{9}$/.test(name))) {
				mui.toast('请输入正确手机号！');
				return;
			};
			mui.ajax(AliceHost + '/Login/SendMsg',{
				data: {
					loginID: name
				},
				type: 'post',
				dataType: 'json',
				timeout: 3000,
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				success: function(data) {
					mui.toast(data.msg)
				}
			});
			settime(60);
		} else {
			return;
		}
	});

	function settime(countdown) {
		var cdtext = "";
		if(countdown >= 1) {
			countdown--;
			cdtext = countdown + "s后重新获取验证码";
			$('.js-Verify').html(cdtext);
			$('.js-Verify').addClass("Verify_tmp");
			//$('.js-Verify').css("color","#ddd");
		} else if(countdown < 1) {
			countdown = 60;
			cdtext = "获取手机验证码";
			$('.js-Verify').html(cdtext);
			$('.js-Verify').removeClass("Verify_tmp");
			//$('.js-Verify').css("color","#00abef");
			return;
		}
		setTimeout(function() {
			settime(countdown)
		}, 1000)
		//setTimeout(settime(countdown),1000);
	}
	$('#reg').on('click', function() {
		var name = $('input[name=username]').val(),
			Verify = $('input[name=Verify]').val(),
			password = $('input[name=password]').val(),
			repassword = $('input[name=repassword]').val(),
			eid = $('input[name=eid]').val(),
			url = '/Login/Reg';
		var w = plus.nativeUI.showWaiting();
		if(!name) {
			mui.toast('请输入手机号！');
			plus.nativeUI.closeWaiting();
			return;
		};
		if(!Verify) {
			mui.toast('请输入验证码！');
			plus.nativeUI.closeWaiting();
			return;
		};
		if(!password) {
			mui.toast('请输入密码！');
			plus.nativeUI.closeWaiting();
			return;
		};
		if(!repassword || repassword !== password) {
			mui.toast('两次输入的密码不匹配！');
			plus.nativeUI.closeWaiting();
			return;
		};
		mui.post(AliceHost + url, {
			phone: name,
			pwd: password,
			confirmPwd: repassword,
			extensionUserId: eid,
			Verify: Verify
		}, function(data) {
			plus.nativeUI.closeWaiting();
			if(data.code == "success") {
				mui.toast(data.msg);
				// 获取目标口窗口对象
				var target = plus.webview.getWebviewById('login.html');
				// 执行关闭
				mui.back();
			} else {
				mui.toast(data.msg);
			}
		}, "json");
	});
});