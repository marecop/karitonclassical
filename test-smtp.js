// SMTP 連接測試腳本
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testSMTP() {
  console.log('🔧 正在測試 SMTP 配置...');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '已設置' : '未設置');
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    // requireTLS: true, // 暫時關閉強制 TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    // 嘗試更寬鬆的 TLS 設定
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    // 增加超時時間
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });

  try {
    console.log('\n📡 正在驗證 SMTP 連接...');
    await transporter.verify();
    console.log('✅ SMTP 連接成功！');
    
    console.log('\n📧 正在發送測試郵件...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER, // 發送給自己測試
      subject: 'Kariton Classical - SMTP 測試',
      text: '這是一封 SMTP 測試郵件。如果您收到此郵件，說明配置成功！',
      html: '<h2>SMTP 測試成功！</h2><p>您的 Kariton Classical 郵件系統已經正確配置。</p>'
    });
    
    console.log('✅ 測試郵件發送成功！');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ SMTP 測試失敗:');
    console.error(error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 可能的解決方案:');
      console.log('1. 檢查用戶名和密碼是否正確');
      console.log('2. 確認郵箱允許 SMTP 訪問');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 可能的解決方案:');
      console.log('1. 檢查 SMTP 服務器地址和端口');
      console.log('2. 確認網絡連接正常');
    }
  }
}

testSMTP();
