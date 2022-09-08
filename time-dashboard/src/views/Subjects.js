
import React, { useContext, useEffect, useState } from "react";
import SubjectModal from "../components/Modals/SubjectModal"
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  // Badge,
  CardLink,
  Input
} from "reactstrap";
import { get } from "services/api";
import { AppContext } from "contexts/AppContext";

function Subject(props) {
  const { setModalData } = useContext(AppContext)
  const [modal, setModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalType, setModalType] = useState("new");
  const toggle = (type,data) => { 
    setModalType(type);
    setModalData(data)
    setModal(!modal)
    if(type === ''){
      getAllSubjects();
    }
  };
  const getAllSubjects = async () => {
    const resp = await get("/subs");
    if (resp.success) {
      setSubjects(resp.data)
    }
  }
  const getAllDepartments = async () => {
    const resp = await get("/department");
    if (resp.success) {
      setDepartments(resp.data)
    }
  }

  const filtered = ()=>{
    return subjects.filter(e=> e?.name?.toLowerCase().includes(filter.toLowerCase()) || e?.teacher?.name?.toLowerCase().includes(filter.toLowerCase()))
  }
  const getAllTeachers = async () => {
    const resp = await get("/user/teacher");
    if (resp.success) {
      setUsers(resp.data ?? [])
    }
  }

  useEffect(() => {
    getAllSubjects();
    getAllTeachers();
    getAllDepartments();
  }, [])

  return (
    <div className="content">
      <style>
        {
          `
        .table-responsive {
          overflow-x: auto !important;
          overflow-y: auto !important;
          height: 70vh !important;
        }
        `
        }
      </style>
      <Row>
        <Col lg="12" md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between">
              <CardTitle tag="h4">Colleges</CardTitle>
              <Input placeholder="search by name or teacher name" type="search" onChange={(e)=> setFilter(e.target.value)} className="w-50" />
              <CardLink href="#addSubject" onClick={()=>toggle('new')}>
                <span style={{ fontSize: "xx-large", color: "#1E88F8" }} className="fa fa-plus-circle"></span>
              </CardLink>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Room Type</th>
                    <th>Teacher</th>
                    <th>College</th>
                    <th>Hours</th>
                    <th>Semester</th>
                    <th>Departments</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filtered().map(e => {
                      return (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.name}</td>
                          <td>{e.is_lab ? 'Lab' : 'Lecture'}</td>
                          <td>{e?.teacher?.name}</td>
                          <td>{e?.college?.name}</td>
                          <td>{e?.hours}</td>
                          <td>{e?.semester}</td>
                          <td>{e?.departments?.map(d=>{
                            return (
                              <>
                              <b>{'> ' + d.department.name}</b>
                              <br />
                              </>
                            )
                          })}</td>
                          <td className="text-center">
                            <CardLink href="#addCollege" onClick={()=>toggle('edit',e)}>
                              <span style={{ fontSize: "large", color: "#1E88F8" }} className="fa fa-edit"></span>
                            </CardLink>
                            <CardLink href="#addCollege" onClick={()=>toggle('delete',e)}>
                              <span style={{ fontSize: "large", color: "red" }} className="fa fa-trash"></span>
                            </CardLink>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <SubjectModal
        isOpen={modal}
        toggle={toggle}
        type={modalType}
        teachers={users}
        style={{top: '0'}}
        departments={departments}
      />
    </div>
  );
}

export default Subject;
