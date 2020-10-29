// attach click handler to message links
const messageLinks = document.querySelectorAll(".messages a");

messageLinks.forEach(messageLink => {
  messageLink.addEventListener("click", () => {
    document.querySelector("#message-to-boo").value = messageLink.textContent;
  });
});

const clearInput = document.querySelector(".clear-input");
if (clearInput) {
  clearInput.addEventListener("click", () => {
    document.querySelector("#message-to-boo").value = "";
  });
}

// click handler to change value of hidden input AND drop down button text to selcted value
const chosenBoothangButtons = document.querySelectorAll(".choose-boothang");
chosenBoothangButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector("#boothangDropdownButton").textContent =
      button.textContent;
    document.querySelector("#sendToChosenBoothang").textContent =
      "Send to " + button.textContent;
    document.querySelector("#chosenBoothang").value = button.getAttribute(
      "boothangId"
    );
  });
});

// sendToChosenBoothang

// ensure hidden input value for chosenBoothang is ""
const sendToAll = document.querySelector("#sendToAllBoothangs");
if (sendToAll) {
  sendToAll.addEventListener("click", e => {
    document.querySelector("#chosenBoothang").value = "";
    sendMessageJson(e);
  });
}

/**
 * helper send message function
 */
function sendMessageJson(e) {
  // prevent page reload, send JSON to backend
  e.preventDefault();

  const json = {
    message: document.querySelector("#message-to-boo").value
  };
  postData("/user/messages", json).then(data => {
    console.log(data);
    if (data === 200) {
      // TODO: this is a terrible way to do this. should use the value provided in user.js server side, not hard code the name
      const modalTitle = document.querySelector(
        "#send-boothang-modal .modal-title"
      );
      console.log(modalTitle);
      modalTitle.textContent = "Message sent!";
    }
  });
}

/** post data
 */
async function postData(url = "", data = {}) {
  // Default options are marked with *
  let response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  console.log("Response status: " + response.status);
  return response.status; // parses JSON response into native JavaScript objects
}
