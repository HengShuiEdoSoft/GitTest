<template>
	<!-- #ifndef MP-ALIPAY || MP-TOUTIAO -->
	<view>
		<template v-if="showSetTabBarPage">
			<set-tab-bar @unmount="leaveSetTabBarPage"></set-tab-bar>
		</template>
		<template v-else>
			<!-- #endif -->
			<view class="uni-padding-wrap uni-common-pb">
				<view class="uni-header-logo">
					<image src="../../../static/apiIndex.png"></image>
				</view>
				<view class="uni-hello-text uni-common-pb">
					以下将演示uni-app接口能力，具体属性参数详见uni-app开发文档。
				</view>
				<view class="uni-card" v-for="(list,index) in lists" :key="index">
					<view class="uni-list">
						<view class="uni-list-cell uni-collapse">
							<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.open ? 'uni-active' : ''"
							 @click="triggerCollapse(index)">
								{{list.name}}
							</view>
							<view class="uni-list uni-collapse" :class="list.open ? 'uni-active' : ''">
								<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.pages" :key="key" :url="item.url"
								 @click="goDetailPage(item.url)">
									<view class="uni-list-cell-navigate uni-navigate-right"> {{item.name}} </view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- #ifndef MP-ALIPAY || MP-TOUTIAO -->
		</template>
	</view>
	<!-- #endif -->
