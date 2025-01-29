import { signOut } from '@/app/utils/auth'
import React from 'react'
import { Button } from '../ui/button'

const SignOutButton = async() => {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <Button type="submit">Sign Out</Button>
        </form>
    )
}

export default SignOutButton