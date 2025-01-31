'use client'

import { streamTokenProvider } from '@/app/actions'
import { BookingType } from '@/app/types/service'
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Call, CallControls, CallParticipantsList, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface SessionProps {
    id: string
    name: string
    image: string
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || '';
export const MyTutorVideo = ({ booking, session }: { booking: BookingType, session: SessionProps }) => {
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!booking) return;
        if (!session.id) {
            return;
        }

        const userId = session.id;
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: userId,
                name: session.name ?? undefined,
                image: session.image ?? undefined
            },
            tokenProvider: () => streamTokenProvider(),
        });
        setClient(client)
        const call = client.call("default", booking.id);
        call.join({ create: true });
        setCall(call);

        return () => {
            call
                .leave()
                .then(() => client.disconnectUser())
                .catch(console.error);
        };
    }, [booking.id, session.image, session.name])
    return (
        client &&
        call && (
            <StreamVideo client={client}>
                <StreamCall call={call}>
                    <StreamTheme>
                        <SpeakerLayout />
                        <CallControls onLeave={() => {
                            router.push("/tutor/bookings");
                        }} />
                        <CallParticipantsList onClose={() => undefined} />
                    </StreamTheme>
                </StreamCall>
            </StreamVideo>
        )
    )
}