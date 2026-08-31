import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div className="bg-darkbg text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <img src="/smlogo.png" alt="SM Events Logo" className="w-16 h-16 object-contain mb-8" />
            <p className="text-arcadeyellow font-display font-bold text-sm uppercase tracking-widest mb-3">404 Error</p>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Page Not Found</h1>
            <p className="text-zinc-400 max-w-md mb-10">The page you're looking for doesn't exist or may have moved. Let's get you back on track.</p>
            <Link to="/" className="px-8 py-4 bg-arcadeyellow text-black font-bold font-sans text-sm uppercase tracking-wide rounded-xl hover:opacity-90 transition-all">
                Back to Home
            </Link>
        </div>
    );
}
