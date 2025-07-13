import run from "./main.js";
import employeeHandler from "./EmployeeModel.js"; 
document.addEventListener("DOMContentLoaded", (event)=>{
    run.applyDefault(); 
    employeeHandler.unsubscribe = employeeHandler.init(); 
})