document.addEventListener("DOMContentLoaded", function () {
          const images = [
              {
                  src: "../public/Assets/Components/Story/story1.png",
                  title: "Responsible Food Practices",
                  description: "We believe that sustainability starts right from the food source to the table and beyond. This is why we work with catering partners who advocate seasonal and locally harvested produce to reduce food miles and carbon emissions."
              },
              {
                  src: "../public/Assets/Components/Story/story1.png",
                  title: "Sustainable Sourcing",
                  description: "We prioritize working with suppliers who adhere to ethical and sustainable sourcing practices, ensuring high-quality and eco-friendly food production."
              },
              {
                  src: "../public/Assets/Components/Story/story3.png",
                  title: "Community Engagement",
                  description: "We work closely with local communities to support sustainable initiatives, helping to create a positive impact on the environment."
              },
              {
                  src: "../public/Assets/Components/Story/story4.png",
                  title: "Waste Reduction",
                  description: "Our commitment to sustainability includes reducing food waste through proper planning, portion control, and composting programs."
              }
          ];
      
          let currentIndex = 0;
          const dots = document.querySelectorAll(".nav-dot");
          const mainImage = document.getElementById("mainImage");
          const imageTitle = document.getElementById("imageTitle");
          const imageDescription = document.getElementById("imageDescription");
      
          // Function to update the image and text content
          function updateCarousel(index) {
              if (index < 0 || index >= images.length) return; // Prevent invalid index
      
              mainImage.src = images[index].src;
              imageTitle.textContent = images[index].title;
              imageDescription.textContent = images[index].description;
      
              // Update active dot
              dots.forEach(dot => dot.classList.remove("active"));
              dots[index].classList.add("active");
          }
      
          // Attach event listeners to navigation dots
          dots.forEach(dot => {
              dot.addEventListener("click", function () {
                  currentIndex = parseInt(this.dataset.index); // Get index from data attribute
                  updateCarousel(currentIndex);
              });
          });
      
          // Auto-advance carousel every 5 seconds
          setInterval(() => {
              currentIndex = (currentIndex + 1) % images.length;
              updateCarousel(currentIndex);
          }, 5000);
      
          // Initial load
          updateCarousel(0);
      });
      
      alert("Script is running!");
// End of script