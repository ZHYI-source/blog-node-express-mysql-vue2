import {listen} from "./utils.listen";
import ConfirmButton from '../components/common/mk-confirm-button'

//会话，提示
export const toast = {
  //确认会话框
  confirm(content, title = '提示') {
    // return this.alert(title, content, 'confirm');
    return this.confirmButtons(content, title);
  },
  confirmSave() {
    return this.confirm('数据还没有保存，确认返回吗？');
  },
  confirmReset(val) {
    return this.confirm(val || '确认重置表单吗？');
  },
  confirmDelete() {
    return this.confirm(`确认删除该条数据吗？`)
  },
  success(content = '保存成功') {
    listen.$message({type: 'success', message: content, duration: 1000});
  },
  error(content, title = '错误') {
    listen.$message({type: 'error', message: content, duration: 2000});
  },
  warning(content, title = "警告") {
    listen.$message({type: 'warning', message: content, duration: 2000});
  },
  errorFormRule(field) {
    if (!field) {
      this.error('数据填写错误，请检查填写数据是否符合要求')
    } else {
      for (let key in field) {
        toast.error(field[key][0].message);
        return;
      }

    }
  },
  loading(content = '加载中') {
    return listen.$dlg.mask(content);
  },
  loadingSave() {
    return this.loading("保存中");
  },
  alert(title, content, type = 'success') {
    return new Promise((resolve, reject) => {
      listen.$dlg.alert(content, () => {
        resolve(true);
      }, {
        messageType: type,
        title: title,
        cancelCallback: () => {
          reject();
        }
      });
    });
  },
  alertInfo(content, title = '提示') {
    return this.alert(title, content, 'info');
  },
  alertSuccess(content, title = '提示') {
    return this.alert(title, content, 'success');
  },
  alertError(content, title = '提示') {
    return this.alert(title, content, 'error');
  },
  alertWarning(content, title = '提示') {
    return this.alert(title, content, 'warning');
  },
  close(key) {
    return listen.$dlg.close(key);
  },
  //弹出自定义确定框
  confirmButtons(content, title = '提示', buttons = [{text: '确定', type: 'primary'}, {text: '取消', type: 'default'}]) {
    return new Promise((resolve, reject) => {
      listen.$dlg.modal(ConfirmButton, {
        //id,唯一值，防止重复打开
        singletonKey: 'confirmButtons',
        title: false,
        customClass: 'lk-dio',//自定义类名
        width: 460,
        height: 205,
        maxButton: false,
        params: {content, buttons, title},
        // d = {index,button}
        callback: d => {
          if (d.button.text === '确定') {
            resolve(true)
          } else if (d.button.text === '取消') {
            reject();
          } else {
            resolve(d);
          }
        }
      })
    })
  },
  showModal(template, config, li) {
    return listen.$dlg.modal(template, config, li)
  },
  //自定义大小窗口
  showAutoModal(title, template, params, callback, cancelCallback, li) {
    return this.showModal(template, {
      singletonKey: 'miniModal1',
      width: params.width || 400,
      height: params.height || 255,
      title: title,
      maxButton: false,
      params,
      callback,
      cancelCallback
    }, li)
  },
  //小窗口
  showMiniModal(title, template, params, callback, cancelCallback, li) {
    return this.showModal(template, {
      singletonKey: 'miniModal',
      width: 600,
      height: 550,
      title: title,
      maxButton: false,
      params,
      callback,
      cancelCallback
    }, li)
  },
  //中号窗口
  showSmallModal(title, template, params, callback, cancelCallback, li) {
    return this.showModal(template, {
      singletonKey: 'miniModal',
      title: title,
      width: 800,
      height: 600,
      maxButton: false,
      params,
      callback,
      cancelCallback
    }, li)
  },
  //大号窗口
  showBigModal(title, template, params, callback, cancelCallback, li) {
    return this.showModal(template, {
      singletonKey: 'miniModal',
      width: 1200,
      height: 800,
      title: title,
      params,
      callback,
      cancelCallback
    }, li)
  },
};
