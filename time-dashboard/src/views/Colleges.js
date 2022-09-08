
import React, { useContext, useEffect, useState } from "react";
import CollegeModal from "../components/Modals/CollegeModal"
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

function Dashboard(props) {
  const { setModalData } = useContext(AppContext)
  const [modal, setModal] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [registerars, setRegisterars] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalType, setModalType] = useState("new");
  const toggle = (type, data) => {
    setModalType(type);
    setModalData(data)
    setModal(!modal)
    if (type === '') {
      getAllColleges();
    }
  };
  const getAllColleges = async () => {
    const resp = await get("/college");
    if (resp.success) {
      setColleges(resp.data)
    }
  }
  const getAllRegisterars = async () => {
    const resp = await get("/user/registerer");
    if (resp.success) {
      setRegisterars(resp.data)
    } else {
      document.location.reload();
    }
  }

  const filtered = () => {
    return colleges.filter(e => e?.name?.toLowerCase().includes(filter.toLowerCase()) || e?.registerer?.name?.toLowerCase().includes(filter.toLowerCase()))
  }

  useEffect(() => {
    getAllColleges();
    getAllRegisterars()
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
              <Input placeholder="search..." type="search" onChange={(e) => setFilter(e.target.value)} className="w-50" />
              <CardLink href="#addCollege" onClick={() => toggle('new')}>
                <span style={{ fontSize: "xx-large", color: "#1E88F8" }} className="fa fa-plus-circle"></span>
              </CardLink>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Registerar</th>
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
                          <td>{e?.registerer?.name}</td>
                          <td className="text-center">
                            <CardLink href="#addCollege" onClick={() => toggle('edit', e)}>
                              <span style={{ fontSize: "large", color: "#1E88F8" }} className="fa fa-edit"></span>
                            </CardLink>
                            <CardLink href="#addCollege" onClick={() => toggle('delete', e)}>
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
      <CollegeModal
        isOpen={modal}
        toggle={toggle}
        type={modalType}
        registerars={registerars}
      />
    </div>
  );
}

export default Dashboard;
