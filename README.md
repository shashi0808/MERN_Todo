# MERN Todo Application

A full-stack Todo application built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) featuring a clean, responsive UI and complete CRUD functionality.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## ✨ Features

### Core Requirements
- ✅ Create new tasks with title, description, and status
- 📖 View all tasks in a clean, organized list
- ✏️ Edit existing tasks (title, description, status)
- 🗑️ Delete tasks with confirmation
- 🔄 Toggle task status between pending and done
- 💾 Tasks persist in MongoDB database

### Bonus Features (All Implemented!)
- 🎯 **Advanced Filtering/Sorting**: Filter tasks by status (All, Pending, Done) + Sort by date, title, or status
- 📱 **Responsive UI with Clean Design**: Fully responsive design with modern Tailwind CSS styling
- 🔍 **Server-Side Rendering (SSR)**: Enhanced SEO with Next.js SSR, proper meta tags, and JSON-LD structured data
- 📊 **Additional Features**: Task statistics dashboard, real-time updates, improved form visibility

## 📁 Project Structure

```
MERN_Todo/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── task.ts
│   ├── .env.local
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MERN_Todo
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and update MONGODB_URI if needed:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/todoapp
# NODE_ENV=development

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:3000`

### 4. Database Setup

#### Option 1: Local MongoDB
- Ensure MongoDB is installed and running on your local machine
- The application will automatically create the `todoapp` database

#### Option 2: MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `backend/.env` with your Atlas connection string

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Tasks API
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Health Check
- `GET /api/health` - Server health check

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Open your browser and navigate to `http://localhost:3000`
3. Create a new task using the form
4. Test all CRUD operations:
   - Create tasks
   - View tasks in the list
   - Edit tasks by clicking the "Edit" button
   - Toggle task status using "Mark Done"/"Mark Pending"
   - Delete tasks with confirmation
   - Filter tasks using the filter buttons

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Task Statistics**: Visual dashboard showing total, pending, and completed tasks
- **Status Indicators**: Color-coded task status with visual feedback
- **Filter System**: Easy filtering between all, pending, and completed tasks
- **Interactive Forms**: Clean forms with validation and user feedback
- **Error Handling**: User-friendly error messages and loading states

## 📝 Task Schema

```javascript
{
  _id: ObjectId,
  title: String (required, max 100 characters),
  description: String (required, max 500 characters),
  status: String (enum: ['pending', 'done'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🏆 Bonus Features Implemented

This application goes beyond the basic requirements and implements **all** the suggested bonus features:

### 1. Advanced Filtering and Sorting ✅
- **Filtering**: Filter tasks by status (All, Pending, Done) with intuitive buttons
- **Sorting**: Sort tasks by:
  - **Date Created**: Most recent first (default)
  - **Title A-Z**: Alphabetical sorting by task title
  - **Status**: Sort by completion status (pending tasks first)

### 2. Responsive UI with Clean Design ✅
- **Mobile-First Design**: Fully responsive layout that works on all devices
- **Modern Styling**: Clean, professional design using Tailwind CSS
- **Enhanced UX**: Dark, visible form inputs with proper contrast
- **Interactive Elements**: Hover states, focus indicators, and visual feedback
- **Color-Coded Status**: Visual indicators for task completion status

### 3. Server-Side Rendering (SSR) for Better SEO ✅
- **Next.js SSR**: Enhanced SEO with server-side rendering capabilities
- **Rich Meta Tags**: Comprehensive meta tags for social media sharing
- **JSON-LD Structured Data**: Schema.org markup for better search engine understanding
- **SEO-Optimized**: Proper page titles, descriptions, and Open Graph tags

### 4. Additional Enhancements
- **Task Statistics Dashboard**: Real-time counters for total, pending, and completed tasks
- **Improved Form Visibility**: Enhanced input styling with better contrast and readability
- **Real-time Updates**: Immediate UI updates without page refresh
- **Error Handling**: User-friendly error messages and loading states

## 🚀 Deployment

This application is ready for production deployment with the following stack:

- **Frontend**: Vercel (Recommended)
- **Backend**: Render (Free tier available)
- **Database**: MongoDB Atlas (Free tier available)

### Quick Deployment Guide

1. **MongoDB Atlas**: Create free cluster and get connection string
2. **Render**: Deploy backend with environment variables
3. **Vercel**: Deploy frontend with API URL configuration

### Detailed Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step deployment guide including:
- MongoDB Atlas cluster setup
- Render backend deployment
- Vercel frontend deployment
- Environment variable configuration
- CORS setup for production
- Troubleshooting guide

### Production URLs

After deployment, your app will be accessible at:
- **Live App**: `https://your-project.vercel.app`
- **API Endpoints**: `https://your-backend.onrender.com/api`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Backend not connecting to MongoDB**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Frontend not connecting to backend**
   - Ensure backend server is running on port 5000
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Verify CORS is properly configured

3. **Tasks not loading**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check network tab for failed requests

### Need Help?

If you encounter any issues, please check:
1. All servers are running
2. Environment variables are correctly set
3. Dependencies are properly installed
4. Database connection is established

---

**Built with ❤️ using the MERN Stack**