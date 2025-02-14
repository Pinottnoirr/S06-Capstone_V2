const slideContents = {
          1: {
              practices_content: "We believe that sustainability starts right from the food source to the table and beyond. This is why we work with catering partners who advocate seasonal and locally harvested produce to reduce food miles and carbon emissions.",
          },
          2: {
              practices_content: "MICE venues such as EXPO can do more, by contributing to the local food production as well. By partnering with BlueAcres SG, a 2024 Impact Enterprise of the Year SME award winner, we have begun growing local produce right on site. In this way, we hope to be an exemplary example of a Circular Economy.",
          },
          3: {
              practices_content: "Beyond employing today's methods of vertical farming, EXPO seeks to be a pioneer of vertical farming methods at MICE venues. We currently work with students from SUTD to develop an automation driven vertical farming system that brings about greater potential to food sustainability, a valuable advancement in modern farming methods.",
          },
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
    document.querySelector('.practices-content p').textContent = content.practices_content;
    
    const detailsList = document.querySelector('.details-list');
    detailsList.innerHTML = content.details_list
        .map(item => `<li>${item}</li>`)
        .join('');
}