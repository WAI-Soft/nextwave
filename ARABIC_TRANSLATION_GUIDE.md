# Arabic Translation for Portfolio Projects

## What Was Changed

The portfolio page now displays project titles and descriptions in Arabic when the language is set to Arabic.

## Changes Made

### 1. Updated Project Interface
**File**: `src/contexts/ProjectContext.tsx`

Added Arabic fields to the Project interface:
```typescript
export interface Project {
  id: string;
  name: string;
  nameAr?: string;           // ← NEW: Arabic title
  description: string;
  descriptionAr?: string;    // ← NEW: Arabic description
  // ... other fields
}
```

### 2. Updated Backend Mapping
**File**: `src/services/projectService.ts`

Updated the mapping function to include Arabic data from backend:
```typescript
return {
  id: backendProject.id.toString(),
  name: backendProject.title_en,
  nameAr: backendProject.title_ar,           // ← NEW
  description: backendProject.description_en,
  descriptionAr: backendProject.description_ar, // ← NEW
  // ... other fields
};
```

### 3. Updated Portfolio Display
**File**: `src/pages/Portfolio.tsx`

Updated two locations to show Arabic text when language is Arabic:

#### Project Cards (Grid View)
```typescript
{isRTL && 'nameAr' in item && (item as Project).nameAr 
  ? (item as Project).nameAr 
  : item.name}
```

#### Project Modal (Detail View)
```typescript
{isRTL && 'nameAr' in selectedItem && selectedItem.nameAr 
  ? selectedItem.nameAr 
  : selectedItem.name}
```

## How It Works

### Language Detection
The portfolio page uses the `isRTL` flag from `useLanguage()` hook to detect if Arabic is selected.

### Display Logic
```
IF language is Arabic (isRTL = true)
  AND project has Arabic title (nameAr exists)
  THEN show Arabic title
  ELSE show English title
```

### Fallback Behavior
- If Arabic translation is not available, it falls back to English
- This ensures projects always display correctly even if Arabic translation is missing

## Database Structure

The backend database already has Arabic fields:
- `title_ar` - Arabic project title
- `description_ar` - Arabic project description

These are automatically populated when you create/edit projects in the dashboard.

## Testing

### 1. View in English
1. Go to portfolio page
2. Ensure language is set to English
3. Projects should show English titles

### 2. View in Arabic
1. Switch language to Arabic (العربية)
2. Go to portfolio page
3. Projects should show Arabic titles
4. Click on a project to see Arabic description in modal

### 3. Check Database Projects
All 10 seeded projects already have Arabic translations:

| English Title | Arabic Title |
|--------------|--------------|
| Luxury Brand Identity | هوية العلامة التجارية الفاخرة |
| E-commerce Platform | منصة التجارة الإلكترونية |
| Digital Advertising Campaign | حملة إعلانية رقمية |
| Minimalist Logo Design | تصميم شعار بسيط |
| Product Photography | تصوير المنتجات |
| Mobile App Development | تطوير تطبيقات الهاتف المحمول |
| Corporate Branding Package | حزمة العلامة التجارية للشركات |
| Social Media Campaign | حملة وسائل التواصل الاجتماعي |
| Event Photography Coverage | تغطية تصوير الفعاليات |
| Restaurant Website Redesign | إعادة تصميم موقع المطعم |

## Adding Arabic Translations for New Projects

When adding new projects through the dashboard, the Arabic fields are automatically handled by the backend. Currently, the dashboard uses the same text for both English and Arabic.

### Future Enhancement
To add separate Arabic input fields in the dashboard:

1. Update `AddProject.tsx` and `EditProject.tsx`
2. Add input fields for Arabic title and description
3. Update the API calls to send both English and Arabic data

Example:
```typescript
const [formData, setFormData] = useState({
  name: '',
  nameAr: '',           // Add this
  description: '',
  descriptionAr: '',    // Add this
  // ... other fields
});
```

## Verification

### Check in Browser
1. Open portfolio: http://localhost:3000/portfolio
2. Switch to Arabic using language toggle
3. Verify project titles are in Arabic
4. Click a project to see Arabic description

### Check in Database
```bash
cd nextwave-backend
php artisan tinker
```

```php
// Get a project with Arabic fields
$project = \App\Models\Project::first();
echo $project->title_en;  // English title
echo $project->title_ar;  // Arabic title
```

## Benefits

✅ **Bilingual Support**: Full support for English and Arabic
✅ **Automatic Switching**: Language changes automatically based on user selection
✅ **Graceful Fallback**: Shows English if Arabic is not available
✅ **Database Ready**: All seeded projects have Arabic translations
✅ **Future Proof**: Easy to add more languages using the same pattern

## Next Steps

1. ✅ Arabic titles working on portfolio page
2. ✅ Arabic descriptions working in modal
3. 🔄 Optional: Add Arabic input fields in dashboard
4. 🔄 Optional: Add Arabic translations for tags
5. 🔄 Optional: Add Arabic translations for client names

## Summary

Your portfolio now displays project titles and descriptions in Arabic when the Arabic language is selected. All 10 seeded projects already have Arabic translations in the database, so you can test this immediately by switching the language to Arabic on the portfolio page.
