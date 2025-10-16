import React, { useState, useCallback } from 'react';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (file: File) => void;
}

const ImageSearchModal: React.FC<ImageSearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetState = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setIsDragging(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file (JPEG, PNG, etc.).');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);
  
  const handleSearchClick = () => {
    if (imageFile) {
        onSearch(imageFile);
        handleClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative animate-fade-in-up">
        <button onClick={handleClose} className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg text-gray-700 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Search by Image</h2>
          <p className="text-center text-gray-500 mb-6">Drag & drop an image or click to upload</p>
          
          <div 
            className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-orange-50' : 'border-gray-300 bg-gray-50 hover:border-primary'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('image-upload-input')?.click()}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="mx-auto max-h-48 rounded-md" />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="font-semibold">Drop image here</p>
                <p className="text-sm">or click to browse</p>
              </div>
            )}
            <input 
              id="image-upload-input"
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {imageFile && (
            <div className="text-center mt-4 text-sm text-gray-700">
                <p>File: <span className="font-semibold">{imageFile.name}</span></p>
            </div>
          )}
          
          <div className="mt-6 flex justify-end space-x-4">
             <button 
                onClick={handleClose} 
                className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
                Cancel
            </button>
            <button 
                onClick={handleSearchClick}
                disabled={!imageFile}
                className="py-2 px-6 bg-primary text-white rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Search
            </button>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ImageSearchModal;