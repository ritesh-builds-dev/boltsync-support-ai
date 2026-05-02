// main file of embed page
import EmbedClient from '@/component/EmbedClient'
import { getSession } from '@/lib/getsession'
import React from 'react'

export const metadata = {
  title: "Embed",
};

async function page() {
    const session = await getSession()
  return (
    <>
      <EmbedClient OwnerId={session?.user?.id!} />
    </>
  )
}

export default page