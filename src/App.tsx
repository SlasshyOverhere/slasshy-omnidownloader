import { useState } from 'react';
import { Toaster } from 'sonner';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/components/pages/HomePage';
import { DownloadsPage } from '@/components/pages/DownloadsPage';
import { HistoryPage } from '@/components/pages/HistoryPage';
import { SettingsPage } from '@/components/pages/SettingsPage';

export type PageType = 'home' | 'downloads' | 'history' | 'settings';

function App() {
    const [currentPage, setCurrentPage] = useState<PageType>('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'downloads':
                return <DownloadsPage />;
            case 'history':
                return <HistoryPage />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <>
            <AppLayout currentPage={currentPage} onPageChange={setCurrentPage}>
                {renderPage()}
            </AppLayout>
            <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'hsl(260 20% 10% / 0.9)',
                        border: '1px solid hsl(260 20% 20%)',
                        backdropFilter: 'blur(12px)',
                    },
                }}
            />
        </>
    );
}

export default App;
