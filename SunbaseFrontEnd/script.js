



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

     function getRow(ele, tbody) {
        console.log(ele.customerId);
    
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
    
    function toggleEdit(customerId) {
        const editIcon = document.querySelector(`#tbody tr[id="${customerId}"] .fa-edit`);
        const submitButton = document.querySelector(`#tbody tr[id="${customerId}"] .rsbt`);
        const editableCells = document.querySelectorAll(`#tbody tr[id="${customerId}"] td`);
    
        if (editIcon && submitButton) {
            editIcon.style.display = 'none';
            submitButton.style.display = 'inline-block';
            editableCells.forEach(cell => {
                cell.setAttribute('contenteditable', 'true');
            });
        }
    
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
    }
    
    function submitRow(customerId) {
        const editIcon = document.querySelector(`#tbody tr[id="${customerId}"] .fa-edit`);
        const submitButton = document.querySelector(`#tbody tr[id="${customerId}"] .rsbt`);
        const editableCells = document.querySelectorAll(`#tbody tr[id="${customerId}"] td`);
    
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
            "firstName": rowData[0],
            "lastName": rowData[1],
            "address": rowData[2],
            "city": rowData[3],
            "state": rowData[4],
            "email": rowData[5],
            "phone": rowData[6]
        };
        console.log('Data from row:', rowData);
        console.log("user data", user);

        const rowToRemove = document.querySelector(`#tbody tr[id="${customerId.id}"]`);
        if (rowToRemove) {
            rowToRemove.remove();
            console.log('Row removed from the table.');
        } else {
            console.log('Row not found.');
        }

        addUser(user);

    }
    

     async function removeRow(customerId)
     {
        console.log(customerId);
    const token=sessionStorage.getItem("token");
  
    try {
        const res= await fetch(`http://localhost:8080/customer/deleteByID/${customerId.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        alert("Deleted Successfully");
        const row = document.getElementById(customerId);
        row.parentNode.removeChild(row);

    } catch (error) {
        console.log("error occured")
        alert(error);
    }
}


// customer add script functions


submittedForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let user = {
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
    addUser(user);
    submittedForm.reset();
    closeBtn.click();

});


async function addUser(user) {
    try {
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
       
        alert("customer added successfully")

    } catch (error) {
        alert("Updated User");
    }

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

syncButton.addEventListener("click" , getToken)

async function getToken() {
    try {

        const token = sessionStorage.getItem("token");

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

        console.log(resp);

        const  jwt = await resp.json();

        console.log(jwt.accessToken);
        sessionStorage.setItem("data", jwt.accessToken);
        getCustomerList(jwt);
        return jwt;
    } catch (error) {
        console.error('Error:', error);

    }
}


async function getCustomerList(data) {


    try {
        const res = await fetch(`http://localhost:8080/sunbase/customer-list`, {
            method: "GET",
            headers: {
                "Authorization": `${sessionStorage.getItem("data")}`,
                'Content-Type': 'application/json'
            },
        });

        const resData = await res.json();

        let arr = Object.keys(resData).map(key => resData[key]);
        arr.forEach(async (ele) => {
            let user = {
                "firstName": ele.first_name,
                "lastName": ele.last_name,
                "street": ele.street,
                "address": ele.address,
                "city": ele.city,
                "state": ele.state,
                "email": ele.email,
                "phone": ele.phone
            };



             
        });

    } catch (error) {
        console.log(error);
    }
}





    


