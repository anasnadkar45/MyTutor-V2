"use client"

import React, { useEffect, useState } from "react"
import { type StreamChat, type Channel as StreamChannel, User as StreamUser } from "stream-chat"
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from "stream-chat-react"

import "stream-chat-react/dist/css/v2/index.css"
import { initializeStreamChat } from "@/app/utils/stream-chat"
import { ChatLoadingSkeleton } from "./ChatLoadingSkeleton"

interface BookingChatProps {
  bookingId: string
  currentUser: {
    id: string
    name: string
    image: string
  }
  otherUser: {
    id: string
    name: string
    image: string
  }
}

export function BookingChat({ bookingId, currentUser, otherUser }: BookingChatProps) {
  const [client, setClient] = useState<StreamChat | null>(null)
  const [channel, setChannel] = useState<StreamChannel | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true)
        const streamClient = await initializeStreamChat(currentUser.id, currentUser.name, currentUser.image)

        // Create or get existing channel for this booking
        const channel = streamClient.channel("messaging", `booking-${bookingId}`, {
          name: `Booking Chat with ${otherUser.name}`,
          members: [currentUser.id, otherUser.id],
          image: otherUser.image,
        })

        await channel.watch()
        setChannel(channel)
        setClient(streamClient)
      } catch (error) {
        console.error("Error initializing chat:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initChat()

    return () => {
      if (client) {
        client.disconnectUser()
      }
    }
  }, [bookingId, currentUser, otherUser, client]) // Added client to dependencies

  if (isLoading) {
    return <ChatLoadingSkeleton />
  }

  if (!client || !channel) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">Error loading chat. Please try again.</div>
    )
  }

  return (
    <div className="h-full">
      <Chat client={client} >
        <Channel channel={channel} >
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}
