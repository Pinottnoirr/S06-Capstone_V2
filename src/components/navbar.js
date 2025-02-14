const navbarHTML = `
<nav class="navbar">
    <ul>
        <li><a href="about.html" class="nav-link">About us</a></li>
        <li><a href="ar.html" class="nav-link">Augmented Reality</a></li>
        <li><a href="story.html" class="nav-link">Our Story</a></li>
    </ul>
</nav>
`;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("navbar-container").innerHTML = navbarHTML;
});
