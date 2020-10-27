// attach click handler to message links
const messageLinks = document.querySelectorAll(".messages a");

messageLinks.forEach(messageLink => {
  messageLink.addEventListener("click", () => {
    document.querySelector("#message-to-boo").value = messageLink.textContent;
  });
});

// attach clich handler to toggle new BooThang
document.querySelector("#new-boothang").addEventListener("click", () => {
  document.querySelector(".new-boothang-container").classList.toggle("hidden");
});
