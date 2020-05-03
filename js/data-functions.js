function getIncomeData(){
    let incomeArr = localStorage.getItem("incomeArr");

    if(incomeArr){
        incomeArr = JSON.parse(incomeArr);
    } else {
        incomeArr = [];
    }   
    return incomeArr;
}

function saveIncomeData(incomeArr,posForBalance){
    localStorage.setItem("incomeArr",JSON.stringify(incomeArr));
    balance = +balance + +incomeArr[posForBalance].amount;
    localStorage.setItem("balance",balance);

    incomeAmountVal = localStorage.getItem("incomeAmountVal");
    if(!incomeAmountVal){
        incomeAmountVal = 0;
    } else {
        incomeAmountVal = incomeArr.reduce((totalAmount,incomeObj) => totalAmount + incomeObj.amount,0)
    }
    localStorage.setItem("incomeAmountVal",incomeAmountVal);
}