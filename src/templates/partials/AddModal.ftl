<#assign roles=["manager", "developer", "analyst"] />
<#assign departments=["HR", "IT", "Finance"] />
<div id="modalOverlay" class="modal-overlay" style="display:none;">

</div>
<form style="display:none;" id="app__add__employee">
    <h1>Add Employee</h1>
    <label for="modalfirstName">
        <div>
        First name
        
        </div>
        <input type="text" name="firstName" id="modalfirstName" />
    </label>
    <label for="modallastName">
        <div>
            Last name
        </div>
        <input type="text" name="lastName" id="modallastName" />
    </label>
    <div class="emailContainer">
        <label for="modalemail">
            <div>
            Email
            
            </div>
            <input type="email" name="email" id="modalemail" />
        </label>
        <label for="modaldepartment">
            <div>
                Department
            </div>
            <select id="modaldepartment" name="department">
                <#list departments as department>
                    <option value=${department}>
                        ${department}
                    </option>
                </#list>
            </select>
        </label>
    </div>
    <label for="modalrole">
            <div>
                Role
            </div>
            <select id="modalrole" name="role">
                <option value="" disabled hidden></option>
                <#list roles as role>
                    <option value=${role}>
                        ${role}
                    </option>
                </#list>
            </select>
        </label>
        <div class="modalAction">
            <button type="button" id="close-btn">Cancel</button>
            <button type="submit">Add</button>
        </div>
</form>