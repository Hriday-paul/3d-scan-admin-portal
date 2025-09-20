"use client"
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { useGetUserProfileQuery } from '@/redux/api/auth.api'
import { Skeleton } from '../ui/skeleton'
import { useNotificationsQuery } from '@/redux/api/baseApi'

function Navbar() {

    const { isLoading: notiLoading, isSuccess: notiSuccess, data } = useNotificationsQuery({is_read : false});

    const { data: user, isSuccess, isLoading } = useGetUserProfileQuery();

    return (
        <header className='flex justify-between items-center'>

            <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4 justify-between">
                    <SidebarTrigger className="-ml-1 text-xl cursor-pointer" />
                </div>
            </div>

            <div className='flex flex-row gap-x-5 items-center pr-3'>

                {notiLoading ? <><Skeleton className='h-10 w-10 bg-slate-200' /></> : notiSuccess ? <Link href={"/notifications"}>
                    <div className="flex justify-center bg-[#268CBE] text-white items-center size-11 rounded-full cursor-pointer relative">
                        {/* <IoNotificationsOutline size={24} color="#3A3C3B" /> */}
                        <Bell size={22} className='text-white' />

                        <Badge className='absolute -top-1 right-0 rounded-full'>{data?.data?.count || 0}</Badge>
                    </div>
                </Link> : <></>}

                {isLoading ? <><Skeleton className='h-10 w-28 bg-slate-200' /></> : isSuccess ? <Link href={"/settings"} className="px-2 py-1 border border-stroke rounded-full flex flex-row gap-x-3 items-center cursor-pointer">
                    <Image
                        src={user?.data?.profile_picture || "/empty-user.png"}
                        alt="profile img"
                        height={500}
                        width={500}
                        className="border border-main-color size-8 rounded-full object-cover"
                    ></Image>
                    <h2 className="text-black text-sm font-medium">{user?.data?.full_name}</h2>

                </Link> : <></>}
            </div>

        </header>
    )
}

export default Navbar