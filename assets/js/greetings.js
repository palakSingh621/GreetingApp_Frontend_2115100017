document.addEventListener("DOMContentLoaded", () => {
  fetchGreetings();
});

async function fetchGreetings() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7244/api/greeting/getAllGreetings", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json();
    const greetingList = document.getElementById("greetingList");

    if (result.success && result.data.length > 0) {
      greetingList.innerHTML = "";

      result.data.forEach((greeting) => {
        const card = document.createElement("div");
        card.className = "greeting-card";

        card.innerHTML = `
          <p><strong>ID:</strong> ${greeting.id}</p>
          <p><strong>Message:</strong> ${greeting.message}</p>
          <button onclick="editGreeting(${greeting.id}, '${greeting.message.replace(/'/g, "\\'")}')">Update</button>
          <button onclick="deleteGreeting(${greeting.id})">Delete</button>
          <hr>
        `;

        greetingList.appendChild(card);
      });
    } else {
      greetingList.innerHTML = `<p>No greetings found.</p>`;
    }

  } catch (error) {
    console.error("Error fetching greetings:", error);
    document.getElementById("greetingList").innerHTML = `<p>Error loading greetings.</p>`;
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function editGreeting(id, message) {
  // Redirect to update page with query params
  window.location.href = `update.html?id=${id}&message=${encodeURIComponent(message)}`;
}

async function deleteGreeting(id) {
  const confirmed = confirm("Are you sure you want to delete this greeting?");
  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7244/api/greeting/deleteGreeting/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json();
    alert(result.message);

    if (result.success) {
      fetchGreetings(); // Reload the list
    }

  } catch (error) {
    console.error("Error deleting greeting:", error);
    alert("Something went wrong while deleting.");
  }
}