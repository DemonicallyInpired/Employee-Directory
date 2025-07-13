<#assign pages=employees?chunk(5) />
<#assign currentPage= 0 />
<div id="app__employee__grid">
    <#list pages[currentPage] as employee>
        <div class="app__grid__item">
            <b><div>${employee.firstName + " " + employee.lastName}</div></b>
            
            <div><span><b>Email: </b></span><span>${employee.email}</span></div>
            <div><span><b>Department: </b><span></span>${employee.department}</span></div>
            <div><span><b>Role: </b><span></span>${employee.role}</span></div>
            <div class="action">
                <button type="button" class="edit-btn">Edit</button>
                <button type="button" class="delete-btn">Delete</button>
            </div>
        </div>

    </#list>
</div>