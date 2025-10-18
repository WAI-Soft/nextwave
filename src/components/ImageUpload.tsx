import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Upload, X, Image as ImageIcon, FileImage } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  placeholder = "Enter image URL or upload from device",
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for local storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setIsUploading(false);
        toast.success('Image uploaded successfully!');
      };
      reader.onerror = () => {
        setIsUploading(false);
        toast.error('Failed to read image file');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    }
  }, [onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleClearImage = useCallback(() => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* URL Input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-1 bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold rounded-md px-3 py-2 text-sm"
        />
        <Button
          type="button"
          onClick={handleUploadClick}
          variant="outline"
          size="icon"
          className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-200"
          disabled={isUploading}
        >
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-champagne-gold/30 border-t-champagne-gold rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
        </Button>
        {value && (
        <Button
          type="button"
          onClick={handleClearImage}
          variant="outline"
          size="icon"
          className="border-red-400/30 text-red-400 hover:bg-red-400/20 hover:border-red-400/60 transition-all duration-200"
        >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Drag and Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center drag-area ${
          isDragOver
            ? 'drag-over'
            : 'border-champagne-gold/30'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            {isUploading ? (
              <div className="w-12 h-12 border-4 border-champagne-gold/30 border-t-champagne-gold rounded-full animate-spin" />
            ) : (
              <div className="w-12 h-12 bg-champagne-gold/20 rounded-full flex items-center justify-center">
                <FileImage className="w-6 h-6 text-champagne-gold" />
              </div>
            )}
          </div>
          
          <div>
            <p className="text-pure-white font-medium">
              {isUploading ? 'Uploading...' : 'Drag & drop an image here'}
            </p>
            <p className="text-pure-white/60 text-sm mt-1">
              or click to browse files
            </p>
            <p className="text-pure-white/40 text-xs mt-2">
              Supports: JPG, PNG, GIF, WebP (max 5MB)
            </p>
          </div>
          
          <Button
            type="button"
            onClick={handleUploadClick}
            variant="outline"
            className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-200"
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        </div>
      </div>

      {/* Image Preview */}
      {value && (
        <div className="relative">
          <div className="relative w-full h-48 bg-pure-black/20 rounded-lg overflow-hidden border border-champagne-gold/30">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                toast.error('Failed to load image. Please check the URL or try uploading again.');
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-sm font-medium truncate">
                {value.startsWith('data:') ? 'Uploaded Image' : 'Image Preview'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;