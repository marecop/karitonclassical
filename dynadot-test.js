// Dynadot SMTP 測試腳本 - 多種配置嘗試
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testMultipleConfigurations() {
  console.log('🔧 Dynadot SMTP 測試開始...');
  console.log('配置信息:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? `已設置 (長度: ${process.env.SMTP_PASS.length})` : '未設置');
  
  // 配置1：標準 STARTTLS 配置
  const config1 = {
    name: '標準 STARTTLS 配置',
    options: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
    }
  };

  // 配置2：寬鬆 TLS 配置
  const config2 = {
    name: '寬鬆 TLS 配置',
    options: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1"
      },
      debug: false,
    }
  };

  // 配置3：LOGIN 認證方式
  const config3 = {
    name: 'LOGIN 認證方式',
    options: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      authMethod: 'LOGIN',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
    }
  };

  // 配置4：PLAIN 認證方式
  const config4 = {
    name: 'PLAIN 認證方式',
    options: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      authMethod: 'PLAIN',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false,
    }
  };

  const configs = [config1, config2, config3, config4];

  for (const config of configs) {
    console.log(`\n📡 測試 ${config.name}...`);
    
    try {
      const transporter = nodemailer.createTransport(config.options);
      await transporter.verify();
      console.log(`✅ ${config.name} - 連接成功！`);
      
      // 嘗試發送測試郵件
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `Dynadot 測試 - ${config.name}`,
        text: `使用 ${config.name} 發送的測試郵件`,
        html: `<h3>測試成功</h3><p>使用 <strong>${config.name}</strong> 成功發送郵件！</p>`
      });
      
      console.log(`🎉 郵件發送成功！Message ID: ${info.messageId}`);
      console.log(`🎯 成功的配置: ${config.name}`);
      return; // 成功後停止測試
      
    } catch (error) {
      console.log(`❌ ${config.name} - 失敗: ${error.message}`);
      
      if (error.code === 'EAUTH') {
        console.log('   💡 認證失敗 - 可能是密碼或用戶名錯誤');
      } else if (error.code === 'ECONNECTION') {
        console.log('   💡 連接失敗 - 可能是網絡或服務器問題');
      } else if (error.message.includes('535')) {
        console.log('   💡 535 錯誤 - 認證失敗，檢查是否啟用遠程訪問');
      }
    }
  }
  
  console.log('\n❌ 所有配置都失敗了。請檢查:');
  console.log('1. Dynadot 是否訂閱專業計劃');
  console.log('2. 是否在郵件設置中啟用了「遠程訪問」');
  console.log('3. 用戶名和密碼是否正確');
  console.log('4. 聯繫 Dynadot 客服確認 SMTP 設置');
}

testMultipleConfigurations();
