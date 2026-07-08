// AgeCoin — interaction layer
// No external dependencies. No data is sent anywhere or persisted between
// visits — the "developer console" below only ever holds a file in memory
// for the current browser tab, using the File API (never localStorage).

(function () {
  "use strict";

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var hudNav = document.getElementById("hud-nav");

  if (navToggle && hudNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = hudNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after a nav link is tapped
    hudNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hudNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- developer console (white paper preview) ---------- */
  var devToggle = document.getElementById("devToggle");
  var devPanel = document.getElementById("devPanel");
  var devClose = document.getElementById("devCloseBtn");
  var fileInput = document.getElementById("devFileInput");
  var fileStatus = document.getElementById("devFileStatus");
  var previewBtn = document.getElementById("devPreviewBtn");

  var selectedFileUrl = null;

  function openDevPanel() {
    devPanel.hidden = false;
    devToggle.setAttribute("aria-expanded", "true");
  }

  function closeDevPanel() {
    devPanel.hidden = true;
    devToggle.setAttribute("aria-expanded", "false");
  }

  if (devToggle && devPanel) {
    devToggle.addEventListener("click", function () {
      devPanel.hidden ? openDevPanel() : closeDevPanel();
    });
  }

  if (devClose) {
    devClose.addEventListener("click", closeDevPanel);
  }

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];

      // Release any previously created object URL to avoid memory leaks
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl);
        selectedFileUrl = null;
      }

      if (!file) {
        fileStatus.textContent = "";
        previewBtn.disabled = true;
        return;
      }

      var sizeKb = Math.round(file.size / 1024);
      fileStatus.textContent = "Selected: " + file.name + " (" + sizeKb + " KB)";
      selectedFileUrl = URL.createObjectURL(file);
      previewBtn.disabled = false;
    });
  }

  if (previewBtn) {
    previewBtn.addEventListener("click", function () {
      if (selectedFileUrl) {
        window.open(selectedFileUrl, "_blank", "noopener,noreferrer");
      }
    });
  }
})();
