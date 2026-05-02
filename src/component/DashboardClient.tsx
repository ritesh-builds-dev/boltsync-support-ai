// main logic of dashboard page.

'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation';
import axios from 'axios';

function DashboardClient({ OwnerId }: { OwnerId: string }) {
    {/* logic of dashboard page  */}
    const navigate = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [supportEmail, setSupportEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [address, setAddress] = useState("")
    const [knowledge, setKnowledge] = useState("")
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)
    const [embedLoading, setEmbedLoading] = useState(false)

    const handleSettings = async () => {
        setLoading(true)
        try {
            const result = await axios.post("/api/settings", { OwnerId, businessName, supportEmail, contactNumber, address, knowledge })
            console.log(result.data)
            setLoading(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (OwnerId) {
            const handlegetdetails = async () => {
                try {
                    const result = await axios.post("/api/settings/get", { OwnerId })
                    setBusinessName(result.data.businessName)
                    setSupportEmail(result.data.supportEmail)
                    setContactNumber(result.data.contactNumber)
                    setAddress(result.data.address)
                    setKnowledge(result.data.knowledge)
                } catch (error) {
                    console.log(error)
                }
            }
            handlegetdetails()
        }
    }, [OwnerId])

    return (
        <div className='min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 font-sans overflow-x-hidden'>

            
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-100/30 to-transparent -z-10 blur-[120px]" />

            {/* Navbar  */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60'
            >
                <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
                    {/* Logo  */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='flex items-center gap-2.5 cursor-pointer'
                        onClick={() => navigate.push("/")}
                    >
                        <div className='w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200'>
                            <span className='text-white font-black text-xl'>B</span>
                        </div>
                        <span className='text-2xl font-bold tracking-tight text-slate-900'>
                            Bolt<span className='text-indigo-600'>Sync</span>
                        </span>
                    </motion.div>

                    {/* Embed Chatbox Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={embedLoading}
                        className='px-7 py-3 rounded-2xl border-2 border-indigo-600 text-indigo-600 bg-transparent text-sm font-bold hover:bg-indigo-50 transition-colors disabled:opacity-60'
                        onClick={() => { setEmbedLoading(true); navigate.push("/embed") }}
                    >
                        {embedLoading ? (
                            <span className='flex items-center gap-2'>
                                <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                                </svg>
                                Loading...
                            </span>
                        ) : "Embed Chatbox"}
                    </motion.button>
                </div>
            </motion.nav>

            {/* Main Content */}
            <div className='flex justify-center px-6 pt-40 pb-24'>
                <motion.div
                    className='w-full max-w-3xl'
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className='mb-10'
                    >
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black mb-5 uppercase tracking-[0.2em]'>
                            ⚙️ Configuration Panel
                        </div>
                        <h1 className='text-4xl font-black text-slate-900 tracking-tight leading-tight'>
                            ChatBot <span className='text-indigo-600'>Settings</span>
                        </h1>
                        <p className='text-slate-500 mt-2 text-base font-medium'>
                            Manage your AI chatbot knowledge and business details.
                        </p>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
                        className='bg-white rounded-[44px] shadow-[0_30px_70px_rgba(99,102,241,0.08),0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 p-10'
                    >

                        {/* Business Details Section */}
                        <div className='mb-10'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-10 h-10 bg-amber-100 text-amber-600 rounded-[14px] flex items-center justify-center text-xl shadow-sm'>
                                    🏢
                                </div>
                                <h2 className='text-lg font-bold text-slate-900'>Business Details</h2>
                            </div>
                            <div className='space-y-4'>
                                <input
                                    type="text"
                                    className='w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-[#F8FAFC]'
                                    placeholder='Business Name'
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    value={businessName}
                                />
                                <input
                                    type="text"
                                    className='w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-[#F8FAFC]'
                                    placeholder='Support Email'
                                    onChange={(e) => setSupportEmail(e.target.value)}
                                    value={supportEmail}
                                />
                                <input
                                    type="tel"
                                    className='w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-[#F8FAFC]'
                                    placeholder='Customer Care Number'
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    value={contactNumber}
                                />
                                <input
                                    type="text"
                                    className='w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-[#F8FAFC]'
                                    placeholder='Business Address'
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className='h-px bg-slate-100 mb-10' />

                        {/* Knowledge Base Section */}
                        <div className='mb-10'>
                            <div className='flex items-center gap-3 mb-3'>
                                <div className='w-10 h-10 bg-violet-100 text-violet-600 rounded-[14px] flex items-center justify-center text-xl shadow-sm'>
                                    🧠
                                </div>
                                <h2 className='text-lg font-bold text-slate-900'>Knowledge Base</h2>
                            </div>
                            <p className='text-sm text-slate-500 font-medium mb-5 ml-[52px]'>
                                Add FAQs, policies, delivery info, refunds, etc.
                            </p>
                            <textarea
                                className='w-full h-52 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none bg-[#F8FAFC] leading-relaxed'
                                placeholder={`Example:\n- Refund policy: 7 days return available\n- Delivery time: 3-5 working days\n- Cash on Delivery available\n- Support hours`}
                                onChange={(e) => setKnowledge(e.target.value)}
                                value={knowledge}
                            />
                        </div>

                        {/* Divider */}
                        <div className='h-px bg-slate-100 mb-8' />

                        {/* Save Button */}
                        <div className='flex items-center gap-5'>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                onClick={handleSettings}
                                className="px-10 py-4 rounded-[20px] bg-slate-950 text-white text-sm font-bold shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:bg-slate-800 transition disabled:opacity-60 cursor-pointer"
                            >
                                {loading ? (
                                    <span className='flex items-center gap-2'>
                                        <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : "Save Settings"}
                            </motion.button>

                            <AnimatePresence>
                                {saved && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100"
                                    >
                                        ✓ Settings saved
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Bottom note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className='text-center text-xs text-slate-400 font-medium mt-8'
                    >
                        Changes apply instantly to your deployed chatbot.
                    </motion.p>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className='py-20 bg-slate-950 text-white'>
                <div className='max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4 text-center'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-sm'>B</div>
                        <span className='text-2xl font-black tracking-tighter'>BoltSync</span>
                    </div>
                    <p className='text-slate-400 text-sm font-medium'>
                        &copy; {new Date().getFullYear()} BoltSync. Redefining support.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default DashboardClient