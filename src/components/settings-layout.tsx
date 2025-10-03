import { Outlet, NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import { Settings, Mic } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';

export function SettingsLayout() {
  return (
    <SidebarProvider>
      <div className="group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full">
        <AppSidebar />
        <div className="flex min-h-screen w-full bg-black">
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-white/10 bg-black/95 backdrop-blur-sm px-6">
              <SidebarTrigger className="-ml-1 text-white" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>
                <h1 className="text-lg font-semibold text-white">Guardian AI</h1>
              </div>
            </header>

            <main className="flex-1 p-6 space-y-6 bg-black text-white mono-mesh-texture relative overflow-y-auto w-full">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-semibold text-white mb-2">Settings</h1>
                  <p className="text-gray-400">Manage your Guardian AI configuration and preferences</p>
                </div>

                <div className="flex gap-4 mb-8">
                  <NavLink to="/settings" end>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? 'default' : 'outline'}
                        className={`${
                          isActive
                            ? 'bg-white text-black hover:bg-gray-100'
                            : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        General
                      </Button>
                    )}
                  </NavLink>
                  <NavLink to="/settings/voice">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? 'default' : 'outline'}
                        className={`${
                          isActive
                            ? 'bg-white text-black hover:bg-gray-100'
                            : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Voice Selection
                      </Button>
                    )}
                  </NavLink>
                </div>

                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
