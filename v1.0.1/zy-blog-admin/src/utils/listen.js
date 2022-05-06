import Vue from 'vue'

/**
 * 全局消息监听器 - 通过listen可在js文件中调用所有Vue全局方法
 * 通过listen.$emit('监听器名称',data)提交数据，
 * 通过listen.$on('监听器名称',data=>{})监听数据，
 * 通过listen.$off('监听器')关闭监听
 */
export const listen = new Vue();
