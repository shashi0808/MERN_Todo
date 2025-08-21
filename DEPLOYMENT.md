# 🚀 MERN Todo App - Deployment Guide

Complete guide to deploy the MERN Todo application using Vercel (Frontend), Render (Backend), and MongoDB Atlas (Database).

## 📋 Prerequisites

1. **GitHub Account** (to push code)
2. **MongoDB Atlas Account** (free tier available)
3. **Render Account** (free tier available)
4. **Vercel Account** (free tier available)

## 🗂️ Deployment Steps

### 1️⃣ Setup MongoDB Atlas Database

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create a New Cluster**
   - Choose "Free Shared" tier
   - Select cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password
   - Set user privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0)
   - Or add specific IP addresses for security

5. **Get Connection String**
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<dbname>` with your values

### 2️⃣ Deploy Backend to Render

1. **Push Code to GitHub**
   ```bash
   cd C:\\Users\\91766\\Downloads\\MERN_Todo
   git init
   git add .
   git commit -m "Initial commit - MERN Todo App"
   git branch -M main
   git remote add origin https://github.com/your-username/mern-todo.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Sign up/Login with GitHub
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `mern-todo-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`

3. **Set Environment Variables**
   - In Render dashboard, go to "Environment"
   - Add these variables:
     ```
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/todoapp?retryWrites=true&w=majority
     JWT_SECRET=your_super_secure_jwt_secret_key_here
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-service-name.onrender.com`

### 3️⃣ Deploy Frontend to Vercel

1. **Update Frontend Configuration**
   - Create production environment file:
   ```bash
   cd frontend
   echo "NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com/api" > .env.production
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Set Environment Variables**
   - In Vercel dashboard, go to "Settings" → "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_API_URL = https://your-render-backend.onrender.com/api
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL: `https://your-project.vercel.app`

### 4️⃣ Update CORS Configuration

1. **Update Backend CORS**
   - Go to your GitHub repository
   - Edit `backend/index.js`
   - Update the CORS origin:
   ```javascript
   const corsOptions = {
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://your-project.vercel.app'] // Your actual Vercel URL
       : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
     credentials: true
   };
   ```

2. **Redeploy Backend**
   - Commit and push changes
   - Render will automatically redeploy

### 5️⃣ Test Your Deployment

1. **Visit Your Vercel URL**
   - Open `https://your-project.vercel.app`
   - Test registration and login
   - Create, edit, delete tasks
   - Test filtering and sorting

2. **Verify Features**
   - ✅ User authentication
   - ✅ Task CRUD operations
   - ✅ Filtering and sorting
   - ✅ Responsive design
   - ✅ Data persistence

## 🔧 Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/todoapp?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_here
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com/api
```

## 🌐 Production URLs

After deployment, you'll have:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-render-backend.onrender.com`
- **Database**: MongoDB Atlas cluster

## 🔒 Security Notes

1. **Use strong passwords** for MongoDB Atlas
2. **Generate secure JWT secret** (32+ characters)
3. **Restrict IP access** in MongoDB Atlas if possible
4. **Use HTTPS** for all production communications

## 📝 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is added to backend CORS configuration
   - Check that URLs don't have trailing slashes

2. **Database Connection Errors**
   - Verify MongoDB connection string
   - Check network access settings in Atlas
   - Ensure IP address is whitelisted

3. **Environment Variables**
   - Double-check all environment variables are set correctly
   - Restart services after updating environment variables

4. **Build Failures**
   - Check build logs in Vercel/Render dashboards
   - Ensure all dependencies are listed in package.json

## 🎉 Success!

Your MERN Todo application is now deployed and accessible worldwide! 

- Users can register and login
- Tasks are stored in MongoDB Atlas
- The app is fully responsive and SEO optimized
- All bonus features are working in production

---

**Need help?** Check the deployment logs in Vercel and Render dashboards for detailed error information.