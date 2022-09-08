import { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Form, FormGroup, Input } from "reactstrap";
import { deleteItem, post, put } from "services/api";
import { AppContext } from '../../contexts/AppContext'

function CollegeModal(props) {
  // const formRef = useRef(HTMLFormElement);
  const { modalData } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [semester, setSemester] = useState(null);
  const [student_id, setStudentId] = useState(null);
  const [department_id, setDepartmentId] = useState(null);
  const [password, setPassword] = useState(null);
  const submit = async () => {
    const form = document.getElementById("form");
    if (form.checkValidity()) {
      if (props.type === 'new') {
        let user = { name, email, password };
        user.role = props.role;
        if(props.role === 'student'){
          user.department_id = department_id;
          user.student_id = student_id;
          user.semester = semester;
        }
        const resp = await post("/user", user);
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'edit' && modalData) {
        let data = {};
        if (name) {
          data.name = name;
        }
        if (password) {
          data.password = password;
        }
        if (email) {
          data.email = email;
        }
        if (department_id) {
          data.department_id = department_id;
        }
        if (student_id) {
          data.student_id = student_id;
        }
        if (semester) {
          data.semester = semester;
        }
        const resp = await put("/user/" + modalData.id, data);
        if (resp.success) {
          props.toggle('');
        }
      }
      if (props.type === 'delete' && modalData) {
        const resp = await deleteItem("/user/" + modalData.id);
        if (resp.success) {
          props.toggle('');
        }
      }
    }
  }
  const submitBtn = ()=>{
    let btn;
    if (props?.type === 'new') {
      btn = <Button type="submit" color={'success'} children="Create"></Button>
    }
    if(props?.type === 'delete'){
      btn = <Button type="submit" color={'danger'} children="Delete"></Button>
    }
    if(props?.type === 'edit'){
      btn = <Button type="submit" color={'success'} children="Edit"></Button>
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
            {props.type === 'delete' ? 'delete ' + props.role : props.type === 'new' ? 'create a ' + props.role : 'edit a ' + props.role}
          </Label>
        </ModalHeader>
        <ModalBody>
          {props.type !== 'delete' ?
            <>
              <FormGroup floating="true">
                <Label for="name">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={name ?? modalData?.name ?? ''}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  type="text"
                  required
                />
              </FormGroup>
              <FormGroup floating="true">
                <Label for="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={email ?? modalData?.email ?? ''}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="example@example.com"
                  type="email" />
              </FormGroup>
              {props.role === 'student' ? 
              <>
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
                  placeholder="semester"
                  type="number" />
              </FormGroup>
              <FormGroup floating="true">
                <Label for="student_id">
                  Student Id
                </Label>
                <Input
                  id="student_id"
                  name="student_id"
                  value={student_id ?? modalData?.student_id ?? ''}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                  }}
                  placeholder="Student Id"
                  type="text" />
              </FormGroup>
              <FormGroup floating="true">
                <Label for="department">
                  Department
                </Label>
                <Input
                  id="department"
                  name="department"
                  value={department_id ?? modalData?.department?.id}
                  placeholder="Select Department"
                  onChange={(e) =>
                    setDepartmentId(e.target.value)}
                  type="select"
                >
                  <option>
                    Select a Department
                  </option>
                  {props.departments.map(r => {
                    return (
                      <option value={r.id} key={r.id}>
                        {r.name}
                      </option>
                    )
                  })}
                </Input>
              </FormGroup>
              </>
              : ''}
              <FormGroup floating="true">
                <Label for="password">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="**********"
                  type="password" />
              </FormGroup>
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

export default CollegeModal;