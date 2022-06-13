if (localStorage.length > 0){
    let arr = JSON.parse(localStorage.getItem("tickets"));
    for(let i=0; i<arr.length ; i++){
        let ticket_color = arr[i].ticketColor ;
        let ticketId = arr[i].ticketId;
        let ticketContent = arr[i].contentOfTicket;
        let mainContElem = document.querySelector(".main-cont");

        let newElem = document.createElement("div");      
        newElem.setAttribute("class" , "ticket-cont");
        newElem.innerHTML = `
               <div class="ticket-color ${ticket_color}" ></div>
               <div class="ticket-id" id="id1">${ticketId}</div>
               <div class="task-area" spellcheck="false"> ${ticketContent} </div>             
               <div class ="ticket-lock">                      
                  <i class="fas fa-trash"></i>      
                  <i class="fa-solid fa-lock"></i>
               </div>        
           `;
   
        newElem.setAttribute("colorOfTicket" , ticket_color);     
        mainContElem.appendChild(newElem);        
    }
}  

let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let actionBtn = document.querySelector(".action-btn-cont");
let modalDisplaying = false;
let textareaElem = document.querySelector(".textarea-cont");
let mainContElem = document.querySelector(".main-cont");
let priorityColorElem = document.querySelectorAll(".priority-color");

let allTicket = document.querySelectorAll(".ticket-cont");

let ticektArr = [] ;

// show modal whenever clicked on + button
addBtn.addEventListener("click" , (e) => {
    modalDisplaying = !modalDisplaying;
    
    if(modalDisplaying){
        modal.style.display = "flex";       
        //addBtn.style.backgroundColor = "black";       
    }else{
        modal.style.display = "none";
        // actionBtn.style.backgroundColor = "rgba(0,0,0,0.5)";        
    }
    
});

// In modal after typing your text in textarea , whenever
//shift key is pressed modal should be dissappear and a new 
// ticket should add.

textareaElem.addEventListener("keydown" , (e) => {    
    //  let key = e.key;
     
     if(e.ctrlKey){
         addTicket(color , shortid()); // shortid() id create krna k liya use hoti h . Ya method jo library use ki thi uska karn aaya h
         modal.style.display = "none";
         modalDisplaying = false;
         textareaElem.value = "" ;
     }
     
})

// code of tickets
function addTicket(ticketColor , ticketId){    
         
     let newElem = document.createElement("div");
     let contentOfTicket = textareaElem.value;
     newElem.setAttribute("class" , "ticket-cont");
     newElem.innerHTML = `
            <div class="ticket-color ${ticketColor}" ></div>
            <div class="ticket-id" id="id1">${ticketId}</div>
            <div class="task-area" spellcheck="false"> ${contentOfTicket} </div>             
            <div class ="ticket-lock">                      
               <i class="fas fa-trash"></i>      
               <i class="fa-solid fa-lock"></i>
            </div>        
        `;

     newElem.setAttribute("colorOfTicket" , ticketColor);     
     mainContElem.appendChild(newElem);             
   
     handleLock(newElem);      

     ticektArr.push({ticketColor ,ticketId , contentOfTicket});
     ticektArr.forEach((e) => {console.log(e);})  
     
     localStorage.setItem("tickets" , JSON.stringify(ticektArr));   
     
     removeTicket(newElem);
}

/*Lock Of Ticket will unlock if it is locked and it will be locked if it is unlocked*/ 

function handleLock(ticket){
    let ticketLock = ticket.querySelector(".ticket-lock");
    let ticketLockIcon = ticketLock.children[1];
    let ticketTaskArea = ticket.querySelector(".task-area");    
    
    ticketLockIcon.addEventListener("click" , (e) => {
            if(ticketLockIcon.classList.contains("fa-lock")){
              ticketLockIcon.classList.remove("fa-lock");
              ticketLockIcon.classList.add("fa-lock-open");
            
            ticketTaskArea.setAttribute("contenteditable" , "true");
        }else{
             ticketLockIcon.classList.remove("fa-lock-open");
             ticketLockIcon.classList.add("fa-lock");
             ticketTaskArea.setAttribute("contenteditable" , "false");
        }
        
        let ticket_id = ticket.querySelector("#id1");         
        console.log(ticket_id.innerText);
        
        ticektArr.forEach((eachTicket) => {
               let eachTicketId = eachTicket.ticketId;
               let eachTicketTaskArea = eachTicket.contentOfTicket;
               console.log("eachTicket is "+eachTicket.ticketId);
               console.log("asdd  "+eachTicketId);
               if(eachTicketId == ticket_id.innerText ){
                   eachTicket.contentOfTicket = ticketTaskArea.innerText;
                //    console.log(eachTicket.contentOfTicket);
                //    console.log(eachTicket);
               }
        });
    })
}

function removeTicket(ticket){
    
    let ticketLock = ticket.querySelector(".ticket-lock");
    let deleteIcon = ticketLock.children[0];

    deleteIcon.addEventListener("click" , (e) => {            
            ticket.remove();
    });
    
}


let elem ;
let lightgreen = document.getElementById("c1");
let lightblue = document.getElementById("c2");
let lightpink = document.getElementById("c3");
let black = document.getElementById("c4");
let color;


// let ticketId = document.getElementById("id1");

function removeBorder(elem){
    elem.style.border = "none";
}



lightgreen.addEventListener("click" , (e) => {
     if(elem!=null){
         removeBorder(elem);
     }
     elem = lightgreen ;
     lightgreen.style.border = " 6px solid #fff";     
     color = lightgreen.classList[0];
})

lightblue.addEventListener("click" , (e) => {
    if(elem!=null){
        removeBorder(elem);
    }
    elem = lightblue ;    
    lightblue.style.border = " 6px solid #fff";
    color = lightblue.classList[0]; 
})

lightpink.addEventListener("click" , (e) => {
    if(elem!=null){
        removeBorder(elem);
    }
    elem = lightpink ;
    lightpink.style.border = " 6px solid #fff";
    color = lightpink.classList[0];
})

black.addEventListener("click" , (e) => {
    if(elem!=null){
        removeBorder(elem);
    }
    elem = black ;
    black.style.border = " 6px solid #fff";     
    color = black.classList[0];
});

//Show All Tickets pr click krna pr sari tickets visible ho jayegi
let showAllColorsTickets = document.getElementById("allColorFilter");
showAllColorsTickets.addEventListener("click" , (e) => {    
    let allTickets = document.querySelectorAll(".ticket-cont");
    allTickets.forEach((eachTicket) => {
         eachTicket.style.display = "block";
    })
});


let allToolbarColors = document.querySelectorAll(".color");

allToolbarColors.forEach((eachColor) => {
    
    eachColor.addEventListener("click" , (e) =>{ 
        let allTickets = document.querySelectorAll(".ticket-cont");
        let filteredColor = eachColor.classList[0];               
        
        allTickets.forEach((eachTicket) => {
             let ticket_color = eachTicket.getAttribute("colorOfTicket");

             if(filteredColor == ticket_color){                                  
                 eachTicket.style.display = "block";                                 
             }else{                
                 eachTicket.style.display = "none";                 
             }
        }) 
    })     
});
