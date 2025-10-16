import React, { useState } from 'react';
// Fix: Corrected module path by removing file extension.
import type { AppSettings, User, Category } from '../types';

interface AdminSettingsPageProps {
  user: User;
  settings: AppSettings;
  categories: Category[];
  onSaveSettings: (settings: AppSettings) => void;
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ user, settings, categories, onSaveSettings, onUpdateUser, onBack }) => {
  const [currentTab, setCurrentTab] = useState<'profile' | 'security' | 'general' | 'banners' | 'payment'>('profile');
  
  // State for different forms
  const [appSettingsData, setAppSettingsData] = useState<AppSettings>(settings);
  const [profileData, setProfileData] = useState({ name: user.name || '', profilePicUrl: user.profilePicUrl || '' });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  const handleAppSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppSettingsData(prev => ({ ...prev, general: { ...prev.general, [name]: value } }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      let parsedValue: string | number | boolean = value;
      if (type === 'number') parsedValue = parseFloat(value) || 0;
      if (type === 'checkbox') parsedValue = (e.target as HTMLInputElement).checked;
      setAppSettingsData(prev => ({...prev, payment: { ...prev.payment, [name]: parsedValue }}));
  };
  
  const handleBannerChange = (index: number, value: string) => {
      const newBanners = [...appSettingsData.banners.images];
      newBanners[index] = value;
      setAppSettingsData(prev => ({...prev, banners: { images: newBanners }}));
  };
  
  const handleThreeDBannerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number | boolean = value;
    if (type === 'checkbox') parsedValue = (e.target as HTMLInputElement).checked;
    if (name === 'linkCategoryId') parsedValue = parseInt(value, 10);
    setAppSettingsData(prev => ({...prev, threeDBanner: { ...prev.threeDBanner, [name]: parsedValue }}));
  };

  const handleThreeDBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAppSettingsData(prev => ({...prev, threeDBanner: { ...prev.threeDBanner, imageUrl: reader.result as string }}));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addBanner = () => {
       setAppSettingsData(prev => ({...prev, banners: { images: [...prev.banners.images, ''] }}));
  };

  const removeBanner = (index: number) => {
      const newBanners = appSettingsData.banners.images.filter((_, i) => i !== index);
      setAppSettingsData(prev => ({...prev, banners: { images: newBanners }}));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfileData(prev => ({...prev, [name]: value}));
  };
  
   const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profilePicUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(appSettingsData);
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onUpdateUser({ ...user, ...profileData });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(passwordData.current !== user.password) {
          alert("Current password is incorrect.");
          return;
      }
      if(passwordData.new !== passwordData.confirm) {
          alert("New passwords do not match.");
          return;
      }
       if(passwordData.new.length < 6) {
          alert("New password must be at least 6 characters long.");
          return;
      }
      onUpdateUser({ ...user, password: passwordData.new });
      setPasswordData({ current: '', new: '', confirm: '' });
  };

  const renderTabContent = () => {
    switch(currentTab) {
       case 'profile':
        return (
            <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-md">
                 <h3 className="font-semibold text-xl">Admin Profile</h3>
                 <div>
                    <label className="label">Profile Picture</label>
                    <div className="flex items-center gap-4">
                        <img src={profileData.profilePicUrl} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover bg-gray-100" />
                        <input type="file" accept="image/*" onChange={handleProfilePicChange} className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-primary hover:file:bg-orange-100" />
                    </div>
                 </div>
                 <div><label className="label">Display Name</label><input type="text" name="name" value={profileData.name} onChange={handleProfileChange} className="input-field" required /></div>
                 <div><label className="label">Email</label><input type="email" name="email" value={user.email} className="input-field bg-gray-100 dark:bg-gray-700" readOnly disabled /></div>
                 <div className="flex justify-end pt-6 border-t dark:border-gray-700 mt-6"><button type="submit" className="btn-primary">Save Profile</button></div>
            </form>
        );
      case 'security':
        return (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-sm">
                <h3 className="font-semibold text-xl">Change Admin Password</h3>
                <div><label className="label">Current Password</label><input type="password" value={passwordData.current} onChange={e => setPasswordData(p => ({...p, current: e.target.value}))} className="input-field" required /></div>
                <div><label className="label">New Password</label><input type="password" value={passwordData.new} onChange={e => setPasswordData(p => ({...p, new: e.target.value}))} className="input-field" required /></div>
                <div><label className="label">Confirm New Password</label><input type="password" value={passwordData.confirm} onChange={e => setPasswordData(p => ({...p, confirm: e.target.value}))} className="input-field" required /></div>
                <div className="flex justify-end pt-6 border-t dark:border-gray-700 mt-6"><button type="submit" className="btn-primary">Change Password</button></div>
            </form>
        );
      case 'general':
        return (
          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            <h3 className="font-semibold text-xl">General Site Settings</h3>
            <div><label className="label">Site Title</label><input type="text" name="siteTitle" value={appSettingsData.general.siteTitle} onChange={handleAppSettingsChange} className="input-field" /></div>
            <div><label className="label">Contact Number (WhatsApp)</label><input type="text" name="contactNumber" value={appSettingsData.general.contactNumber} onChange={handleAppSettingsChange} className="input-field" /></div>
            <div className="flex justify-end pt-6 border-t dark:border-gray-700 mt-6"><button type="submit" className="btn-primary">Save Settings</button></div>
          </form>
        );
       case 'banners':
        return (
            <form onSubmit={handleSettingsSubmit} className="space-y-8">
                {/* Hero Banners Section */}
                <div>
                    <h3 className="font-semibold text-xl mb-4">Homepage Hero Banners</h3>
                    <div className="space-y-4">
                        {appSettingsData.banners.images.map((img, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input type="url" value={img} onChange={(e) => handleBannerChange(index, e.target.value)} placeholder="Image URL" className="input-field flex-grow" />
                                <button type="button" onClick={() => removeBanner(index)} className="btn-secondary bg-red-200 text-red-800">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addBanner} className="btn-secondary">Add Banner</button>
                    </div>
                </div>

                {/* 3D Banner Section */}
                <div className="border-t dark:border-gray-700 pt-8">
                    <h3 className="font-semibold text-xl mb-4">3D Interactive Banner</h3>
                    <div className="space-y-4">
                        <div className="flex items-center"><input type="checkbox" name="isEnabled" id="is3DBannerEnabled" checked={appSettingsData.threeDBanner.isEnabled} onChange={handleThreeDBannerChange} className="mr-2 h-4 w-4" /><label htmlFor="is3DBannerEnabled">Enable 3D Banner</label></div>
                        <div><label className="label">Headline (e.g., New Arrivals)</label><input type="text" name="headline" value={appSettingsData.threeDBanner.headline} onChange={handleThreeDBannerChange} className="input-field" /></div>
                        <div><label className="label">Main Title</label><input type="text" name="title" value={appSettingsData.threeDBanner.title} onChange={handleThreeDBannerChange} className="input-field" /></div>
                        <div><label className="label">Description</label><input type="text" name="description" value={appSettingsData.threeDBanner.description} onChange={handleThreeDBannerChange} className="input-field" /></div>
                        <div><label className="label">Button Text</label><input type="text" name="buttonText" value={appSettingsData.threeDBanner.buttonText} onChange={handleThreeDBannerChange} className="input-field" /></div>
                        <div><label className="label">Button Link</label><select name="linkCategoryId" value={appSettingsData.threeDBanner.linkCategoryId} onChange={handleThreeDBannerChange} className="input-field">{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                        <div>
                            <label className="label">Banner Image</label>
                            <div className="flex items-center gap-4">
                                <img src={appSettingsData.threeDBanner.imageUrl} alt="3D Banner Preview" className="w-20 h-20 rounded-md object-contain bg-gray-100 border" />
                                <input type="file" accept="image/*" onChange={handleThreeDBannerImageChange} className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-primary hover:file:bg-orange-100" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end pt-6 border-t dark:border-gray-700 mt-6"><button type="submit" className="btn-primary">Save All Banner Settings</button></div>
            </form>
        );
      case 'payment':
        return (
            <form onSubmit={handleSettingsSubmit} className="space-y-4">
                <h3 className="font-semibold text-xl">Payment & Shipping</h3>
                <div className="flex items-center"><input type="checkbox" name="isCodEnabled" id="isCodEnabled" checked={appSettingsData.payment.isCodEnabled} onChange={handlePaymentChange} className="mr-2 h-4 w-4" /><label htmlFor="isCodEnabled">Enable Cash on Delivery (COD)</label></div>
                <div className="flex items-center"><input type="checkbox" name="isEasypaisaEnabled" id="isEasypaisaEnabled" checked={appSettingsData.payment.isEasypaisaEnabled} onChange={handlePaymentChange} className="mr-2 h-4 w-4" /><label htmlFor="isEasypaisaEnabled">Enable Easypaisa</label></div>
                <div className="flex items-center"><input type="checkbox" name="isJazzCashEnabled" id="isJazzCashEnabled" checked={appSettingsData.payment.isJazzCashEnabled} onChange={handlePaymentChange} className="mr-2 h-4 w-4" /><label htmlFor="isJazzCashEnabled">Enable JazzCash</label></div>
                <div className="flex items-center"><input type="checkbox" name="isCardPaymentEnabled" id="isCardPaymentEnabled" checked={appSettingsData.payment.isCardPaymentEnabled} onChange={handlePaymentChange} className="mr-2 h-4 w-4" /><label htmlFor="isCardPaymentEnabled">Enable Card Payment (Stripe)</label></div>
                <div><label className="label">Base Shipping Fee (PKR)</label><input type="number" name="baseShipping" value={appSettingsData.payment.baseShipping} onChange={handlePaymentChange} className="input-field" /></div>
                <div><label className="label">COD Surcharge (PKR)</label><input type="number" name="codSurcharge" value={appSettingsData.payment.codSurcharge} onChange={handlePaymentChange} className="input-field" /></div>
                <div className="flex justify-end pt-6 border-t dark:border-gray-700 mt-6"><button type="submit" className="btn-primary">Save Settings</button></div>
            </form>
        );
    }
  };

  const tabs = [
      { id: 'profile', name: 'Profile' },
      { id: 'security', name: 'Security' },
      { id: 'general', name: 'General' },
      { id: 'banners', name: 'Banners' },
      { id: 'payment', name: 'Payment' },
  ];

  return (
    <div className="p-6">
        <button onClick={onBack} className="text-sm font-semibold text-primary hover:underline mb-4">&larr; Back to Dashboard</button>
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        
        <div className="flex border-b dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
                 <button key={tab.id} onClick={() => setCurrentTab(tab.id as any)} className={`py-2 px-4 font-semibold whitespace-nowrap ${currentTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                    {tab.name}
                </button>
            ))}
        </div>
        
        <div className="min-h-[250px]">
            {renderTabContent()}
        </div>
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default AdminSettingsPage;