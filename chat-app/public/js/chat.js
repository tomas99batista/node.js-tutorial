const socket = io();

// elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const messageLocationTemplate = document.querySelector(
  "#message-location-template"
).innerHTML;

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    createdAt: moment(message.createdAt).format("HH:MM"),
    message: message.text,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (message) => {
  console.log(message);
  const html = Mustache.render(messageLocationTemplate, {
    createdAt: moment(message.createdAt).format("HH:MM"),
    message: message.url,
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled", "disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) return console.log(error);

    console.log("message delivered");
  });
});

document.querySelector("#send-location").addEventListener("click", (e) => {
  if (!navigator.geolocation)
    return alert("geolocation is not supported by your browser");

  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (error) => {
        $sendLocationButton.removeAttribute("disabled", "disabled");

        if (error) return console.log(error);

        console.log("location shared");
      }
    );
  });
});

socket.on("sendMessage", (msg) => {
  console.log(msg);
});
