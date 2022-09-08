
import DeleteTimetableModal from "components/Modals/DeleteTimetableModal";
import AddTimetableModal from "components/Modals/AddTimetableModal";
import React from "react";

import {
    Table,
    Label,
    CardLink
} from "reactstrap";
import { get } from "services/api";

class Timetable extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selected: "",
            name: "",
            modalShow: false,
            modalAddShow: false,
            day: 1,
            start_time: "08:00:00",
            subjects: []
        }

        this.toggle = (val)=>{
            if(val === ''){
                this.setState({modalShow: false});
                this.props.refresh();
            }else{
                this.setState({selected: val.id,name: val.subject.name,modalShow: true});
            }
        }

        this.toggleAdd = async (val)=>{
            if(val === ''){
                this.setState({modalAddShow: false});
                this.props.refresh();
            }else{
                const resp = await get("/subs/department/"+this.props.department_id+"/"+this.props.semester);
                if (resp.success) {
                    this.setState({start_time: val.start_time,day: val.day,modalAddShow: true,subjects: resp.data});
                }
            }
        }

        this.getSorted = (arr,day) => {
            let fisrt = <td key={this.bsonId()} className="text-center">
                {props.isNotAuth? "-" : <CardLink href="#add" onClick={() => this.toggleAdd({start_time: "08:00:00",day: day})}>
                    <span style={{ fontSize: "large", color: "#1E88F8" }} className="fa fa-plus-circle"></span>
                </CardLink>}
            </td>;
            let second = <td key={this.bsonId()} className="text-center">
                {props.isNotAuth? "-" : <CardLink href="#add" onClick={() => this.toggleAdd({start_time: "11:00:00",day: day})}>
                    <span style={{ fontSize: "large", color: "#1E88F8" }} className="fa fa-plus-circle"></span>
                </CardLink>}
            </td>;
            let third = <td key={this.bsonId()} className="text-center">
                {props.isNotAuth? "-" : <CardLink href="#add" onClick={() => this.toggleAdd({start_time: "13:00:00",day: day})}>
                    <span style={{ fontSize: "large", color: "#1E88F8" }} className="fa fa-plus-circle"></span>
                </CardLink>}
            </td>;
            let forth = <td key={this.bsonId()} className="text-center">
                {props.isNotAuth? "-" : <CardLink href="#add" onClick={() => this.toggleAdd({start_time: "15:00:00",day: day})}>
                    <span style={{ fontSize: "large", color: "#1E88F8" }} className="fa fa-plus-circle"></span>
                </CardLink>}
            </td>;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].start_time === "08:00:00") {
                    fisrt =
                        <td className="text-center" key={this.bsonId()}>
                            {arr[i].subject.name}
                            <b>  </b>
                            /
                            <b>  </b>
                            {arr[i].room.name}
                            <b>  </b>
                            {props.isNotAuth? "" : <CardLink href="#remove" onClick={() => this.toggle(arr[i])}>
                                <span style={{ fontSize: "large", color: "red" }} className="fa fa-trash"></span>
                            </CardLink>}
                        </td>
                }
                if (arr[i].start_time === "11:00:00") {
                    second =
                        <td className="text-center" key={this.bsonId()}>
                            {arr[i].subject.name}
                            <b>  </b>
                            /
                            <b>  </b>
                            {arr[i].room.name}
                            <b>  </b>
                            {props.isNotAuth? "" : <CardLink href="#remove" onClick={() => this.toggle(arr[i])}>
                                <span style={{ fontSize: "large", color: "red" }} className="fa fa-trash"></span>
                            </CardLink>}
                        </td>
                }
                if (arr[i].start_time === "13:00:00") {
                    third =
                        <td className="text-center" key={this.bsonId()}>
                            {arr[i].subject.name}
                            <b>  </b>
                            /
                            <b>  </b>
                            {arr[i].room.name}
                            <b>  </b>
                            {props.isNotAuth? "" : <CardLink href="#remove" onClick={() => this.toggle(arr[i])}>
                                <span style={{ fontSize: "large", color: "red" }} className="fa fa-trash"></span>
                            </CardLink>}
                        </td>
                }
                if (arr[i].start_time === "15:00:00") {
                    forth =
                        <td className="text-center" key={this.bsonId()}>
                            {arr[i].subject.name}
                            <b>  </b>
                            /
                            <b>  </b>
                            {arr[i].room.name}
                            <b>  </b>
                           {props.isNotAuth? "" : <CardLink href="#remove" onClick={() => this.toggle(arr[i])}>
                                <span style={{ fontSize: "large", color: "red" }} className="fa fa-trash"></span>
                            </CardLink>}
                        </td>
                }
            }
            return [fisrt, second, third, forth];
        };
        this.bsonId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
            s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    }
    componentDidMount() {
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {
        return (
            <div className="content d-flex flex-column justify-content-center">
                <Label className="text-center text-capitalize font-weight-bold">
                    {this.props.label ?? ''}
                    <hr />
                </Label>
                <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                        <tr>
                            <th className="text-center text-capitalize font-weight-bold">Day \ Time</th>
                            <th className="text-center text-capitalize font-weight-bold">08:00 AM <br /> 10:00 AM</th>
                            <th className="text-center text-capitalize font-weight-bold">11:00 AM <br /> 01:00 PM</th>
                            <th className="text-center text-capitalize font-weight-bold">01:00 PM <br /> 03:00 PM</th>
                            <th className="text-center text-capitalize font-weight-bold">03:00 PM <br /> 05:00 PM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sat */}
                        <tr>
                            <td className="text-center text-capitalize font-weight-bold">Sat</td>
                            {this.getSorted(this.props.days.day1,1)}
                        </tr>
                        {/* Sun */}
                        <tr>
                            <td className="text-center text-capitalize font-weight-bold">Sun</td>
                            {this.getSorted(this.props.days.day2,2)}
                        </tr>
                        {/* Mon */}
                        <tr>
                            <td className="text-center text-capitalize font-weight-bold">Mon</td>
                            {this.getSorted(this.props.days.day3,3)}
                        </tr>
                        {/* Tue */}
                        <tr>
                            <td className="text-center text-capitalize font-weight-bold">Tue</td>
                            {this.getSorted(this.props.days.day4,4)}
                        </tr>
                        {/* Wed */}
                        <tr>
                            <td className="text-center text-capitalize font-weight-bold">Wed</td>
                            {this.getSorted(this.props.days.day5,5)}
                        </tr>
                        {/* Thu */}
                        <tr>
                            <td className="text-center text-capitalize font-weight-bold">Thu</td>
                            {this.getSorted(this.props.days.day6,6)}
                        </tr>
                    </tbody>
                </Table>
                <DeleteTimetableModal isOpen={this.state.modalShow} name={this.state.name} toggle={this.toggle} key={this.bsonId()} id={this.state.selected} />
                <AddTimetableModal isOpen={this.state.modalAddShow} name={this.state.name} start_time={this.state.start_time} day={this.state.day} subjects={this.state.subjects} toggle={this.toggleAdd} key={this.bsonId()} id={this.state.selected} />
            </div>
        );
    }
}

export default Timetable;
