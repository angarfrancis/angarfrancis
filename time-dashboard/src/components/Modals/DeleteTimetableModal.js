import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Form } from "reactstrap";
import { deleteItem } from "services/api";

function DeleteTimetableModal(props) {
  const submit = async () => {
        const resp = await deleteItem("/time_table/"+props.id);
        if (resp.success) {
          props.toggle('');
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
            Delete a lucture
          </Label>
        </ModalHeader>
        <ModalBody>
          {'Do you want to remove ' + props.name + "?"}
        </ModalBody>
        <ModalFooter className="p-2">
          <Button color="primary" onClick={() => props.toggle('')} children="Close" />
          <Button type="submit" color={'danger'} children="Delete"></Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default DeleteTimetableModal;