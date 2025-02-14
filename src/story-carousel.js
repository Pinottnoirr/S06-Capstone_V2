
console.log('story carousel script loaded');
const slideContents = {
          1: {
              practices_title: "RESPONSIBLE FOOD PRACTICES",
              practices_content: "We believe that sustainability starts right from the food source to the table and beyond. This is why we work with catering partners who advocate seasonal and locally harvested produce to reduce food miles and carbon emissions.",
              details_list: [
                  "Farm to Table Practices",
                  "Close partnerships with F&B Partners",
                  "Eco Friendly cutlery and packaging for our F&B Products"
              ]
          },
          2: {
              practices_title: "VERTICAL FARMING ON SITE",
              practices_content: "MICE venues such as EXPO can do more, by contributing to the local food production as well. By partnering with BlueAcres SG, a 2024 Impact Enterprise of the Year SME award winner, we have begun growing local produce right on site. In this way, we hope to be an exemplary example of a Circular Economy.",
              details_list: [
                  "Rooftop farming",
                  "Indoor farming"
              ]
          },
          3: {
              practices_title: "AUTOMATED FARMING SYSTEM",
              practices_content: "Beyond employing today's methods of vertical farming, EXPO seeks to be a pioneer of vertical farming methods at MICE venues. We currently work with students from SUTD to develop an automation driven vertical farming system that brings about greater potential to food sustainability, a valuable advancement in modern farming methods.",
              details_list: [
                  "Time savings",
                  "Reduced labour costs",
                  "Ability to scale harvest yield"
              ]
          },
          4: {
              practices_title: "PLAY YOUR PART",
              practices_content: "We believe every action counts in building a sustainable future. Support food sustainability by choosing locally-sourced catering, reducing food waste, and embracing plant-based options at our events. Together, we can make a difference - one meal at a time. Let's creaete events that nourish both people and the planet.",
              details_list: [
                  "Prioritise locally sourced ingredients",
                  "Avoid animal-based food as they emit lost of Greenhouse gases (GHG)",
                  "Plant-based food emit for lesser GHG",
                  "Seafood products carrying the MSC or ASC eco-labels are preferred"
              ]
          }
      };

let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].classList.add("active");
    
    const content = slideContents[slideIndex];
    
    // Update practices section
    document.querySelector('.practices-section h3').textContent = content.practices_title;
    document.querySelector('.practices-content p').textContent = content.practices_content;
    
    const detailsList = document.querySelector('.details-list');
    detailsList.innerHTML = content.details_list
        .map(item => `<li>${item}</li>`)
        .join('');
}