import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyPost,
  FetchHome,
  HOME_FETCH,
} from "../../Redux/ActionTypes/homeAction";
import { newPost } from "../../Redux/Interfaces";
import { RootState } from "../../Redux/Store";

const ModalNewPost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const myState = useSelector((state: RootState) => state.profile.me);

  const [postPayload, setpostPayload] = useState<newPost>({
    text: "",
  });

  const handleChange = (e: any) => {
    console.log("changed payload", e.target.name, e.target.value);
    setpostPayload({
      ...postPayload,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setpostPayload({
      text: "",
    });
  }, []);
  const handleSubmit = async (obj: newPost) => {
    let x = await addMyPost(obj);
    let data = await FetchHome();
    dispatch({
      type: HOME_FETCH,
      payload: data,
    });
    setpostPayload({
      text: "",
    });
  };

  return (
    <>
      <Button variant="white" className="text-start w-100" onClick={handleShow}>
        Start a post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex">
            <img
              src={myState?.image}
              alt="Profile"
              className="rounded-circle mr-3"
              style={{ height: "40px" }}
            />
            <div>
              <p className="mb-0 font-weight-bold">
                {myState.name}
                {myState.surname}
              </p>
            </div>
          </div>
          <hr />
          <Form>
            <Form.Group controlId="formPost">
              <Form.Label>What do you want to talk about?</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                value={postPayload.text}
                name="text"
                as="textarea"
                rows={3}
                placeholder="Inserisci il tuo testo qui..."
              />
            </Form.Group>
            <hr />
            <Form.Group controlId="formFile">
              <Form.Label>Aggiungi un file:</Form.Label>
              <Form.Control type="file" multiple />
              <Form.Text className="text-muted">
                Accetta solo file di tipo immagine, video o documento.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(postPayload);
              handleClose();
            }}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNewPost;
