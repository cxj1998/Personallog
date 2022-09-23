$(function () {
  getUserInfo()

  var layer = layui.layer
  // 获取用户的退出登陆
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出登录
    //eg1
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
      //清空本地存储的 token
      localStorage.removeItem('token')
      // 重新跳转到登录的页面
      location.href = '/login.html'
      // 关闭 confirm 访问框
      layer.close(index);
    });
  })
})

// 获取用户的基本信息
function getUserInfo () {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo ',
    // 请求头
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // }, 
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！！')
      }
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data)
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //   // console.log('执行了complete回调');
    //   // console.log(res);
    //   // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 强制清空token
    //     localStorage.removeItem('token')
    //     // 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}

// 渲染用户的头像
function renderAvatar (user) {
  // 获取用户的名称
  var name = user.nickname || user.username
  // 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 按需求渲染用户的头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}