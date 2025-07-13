## 📁 Project Description
The project delves into interfacing with a templating engine and associate way to facilitate its consequent data-binding and usage with javascript and nodejs therefore facilitating its usage over both client and server side interaction. A rough layout of the project can be structure could be described as listed below: 

## 📁 Project Structure

**EmployeeDirectory/**
  - `package.json`
  - `package-lock.json`
  - `render.js`
  - **utils/**
    - `helpers.js`
  - **src/**
    - **assets/**
      - **css/**
        - `AddModal.css`
        - `FilterForm.css`
        - `footer.css`
        - `gird.css`
        - `header.css`
        - `index.css`
        - `pagination.css`
      - **js/**
        - `EmployeeModel.js`
        - `main.js`
        - `Ops.js`
        - `run.js`
    - **constants/**
      - `constants.js`
    - **data/**
      - `employee.json`
    - **templates/**
      - `index.ftl`
      - **partials/**
        - `AddModal.ftl`
        - `FilterForm.ftl`
        - `Footer.ftl`
        - `Grid.ftl`
        - `Header.ftl`
        - `Pagination.ftl`
  - **dist/**

### 📁 Directory and File Descriptions

**Root Directory**
- package.json: Lists project metadata, scripts, and dependencies.
- package-lock.json: Locks dependency versions for consistent installs.
- render.js: Main server-side or rendering logic for the application.
- utils/: Contains utility/helper functions used throughout the project.

**src/ (Source Files)**
- assets/: All static assets for the frontend.
    - css/: Modular CSS files, each targeting a specific UI component or layout section (e.g., header, footer, grid, modal, pagination, etc.).
    - js/: JavaScript files for client-side logic:
        - EmployeeModel.js: Defines the employee data model and related logic.
        - main.js: Entry point for frontend logic.
        - Ops.js: Contains operations or business logic for employee management.
        - run.js: Bootstraps or runs the main application logic.
- constants/: Centralized configuration and constants used across the app.
- data/: Static data files, such as employee.json, used for seeding or as a mock database.
- templates/: Freemarker template files for rendering HTML.
    - index.ftl: Main template file, includes all partials and sets up the page structure.
    - partials/: Reusable template fragments for different UI sections:
        - AddModal.ftl: Modal dialog for adding employees.
        - FilterForm.ftl: Form for filtering employee data.
        - Footer.ftl: Footer section of the page.
        - Grid.ftl: Employee grid/list display.
        - Header.ftl: Header section with title and controls.
        - Pagination.ftl: Pagination controls for navigating employee data.

**dist/ (Distribution/Build Output)**
- Contains compiled, bundled, or production-ready files generated during the build process. This directory is typically ignored by version control.

To put it together, 
- Templates define the structure of the web pages, using Freemarker for dynamic content.
- CSS files style each component for a modular, maintainable UI.
- JavaScript files handle all client-side interactivity, data manipulation, and application logic.
- Constants and data provide configuration and sample data for development and testing.
- Utils offer reusable helper functions.
- dist/ is where your production-ready files are output after building the project.

## Build Instruction
- This project employs the usage of nodejs wrapper around freemarker itself, but since freemarker is inherently a templating engine developed to work with java like Object instance it still require openJDK for the consequent compilation and processing of `.ftl` templates. Consequent the DockerFile specified in the following instructions: 

    - use Node.js as main runtime
    - Install OpenJDK(for freemarker.js to work)
    - Builds the consequent application from the source as specified by the build script. 

a. Build from the docker image
```sh
docker build -t imageTag .
```
b. Run the container

```sh
docker run -p 3000:3000 imageTag
```

c. The compiled file can be accessed within the build i.e. dist/ folder. 

## UI Previews

**HomePage**

![HomePage](/src/assets/images/HomePage.png)

**Search Operation**

![Search](/src/assets/images/Search.png)

**Create User Modal**

![UserModal](/src/assets/images/UserModal.png)

**Form Validations**

![Validation1](/src/assets/images/Validation1.png)

![Validation2](/src/assets/images/Validation2.png)

**Pagination for first 10/40 users**

![Pagination](/src/assets/images/Pagination.png)

**Editing Employee Detail**

![Editing](/src/assets/images/EditUser.png)

**Filter Employee**

![Filter](/src/assets/images/Filter.png)

**Sort Operations**
![Sort](/src/assets/images/Sort.png)

## Reflections and Suggested Improvements

| Challenge                        | What’s Currently Employed                                 | Intended Improvements                                      |
|-----------------------------------|-----------------------------------------------------------|------------------------------------------------------------|
| Manual DOM/state management       | Vanilla JavaScript, direct DOM manipulation               | Use a frontend framework or state management pattern       |
| Freemarker template limitations   | Freemarker for server-side rendering, static partials     | Add client-side rendering or AJAX for partial updates      |
| CSS scalability                  | Modular CSS files per component, no strict methodology    | Adopt a CSS methodology or design system                   |
| Static data handling              | Static JSON file (`employee.json`)                        | Integrate a backend API and persistent storage             |
| Lack of automated testing         | No automated tests or CI/CD pipeline                      | Add unit/integration/E2E tests and CI/CD                   |
| Accessibility gaps                | Basic semantic HTML, no explicit a11y features            | Audit and improve a11y features                            |
| Maintainability as project grows  | Modular file structure, some documentation                | Modularize further, document, and use code quality tools   |