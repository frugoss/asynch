"use strict";
async function getData(url) {
    const response = await fetch(url);
    return response.json();
}
async function fetchy() {
    const users = await getData("http://localhost:3000/users");
    const company = await getData("http://localhost:3000/companies");
    for (let i = 0; i < company.length; i++) {
        let check = company[i].uri;
        company[i].users = [];
        company[i].usersLength = [];
        for (let j = 0; j < users.length; j++) {
            if (check === users[j].uris.company) {
                company[i].users.push(users[j]);
            }
        }
        company[i].usersLength = company[i].users.length;
    }
    company.sort(compareValues('usersLength'));
    company.forEach(function (el, i) {
        const row = document.createElement('tr');
        let tdContent = ` 
        <td>
            ${el.name}
        </td>
        
       
        <td>
            ${el.usersLength}
        </td>`;
        if (el.usersLength > 0) {
            let bttn = `<td id="user-${i}"><button class="btn btn-secondary btn-sm" type="button" data-toggle="collapse" data-target="#user${i}" aria-expanded="false" aria-controls="user${i}"> Expand the list of users </button></td>`;
            row.innerHTML = tdContent + bttn;
        }
        else {
            row.innerHTML = tdContent;
        }
        document.querySelector('tbody').appendChild(row);
        for (let j = 0; j < el.usersLength; j++) {
            document.getElementById(`user-${i}`).innerHTML += `
            <div class="collapse" id="user${i}"> 
                <div class="card card-body"> Name: ${el.users[j].name} <br></br> E-mail: ${el.users[j].email}</div>
            </div>`;
        }
    });
}
function compareValues(key) {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        const varA = a[key];
        const varB = b[key];
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        }
        else if (varA < varB) {
            comparison = -1;
        }
        return (comparison);
    };
}
fetchy();
//# sourceMappingURL=script.js.map