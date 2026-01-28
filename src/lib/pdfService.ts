import { jsPDF } from 'jspdf';
import { OrderData } from './emailService';

// 購買數據界面
interface PurchaseData {
  album: {
    id: string;
    title: string;
    artist: string;
    price: number;
    format: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  timestamp: string;
  orderId: string;
}

/**
 * PDF收據生成服務
 * 創建專業的購買收據PDF文件
 */
class PDFService {
  /**
   * 生成購買收據PDF
   */
  generateReceiptPDF(purchaseData: PurchaseData): Buffer {
    const { customer, album, orderId, timestamp } = purchaseData;
    
    // 創建新的PDF文檔
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // 設置字體（jsPDF內建支援的字體）
    doc.setFont('helvetica');

    // 頁面邊距
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (margin * 2);

    let yPosition = margin;

    // 標題區域
    this.addHeader(doc, margin, yPosition, contentWidth);
    yPosition += 40;

    // 收據信息
    yPosition = this.addReceiptInfo(doc, margin, yPosition, orderId, timestamp);
    yPosition += 20;

    // 客戶信息
    yPosition = this.addCustomerInfo(doc, margin, yPosition, customer);
    yPosition += 20;

    // 購買詳情
    yPosition = this.addPurchaseDetails(doc, margin, yPosition, contentWidth, album);
    yPosition += 30;

    // 頁腳
    this.addFooter(doc, margin, pageHeight - 30, contentWidth);

    // 轉換為Buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;
  }

  /**
   * 添加PDF標題
   */
  private addHeader(doc: jsPDF, x: number, y: number, width: number): void {
    // 公司Logo區域（使用文字代替）
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38); // 主品牌色
    doc.text('Kariton Classical', x, y);

    // 副標題
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('探索古典音樂的永恆之美', x, y + 8);

    // 收據標題
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const receiptTitle = '購買收據';
    const titleWidth = doc.getTextWidth(receiptTitle);
    doc.text(receiptTitle, x + width - titleWidth, y + 5);

    // 分隔線
    doc.setDrawColor(220, 220, 220);
    doc.line(x, y + 15, x + width, y + 15);
  }

  /**
   * 添加收據基本信息
   */
  private addReceiptInfo(
    doc: jsPDF, 
    x: number, 
    y: number, 
    orderId: string, 
    timestamp: string
  ): number {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);

    const orderDate = new Date(timestamp).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    doc.text('訂單編號:', x, y);
    doc.setFont('helvetica', 'normal');
    doc.text(orderId, x + 30, y);

    doc.setFont('helvetica', 'bold');
    doc.text('訂單日期:', x, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(orderDate, x + 30, y + 10);

    return y + 10;
  }

  /**
   * 添加客戶信息
   */
  private addCustomerInfo(
    doc: jsPDF,
    x: number,
    y: number,
    customer: PurchaseData['customer']
  ): number {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('客戶信息', x, y);

    // 客戶信息框
    doc.setDrawColor(200, 200, 200);
    doc.rect(x, y + 5, 170, 25);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`姓名: ${customer.firstName} ${customer.lastName}`, x + 5, y + 15);
    doc.text(`電子郵件: ${customer.email}`, x + 5, y + 23);
    
    if (customer.phone) {
      doc.text(`電話: ${customer.phone}`, x + 90, y + 15);
    }

    return y + 25;
  }

  /**
   * 添加購買詳情
   */
  private addPurchaseDetails(
    doc: jsPDF,
    x: number,
    y: number,
    width: number,
    album: PurchaseData['album']
  ): number {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('購買詳情', x, y);

    // 表格標題
    const tableY = y + 10;
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(240, 240, 240);
    doc.rect(x, tableY, width, 10, 'FD');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('項目', x + 5, tableY + 7);
    doc.text('格式', x + 90, tableY + 7);
    doc.text('價格', x + width - 30, tableY + 7);

    // 商品行
    const itemY = tableY + 10;
    doc.rect(x, itemY, width, 15);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // 處理長標題換行
    const maxTitleWidth = 80;
    const titleLines = doc.splitTextToSize(album.title, maxTitleWidth);
    let lineY = itemY + 7;
    
    titleLines.forEach((line: string, index: number) => {
      doc.text(line, x + 5, lineY + (index * 4));
    });
    
    doc.text(album.format, x + 90, itemY + 7);
    doc.text(`$${album.price.toFixed(2)}`, x + width - 30, itemY + 7);

    // 藝術家信息
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`by ${album.artist}`, x + 5, itemY + 12);

    // 總計
    const totalY = itemY + 20;
    doc.setDrawColor(0, 0, 0);
    doc.line(x + width - 60, totalY, x + width, totalY);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text('總計:', x + width - 45, totalY + 8);
    doc.text(`$${album.price.toFixed(2)}`, x + width - 25, totalY + 8);

    return totalY + 8;
  }

  /**
   * 添加頁腳
   */
  private addFooter(doc: jsPDF, x: number, y: number, width: number): void {
    doc.setDrawColor(220, 220, 220);
    doc.line(x, y, x + width, y);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    
    const footerText = [
      '感謝您選擇 Kariton Classical！',
      '此收據為您的購買憑證，請妥善保存。',
      '如有任何問題，請聯繫我們：support@karitonclassical.com'
    ];

    footerText.forEach((text, index) => {
      const textWidth = doc.getTextWidth(text);
      doc.text(text, x + (width - textWidth) / 2, y + 8 + (index * 5));
    });
  }
}

export default PDFService;

/**
 * 生成PDF收據（使用 OrderData 格式）
 * 這是一個便利函數，用於從 OrderData 生成 PDF 收據
 */
export function generatePDFReceipt(orderData: OrderData): Buffer {
  const pdfService = new PDFService();
  
  // 將 OrderData 轉換為 PurchaseData
  // 解析客戶姓名（假設格式為 "FirstName LastName"）
  const nameParts = orderData.customer.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  const purchaseData: PurchaseData = {
    orderId: orderData.orderId,
    timestamp: orderData.timestamp,
    customer: {
      firstName,
      lastName,
      email: orderData.email,
      phone: orderData.phone || undefined,
    },
    album: {
      id: orderData.album.id,
      title: orderData.album.title,
      artist: 'Various Artists', // OrderData 中沒有 artist 欄位，使用默認值
      price: orderData.album.price,
      format: orderData.album.format,
    },
  };
  
  return pdfService.generateReceiptPDF(purchaseData);
}
