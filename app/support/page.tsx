"use client"
import { ChatKit, useChatKit } from "@openai/chatkit-react"
export default function SupportChat() {
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        const res = await fetch("/api/chatkit/session", { method: "POST" })
        const { client_secret } = await res.json()
        return client_secret
      },
    },
  })
  return (
    <div className="fixed bottom-4 right-4 h-[640px] w-[380px] rounded-2xl shadow-lg border">
      <ChatKit control={control} className="h-full w-full" />
    </div>
  )
}
