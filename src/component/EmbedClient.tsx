// main logic of dashboard page.
'use client'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function EmbedClient({ OwnerId }: { OwnerId: string }) {
    const navigate = useRouter()
    const [copied, setCopied] = useState(false)
    const [dashLoading, setDashLoading] = useState(false)

    const embedCode = `<script
  src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
  data-owner-id="${OwnerId}">
</script>`

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className='min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 font-sans overflow-x-hidden'>

            {/* Soft Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-100/30 to-transparent -z-10 blur-[120px]" />

            {/* Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60'
            >
                <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
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

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={dashLoading}
                        className='px-7 py-3 rounded-2xl border-2 border-indigo-600 text-indigo-600 bg-transparent text-sm font-bold hover:bg-indigo-50 transition-colors disabled:opacity-60'
                        onClick={() => { setDashLoading(true); navigate.push("/dashboard") }}
                    >
                        {dashLoading ? (
                            <span className='flex items-center gap-2'>
                                <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                                </svg>
                                Loading...
                            </span>
                        ) : "Back to Dashboard"}
                    </motion.button>
                </div>
            </motion.nav>

            {/* Main Content */}
            <div className='flex justify-center px-6 pt-40 pb-24'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className='w-full max-w-4xl'
                >
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className='mb-10'
                    >
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black mb-5 uppercase tracking-[0.2em]'>
                            🔌 Integration
                        </div>
                        <h1 className='text-4xl font-black text-slate-900 tracking-tight leading-tight'>
                            Embed <span className='text-indigo-600'>ChatBot</span>
                        </h1>
                        <p className='text-slate-500 mt-2 text-base font-medium'>
                            Add your AI chatbot to any website in seconds.
                        </p>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
                        className='bg-white rounded-[44px] shadow-[0_30px_70px_rgba(99,102,241,0.08),0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 p-10'
                    >
                        {/* Embed Code Section */}
                        <div className='mb-10'>
                            <div className='flex items-center gap-3 mb-5'>
                                <div className='w-10 h-10 bg-indigo-100 text-indigo-600 rounded-[14px] flex items-center justify-center text-xl shadow-sm'>
                                    📋
                                </div>
                                <div>
                                    <h2 className='text-lg font-bold text-slate-900'>Your Embed Script</h2>
                                    <p className='text-sm text-slate-500 font-medium'>
                                        Copy and paste this code before{' '}
                                        <code className='bg-slate-100 px-1.5 py-0.5 rounded-lg text-indigo-600 font-mono text-xs'>&lt;/body&gt;</code>
                                    </p>
                                </div>
                            </div>

                            {/* Code Block */}
                            <div className='relative bg-slate-950 rounded-2xl p-6 font-mono text-sm overflow-x-auto border border-slate-800'>
                                <pre className='text-emerald-400 leading-relaxed'>{embedCode}</pre>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={copyCode}
                                    className='absolute top-4 right-4 p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition border border-slate-500'
                                >
                                    <AnimatePresence mode='wait'>
                                        {copied ? (
                                            <motion.span
                                                key="copied"
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                className='text-emerald-400 flex items-center gap-1'
                                            >
                                                ✓ Copied!
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="copy"
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className='h-px bg-slate-100 mb-10' />

                        {/* How to Install */}
                        <div className='mb-10'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-10 h-10 bg-emerald-100 text-emerald-600 rounded-[14px] flex items-center justify-center text-xl shadow-sm'>
                                    🚀
                                </div>
                                <h2 className='text-lg font-bold text-slate-900'>How to Install</h2>
                            </div>
                            <div className='space-y-3'>
                                {[
                                    { step: "1", text: "Copy the embed script above" },
                                    { step: "2", text: "Paste it before the closing </body> tag of your website" },
                                    { step: "3", text: "Save and reload your website — the chatbot will appear!" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className='flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100'
                                    >
                                        <div className='w-8 h-8 rounded-xl bg-indigo-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-200'>
                                            {item.step}
                                        </div>
                                        <p className='text-sm font-medium text-slate-700'>{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className='h-px bg-slate-100 mb-10' />

                        {/* Live Preview */}
                        <div>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-10 h-10 bg-violet-100 text-violet-600 rounded-[14px] flex items-center justify-center text-xl shadow-sm'>
                                    👁️
                                </div>
                                <div>
                                    <h2 className='text-lg font-bold text-slate-900'>Live Preview</h2>
                                    <p className='text-sm text-slate-500 font-medium'>This is how the chatbot will appear on your website</p>
                                </div>
                            </div>

                            {/* Browser Mockup */}
                            <div className='rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden'>
                                {/* Browser Bar */}
                                <div className='flex items-center gap-2 px-4 h-10 bg-slate-50 border-b border-slate-200'>
                                    <span className='w-3 h-3 rounded-full bg-red-300' />
                                    <span className='w-3 h-3 rounded-full bg-yellow-300' />
                                    <span className='w-3 h-3 rounded-full bg-green-300' />
                                    <div className='ml-4 flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-400 font-medium max-w-xs'>
                                        your-website.com
                                    </div>
                                </div>

                                {/* Website Body */}
                                <div className='relative h-[340px] bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 overflow-hidden'>
                                    {/* Fake website skeleton */}
                                    <div className='space-y-3 opacity-30'>
                                        <div className='h-4 bg-slate-300 rounded-full w-1/3' />
                                        <div className='h-3 bg-slate-200 rounded-full w-2/3' />
                                        <div className='h-3 bg-slate-200 rounded-full w-1/2' />
                                        <div className='h-3 bg-slate-200 rounded-full w-3/4' />
                                    </div>
                                    <span className='text-xs text-slate-400 font-medium absolute top-6 right-6'>Your website content</span>

                                    {/* Chat Popup */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                        className='absolute bottom-[82px] right-6 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden'
                                    >
                                        {/* Chat Header */}
                                        <div className='bg-slate-950 text-white px-4 py-3 flex justify-between items-center'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-2 h-2 rounded-full bg-emerald-400' />
                                                <span className='text-xs font-bold'>Customer Support</span>
                                            </div>
                                            <span className='text-xs opacity-50 hover:opacity-100 cursor-pointer transition'>✕</span>
                                        </div>

                                        {/* Chat Messages */}
                                        <div className='p-3 space-y-2.5 bg-white'>
                                            <div className='flex justify-start'>
                                                <span className='bg-slate-100 text-slate-800 text-xs px-3 py-2 rounded-2xl rounded-tl-sm font-medium'>
                                                    Hi! How can I help you? 👋
                                                </span>
                                            </div>
                                            <div className='flex justify-end'>
                                                <span className='bg-indigo-600 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm font-medium'>
                                                    What is the return policy?
                                                </span>
                                            </div>
                                            <div className='flex justify-start'>
                                                <div className='bg-slate-100 px-3 py-2 rounded-2xl rounded-tl-sm flex gap-1 items-center'>
                                                    {[0, 0.15, 0.3].map((d, i) => (
                                                        <motion.span
                                                            key={i}
                                                            animate={{ y: [0, -4, 0] }}
                                                            transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                                                            className='w-1.5 h-1.5 rounded-full bg-slate-400 block'
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Chat Button */}
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                        className='absolute bottom-5 right-6 w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center shadow-2xl border-[3px] border-white'
                                    >
                                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.157-.878l-2.433.454.454-2.433A7.944 7.944 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                                            <circle cx="8" cy="12" r="1.5" />
                                            <circle cx="12" cy="12" r="1.5" />
                                            <circle cx="16" cy="12" r="1.5" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className='text-center text-xs text-slate-400 font-medium mt-8'
                    >
                        The chatbot syncs instantly with your saved knowledge base.
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

export default EmbedClient