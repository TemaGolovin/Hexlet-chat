import React, { useEffect, useMemo } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ChatBox from './ChatBox.jsx';
import getModalComponent from '../modalsWindows/index.js';

import fetchDataThunk from '../../store/slices/thunk';
import { useAuth, useSocket } from '../../hooks';
import { selectors as modalsSelectors } from '../../store/slices/modalsSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getToken, logOut } = useAuth();
  const authHeaders = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    [getToken],
  );
  const socket = useSocket();
  const modalType = useSelector(modalsSelectors.selectModalType);
  const error = useSelector((state) => state.channels.error);

  useEffect(() => {
    dispatch(fetchDataThunk(authHeaders));
    socket.connectSocket();
    if (error?.errorCode === 500) {
      logOut();
    }

    return () => socket.disconnectSocket();
  }, [dispatch, socket, authHeaders, error]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatBox />
      </Row>
      {getModalComponent(modalType)}
    </Container>
  );
};

export default ChatPage;
