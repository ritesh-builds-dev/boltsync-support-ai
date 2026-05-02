// main file of dashboard page
import DashboardClient from '@/component/DashboardClient'
import { getSession } from '@/lib/getsession'
import React from 'react'

export const metadata = {
  title: "Dashboard",
};

async function page() {
  const session = await getSession()
  
  return (
    <>
      <DashboardClient  OwnerId={session?.user?.id!}/>
    </>
  )
}

export default page