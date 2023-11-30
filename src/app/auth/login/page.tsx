import React from 'react'
import { UserAuthForm } from './user-auth-form'
import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

async function page() {
    const session = await getServerSession(options)

    if (session) return redirect('/')

    return (
        <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign In
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <UserAuthForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Don't have any account?{" "}
                        <Link
                            href="/auth/register"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page