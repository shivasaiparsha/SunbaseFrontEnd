



const loginForm = document.querySelector('#submit-btn');
const loginContainer=document.querySelector(".login-container");
loginForm.addEventListener('click', authenticate)

const cutomerListScreen = document.querySelector('.cutomerList-container');

const openRegForm=document.querySelector('.Customer_form');
const addCustomer=document.querySelector(".add-customer-btn");
const closeBtn=document.querySelector(".close-btn");
const submittedForm=document.getElementById("mern")

addCustomer.addEventListener("click", openRegistrationForm);



async function authenticate(evenDetails){
  
  evenDetails.preventDefault();

    let username=document.getElementById("uname").value;
    let password=document.getElementById("pass").value;
    
    if(username.match('test@sunbasedata.com'))
    {
        getToken();
    }
    else {
        
       login(username, password);
    }

}



 async function login(username, password)
 {
     
   
  
        try{
            
            if(!sessionStorage.getItem("token"))
            {
                    const res=await fetch(`http://localhost:8080/auth/login`,{
                        method: "POST",
                    
                        headers: {
                            'Content-Type': 'application/json'
        
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                          })
                       })

                    const data=await res.json();
                    sessionStorage.setItem("token", data.accessToken);
                
            }

            
                loginContainer.style.display = "none";
                    getDataFromDatabse();  
                cutomerListScreen.style.display="block";
                
        }
        catch(err){
            console.log(username,password);
            alert("something went wrong");
            // console.log(err);
        }
 }


//  registraion function data

function openRegistrationForm(evenDetails){
     evenDetails.preventDefault();
     openRegForm.style.display="flex"

}



closeBtn.addEventListener('click', () => {
    openRegForm.style.display = "none";
 
    });



