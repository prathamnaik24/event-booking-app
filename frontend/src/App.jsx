import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <header className="p-4 bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 flex justify-between items-center px-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            EventBooker
          </Link>
          <nav className="space-x-6 flex items-center font-medium">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 transition-colors">Discover</Link>
            <Link to="/my-bookings" className="text-slate-600 hover:text-indigo-600 transition-colors">My Bookings</Link>
            <Link to="/login" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow transition-all">
              Sign In
            </Link>
          </nav>
        </header>
        
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-20">
                <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Discover amazing events.</h2>
                <p className="text-xl text-slate-500 mb-8">Book your tickets for the best experiences around the world.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="h-40 bg-indigo-50 rounded-xl mb-4"></div>
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Tech Conference</span>
                      <h3 className="text-lg font-bold mt-1">Future of React 2026</h3>
                      <p className="text-sm text-slate-500 mt-2">Join us for a deep dive into the latest features of React.</p>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/login" element={<h2 className="text-2xl font-semibold">Login / Signup</h2>} />
            <Route path="/events/:id" element={<h2 className="text-2xl font-semibold">Event Details</h2>} />
            <Route path="/my-bookings" element={<h2 className="text-2xl font-semibold">My Bookings</h2>} />
            <Route path="/admin" element={<h2 className="text-2xl font-semibold">Admin Dashboard</h2>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
