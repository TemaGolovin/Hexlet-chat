import React /*useEffect useRef,*/ from "react";
import { Container, Row } from "react-bootstrap";
import ChatBox from "./ChatBox.jsx";

import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import fetchDataThunk from "../../store/slices/thunk";
import { useAuth } from "../../hooks";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const authHeaders = useMemo(
    () => ({ headers: getAuthHeader() }),
    [getAuthHeader]
  );

  useEffect(() => {
    dispatch(fetchDataThunk(authHeaders));
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatBox />
      </Row>
    </Container>
  );
};

export default ChatPage;
