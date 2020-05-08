function clearExpenseFormDetails(){
    expenseCategory_DOM.value = "general";
    expenseSource_DOM.value = "";
    expenseAmount_DOM.value = "";
    expenseSource_DOM.setAttribute("placeholder","Source");
    expenseAmount_DOM.setAttribute("placeholder","Amount");
}

function validateExpenseForm(expenseSource,expenseAmount){
    let isValidated = true;
    
    if(expenseSource.length < 1 || expenseSource.length > 25){
        expenseSource_DOM.value = "";
        expenseSource_DOM.setAttribute("placeholder","Shud not be empty or > than 25");
        isValidated = false;
    }
    
    if(isNaN(expenseAmount) || expenseAmount === 0){
        expenseAmount_DOM.value = "";
        expenseAmount_DOM.setAttribute("placeholder","Shud be a number & > 0");
        isValidated = false;
    }
    return isValidated
}

function getExpenseData(){
    let expenseArr = localStorage.getItem("expenseArr");
    if(expenseArr){
        expenseArr = JSON.parse(expenseArr);
    } else {
        expenseArr = [];
    }
    return expenseArr;
}

function saveExpenseData(expenseArr,posForBalance){
    localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
    balance = +balance - +expenseArr[posForBalance].amount;
    localStorage.setItem("balance",balance);
}

function printExpenseTable(){
    expenseTbody_DOM.innerHTML = "";
    let expenseArr = getExpenseData();
    expenseArr.forEach(expenseObj => {
        createExpenseTableRow(expenseObj)
    })
}

function createExpenseTableRow(expenseObj){
    let id = "";
    let tr = document.createElement("tr");
    for(let key in expenseObj){
       if(key === "id") {
           id = expenseObj[key]
           continue;
       }
       let td = document.createElement("td");
       if(key === "date"){
        let dateTime = new Date(expenseObj[key]).toString().split(" ");
        td.textContent = `${dateTime[2]}-${dateTime[1]}-${dateTime[3]}`;
       } else {
        td.textContent = expenseObj[key];
       }
       tr.append(td);
    }

    //Creating edit and delete 
    //creating edit
    let editTd = document.createElement("td");
    editTd.innerHTML = `<i class="fas fa-edit"></i>`;
    editTd.classList.add("edit-expense");
    tr.append(editTd);

    let deleteTd = document.createElement("td");
    deleteTd.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteTd.classList.add("delete-expense");
    tr.append(deleteTd);

    tr.setAttribute("id",id);
    expenseTbody_DOM.append(tr);
}

function handleEditClicksOnExpenseTable(event){
    let element = event.target.closest(".edit-expense");
    if(!element) return;
    expense_id = element.parentElement.getAttribute("id");
    let expenseArr = getExpenseData();
    let selectedExpenseData = expenseArr.filter(expenseObj => expenseObj.id === expense_id);
    expenseCategory_DOM.value = selectedExpenseData[0].category;
    expenseSource_DOM.value = selectedExpenseData[0].source;
    expenseAmount_DOM.value = selectedExpenseData[0].amount;
    expenseForm_DOM.setAttribute("data-id",expense_id);
    expenseButton.value = "Update";
    expenseButton.classList.remove("save-expense");
    expenseButton.classList.add("update-expense");
}

function handleClickOnUpdateExpenseButton(event){
    if(!event.target.classList.contains("update-expense")) return;
    let updatedAmount = +expenseAmount_DOM.value;
    let expenseArr = getExpenseData();
    let index = expenseArr.findIndex(expense => expense.id === expense_id);
    let originalAmount = +expenseArr[index].amount;
    let balance = +localStorage.getItem("balance");
    if(balance + originalAmount - updatedAmount < 0){
        const shouldUpdate = confirm("Balance would be negative. Please confirm the update");
        if(shouldUpdate){
            balance = balance + originalAmount - updatedAmount;
            expenseArr[index].amount = updatedAmount; 
            localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
            localStorage.setItem("balance",balance);
            expense_id = ""
            expenseCategory_DOM.value = "general";
            expenseSource_DOM.value = "";
            expenseAmount_DOM.value = "";
            expenseForm_DOM.setAttribute("data-id","");
            expenseButton.value = "Save";
            expenseButton.classList.remove("update-expense");
            expenseButton.classList.add("save-expense");
            printExpenseTable()

        }else{
            expense_id = ""
            expenseCategory_DOM.value = "general";
            expenseSource_DOM.value = "";
            expenseAmount_DOM.value = "";
            expenseForm_DOM.setAttribute("data-id","");
            expenseButton.value = "Save";
            expenseButton.classList.remove("update-expense");
            expenseButton.classList.add("save-expense");
        }
    } else {
        balance = balance + originalAmount - updatedAmount;
        expenseArr[index].amount = updatedAmount; 
        localStorage.setItem("expenseArr",JSON.stringify(expenseArr));
        localStorage.setItem("balance",balance);
        let expenseAmountVal = expenseArr.reduce((totalAmount,expenseObj) => totalAmount + expenseObj.amount,0);
        expense_id = ""
        expenseCategory_DOM.value = "general";
        expenseSource_DOM.value = "";
        expenseAmount_DOM.value = "";
        expenseForm_DOM.setAttribute("data-id","");
        expenseButton.value = "Save";
        expenseButton.classList.remove("update-expense");
        expenseButton.classList.add("save-expense");
        printExpenseTable()
    }
    printExpenseTable()
    balance_DOM.textContent = "";
    balance_DOM.textContent =  localStorage.getItem("balance") ? `Balance : Rs ${localStorage.getItem("balance")}` :`Balance : Rs 0`;
}

function handleClickOnDeleteExpenseButton(event){
    if(!event.target.closest(".delete-expense"))return;
    let element = event.target.closest(".delete-expense");
    let getId = element.parentElement.getAttribute("id");
    let expenseArr = getExpenseData();
    let expenseIndex = expenseArr.findIndex(expense => expense.id === getId);
    let expenseObjToBeDeleted = expenseArr[expenseIndex];

    expenseArr = expenseArr.filter(expense => expense.id !== getId);
    let balance = +localStorage.getItem("balance");
    balance = balance + expenseObjToBeDeleted.amount;
    localStorage.setItem("balance",balance); 
    localStorage.setItem("expenseArr",expenseArr);
    printExpenseTable();
    balance_DOM.textContent = "";
    balance_DOM.textContent =  localStorage.getItem("balance") ? `Balance : Rs ${localStorage.getItem("balance")}` :`Balance : Rs 0`;
}