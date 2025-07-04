# Legal Pocket Compass 🧭⚖️

A modern, user-friendly legal assistance platform that makes legal information accessible to everyone through plain language explanations and jurisdiction-aware guidance.

## 🌟 Overview

Legal Pocket Compass is a full-stack web application designed to democratize legal information. It provides users with easy-to-understand legal guidance by translating complex legal concepts into plain language while maintaining accuracy and providing jurisdiction-specific information.

### Key Features

- **🤖 AI-Powered Chat Interface** - Get instant legal guidance through natural conversation
- **🗺️ Jurisdiction Awareness** - Location-specific legal information and advice
- **📚 Plain Language Explanations** - Complex legal concepts explained simply
- **🔐 Secure Authentication** - AWS Cognito integration for user management
- **📱 Responsive Design** - Works seamlessly across all devices
- **⚡ Real-time Updates** - Live chat with instant responses
- **👥 Waitlist Management** - Controlled access with admin approval system

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **shadcn/ui** for beautiful, accessible components
- **React Router** for client-side routing
- **React Query** for efficient data fetching
- **AWS Amplify** for authentication and cloud services

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for data persistence
- **AWS JWT Verification** for secure authentication
- **Swagger/OpenAPI** for comprehensive API documentation
- **CORS** enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- AWS Account (for Cognito and other services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fortune-devop/legal-pocket-compass.git
   cd legal-pocket-compass
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**

   Create `.env` files in both frontend and backend directories:

   **Frontend `.env**:**
   ```env
   VITE_AWS_USER_POOL_ID=your_user_pool_id
   VITE_AWS_USER_POOL_CLIENT_ID=your_client_id
   VITE_AWS_IDENTITY_POOL_ID=your_identity_pool_id
   VITE_API_URL=http://localhost:4000
   ```

   **Backend `.env**:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/legal-pocket-compass
   AWS_USER_POOL_ID=your_user_pool_id
   AWS_USER_POOL_CLIENT_ID=your_client_id
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   PORT=4000
   ```

4. **Start the development servers**

   **Option 1: Start both services together**
   ```bash
   npm run dev
   ```

   **Option 2: Start services separately**
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - API Documentation: http://localhost:4000/api-docs

## 📁 Project Structure

```
legal-pocket-compass/
├── frontend/                 # Frontend application
│   ├── src/                  # React source code
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── tsconfig.json        # TypeScript configuration
├── backend/                  # Backend application
│   ├── config/              # Configuration files
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── app.js               # Express app entry point
│   └── package.json         # Backend dependencies
├── package.json             # Root package.json with workspace scripts
├── README.md                # Project documentation
└── .gitignore               # Git ignore rules
```

## 🔧 Available Scripts

### Root Level (Run from project root)
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both services in production mode
- `npm run install:all` - Install dependencies for all workspaces
- `npm run lint` - Run linting for both frontend and backend

### Frontend (Run from frontend/ directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (Run from backend/ directory)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🛠️ Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Conventional commits for version control

### Testing
- Frontend: React Testing Library (planned)
- Backend: Jest (planned)

### Deployment
- Frontend: Vercel/Netlify ready
- Backend: AWS EC2/Heroku ready
- Database: MongoDB Atlas

## 🔐 Security Features

- JWT-based authentication with AWS Cognito
- CORS protection
- Environment variable management
- Input validation and sanitization
- Rate limiting (planned)

## 📊 API Documentation

The backend includes comprehensive API documentation using Swagger/OpenAPI. Access it at:
- Development: http://localhost:4000/api-docs
- Production: https://your-domain.com/api-docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Powered by [AWS Amplify](https://aws.amazon.com/amplify/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email linusfortune54@gmail.com or join our Discord community.

---

**Legal Pocket Compass** - Making legal information accessible to everyone. ⚖️✨
