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
                'name' => 'Sarah Johnson',
                'name_ar' => 'سارة جونسون',
                'role' => 'Marketing Director',
                'role_ar' => 'مديرة التسويق',
                'text' => 'NextWave transformed our brand identity completely. Their attention to detail and creative vision exceeded our expectations.',
                'text_ar' => 'حولت NextWave هوية علامتنا التجارية بالكامل. اهتمامهم بالتفاصيل ورؤيتهم الإبداعية تجاوزت توقعاتنا.',
                'rating' => 5,
                'is_published' => true,
                'order' => 1,
            ],
            [
                'name' => 'Michael Chen',
                'name_ar' => 'مايكل تشين',
                'role' => 'CEO, TechStart',
                'role_ar' => 'الرئيس التنفيذي، TechStart',
                'text' => 'The website they designed for us increased our conversion rate by 40%. Absolutely phenomenal work and professional service.',
                'text_ar' => 'الموقع الذي صمموه لنا زاد معدل التحويل بنسبة 40٪. عمل رائع للغاية وخدمة احترافية.',
                'rating' => 5,
                'is_published' => true,
                'order' => 2,
            ],
            [
                'name' => 'Emily Rodriguez',
                'name_ar' => 'إميلي رودريغيز',
                'role' => 'Creative Director',
                'role_ar' => 'المديرة الإبداعية',
                'text' => 'Working with NextWave was a game-changer. They brought our vision to life with elegance and sophistication.',
                'text_ar' => 'العمل مع NextWave كان نقطة تحول. أحيوا رؤيتنا بأناقة وتطور.',
                'rating' => 5,
                'is_published' => true,
                'order' => 3,
            ],
            [
                'name' => 'David Thompson',
                'name_ar' => 'ديفيد تومبسون',
                'role' => 'Founder, GreenTech',
                'role_ar' => 'المؤسس، GreenTech',
                'text' => 'Their photography services captured our products beautifully. The quality and creativity are unmatched in the industry.',
                'text_ar' => 'خدمات التصوير الفوتوغرافي الخاصة بهم التقطت منتجاتنا بشكل جميل. الجودة والإبداع لا مثيل لهما في الصناعة.',
                'rating' => 5,
                'is_published' => true,
                'order' => 4,
            ],
            [
                'name' => 'Lisa Wang',
                'name_ar' => 'ليزا وانغ',
                'role' => 'Brand Manager',
                'role_ar' => 'مديرة العلامة التجارية',
                'text' => 'NextWave\'s advertising campaigns delivered exceptional results. Our brand awareness increased significantly.',
                'text_ar' => 'حملات NextWave الإعلانية حققت نتائج استثنائية. زاد الوعي بعلامتنا التجارية بشكل كبير.',
                'rating' => 5,
                'is_published' => true,
                'order' => 5,
            ],
            [
                'name' => 'James Miller',
                'name_ar' => 'جيمس ميلر',
                'role' => 'Product Manager',
                'role_ar' => 'مدير المنتج',
                'text' => 'The logo design they created perfectly represents our company values. It\'s modern, memorable, and timeless.',
                'text_ar' => 'تصميم الشعار الذي أنشأوه يمثل قيم شركتنا بشكل مثالي. إنه حديث ولا يُنسى وخالد.',
                'rating' => 5,
                'is_published' => true,
                'order' => 6,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
