// 當前郵箱服務器測試腳本
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testCurrentEmailSetup() {
  console.log('🔧 測試當前郵箱服務器配置...\n');
  
  // 顯示當前配置
  console.log('📋 當前配置:');
  console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
  console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
  console.log(`SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`SMTP_PASS: ${process.env.SMTP_PASS ? '已設置 (' + process.env.SMTP_PASS.length + ' 字符)' : '未設置'}`);
  console.log(`SMTP_FROM: ${process.env.SMTP_FROM}\n`);

  // 檢查是否配置了環境變數
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('❌ SMTP 配置不完整，將使用模擬模式');
    return;
  }

  // 創建傳輸器
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // STARTTLS
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    logger: true,
  });

  try {
    console.log('📡 正在驗證 SMTP 連接...');
    await transporter.verify();
    console.log('✅ SMTP 連接驗證成功！');
    
    console.log('\n📧 正在發送測試郵件...');
    const testInfo = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER, // 發送給自己
      subject: 'Kariton Classical - 郵件服務測試',
      text: '這是一封測試郵件。如果您收到此郵件，說明 SMTP 配置正確！',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">✅ SMTP 測試成功！</h2>
          <p>恭喜！您的 Kariton Classical 郵件系統已經正確配置。</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">配置詳情:</h3>
            <p style="margin: 5px 0;"><strong>服務器:</strong> ${process.env.SMTP_HOST}</p>
            <p style="margin: 5px 0;"><strong>端口:</strong> ${process.env.SMTP_PORT}</p>
            <p style="margin: 5px 0;"><strong>用戶:</strong> ${process.env.SMTP_USER}</p>
            <p style="margin: 5px 0;"><strong>加密:</strong> STARTTLS</p>
          </div>
          <p>現在您可以正常使用購買功能，系統會自動發送確認郵件！</p>
        </div>
      `
    });
    
    console.log('🎉 測試郵件發送成功！');
    console.log(`Message ID: ${testInfo.messageId}`);
    console.log(`\n✅ 郵件服務器完全可用！`);
    console.log(`💡 購買功能現在會發送真實郵件到客戶信箱。`);
    
  } catch (error) {
    console.log('\n❌ SMTP 測試失敗:');
    console.log(`錯誤: ${error.message}`);
    
    if (error.code === 'EAUTH' || error.message.includes('535')) {
      console.log('\n🔍 可能的原因:');
      console.log('1. 密碼或用戶名錯誤');
      console.log('2. 未啟用 Dynadot 郵件遠程訪問功能');
      console.log('3. 未訂閱 Dynadot 專業郵件計劃');
      console.log('4. 郵箱賬戶被鎖定或停用');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🔍 可能的原因:');
      console.log('1. SMTP 服務器地址或端口錯誤');
      console.log('2. 網絡連接問題');
      console.log('3. 防火牆阻止了 SMTP 連接');
    }
    
    console.log('\n💡 好消息:');
    console.log('即使 SMTP 失敗，購買功能仍然正常工作！');
    console.log('系統會自動切換到模擬模式，確保購買流程順利完成。');
  }
}

// 運行測試
testCurrentEmailSetup().catch(console.error);
