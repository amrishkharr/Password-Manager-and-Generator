import { db, auth } from "./firebase-config.js";
import { collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// DOM Elements
const form = document.getElementById("credForm");
const website = document.getElementById("website");
const username = document.getElementById("username");
const password = document.getElementById("password");
const credTableBody = document.querySelector("#credTable tbody");
const mailLink = document.getElementById("mailLink");

// Wait for user to be logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  console.log("Logged in user:", uid);

  // Reference top-level collection
  const credsRef = collection(db, "allCredentials");

  // Submit credential
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!website.value || !username.value || !password.value) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(credsRef, {
        userId: uid,
        website: website.value,
        username: username.value,
        password: password.value,
        createdAt: new Date()
      });
      console.log("Saved successfully!");
      form.reset();
    } catch (err) {
      console.error("Error saving credential:", err);
      alert("Error saving credential: " + err.message);
    }
  });

  // Show saved credentials in real-time
  const q = query(credsRef, where("userId", "==", uid));
  onSnapshot(q, (snapshot) => {
    credTableBody.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.website}</td>
        <td>${data.username}</td>
        <td>${data.password}</td>
      `;
      credTableBody.appendChild(row);
    });

    updateMailLink();
  });
});

// Export to Excel
window.exportToExcel = () => {
  const wb = XLSX.utils.book_new();
  const rows = [];

  credTableBody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    rows.push(Array.from(cells).map((cell) => cell.innerText));
  });

  const ws = XLSX.utils.aoa_to_sheet([["Website", "Username", "Password"], ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, "Passwords");
  XLSX.writeFile(wb, "passwords.xlsx");
};

// Generate mailto link
function updateMailLink() {
  let content = "Website\tUsername\tPassword\n";
  credTableBody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    content += `${cells[0].innerText}\t${cells[1].innerText}\t${cells[2].innerText}\n`;
  });

  mailLink.href = `mailto:?subject=Password Export&body=${encodeURIComponent(content)}`;
}
