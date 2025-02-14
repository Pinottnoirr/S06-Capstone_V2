const footerHTML = `
<footer class="footer">
    <p>Collab By:</p>
    <img src="public/Assets/Logos/constellar.png" alt="Constellar-Logo" class="footer-logo" />
    <img src="public/Assets/Logos/SUTD.webp" alt="SUTD-Logo" class="footer-logo" />
    <img src="public/Assets/Logos/Blue-Acres.avif" alt="BlueAcres-Logo" class="footer-logo" />
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("footer-container").innerHTML = footerHTML;
});
