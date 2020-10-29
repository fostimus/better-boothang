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
