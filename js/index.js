let expenseArr,incomeArr,incomeAmountVal,expenseAmountVal,balance = 0;
let expense_id = "";

const incomeForm_DOM = document.querySelector(".income-form");
const expenseForm_DOM = document.querySelector(".expense-form");

const incomeButton  = document.querySelector(".btn-income");
const updateButton = document.querySelector(".update-income");
const expenseButton = document.querySelector(".btn-expense");
const balance_DOM = document.querySelector(".balance");

const incomeCategory_DOM  = document.querySelector("#income-category")
const incomeSource_DOM = document.querySelector("#income-source");
const incomeAmount_DOM = document.querySelector("#income-amount");
const incomeTbody_DOM = document.querySelector(".income-summary-body");

const expenseCategory_DOM = document.querySelector("#expense-category");
const expenseSource_DOM = document.querySelector("#expense-source");
const expenseAmount_DOM = document.querySelector("#expense-amount");
const expenseTbody_DOM = document.querySelector(".expense-summary-body");

window.addEventListener("load",function(event){
    printIncomeTable();
    printExpenseTable();
    balance = localStorage.getItem("balance");
    if(!balance) balance = 0;
    balance_DOM.textContent =  localStorage.getItem("balance") ? `Balance : Rs ${localStorage.getItem("balance")}` :`Balance : Rs 0`;
})


incomeButton.addEventListener("click",function(event){
    event.preventDefault();
    if(!event.target.classList.contains("save-income"))return;
    let incomeCategory = incomeCategory_DOM.value;
    let incomeSource = incomeSource_DOM.value;
    let incomeAmount = +incomeAmount_DOM.value;
    if(!validateIncomeForm(incomeSource,incomeAmount)) return;
    let incomeArr = getIncomeData() ;
    let incomeObj = {
        date: Date.now(),
        id: uuidv4(),
        category:incomeCategory,
        source:incomeSource,
        amount:incomeAmount
    }
    incomeArr.push(incomeObj)
    saveIncomeData(incomeArr,incomeArr.length - 1)
    clearIncomeFormDetails();
    //printIncomeTableOnInsertion(incomeObj);
    printIncomeTable();
    balance_DOM.textContent = "";
    balance_DOM.textContent =  localStorage.getItem("balance") ? `Balance : Rs ${localStorage.getItem("balance")}` :`Balance : Rs 0`;
})

function handleClickOnAddExpenseButton(event){
    if(!event.target.classList.contains("save-expense")) return;
    let expenseCategory = expenseCategory_DOM.value;
    let expenseSource = expenseSource_DOM.value;
    let expenseAmount = expenseAmount_DOM.value;
    if(!validateExpenseForm(expenseSource,expenseAmount))return;
    let expenseArr = getExpenseData();
    let expenseObj = {
        date: Date.now(),
        id:uuidv4(),
        category:expenseCategory,
        source:expenseSource,
        amount:expenseAmount
    }
    expenseArr.push(expenseObj);
    saveExpenseData(expenseArr,expenseArr.length - 1);
    clearExpenseFormDetails();
    printExpenseTable();
    balance_DOM.textContent = "";
    balance_DOM.textContent =  localStorage.getItem("balance") ? `Balance : Rs ${localStorage.getItem("balance")}` :`Balance : Rs 0`;
}


document.body.addEventListener("click",function(event){
    //Income
    handleEditClicksOnIncomeTable(event);
    handleClickOnUpdateIncomeButton(event);
    handleClickOnDeleteIncomeButton(event);

    //Expenses
    handleClickOnAddExpenseButton(event);
    handleEditClicksOnExpenseTable(event);
    handleClickOnUpdateExpenseButton(event);
    handleClickOnDeleteExpenseButton(event);

})