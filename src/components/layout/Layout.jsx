import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      <Sidebar />
      <Navbar />
      {/* Main content — offset for sidebar (desktop) and navbar */}
      <main className="md:ml-60 pt-16 pb-20 md:pb-6 px-4 md:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
