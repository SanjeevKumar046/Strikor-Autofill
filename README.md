
# ⚡ Strikor Autofill

Strikor Autofill is a Chrome extension that automatically fills out specific fields on a ServiceNow Incident page. Designed to speed up repetitive data entry tasks for ITSM workflows, it populates fields like contact number, assignment group, and location with predefined values — all triggered with a keyboard shortcut.




## 🚀 Features

- Autofills commonly-used fields on a ServiceNow Incident form:

    - Contact Number
    - Contact Type
    - Incidnt State
    - Assignment Group
    - Assigned To
    - Location

- Works instantly with the `Alt+S` keyboard shortcut.
- Uses intelligent waiting to detect elements before interacting
- Simple, background-triggered script — no UI required.
## 🛠 Installation
1. Clone or download this repository.
2. Open Chrome or Edge and go to `chrome://extensions` or `edge://extensions`.
3. Enable Developer Mode.
4. Click "Load unpacked" and select the extension directory.
5. Once loaded, you'll see Strikor Autofill in your extensions list.
## ⚙️ Configuration
Currently, field values are hardcoded in content.js. To customize:

- Open content.js

- Modify the values inside `fillIncidentForm()`:
    ```
    contactNumberInput.value = "YOUR_NUMBER_HERE";
    ...
    fillReferenceField('#sys_display\\.incident\\.assignment_group', "YOUR_GROUP");
    ```
## 💡 Usage
1. Navigate to a ServiceNow Incident page.

2. Press Alt + S to trigger autofill.

3. The aforementioned fields will be automatically populated.
> If a field is read-only or doesn't appear within 20 seconds, it's skipped with a warning in the console.
## 📬 Support
For questions, feedback, or suggestions, please open an issue.
