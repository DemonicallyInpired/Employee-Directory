import fs from "fs";
import employeeHandler from "./src/assets/js/EmployeeModel.js";
import path from "path";
import { fileURLToPath } from "url";
import Freemarker from "freemarker.js";
import {getDirList, isDirectory} from "./utils/helpers.js"
// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Render the template
const render = async(rootDir, renderPath) => {
    const pathList = {path : []}; 
    const dirList = await getDirList(path.resolve(renderPath), pathList); 
    try {
    const data = await employeeHandler.getData(); 
    
    // Freemarker config
    const fm = new Freemarker({
      viewRoot: path.resolve(__dirname, `${renderPath}`),
    });
    if (!(dirList?.path instanceof Array)) {
      throw new Error(`please provide a valid pathlist`);
    }
    dirList?.path.map((item, index) => {
      const filePath = path.relative(renderPath, item); 
      const dirname = path.dirname(path.join(__dirname, `${rootDir}/${filePath}`));                 
      if(dirname.includes("partials")){
        return; 
      }
      const isDir = isDirectory(dirname).then((val)=>{
        if(!(val instanceof Error) && !val){
            fs.mkdirSync(dirname); 
        }
      });
      fm.render(filePath, { employees: data }, (err, html) => {
        if (err) {
          console.error(err.stack);
          return null;
        }
        fs.writeFileSync(path.join(__dirname, rootDir, filePath).replace(".ftl", ".html"), html); 
      });
    });
  } catch (err) {
    console.error(err.stack);
    return null;
  }
};
render("./dist", "./src/templates"); 