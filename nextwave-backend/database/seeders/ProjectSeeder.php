<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title_en' => 'Luxury Brand Identity',
                'title_ar' => 'هوية العلامة التجارية الفاخرة',
                'description_en' => 'Complete brand identity design for premium lifestyle brand including logo, color palette, typography, and brand guidelines.',
                'description_ar' => 'تصميم هوية العلامة التجارية الكاملة لعلامة تجارية فاخرة تشمل الشعار ولوحة الألوان والطباعة وإرشادات العلامة التجارية.',
                'service_category' => 'branding',
                'client' => 'Luxe Living Co.',
                'year' => 2024,
                'image_path' => '/src/assets/brand-identity.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'E-commerce Platform',
                'title_ar' => 'منصة التجارة الإلكترونية',
                'description_en' => 'Modern responsive website with seamless user experience, featuring advanced filtering, secure checkout, and mobile optimization.',
                'description_ar' => 'موقع ويب حديث ومتجاوب مع تجربة مستخدم سلسة، يتميز بالتصفية المتقدمة والدفع الآمن والتحسين للهواتف المحمولة.',
                'service_category' => 'websites',
                'client' => 'Fashion Forward',
                'year' => 2024,
                'image_path' => '/src/assets/e-commerce-platform.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Digital Advertising Campaign',
                'title_ar' => 'حملة إعلانية رقمية',
                'description_en' => 'Multi-platform advertising campaign with stunning visuals, targeting social media, display ads, and video content.',
                'description_ar' => 'حملة إعلانية متعددة المنصات بمرئيات مذهلة، تستهدف وسائل التواصل الاجتماعي والإعلانات المصورة ومحتوى الفيديو.',
                'service_category' => 'advertising',
                'client' => 'TechStart Inc.',
                'year' => 2024,
                'image_path' => '/src/assets/advertising-campaign.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Minimalist Logo Design',
                'title_ar' => 'تصميم شعار بسيط',
                'description_en' => 'Clean and memorable logo design that captures the essence of the brand with modern minimalist aesthetics.',
                'description_ar' => 'تصميم شعار نظيف لا يُنسى يجسد جوهر العلامة التجارية بجماليات بسيطة حديثة.',
                'service_category' => 'logos',
                'client' => 'StartUp Ventures',
                'year' => 2024,
                'image_path' => '/src/assets/logo-design.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Product Photography',
                'title_ar' => 'تصوير المنتجات',
                'description_en' => 'Professional product photography with studio lighting, showcasing products in their best light for e-commerce and marketing.',
                'description_ar' => 'تصوير احترافي للمنتجات بإضاءة الاستوديو، يعرض المنتجات في أفضل صورة للتجارة الإلكترونية والتسويق.',
                'service_category' => 'photography',
                'client' => 'Artisan Goods',
                'year' => 2024,
                'image_path' => '/src/assets/product-photography.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Mobile App Development',
                'title_ar' => 'تطوير تطبيقات الهاتف المحمول',
                'description_en' => 'Native mobile application with intuitive UI/UX design, seamless performance, and cross-platform compatibility.',
                'description_ar' => 'تطبيق هاتف محمول أصلي بتصميم واجهة مستخدم بديهي وأداء سلس وتوافق عبر الأنظمة الأساسية.',
                'service_category' => 'websites',
                'client' => 'FinTech Solutions',
                'year' => 2023,
                'image_path' => '/src/assets/mobile-app.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Corporate Branding Package',
                'title_ar' => 'حزمة العلامة التجارية للشركات',
                'description_en' => 'Comprehensive corporate identity including business cards, letterheads, email signatures, and presentation templates.',
                'description_ar' => 'هوية الشركة الشاملة بما في ذلك بطاقات العمل والأوراق الرسمية وتوقيعات البريد الإلكتروني وقوالب العروض التقديمية.',
                'service_category' => 'branding',
                'client' => 'Global Enterprises',
                'year' => 2023,
                'image_path' => '/src/assets/brand-identity.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Social Media Campaign',
                'title_ar' => 'حملة وسائل التواصل الاجتماعي',
                'description_en' => 'Engaging social media content strategy with custom graphics, videos, and interactive posts to boost engagement.',
                'description_ar' => 'استراتيجية محتوى جذابة لوسائل التواصل الاجتماعي مع رسومات مخصصة ومقاطع فيديو ومنشورات تفاعلية لتعزيز المشاركة.',
                'service_category' => 'advertising',
                'client' => 'Lifestyle Brand Co.',
                'year' => 2023,
                'image_path' => '/src/assets/advertising-campaign.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Event Photography Coverage',
                'title_ar' => 'تغطية تصوير الفعاليات',
                'description_en' => 'Professional event photography capturing key moments, candid shots, and group photos with post-processing.',
                'description_ar' => 'تصوير احترافي للفعاليات يلتقط اللحظات الرئيسية واللقطات الصريحة والصور الجماعية مع المعالجة اللاحقة.',
                'service_category' => 'photography',
                'client' => 'Corporate Events Ltd.',
                'year' => 2023,
                'image_path' => '/src/assets/event-coverage.png',
                'video_path' => null,
                'is_published' => true,
            ],
            [
                'title_en' => 'Restaurant Website Redesign',
                'title_ar' => 'إعادة تصميم موقع المطعم',
                'description_en' => 'Modern restaurant website with online menu, reservation system, and beautiful food photography gallery.',
                'description_ar' => 'موقع مطعم حديث مع قائمة طعام عبر الإنترنت ونظام حجز ومعرض صور طعام جميل.',
                'service_category' => 'websites',
                'client' => 'Gourmet Bistro',
                'year' => 2023,
                'image_path' => '/src/assets/responsive-website.png',
                'video_path' => null,
                'is_published' => true,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
