import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StorefrontPage from './components/store/StorefrontPage';
import AgentLandingPage from './components/AgentLandingPage';
import AgentSidebar from './components/agent/AgentSidebar';
import StorefrontLayout from './components/store/StorefrontLayout';
import BestsellersPage from './components/store/BestsellersPage';
import NewArrivalsPage from './components/store/NewArrivalsPage';
import BusinessLandingPage from './components/BusinessLandingPage';
import BannerSlider from './components/BannerSlider';
import AppsGrid from './components/AppsGrid';
import AgentSettingsPage from './components/agent/AgentSettingsPage';
import SettingsPage from './components/SettingsPage';
import AgentEnrollmentPage from './components/AgentEnrollmentPage';
import AgentDashboard from './components/agent/AgentDashboard';
import StorePage from './components/StorePage';
import WalletPage from './components/WalletPage';
import CollectionPage from './components/store/CollectionPage';
import UsersPage from './components/UsersPage';
import ProductDetailPage from './components/store/ProductDetailPage';
import CategoryPage from './components/store/CategoryPage';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './components/store/CheckoutPage';

function App() {
  const [isAgentEnrolled, setIsAgentEnrolled] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'settings' | 'wallet' | 'users' | 'store' | 'agent'>('dashboard');
  const [agentView, setAgentView] = useState<'dashboard' | 'settings'>('dashboard');

  // Get the current path
  const path = window.location.pathname;
  
  // Extract category from URL if present
  const categoryMatch = path.match(/\/store\/categories\/([^/]+)/);
  const category = categoryMatch ? decodeURIComponent(categoryMatch[1]) : null;

  return (
    <>
      <CartProvider>
      {window.location.pathname === '/business' ? (
        <BusinessLandingPage />
      ) : window.location.pathname === '/agent' ? (
        <AgentLandingPage />
      ) : window.location.pathname === '/store' ? (
        <StorefrontLayout>
          <StorefrontPage />
        </StorefrontLayout>
      ) : window.location.pathname === '/store/bestsellers' ? (
        <StorefrontLayout>
          <BestsellersPage onBack={() => window.history.back()} />
        </StorefrontLayout>
      ) : window.location.pathname === '/store/new-arrivals' ? (
        <StorefrontLayout>
          <NewArrivalsPage onBack={() => window.history.back()} />
        </StorefrontLayout>
      ) : window.location.pathname.startsWith('/store/collections/') ? (
        <StorefrontLayout>
          <CollectionPage 
            collection={window.location.pathname.split('/collections/')[1]} 
            onBack={() => window.history.back()} 
          />
        </StorefrontLayout>
      ) : window.location.pathname.startsWith('/store/products/') ? (
        <StorefrontLayout>
          <ProductDetailPage />
        </StorefrontLayout>
      ) : window.location.pathname === '/checkout' ? (
        <CheckoutPage />
      ) : category ? (
        <StorefrontLayout>
          <CategoryPage category={category} onBack={() => window.history.back()} />
        </StorefrontLayout>
      ) : (
        <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
          <Header />
          <div className="flex-1 pt-16"> {/* Add padding for header */}
            <div className="flex">
              {activeView !== 'store' && activeView !== 'agent' && (
                <Sidebar activeView={activeView} onViewChange={setActiveView} />
              )}
              {activeView === 'agent' && (
                <AgentSidebar 
                  activeView={agentView}
                  onViewChange={setAgentView}
                  onBack={() => setActiveView('dashboard')}
                />
              )}
              <div className="flex-1">
                {activeView === 'settings' ? (
                  <SettingsPage />
                ) : activeView === 'wallet' ? (
                  <WalletPage />
                ) : activeView === 'users' ? (
                  <UsersPage />
                ) : activeView === 'agent' ? (
                  isAgentEnrolled ? (
                    <div className="flex">
                      <AgentSidebar 
                        activeView={agentView}
                        onViewChange={setAgentView}
                        onBack={() => setActiveView('dashboard')}
                      />
                      <div className="flex-1">
                        {agentView === 'settings' ? (
                          <AgentSettingsPage />
                        ) : (
                          <AgentDashboard />
                        )}
                      </div>
                    </div>
                  ) : (
                    <AgentEnrollmentPage 
                      onBack={() => setActiveView('dashboard')}
                      onComplete={() => setIsAgentEnrolled(true)}
                    />
                  )
                ) : activeView === 'store' ? (
                  <StorePage onBack={() => setActiveView('dashboard')} />
                ) : (
                  <>
                    <div className="py-8">
                      <BannerSlider />
                    </div>
                    <div className="px-6 py-12">
                      <AppsGrid 
                        onStoreClick={() => {
                          setActiveView('store');
                        }}
                        onAgentClick={() => {
                          setActiveView('agent');
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </CartProvider>
    </>
  );
}

export default App;