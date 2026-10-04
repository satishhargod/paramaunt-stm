"use client";

import { useEffect, useState } from "react";
import "../../styles/installapp.scss";

export default function InstallApp() {

  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {

    let deferredPrompt;

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) return;

    // agar already install hai to button mat dikhao
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const handler = (e) => {

      e.preventDefault();
      deferredPrompt = e;

      // first time show
      setShowBtn(true);

      // show/hide cycle
      setInterval(() => {

        setShowBtn(true);

        setTimeout(() => {
          setShowBtn(false);
        }, 60000); // 1 min show

      }, 180000); // 3 min cycle

      const btn = document.getElementById("installBtn");

      if (btn) {

        btn.onclick = () => {

          deferredPrompt.prompt();

          deferredPrompt.userChoice.then((choiceResult) => {

            if (choiceResult.outcome === "accepted") {

              // install ho gaya → permanently hide
              localStorage.setItem("appInstalled", "true");
              setShowBtn(false);

            }

            deferredPrompt = null;

          });

        };

      }

    };

    window.addEventListener("beforeinstallprompt", handler);

    // agar pehle install ho chuka hai
    if (localStorage.getItem("appInstalled") === "true") {
      setShowBtn(false);
    }

  }, []);

  if (!showBtn) return null;

  return (

    <button id="installBtn" className="installBtn">
      Install App
    </button>

  );

}