# StudioSpace 🎬

**StudioSpace** is a creative workspace and studio-sharing marketplace built with Next.js. It connects creators, photographers, filmmakers, podcasters, musicians, and other creative professionals with studios and production spaces that fit their needs.

Users can explore creative spaces, publish studio listings, manage their studios, and book available spaces through a modern and responsive web application.

## 🌐 Live Demo

- **Live Website:** https://studio-space-client-one.vercel.app/
- **Frontend Repository:** https://github.com/md-saim850/StudioSpace-client
- **Backend Repository:** https://github.com/md-saim850/StudioSpace-server

## ✨ Features

### 🏠 Studio Discovery
- Explore available creative studios.
- Browse studios by category.
- View detailed studio information.
- Discover featured studio listings.
- Filter and explore available spaces.

### 🔐 Authentication
- User registration and login.
- Secure authentication using Better Auth.
- Session management.
- Protected routes.
- Authenticated user information.

### 🏢 Studio Management
- Add new studio listings.
- Manage personal studio listings.
- Update studio information.
- Delete studio listings.
- Upload studio information, pricing, amenities, and location.

### 📅 Booking Management
- Book creative studios.
- Select booking dates and time slots.
- View personal bookings.
- Manage booking information.
- Check booking availability.

### 📊 Dashboard
- Personalized user dashboard.
- Manage studio listings.
- View booking information.
- Access account-related features.
- Navigate between dashboard sections.

### 🎨 User Interface
- Responsive design for desktop, tablet, and mobile.
- Modern and minimal user interface.
- Dark and light mode support.
- Interactive components and animations.
- Smooth navigation and user experience.
- Toast notifications for user feedback.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework |
| React 19 | UI development |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Better Auth | Authentication |
| MongoDB | Database integration |
| HeroUI | UI components |
| shadcn/ui | Reusable components |
| Lucide React | Icons |
| React Icons | Additional icons |
| Swiper | Sliders and carousels |
| Sonner | Toast notifications |
| next-themes | Dark/light mode |

## 📁 Project Structure

```text
StudioSpace-client/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── studios/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │
│   ├── lib/
│   │
│   └── ...
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run StudioSpace locally.

### 1. Clone the repository

```bash
git clone https://github.com/md-saim850/StudioSpace-client.git
```

### 2. Navigate to the project directory

```bash
cd StudioSpace-client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory.

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string
```

**Important:** Use the environment variable names configured in your application. For production, configure the corresponding values in Vercel Environment Variables.

Never commit your `.env.local` file or expose private credentials.

### 5. Run the development server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## 🔗 Backend API Integration

StudioSpace Client communicates with the Express.js backend through REST API endpoints.

**Production API:**

```text
https://studio-space-server-tau.vercel.app
```

**Local API:**

```text
http://localhost:5000
```

The frontend uses the backend for:

- Fetching studio categories.
- Retrieving studio listings.
- Fetching individual studio details.
- Creating and managing studio listings.
- Creating studio bookings.
- Retrieving personal bookings.

Authentication-protected requests use Bearer tokens to communicate securely with the backend.

## 🔒 Authentication

StudioSpace uses Better Auth for user authentication and session management.

Authentication features include:

- Sign-up and sign-in.
- Session handling.
- Protected dashboard pages.
- User-specific studio management.
- Authenticated API requests.
- JWT-based backend authentication.

## 🚀 Deployment

The frontend is deployed using **Vercel**.

To deploy your own instance:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Ensure your production backend API URL is configured.
5. Configure the Better Auth production URL and secret.
6. Deploy the application.

After deployment, verify that authentication, API requests, studio listings, and booking functionality work correctly.

## 🔗 Related Project

StudioSpace consists of two main applications:

| Project | Technology | Repository |
|---|---|---|
| Frontend | Next.js, React, TypeScript | [StudioSpace Client](https://github.com/md-saim850/StudioSpace-client) |
| Backend | Node.js, Express.js, MongoDB | [StudioSpace Server](https://github.com/md-saim850/StudioSpace-server) |

## 👨‍💻 Author

**MD. Saim**

Full-Stack Web Developer

- GitHub: [@md-saim850](https://github.com/md-saim850)
- Portfolio: [mdsaim.vercel.app](https://mdsaim.vercel.app/)
- LinkedIn: [MD. Saim](https://www.linkedin.com/in/md-saim850)

---

⭐ If you find StudioSpace interesting, consider giving the repository a star!

**Built with ❤️ using Next.js, React, TypeScript, and MongoDB.**