import Timetable from "components/Timetable/Timetable";
import React from "react";
import { get } from "services/api";

class Teacher extends React.Component {
    constructor() {
        super()
        this.state = {
            times: {
                day1: [],
                day2: [],
                day3: [],
                day4: [],
                day5: [],
                day6: [],
            },
        };

        this.loadTables = async () => {
            const resp = await get("/time_table/teacher");
            if (resp.success) {
                this.setState({ times: resp.data });
            } else {
                document.location.reload();
            }
        }
    }
    componentDidMount() {
        this.loadTables();
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
            .tab-content {
            height: 70vh !important;
            overflow-y: auto !important;
            }
            .spec-table {
                border: 2px solid #1E88F8;
                border-radius: 10px;
            }
            `
                    }
                </style>
                <div className="spec-table">
                    <Timetable label={"Teacher Time Table"} days={this.state.times}  isNotAuth />
                </div>
            </div>
        );
    }
}

export default Teacher;
