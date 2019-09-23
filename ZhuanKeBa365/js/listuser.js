var page = 1;
var isload = true;

function scrollPage(callBackFun) {
	$(window).scroll(function() {
		if(isload) {
			if($(this).scrollTop() + $(window).height() + 100 >= $(document).height() && $(this).scrollTop() > 100) {
				page++;
				isload = false;
				window.setTimeout(function() {
					callBackFun();
				}, 200);
			}
		}
	});
}

function getList() {
	var useName = plus.storage.getItem('usename');
	var apptoken = plus.storage.getItem('apptoken');
	$("#loadorder").fadeIn();
	plus.nativeUI.showWaiting();
	mui.ajax(AliceHost + "/Home/AjaxInfoList/",{
		type: "post",
		traditional: true,
		dataType: "json",
		data: {
			page: page,
			keys: $("#hdkeys").val(),
			userId: useName,
			apptoken: apptoken
		},
		success: function(data) {
			console.log(data.code + "getList");
			plus.nativeUI.closeWaiting();
			if(data.code == "0") {
				$("#loadorder").hide();
			} else if(data.code == "4") {
				var abc = plus.webview.getLaunchWebview();
				plus.webview.show(abc, '', '', function() {
					mui.fire(abc, 'gousercenter');
				});
			} else {
				if(data.data.length > 0) {
					$("#newscon").append(data.data);
					$("#loadorder").fadeOut();
				} else {
					$("#loadorder").fadeOut();
				}
			}
			isload = true;
		},
		error: function() {
			plus.nativeUI.closeWaiting();
			mui.toast("网络错误，请重试");
		}
	});
}

function getList1() {
	var useName = plus.storage.getItem('usename');
	var apptoken = plus.storage.getItem('apptoken');
	$("#loadorder").fadeIn();
	plus.nativeUI.showWaiting();
	mui.ajax(AliceHost + "/Home/AjaxInfoList1/",{
		type: "post",
		traditional: true,
		dataType: "json",
		data: {
			page: page,
			keys: $("#hdkeys").val(),
			userId: useName,
			apptoken: apptoken
		},
		success: function(data) {
			console.log(data.code + "getList1");
			plus.nativeUI.closeWaiting();
			if(data.code == "0") {
				$("#loadorder").hide();
			} else if(data.code == "4") {
				var abc = plus.webview.getLaunchWebview();
				plus.webview.show(abc, '', '', function() {
					mui.fire(abc, 'gousercenter');
				});
			} else {
				if(data.data.length > 0) {
					$("#newscon").append(data.data);
					$("#loadorder").fadeOut();
				} else {
					$("#loadorder").fadeOut();
				}
			}
			isload = true;
		},
		error: function() {
			plus.nativeUI.closeWaiting();
			mui.toast("网络错误，请重试");
		}
	});
}

function getList2() {
	var useName = plus.storage.getItem('usename');
	var apptoken = plus.storage.getItem('apptoken');
	$("#loadorder").fadeIn();
	plus.nativeUI.showWaiting();
	mui.ajax(AliceHost + "/Home/AjaxInfoList2/",{
		type: "post",
		traditional: true,
		dataType: "json",
		data: {
			page: page,
			keys: $("#hdkeys").val(),
			userId: useName,
			apptoken: apptoken
		},
		success: function(data) {
			plus.nativeUI.closeWaiting();
			if(data.code == "0") {
				$("#loadorder").hide();
			} else if(data.code == "4") {
				var abc = plus.webview.getLaunchWebview();
				plus.webview.show(abc, '', '', function() {
					mui.fire(abc, 'gousercenter');
				});
			} else {
				if(data.data.length > 0) {
					$("#newscon").append(data.data);
					$("#loadorder").fadeOut();
				} else {
					$("#loadorder").fadeOut();
				}
			}
			isload = true;
		},
		error: function() {
			plus.nativeUI.closeWaiting();
			mui.toast("网络错误，请重试");
		}
	});
}
function getList3() {
	var useName = plus.storage.getItem('usename');
	var apptoken = plus.storage.getItem('apptoken');
	$("#loadorder").fadeIn();
	plus.nativeUI.showWaiting();	
	var OrderID=$("#OrderID").val();
	var Money1=$("#Money1").val();
	var Money2=$("#Money2").val();
	var txtSDate=$("#txtSDate").val();
	var txtEDate=$("#txtEDate").val();
	mui.ajax(AliceHost + "/Users/MoneyList/",{
		type: "post",
		traditional: true,
		dataType: "json",
		data: {
			page: page,
			userId: useName,
			apptoken: apptoken,
			OrderID:OrderID,
			Money1:Money1,
			Money2:Money2,
			txtSDate:txtSDate,
			txtEDate:txtEDate
		},
		success: function(data) {
			console.log(data.code + "getList");
			plus.nativeUI.closeWaiting();
			if(data.code == "0") {
				$("#loadorder").hide();
			} else if(data.code == "4") {
				var abc = plus.webview.getLaunchWebview();
				plus.webview.show(abc, '', '', function() {
					mui.fire(abc, 'gousercenter');
				});
			} else {
				if(data.data.length > 0) {
					$("#conbd").append(data.data);
					$("#loadorder").fadeOut();
				} else {
					$("#loadorder").fadeOut();
				}
			}
			isload = true;
		},
		error: function() {
			plus.nativeUI.closeWaiting();
			mui.toast("网络错误，请重试");
		}
	});
}
