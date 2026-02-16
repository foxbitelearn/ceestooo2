# ✅ Part 1 Done! The Code is Online.

Since you dragged and dropped the files into GitHub, the hardest part is over.
Now we just need to connect the **Brain (Database)** and **Turn it On (Vercel)**.

---

## 🗄️ Step 2: Get a Free Database (Neon)
*We need a place to store messages.*

1.  Go to **[neon.tech](https://neon.tech)** and Sign Up.
2.  Click **"New Project"**.
3.  Name it `ceestoo-db`.
4.  **Important**: On the dashboard, look for **"Connection String"**.
5.  Click the **Copy** button.
    *   *(It looks like: `postgres://neondb_owner:password@...`)*.
    *   **Keep this tab open!**

---

## 🚀 Step 3: Turn it On (Vercel)
*This connects your GitHub code to the database.*

1.  Go to **[vercel.com](https://vercel.com)** and Sign Up.
2.  Click **"Add New..."** -> **"Project"**.
3.  You will see your repository (`ceestoo`) in the list. Click **Import**.
4.  **Critical Step**: Scroll down to **"Environment Variables"**.
5.  Add these two rows (Copy-Paste them):

    **Row 1:**
    *   **Name:** `DATABASE_URL`
    *   **Value:** *(Paste the Neon Connection String from Step 2)*

    **Row 2:**
    *   **Name:** `STORAGE_MODE`
    *   **Value:** `db`

6.  Click **Add**.
7.  Click **Deploy**.

---

## 🎉 Done!
Wait ~2 minutes. Vercel will give you a link (e.g., `ceestoo.vercel.app`).
Click it, and your website is Live!
