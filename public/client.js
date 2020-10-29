// attach click handler to message links
const messageLinks = document.querySelectorAll(".messages a");

messageLinks.forEach(messageLink => {
  messageLink.addEventListener("click", () => {
    document.querySelector("#message-to-boo").value = messageLink.textContent;
  });
});

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

//ensure hidden input value for chosenBoothang is ""
const sendToAll = document.querySelector("#sendToAllBoothangs");
sendToAll.addEventListener("click", () => {
  document.querySelector("#chosenBoothang").value = "";
});

document.querySelector(".clear-input").addEventListener("click", () => {
  document.querySelector("#message-to-boo").value = "";
});

/** post data
 */
async function postData(url = "", data = {}) {
  console.log("data: ");
  console.log(data);
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
  console.log(response.status);
  return response.status; // parses JSON response into native JavaScript objects
}

document.querySelector("#send-to-boo").addEventListener("click", e => {
  const json = {
    message: document.querySelector("#message-to-boo").value
  };
  console.log(json);
  e.preventDefault();
  postData("/user/messages", json).then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
});
