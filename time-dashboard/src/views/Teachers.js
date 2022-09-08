
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
    const resp = await get("/user/teacher");
    if (resp.success) {
      setUsers(resp.data ?? [])
    }
  }

  const filtered = ()=>{
    return users.filter(e=> e?.name?.toLowerCase().includes(filter) || e?.email?.toLowerCase().includes(filter))
  }
  
  useEffect(() => {
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
              <CardTitle tag="h4">Teachers</CardTitle>
              <Input placeholder="search..." type="search" onChange={(e)=> setFilter(e.target.value)} className="w-50" />
              <CardLink href="#addAdmin" onClick={()=>toggle('new')}>
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
        role={'teacher'}
      />
    </div>
  );
}

export default Teachers;
