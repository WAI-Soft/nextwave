# NextWave Admin Dashboard

A comprehensive admin dashboard for managing portfolio projects on the NextWave website.

## 🚀 Features

### 🔐 Authentication & Access
- **Secure Login System**: Email/password authentication with session management
- **Protected Routes**: Dashboard only accessible to authenticated users
- **Session Persistence**: Login state maintained across browser sessions
- **Demo Credentials**: `admin@nextwave.com` / `admin123`

### 📝 Project Management
- **Add Projects**: Create new portfolio projects with comprehensive form
- **Edit Projects**: Update existing project information with pre-populated forms
- **Delete Projects**: Remove projects with confirmation dialogs
- **Project List**: View all projects in a clean, sortable table format

### 🎨 Advanced Form Features
- **📸 Drag & Drop Image Upload**: Upload project cover images with preview
- **🏷 Project Type Selection**: Dropdown with existing website categories
- **📝 Rich Form Fields**: Name, description, purpose, client, year, tags
- **🪪 Multi-Tag System**: Add/remove multiple project tags
- **✅ Form Validation**: Real-time validation with error messages
- **🔄 Auto-Slug Generation**: Automatic URL-friendly slugs from project names

### 🎯 Dashboard Features
- **Overview Statistics**: Project counts, published vs draft status
- **Recent Projects**: Quick view of latest additions
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🛠 Technical Implementation

### Authentication System
- **React Context**: Centralized authentication state management
- **localStorage**: Session persistence for demo purposes
- **Protected Routes**: Route-level access control
- **Loading States**: Smooth user experience with loading indicators

### Data Management
- **Project Context Integration**: Seamless integration with existing project system
- **Real-time Updates**: Changes reflect immediately across the application
- **Form Validation**: Zod schema validation with React Hook Form
- **Image Handling**: Client-side image processing and preview

### UI/UX Features
- **Drag & Drop**: Intuitive image upload with visual feedback
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Visual feedback during form submissions
- **Toast Notifications**: Success/error messages for user actions
- **Modern Components**: shadcn/ui components for consistent design

## 📁 File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx              # Authentication state management
├── pages/admin/
│   ├── Login.tsx                   # Admin login page
│   ├── Dashboard.tsx               # Main dashboard layout
│   ├── AddProject.tsx              # Add new project form
│   └── EditProject.tsx             # Edit existing project form
├── components/
│   └── ProtectedRoute.tsx          # Route protection wrapper
└── App.tsx                         # Updated with admin routes
```

## 🎯 How to Use

### 1. Access the Admin Dashboard
1. Navigate to `http://localhost:8080/admin`
2. Enter the demo credentials:
   - **Email**: `admin@nextwave.com`
   - **Password**: `admin123`
3. Click "Sign In" to access the dashboard

### 2. Add a New Project
1. Click "Add Project" in the sidebar
2. **Upload Cover Image**: Drag & drop or click to browse
3. **Select Project Type**: Choose from existing categories
4. **Fill Form Fields**:
   - Project Name (required)
   - Description (required)
   - Purpose (required)
   - Client Name (required)
   - Year (required)
   - Tags (add multiple tags)
5. Click "Add Project" to save

### 3. Manage Existing Projects
1. Click "Manage Projects" in the sidebar
2. View all projects in the table
3. **Edit**: Click the edit button (✏️) to modify a project
4. **Delete**: Click the delete button (🗑️) to remove a project

### 4. Dashboard Overview
- View project statistics and counts
- See recent project additions
- Monitor published vs draft projects

## 🔧 Project Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **Cover Image** | File Upload | ✅ | Project cover image with drag & drop |
| **Project Type** | Dropdown | ✅ | Select from existing categories |
| **Project Name** | Text Input | ✅ | Name of the project |
| **Description** | Textarea | ✅ | Brief project description |
| **Purpose** | Textarea | ✅ | Project goals and objectives |
| **Client Name** | Text Input | ✅ | Client or company name |
| **Year** | Number Input | ✅ | Project completion year |
| **Tags** | Multi-Select | ✅ | Multiple project tags |

## 🎨 UI Components Used

- **Cards**: Project display and form containers
- **Buttons**: Actions and navigation
- **Inputs**: Text and number inputs
- **Textareas**: Multi-line text fields
- **Select**: Dropdown selections
- **Badges**: Status indicators and tags
- **Alerts**: Error and success messages
- **Loading States**: Spinners and disabled states

## 🔒 Security Features

- **Route Protection**: Unauthorized users redirected to login
- **Session Management**: Secure session handling
- **Form Validation**: Client-side validation with server-ready schemas
- **Input Sanitization**: Safe handling of user inputs

## 🚀 Future Enhancements

- [ ] **Backend Integration**: Connect to real API endpoints
- [ ] **User Management**: Multiple admin users with roles
- [ ] **Bulk Operations**: Select and manage multiple projects
- [ ] **Project Analytics**: View project performance metrics
- [ ] **Image Optimization**: Automatic image compression and resizing
- [ ] **Export/Import**: Backup and restore project data
- [ ] **Advanced Search**: Filter and search projects
- [ ] **Project Templates**: Pre-defined project structures
- [ ] **Client Management**: Dedicated client information system

## 🛡 Security Notes

⚠️ **Important**: This is a demo implementation using localStorage and client-side authentication. For production use:

1. **Implement proper backend authentication**
2. **Use secure session management (JWT, cookies)**
3. **Add proper password hashing (bcrypt)**
4. **Implement CSRF protection**
5. **Add rate limiting for login attempts**
6. **Use HTTPS in production**
7. **Implement proper image upload to secure storage**

## 📱 Responsive Design

The admin dashboard is fully responsive and works on:
- **Desktop**: Full sidebar navigation and table views
- **Tablet**: Collapsible sidebar and optimized layouts
- **Mobile**: Stack navigation and touch-friendly interfaces

## 🎯 Integration with Portfolio

Projects added through the admin dashboard automatically appear on the portfolio page:
- **Real-time Updates**: Changes reflect immediately
- **Status Management**: Published vs draft projects
- **Category Filtering**: Projects filter by type on portfolio
- **Image Display**: Cover images show in portfolio grid

## 📞 Support

For questions or issues with the admin dashboard:
1. Check the browser console for error messages
2. Verify all required fields are filled
3. Ensure image files are valid formats (PNG, JPG, GIF, WebP)
4. Check that image sizes are under 5MB

The admin dashboard is now fully functional and ready to manage your NextWave portfolio projects! 🎉




