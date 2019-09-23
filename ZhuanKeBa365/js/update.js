var server = "http://www.zkb365.com/WebNewApp/Login/Update"; //获取升级描述文件服务器地址

function update() {
	var device = 1;
	if(plus.os.name == "Android") {
		device = 1;
	} else if(plus.os.name == "iOS") {
		device = 2;
	}
	mui.post(server, {
		"appid": plus.runtime.appid,
		"version": plus.runtime.version,
		"imei": plus.device.imei,
		"device":device
	}, function(data) {
		console.log(plus.runtime.version);
		console.log(data.code);
		if (data.code=="1") {
			plus.nativeUI.confirm(data.data.Message, function(event) {
				if (0 == event.index) {
					plus.runtime.openURL(data.data.Url);
				}
			}, '赚客吧版本更新', ["立即更新", "取　　消"]);
		}
	}, "json");
}

mui.os.plus && !mui.os.stream && mui.plusReady(update);