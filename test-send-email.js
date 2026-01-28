// 測試發送郵件到指定信箱
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testSendToSpecificEmail() {
  console.log('🔧 測試發送郵件到 zhahuang2868@guiscn.com...\n');
  
  // 創建傳輸器
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: false, // 關閉調試信息，讓輸出更清楚
  });

  try {
    console.log('📡 正在驗證 SMTP 連接...');
    await transporter.verify();
    console.log('✅ SMTP 連接驗證成功！\n');
    
    console.log('📧 正在發送測試郵件到 zhahuang2868@guiscn.com...');
    
    const testInfo = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'zhahuang2868@guiscn.com',
      subject: 'Kariton Classical - 購買測試郵件',
      text: `
親愛的客戶，

這是一封來自 Kariton Classical 的測試郵件。

如果您收到此郵件，說明我們的郵件系統正常工作。
當您在我們的網站購買專輯時，您會收到類似的確認郵件，
並附帶 PDF 格式的購買收據。

感謝您對古典音樂的支持！

此致
Kariton Classical 團隊

---
本郵件發送時間：${new Date().toLocaleString('zh-TW')}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0;">Kariton Classical</h1>
            <p style="color: #6b7280; margin: 5px 0;">加里敦古典音樂</p>
          </div>
          
          <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0;">🎵 購買測試郵件</h2>
            <p style="margin: 0; line-height: 1.6;">親愛的客戶，這是一封來自 Kariton Classical 的測試郵件。</p>
          </div>
          
          <div style="margin: 25px 0;">
            <p style="line-height: 1.6; color: #374151;">
              如果您收到此郵件，說明我們的郵件系統正常工作。<br>
              當您在我們的網站購買專輯時，您會收到類似的確認郵件，並附帶 PDF 格式的購買收據。
            </p>
          </div>
          
          <div style="background: #ecfdf5; border: 1px solid #d1fae5; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <h3 style="color: #065f46; margin: 0 0 10px 0;">✅ 郵件系統狀態</h3>
            <ul style="margin: 0; padding-left: 20px; color: #047857;">
              <li>SMTP 服務器連接：正常</li>
              <li>郵件發送功能：正常</li>
              <li>PDF 附件支持：正常</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              感謝您對古典音樂的支持！
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
              此致<br>
              <strong>Kariton Classical 團隊</strong>
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <div style="text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              本郵件發送時間：${new Date().toLocaleString('zh-TW')}
            </p>
          </div>
        </div>
      `
    });
    
    console.log('🎉 測試郵件發送成功！');
    console.log(`📬 Message ID: ${testInfo.messageId}`);
    console.log(`📧 收件人: zhahuang2868@guiscn.com`);
    console.log(`📤 發送者: ${process.env.SMTP_FROM}`);
    console.log(`⏰ 發送時間: ${new Date().toLocaleString('zh-TW')}`);
    
    console.log('\n💡 請檢查以下位置：');
    console.log('1. 收件箱（主要信箱）');
    console.log('2. 垃圾信箱/垃圾郵件文件夾');
    console.log('3. 促銷信箱（如果使用 Gmail）');
    console.log('4. 垃圾郵件篩選器設置');
    
    console.log('\n✅ 如果您收到這封郵件，說明購買功能的郵件系統完全正常！');
    
  } catch (error) {
    console.log('\n❌ 郵件發送失敗:');
    console.log(`錯誤: ${error.message}`);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔍 可能的問題：認證失敗');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n🔍 可能的問題：連接失敗');
    } else if (error.message.includes('550')) {
      console.log('\n🔍 可能的問題：收件人信箱不存在或被拒絕');
    } else if (error.message.includes('554')) {
      console.log('\n🔍 可能的問題：郵件被識別為垃圾郵件');
    }
  }
}

testSendToSpecificEmail().catch(console.error);
