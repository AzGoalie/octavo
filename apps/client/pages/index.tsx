import styles from './index.module.css';

import { io } from 'socket.io-client';
import { core } from '@octavo/core';
import { useEffect, useState } from 'react';

const socket = io();
export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  const [clients, setClients] = useState(0);

  useEffect(() => {
    socket.on('connect', () => console.log('Connected'));
    socket.on('disconnect', () => console.log('disconnected'));
    socket.on('clients', (clients) => setClients(clients));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('clients');
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <p>Testing shared code: {core()}</p>
          <p>Connected clients: {clients}</p>
        </div>
      </div>
    </div>
  );
}

export default Index;
