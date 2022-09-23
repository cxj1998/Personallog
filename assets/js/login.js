$(function () {
  // 点击注册链接
  $('#link-reg').on('click', function () {
    $('.reg-box').show()
    $('.login-box').hide()
  })

  // 点击登录链接
  $('#link-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  // 通过form.verify() 函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致
    repwd: function (value) {
      // 通过 形参（value） 获取确认密码框中的内容
      // 在拿到密码框中内容
      var pwd = $('.reg-box [name=password]').val()
      // 然后进行两个密码的判断
      if (value !== pwd) {
        return '密码不一致'
      }

    }
  })

  // 监听注册表单的提交事件
  $('#form—reg').on('submit', function (e) {
    // 阻止默认提交事件
    e.preventDefault()
    // 发起Ajax的post请求
    var data = { username: $('#form—reg [name=username]').val(), password: $('#form—reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg('注册成功,请登录！');

      // 模拟人为点击行为
      $('#link-login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form-login').submit(function (e) {
    // 阻止默认提交事件
    e.preventDefault()
    // 发起Ajax的post请求
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据 —— .serialize()
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串保存到 localStroage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})