import { streamTokenProvider } from "@/app/actions"
import { StreamChat } from "stream-chat"

let streamClient: StreamChat | null = null

export const getStreamClient = async () => {
  if (streamClient) return streamClient

  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
  if (!apiKey) throw new Error("Stream API key is not set")

  streamClient = StreamChat.getInstance(apiKey)
  return streamClient
}

export const initializeStreamChat = async (userId: string, userName: string, userImage: string) => {
  const client = await getStreamClient()
  const token = await streamTokenProvider()

  await client.connectUser(
    {
      id: userId,
      name: userName,
      image: userImage,
    },
    token,
  )

  return client
}
