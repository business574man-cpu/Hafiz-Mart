import React, { useState, useEffect } from 'react';
// Fix: Corrected module path by removing file extension.
import type { Product, Category, Review } from '../types';

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'> & { id?: number }>({
    name: '',
    description: '',
    price: 0,
    cost: 0,
    isActive: true,
    originalPrice: 0,
    sellerLocation: '',
    images: [],
    categoryId: categories[0]?.id || 0,
    reviews: [],
    videoUrl: '',
  });
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '', description: '', price: 0, cost: 0, isActive: true, originalPrice: 0, sellerLocation: '',
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop'],
        categoryId: categories[0]?.id || 0,
        reviews: [],
        videoUrl: '',
      });
    }
  }, [product, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number | boolean = value;
    if (type === 'number') parsedValue = value ? parseFloat(value) : 0;
    if (name === 'isActive') parsedValue = value === 'true';
    if (name === 'categoryId') parsedValue = parseInt(value, 10);
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleAddImage = () => {
    if (newImageUrl && !formData.images.includes(newImageUrl)) {
      setFormData(prev => ({ ...prev, images: [...prev.images, newImageUrl] }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter(url => url !== urlToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
        alert("Please add at least one image.");
        return;
    }
    if (!formData.categoryId) {
        alert("Please select a category.");
        return;
    }
    // Use ID 0 for new products, which will be replaced by a unique ID in the App component
    const productToSave: Product = { ...formData, id: formData.id || 0, reviews: product?.reviews || [] };
    onSave(productToSave);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="label">Product Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required /></div>
          <div><label className="label">Category</label><select name="categoryId" value={formData.categoryId} onChange={handleChange} className="input-field"><option value="">Select Category</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="label">Price (PKR)</label><input type="number" name="price" value={formData.price} onChange={handleChange} className="input-field" required /></div>
          <div><label className="label">Original Price (PKR)</label><input type="number" name="originalPrice" value={formData.originalPrice || ''} onChange={handleChange} className="input-field" /></div>
          <div><label className="label">Cost (PKR)</label><input type="number" name="cost" value={formData.cost} onChange={handleChange} className="input-field" required /></div>
          <div><label className="label">Status</label><select name="isActive" value={String(formData.isActive)} onChange={handleChange} className="input-field"><option value="true">Active</option><option value="false">Inactive</option></select></div>
        </div>
        {/* Description */}
        <div><label className="label">Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="input-field" required /></div>
        {/* Video URL */}
        <div>
            <label className="label">Product Video URL (Optional)</label>
            <input 
                type="url" 
                name="videoUrl" 
                value={formData.videoUrl || ''} 
                onChange={handleChange} 
                className="input-field" 
                placeholder="https://example.com/video.mp4" 
            />
        </div>
        {/* Image Management */}
        <div>
          <label className="label">Product Images</label>
          <div className="flex gap-2"><input type="url" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="https://example.com/image.png" className="input-field flex-grow" /><button type="button" onClick={handleAddImage} className="btn-secondary">Add Image</button></div>
          <div className="mt-4 flex flex-wrap gap-4">
            {formData.images.map(url => (
              <div key={url} className="relative group"><img src={url} className="w-24 h-24 object-cover rounded-md border" /><button type="button" onClick={() => handleRemoveImage(url)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity">&times;</button></div>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t dark:border-gray-700"><button type="button" onClick={onCancel} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Save Product</button></div>
      </form>
    </div>
  );
};

export default ProductForm;