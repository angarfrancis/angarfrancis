
import Colleges from "views/Colleges";
import jwt from "jwt-decode";
import Registerars from "views/Registerars";
import Teachers from "views/Teachers";
import Admins from "views/Admins";
import Departments from "views/Departments";
import Subjects from "views/Subjects";
import Rooms from "views/Rooms";
import Students from "views/Students";
import Timetables from "views/Timetables";
import Teacher from "views/Teacher";
import Student from "views/Student";

const getRoutes = () => {
  let decoded = {};
  if (localStorage['token']) {
    decoded = jwt(localStorage['token']);
  }
  let routes = [];
  if (decoded.role === 'admin') {
    routes.push({
      path: "/",
      name: "Colleges",
      rtlName: "الكليات",
      icon: "tim-icons icon-chart-pie-36",
      component: Colleges,
      layout: ""
    });
    routes.push({
      path: "/teachers",
      name: "Teachers",
      rtlName: "لوحة القيادة",
      icon: "fa fa-users",
      component: Teachers,
      layout: ""
    });
    routes.push({
      path: "/registerars",
      name: "Registerars",
      rtlName: "لوحة القيادة",
      icon: "fa fa-users",
      component: Registerars,
      layout: ""
    });
    routes.push({
      path: "/admins",
      name: "Admins",
      rtlName: "لوحة القيادة",
      icon: "fa fa-users",
      component: Admins,
      layout: ""
    });
  }
  if (decoded.role === 'registerar') {
    routes.push({
      path: "/",
      name: "Departments",
      rtlName: "Departments",
      icon: "fa fa-th",
      component: Departments,
      layout: ""
    });
    routes.push({
      path: "/rooms",
      name: "Rooms",
      rtlName: "Rooms",
      icon: "fa fa-joomla",
      component: Rooms,
      layout: ""
    });
    routes.push({
      path: "/subjects",
      name: "Subjects",
      rtlName: "الكليات",
      icon: "fa fa-list",
      component: Subjects,
      layout: ""
    });
    routes.push({
      path: "/students",
      name: "Students",
      rtlName: "Students",
      icon: "fa fa-users",
      component: Students,
      layout: ""
    });
    routes.push({
      path: "/timetables",
      name: "Time Tables",
      rtlName: "Time Tables",
      icon: "fa fa-table",
      component: Timetables,
      layout: ""
    });
  }
  if (decoded.role === 'teacher') {
    routes.push({
      path: "/",
      name: "Teacher",
      rtlName: "Teacher",
      icon: "fa fa-th",
      component: Teacher,
      layout: ""
    });
  }
  if (decoded.role === 'student') {
    routes.push({
      path: "/",
      name: "Teacher",
      rtlName: "Teacher",
      icon: "fa fa-th",
      component: Student,
      layout: ""
    });
  }
  return routes;
}
export default getRoutes;
