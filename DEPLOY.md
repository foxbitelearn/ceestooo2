# 🚀 Deployment Guide: Ceestoo on Netlify with Database

Your application has been upgraded to use a professional **PostgreSQL Database** (via Prisma). This makes it ready for the public!

> **⚠️ IMPORTANT**: Your local app might stop working until you complete **Step 1** because it now expects a real database connection.

---

## Step 1: Get a Free Cloud Database
We will use **Neon** (or Supabase) for a free, fast Postgres database.

1.  Go to [Neon.tech](https://neon.tech) and Sign Up.
2.  Create a **New Project**.
    - Name: `ceestoo-db`
    - Region: Closest to you (e.g., Singapore or US).
3.  **Copy the Connection String**:
    - Look for the "Connection String" on the dashboard.
    - Make sure "Pooled connection" is checked (if available).
    - It looks like: `postgres://neondb_...`

## Step 2: Connect Your Local App
1.  Open the file called `.env` in your project folder (`Downloads/ceestoo/.env`).
2.  Replace the placeholder with your **real** Connection String from Step 1.
    ```env
    DATABASE_URL="postgres://neondb_owner:password@ep-cool-cloud.aws.neon.tech/neondb?sslmode=require"
    ```
    *(Make sure to keep the quotes)*
3.  **Initialize the Database**:
    Open your terminal (PowerShell) in the project folder and run:
    ```powershell
    npx prisma generate
    npx prisma db push
    ```
    - `generate`: Sets up the code to talk to your DB.
    - `db push`: Creates the tables (User, Message, Review) in your online database.

    > **Success?** If these commands finish without error, your local app is fixed! Run `npm run dev` to test it.

---

## Step 3: Publish to GitHub
1.  Go to [GitHub.com](https://github.com) and create a new repository called `ceestoo`.
2.  Push your code:
    ```powershell
    git init
    git add .
    git commit -m "Ready for deploy"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/ceestoo.git
    git push -u origin main
    ```

---

## Step 4: Deploy to Netlify
1.  Go to [Netlify.com](https://netlify.com) and Sign Up/Login.
2.  Click **"Add new site"** -> **"Import from an existing project"**.
3.  Choose **GitHub** and select your `ceestoo` repository.
4.  **Configure Settings**:
    - **Build Command**: `npx prisma generate && next build`
    - **Publish Directory**: `.next`
5.  **Environment Variables** (Crucial!):
    - Click "Add environment variable".
    - Key: `DATABASE_URL`
    - Value: (Paste your Neon Connection String again)
6.  Click **Deploy**.

---

## 🎉 Done!
Your site will be live in a few minutes.
- **Admin Access**: Works exactly the same (`DHRUPAD` / `826`).
- **Data**: All messages are now safely stored in the cloud, so you won't lose them if you redeploy.
