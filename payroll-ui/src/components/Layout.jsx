// src/components/Layout.jsx
import AdminSidebar from './AdminComponents/AdminSidebar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <main style={{ marginLeft: '260px', width: '100%', padding: '20px' }}>
                {children}
            </main>
        </div>
    );
};
export default Layout;