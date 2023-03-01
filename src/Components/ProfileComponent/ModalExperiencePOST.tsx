import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { addMyInfo, changeMyInfo, FetchMyExperience, FetchMyProfile } from "../../Redux/ActionTypes";
import { ArrMe, Me, MyExperienceChanges } from "../../Redux/Interfaces";
import { RootState } from "../../Redux/Store";

const ModalExperiencePOST = ({
  show,
  handleClose,
  experienceId,
}: {
  show: boolean;
  handleClose: () => void;
  experienceId: string
}) => {
  const myState = useSelector((state:RootState)=>state.profile.me)
  const [update,setUpdate] = useState(0)
  const [experiencePayload, setExperiencePayload] =
    useState<MyExperienceChanges>({
      role: "",
      company: "",
      startDate: new Date(),
      description: "",
      area: "",
      user: experienceId
    });
  const handleChange = (e: any) => {
    console.log("changed payload", e.target.name, e.target.value);

    setExperiencePayload({
      ...experiencePayload,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(()=>{
    
  },[update])
  useEffect(() => {
    setExperiencePayload({
      role: "",
      company: "",
      startDate: new Date(),
      description: "",
      area: "",
      user: experienceId
    });
  }, []);
  const handleSubmit = (obj: MyExperienceChanges) => {
    addMyInfo(obj);
    setUpdate(update+1)

  };
  return (
    <>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit work experiences</Modal.Title>
        </Modal.Header>
        <h6>*Indicates required</h6>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mt-3">Role*</Form.Label>
              <Form.Control required type="text" placeholder="" autoFocus name="role"value={experiencePayload.role}
                onChange={(e) => handleChange(e)}/>
              <Form.Label className="mt-3">Company*</Form.Label>
              <Form.Control required type="text" placeholder="" name="company"value={experiencePayload.company}
                onChange={(e) => handleChange(e)} />
              <Form.Label className="mt-3">Description*</Form.Label>
              <Form.Control required type="textarea" placeholder=""  name="description" value={experiencePayload.description || ""}
                onChange={(e) => handleChange(e)}/>
              <Form.Label className="mt-3">Area</Form.Label>
              <Form.Control required type="textarea" placeholder="" name="area" value={experiencePayload.area}
                onChange={(e) => handleChange(e)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="Profile-Btn1"
            style={{ margin: "0", fontSize: "1.2em", fontWeight: "bolder" }}
            onClick={()=>handleSubmit(experiencePayload)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalExperiencePOST;