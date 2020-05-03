function validateIncomeForm(incomeSource,incomeAmount){
    let isValidated = true;
    
    if(incomeSource.length < 1 || incomeSource.length > 25){
        incomeSource_DOM.value = "";
        incomeSource_DOM.setAttribute("placeholder","Shud not be empty or > than 25");
        isValidated = false;
    }
    
    if(isNaN(incomeAmount) || incomeAmount === 0){
        incomeAmount_DOM.value = "";
        incomeAmount_DOM.setAttribute("placeholder","Shud be a number & > 0");
        isValidated = false;
    }
    return isValidated
}