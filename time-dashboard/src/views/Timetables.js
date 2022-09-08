
// import { AppContext } from "contexts/AppContext";
import Timetable from "components/Timetable/Timetable";
import React from "react";
// import UserModal from "../components/Modals/UserModal";
// reactstrap components
import {
  // Card,
  // CardHeader,
  // CardBody,
  // CardTitle,
  // Table,
  // Row,
  // Col,
  // CardLink,
  // Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Spinner,
  // CardText,
  // Button
} from "reactstrap";
import { deleteItem } from "services/api";
import { post } from "services/api";
import { get } from "services/api";

class Timetables extends React.Component {
  constructor() {
    super()
    this.state = {
      activeTab: "loading",
      selected: "1",
      tabs: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      loaded: false,
      times: [],
      create: true,
      creating: false,
    };
    this.setActive = (n) => {
      this.loadTables(n);
    }

    this.refresh = ()=>{
      this.loadTables(this.state.selected)
    }
    this.loadTables = async (n) => {
      this.setState({ selected: n, activeTab: "loading" })
      const resp = await get("/time_table/registerar/" + n);
      if (resp.success) {
        this.setState({ times: resp.data, activeTab: "active", create: resp.create });
      } else {
        this.setState({ times: [], activeTab: "active", create: true });
      }
    }

    this.createTimetables = async (n)=>{
      this.setState({ creating: true });
      const resp = await post("/time_table/registerar/" + n,{semester: n});
      if (resp.success) {
        this.setState({ creating: false });
        this.loadTables(n);
      } else {
        this.setState({ creating: false });
      }
    }

    this.deleteTimetables = async (n)=>{
      this.setState({ creating: true });
      const resp = await deleteItem("/time_table/registerar/" + n);
      if (resp.success) {
        this.setState({ creating: false });
        this.loadTables(n);
      } else {
        this.setState({ creating: false });
      }
    }
  }
  componentDidMount() {
    this.loadTables("1");
    this.setState({ loaded: true });
  }
  shouldComponentUpdate() {
    return true;
  }
  render() {
    return (
      <div className="content">
        <style>
          {
            `
        .active-tab {
          background-color: #1E88F8 !important;
          color: aliceblue !important;
        }
        .in-active-tab {
          background-color: grey !important;
          color: aliceblue !important;
        }
        .tab-content {
          height: 70vh !important;
          overflow-y: auto !important;
        }
        `
          }
        </style>
        <div>
          <Nav style={{justifyContent: "space-between"}} tabs>
            {
              this.state.tabs.map((n, i) => {
                return (
                  <NavItem key={i}>
                    <NavLink
                      className={this.state.selected === n ? 'active-tab' : 'in-active-tab'}
                      href={'#' + n}
                      onClick={() => this.setActive(n)}
                    >
                      Semester {n}
                    </NavLink>
                  </NavItem>
                );
              })
            }
            {this.state.create? <NavItem>
              <NavLink
                className={'btn-success'}
                href={'#'}
                disabled={this.state.creating}
                onClick={() => this.createTimetables(this.state.selected)}
              >
                {this.state.creating? <Spinner
                color="primary"
                style={{
                  height: '2rem',
                  width: '2rem'
                }}
                type="border"
              >
                Creating...
              </Spinner>: 'Create Timetables for semester ' + this.state.selected}
              </NavLink>
            </NavItem>:<NavItem>
              <NavLink
                className={'btn-danger'}
                href={'#'}
                onClick={() => this.deleteTimetables(this.state.selected)}
              >
               { this.state.creating? <Spinner
                color="primary"
                style={{
                  height: '2rem',
                  width: '2rem'
                }}
                type="border"
              >
                Deleting...
              </Spinner>:  'Delete Timetables for semester '+this.state.selected}
              </NavLink>
            </NavItem>}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>

            <TabPane tabId="active" tabIndex={0}>
              {
                this.state.times.map((e, i) => {
                  return (
                    <Timetable label={e?.label} days={e?.days} department_id={e?.department_id} semester={this.state.selected} refresh={this.refresh} key={i} />
                  )
                })
              }
            </TabPane>
            {this.state.activeTab === 'loading' ? <TabPane className="d-flex flex-row justify-content-center align-items-center" tabId="loading" tabIndex={1}>
              <Spinner
                color="primary"
                style={{
                  height: '5rem',
                  width: '5rem'
                }}
                type="border"
              >
              </Spinner>
            </TabPane> : ''}
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Timetables;
