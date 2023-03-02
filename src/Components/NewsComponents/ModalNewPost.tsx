import { useState, useEffect, ChangeEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FetchMyProfile, ME } from "../../Redux/ActionTypes";
import {
  addMyPost,
  addMyPostImg,
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

  const [formData, setFormData] = useState(new FormData());
  const [postPayload, setpostPayload] = useState<newPost>({
    text: "",
    _id: "",
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
    let post = await addMyPost(obj);
    let x = await addMyPostImg(post._id,formData) 
    console.log(post._id);

    let data = await FetchHome();
    dispatch({
      type: HOME_FETCH,
      payload: data,
    });
    console.log("sono modale");

    setpostPayload({
      text: ""
    });
  };
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      prev.delete("post");
      prev.append("post", e.target.files![0]);
      return prev;
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
            <div className="d-flex justify-content-between">
              <p className="mb-0 mt-4 ml-3 font-weight-bold">
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
              <Form.Label>Aggiungi Immagine:</Form.Label>
              <Form.Control type="file" onChange={handleFile} />
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
