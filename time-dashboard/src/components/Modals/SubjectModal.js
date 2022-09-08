import { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Form, FormGroup, Input, ButtonGroup } from "reactstrap";
import { deleteItem, post, put } from "services/api";
import { AppContext } from '../../contexts/AppContext'
import { MultiSelect } from "react-multi-select-component";

function DepartmentModal(props) {
  const { modalData } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [is_lab, setIsLab] = useState(false);
  const [teacher_id, setTeacher] = useState(null);
  const [semester, setSemester] = useState(null);
  const [hours, setHours] = useState(null);
  const [departments, setDepartments] = useState([]);
  const submit = async () => {
    const form = document.getElementById("form");
    if (form.checkValidity()) {
      if (props.type === 'new') {
        const resp = await post("/subs", { name, is_lab, semester, teacher_id, departments: [...departments.map(e => e.value)], hours });
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'edit' && modalData) {
        let data = {};
        if (name) {
          data.name = name;
        }
        if (hours) {
          data.hours = hours;
        }
        if (semester) {
          data.semester = semester;
        }
        if (teacher_id) {
          data.teacher_id = teacher_id;
        }
        if (is_lab !== null) {
          data.is_lab = is_lab;
        }
        const resp = await put("/subs/" + modalData.id, data);
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'delete' && modalData) {
        const resp = await deleteItem("/subs/" + modalData.id);
        if (resp.success) {
          props.toggle('');
        }
      }
    }
  }
  const submitBtn = ()=>{
    let btn;
    if (props?.type === 'new') {
      btn = <Button type="submit" disabled={!name || !semester || !teacher_id || is_lab === null || departments.length === 0} color={'success'} children="Create"></Button>
    }
    if(props?.type === 'delete'){
      btn = <Button type="submit" color={'danger'} children="Delete"></Button>
    }
    if(props?.type === 'edit'){
      btn = <Button type="submit" disabled={!name && !semester && !teacher_id && is_lab === null} color={'success'} children="Edit"></Button>
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
            {props.type === 'delete' ? 'delete subject' : props.type === 'new' ? 'create a subject' : 'edit a subject'}
          </Label>
        </ModalHeader>
        <ModalBody>
          {props.type !== 'delete' ?
            <>
              <FormGroup floating="true">
                <Label for="name">
                  Subject Name
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
                  Semester
                </Label>
                <Input
                  id="semester"
                  name="semester"
                  value={semester ?? modalData?.semester ?? ''}
                  onChange={(e) => {
                    setSemester(e.target.value);
                  }}
                  placeholder="Enter Semester"
                  type="number"
                  required
                />
              </FormGroup>
              <FormGroup floating="true">
                <Label for="hours">
                  Hours
                </Label>
                <Input
                  id="hours"
                  name="hours"
                  value={hours ?? modalData?.hours ?? ''}
                  onChange={(e) => {
                    setHours(e.target.value);
                  }}
                  placeholder="Enter hours"
                  type="number"
                  required
                />
              </FormGroup>
              <FormGroup floating="true">
                <Label for="teacher">
                  Teacher
                </Label>
                <Input
                  id="teacher"
                  name="teacher"
                  value={teacher_id ?? modalData?.teacher?.id}
                  placeholder="Select Teacher"
                  onChange={(e) =>
                    setTeacher(e.target.value)}
                  type="select"
                >
                  <option>
                    Select a Teacher
                  </option>
                  {props.teachers.map(r => {
                    return (
                      <option value={r.id} key={r.id}>
                        {r.name}
                      </option>
                    )
                  })}
                </Input>
              </FormGroup>

              {props.type !== 'edit' ? <MultiSelect
                labelledBy="Select Departments"
                value={departments}
                onChange={setDepartments}
                options={props.departments.map(d => {
                  return { label: d.name, value: d.id }
                })
                }
              /> : ''}

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

export default DepartmentModal;