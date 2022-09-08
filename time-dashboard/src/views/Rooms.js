
import React, { useContext, useEffect, useState } from "react";
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
import { AppContext } from "contexts/AppContext";
import RoomModal from "components/Modals/RoomModal";

function Rooms(props) {
  const { setModalData } = useContext(AppContext)
  const [modal, setModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalType, setModalType] = useState("new");
  const toggle = (type,data) => { 
    setModalType(type);
    setModalData(data)
    setModal(!modal)
    if(type === ''){
      getAllRooms();
    }
  };
  const getAllRooms = async () => {
    const resp = await get("/rooms");
    if (resp.success) {
      setRooms(resp.data)
    }
  }

  const filtered = ()=>{
    return rooms.filter(e=> e?.name?.toLowerCase().includes(filter.toLowerCase()) || e?.college?.name?.toLowerCase().includes(filter.toLowerCase()))
  }

  useEffect(() => {
    getAllRooms();
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
              <CardTitle tag="h4">Rooms</CardTitle>
              <Input placeholder="search..." type="search" onChange={(e)=> setFilter(e.target.value)} className="w-50" />
              <CardLink href="#addCollege" onClick={()=>toggle('new')}>
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
                    <th>Capacity</th>
                    <th>College</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filtered().map((e,i) => {
                      return (
                        <tr key={i}>
                          <td>{e.id}</td>
                          <td>{e.name}</td>
                          <td>{e.is_lab ? 'Lab' : 'Lecture'}</td>
                          <td>{e?.capacity}</td>
                          <td>{e?.college?.name}</td>
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
      <RoomModal
        isOpen={modal}
        toggle={toggle}
        type={modalType}
      />
    </div>
  );
}

export default Rooms;
