# Personal Finance Visualizer

A modern, full-stack personal finance tracking application built with Next.js, TypeScript, and MongoDB. Track your expenses, visualize spending patterns, and manage your financial data with an intuitive interface.

## 🚀 Features

- **Transaction Management**: Add, edit, and delete financial transactions
- **Interactive Dashboard**: Overview of your financial data with key metrics
- **Monthly Expense Chart**: Visual representation of spending patterns using Recharts
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Real-time Updates**: UI updates instantly without page refreshes
- **Form Validation**: Comprehensive client and server-side validation
- **Accessibility**: Built with accessibility best practices using shadcn/ui

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Charts**: Recharts
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MongoDB database (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd personal-finance-visualizer
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your MongoDB connection string:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/personal_finance_db
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personal_finance_db
\`\`\`

### 4. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── transactions/
│   │       ├── route.ts          # GET, POST transactions
│   │       └── [id]/
│   │           └── route.ts      # PUT, DELETE individual transactions
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main dashboard
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── monthly-chart.tsx         # Monthly expense chart
│   ├── transaction-form.tsx      # Add/edit transaction form
│   └── transaction-list.tsx      # Transaction list with CRUD operations
├── lib/
│   ├── models/
│   │   └── transaction.ts        # Mongoose transaction model
│   ├── mongodb.ts                # Database connection
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
└── scripts/
    └── setup-database.sql        # Database setup documentation
\`\`\`

## 🔧 API Endpoints

- `GET /api/transactions` - Fetch all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/[id]` - Update a specific transaction
- `DELETE /api/transactions/[id]` - Delete a specific transaction

## 💾 Database Schema

### Transaction Model

\`\`\`typescript
{
  _id: ObjectId,
  amount: Number (required),
  date: Date (required),
  description: String (required, 1-500 chars),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🎨 UI Components

The application uses shadcn/ui components for a consistent and accessible design:

- **Cards**: For organizing content sections
- **Forms**: Input, Label, Textarea, Button components
- **Data Display**: Tables, Badges, Charts
- **Feedback**: Toast notifications, Loading states
- **Navigation**: Tabs for different views

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured dashboard with side-by-side layouts
- **Tablet**: Adapted layouts with collapsible sections
- **Mobile**: Stack layouts with touch-friendly interactions

## 🔒 Data Validation

- **Client-side**: Real-time form validation with user feedback
- **Server-side**: Mongoose schema validation with custom validators
- **Type Safety**: Full TypeScript coverage for type safety

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add your `MONGODB_URI` environment variable in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] Category-based expense tracking
- [ ] Budget planning and alerts
- [ ] Data export functionality
- [ ] Multi-currency support
- [ ] Recurring transaction templates
- [ ] Advanced filtering and search
- [ ] Data visualization improvements

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

Built with ❤️ using Next.js and modern web technologies.
