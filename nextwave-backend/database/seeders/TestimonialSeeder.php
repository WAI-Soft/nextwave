<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name_en' => 'Sarah Johnson',
                'name_ar' => 'سارة جونسون',
                'position_en' => 'Marketing Director',
                'position_ar' => 'مديرة التسويق',
                'company_en' => 'Tech Solutions Inc.',
                'company_ar' => 'شركة الحلول التقنية',
                'content_en' => 'NextWave transformed our brand identity completely. Their attention to detail and creative vision exceeded our expectations.',
                'content_ar' => 'حولت NextWave هوية علامتنا التجارية بالكامل. اهتمامهم بالتفاصيل ورؤيتهم الإبداعية تجاوزت توقعاتنا.',
                'rating' => 5,
                'is_featured' => true,
                'is_published' => true,
                'order' => 1,
            ],
            [
                'name_en' => 'Michael Chen',
                'name_ar' => 'مايكل تشين',
                'position_en' => 'CEO',
                'position_ar' => 'الرئيس التنفيذي',
                'company_en' => 'TechStart',
                'company_ar' => 'تك ستارت',
                'content_en' => 'The website they designed for us increased our conversion rate by 40%. Absolutely phenomenal work and professional service.',
                'content_ar' => 'الموقع الذي صمموه لنا زاد معدل التحويل بنسبة 40٪. عمل رائع للغاية وخدمة احترافية.',
                'rating' => 5,
                'is_featured' => true,
                'is_published' => true,
                'order' => 2,
            ],
            [
                'name_en' => 'Emily Rodriguez',
                'name_ar' => 'إميلي رودريغيز',
                'position_en' => 'Creative Director',
                'position_ar' => 'المديرة الإبداعية',
                'company_en' => 'Creative Studios',
                'company_ar' => 'الاستوديوهات الإبداعية',
                'content_en' => 'Working with NextWave was a game-changer. They brought our vision to life with elegance and sophistication.',
                'content_ar' => 'العمل مع NextWave كان نقطة تحول. أحيوا رؤيتنا بأناقة وتطور.',
                'rating' => 5,
                'is_featured' => true,
                'is_published' => true,
                'order' => 3,
            ],
            [
                'name_en' => 'David Thompson',
                'name_ar' => 'ديفيد تومبسون',
                'position_en' => 'Founder',
                'position_ar' => 'المؤسس',
                'company_en' => 'GreenTech',
                'company_ar' => 'جرين تك',
                'content_en' => 'Their photography services captured our products beautifully. The quality and creativity are unmatched in the industry.',
                'content_ar' => 'خدمات التصوير الفوتوغرافي الخاصة بهم التقطت منتجاتنا بشكل جميل. الجودة والإبداع لا مثيل لهما في الصناعة.',
                'rating' => 5,
                'is_featured' => false,
                'is_published' => true,
                'order' => 4,
            ],
            [
                'name_en' => 'Lisa Wang',
                'name_ar' => 'ليزا وانغ',
                'position_en' => 'Brand Manager',
                'position_ar' => 'مديرة العلامة التجارية',
                'company_en' => 'Digital Innovations',
                'company_ar' => 'الابتكارات الرقمية',
                'content_en' => 'NextWave\'s advertising campaigns delivered exceptional results. Our brand awareness increased significantly.',
                'content_ar' => 'حملات NextWave الإعلانية حققت نتائج استثنائية. زاد الوعي بعلامتنا التجارية بشكل كبير.',
                'rating' => 5,
                'is_featured' => false,
                'is_published' => true,
                'order' => 5,
            ],
            [
                'name_en' => 'James Miller',
                'name_ar' => 'جيمس ميلر',
                'position_en' => 'Product Manager',
                'position_ar' => 'مدير المنتج',
                'company_en' => 'Innovation Labs',
                'company_ar' => 'مختبرات الابتكار',
                'content_en' => 'The logo design they created perfectly represents our company values. It\'s modern, memorable, and timeless.',
                'content_ar' => 'تصميم الشعار الذي أنشأوه يمثل قيم شركتنا بشكل مثالي. إنه حديث ولا يُنسى وخالد.',
                'rating' => 5,
                'is_featured' => false,
                'is_published' => true,
                'order' => 6,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
