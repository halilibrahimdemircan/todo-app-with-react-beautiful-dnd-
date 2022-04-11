import { Outlet, Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function PrivateRouter({ token }) {
    if (token) {
        return (
            <>
                <Navigation />
                <Outlet />
            </>
        )
    } else {
        return <Navigate to="/login" replace />
    }
}