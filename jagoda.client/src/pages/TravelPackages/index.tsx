import React, { useEffect, useState } from 'react';
import { ApplicationUser } from '../../api/interfaces';
import { getUserById } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setUser } from '../../store/userSlice';
import { Footer, Navbar } from '../Home/components';

export default function TravelPackages() {
    const [user, setUserState] = useState<ApplicationUser | null>(null);
    const userId = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId && !userId) {
            dispatch(setUser({ id: storedUserId, username: null, email: null }));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (id: string) => {
        try {
            const response = await getUserById(id);
            setUserState(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="relative w-full min-h-screen overflow-hidden -z-0">
                <video autoPlay loop muted className="w-full h-full absolute object-cover">
                    <source src="/beachVid.mp4" type="video/mp4" />
                </video>
                <div className="flex items-center justify-center min-h-screen relative z-10">
                    <div>
                        {user ? (
                            <>
                                <h1>TravelPackages</h1>
                                <p>Username: {user.userName}</p>
                                <p>Email: {user.email}</p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
