const socket = io();

socket.on("countUpdated", (msg) => {
  console.log("updated count", msg);
});

document.querySelector("#increment").addEventListener("click", () => {
  console.log("clicked");
  socket.emit("increment");
});