</template>
<script>
	// #ifndef MP-ALIPAY || MP-TOUTIAO
	import setTabBar from '@/components/api-set-tababr.vue';
	// #endif

	export default {
		// #ifndef MP-ALIPAY || MP-TOUTIAO
		components: {
			setTabBar
		},
		// #endif
		data() {
			// 暂时这么写，后面看怎么优化。
			let mediaPages = [{
					name: '图片',
					url: 'image'
				},
				// #ifdef APP-PLUS || MP-WEIXIN || MP-BAIDU
				{
					name: '录音',
					url: 'voice'
				}, {
					name: '背景音频',
					url: 'background-audio'
				},
				// #endif
				// #ifndef MP-ALIPAY
				{
					name: '视频',
					url: 'video'
				},
				// #endif
				// #ifndef H5
				{
					name: '文件',
					url: 'file'
				},
				// #endif
				// #ifndef H5 || MP-ALIPAY
				{
					name: '保存媒体到本地',
					url: 'save-media'
				},
				// #endif
			];

			const list = [{
					id: 'page',
					name: '界面',
					open: false,
					pages: [{
							name: '设置界面标题',
							url: 'set-navigation-bar-title'
						}, {
							name: '页面跳转',
							url: 'navigator'
						},
						//#ifndef MP-ALIPAY || MP-TOUTIAO
						{
							name: '设置TabBar',
							url: 'set-tabbar'
						},
						//#endif
						{
							name: '下拉刷新',
							url: 'pull-down-refresh'
						},
						//#ifndef H5
						{
							name: '创建动画',
							url: 'animation'
						},
						//#endif
						{
							name: '创建绘画',
							url: 'canvas'
						},
						{
							name: '节点信息',
							url: 'get-node-info'
						},
						//#ifdef APP-PLUS || MP-WEIXIN || MP-BAIDU
						{
							name: '节点布局交互状态',
							url: 'intersection-observer'
						},
						//#endif
						{
							name: '显示操作菜单',
							url: 'action-sheet'
						}, {
							name: '显示模态弹窗',
							url: 'modal'
						}, {
							name: '显示加载提示框',
							url: 'show-loading'
						}, {
							name: '显示消息提示框',
							url: 'toast'
						}
					]
				}, {
					id: 'device',
					name: '设备',
					open: false,
					pages: [{
							name: '获取手机网络状态',
							url: 'get-network-type'
						}, {
							name: '获取手机系统信息',
							url: 'get-system-info'
						}, {
							name: '打电话',
							url: 'make-phone-call'
						},
						//#ifndef H5
						{
							name: '震动',
							url: 'vibrate'
						},
						{
							name: '添加手机联系人',
							url: 'add-phone-contact'
						}, {
							name: '扫码',
							url: 'scan-code'
						}, {
							name: '剪贴板',
							url: 'clipboard'
						},
						//#endif
						// #ifndef H5 || MP-ALIPAY
							{
							name: '屏幕亮度',
							url: 'brightness'
						},
						// #endif
						{
							name: '监听加速度传感器',
							url: 'on-accelerometer-change'
						}, {
							name: '监听罗盘数据',
							url: 'on-compass-change'
						},
						//#ifdef APP-PLUS
						{
							name: '监听距离传感器',
							url: '/platforms/app-plus/proximity/proximity'
						}, {
							name: '监听方向传感器',
							url: '/platforms/app-plus/orientation/orientation'
						}
						//#endif
					]
				}, {
					id: 'network',
					name: '网络',
					open: false,
					pages: [{
						name: '发起一个请求',
						url: 'request'
					}, {
						name: '上传文件',
						url: 'upload-file'
					}, {
						name: '下载文件',
						url: 'download-file'
					}]
				}, {
					id: 'media',
					name: '媒体',
					open: false,
					pages: mediaPages
				}, {
					id: 'location',
					name: '位置',
					open: false,
					pages: [{
							name: '获取当前位置',
							url: 'get-location'
						}, {
							name: '使用地图查看位置',
							url: 'open-location'
						},
						// #ifndef MP-TOUTIAO
						{
							name: '使用地图选择位置',
							url: 'choose-location'
						},
						// #endif
					]
				}, {
					id: 'storage',
					name: '数据',
					open: false,
					pages: [{
						name: '数据存储',
						url: 'storage'
					}]
				},
				// #ifndef H5
				{
					id: 'login',
					name: '登录',
					open: false,
					pages: [{
						name: '登录',
						url: 'login'
					}, {
						name: '获取用户信息',
						url: 'get-user-info'
					}]
				},
				{
					id: 'share',
					name: '分享',
					open: false,
					pages: [{
						name: '分享',
						url: 'share'
					}]
				},
				// #endif
				// #ifdef APP-PLUS || MP-WEIXIN
				{
					id: 'payment',
					name: '支付',
					open: false,
					pages: [{
						name: '发起支付',
						url: 'request-payment'
					}]
				},
				// #endif
				// #ifdef APP-PLUS
				{
					id: 'speech',
					name: '语音',
					open: false,
					pages: [{
						name: '语音识别',
						url: '/platforms/app-plus/speech/speech'
					}]
				}, {
					id: 'push',
					name: '推送',
					open: false,
					pages: [{
						name: '推送',
						url: '/platforms/app-plus/push/push'
					}]
				},
				//#endif
			];
			return {
				showSetTabBarPage: false,
				lists: list
			}
		},
		onShareAppMessage() {
			return {
				title: '欢迎体验uni-app',
				path: '/pages/tabBar/API/API'
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/about/about'
			});
		},
		onShow() {
			this.leaveSetTabBarPage()
		},
		onHide() {
			this.leaveSetTabBarPage()
		},
		methods: {
			triggerCollapse(e) {
				if (!this.lists[e].pages) {
					this.goDetailPage(this.lists[e].url);
					return;
				}
				for (var i = 0; i < this.lists.length; ++i) {
					if (e === i) {
						this.lists[i].open = !this.lists[e].open;
					} else {
						this.lists[i].open = false;
					}
				}
			},
			goDetailPage(e) {
				if (e === 'set-tabbar') {
					this.showSetTabBarPage = true
					return;
				}
				let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
				uni.navigateTo({
					url: url
				})
			},
			leaveSetTabBarPage() {
				this.showSetTabBarPage = false
			}
		}
	}
</script>

<style>
	page {
		height: auto;
		min-height: 100%;
	}

	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}
</style>
