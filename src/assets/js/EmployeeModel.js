import {
  SORTBYROLE,
  PAGINATION,
  OPENMODAL,
  CLOSEMODAL,
  ADD_EMPLOYEE,
  HANDLEINPUT,
  HANDLESEARCH,
  HANDLEFILTER, 
  HANDLEFILTERCLOSE, 
  HANDLEFILTEROPEN, 
  HANDLEFILTERRESET, 
  HANDLEFILTERINPUT
} from "../../constants/constants.js";
import {
  handleModal,
  AddEditCard,
  handleInput,
  Search,
  editCard,
  Filter,
} from "./Ops.js";

export const getrandomUUID = async () => {
  if (typeof window === "undefined") {
    const { randomUUID } = await import("crypto");
    return () => randomUUID();
  } else {
    return () => window.crypto.randomUUID();
  }
};

class HandlEmployeeModel {
  constructor() {
    this.data = [];
    this.unsubscribe = null;
    this.currEmployee = {};
    this.timerRef = null;
    this.currMode = "add"; 
    this.currId = null; 
    this.filterData = {}; 
  }

  async getData() {
    const randomUUID = await getrandomUUID();
    try {
      if (this.data.length !== 0) return this.data;
      if (typeof window !== "undefined") {
        const res = await fetch("/data/employee.json");
        if (!res.ok) throw new Error("failed to load employee.json");
        const parsedData = await res.json(); 
        this.data = await parsedData?.map((item)=>({...item, id : randomUUID()}));
        return this.data;
      }
      const { readFile } = await import("fs/promises");
      const path = (await import("path")).default;
      const { fileURLToPath } = await import("url");
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const dataPath = path.resolve(__dirname, "../../data/employee.json");
      const rawFile = await readFile(dataPath, "utf8");
      const parsedData = JSON.parse(rawFile);
      return parsedData; 
    } catch (err) {
      console.error(err.stack);
      return []; 
    }
  }

  async openModal(event) {
    try {
      handleModal(event, "open", this.currMode);
    } catch (err) {
      console.error(err.stack);
    }
  }

  async closeModal(event) {
    try {
      handleModal(event, "close", this.currMode);
    } catch (err) {
      console.error(err.stack);
    }
  }

  async handleInput(event) {
    try {
      handleInput(event);
    } catch (err) {
      console.error(err.stack);
    }
  }

  async addEditEmployee(event) {
    try {
      const done = await AddEditCard(event, this.currEmployee, this.currMode, this.currId);
      this.currMode = "add"; 
      this.currId = null; 
      if(done){
        this.closeModal(event); 
      }
    } catch (err) {
      console.error(err.stack);
    }
  }

  async Search(event) {
    try {
      if (this.timerRef) clearTimeout(this.timerRef);
      this.timerRef = Search(event);
    } catch (err) {
      console.error(err.stack);
    }
  }

  async handleDelete(event, id) {
    try {
      this.data = this.data.filter((item) => item.id !== id);
      await this.renderGrid();
    } catch (err) {
      console.error(err.stack);
    }
  }
  async editEmployee(event, id = null) {
    console.log("id is ", id); 
    try {
      if (!id) {
        throw new Error(
          "unspecified edit operation pleaase make sure the record exists."
        );
      }
      await editCard(event, id);
    } catch (err) {
      console.error(err.stack);
      return null;
    }
  }
  getGridItem(item) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("app__grid__item");
    gridItem.innerHTML = `
      <b><div>${item.firstName + " " + item.lastName}</div></b>
      <div><span><b>Email: </b></span><span>${item.email}</span></div>
      <div><span><b>Department: </b></span><span>${item.department}</span></div>
      <div><span><b>Role: </b></span><span>${item.role}</span></div>
      <div class="action">
        <button type="button" class="edit-btn">Edit</button>
        <button type="button" class="delete-btn">Delete</button>
      </div>
    `;
    const [editBtn, deleteBtn] = [
      gridItem.querySelector(".edit-btn"),
      gridItem.querySelector(".delete-btn"),
    ];
    editBtn.addEventListener("click", (event) => {
      this.editEmployee(event, item.id);
    });
    deleteBtn.addEventListener("click", (event) => {
      this.handleDelete(event, item.id);
    });

