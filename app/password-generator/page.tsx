import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientPasswordGenerator from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Password Generator - Secure & Customizable Password Creator",
  description:
    "Generate secure, customizable passwords with advanced options and security analysis. Create strong passwords for all your accounts with our professional password generator.",
  path: "/password-generator",
  keywords: [
    "password generator",
    "secure password",
    "strong password",
    "password creator",
    "random password",
    "password security",
    "password strength",
    "custom password",
    "password tool",
    "secure password generator",
    "password analyzer",
    "password entropy",
  ],
});

export default function PasswordGeneratorPage() {
  return <ClientPasswordGenerator />;
}
