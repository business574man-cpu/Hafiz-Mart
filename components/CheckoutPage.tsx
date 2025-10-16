import React, { useState, useMemo } from 'react';
import type { CartItem, Order, PaymentSettings, ShippingAddress } from '../types';
import { PAKISTANI_CITIES_AND_AREAS } from '../constants';

interface CheckoutPageProps {
  cart: CartItem[];
  onPlaceOrder: (order: Omit<Order, 'id' | 'date' | 'userId'>) => void;
  onBack: () => void;
  settings: PaymentSettings;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onPlaceOrder, onBack, settings }) => {
  const [address, setAddress] = useState<Omit<ShippingAddress, 'whatsappNumber' | 'landmark'>>({
    customerName: '',
    phoneNumber: '',
    city: Object.keys(PAKISTANI_CITIES_AND_AREAS)[0],
    cityOther: '',
    area: '',
    areaOther: '',
    fullAddress: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Easypaisa' | 'JazzCash' | 'Card'>('COD');
  
  const [easypaisaDetails, setEasypaisaDetails] = useState({
    transactionId: '',
    screenshotFile: null as File | null,
    screenshotPreview: null as string | null,
  });

  const [errors, setErrors] = useState<any>({});
  
  const cities = [...Object.keys(PAKISTANI_CITIES_AND_AREAS), "Other"];
  const areas = address.city !== 'Other' && PAKISTANI_CITIES_AND_AREAS[address.city] 
    ? ['', ...PAKISTANI_CITIES_AND_AREAS[address.city], "Other"] 
    : ['', "Other"];

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shipping = useMemo(() => settings.baseShipping + (paymentMethod === 'COD' ? settings.codSurcharge : 0), [settings, paymentMethod]);
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    if(name === 'city') {
      setAddress(prev => ({ ...prev, area: '', areaOther: '' })); // Reset area when city changes
    }
  };

  const handleEasypaisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEasypaisaDetails(prev => ({...prev, [name]: value}));
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEasypaisaDetails(prev => ({...prev, screenshotFile: file}));
      const reader = new FileReader();
      reader.onloadend = () => {
        setEasypaisaDetails(prev => ({...prev, screenshotPreview: reader.result as string}));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validateForm = () => {
    const newErrors: any = {};
    if (!address.customerName.trim()) newErrors.customerName = "Customer name is required.";
    // Stricter validation for Pakistani mobile numbers
    if (!/^03\d{9}$/.test(address.phoneNumber.trim())) {
        newErrors.phoneNumber = "Invalid number. Must be an 11-digit Pakistani mobile number starting with 03 (e.g., 03001234567).";
    }
    if (address.city === 'Other' && !address.cityOther?.trim()) newErrors.cityOther = "Please specify your city.";
    if (!address.area.trim() || address.area === "Other" && !address.areaOther?.trim()) newErrors.area = "Area/Sector/Block is required.";
    if (address.area === 'Other' && !address.areaOther?.trim()) newErrors.areaOther = "Please specify your area/sector/block.";
    if (!address.fullAddress.trim()) newErrors.fullAddress = "Full address is required.";

    if (paymentMethod === 'Easypaisa') {
        if (!easypaisaDetails.transactionId.trim()) newErrors.transactionId = "Transaction ID is required.";
        if (!easypaisaDetails.screenshotFile) newErrors.screenshotFile = "Payment screenshot is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!validateForm()) return;
    
    const finalAddress: ShippingAddress = {
        ...address,
        whatsappNumber: address.phoneNumber, // Assuming whatsapp number is same as phone
        city: address.city === 'Other' ? address.cityOther! : address.city,
        area: address.area === 'Other' ? address.areaOther! : address.area,
    };
    
    const order: Omit<Order, 'id' | 'date' | 'userId'> = {
      items: cart,
      address: finalAddress,
      payment: { 
          method: paymentMethod,
          ...(paymentMethod === 'Easypaisa' && {
              transactionId: easypaisaDetails.transactionId,
              paymentScreenshotUrl: easypaisaDetails.screenshotPreview!, // Using preview as placeholder
          }),
       },
      total,
      shipping,
      status: 'Pending',
    };
    onPlaceOrder(order);
  };

  if (cart.length === 0) {
    return (
        <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
            <button onClick={onBack} className="btn-primary">Continue Shopping</button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <button onClick={onBack} className="text-sm font-semibold text-secondary hover:underline mb-4">
        &larr; Back to Cart
      </button>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold border-b dark:border-gray-700 pb-2">Shipping Information</h2>
            <div>
              <label className="label">Full Name</label>
              <input type="text" name="customerName" value={address.customerName} onChange={handleChange} className="input-field" />
               {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input type="tel" name="phoneNumber" value={address.phoneNumber} onChange={handleChange} className="input-field" placeholder="03001234567" />
               {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label className="label">City</label>
              <select name="city" value={address.city} onChange={handleChange} className="input-field">
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            {address.city === 'Other' && (
                <div>
                    <label className="label">Please specify your city</label>
                    <input type="text" name="cityOther" value={address.cityOther} onChange={handleChange} className="input-field" />
                    {errors.cityOther && <p className="text-red-500 text-xs mt-1">{errors.cityOther}</p>}
                </div>
            )}
             <div>
              <label className="label">Area / Sector / Block</label>
              <select name="area" value={address.area} onChange={handleChange} className="input-field" disabled={address.city !== 'Other' && areas.length <= 2}>
                {areas.map(area => <option key={area} value={area}>{area || 'Select Area'}</option>)}
              </select>
               {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
            </div>
             {address.area === 'Other' && (
                <div>
                    <label className="label">Please specify your area</label>
                    <input type="text" name="areaOther" value={address.areaOther} onChange={handleChange} className="input-field" />
                    {errors.areaOther && <p className="text-red-500 text-xs mt-1">{errors.areaOther}</p>}
                </div>
            )}
            <div>
              <label className="label">Full Address (House #, Street, etc.)</label>
              <textarea name="fullAddress" value={address.fullAddress} onChange={handleChange} className="input-field" rows={3} />
              {errors.fullAddress && <p className="text-red-500 text-xs mt-1">{errors.fullAddress}</p>}
            </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 border-b dark:border-gray-700 pb-2">Order Summary</h2>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="flex-1 truncate pr-2">{item.name} x {item.quantity}</span>
                <span className="font-semibold">PKR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t dark:border-gray-700 my-4"></div>
          <div className="space-y-2 font-semibold">
            <div className="flex justify-between"><span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>PKR {shipping.toLocaleString()}</span></div>
            <div className="flex justify-between text-lg text-primary"><span>Total</span><span>PKR {total.toLocaleString()}</span></div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Payment Method</h3>
            <div className="space-y-2">
              {settings.isCodEnabled && <label className="flex items-center p-3 border dark:border-gray-700 rounded-lg cursor-pointer"><input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value as any)} className="mr-2" /> Cash on Delivery</label>}
              {settings.isEasypaisaEnabled && 
                <div>
                  <label className="flex items-center p-3 border dark:border-gray-700 rounded-lg cursor-pointer">
                    <input type="radio" name="paymentMethod" value="Easypaisa" checked={paymentMethod === 'Easypaisa'} onChange={(e) => setPaymentMethod(e.target.value as any)} className="mr-2" /> Easypaisa
                  </label>
                  {paymentMethod === 'Easypaisa' && (
                    <div className="p-4 mt-2 border dark:border-gray-700 rounded-lg space-y-4 bg-gray-50 dark:bg-gray-700">
                      <div className="text-sm p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
                        <p>Please send the total amount to the following account:</p>
                        <p className="mt-1"><strong>Account Number:</strong> 03445718795</p>
                        <p><strong>Account Name:</strong> Muhammad Imran</p>
                      </div>
                      <div>
                          <label className="label text-xs">Transaction ID (TID)</label>
                          <input type="text" name="transactionId" value={easypaisaDetails.transactionId} onChange={handleEasypaisaChange} className="input-field" />
                          {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
                      </div>
                      <div>
                          <label className="label text-xs">Upload Payment Screenshot</label>
                          <input type="file" accept="image/*" onChange={handleScreenshotChange} className="input-field text-sm file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-primary hover:file:bg-orange-100" />
                          {easypaisaDetails.screenshotPreview && (
                              <img src={easypaisaDetails.screenshotPreview} alt="Screenshot preview" className="mt-2 rounded-md max-h-32 object-contain" />
                          )}
                          {errors.screenshotFile && <p className="text-red-500 text-xs mt-1">{errors.screenshotFile}</p>}
                      </div>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
          <button type="submit" className="mt-6 w-full btn-primary">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;