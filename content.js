console.log("Injected content.js: attempting autofill...");

/* ===============================
      USER-CONFIGURABLE VALUES
   =============================== */
const autofillValues = {
  contactNumber: "03327775712",
  contactType: "email",
  state: "3", // 1 = Open, 2 = In Progress, 3 = On Hold, etc.
  assignmentGroup: "MSHS-Linux",
  assignedTo: "Sanjeev Kumar",
  location: "157 East 72st  FPA-OBGYN"
};

/* ===============================
     Core Logic Below (Don't Edit)
   =============================== */

function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let waited = 0;

    const checkExist = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkExist);
        resolve(element);
      } else if (waited >= timeout) {
        clearInterval(checkExist);
        reject(new Error(`Timeout waiting for selector: ${selector}`));
      }
      waited += interval;
    }, interval);
  });
}

function fillReferenceField(selector, value) {
  const input = document.querySelector(selector);
  if (!input) return;

  input.focus();
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "ArrowDown" }));

  setTimeout(() => {
    const dropdownItems = document.querySelectorAll('.ac_results li');
    for (let item of dropdownItems) {
      if (item.innerText.toLowerCase().includes(value.toLowerCase())) {
        item.click();
        break;
      }
    }
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, 800);
}

function fillIncidentForm() {
  waitForElement('#incident\\.u_caller_contact_number', 20000)
    .then(contactNumberInput => {
      console.log("✅ Contact number found");

      // 1. Contact Number
      contactNumberInput.focus();
      contactNumberInput.value = autofillValues.contactNumber;
      contactNumberInput.dispatchEvent(new Event("input", { bubbles: true }));
      contactNumberInput.dispatchEvent(new Event("change", { bubbles: true }));

      // 2. Contact Type
      const contactType = document.querySelector('#incident\\.contact_type');
      if (contactType && !contactType.disabled) {
        contactType.value = autofillValues.contactType;
        contactType.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        console.warn("⚠️ Contact Type is read-only or disabled — skipping");
      }

      // 3. State
      const stateDropdown = document.querySelector('#incident\\.state');
      if (stateDropdown) {
        stateDropdown.value = autofillValues.state;
        stateDropdown.dispatchEvent(new Event("change", { bubbles: true }));
      }

      // 4–6: Reference Fields
      fillReferenceField('#sys_display\\.incident\\.assignment_group', autofillValues.assignmentGroup);
      fillReferenceField('#sys_display\\.incident\\.assigned_to', autofillValues.assignedTo);
      fillReferenceField('#sys_display\\.incident\\.location', autofillValues.location);
    })
    .catch(err => {
      console.warn("Contact number field never appeared ❌", err);
    });
}

fillIncidentForm();
