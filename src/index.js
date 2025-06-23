const form = document.getElementById("guestForm");
const input = document.getElementById("guestName");
const guestList = document.getElementById("guestList");

let guests = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = input.value.trim();
  if (!name) return;

  if (guests.length >= 10) {
    alert("Guest limit reached! Max 10 guests allowed.");
    return;
  }

  const guest = {
    id: Date.now(),
    name: name,
    attending: true
  };

  guests.push(guest);
  renderGuests();
  form.reset();
});

function renderGuests() {
  guestList.innerHTML = "";

  guests.forEach((guest) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${guest.name} - ${guest.attending ? "Attending" : "Not Attending"}`;
    
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle RSVP";
    toggleBtn.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    };

    li.appendChild(nameSpan);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    guestList.appendChild(li);
  });
}
