import EmployeeList from "../../views/employee/employee-list/EmployeeList.vue";
import MError from "../../views/MError.vue";
import EmployeeImport from "../../views/employee/employee-import/EmployeeImport.vue";

/**
 * Các routes của page
 */
const routes = [
  {
    path: "",
    component: EmployeeList,
  },
  {
    path: "/app/employee",
    component: EmployeeList,
  },
  {
    path: "/app/employee",
    component: EmployeeList,
  },
  {
    path: "/app/import-employee",
    component: EmployeeImport,
  },
  {
    path: "/:pathMatch(.*)*",
    component: MError,
  },
];

export default routes;