async  function getDataFromDatabse(){
     
    
    let token=sessionStorage.getItem("token");
      
     try{

        
       
        const res = await fetch(`http://localhost:8080/customer/getAllCustoemrs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        let data = await res.json();

        data = Object.keys(data).map(key => data[key]);

        const tbody = document.getElementById("tbody");
        tbody.innerHTML = "";
        data.forEach(ele => {
            getRow(ele, tbody);
        });

        
         
     }
     catch(err){
           
        alert(err)
     }

 }

 

 function toggleEdit(customerId) {


    const editIcon = document.querySelector(`#tbody tr[id="${customerId}"] .fa-edit`);
    const submitButton = document.querySelector(`#tbody tr[id="${customerId}"] .rsbt`);
    const editableCells = document.querySelectorAll(`#tbody tr[id="${customerId}"] td`);
    const table = document.getElementsByTagName('table')[0];
    
    // Create a new row to contain the cloned editable cells
    let clonedRow = document.createElement('tr');
    clonedRow.classList.add('selected-row');
    
    // Clone each editable cell and append it to the cloned row
    editableCells.forEach(cell => {
        const clonedCell = cell.cloneNode(true);
        clonedRow.appendChild(clonedCell);
    });
    
    let Icon = clonedRow.querySelector('.fa.fa-edit');
    let submitOfClonedRow = clonedRow.querySelector('.rsbt');
    
    // Append the cloned row outside the table
    if (Icon && submitOfClonedRow) {
        Icon.style.display = 'none';
        submitOfClonedRow.style.display = 'inline-block';
        clonedRow.querySelectorAll('td').forEach(cell => {
            cell.setAttribute('contenteditable', 'true');
        });
    }
   
    document.body.appendChild(clonedRow);

    // Blur the table
    table.classList.add('blur');

    
    alert("Edit details by clicking on the field you want to modify.");

    // Make other rows non-editable
    const allRows = document.querySelectorAll('tbody tr');
    allRows.forEach(row => {
        if (row.id !== customerId) {
            const nonEditableCells = row.querySelectorAll('td');
            nonEditableCells.forEach(cell => {
                cell.setAttribute('contenteditable', 'false');
            });
        }
    });

//     document.body.addEventListener('click', handleBodyClick);

// function handleBodyClick(event) {
//     // Check if the click occurred outside of the cloned row
//     if (!event.target.closest('.selected-row')) {
//         // Remove the cloned row
//         console.log(event.target)
//         clonedRow.remove();

//         // Show the original row
//         editableCells.forEach(cell => {
//             cell.style.display = '';
//         });

//         // Remove the blur effect from the table
//         table.classList.remove('blur');

//         // Remove event listener from the body
//         document.body.removeEventListener('click', handleBodyClick);
//     }
//  }

}
   







function submitRow(customerId) {
    const editIcon = document.querySelector(`#tbody tr[id="${customerId}"] .fa-edit`);
    const submitButton = document.querySelector(`#tbody tr[id="${customerId}"] .rsbt`);
    const editableCells = document.querySelectorAll(`#tbody tr[id="${customerId}"] td`);
    const table = document.getElementsByTagName('table')[0];
    
    const clonerow=document.querySelector('.selected-row')
    console.log(clonerow);
    

    let Icon = clonerow.querySelector('.fa.fa-edit');
    let submitOfClonedRow = clonerow.querySelector('.rsbt');
     
    if(Icon&&submitOfClonedRow)
    {
        clonerow.remove();
        clonerow.querySelectorAll('td').forEach(cell => {
            cell.style.display = '';
        });

      

        table.classList.remove('blur');
    }
    
    if (editIcon && submitButton) {
        editIcon.style.display = 'inline-block'; // Show the edit icon
        submitButton.style.display = 'none'; // Hide the submit button
        
        editableCells.forEach(cell => {
            cell.setAttribute('contenteditable', 'false'); // Make the cells non-editable
        });
    }

    let rowData = Array.from(editableCells).map(cell => cell.textContent);
    rowData.length=7;
    let user = {
        "customerId":customerId,
        "firstName": rowData[0],
        "lastName": rowData[1],
        "address": rowData[2],
        "city": rowData[3],
        "state": rowData[4],
        "email": rowData[5],
        "phone": rowData[6]
    };
   

   

    const rowToRemove = document.querySelector(`#tbody tr[id="${customerId}"]`);
    console.log(rowToRemove, customerId);
    // if (rowToRemove) {
    //     rowToRemove.remove();
    //     console.log('Row removed from the table.');
    // } else {
    //     console.log('Row not found.');
    // }
     
    rowToRemove.remove();
      
    addCustomerToDb(user);
    

}




 async function removeRow(customerId)
 {
    
const token=sessionStorage.getItem("token");
    
try {
    const res= await fetch(`http://localhost:8080/customer/deleteByID/${customerId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

   
    const row = document.getElementById(customerId);
    row.parentNode.removeChild(row);
    alert("Deleted Successfully");

} catch (error) {
    console.log("error occured")
    alert(error);
}
}


// customer add script functions


submittedForm.addEventListener('submit', (e) => {
e.preventDefault();

let user = {
    "customerId":"null",
    "firstName": e.target.first.value,
    "lastName": e.target.last.value,
    "street": e.target.street.value,
    "address": e.target.address.value,
    "city": e.target.city.value,
    "state": e.target.state.value,
    "email": e.target.email.value,
    "phone": e.target.phone.value
};



//I'll have to sent the Post Request... here we go...
addCustomerToDb(user);
submittedForm.reset();
closeBtn.click();

});


async function addCustomerToDb(user) {
try {

    console.log(user);
    const token = sessionStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/customer/AddCustomer`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    const data = await res.json();

    const tbody = document.getElementById("tbody");

    getRow(data, tbody);
   
    alert('successful')

} catch (error) {
    alert(error);
}

}

function getRow(ele, tbody) {


tbody.innerHTML +=
    `<tr id="${ele.customerId}">
    <td>${ele.firstName}</td>
    <td>${ele.lastName}</td>
    <td>${ele.address}</td>
    <td>${ele.city}</td>
    <td>${ele.state}</td>
    <td>${ele.email}</td>
    <td>${ele.phone}</td>
    <td>
        <i class="fa fa-trash" style="margin-inline:15px" onclick='removeRow("${ele.customerId}")'></i>
        <i class="fa fa-edit" onclick='toggleEdit("${ele.customerId}")'></i>
        <button class="rsbt" style="display:none;" onclick='submitRow("${ele.customerId}")'>Submit</button>
    </td>
</tr>`;
}

// get data from datbase when customer click on  search value

const search = document.getElementById("search");
const faSearch = document.querySelector(".fa-search");
let criteria='all'

search.addEventListener(('change'), (e) => {
criteria = e.target.value;

})


faSearch.addEventListener('click', (e) => {

const input = document.getElementById("input")
let value = input.value;

getDataFromDatabseBycriteria(criteria, value.trim());
})


async  function getDataFromDatabseBycriteria(criteria, value){
     
// get token
if(value.length==0||criteria.length==0)
{

     alert("please enter a value")
     getDataFromDatabse();
     return ;
}

  
 try{

    let token=sessionStorage.getItem("token");
   
    const res = await fetch(`http://localhost:8080/customer/findByCriteria/${criteria}/${value}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    let data = await res.json();

    data = Object.keys(data).map(key => data[key]);

    const tbody = document.getElementById("tbody");

    // deleteAllRows(tbody);
    if(data.length==0)
      alert("No User presents")

    tbody.innerHTML = "";
    data.forEach(ele => {
        getRow(ele, tbody);
    });

    
     console.log(tbody);
 }
 catch(err){
       
    alert(err)
 }

}

// delete rows function
function deleteAllRows(tbody) {

const rows = tbody.getElementsByTagName("tr");

// Start from the last row and remove each row
for (let i = rows.length - 1; i >= 0; i--) {
    tbody.removeChild(rows[i]);
}
}

// fecth remote api's 
const syncButton=document.querySelector(".sync")

syncButton.addEventListener("click", function() {
// Check if item is present in session storage
const item = sessionStorage.getItem("data"); 
if (item) {
    // Call getCustomerList with the item from session storage
    getCustomerList(item);
} else {
    // Call getToken API if item is not present in session storage
    getToken();
}
});

async function getToken() {


try {

    const token = sessionStorage.getItem("token");
    if(!sessionStorage.getItem('data')){

    const resp = await fetch(`http://localhost:8080/sunbase/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
              
        },
        body: JSON.stringify({
            "login_id": "test@sunbasedata.com",
            "password": "Test@123"
        })
    });

    const jwt=await resp.json();
    sessionStorage.setItem("data", jwt.accessToken);
  
}

    

   const  jwt = sessionStorage.getItem("data");

    
   
    getCustomerList(jwt);
    return jwt;
} catch (error) {
    console.error('Error:', error);

}
}




async function getCustomerList(jwt) {

alert("Wait!! It takes some time to reload the data");
try {
    const res = await fetch(`http://localhost:8080/sunbase/customer-list`, {
        method: "GET",
        headers: {
            "Authorization": `${jwt}`,
            'Content-Type': 'application/json'
        },
    });

    const resData = await res.json();

    let arr = Object.keys(resData).map(key => resData[key]);
    arr.forEach(async (ele) => {
        let user = {
            "customerId":ele.uuid,
            "firstName": ele.first_name,
            "lastName": ele.last_name,
            "street": ele.street,
            "address": ele.address,
            "city": ele.city,
            "state": ele.state,
            "email": ele.email,
            "phone": ele.phone
        };        

        addCustomerToDb(user);
    });

   

} catch (error) {
    console.log(error);
}
}








