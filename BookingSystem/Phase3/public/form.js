// ===============================
// Form handling for resources page
// ===============================

// -------------- Helpers --------------
function $(id) {
  return document.getElementById(id);
}

// Timestamp
function timestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
}

// -------------- Form wiring --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = $("resourceForm");
  // Safety check: only add listener if form exists on current page
  if (form) {
    form.addEventListener("submit", onSubmit);
  }
});

async function onSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitter = event.submitter;
  const actionValue = submitter && submitter.value ? submitter.value : "create";
  
  // Disable button to prevent double-clicks
  if (submitter) submitter.disabled = true;

  const selectedUnit = document.querySelector('input[name="resourcePriceUnit"]:checked')?.value ?? "";
  const priceRaw = $("resourcePrice")?.value ?? "";
  const resourcePrice = priceRaw === "" ? 0 : Number(priceRaw);

  const payload = {
    action: actionValue,
    resourceName: $("resourceName")?.value ?? "", // FIXED: Was "resourceNamee"
    resourceDescription: $("resourceDescription")?.value ?? "",
    resourceAvailable: $("resourceAvailable")?.checked ?? false,
    resourcePrice,
    resourcePriceUnit: selectedUnit
  };

  try {
    console.log("--------------------------");
    console.log(`Sending request to server [${timestamp()}]`);
    console.log("Payload:", payload);

    const response = await fetch("/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText}\n${text}`);
    }

    const data = await response.json();
    
    // Log to console
    console.log("Server response " + `[${timestamp()}]`);
    console.log("--------------------------");
    console.log("Status ➡️ ", response.status);
    console.log("Action ➡️ ", data.echo.action);
    console.log("Name ➡️ ", data.echo.resourceName);
    console.log("Price ➡️ ", data.echo.resourcePrice);
    console.log("--------------------------");

    // Build the alert message
    let msg = "Server response " + `[${timestamp()}]\n`;
    msg += "--------------------------\n";
    msg += "Status ➡️ " + response.status + "\n";
    msg += "Action ➡️ " + (data.echo.action || "N/A") + "\n";
    msg += "Name ➡️ " + (data.echo.resourceName || "N/A") + "\n";
    msg += "Description ➡️ " + (data.echo.resourceDescription || "N/A") + "\n";
    msg += "Availability ➡️ " + (data.echo.resourceAvailable ? "Yes" : "No") + "\n";
    msg += "Price ➡️ " + data.echo.resourcePrice + " " + data.echo.resourcePriceUnit + "\n"; // FIXED: Added price to alert

    alert(msg);
    
    // Optional: Reset form on success
    form.reset();

  } catch (err) {
    console.error("POST error:", err);
    alert("Error: Could not save resource. " + err.message);
  } finally {
    // Re-enable button
    if (submitter) submitter.disabled = false;
  }
}