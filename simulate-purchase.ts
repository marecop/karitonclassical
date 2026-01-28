// 模擬購買流程測試
import { sendPurchaseEmail } from './src/lib/emailService';
import { generatePDFReceipt } from './src/lib/pdfService';

async function simulatePurchase() {
  console.log('🛒 模擬購買流程測試...\n');
  
  // 模擬訂單資料
  const orderData = {
    orderId: 'KC-TEST-' + Date.now().toString(36).toUpperCase(),
    customer: '測試客戶',
    email: 'zhahuang2868@guiscn.com',
    phone: '0123456789',
    album: {
      id: 'test-album',
      title: '測試專輯 - 古典音樂精選',
      format: 'CD',
      price: 29.99
    },
    timestamp: new Date().toISOString(),
    total: 29.99
  };
  
  console.log('📋 訂單資料:');
  console.log(`訂單ID: ${orderData.orderId}`);
  console.log(`客戶: ${orderData.customer}`);
  console.log(`郵箱: ${orderData.email}`);
  console.log(`專輯: ${orderData.album.title}`);
  console.log(`金額: $${orderData.total}\n`);
  
  try {
    console.log('📄 正在生成PDF收據...');
    const pdfBuffer = generatePDFReceipt(orderData);
    console.log(`✅ PDF生成成功 (${pdfBuffer.length} bytes)\n`);
    
    console.log('📧 正在發送確認郵件...');
    const emailResult = await sendPurchaseEmail(orderData);
    
    if (emailResult.success) {
      console.log('✅ 購買流程完成！');
      console.log('💡 請檢查 zhahuang2868@guiscn.com 信箱（包括垃圾郵件夾）');
    } else {
      console.log('❌ 郵件發送失敗:', emailResult.error);
    }
    
  } catch (error) {
    console.error('❌ 模擬購買失敗:', error instanceof Error ? error.message : String(error));
  }
}

simulatePurchase().catch(console.error);
