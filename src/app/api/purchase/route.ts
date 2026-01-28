import { NextRequest, NextResponse } from 'next/server';
import { sendPurchaseEmail } from '@/lib/emailService';

// 生成訂單 ID
function generateOrderId(): string {
  const prefix = 'KC';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// 購買請求介面
interface PurchaseRequest {
  album: {
    id: string;
    title: string;
    price: number;
    format: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

// 處理購買請求
export async function POST(request: NextRequest) {
  try {
    const body: PurchaseRequest = await request.json();
    
    // 驗證必要資料
    if (!body.album || !body.customer) {
      return NextResponse.json(
        { error: '缺少必要的購買資料' },
        { status: 400 }
      );
    }
    
    if (!body.customer.email || !body.customer.firstName || !body.customer.lastName) {
      return NextResponse.json(
        { error: '請填寫完整的客戶資料' },
        { status: 400 }
      );
    }
    
    // 生成訂單 ID
    const orderId = generateOrderId();
    
    // 創建訂單資料
    const orderData = {
      orderId,
      customer: `${body.customer.firstName} ${body.customer.lastName}`,
      email: body.customer.email,
      phone: body.customer.phone || '',
      album: {
        id: body.album.id,
        title: body.album.title,
        format: body.album.format,
        price: body.album.price
      },
      timestamp: new Date().toISOString(),
      total: body.album.price
    };
    
    console.log('正在發送確認郵件...');
    
    // 發送確認郵件
    const emailResult = await sendPurchaseEmail(orderData);
    
    if (!emailResult.success) {
      console.error('郵件發送失敗:', emailResult.error);
      // 即使郵件失敗，購買仍然算成功，但要記錄錯誤
    }
    
    // 記錄購買完成
    const purchaseResult = {
      orderId: orderData.orderId,
      customer: orderData.email,
      album: orderData.album.title,
      amount: orderData.total,
      timestamp: orderData.timestamp
    };
    
    console.log('購買完成:', purchaseResult);
    
    // 返回成功結果
    return NextResponse.json({
      success: true,
      orderId: orderData.orderId,
      message: '購買成功！收據已發送到您的電子郵件。'
    });
    
  } catch (error) {
    console.error('購買處理錯誤:', error);
    
    return NextResponse.json(
      { 
        error: '購買處理失敗',
        message: '很抱歉，處理您的訂單時出現錯誤。請稍後重試。'
      },
      { status: 500 }
    );
  }
}

// 處理其他 HTTP 方法
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}