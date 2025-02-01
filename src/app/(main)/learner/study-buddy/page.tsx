import { AIStudyBuddy } from '@/components/global/AIStudyBuddy'
import { Topbar } from '@/components/global/Topbar'
import { Wrapper } from '@/components/global/Wrapper'
import React from 'react'

const page = () => {
    return (
        <>
            <Topbar>
                <h1>Hey buddy how can i assist you today?</h1>
            </Topbar>
            <Wrapper>
                <AIStudyBuddy />
            </Wrapper>
        </>
    )
}

export default page