//每次调用$.get()或$.post()时，会先调用 ajaxPrefilter函数
// 在该函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url

  // 统一所有权限的接口，设置  headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 全局统一挂载complete 回调函数
  options.complete = function (res) {
    // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 强制清空token 
      localStorage.removeItem('token')
      // 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})