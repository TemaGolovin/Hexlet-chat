import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { SocketContext } from './index';
import { actions as messagesActions } from '../store/slices/messagesSlice';
import { actions as channelsActions } from '../store/slices/channelsSlice';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const connectSocket = () => {
    socket.connect();

    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });

    socket.on('removeChannel', (data) => {
      dispatch(channelsActions.removeChannel(data.id));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(
        channelsActions.renameChannel({
          id: channel.id,
          changes: { name: channel.name },
        }),
      );
    });
  };

  const disconnectSocket = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  const sendMessage = useCallback(
    async (message) => {
      await socket.timeout(3000).emitWithAck('newMessage', message);
    },
    [socket],
  );

  const asyncronizeSocket = (fn) => (...args) => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 3000);

    fn(...args, (response) => {
      resolve(response.data);
    });
  });

  const addChannel = asyncronizeSocket((...args) => socket.volatile.emit('newChannel', ...args));

  const removeChannel = asyncronizeSocket((...args) => socket.volatile.emit('removeChannel', ...args));

  const renameChannel = asyncronizeSocket((...args) => socket.volatile.emit('renameChannel', ...args));

  const socketContext = useMemo(
    () => ({
      connectSocket,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
      disconnectSocket,
    }),
    [
      connectSocket,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
      disconnectSocket,
    ],
  );

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
