
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const message = params.get("message");

  document.getElementById("greetingId").value = id;
  document.getElementById("newMessage").value = message;
});

async function updateGreetingMessage() {
  const id = document.getElementById("greetingId").value;
  const newMessage = document.getElementById("newMessage").value.trim();

  if (!newMessage) {
    alert("Message cannot be empty.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7244/api/greeting/updateGreeting/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newMessage)
    });

    const result = await response.json();
    alert(result.message);

    if (result.success) {
      window.location.href = "greetings.html";
    }

  } catch (error) {
    console.error("Error updating greeting:", error);
    alert("Something went wrong while updating.");
  }
}