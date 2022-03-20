const type__ofGas = document.querySelector('.type__ofGas');
const p = document.querySelector('p');
const gas = document.querySelectorAll('.gas')
const div = document.querySelector('.class')
const nameGas = document.querySelector('.name__gas')
const gasPriceInput = document.querySelector('.gas__priceInput')
const GasOutput = document.querySelector('.Gas__output ')
const price = document.querySelectorAll('.price')
const btnResulyPrice = document.querySelector('.resulyPrice')
const arrayOfInput = [];
const btnPassword = document.querySelector('.passwords')
const btnPasswordAdmin = document.querySelector('.adminEnter__btn-button');
const btnEnterNewPassword = document.querySelector('.adminChange__btn-button')
const btnClose = document.querySelector('.close__btn-button')
const btnEndDay = document.getElementById('endday')
const btnEnter = document.querySelector('.enter')
const btnChangeRemainde = document.querySelector('.gas__remainder-btn_button')
const btnReset = document.querySelector('#reset')
const pageAdmin = document.getElementById('admin')
const pageChangepas = document.getElementById('change_pass')
const totalWriteEndDay = document.querySelector('.total')
const totalPage = document.querySelector('.totalAmount')
const volDisplay = document.querySelectorAll('.lastVolumes')
const gasRemainder = document.querySelectorAll('.gas__remainder-input')
const totalPageindex = document.querySelectorAll('.total2')






fetch('data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(text) {
    for(let i = 0; i <text.length; i ++){
        let div = document.createElement('div');
        let div2 = document.createElement('div');
        let input = document.createElement('input')
        div.classList.add('n'+ (i + 1), 'gas__remainder-model')
        div2 .classList.add('gas__remainder-models')
        div.setAttribute(`data-volume`,Object.values(text[i])[1])
        input.classList.add('gas__remainder-input', '-input__')
        div.innerHTML = `${Object.values(text[i])[0]} : Остаток - ${Object.values(text[i])[1]}gal. Корректировка`
        const boby  = document.getElementById('gas__remainder')
    
        boby.appendChild(div)
        div.appendChild(input)
        div.appendChild(div2)
        Object.entries(text) 
 
        
    }

  })
  .catch(function(error) {
    console.log('Request failed', error)
  });

  



let gasRemainderdis = 0;
let amountt = 0;
let totalAmount = 0;
let password = '';
const adminpassword = `pigas1q1`;
// add volume info

let lastVolumesDay = document.querySelectorAll('.gas__remainder-model')
let gasRemainderday = document.querySelectorAll('.gas__remainder-input')





btnChangeRemainde.addEventListener('click', () =>{
    btnChangeRemainde.setAttribute('disabled',true);
    btnEnterNewPassword.removeAttribute('disabled');
    const gasmodel = document.querySelectorAll('.gas__remainder-input')
    document.getElementById('changeAdmin').removeAttribute('disabled');
    for(let i = 0; i < gasmodel.length; i++){
        setTimeout(() =>{
            gasRemainderday = document.querySelectorAll('.gas__remainder-input')
            lastVolumesDay = document.querySelectorAll('.gas__remainder-model')
            
            volDisplay[i].innerHTML = +gasRemainderday[i].value + +lastVolumesDay[i].dataset.volume
            gasmodel[i].setAttribute('disabled',true)
        },10)
        
    }
})










//enter change pasword menu
btnPasswordAdmin.addEventListener('click',()=>{
    if(document.getElementById('passAdmin').value === adminpassword){
        pageAdmin.classList.add('noneActive')
        pageChangepas.classList.remove('noneActive')
    } else {
        alert('admin password uncorrect')
    }
}
)

// Change password with buttons
btnEnterNewPassword.addEventListener('click', ()=>{
    if(document.getElementById('changeAdmin').value.length > 1){
        password = document.getElementById('changeAdmin').value;
        pageChangepas.classList.add('noneActive');
        gasPriceInput.classList.remove('noneActive');
    } else {
        alert('Wrong password, enter correct')
    }

})
// btn close
btnClose.addEventListener('click', () =>{
    window.location.reload()
})


