
let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let actionBtn = document.querySelector(".action-btn-cont");
let modalDisplaying = false;
let textareaElem = document.querySelector(".textarea-cont");
let mainContElem = document.querySelector(".main-cont");
let priorityColorElem = document.querySelectorAll(".priority-color");

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
     newElem.setAttribute("class" , "ticket-cont");
     newElem.innerHTML = `
            <div class="ticket-color ${ticketColor}" ></div>
            <div class="ticket-id" id="id1">${ticketId}</div>
            <div class="task-area" spellcheck="false"> ${textareaElem.value} </div>             
            <div class ="ticket-lock">                      
               <i class="fas fa-trash"></i>      
               <i class="fa-solid fa-lock"></i>
            </div>        
        `;

     newElem.setAttribute("colorOfTicket" , ticketColor);     
     mainContElem.appendChild(newElem);             

     handleLock(newElem);
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
            
            // apn chahcta h ki jbb lock open ho to content edit ho skta aur
            //jb lock close ho toh content edit nhi ho ska
            //contenteditable naam ka ek attribute h , jiski 2 values h 
            //true or false , true hua toh content edit ho skta h otherwise
            //nhi ho skta.

            ticketTaskArea.setAttribute("contenteditable" , "true");
        }else{
             ticketLockIcon.classList.remove("fa-lock-open");
             ticketLockIcon.classList.add("fa-lock");
             ticketTaskArea.setAttribute("contenteditable" , "false");
        }
    })
}

function removeTicket(ticket){
    
    let ticketLock = ticket.querySelector(".ticket-lock");
    let deleteIcon = ticketLock.children[0];

    deleteIcon.addEventListener("click" , (e) => {            
            ticket.remove();
    });
    
}


// jbb bhi priority color pr click hoga inside modal , tbb 
//ek border bnn jayega priority color k around , jiss se
//ye pata chl jayega ki konsa priority color clicked hua pda h


// priorityColorElem.forEach((priorityColor) => {
    
//     priorityColor.addEventListener("click" , (e) => {
//           priorityColorElem.forEach((color) => {
//                 color.style.border = "none";
//           });   
          
//           priorityColor.style.border = "6px solid #fff";
//     });
// });

let elem ;
let lightgreen = document.getElementById("c1");
let lightblue = document.getElementById("c2");
let lightpink = document.getElementById("c3");
let black = document.getElementById("c4");
let color;

// Apn javascript k document k jariya unn id classes ko select nhi kr skta 
//jinko javascript sa hi bnaya h , html sa nhi bnaya ... for example 
//addTicket function ma ticket-color aur ticket-id javascript sa bnaya h
//html sa nhi toh jbb mana  ticketId = document.getElementById("id1")  likha
//tbb bhi ticketId ma null hi rhega.

// let ticketId = document.getElementById("id1");

function removeBorder(elem){
    elem.style.border = "none";
}

//elem naam ka variable liya aur ab agr elem ma lightgreen h iska mtlb 
//lightgreen naam ka border selected h , agr asa h toh jbb bhi kisi aur 
//color pr click hoga toh lightgreen pr sa border htt jayega aur jiss pr
//click kiya uss pr border add ho jayega

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

//jbb bhi kisi color pr click kraga toh uss color ki tickets visible ho jayegi
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
