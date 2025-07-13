<form style="display:none;" id="app__filterForm">
    <h1>Filter Employees</h1>
    <label for="FirstNameFilter">
        <div>FirstName</div>
        <input type="text" name="firstName" id="firstNameFilter" />
    </label>
    <label for="DepartmentFilter">
        <div>Department</div>
        <input type="text" name="department" id="DepartmentFilter" />
    </label>
    <label for="roleFilter">
        <div>Role</div>
        <input type="text" name="role" id="roleFilter" />
    </label>
    <div>
        <button type="submit">Apply</button>
        <button type="button" id="app__reset_filters">Reset</button>
        <button type="button" id="app__filter_close">Close</button>
    </div>
</form>