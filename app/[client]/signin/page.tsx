"use client"

import { useState } from "react"
// Removed: useRouter
// Removed: createClientComponentClient
import { GlassCard } from "@/components/glass-card"
import { FrostedButton } from "@/components/frosted-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { signIn } from "@/lib/actions/auth" // NEW: Import Server Action
import { useFormStatus } from 'react-dom' // Helper hook

// Helper component for pending state feedback
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <FrostedButton type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </FrostedButton>
  );
}


export default function ClientSignInPage() {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  // Removed: email, password state

  // New action handler to manage state after server response
  const formAction = async (formData: FormData) => {
    setMessage("")
    setMessageType("")
    try {
        await signIn(formData);
        // Success is handled by server-side redirect
    } catch (error) {
        // If signIn throws an error (e.g., wrong password), display the message
        setMessage(error instanceof Error ? error.message : "An unknown error occurred during sign-in.");
        setMessageType("error");
    }
  }

  return (
    <main className="min-h-dvh grid place-items-center p-4">
      <GlassCard className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Client Sign-in</h1>
        <p className="text-center text-white/80 mb-8">
          Access your project dashboard and updates.
        </p>

        {/* Form uses the Server Action */}
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email" // Added name attribute for FormData
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password" // Added name attribute for FormData
              placeholder="••••••••"
              required
            />
          </div>

          {message && (
            <Alert variant={messageType === "error" ? "destructive" : "default"}>
              <Terminal className="h-4 w-4" />
              <AlertTitle>{messageType === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <SubmitButton /> 
        </form>
      </GlassCard>
    </main>
  )
}
