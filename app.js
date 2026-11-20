
document.addEventListener("DOMContentLoaded", function () {

    const toField = document.getElementById("to");
    const ccField = document.getElementById("cc");
    const subjectField = document.getElementById("subject");
    const bodyField = document.getElementById("body");

    const mobileButton = document.getElementById("mobile-button");
    const pcButton = document.getElementById("pc-button");
    const status = document.getElementById("status");

    // पूर्वनियोजित ई-मेल माहिती दाखवा
    toField.value = EMAIL_TEMPLATE.to.join(", ");
    ccField.value = EMAIL_TEMPLATE.cc.join(", ");
    subjectField.value = EMAIL_TEMPLATE.subject;
    bodyField.value = EMAIL_TEMPLATE.body;

    function openEmailApp(device) {

        const to = EMAIL_TEMPLATE.to.join(",");
        const cc = EMAIL_TEMPLATE.cc.join(",");
        const subject = encodeURIComponent(EMAIL_TEMPLATE.subject);
        const body = encodeURIComponent(EMAIL_TEMPLATE.body);

        const mailtoLink =
            "mailto:" + to +
            "?cc=" + encodeURIComponent(cc) +
            "&subject=" + subject +
            "&body=" + body;

        status.textContent =
            device + " ई-मेल ॲप उघडण्याचा प्रयत्न सुरू आहे...";

        window.location.href = mailtoLink;
    }

    mobileButton.addEventListener("click", function () {
        openEmailApp("मोबाईल");
    });

    pcButton.addEventListener("click", function () {
        openEmailApp("संगणक");
    });

});
