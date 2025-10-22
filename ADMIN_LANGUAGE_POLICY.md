# Admin Dashboard Language Policy

## Overview

The admin dashboard (`/admin` and `/admin/dashboard` routes) is **always displayed in English with LTR (Left-to-Right) layout**, regardless of the website's language setting.

## Implementation Details

### 1. Language Context (`src/contexts/LanguageContext.tsx`)

The `LanguageContext` has been enhanced to detect admin routes:

- **Admin Route Detection**: Checks if the current path starts with `/admin`
- **Forced English**: Admin routes always use English translations (`translations.en`)
- **Forced LTR**: Admin routes always set `document.documentElement.dir = 'ltr'`
- **Language Isolation**: Language changes on public pages do not affect admin pages

### 2. Admin Pages

All admin pages have explicit `dir="ltr"` attributes:

- `src/pages/admin/Login.tsx` - Login page
- `src/pages/admin/Dashboard.tsx` - Main dashboard
- `src/pages/admin/AddProject.tsx` - Add project form
- `src/pages/admin/EditProject.tsx` - Edit project form

### 3. Translation Files

- `src/translations/admin.en.ts` - English translations (USED)
- `src/translations/admin.ar.ts` - Arabic translations (NOT USED - exists only for type consistency)

## Behavior

### Public Pages (/, /services, /portfolio, /about, /contact)
- ✅ Respect user's language selection (English/Arabic)
- ✅ Apply RTL layout when Arabic is selected
- ✅ Apply LTR layout when English is selected
- ✅ Use appropriate translations based on language

### Admin Pages (/admin, /admin/dashboard)
- ✅ Always display in English
- ✅ Always use LTR layout
- ✅ Ignore website language setting
- ✅ Maintain consistent admin interface

## Why This Approach?

1. **Consistency**: Admin interfaces should remain consistent for all administrators
2. **Clarity**: Prevents confusion when managing content in multiple languages
3. **Best Practice**: Industry standard to keep admin panels in a single language
4. **Maintenance**: Easier to maintain and support a single admin language

## Testing

To verify this works correctly:

1. Navigate to the public website (e.g., `/`)
2. Change language to Arabic - the site should display in RTL with Arabic text
3. Navigate to `/admin` or `/admin/dashboard`
4. Verify the admin dashboard remains in English with LTR layout
5. Return to public pages - they should still be in Arabic/RTL
6. Change back to English on public pages
7. Admin should remain unchanged (already English/LTR)

## Code Example

```typescript
// In LanguageContext.tsx
const isAdminRoute = checkIsAdminRoute(location.pathname);
const effectiveLanguage = isAdminRoute ? 'en' : language;
const isRTL = !isAdminRoute && language === 'ar';

useEffect(() => {
  if (isAdminRoute) {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  } else {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }
}, [language, isAdminRoute]);
```

## Future Considerations

If you need to add more admin routes in the future, they will automatically be detected as admin routes as long as they start with `/admin`. No additional configuration is needed.
