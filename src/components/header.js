const headerHTML = `
<div class="header-left">
    <div class="mascot-container">
        <a href="../">
            <img src="public/Assets/Components/mascots.png" alt="Mascot Characters" class="mascot"> 
        </a>
    </div>
    <div class="title-container">
        <img src="public/Assets/Components/vertical-farming.png" alt="Vertical Farming" class="title-image">
    </div>
</div>
<div id="navbar-container"></div> <!-- Navbar will be injected here -->
`;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("header-container").innerHTML = headerHTML;
});
