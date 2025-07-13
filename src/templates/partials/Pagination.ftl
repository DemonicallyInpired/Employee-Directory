<#assign pageSize=[10, 20, 30, 40] />
<div id="pagination">
  <div>
    <label for="sort">
      Sort
      <select id="sort">
        <#list employees[0]?keys as key>
          <option value="${key}">
            ${key}
          </option>
        </#list>
      </select>
    </label>
    <label for="pageIndex">
      Show
      <select id="pageIndex">
        <#list pageSize as size>
          <option value="${size}">
            ${size}
          </option>
        </#list>
      </select>
    </label>
  </div>
  <button type="button" id="toggle-btn">Add Employee</button>
</div>