
document.addEventListener("DOMContentLoaded", function () {

    // Get HTML elements
    const toField = document.getElementById("to");
    const ccField = document.getElementById("cc");
    const subjectField = document.getElementById("subject");
    const bodyField = document.getElementById("body");

    const mobileButton = document.getElementById("mobile-button");
    const pcButton = document.getElementById("pc-button");
    const status = document.getElementById("status");

    // Check required elements
    if (
        !toField ||
        !ccField ||
        !subjectField ||
        !bodyField ||
        !mobileButton ||
        !pcButton
    ) {
        console.error("Required HTML elements not found.");
        return;
    }

    // Generate today's date in Indian format
    const todayDate = new Date().toLocaleDateString("en-GB", {
        timeZone: "Asia/Kolkata"
    });

    // Add today's date after दिनांक :
    const emailBody = EMAIL_TEMPLATE.body.replace(
        "दिनांक :",
        "दिनांक : " + todayDate
    );

    // Fill email details in the portal
    toField.value = EMAIL_TEMPLATE.to.join(", ");
    ccField.value = EMAIL_TEMPLATE.cc.join(", ");
    subjectField.value = EMAIL_TEMPLATE.subject;
    bodyField.value = emailBody;


    // =====================================
    // MOBILE BUTTON
    // Open default mobile email application
    // =====================================

    mobileButton.addEventListener("click", function () {

        const to = EMAIL_TEMPLATE.to.join(",");
        const cc = EMAIL_TEMPLATE.cc.join(",");

        const subject = encodeURIComponent(
            EMAIL_TEMPLATE.subject
        );

        const body = encodeURIComponent(
            emailBody
        );

        const mailtoLink =
            "mailto:" + to +
            "?cc=" + encodeURIComponent(cc) +
            "&subject=" + subject +
            "&body=" + body;

        if (status) {
            status.textContent =
                "मोबाईल ई-मेल ॲप उघडत आहे...";
        }

        window.location.href = mailtoLink;

    });


    // =====================================
    // PC BUTTON
    // Open Gmail Compose in new tab
    // =====================================

    pcButton.addEventListener("click", function () {

        const to = EMAIL_TEMPLATE.to.join(",");
        const cc = EMAIL_TEMPLATE.cc.join(",");

        const subject = EMAIL_TEMPLATE.subject;
        const body = emailBody;

        const gmailURL =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=" + encodeURIComponent(to) +
            "&cc=" + encodeURIComponent(cc) +
            "&su=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        // Open Gmail in a new browser tab
        const newTab = window.open(
            gmailURL,
            "_blank"
        );

        if (newTab) {

            if (status) {
                status.textContent =
                    "Gmail नवीन Tab मध्ये उघडत आहे...";
            }

        } else {

            if (status) {
                status.textContent =
                    "Pop-up Block झाला आहे. Chrome मध्ये Pop-ups Allow करा.";
            }

        }

    });

});