//check password , diseible remove from btn, disabled block password, if pass not work reload page
btnPassword.addEventListener('click',()=>{
    if (document.getElementById('pass').value === password ||document.getElementById('pass').value === adminpassword){
        btnResulyPrice.removeAttribute('disabled');
        document.querySelector('.pass').classList.add('noneActive');
    } else {
       alert('Re-Enter password!')
    }

})


//change tabs
const closePriceWindow = () =>{
    gasPriceInput.classList.add('noneActive');
    GasOutput.classList.remove('noneActive');
    btnEndDay.removeAttribute('disabled');
    btnReset.removeAttribute('disabled');
    
}


// reset button
btnReset.onclick = () =>{
    gasPriceInput.classList.remove('noneActive');
    document.querySelector('.pass').classList.remove('noneActive')
    GasOutput.classList.add('noneActive');
    totalPage.classList.add('noneActive');
    btnResulyPrice.setAttribute('disabled', true)
    btnEndDay.setAttribute('disabled', true)

}




// output total `amount` 
for(let i = 0; i < gas.length; i++){
    gas[i].onclick = function(){
        const galons = document.querySelector('.galon').value;
        const amount = arrayOfInput[i];
        
        gasRemainderdis = galons;
        if (+galons > +volDisplay[i].innerHTML){
            alert('Not has volume, change please')
        }else{
            for (let j = 0; j <gas.length; j++){
                gas[j].classList.remove('activiri')    
            }
            gas[i].classList.add('activiri')
            div.innerHTML = `Total: ${galons * amount} грн`;
            amountt = galons * amount;

        }

    }

}


// change window after click , disabled gas station with price 0
btnResulyPrice.addEventListener('click', ()=>{
    closePriceWindow();
    for (let i =0; i < price.length; i++){
        arrayOfInput.push(document.querySelectorAll(".price")[i].value)
        
        if (arrayOfInput[i] === '' || +arrayOfInput === 0){
           type__ofGas.children[i].setAttribute('disabled',true)
        }
    }
})

// button end day
btnEndDay.onclick = () =>{
    
    if(GasOutput.classList.contains('noneActive')){
        window.location.reload()
    } else {
        GasOutput.classList.add('noneActive');
        totalPage.classList.remove('noneActive');
        totalWriteEndDay.innerHTML = `Total amount: ${totalAmount} грн.`
        for (let i = 0; i < volDisplay.length; i++){
            setTimeout(() =>{
                lastVolumesDay = document.querySelectorAll('.gas__remainder-model')
                console.log('lastVolumesDay - ', lastVolumesDay[i].dataset.volume)
                console.log('volDisplay - ', +volDisplay[i].innerHTML)
                if (+volDisplay[i].innerHTML !== +lastVolumesDay[i].dataset.volume){
                    totalPageindex[i].innerHTML = `${totalPageindex[i].innerHTML} : ${ Math.abs(+volDisplay[i].innerHTML - +lastVolumesDay[i].dataset.volume)} gal`
    
                } else {
                    totalPageindex[i].innerHTML= `${totalPageindex[i].innerHTML} - 0 gal`
                }
            }, 10)

        }
    }
  
    
}


// button enter add amount to total money
btnEnter.onclick =  () =>{
    totalAmount += amountt;
    document.querySelector('.galon').value = ''
    div.innerHTML = `Total:`
    for(let i = 0; i < gas.length; i++){
        if (gas[i].classList.contains('activiri')){
            volDisplay[i].innerHTML = +volDisplay[i].innerHTML - gasRemainderdis;           
        }
        if (+volDisplay[i].innerHTML === 0 || volDisplay[i].innerHTML === ''){
            gas[i].setAttribute('disabled')     
        }
    }
}

