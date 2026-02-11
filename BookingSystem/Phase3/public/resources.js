// ===============================
// 1) DOM references & State
// ===============================
const actions = document.getElementById("resourceActions");
const resourceNameCnt = document.getElementById("resourceNameCnt");
const resourceDescriptionCnt = document.getElementById("resourceDescriptionCnt");

const role = "admin"; // "reserver" | "admin"

// Global references so validation can access them
let createButton = null;
let updateButton = null;
let deleteButton = null;

// Validation status
let resourceNameValid = false;
let resourceDescriptionValid = false;

// ===============================
// 2) Button creation helpers
// ===============================

const BUTTON_BASE_CLASSES = "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out";
const BUTTON_ENABLED_CLASSES = "bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";

function addButton({ label, type = "button", value, classes = "" }) {
  const btn = document.createElement("button");
  btn.type = type;
  btn.textContent = label;
  btn.name = "action";
  if (value) btn.value = value;

  btn.className = `${BUTTON_BASE_CLASSES} ${classes}`.trim();
  actions.appendChild(btn);
  return btn;
}

/**
 * Updates the visual and functional state of a button
 */
function setButtonEnabled(btn, enabled) {
  if (!btn) return;

  btn.disabled = !enabled;
  btn.classList.toggle("cursor-not-allowed", !enabled);
  btn.classList.toggle("opacity-50", !enabled);

  // Toggle hover state
  if (enabled) {
    btn.classList.add("hover:bg-brand-dark/80");
  } else {
    btn.classList.remove("hover:bg-brand-dark/80");
  }
}

/**
 * Central function to sync all buttons with current validation state
 */
function updateAllButtonsState() {
  const isValid = resourceNameValid && resourceDescriptionValid;
  
  setButtonEnabled(createButton, isValid);
  setButtonEnabled(updateButton, isValid);
  setButtonEnabled(deleteButton, isValid);
}

function renderActionButtons(currentRole) {
  // Clear existing buttons if any
  actions.innerHTML = "";

  if (currentRole === "reserver" || currentRole === "admin") {
    createButton = addButton({
      label: "Create",
      type: "submit",
      value: "create",
      classes: BUTTON_ENABLED_CLASSES,
    });
  }

  if (currentRole === "admin") {
    updateButton = addButton({
      label: "Update",
      type: "submit", // Usually submit if part of the same form
      value: "update",
      classes: BUTTON_ENABLED_CLASSES,
    });

    deleteButton = addButton({
      label: "Delete",
      type: "submit",
      value: "delete",
      classes: "bg-red-500 text-white hover:bg-red-600 shadow-soft",
    });
  }

  updateAllButtonsState();
}

// ===============================
// 3) Input creation + validation
// ===============================

function createResourceNameInput(container) {
  const input = document.createElement("input");
  input.id = "resourceName";
  input.name = "resourceName";
  input.type = "text";
  input.placeholder = "e.g., Meeting Room A";
  input.className = `mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 transition-all duration-200 ease-out`;

  container.appendChild(input);
  return input;
}

function createResourceDescriptionArea(container) {
  const textarea = document.createElement("textarea");
  textarea.id = "resourceDescription";
  textarea.name = "resourceDescription";
  textarea.rows = 5;
  textarea.placeholder = "Describe location, capacity, etc...";
  textarea.className = `mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 transition-all duration-200 ease-out`;

  container.appendChild(textarea);
  return textarea;
}

function isResourceNameValid(value) {
  const trimmed = value.trim();
  const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ]+$/;
  return trimmed.length >= 5 && trimmed.length <= 30 && allowedPattern.test(trimmed);
}

function isResourceDescriptionValid(value) {
  const trimmed = value.trim();
  // Simplified pattern to allow basic punctuation
  const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ><!\?\-\+\/\\.,;:\(\)]+$/;
  return trimmed.length >= 10 && trimmed.length <= 50 && allowedPattern.test(trimmed);
}

function setInputVisualState(input, state) {
  input.classList.remove(
    "border-green-500", "bg-green-50", "border-red-500", "bg-red-50"
  );

  if (state === "valid") {
    input.classList.add("border-green-500", "bg-green-50");
  } else if (state === "invalid") {
    input.classList.add("border-red-500", "bg-red-50");
  }
}

function attachValidation(input, validationFn, type) {
  const update = () => {
    const raw = input.value;
    if (raw.trim() === "") {
      setInputVisualState(input, "neutral");
      if (type === "name") resourceNameValid = false;
      if (type === "desc") resourceDescriptionValid = false;
    } else {
      const isValid = validationFn(raw);
      if (type === "name") resourceNameValid = isValid;
      if (type === "desc") resourceDescriptionValid = isValid;
      setInputVisualState(input, isValid ? "valid" : "invalid");
    }
    updateAllButtonsState();
  };

  input.addEventListener("input", update);
  update();
}

// ===============================
// 4) Bootstrapping
// ===============================
renderActionButtons(role);

const nameInput = createResourceNameInput(resourceNameCnt);
attachValidation(nameInput, isResourceNameValid, "name");

const descInput = createResourceDescriptionArea(resourceDescriptionCnt);
attachValidation(descInput, isResourceDescriptionValid, "desc");