
import { AppContext } from "contexts/AppContext";
import React, { useContext, useEffect, useState } from "react";
import UserModal from "../components/Modals/UserModal";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  CardLink,
  Input
} from "reactstrap";
import { get } from "services/api";

function Teachers() {
  const { setModalData } = useContext(AppContext)
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalType, setModalType] = useState("new");
  const toggle = (type,data) => { 
    setModalType(type);
    setModalData(data)
    setModal(!modal)
    if(type === ''){
      getAllTeachers();
    }
  };
  const getAllTeachers = async () => {
    const resp = await get("/user");
    if (resp.success) {
      setUsers(resp.data ?? [])
    }
  }
  const getAllDepartments = async () => {
    const resp = await get("/department");
    if (resp.success) {
      setDepartments(resp.data)
    }
  }

  const filtered = ()=>{
    return users.filter(e=> e?.name?.toLowerCase().includes(filter.toLowerCase()) || e?.email?.toLowerCase().includes(filter.toLowerCase()) || e?.student_id?.toLowerCase().includes(filter.toLowerCase()) || e?.semester?.toString()?.toLowerCase().includes(filter.toLowerCase()) || e?.department?.name.toLowerCase().includes(filter.toLowerCase()))
  }
  
  useEffect(() => {
    getAllDepartments();
    getAllTeachers();
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
              <CardTitle tag="h4">Students</CardTitle>
              <Input placeholder="search..." type="search" onChange={(e)=> setFilter(e.target.value)} className="w-50" />
              <CardLink href="#addStudent" onClick={()=>toggle('new')}>
                <span style={{ fontSize: "xx-large", color: "#1E88F8" }} className="fa fa-plus-circle"></span>
              </CardLink>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Student Id</th>
                    <th>Semester</th>
                    <th>Department</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filtered().map(e => {
                      return (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e?.name}</td>
                          <td>{e?.email}</td>
                          <td>{e?.student_id}</td>
                          <td>{e?.semester}</td>
                          <td>{e?.department?.name}</td>
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
      <UserModal
        isOpen={modal}
        toggle={toggle}
        type={modalType}
        style={{top: '0'}}
        role={'student'}
        departments={departments}
      />
    </div>
  );
}

export default Teachers;
