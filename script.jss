// Ambil data dari localStorage
let clients = JSON.parse(localStorage.getItem("clients")) || [];

function saveData() {
    localStorage.setItem("clients", JSON.stringify(clients));
}

function renderTable() {
    const tbody = document.querySelector("#clientTable tbody");
    tbody.innerHTML = "";

    clients.forEach((client, index) => {
        const row = `
        <tr>
            <td>${client.name}</td>
            <td>${client.lastAttendance || "-"}</td>
            <td>
                <button class="action-btn" onclick="markAttendance(${index})">Absen</button>
            </td>
        </tr>
        `;
        tbody.innerHTML += row;
    });
}

function addClient() {
    const name = document.getElementById("clientName").value.trim();
    if (!name) return alert("Nama tidak boleh kosong!");

    clients.push({ name, lastAttendance: null });
    saveData();
    renderTable();

    document.getElementById("clientName").value = "";
}

function markAttendance(index) {
    const today = new Date().toLocaleString("id-ID");
    clients[index].lastAttendance = today;

    saveData();
    renderTable();
}

function exportCSV() {
    let csv = "Nama Klien,Tanggal Absen\n";
    
    clients.forEach(c => {
        csv += `${c.name},${c.lastAttendance || ""}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "absensi_psikoris.csv";
    a.click();
}

renderTable();
