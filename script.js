const sendContent = document.getElementById('sendContent');
const charCount = document.getElementById('charCount');
const updateContent = document.getElementById('updateContent');
const charCount2 = document.getElementById('charCount2');

sendContent.addEventListener('input', () => {
    if(sendContent.value.length<2500){
        charCount.innerHTML = "<span class='listObj'>" + sendContent.value.length + " / 2500 characters</span>";
    }
    else{
        charCount.innerHTML = "<b><span class='listObj' style='color: red'>" + sendContent.value.length + " / 2500 characters</span></b>";
    }
})
updateContent.addEventListener('input', () => {
    if(updateContent.value.length<2500){
        charCount2.innerHTML = "<span class='listObj'>" + updateContent.value.length + " / 2500 characters</span>";
    }
    else{
        charCount2.innerHTML = "<b><span class='listObj' style='color: red'>" + updateContent.value.length + " / 2500 characters</span></b>";
    }
})
// Function for 'Copy Retrieved Text' and 'Copy note id' and 'Copy revoke id' buttons to copy text 
// in the output text area to clipboard
async function copyFn(){
    let op = document.getElementById("output")
    let val = op.value
    try{
        await navigator.clipboard.writeText(val)
        let button = document.getElementById('copy1')
        button.textContent = "Copied!"

        setTimeout( () => {
            button.textContent = "Copy Retrieved Text"
        }, 2500)
    }
    catch(err){
        alert("Failed to copy:"+err)
    }
}
async function copyFn2(){
    let op = document.getElementById("sendCode")
    let val = op.value
    try{
        await navigator.clipboard.writeText(val)
        let button = document.getElementById('copy2')
        button.textContent = "Copied!"

        setTimeout( () => {
            button.textContent = "Copy Note ID"
        }, 2500)
    }
    catch(err){
        alert("Failed to copy:"+err)
    }
}
async function copyFn3(){
    let op = document.getElementById("revokeCode")
    let val = op.value
    try{
        await navigator.clipboard.writeText(val)
        let button = document.getElementById('copy3')
        button.textContent = "Copied!"

        setTimeout( () => {
            button.textContent = "Copy Revoke ID"
        }, 2500)
    }
    catch(err){
        alert("Failed to copy:"+err)
    }
}
async function copyFn4(){
    let op = document.getElementById("updateCode")
    let val = op.value
    try{
        await navigator.clipboard.writeText(val)
        let button = document.getElementById('copy4')
        button.textContent = "Copied!"

        setTimeout( () => {
            button.textContent = "Copy Update ID"
        }, 2500)
    }
    catch(err){
        alert("Failed to copy:"+err)
    }
}

// Tab Viewing System
function showSenderSection(){
    let ssec = document.getElementById("senderSectionComponent")
    let rsec = document.getElementById("readerSectionComponent")
    let revsec = document.getElementById("revokeSectionComponent")
    let osec = document.getElementById("updateSectionComponent")
    ssec.style.display = "block"
    rsec.style.display = "none"
    revsec.style.display = "none"
    osec.style.display = "none"
}
function showReaderSection(){
    let ssec = document.getElementById("senderSectionComponent")
    let rsec = document.getElementById("readerSectionComponent")
    let revsec = document.getElementById("revokeSectionComponent")
    let osec = document.getElementById("updateSectionComponent")
    ssec.style.display = "none"
    rsec.style.display = "block"
    revsec.style.display = "none"
    osec.style.display = "none"
}
function showRevokeSection(){
    let ssec = document.getElementById("senderSectionComponent")
    let rsec = document.getElementById("readerSectionComponent")
    let revsec = document.getElementById("revokeSectionComponent")
    let osec = document.getElementById("updateSectionComponent")
    ssec.style.display = "none"
    rsec.style.display = "none"
    revsec.style.display = "block"
    osec.style.display = "none"
}
function showUpdateSection(){
    let ssec = document.getElementById("senderSectionComponent")
    let rsec = document.getElementById("readerSectionComponent")
    let revsec = document.getElementById("revokeSectionComponent")
    let osec = document.getElementById("updateSectionComponent")
    ssec.style.display = "none"
    rsec.style.display = "none"
    revsec.style.display = "none"
    osec.style.display = "block"
}
// Show Password buttons
function showPassword1(){
    let button = document.getElementById("showPwd1")
    let sendPwd = document.getElementById("sendPassword")

    if(button.textContent === "See Now"){
        return
    }
    sendPwd.type = "text"
    button.textContent = "See Now"
    sendPwd.disabled = true;
    setTimeout( ()=> {
        sendPwd.type = "password"
        button.textContent = "Show Password"
        sendPwd.disabled = false;
    }, 5500)
}

function showPassword2(){
    let button = document.getElementById("showPwd2")
    let sendPwd = document.getElementById("clipPass")

    if(button.textContent === "See Now"){
        return
    }
    sendPwd.type = "text"
    button.textContent = "See Now"
    sendPwd.disabled = true;
    setTimeout( ()=> {
        sendPwd.type = "password"
        button.textContent = "Show Password"
        sendPwd.disabled = false;
    }, 5500)
}

function showPassword3(){
    let button = document.getElementById("showPwd3")
    let sendPwd = document.getElementById("clipPass2")

    if(button.textContent === "See Now"){
        return
    }
    sendPwd.type = "text"
    button.textContent = "See Now"
    sendPwd.disabled = true;
    setTimeout( ()=> {
        sendPwd.type = "password"
        button.textContent = "Show Password"
        sendPwd.disabled = false;
    }, 5500)
}

function showPassword4(){
    let button = document.getElementById("showPwd4")
    let sendPwd = document.getElementById("clipPass3")

    if(button.textContent === "See Now"){
        return
    }
    sendPwd.type = "text"
    button.textContent = "See Now"
    sendPwd.disabled = true;
    setTimeout( ()=> {
        sendPwd.type = "password"
        button.textContent = "Show Password"
        sendPwd.disabled = false;
    }, 5500)
}

async function sendFeedback(event){
  // If internet failed need try catch block
    try{
      event.preventDefault();  
      const fdb = document.getElementById('feedback')
      let value = fdb.value
      let trimVal = fdb.value.trim()
      if(trimVal.length<=0){
        alert("Feedback string can't be empty and it can't contain only whitespaces.\n\
There must be atleast 1 non-space character to send feedback.")
      }
      else{
        const response = await fetch('/sendFeedback', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `feedback=${encodeURIComponent(value)}`
        })
        if(response.ok){
            alert("Feedback sent successfully! Thank you for your valuable feedback!")
            fdb.value = ""
        }
        else if(response.status === 500){
          // To handle if DB is unavailable
          alert("Error 500 - Some DB or Server error might have occurred. Please try later.\
\nAlso please check your internet connection!")
        }
        else if(response.status === 400){
          alert("Error 400 - Bad Request\n\
Feedback string can't be empty and it can't contain only whitespaces.\n\
There must be atleast 1 non-space character to send feedback.")
        }
        else{
            alert("Error 413 - Payload Too Large")
        }
      }
    }
    catch(err){
      alert("Network error! Please Check your internet connection!")
    }
}
