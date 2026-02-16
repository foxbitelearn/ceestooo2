"use server";
import { prisma } from "@/lib/prisma";

export async function handleAuth(formData: FormData) {
  const name = formData.get("name") as string;
  const passcode = formData.get("passcode") as string;

  try {
    // Look for the user in the database
    const user = await prisma.user.findUnique({ where: { name } });

    if (user) {
      if (user.passcode !== passcode) return { error: "Wrong passcode" };
      return { success: true, user };
    } else {
      // Create new user in DB
      const newUser = await prisma.user.create({
        data: { name, passcode }
      });
      return { success: true, user: newUser };
    }
  } catch (e) {
    return { error: "Database error" };
  }
}
