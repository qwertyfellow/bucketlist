"use server"
import "server-only"
import { signIn, signOut } from "@/auth";

export const loginHandler = async () => {

    // default is google.
    await signIn("google")
};

export const logoutHandler = async () => {
    await signOut()
};
