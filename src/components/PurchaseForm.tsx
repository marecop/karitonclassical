'use client';

import { useState } from 'react';
import { Album } from '@/data/albums';
import { ClipboardList, CreditCard, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PurchaseFormProps {
  album: Album;
  albumTitle: string;
}

/**
 * 購買表單組件
 * 處理專輯購買的用戶輸入和提交
 */
export default function PurchaseForm({ album, albumTitle }: PurchaseFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    format: 'FLAC'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 表單驗證
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = '此欄位為必填';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = '此欄位為必填';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '此欄位為必填';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件地址';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          album: {
            id: album.id,
            title: albumTitle,
            price: album.price,
            format: formData.format
          },
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
          }
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // 重置表單
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          format: 'FLAC'
        });
      } else {
        throw new Error('購買失敗');
      }
    } catch (error) {
      console.error('購買錯誤:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 處理輸入變化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除該欄位的錯誤
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 成功狀態顯示 - 手機版優化
  if (submitStatus === 'success') {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mobile-title text-neutral-900 mb-2">購買成功！</h3>
        <p className="text-neutral-600 mb-6 px-4">
          感謝您的購買！收據已發送到您的電子郵件。
        </p>
        <button 
          onClick={() => setSubmitStatus('idle')}
          className="btn-secondary min-h-[44px] px-6 py-3"
        >
          繼續購買
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* 客戶信息 - 手機版優化 */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3 sm:mb-4">客戶信息</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
              名字 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`mobile-input ${
                errors.firstName ? 'border-red-500' : 'border-neutral-300'
              }`}
              placeholder="請輸入您的名字"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
              姓氏 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`mobile-input ${
                errors.lastName ? 'border-red-500' : 'border-neutral-300'
              }`}
              placeholder="請輸入您的姓氏"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
          電子郵件 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`mobile-input ${
            errors.email ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="請輸入您的電子郵件"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
          電話號碼
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="mobile-input border-neutral-300"
          placeholder="請輸入您的電話號碼（選填）"
        />
      </div>

      {/* 格式選擇 - 手機版優化 */}
      <div>
        <label htmlFor="format" className="block text-sm font-medium text-neutral-700 mb-2">
          選擇格式
        </label>
        <select
          id="format"
          name="format"
          value={formData.format}
          onChange={handleInputChange}
          className="mobile-input border-neutral-300"
        >
          <option value="FLAC">FLAC (無損音質)</option>
          <option value="MP3">MP3 (320kbps)</option>
          <option value="WAV">WAV (無損音質)</option>
        </select>
      </div>

      {/* 訂單摘要 - 手機版優化 */}
      <div className="bg-gradient-to-r from-neutral-50 to-primary-50 rounded-lg p-4 sm:p-5 border border-neutral-200">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3 flex items-center">
          <ClipboardList className="w-5 h-5 mr-2" />
          訂單摘要
        </h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-neutral-600 text-sm">專輯：</span>
            <span className="font-medium text-right text-sm flex-1 ml-2">{albumTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 text-sm">格式：</span>
            <span className="font-medium text-sm">{formData.format}</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg font-bold border-t pt-2 sm:pt-3">
            <span>總計：</span>
            <span className="text-primary-600">${album.price}</span>
          </div>
        </div>
      </div>

      {/* 錯誤訊息 - 手機版優化 */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">購買失敗</h3>
              <p className="text-sm text-red-700 mt-1">
                很抱歉，處理您的訂單時出現錯誤。請稍後重試。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 提交按鈕 - 手機版優化 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-4 rounded-lg text-white font-medium transition-all duration-200 min-h-[52px] flex items-center justify-center text-base sm:text-lg ${
          isSubmitting
            ? 'bg-neutral-400 cursor-not-allowed'
            : 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 shadow-lg hover:shadow-xl'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            處理中...
          </span>
        ) : (
          <span className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            確認購買
          </span>
        )}
      </button>

      {/* 安全提示 - 手機版優化 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs sm:text-sm text-blue-700 text-center flex items-center justify-center">
          <Lock className="w-4 h-4 mr-2" />
          這是模擬購買，不會收取實際費用。收據將發送到您的電子郵件地址。
        </p>
      </div>
    </form>
  );
}
