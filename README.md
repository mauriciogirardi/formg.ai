# AI Form Builder formg.ia

❤️ Support
If you find this project helpful, please consider giving this repository a ⭐️ on GitHub.

📌 Project Overview
Welcome to the AI Form Builder repository! This project leverages cutting-edge tools and frameworks to create a dynamic and efficient form-building platform powered by AI. The AI Form Builder provides a seamless drag-and-drop experience, empowering users to create forms effortlessly while collecting valuable insights.

- 🌟 Features 
- 🔐 Authentication with Kinde
- ➕ Create Forms
- 🧠 AI-Powered Form Generation
- ✏️ Edit Block Properties
- 💾 Save & Publish Forms
- 🔗 Share Form Links
- 📊 User Response Collection
- 🌐 Track User Analytics on Forms
- 🌐 Built with Next.js 14
- 🎨 Styled with TailwindCSS and Shadcn UI
- 🚀 Seamless Integration with Server Actions
- 💾 Neon PostgreSQL & Prisma ORM
- 📤 Deployed on Vercel
- 🚀 Tools & Technologies

### This project is built using:

Next.js 14: Fast, SEO-friendly frontend framework.
Server Actions: For seamless backend API integration.
Prisma ORM: SQL ORM for efficient database management.
TailwindCSS: For rapid, responsive styling.
Shadcn UI: Modern, customizable UI components.
Neon PostgreSQL: Scalable and reliable database solution.

### 🔄 How to Get Started


1. Set Up Environment Variables, Create a .env file in the root of your project and add the following:

```env
KINDE_SITE_URL=<your-kinde-site-url>
KINDE_POST_LOGOUT_REDIRECT_URL=<your-post-logout-url>
KINDE_POST_LOGIN_REDIRECT_URL=<your-post-login-url>
NEXT_PUBLIC_APP_URL=<your-app-url>

DATABASE_URL=<direct-database-url>
DIRECT_DATABASE_URL=<direct-database-url>

NEXT_PUBLIC_GEMINI_API_KEY=<gemini-api-key>

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

2. Get Database URLs from Neon, log in to Neon:

- Navigate to Neon and log in to your account.
Access Project Settings:

Select your project and go to the Settings tab.
Find URLs:

Direct Database URL: Look under the connection settings for the URL labeled "Direct Connection". Copy and paste it into your .env file as DIRECT_DATABASE_URL.
Pooler Database URL: Look under the "Connection Pooler" section for the Pooler URL. Use this as DATABASE_URL in your .env file.
Note: If you encounter issues accessing your Neon database, refer to the troubleshooting guide in \_neon_database_help/database.md for detailed steps.

3. Run the Development Server, start the development server:
- npm run dev
- Access the application at http://localhost:3000.
