import { Sidebar } from '../components/Sidedbar';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="w-full max-w-7xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <Outlet />
          </div>

          {/* <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 px-10">
            <Outlet />
          </div> */}
        </main>
      </div>
    </div>
  );
}
