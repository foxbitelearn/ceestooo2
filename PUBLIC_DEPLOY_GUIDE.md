# 🌐 The Ultimate Guide to Going Public (Feb 2026 Edition)

This is your step-by-step master guide to taking **Ceestoo** from your computer to the entire world.

**The Goal**: A live website (e.g., `ceestoo.vercel.app`) with a working database that remembers everyone's messages forever.
**The Tech**: GitHub (Code) + Neon (Database) + Vercel (Hosting).

---

## ⚠️ Step 0: Install Git (Required!)
*Your computer says "git is not recognized", so we must install it first.*

1.  Download Git from: **[git-scm.com](https://git-scm.com/download/win)**
2.  Run the installer. Just click **"Next"** through all the options (default is fine).
3.  **Correct Installation Check**: Once installed, **Restart VS Code** completely (Close it and open it again).
4.  Open the terminal in VS Code (Ctrl+`) and type:
    ```bash
    git --version
    ```
    *If it shows a version number (like `git version 2.43.0`), you are ready!*
    *If not, try restarting your computer.*

5.  **Configure Your Identity** (Run these two commands in the terminal):
    ```bash
    git config --global user.name "foxbite"
    git config --global user.email "foxbitelearning@gmail.com"
    ```

---

## 🛠️ Step 1: Put Your Code on GitHub
*We need to upload your project folder to the cloud so Vercel can see it.*

1.  **Open GitHub**: Go to [github.com](https://github.com) and Log in.
2.  **Create Repository**:
    *   Click the **+** icon (top right) -> **New repository**.
    *   Name it: `ceestoo`.
    *   Descriptions: "Internal Class Project".
    *   Public/Private: **Private** is recommended.
    *   Click **Create repository**.
3.  **Upload Code (Using Terminal)**:
    *   Go back to **VS Code Terminal**.
    *   Run these commands exactly (Ctrl+C to copy, Right-Click in terminal to paste):
        ```bash
        git init
        git add .
        git commit -m "Initial commit for deployment"
        git branch -M main
        git remote add origin https://github.com/foxbitelearn/ceestoo.git
        git push -u origin main
        ```
    *   *(If it asks for credentials, follow the browser popup!)*

---

## 🗄️ Step 2: Get a Free Database (Neon)
*We need a place to store messages because Vercel doesn't store files.*

1.  Go to [neon.tech](https://neon.tech) and Sign Up.
2.  Create a **New Project**.
    *   Name: `ceestoo-db`.
    *   Region: Choose one close to you (e.g., Singapore, US East).
3.  **Get the Connection String**:
    *   On the dashboard, find the **Connection String**.
    *   Make sure **"Pooled connection"** is checked.
    *   Click **Copy**. (It looks like `postgres://neondb_owner:password@...`).
    *   *Save this for Step 3.*

---

## 🚀 Step 3: Launch on Vercel
*This connects your GitHub code to the Neon database.*

1.  Go to [vercel.com](https://vercel.com) and Sign Up/Log in.
2.  Click **Add New...** -> **Project**.
3.  **Import GitHub Repo**:
    *   You should see `ceestoo` in the list. Click **Import**.
4.  **Configure Project** (CRITICAL SECTION):
    *   Open the **"Environment Variables"** section.
    *   Add these **TWO** variables:

    | Key | Value |
    | :--- | :--- |
    | `DATABASE_URL` | *(Paste the Neon string you copied in Step 2)* |
    | `STORAGE_MODE` | `db` |

    > **Why STORAGE_MODE?** This tells your app: *"We are live now! Stop using local files and use the real database!"*

5.  **Build Settings** (The Secret Sauce):
    *   Click to expand **"Build and Output Settings"**.
    *   In the **Build Command** box, override the default and type EXACTLY this:
        ```bash
        npx prisma generate && npx prisma db push --accept-data-loss && next build
        ```
    *   *This command installs the database tools, creates your tables, and then builds the site.*

6.  Click **Deploy**.

---

## 🎉 Step 4: Verification
1.  Wait about 2 minutes. Vercel will show confetti!
2.  Click the **Domain** link (e.g., `ceestoo.vercel.app`).
3.  **Test It**:
    *   Log in as `DHRUPAD` (Passcode: `826`).
    *   Go to the Admin Dashboard.
    *   It should work! (It might be empty at first because it's a fresh database).

**You are now Live! 🌍**
Anyone with the link can use your app.

---

## ❓ Troubleshooting

**Q: "git is not recognized"**
A: Did you install Git? Did you restart VS Code? Try restarting your computer.

**Q: "Build Failed" on Vercel**
A: Check your Build Command. Did you type `npx prisma generate && ...` correctly? Did you add the `DATABASE_URL`?

**Q: "Database URL must start with postgresql://"**
A: Check your Neon connection string. Did you accidentally copy `psql` at the beginning? Remove it. only keep the part starting with `postgres://`.
