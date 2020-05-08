function clearIncomeFormDetails(){
    incomeCategory_DOM.value = "salary";
    incomeSource_DOM.value = "";
    incomeAmount_DOM.value = "";
    incomeSource_DOM.setAttribute("placeholder","Source");
    incomeAmount_DOM.setAttribute("placeholder","Amount");
}

function createIncomeTableRow(incomeObj){
    let id = "";
    let tr = document.createElement("tr");
    for(let key in incomeObj){
       if(key === "id") {
           id = incomeObj[key]
           continue;
       }
       let td = document.createElement("td");
       if(key === "date"){
        let dateTime = new Date(incomeObj[key]).toString().split(" ");
        td.textContent = `${dateTime[2]}-${dateTime[1]}-${dateTime[3]}`;
       } else {
        td.textContent = incomeObj[key];
       }
       tr.append(td);
    }

    //Creating edit and delete 
    //creating edit
    let editTd = document.createElement("td");
    editTd.innerHTML = `<i class="fas fa-edit"></i>`;
    editTd.classList.add("edit-income");
    tr.append(editTd);

    let deleteTd = document.createElement("td");
    deleteTd.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteTd.classList.add("delete-income");
    tr.append(deleteTd);

    tr.setAttribute("id",id);
    incomeTbody_DOM.append(tr);
}

function printIncomeTable(){
    incomeTbody_DOM.innerHTML = "";
    let incomeArr = getIncomeData();
    incomeArr.forEach(incomeObj => {
        createIncomeTableRow(incomeObj)
    })
}



function handleEditClicksOnIncomeTable(event){
    let element = event.target.closest(".edit-income");
    if(!element) return;
    let incomeId = element.parentElement.getAttribute("id");
    let incomeArr = getIncomeData();
    let selectedIncomeData = incomeArr.filter(incomeObj => incomeObj.id === incomeId);
    incomeCategory_DOM.value = selectedIncomeData[0].category;
    incomeSource_DOM.value = selectedIncomeData[0].source;
    incomeAmount_DOM.value = selectedIncomeData[0].amount;
    incomeForm_DOM.setAttribute("data-id",incomeId);
    incomeButton.value = "Update";
    incomeButton.classList.remove("save-income");
    incomeButton.classList.add("update-income");
}

function handleClickOnUpdateIncomeButton(event){
    if(!event.target.classList.contains("update-income")) return;
    let incomeArr = getIncomeData();
    let indexOfUpdatedIncomeObj = incomeArr.findIndex(incomeObj => incomeObj.id === event.target.parentElement.dataset.id);
    let incomeCategory = incomeCategory_DOM.value;
    let incomeSource = incomeSource_DOM.value;
    let incomeAmount = +incomeAmount_DOM.value;
    let toBeUpdatedIncomeObj = incomeArr[indexOfUpdatedIncomeObj];
    // if(balance - toBeUpdatedIncomeObj.amount + incomeAmount > expenseAmountVal){
        balance = +balance - toBeUpdatedIncomeObj.amount;
        toBeUpdatedIncomeObj.category = incomeCategory;
        toBeUpdatedIncomeObj.source = incomeSource;
        toBeUpdatedIncomeObj.amount = incomeAmount;
        saveIncomeData(incomeArr,indexOfUpdatedIncomeObj);
        clearIncomeFormDetails();
        printIncomeTable();
        balance_DOM.textContent = localStorage.getItem("balance");
        incomeButton.value = "Save";
        incomeButton.classList.remove("update-income");
        incomeButton.classList.add("save-income");
        event.target.parentElement.removeAttribute("data-id");
    // } else {
        //Do error handling
    // }
}

function handleClickOnDeleteIncomeButton(event){
    if(!event.target.closest(".delete-income"))return;
    let idOfIncomeToBeDeleted = event.target.closest(".delete-income").parentElement.getAttribute("id");
    let incomeArr = getIncomeData();
    let indexOfIncomeToBeDeleted = incomeArr.findIndex(incomeObj => incomeObj.id === idOfIncomeToBeDeleted);
    let incomeObjToBeDeleted = incomeArr[indexOfIncomeToBeDeleted];
    // if(balance - incomeObjToBeDeleted.amount < expenseAmountVal ){
    //     let confirmDeletion = confirm(`Do you really want to delete ${incomeObjToBeDeleted.source}. Deleting so will lead to NEGATIVE Balance`);
    //     if(confirmDeletion){
    //         incomeArr = incomeArr.filter(incomeObj => incomeObj.id !== idOfIncomeToBeDeleted);
    //         localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
    //         balance = +balance - incomeObjToBeDeleted.amount;
    //         localStorage.setItem("balance",balance);
    //         incomeAmountVal = incomeArr.reduce((totalAmount,incomeObj) => totalAmount + incomeObj.amount,0);
    //         localStorage.setItem("incomeAmountVal",incomeAmountVal);
    //     }
    // } else {
            incomeArr = incomeArr.filter(incomeObj => incomeObj.id !== idOfIncomeToBeDeleted);
            localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
            balance = +balance - incomeObjToBeDeleted.amount;
            localStorage.setItem("balance",balance);
            incomeAmountVal = incomeArr.reduce((totalAmount,incomeObj) => totalAmount + incomeObj.amount,0);
            localStorage.setItem("incomeAmountVal",incomeAmountVal);
    // }
    printIncomeTable();
    balance_DOM.textContent = "";
    balance_DOM.textContent =  localStorage.getItem("balance") ? `Balance : Rs ${localStorage.getItem("balance")}` :`Balance : Rs 0`;
}