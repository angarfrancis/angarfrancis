import { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Form, FormGroup, Input } from "reactstrap";
import { deleteItem, post, put } from "services/api";
import { AppContext } from '../../contexts/AppContext'

function CollegeModal(props) {
  const { modalData } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [registerar, setRegisterar] = useState(null);

  const bsonId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

  const submit = async () => {
    const form = document.getElementById("form");
    if (form.checkValidity()) {
      if (props.type === 'new') {
        const resp = await post("/college", { name, registerer_id: registerar });
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'edit' && modalData) {
        let data = {};
        if (name) {
          data.name = name;
        }
        if (registerar) {
          data.registerer_id = registerar;
        }
        const resp = await put("/college/" + modalData.id, data);
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'delete' && modalData) {
        const resp = await deleteItem("/college/" + modalData.id);
        if (resp.success) {
          props.toggle('');
        }
      }
    }
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
            {props.type === 'delete' ? 'delete college' : props.type === 'new' ? 'create a college' : 'edit a college'}
          </Label>
        </ModalHeader>
        <ModalBody>
          {props.type !== 'delete' ?
            <><FormGroup floating="true">
              <Label for="name">
                College Name
              </Label>
              <Input
                id="name"
                name="name"
                value={name ?? modalData?.name ?? ''}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter College Name"
                type="text" />
            </FormGroup>
              <FormGroup floating="true">
                <Label for="registerar">
                  College Registerar
                </Label>
                <Input
                  id="registerar"
                  name="name"
                  value={registerar ?? modalData?.registerer?.id}
                  placeholder="Select College Registerar"
                  onChange={(e) =>
                    setRegisterar(e.target.value)}
                  type="select"
                >
                  <option>
                    Select a Registerar
                  </option>
                  {props.registerars.map(r => {
                    return (
                      <option value={r.id} key={bsonId()}>
                        {r.name}
                      </option>
                    )
                  })}
                </Input>
              </FormGroup></>
            : 'Do you want to remove ' + modalData.name + "?"}
        </ModalBody>
        <ModalFooter className="p-2">
          <Button color="primary" onClick={() => props.toggle('')} children="Close" />
          <Button type="submit" disabled={props.type === 'new' ? !name || !registerar : props.type === 'edit' ? !name && !registerar : false} color={props.type === 'delete' ? 'danger' : 'success'}>{props.type === 'new' ? 'Create' : props.type}</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default CollegeModal;