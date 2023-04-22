import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell    
} from "@novu/notification-center";

const Nav = () => {
    const navigate = useNavigate();

    const onNotificationClick = (notification) => navigate(notification.cta.data.url);


    const signOut = () => {
        localStorage.removeItem("_id");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h2>ForumSys</h2>
            <div className="navbarRight">
                <NovuProvider
                    subscriberId="MY_SUBSCRIBER_ID"
                    applicationIdentifier="APP_ID"
                >
                    <PopoverNotificationCenter
                        onNotificationClick={onNotificationClick}
                        colorScheme="light"
                    >
                        {({ unseenCount }) => (
                            <NotificationBell unseenCount={unseenCount} />
                        )}
                    </PopoverNotificationCenter>
                </NovuProvider>
                <button onClick={signOut}>Sign out</button>
            </div>
        </nav>
    );
};

export default Nav;