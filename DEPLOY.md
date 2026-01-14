# Deploying to Vercel

Yes, you can deploy this project to Vercel! Here is how to do it and what you need to know.

## ⚠️ Important: SQLite Database Limitation
This project currently uses **SQLite**, which stores data in a local file (`dev.db`).
- **Vercel is serverless/ephemeral**: This means the filesystem is not persistent.
- **Consequence**: You can deploy the site, and it will work for reading data, but **any resources you add will be lost** when the app redeploys or sleeps.
- **Solution for Production**: For a real production app, you should switch to a cloud database like **Vercel Postgres**, **Supabase**, or **PlanetScale**.

## Option 1: Deploy as-is (Demo Mode)
If you just want to see it live and don't care about persistent data storage:

1. **Push to GitHub**:
   - Initialize git: `git init`
   - Add files: `git add .`
   - Commit: `git commit -m "Initial commit"`
   - Push to a new GitHub repository.

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New > Project**.
   - Import your GitHub repository.

3. **Configure Build**:
   - **Framework Preset**: Next.js (Auto-detected)
   - **Build Command**: `npx prisma generate && next build`
     - *Note: You need to ensuring `prisma generate` runs to create the client.*
   - **Environment Variables**:
     - `DATABASE_URL`: `file:./dev.db` (or whatever you want, but Vercel might not find the file if it's gitignored)
     - *Better*: Remove `*.db` from `.gitignore` temporarily if you want to seed it with data from your computer.

## Option 2: Deploy with Vercel Postgres (Recommended)
 To make the "Add Resource" feature work permanently:

1. **Create a Vercel Storage Database**:
   - In your Vercel Project, go to the **Storage** tab.
   - Click **Connect Store** -> **Postgres**.
   - Follow instructions to create a database.

2. **Update Project**:
   - Pull the environment variables (`.env.local`).
   - Update `prisma/schema.prisma`:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Run migrations: `npx prisma migrate deploy`
   - Commit and push.

## Build Command
During deployment, Vercel needs to generate the Prisma Client. Update your "Build Command" in Vercel settings if it fails:
`npx prisma generate && next build`
