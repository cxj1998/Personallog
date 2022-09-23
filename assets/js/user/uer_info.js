$(function () {
  var form = layui.form; // 获得 form 模块对象
  var layer = layui.layer   // 获得 layer 模块对象

  form.verify({
    // 用户昵称的校验规则
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()

  // 初始化用户的基本信息
  function initUserInfo () {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        console.log(res);
        // form.val('filter', object)用于给指定表单集合的元素赋值和取值
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置表单数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单的默认行为
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    // 发起Ajax请求
    $.ajax({
      url: '/my/userinfo',
      method: 'POST',
      // 获取表单的数据serialize()
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户头像和用户信息
        window.parent.getUserInfo()
      }
    })
  })
})