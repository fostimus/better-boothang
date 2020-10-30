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

// TODO: this is a terrible way to do this. should use the value provided in user.js server side, not hard code the name
const sendModalTitle = "send-boothang-modal";

// click handler to ensure send modal is displaying the proper initial state: a dropdown
const initiateSendButton = document.querySelector("#initiate-send");
if (initiateSendButton) {
  initiateSendButton.addEventListener("click", () => {
    const chooseBoo = document.querySelector(".choose-yo-boo");
    if (chooseBoo.classList.contains("hidden")) {
      chooseBoo.classList.toggle("hidden");
    }

    const sentToBoo = document.querySelector(".sent");
    if (!sentToBoo.classList.contains("hidden")) {
      sentToBoo.classList.toggle("hidden");
    }

    const modalTitle = document.querySelector(
      "#" + sendModalTitle + " .modal-title"
    );
    modalTitle.textContent = "Choose which BooThang";
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

const sendToChosen = document.querySelector("#sendToChosenBoothang");
if (sendToChosen) {
  sendToChosen.addEventListener("click", e => {
    sendMessageJson(e);
  });
}

// ensure hidden input value for chosenBoothang is "", send to backend via fetch API
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
    chosenBoothangId: document.querySelector("#chosenBoothang").value,
    message: document.querySelector("#message-to-boo").value
  };
  postData("/user/messages", json).then(data => {
    console.log(data);
    if (data === 200) {
      const modalTitle = document.querySelector(
        "#" + sendModalTitle + " .modal-title"
      );
      modalTitle.textContent = "Message sent!";

      document.querySelector(".choose-yo-boo").classList.toggle("hidden");
      document.querySelector(".sent").classList.toggle("hidden");
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