    return gridItem;
  }

  async renderGrid(nItems = 10) {
    const gridContainer = document.getElementById("app__employee__grid");
    if (!gridContainer)
      throw new Error("Missing DOM node #app__employee__grid");

    gridContainer.innerHTML = "";

    this.data.slice(0, nItems).forEach((item) => {
      const gridItem = this.getGridItem(item);
      gridContainer.appendChild(gridItem);
    });
  }

  async handleSort(event) {
    const field = event.target.value;
    this.data.sort((a, b) => (a[field] || "").localeCompare(b[field] || ""));
    const nItems = parseInt(document.getElementById("pageIndex")?.value) || 10;
    await this.renderGrid(nItems);
  }

  async handlePagination(event) {
    try {
      const val = parseInt(event.target.value);
      await this.renderGrid(val);
    } catch (err) {
      console.error(err.stack);
    }
  }
  async attchInitialListeners() {
    const actionsNode = document.querySelectorAll(".action"); 
    console.assert(actionsNode.length === this.data.length); 
    for(let i = 0; i < this.data.length; i++){
      const editBtn = actionsNode[i].querySelector(".edit-btn"); 
      const deleteBtn = actionsNode[i].querySelector(".delete-btn"); 

      editBtn.addEventListener("click", (event)=>{
        this.editEmployee(event, this.data[i].id); 
      }); 

      deleteBtn.addEventListener("click", (event)=>{
        this.handleDelete(event, this.data[i].id); 
      })
    }
  }
  async FilterOpen(){
    const filterForm = document.querySelector("#app__filterForm"); 
    filterForm.style.display = "flex";
  }
  async FilterClose(){
    const filterForm = document.querySelector("#app__filterForm"); 
    filterForm.style.display = "none";     
  }
  async FilterReset(event){
    const formElemenets = document.querySelector("#app__filterForm"); 
    Filter(event, this.data); 
    formElemenets.reset();
    this.FilterClose();  
  }
  filterChange(event){
    this.filterData[event.target.name] = event.target.value; 
  }
  async handleFilter(event){
    event.preventDefault(); 
    const availKeys = Object.keys(this.filterData); 
    console.log(availKeys, "keys"); 
    if(availKeys.length === 0){
      return [];  
    }

    const filteredData = this.data.filter((item, index)=>{
      return availKeys.every((key, index)=>{
        const e1 = this.filterData[key]; 
        const e2 = item[key]; 
        console.log(e1, e2); 

        if(!(e1 && e2)){
          return false; 
        }
        return e1.trim().split(" ").join("").toLowerCase() === e2.trim().split(" ").join("").toLowerCase(); 
      }); 
    }); 
    Filter(event, filteredData); 
  }
  async init() {
    const data = await this.getData();
    await this.attchInitialListeners(); 
    this.data = data; 
    const elements = {
      [SORTBYROLE]: {
        listener: this.handleSort,
        element: document.getElementById("sort"),
        type: "change",
      },
      [PAGINATION]: {
        listener: this.handlePagination,
        element: document.getElementById("pageIndex"),
        type: "change",
      },
      [OPENMODAL]: {
        listener: this.openModal,
        element: document.getElementById("toggle-btn"),
        type: "click",
      },
      [CLOSEMODAL]: {
        listener: this.closeModal,
        element: document.getElementById("close-btn"),
        type: "click",
      },
      [ADD_EMPLOYEE]: {
        listener: this.addEditEmployee,
        element: document.getElementById("app__add__employee"),
        type: "submit",
      },
      [HANDLEINPUT]: {
        listener: this.handleInput,
        element: document.getElementById("app__add__employee"),
        type: "change",
      },
      [HANDLESEARCH]: {
        listener: this.Search,
        element: document.getElementById("app__search"),
        type: "input",
      },
      [HANDLEFILTER] : {
        listener : this.handleFilter, 
        element : document.getElementById("app__filterForm"), 
        type : "submit"
      }, 
      [HANDLEFILTERINPUT] : {
        listener : this.filterChange, 
        element : document.getElementById("app__filterForm"), 
        type : "change", 
      }, 
      [HANDLEFILTEROPEN] : {
        listener : this.FilterOpen, 
        element : document.getElementById("app__filter_open"), 
        type : "click", 
      }, 
      [HANDLEFILTERCLOSE] : {
        listener : this.FilterClose, 
        element : document.getElementById("app__filter_close"), 
        type : "click", 
      },
      [HANDLEFILTERRESET] : {
        listener : this.FilterReset, 
        element : document.getElementById("app__reset_filters"), 
        type : "click"
      } 
    };

    Object.values(elements).forEach((val) => {
      val.boundListener = val.listener.bind(this);
      val.element.addEventListener(val.type, val.boundListener);
    });

    return (key = undefined) => {
      const keys = Object.keys(elements);
      if (!key) {
        keys.forEach((k) => {
          const { element, type, boundListener } = elements[k];
          element.removeEventListener(type, boundListener);
        });
        return;
      }
      if (!keys.includes(key)) {
        throw new Error(`Invalid key. Use one of: ${keys.join(", ")}`);
      }
      const { element, type, boundListener } = elements[key];
      element.removeEventListener(type, boundListener);
    };
  }
}

const employeeHandler = new HandlEmployeeModel();
export default employeeHandler;
