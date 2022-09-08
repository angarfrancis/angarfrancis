import { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Form, FormGroup, Input } from "reactstrap";
import { deleteItem, post, put } from "services/api";
import { AppContext } from '../../contexts/AppContext'

function DepartmentModal(props) {
  const { modalData } = useContext(AppContext);
  const [name, setName] = useState(null);
  const submit = async () => {
    const form = document.getElementById("form");
    if (form.checkValidity()) {
      if (props?.type === 'new') {
        const resp = await post("/department", { name });
        if (resp.success) {
          props?.toggle('');
        }
      }
      if (props?.type === 'edit' && modalData) {
        let data = {};
        if (name) {
          data.name = name;
        }
        const resp = await put("/department/" + modalData.id, data);
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props?.type === 'delete' && modalData) {
        const resp = await deleteItem("/department/" + modalData.id);
        if (resp.success) {
          props.toggle('');
        }
      }
    }
  }

  const submitBtn = ()=>{
    let btn;
    if (props?.type === 'new') {
      btn = <Button type="submit" disabled={!name} color={'success'} children="Create"></Button>
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
            {props?.type === 'delete' ? 'delete department' : props?.type === 'new' ? 'create a department' : 'edit a department'}
          </Label>
        </ModalHeader>
        <ModalBody>
          {props.type !== 'delete' ?
            <><FormGroup floating="true">
              <Label for="name">
                Department Name
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
            </FormGroup></>
            : 'Do you want to remove ' + modalData.name + "?"}
        </ModalBody>
        <ModalFooter className="p-2">
          <Button color="primary" onClick={() => props?.toggle('')} children="Close"></Button>
           {submitBtn()}
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default DepartmentModal;