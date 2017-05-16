// // Account setting.
// const accountConfig = {
//   username: 'USERNAME',
//   password: 'PASSWORD',
//   uid: '10000'
// }

// module.exports = {
//   'Bilibili Live Login Test': function (client) {
//     client.url('http://live.bilibili.com').maximizeWindow()

//     // Page Init.
//     client.expect.element('body').to.be.present.before(3000)
//     client.expect.element('.top-nav-login-btn.last').to.be.visible

//     // Login.
//     client.click('.top-nav-login-btn.last')
//     client.waitForElementVisible('#bilibili-quick-login', 2000)
//     client.frame(0)
//     client.pause(2000)
//     client.setValue('#login-username', accountConfig.username)
//     client.setValue('#login-passwd', accountConfig.password)
//     client.click('#login-submit')

//     // Wait and check page has been reloaded.
//     client.frameParent()
//     client.pause(4000)
//     client.expect.element('body').to.be.present.before(3000)

//     // Check cookies to ensure we are signed in.
//     client.getCookies(function (result) {
//       result.value.forEach((value, index, array) => {
//         if (value.name === 'DedeUserID') client.assert.equal(parseInt(value.value, 10), accountConfig.uid)
//       })
//     })

//     // Move to User Avatar.
//     client.expect.element('.user-avatar-link').to.be.visible
//     client.moveToElement('.user-avatar-link', 5, 5)
//     client.pause(800)
//     client.expect.element('#top-nav-user-panel').to.be.visible

//     // Logout.
//     client.click('#top-nav-logout-link')
//     client.pause(5000)
//     client.expect.element('body').to.be.present.before(3000)

//     // Check cookies again to ensure we are off.
//     client.getCookies(function (result) {
//       var logout = true
//       result.value.forEach((value, index, array) => {
//         if (value.name === 'LIVE_LOGIN_DATA') logout = false
//       })
//       client.assert.equal(logout, true)
//     })

//     client.pause(1000)
//     client.end()
//   }
// }

module.exports = {
  'Find the answer.': function (client) {
    // 定义 Bing 页面中的节点.
    const searchInput = '#sb_form_q'
    const searchBtn = '#sb_form_go'
    const question = 'what is microsoft'

    // 启动浏览器并打开 bing.com.
    client.url('http://bing.com').maximizeWindow()

    // 确保 "body" 和输入框可以使用.
    client.expect.element('body').to.be.present
    client.expect.element(searchInput).to.be.visible
    client.pause(2000)  // 稍等两秒.

    // 输入 "what is microsoft" 然后搜索.
    client.setValue(searchInput, question)
    client.click(searchBtn)
    client.pause(2000)

    // 截一张图然后保存到 "reports/answer.png". 
    client.expect.element('body').to.be.present
    client.saveScreenshot('reports/answers.png')
    client.end()
  }
}