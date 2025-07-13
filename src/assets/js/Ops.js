// Ops.js
import { getrandomUUID } from "./EmployeeModel.js";
import { DEPARTMENTS, ROLES } from "../../constants/constants.js";
import employeeHandler from "./EmployeeModel.js";

export const editCard = async (event, id) => {
  try {
    employeeHandler.currMode = "edit";
    employeeHandler.currId = id;
    await employeeHandler.openModal(event);
    const formContainer = document.getElementById("app__add__employee");
    console.log(formContainer.elements, "elements");
    const inputMapping = [
      "modalfirstName",
      "modallastName",
      "modaldepartment",
      "modalrole",
      "modalemail",
    ];
    const data = employeeHandler.data.find((item, index) => item.id === id);

    if (!data) {
      throw new Error("no record exists");
    }
    employeeHandler.currEmployee = data; 
    for (let entry of inputMapping) {
      formContainer.elements[entry].value = data[entry.replace("modal", "")];
    }
  } catch (err) {
    console.error(err.stack);
    return null;
  }
};

export const deleteCard = (event) => {};

export const handleModal = (event, mode = "open", action="add") => {
  const formNode = document.querySelector("#app__add__employee");
  const overlay = document.getElementById("modalOverlay");
  const hNode = formNode.querySelector("h1");
  const actionBtn = document.querySelector(".modalAction button:last-child"); 
  if(action === "add"){
    hNode.textContent = "Add Employee"; 
    actionBtn.textContent = "Add"; 
  }else{
    hNode.textContent = "Edit Employee"; 
    actionBtn.textContent = "Edit"; 
  }
  switch (mode) {
    case "open":
      console.log("here opening the modal");
      formNode.style.display = "flex";
      overlay.style.display = "block";
      document.body.classList.add("modal-open");
      break;
    case "close":
      formNode.style.display = "none";
      overlay.style.display = "none";
      document.body.classList.remove("modal-open");
      break;
    default:
      throw new Error("unspecified mode");
  }
};

const renderError = (currEmployee) => {
  try {
    const keys = Object.keys(currEmployee);
    const parentContainer = document.querySelector("#app__add__employee");
    keys.forEach((item) => {
      const errorField = parentContainer.querySelector(`input[name="${item}"]`);
      if (!errorField) return;
      errorField.insertAdjacentHTML(
        "afterend",
        `<span class="error" style="color: red">${currEmployee[item]}</span>`
      );
    });
  } catch (err) {
    console.error(err.stack);
    throw err;
  }
};

export const AddEditCard = async (event, currEmployee, mode, id) => {
  const getUUID = await getrandomUUID();
  try {
    event.preventDefault();

    const parentContainer = document.querySelector("#app__add__employee");
    parentContainer.querySelectorAll("span.error").forEach((e) => e.remove());

    const newEmployee = {
      ...currEmployee,
      id: mode === "add" ? getUUID() : id,
    };

    const isValid = validate(currEmployee);

    if (isValid instanceof Error) {
      throw new Error(isValid.stack);
    } else if (Object.keys(isValid).length > 0) {
      renderError(isValid);
      return false;
    } else if (
      Object.keys(currEmployee).length > 0 &&
      Object.keys(isValid).length === 0
    ) {
      if (mode === "add") {
        employeeHandler.data.unshift(newEmployee);
      } else {
        employeeHandler.data = employeeHandler.data.map((item) =>
          item.id === newEmployee.id ? newEmployee : item
        );
      }
      employeeHandler.renderGrid();
    }

    employeeHandler.currEmployee = {};
    event.target.reset();
    return true; 
  } catch (err) {
    console.error(err.stack);
    return false; 
  }
};

export const handleInput = (event) => {
  employeeHandler.currEmployee[event.target.name] = event.target.value;
};

export const getFilterItems = (searchQuery) => {
  const nItems = Number.parseInt(document.getElementById("pageIndex")?.value);
  if (!searchQuery) return employeeHandler.data.slice(0, nItems);
  return employeeHandler.data.filter((item)=>{
    const {email, firstName, lastName} = item;
    
    const processedEmail = email.trim().split(" ").join("").toLowerCase(); 
    const processedName = (firstName + lastName).trim().split(" ").join("").toLowerCase(); 
    const processedQuery = searchQuery.trim().split(" ").join("").toLowerCase(); 

    return processedEmail.includes(processedQuery) || processedName.includes(processedQuery); 
  }).slice(0, nItems); 
};

export const Search = (event) => {
  return setTimeout(() => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredItems = getFilterItems(searchQuery);
    const gridContainer = document.getElementById("app__employee__grid");
    if (!gridContainer)
      throw new Error("Missing DOM node #app__employee__grid");
    gridContainer.innerHTML = ""; 
    filteredItems.forEach((item) => {
      const gridItem = employeeHandler.getGridItem(item);
      gridContainer.appendChild(gridItem);
    });
  }, 500);
};

export const Filter = (event, filterData)=>{
  const gridContainer = document.getElementById("app__employee__grid");
    if (!gridContainer)
      throw new Error("Missing DOM node #app__employee__grid");
    gridContainer.innerHTML = ""; 
    filterData.forEach((item) => {
      const gridItem = employeeHandler.getGridItem(item);
      gridContainer.appendChild(gridItem);
    });
}

export const validate = (currEmployee) => {
  try {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gim;

    if (!currEmployee.firstName) {
      errors.firstName = "first Name is a required field";
    } else if (currEmployee.firstName.length < 5) {
      errors.firstName = "first Name should be at least 5 characters long";
    }
    if (!currEmployee.lastName) {
      errors.lastName = "last Name is a required field";
    } else if (currEmployee.lastName.length < 5) {
      errors.lastName = "last Name should be at least 5 characters long";
    }
    if (!currEmployee.email) {
      errors.email = "Email is a required field";
    } else if (!emailPattern.test(currEmployee.email)) {
      errors.email = "Invalid email";
    }
    if (!currEmployee.department) {
      errors.department = "Department is a required field";
    } else if (!DEPARTMENTS.includes(currEmployee.department)) {
      errors.department = "Invalid department";
    }
    if (!currEmployee.role) {
      errors.role = "Role is a required field";
    } else if (!ROLES.includes(currEmployee.role)) {
      errors.role = "Invalid role";
    }

    return errors;
  } catch (err) {
    console.error(err.stack);
    return err;
  }
};
