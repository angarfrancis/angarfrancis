import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Form, FormGroup, Input } from "reactstrap";
import { get, post } from "services/api";

function AddTimetableModal(props) {
  const [slots, setSlots] = useState([]);
  const [subject, setSubject] = useState(null);
  const [room, setRoom] = useState(null);
  const getSlots = async (id) => {
    const resp = await get("/time_table/slots/" + id);
    if (resp.success) {
      setSlots(resp.data);
    }
  }
  const selectSubject = (id) => {
    setSubject(id);
    getSlots(id);
  }

  const getTime = (finish) => {
    let time = (new Date("2020-12-4 " + props.start_time)).getHours();
    if (finish) {
      time += 2;
    }
    if (time < 13) {
      if (time < 12) {
        time = ("0" + time).slice(-2) + ":00 AM"
      } else {
        time = ("0" + time).slice(-2) + ":00 PM"
      }
    } else {
      time = ("0" + (time - 12)).slice(-2) + ":00 PM"
    }
    return time;
  }

  const bsonId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

  const submit = async () => {
    if (room && subject) {
      const resp = await post("/time_table/add_table", { day: props.day, start_time: props.start_time, subject_id: subject, room_id: room });
      if (resp.success) {
        props.toggle('');
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
            Add a lucture
          </Label>
        </ModalHeader>
        <ModalBody>
          <Label>
            Day: {props.day === 1 ? "Sat" : props.day === 2 ? "Sun" : props.day === 3 ? "Mon" : props.day === 4 ? "Tue" : props.day === 5 ? "Wed" : "Thu"}
          </Label>
          <br />
          <Label>
            Lucture Time: {getTime(false) + " - " + getTime(true)}
          </Label>
          <hr />
          <FormGroup floating="true">
            <Label for="subject">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={subject ?? ""}
              placeholder="Select a subject"
              onChange={(e) =>
                selectSubject(e.target.value)}
              type="select"
            >
              <option>
                Select a Subject
              </option>
              {props.subjects.map(r => {
                return (
                  <option value={r.id} key={bsonId()}>
                    {r.name}
                  </option>
                )
              })}
            </Input>
          </FormGroup>
          <FormGroup floating="true">
            <Label for="room">
              Room
            </Label>
            <Input
              id="room"
              name="room"
              value={room ?? ""}
              placeholder="Select a room"
              onChange={(e) =>
                setRoom(e.target.value)}
              type="select"
            >
              <option>
                Select a Room
              </option>
              {slots.map(r => {
                return (
                  <option value={r.id} key={bsonId()}>
                    {r.name}
                  </option>
                )
              })}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter className="p-2">
          <Button color="primary" onClick={() => props.toggle('')} children="Close" />
          <Button type="submit" color={'success'} children="Create"></Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default AddTimetableModal;