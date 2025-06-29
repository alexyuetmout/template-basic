// 测试Better Auth功能的简单脚本
// 可以在浏览器开发者工具中运行

console.log('🧪 测试Better Auth功能');

// 测试1: 检查authClient是否可用
try {
  const { updateUser, setPassword, useSession } = window.authClient || {};
  console.log('✅ authClient可用:', !!updateUser && !!setPassword);
} catch (e) {
  console.log('❌ authClient不可用:', e.message);
}

// 测试2: 检查会话状态
async function testSession() {
  try {
    const response = await fetch('/api/auth/session');
    const session = await response.json();
    console.log('📋 当前会话状态:', session);
    return session;
  } catch (e) {
    console.log('❌ 无法获取会话:', e.message);
    return null;
  }
}

// 测试3: 测试更新用户信息API
async function testUpdateProfile(name) {
  try {
    const response = await fetch('/api/auth/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const result = await response.json();
    console.log('📝 更新用户信息结果:', result);
    return result;
  } catch (e) {
    console.log('❌ 更新用户信息失败:', e.message);
    return null;
  }
}

// 测试4: 测试设置密码API
async function testSetPassword(password) {
  try {
    const response = await fetch('/api/auth/set-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    const result = await response.json();
    console.log('🔐 设置密码结果:', result);
    return result;
  } catch (e) {
    console.log('❌ 设置密码失败:', e.message);
    return null;
  }
}

// 运行测试
async function runTests() {
  console.log('\n🚀 开始运行测试...\n');
  
  const session = await testSession();
  
  if (session && session.user) {
    console.log('\n👤 用户已登录，测试更新功能...');
    await testUpdateProfile('测试用户' + Date.now());
    await testSetPassword('TestPassword123');
  } else {
    console.log('\n🔒 用户未登录，请先登录后再运行测试');
  }
  
  console.log('\n✨ 测试完成！');
}

// 导出测试函数
window.testAuth = {
  runTests,
  testSession,
  testUpdateProfile,
  testSetPassword
};

console.log('💡 使用方法:');
console.log('  testAuth.runTests() - 运行所有测试');
console.log('  testAuth.testSession() - 检查登录状态');
console.log('  testAuth.testUpdateProfile("新名字") - 测试更新用户名');
console.log('  testAuth.testSetPassword("新密码") - 测试设置密码');