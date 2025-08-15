# NebulaNFT - Complete NFT Marketplace

A full-stack NFT marketplace built with Next.js, Express, MongoDB, and featuring modern UI with Tailwind CSS and Framer Motion animations.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Beautiful, responsive design with dark theme options
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Authentication**: User registration, login, and wallet connection simulation
- **NFT Browsing**: Browse NFTs with advanced filtering, search, and pagination
- **NFT Details**: Detailed view for each NFT with creator/owner information
- **NFT Creation**: Upload and create new NFTs with metadata
- **User Profiles**: View user profiles and their created/owned NFTs
- **Responsive Design**: Mobile-first approach with full responsiveness

### Backend Features
- **RESTful API**: Complete API with authentication and CRUD operations
- **User Management**: Registration, login, and profile management
- **NFT Management**: Create, read, update, delete NFTs
- **Transaction System**: Simulated NFT purchase transactions
- **File Upload**: Secure image upload with Multer and Sharp processing
- **Database Integration**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with middleware

### Technical Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer with Sharp image processing
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nebulanft-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cp server/.env.example server/.env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/nebulanft
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=10485760
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud MongoDB service.

5. **Run the application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately
   npm run dev:frontend  # Frontend on http://localhost:3000
   npm run dev:backend   # Backend on http://localhost:5000
   ```

## 🏗️ Project Structure

```
nebulanft-marketplace/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React Components
│   │   ├── hooks/         # Custom Hooks
│   │   ├── lib/           # Utilities and API client
│   │   └── types/         # TypeScript Types
│   ├── public/            # Static Assets
│   └── package.json
├── server/                # Express Backend
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── controllers/   # Route Controllers
│   │   ├── middleware/    # Express Middleware
│   │   ├── models/       # Mongoose Models
│   │   ├── routes/        # API Routes
│   │   ├── utils/         # Utility Functions
│   │   └── index.ts       # Server Entry Point
│   ├── uploads/           # File Upload Directory
│   └── package.json
├── package.json           # Root Package.json
└── README.md
```

## 🎯 Usage Guide

### For Users

1. **Registration/Login**
   - Create an account with email and password
   - Or connect with a simulated wallet

2. **Browse NFTs**
   - Use the search bar to find specific NFTs
   - Filter by category, price range, and sort options
   - Navigate through pages using pagination

3. **View NFT Details**
   - Click on any NFT to see detailed information
   - View creator and owner profiles
   - See properties and metadata

4. **Create NFTs**
   - Click "Create NFT" button (requires login)
   - Upload an image and fill in the details
   - Set price and category

5. **Purchase NFTs**
   - Click "Buy Now" on any listed NFT
   - Complete the simulated purchase process

### For Developers

#### API Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/wallet-login` - Wallet login simulation

**NFTs**
- `GET /api/nft` - Get all NFTs with filtering and pagination
- `GET /api/nft/:id` - Get single NFT by ID
- `POST /api/nft` - Create new NFT (authenticated)
- `POST /api/nft/:id/buy` - Buy NFT (authenticated)
- `PUT /api/nft/:id` - Update NFT (authenticated, creator only)
- `DELETE /api/nft/:id` - Delete NFT (authenticated, creator only)

**Users**
- `GET /api/user/profile/:userId` - Get user profile
- `PUT /api/user/profile` - Update user profile (authenticated)
- `GET /api/user/transactions` - Get user transactions (authenticated)

#### Database Schema

**User Model**
```typescript
{
  username: String,
  email: String,
  password: String,
  walletAddress: String,
  avatar: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

**NFT Model**
```typescript
{
  name: String,
  description: String,
  image: String,
  price: Number,
  currency: String,
  creator: ObjectId,
  owner: ObjectId,
  category: String,
  tags: [String],
  properties: Object,
  isListed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Transaction Model**
```typescript
{
  nft: ObjectId,
  buyer: ObjectId,
  seller: ObjectId,
  price: Number,
  currency: String,
  transactionHash: String,
  status: String,
  createdAt: Date
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL

3. **Deploy to Netlify**
   - Build the project as above
   - Deploy the `client/out` folder to Netlify
   - Set environment variables

### Backend Deployment (Render/Heroku)

1. **Build the backend**
   ```bash
   cd server
   npm run build
   ```

2. **Deploy to Render**
   - Connect your GitHub repository to Render
   - Set environment variables from `.env` file
   - Configure the start command: `npm start`

3. **Deploy to Heroku**
   - Create a new Heroku app
   - Set environment variables
   - Deploy using Heroku CLI

### MongoDB Atlas (Cloud Database)

1. **Create a MongoDB Atlas account**
2. **Create a new cluster**
3. **Get your connection string**
4. **Update `MONGODB_URI` in your environment variables**

## 🛠️ Development

### Adding New Features

1. **Frontend Components**
   - Create new components in `client/src/components/`
   - Use existing UI components from `client/src/components/ui/`
   - Follow the established naming conventions

2. **Backend Routes**
   - Add new controllers in `server/src/controllers/`
   - Create routes in `server/src/routes/`
   - Update the main server file in `server/src/index.ts`

3. **Database Models**
   - Add new models in `server/src/models/`
   - Update existing models with new fields
   - Create migrations if needed

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful comments
- Use semantic HTML5 elements
- Implement responsive design
- Add proper error handling

### Testing

```bash
# Run linting
npm run lint

# Run frontend tests (if added)
cd client && npm test

# Run backend tests (if added)
cd server && npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for beautiful animations
- MongoDB for the powerful NoSQL database
- All the open source libraries used in this project

## 📞 Support

If you have any questions or need support, please:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

---

**Happy coding! 🚀**