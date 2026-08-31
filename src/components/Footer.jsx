export default function Footer() {
    return (
        <footer className="relative border-t border-white/10 py-12 z-10 bg-darkbg">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-start">
                <div>
                    <span className="text-xl font-black font-tech tracking-widest uppercase text-white">SM <span className="text-arcadeyellow">Events</span></span>
                    <p className="text-[10px] font-tech text-zinc-500 font-bold tracking-widest uppercase mt-2">&copy; {new Date().getFullYear()} Premium Corporate Entertainment.</p>
                </div>
                <div className="text-[9px] font-tech text-zinc-400 font-bold tracking-[0.2em] uppercase bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                    Built By <span className="text-arcadeyellow ms-1">Hossam Sayed</span>
                </div>
            </div>
        </footer>
    );
}
