import nodemailer from 'nodemailer';

// 訂單資料介面
export interface OrderData {
  orderId: string;
  customer: string;
  email: string;
  phone: string;
  album: {
    id: string;
    title: string;
    format: string;
    price: number;
  };
  timestamp: string;
  total: number;
}

// 郵件發送結果介面
export interface EmailResult {
  success: boolean;
  error?: string;
}

// 生成 HTML 收據
function generateHTMLReceipt(orderData: OrderData): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; background: white; font-family: Arial, sans-serif;">
      <!-- 頭部 -->
      <div style="background: linear-gradient(135deg, #1f2937 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Kariton Classical</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">古典音樂的永恆之美</p>
      </div>
     n'z 
      <!-- 收據標題 -->
      <div style="padding: 30px; text-align: center; border-bottom: 3px solidrgb(0, 0, 0);">
        <h2 style="margin: 0; color:rgb(0, 0, 0); font-size: 24px;">🎵 購買收據</h2>
        <p style="margin: 10px 0 0 0; color:rgb(0, 0, 0);">感謝您的購買</p>
      </div>
      
      <!-- 訂單資訊 -->
      <div style="padding: 30px;">
        <div style="background: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">📋 訂單詳情</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">訂單編號：</td>
              <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${orderData.orderId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">購買時間：</td>
              <td style="padding: 8px 0; color: #1f2937;">${new Date(orderData.timestamp).toLocaleString('zh-TW')}</td>
            </tr>
          </table>
        </div>
        
        <!-- 客戶資訊 -->
        <div style="background: #f0f9ff; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">👤 客戶資訊</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">姓名：</td>
              <td style="padding: 8px 0; color: #1f2937;">${orderData.customer}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">電子郵件：</td>
              <td style="padding: 8px 0; color: #1f2937;">${orderData.email}</td>
            </tr>
            ${orderData.phone ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">電話：</td>
              <td style="padding: 8px 0; color: #1f2937;">${orderData.phone}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <!-- 購買項目 -->
        <div style="background: #f0fdf4; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">🎶 購買項目</h3>
          <div style="border: 2px solid #d1fae5; border-radius: 8px; padding: 20px; background: white;">
            <h4 style="margin: 0 0 10px 0; color: #065f46; font-size: 16px;">${orderData.album.title}</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; color: #6b7280;">格式：</td>
                <td style="padding: 5px 0; color: #1f2937; font-weight: 500;">${orderData.album.format}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #6b7280;">單價：</td>
                <td style="padding: 5px 0; color: #1f2937; font-weight: 500;">$${orderData.album.price}</td>
              </tr>
            </table>
          </div>
        </div>
        
        <!-- 總計 -->
        <div style="background: #1f2937; color: white; border-radius: 12px; padding: 25px; text-align: center;">
          <h3 style="margin: 0 0 10px 0; font-size: 18px;">💰 付款總計</h3>
          <div style="font-size: 28px; font-weight: bold; color: #3b82f6;">$${orderData.total}</div>
        </div>
      </div>
      
      <!-- 頁腳 -->
      <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">✨ 感謝您選擇 Kariton Classical！</p>
        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">🎭 這是模擬購買系統，不會收取實際費用</p>
        <p style="margin: 0; color: #6b7280; font-size: 12px;">如有任何問題，請聯繫我們的客服團隊</p>
      </div>
    </div>
  `;
}

// 創建郵件發送器
function createEmailTransporter() {
  // 檢查是否配置了 SMTP 設定
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    // 沒有配置 SMTP：使用模擬發送
    console.log('未配置 SMTP 設定，使用模擬發送模式');
    return null;
  }
  
  // 已配置 SMTP：使用真實的 SMTP 設定
  console.log('使用真實 SMTP 發送郵件');
  
  // 優化的 SMTP 配置來解決 420 錯誤
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // 對於 587 埠使用 false
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // 針對 420 錯誤的優化配置
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    connectionTimeout: 60000, // 60 秒連接超時
    greetingTimeout: 30000,   // 30 秒握手超時
    socketTimeout: 60000,     // 60 秒響應超時
    // 移除過度的調試選項以避免干擾
    debug: false,
    logger: false,
  });
}

// 發送購買確認郵件
export async function sendPurchaseEmail(orderData: OrderData): Promise<EmailResult> {
  try {
    const transporter = createEmailTransporter();
    
    // 沒有配置 SMTP 或配置失敗時使用模擬發送
    if (!transporter) {
      console.log('未配置 SMTP 或配置失敗：使用模擬郵件發送');
      console.log(`收件人: ${orderData.email}`);
      console.log(`訂單ID: ${orderData.orderId}`);
      console.log(`客戶: ${orderData.customer}`);
      console.log(`專輯: ${orderData.album.title}`);
      console.log(`金額: $${orderData.total}`);
      
      // 模擬延遲
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    }
    
    // 先測試 SMTP 連接
    try {
      await transporter.verify();
      console.log('SMTP 連接驗證成功');
    } catch (verifyError) {
      console.error('SMTP 連接驗證失敗，切換到模擬模式:', verifyError instanceof Error ? verifyError.message : String(verifyError));
      console.log('模擬郵件發送：');
      console.log(`收件人: ${orderData.email}`);
      console.log(`訂單ID: ${orderData.orderId}`);
      console.log(`客戶: ${orderData.customer}`);
      console.log(`專輯: ${orderData.album.title}`);
      console.log(`金額: $${orderData.total}`);
      
      return { success: true };
    }
    
    // 生成 HTML 收據
    const htmlReceipt = generateHTMLReceipt(orderData);
    
    // 郵件內容
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@karitonclassical.com',
      to: orderData.email,
      subject: `🎵 Kariton Classical - 購買確認 (訂單 ${orderData.orderId})`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 20px;">
          <!-- 歡迎訊息 -->
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <div style="background: linear-gradient(135deg, #1f2937 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🎵 購買確認</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">感謝您的購買！</p>
            </div>
            
            <div style="padding: 30px; text-align: center;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0;">親愛的 ${orderData.customer}，</h2>
              <p style="color: #6b7280; line-height: 1.6;">
                感謝您購買我們的古典音樂專輯！您的訂單已成功處理。<br>
                下面是您的詳細收據：
              </p>
            </div>
          </div>
          
          <!-- 分隔符 -->
          <div style="text-align: center; margin: 20px 0;">
            <div style="display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; border-radius: 20px; font-size: 14px; font-weight: 500;">
              📄 電子收據
            </div>
          </div>
          
          <!-- HTML 收據 -->
          ${htmlReceipt}
          
          <!-- 結尾訊息 -->
          <div style="max-width: 600px; margin: 20px auto 0; background: white; border-radius: 12px; padding: 30px; text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #1f2937; margin: 0 0 15px 0;">🎼 感謝您的支持！</h3>
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 15px 0;">
              您的購買支持了古典音樂藝術的發展，讓更多人能夠欣賞到美妙的古典音樂。
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              此致<br>
              <strong style="color: #1f2937;">Kariton Classical 團隊</strong>
            </p>
          </div>
        </div>
      `
    };
    
    // 發送郵件
    console.log(`正在發送購買確認郵件到: ${orderData.email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('郵件發送成功!', `Message ID: ${info.messageId}`);
    
    return { success: true };
    
  } catch (error) {
    console.error('郵件發送錯誤:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '未知錯誤' 
    };
  }
}