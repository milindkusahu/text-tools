"use client";

import { useState } from "react";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const passwordGeneratorInfo = {
  features: [
    "Advanced security analysis with entropy calculation and crack time estimation",
    "Customizable length from 4 to 128 characters",
    "Multiple character sets: uppercase, lowercase, numbers, and symbols",
    "Exclude similar and ambiguous characters for better readability",
    "Custom character set support for specific requirements",
    "Password history to track recently generated passwords",
    "Real-time strength assessment with detailed feedback",
    "Cryptographically secure random number generation",
    "Require all selected character types for maximum security",
    "Professional-grade security recommendations",
  ],
  howToUse: [
    "Adjust the password length using the slider (4-128 characters)",
    "Select which character types to include in your password",
    "Enable advanced options like excluding similar characters",
    "Optionally set a custom character set for specific needs",
    "Click 'Generate' to create a new password",
    "Review the security analysis and recommendations",
    "Copy the password to your clipboard when satisfied",
    "Use the password history to access recently generated passwords",
  ],
  faqs: [
    {
      question: "How secure are the generated passwords?",
      answer:
        "Our passwords use cryptographically secure random number generation (crypto.getRandomValues) and are analyzed for entropy and crack time. We provide detailed security analysis to help you understand the strength of your password.",
    },
    {
      question: "What is password entropy and why is it important?",
      answer:
        "Password entropy measures the randomness and unpredictability of a password. Higher entropy means the password is harder to guess or crack. We calculate entropy in bits and show estimated crack times.",
    },
    {
      question: "Should I exclude similar characters?",
      answer:
        "Excluding similar characters (like il1Lo0O) can make passwords easier to read and type, but slightly reduces the character set size. It's a trade-off between usability and security.",
    },
    {
      question:
        "What's the difference between excluding similar and ambiguous characters?",
      answer:
        "Similar characters are visually confusing (il1Lo0O), while ambiguous characters can be problematic in certain contexts ({}[]()/\\'\"`~,;.<>). Both options help create more user-friendly passwords.",
    },
    {
      question: "How long should my password be?",
      answer:
        "For maximum security, use at least 12-16 characters. Longer passwords are exponentially harder to crack. Our tool supports up to 128 characters for maximum security.",
    },
    {
      question: "Can I use custom character sets?",
      answer:
        "Yes! You can define your own character set for specific requirements. This is useful for systems with specific character restrictions or when you need passwords that match certain patterns.",
    },
    {
      question: "Is my password stored anywhere?",
      answer:
        "No, passwords are generated locally in your browser and never sent to our servers. The password history is stored only in your browser's memory and is lost when you close the tab.",
    },
    {
      question: "What makes this password generator better than others?",
      answer:
        "Our generator provides detailed security analysis, entropy calculation, crack time estimation, customizable options, password history, and professional-grade recommendations. It's designed for both security professionals and regular users.",
    },
  ],
};

export default function ClientPasswordGenerator() {
  const [, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Password Generator"
      description="Generate secure, customizable passwords with advanced security analysis. Create strong passwords for all your accounts with professional-grade security features."
      toolInfo={passwordGeneratorInfo}
    >
      <PasswordGenerator setOutput={setOutput} />
    </ToolPageLayout>
  );
}
