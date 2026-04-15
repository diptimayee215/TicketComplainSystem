function trackStatus() {
  const ticketId = document.getElementById("ticketId").value;
  const status = document.getElementById("status");

  if (ticketId === "") {
    status.innerText = "Please enter Ticket ID";
  } else {
    status.innerText = "Status: Pending (Demo Data)";
  }
}