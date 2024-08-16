base_url="https://2024-03-06.currency-api.pages.dev/v1/currencies";

let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector(".btn");
let msg=document.querySelector(".msg")
let Currfrom=document.querySelector(".from select");
let Currto=document.querySelector(".to select");
let excbtn=document.querySelector(".exc")

window.addEventListener("load",(evt)=>{
change(evt);
})


for(let select of dropdowns)
{
for(let CurrCode in countryList)
{
   let newOption=document.createElement("option");
   newOption.innerText=CurrCode;
   newOption.value=CurrCode;
   select.append(newOption);
    if(CurrCode==="USD" && select.name==="from")
    {
        newOption.selected="selected";
    }
    else if(CurrCode==="INR" && select.name==="to")
    {
        newOption.selected="selected";
    }


    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)})


       
}
}

updateFlag=(element)=>{
    
    let opt=countryList[element.value];
    
    let newSrc=`https://flagsapi.com/${opt}/flat/64.png`
    let target=element.parentElement.querySelector("img");
    target.src=newSrc;
   
}


  
excbtn.addEventListener("click",(evt)=>{
        evt.preventDefault();
       const temp1=Currfrom.value;
       const temp2=Currto.value;
       Currfrom.value=temp2;
       Currto.value=temp1;
       updateFlag(Currfrom);
       updateFlag(Currto);
   
   
   
   })
   
btn.addEventListener("click", (evt)=>{
    change(evt);
})

async function change(evt){
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
   let amtValue=amount.value;
   if(amtValue==="" || amtValue<0)
   {
    amount.value=1;
    amtValue="1";
   }
   const URL = `${base_url}/${Currfrom.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[Currto.value.toLowerCase()];
   let finalAmount = (data[Currfrom.value.toLowerCase()][Currto.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
   msg.innerText = `${amtValue} ${Currfrom.value} = ${finalAmount} ${Currto.value}`;
}