import { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Form, FormGroup, Input, ButtonGroup } from "reactstrap";
import { deleteItem, post, put } from "services/api";
import { AppContext } from '../../contexts/AppContext'

function RoomModal(props) {
  const { modalData } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [is_lab, setIsLab] = useState(false);
  const [capacity, setCapacity] = useState(null);

  useEffect(() => {
    if (modalData?.is_lab) {
      setIsLab(modalData.is_lab)
    }
  }, [modalData])

  const submit = async () => {
    const form = document.getElementById("form");
    if (form.checkValidity()) {
      if (props.type === 'new') {
        const resp = await post("/rooms", { name, is_lab, capacity });
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'edit' && modalData) {
        let data = {};
        if (name) {
          data.name = name;
        }
        if (is_lab !== null) {
          data.is_lab = is_lab;
        }
        if (capacity) {
          data.capacity = capacity;
        }
        const resp = await put("/rooms/" + modalData.id, data);
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'delete' && modalData) {
        const resp = await deleteItem("/rooms/" + modalData.id);
        if (resp.success) {
          props.toggle('');
        }
      }
    }
  }
  const submitBtn = ()=>{
    let btn;
    if (props?.type === 'new') {
      btn = <Button type="submit" disabled={!name || !capacity} color={'success'} children="Create"></Button>
    }
    if(props?.type === 'delete'){
      btn = <Button type="submit" color={'danger'} children="Delete"></Button>
    }
    if(props?.type === 'edit'){
      btn = <Button type="submit" disabled={!name} color={'success'} children="Edit"></Button>
    }
    return btn;
  }
  return (
    <Modal
      {...props}
    >
      <Form id="form" onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}>
        <ModalHeader>
          <Label id="contained-modal-title-vcenter">
            {props.type === 'delete' ? 'delete room' : props.type === 'new' ? 'create a room' : 'edit a room'}
          </Label>
        </ModalHeader>
        <ModalBody>
          {props.type !== 'delete' ?
            <>
              <FormGroup floating="true">
                <Label for="name">
                  Room Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={name ?? modalData?.name ?? ''}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter Department Name"
                  type="text"
                  required
                />
              </FormGroup>

              <FormGroup floating="true">
                <Label for="semester">
                  Capacity
                </Label>
                <Input
                  id="semester"
                  name="semester"
                  value={capacity ?? modalData?.capacity ?? ''}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                  placeholder="Enter Capacity"
                  type="number"
                  required
                />
              </FormGroup>

              <ButtonGroup className="w-100 d-flex justify-content-between">
                <Button
                  color={!is_lab ? "success" : "secondary"}
                  onClick={() => setIsLab(false)}
                  active={!is_lab}
                >
                  Lecture
                </Button>
                <Button
                  color={is_lab ? "success" : "secondary"}
                  onClick={() => setIsLab(true)}
                >
                  Lab
                </Button>
              </ButtonGroup>
            </>
            : 'Do you want to remove ' + modalData.name + "?"}
        </ModalBody>
        <ModalFooter className="p-2">
          <Button color="primary" onClick={() => props.toggle('')}>Close</Button>
          {submitBtn()}
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default RoomModal;