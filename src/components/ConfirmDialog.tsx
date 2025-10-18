import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white',
          border: 'border-red-400/30'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-yellow-400" />,
          confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          border: 'border-yellow-400/30'
        };
      case 'info':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-blue-400" />,
          confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-blue-400/30'
        };
      default:
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white',
          border: 'border-red-400/30'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <Card className={`bg-pure-black/90 border-2 ${styles.border} max-w-md w-full shadow-2xl`}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {styles.icon}
          </div>
          <CardTitle className="text-xl font-bold text-pure-white">
            {title}
          </CardTitle>
          <CardDescription className="text-pure-white/70 text-base">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-200"
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className={`${styles.confirmButton} transition-all duration-200`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </div>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmDialog;
