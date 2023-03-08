import React from 'react';
import Head from 'next/head';
import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../../store/notification-contex';

const Layout = (props) => {
  const notificationCtx = React.useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>
        {props.children}
      </main>
      {activeNotification && (
        <Notification 
          title={activeNotification.title} 
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
