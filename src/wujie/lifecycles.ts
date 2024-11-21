const lifecycles = {
    beforeLoad(appWindow: any) {
      // 第一次子应用的时候执行
      // 打开加载动画
    },
    beforeMount() {
      // console.log('beforeMount()-----------------');
    },
    afterMount(appWindow: any) {
      // 自应用第一次挂载到页面上之后执行(后续会缓存,不会执行)
      // 关闭加载动画
    },
    beforeUnmount(appWindow: any) {
      // console.log('beforeUnmount()-----------------');
    },
    afterUnmount(appWindow: any) {
      // console.log('afterUnmount()-----------------');
    },
    activated(appWindow: any) {
      // console.log(appWindow)
    },
    deactivated(appWindow: any) {
      // console.log('deactivated()-------------------------');
    }
  }
  
  export default lifecycles
  