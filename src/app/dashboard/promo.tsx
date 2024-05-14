'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import React, { useState } from 'react'

function Promo() {
    const [open, setOpen] = useState(true)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='bg-transparent z-50 max-w-4xl p-0 rounded'>
                <Image src='/promo.webp' height={2000} width={2000} alt='promo' className='rounded' />
            </DialogContent>
        </Dialog>
    )
}

export default Promo