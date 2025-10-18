import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelect, 
  currentImage, 
  className = '' 
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false)
  });

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-champagne-gold bg-champagne-gold/10' 
            : isDragReject 
              ? 'border-destructive bg-destructive/10' 
              : 'border-champagne-gold/30 hover:border-champagne-gold/50 hover:bg-champagne-gold/5'
          }
        `}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-champagne-gold/10 rounded-full flex items-center justify-center">
              {isDragActive ? (
                <Upload className="w-8 h-8 text-champagne-gold" />
              ) : (
                <ImageIcon className="w-8 h-8 text-champagne-gold" />
              )}
            </div>
            
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                {isDragActive ? 'Drop your image here' : 'Upload Project Cover Image'}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop an image, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports: JPG, PNG, GIF, WebP (Max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>
      
      {isDragReject && (
        <p className="text-sm text-destructive text-center">
          Please upload a valid image file
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
