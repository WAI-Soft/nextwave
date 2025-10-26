import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Testimonial, testimonialService, UpdateTestimonialData } from '../../services/testimonialService';

interface EditTestimonialProps {
  testimonial: Testimonial;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditTestimonial: React.FC<EditTestimonialProps> = ({ testimonial, onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateTestimonialData>({
    name_en: testimonial.name,
    name_ar: testimonial.name_ar || '',
    position_en: testimonial.role,
    position_ar: testimonial.role_ar || '',
    company_en: testimonial.company,
    company_ar: testimonial.company_ar || '',
    content_en: testimonial.text,
    content_ar: testimonial.text_ar || '',
    rating: testimonial.rating,
    image_url: testimonial.image_url || '',
    is_featured: testimonial.is_featured
  });

  const handleInputChange = (field: keyof UpdateTestimonialData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name_en || !formData.position_en || !formData.company_en || !formData.content_en) {
      toast.error('Please fill in all required English fields');
      return;
    }

    setIsLoading(true);
    try {
      await testimonialService.updateTestimonial(testimonial.id, formData);
      toast.success('Testimonial updated successfully! Changes will appear on the home page.');
      onSuccess();
    } catch (error) {
      toast.error('Failed to update testimonial');
      console.error('Error updating testimonial:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-pure-black/40 border-champagne-gold/20" dir="ltr">
      <CardHeader>
        <CardTitle className="text-champagne-gold">Edit Testimonial</CardTitle>
        <CardDescription className="text-pure-white/70">
          Update client testimonial information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name_en" className="text-pure-white/90">
                Client Name (English) *
              </Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => handleInputChange('name_en', e.target.value)}
                placeholder="John Doe"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name_ar" className="text-pure-white/90">
                Client Name (Arabic)
              </Label>
              <Input
                id="name_ar"
                value={formData.name_ar}
                onChange={(e) => handleInputChange('name_ar', e.target.value)}
                placeholder="جون دو"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                dir="rtl"
              />
            </div>
          </div>

          {/* Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="position_en" className="text-pure-white/90">
                Position (English) *
              </Label>
              <Input
                id="position_en"
                value={formData.position_en}
                onChange={(e) => handleInputChange('position_en', e.target.value)}
                placeholder="Marketing Director"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position_ar" className="text-pure-white/90">
                Position (Arabic)
              </Label>
              <Input
                id="position_ar"
                value={formData.position_ar}
                onChange={(e) => handleInputChange('position_ar', e.target.value)}
                placeholder="مدير التسويق"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                dir="rtl"
              />
            </div>
          </div>

          {/* Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company_en" className="text-pure-white/90">
                Company (English) *
              </Label>
              <Input
                id="company_en"
                value={formData.company_en}
                onChange={(e) => handleInputChange('company_en', e.target.value)}
                placeholder="Tech Solutions Inc."
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_ar" className="text-pure-white/90">
                Company (Arabic)
              </Label>
              <Input
                id="company_ar"
                value={formData.company_ar}
                onChange={(e) => handleInputChange('company_ar', e.target.value)}
                placeholder="شركة الحلول التقنية"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                dir="rtl"
              />
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="content_en" className="text-pure-white/90">
                Testimonial (English) *
              </Label>
              <Textarea
                id="content_en"
                value={formData.content_en}
                onChange={(e) => handleInputChange('content_en', e.target.value)}
                placeholder="NextWave delivered an exceptional website that exceeded our expectations..."
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content_ar" className="text-pure-white/90">
                Testimonial (Arabic)
              </Label>
              <Textarea
                id="content_ar"
                value={formData.content_ar}
                onChange={(e) => handleInputChange('content_ar', e.target.value)}
                placeholder="قدمت نكست ويف موقعاً إلكترونياً استثنائياً فاق توقعاتنا..."
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold min-h-[120px]"
                dir="rtl"
              />
            </div>
          </div>

          {/* Rating and Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-pure-white/90">
                Rating
              </Label>
              <Select value={formData.rating?.toString()} onValueChange={(value) => handleInputChange('rating', parseInt(value))}>
                <SelectTrigger className="bg-pure-black/20 border-champagne-gold/30 text-pure-white focus:border-champagne-gold">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent className="bg-pure-black border-champagne-gold/30">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()} className="text-pure-white hover:bg-champagne-gold/20">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-champagne-gold text-champagne-gold" />
                          ))}
                        </div>
                        <span>{rating} Star{rating !== 1 ? 's' : ''}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url" className="text-pure-white/90">
                Image URL (Optional)
              </Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => handleInputChange('image_url', e.target.value)}
                placeholder="https://example.com/client-photo.jpg"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-3">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
              className="data-[state=checked]:bg-champagne-gold"
            />
            <Label htmlFor="is_featured" className="text-pure-white/90">
              Featured Testimonial (will be highlighted on homepage)
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-champagne-gold/20">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-champagne-gold hover:bg-champagne-gold/90 text-pure-black font-semibold"
            >
              {isLoading ? 'Updating...' : 'Update Testimonial'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTestimonial;
