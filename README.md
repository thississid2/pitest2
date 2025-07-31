# 🥧 Pi - Intelligent Business Analytics Platform

A comprehensive Next.js application providing intelligent business analytics, fraud protection, data reconciliation, and AI-powered insights for modern enterprises.

## 🚀 Features

### 🔐 Authentication System
- Secure JWT-based authentication
- Database-backed user management
- Protected route middleware
- Account lockout protection

### 📊 Analytics & Intelligence
- **Pi Analytics** - Real-time business metrics and insights
- **Pi Symphony** - AI-powered data analysis and predictions
- **Pi Shield** - Advanced fraud protection and security monitoring
- **Pi Recon** - Automated reconciliation and settlement tools
- **Pi Deepsearch** - Intelligent business AI chat interface

### 🛠️ Management Tools
- **User Management** - Comprehensive user administration
- **API Integration** - Seamless third-party integrations
- **Checkout Solutions** - Payment processing and templates
- **Settings & Profile** - Customizable user preferences

## 🏗️ Technology Stack

- **Framework**: Next.js 15.3.4 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: PostgreSQL (AWS Aurora)
- **Authentication**: JWT with bcrypt password hashing
- **UI Components**: Radix UI primitives
- **Charts**: Chart.js & ECharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
pi/
├── app/                          # Next.js App Router
│   ├── api/auth/                # Authentication endpoints
│   ├── login/                   # Login page
│   ├── pi-analytics/            # Analytics dashboard
│   ├── pi-shield/               # Fraud protection
│   ├── pi-symphony/             # AI analysis
│   ├── pi-recon/                # Reconciliation tools
│   ├── pi-deepsearch/           # AI search interface
│   ├── pi-checkout/             # Payment processing
│   ├── user-management/         # User administration
│   └── [other-routes]/          # Additional features
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   ├── graphs/                  # Chart components
│   └── [feature-components]/    # Feature-specific components
├── contexts/                     # React context providers
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities and configurations
├── utils/                        # Helper functions
└── public/                       # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (AWS Aurora recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Piresearch1/pi.git
   cd pi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file and configure your settings:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   # Database Configuration
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_NAME=pi_database
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   
   # Database Pool Configuration
   DB_MAX_CONNECTIONS=20
   DB_IDLE_TIMEOUT=30000
   DB_CONNECTION_TIMEOUT=2000
   
   # JWT Authentication (generate a secure random string)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Environment
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Ensure your PostgreSQL database has the `client_users` table with the required schema:
   ```sql
   CREATE TABLE client_users (
     id VARCHAR(100) PRIMARY KEY,
     client_id VARCHAR(100) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password_hash VARCHAR(255) NOT NULL,
     role VARCHAR(30) NOT NULL DEFAULT 'USER',
     permissions TEXT,
     first_name VARCHAR(100),
     last_name VARCHAR(100),
     phone VARCHAR(20),
     last_login_at TIMESTAMP,
     failed_login_attempts INTEGER DEFAULT 0,
     locked_until TIMESTAMP,
     password_expires_at TIMESTAMP,
     must_change_password BOOLEAN DEFAULT false,
     two_factor_enabled BOOLEAN DEFAULT false,
     two_factor_secret VARCHAR(100),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     created_by VARCHAR(100) NOT NULL,
     status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
     email_verified BOOLEAN DEFAULT false,
     email_verification_token VARCHAR(100),
     password_reset_token VARCHAR(100),
     password_reset_expires_at TIMESTAMP,
     timezone VARCHAR(50) DEFAULT 'UTC',
     language VARCHAR(10) DEFAULT 'en',
     notes VARCHAR(500)
   );
   ```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The application will be available at `http://localhost:3001`

## 🔐 Authentication

### Login Credentials
Use your database credentials to log in. The system supports:
- Email/password authentication
- JWT token-based sessions
- Automatic route protection
- Account lockout after failed attempts

### Security Features
- bcrypt password hashing (10 salt rounds)
- HTTP-only JWT cookies
- Session expiration (24 hours)
- CSRF protection
- SQL injection protection
- Environment variable protection (sensitive data not in code)
- Database credentials secured in `.env` files

### Environment Security
⚠️ **Important Security Notes:**
- Never commit `.env` files to version control
- Use different credentials for development/production
- Regularly rotate JWT secrets and database passwords
- Use strong, unique passwords for database connections

## 🎨 UI Components

The application uses a custom design system with:
- **Responsive Design** - Mobile-first approach
- **Dark/Light Themes** - Automatic theme detection
- **Accessibility** - ARIA compliant components
- **Animations** - Smooth transitions and micro-interactions
- **Loading States** - Comprehensive loading indicators

## 📊 Key Features

### Pi Analytics
- Real-time dashboards
- Performance metrics
- Data visualization
- Trend analysis

### Pi Shield
- Fraud detection algorithms
- Risk assessment tools
- Security monitoring
- Alert systems

### Pi Symphony
- AI-powered insights
- Predictive analytics
- Data processing pipelines
- Machine learning models

### Pi Recon
- Automated reconciliation
- Settlement tracking
- Discrepancy detection
- Financial reporting

## 🛠️ Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

### Component Structure
- Functional components with hooks
- Props interfaces with TypeScript
- Consistent naming conventions
- Modular architecture

### State Management
- React Context for global state
- Custom hooks for business logic
- Local state for component-specific data

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all production environment variables are set:
- `JWT_SECRET` - Strong random string
- Database connection details
- Any third-party API keys

### Recommended Platforms
- **Vercel** - Seamless Next.js deployment
- **AWS** - Full infrastructure control
- **Docker** - Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software owned by Pi Research.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the Pi Research Team**
# pi
