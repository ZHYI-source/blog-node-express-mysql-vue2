
class Dialog {
}

/**
 * 注册VUE插件
 * @param Vue
 */
Dialog.install = function (Vue) {

    /**
     * 加载框
     * open('')
     * close()
     */
    // Vue.prototype.$loading = Index;
    Vue.prototype.openLoading = function () {
        Vue.prototype.$loading.show();
    };
    Vue.prototype.closeLoading = function () {
        Vue.prototype.$loading.hide();
    };
    /**
     * 错误提示
     * @param msg 错误信息
     * @param timeout 提示框显示时间，默认1秒
     */
    Vue.prototype.$err = function (msg, timeout) {
        console.log('错误提示:');
        console.log(msg);
        // App.UIerr(msg);
        toast(msg, timeout, 'error');
    };
    /**
     * 成功提示
     * @param msg 提示内容
     * @param timeout 提示框显示时间，默认1秒
     */
    Vue.prototype.$success = function (msg, timeout) {
        // App.UIsuccess(msg);
        toast(msg, timeout, 'success');
    };
    //
    Vue.prototype.$logout = function (msg) {
        console.log('退出')
        // App.logout(msg);
        // toast(msg, timeout, 'success');
    };

    function toast(msg, timeout, icon) {
        if (timeout === undefined) {
            timeout = 1000;
        }
        //success/warning/info/error
        if (icon === undefined) {
            icon = 'error';
        }
        let option = {
            message: msg,
            type: icon
        };
        Vue.prototype.$message(option);
    };


};
export default Dialog;
