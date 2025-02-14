// src/components/about.js

export class AboutPage {
          constructor() {
              this.init();
          }
      
          init() {
              this.setupScrollAnimations();
              this.setupImageLoading();
              this.setupTeamInteractions();
          }
      
          setupScrollAnimations() {
              // Add smooth reveal animations when scrolling to sections
              const sections = document.querySelectorAll('.about-header, .reason-section, .team-section');
              
              const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                      if (entry.isIntersecting) {
                          entry.target.classList.add('visible');
                      }
                  });
              }, { threshold: 0.1 });
      
              sections.forEach(section => {
                  section.classList.add('fade-in');
                  observer.observe(section);
              });
          }
      
          setupImageLoading() {
              // Handle lazy loading and loading states for images
              const images = document.querySelectorAll('.circular-image img, .team-photo img');
              
              images.forEach(img => {
                  img.addEventListener('load', () => {
                      img.classList.add('loaded');
                  });
              });
          }
      
          setupTeamInteractions() {
              // Add interactive elements for team section
              const teamMembers = document.querySelectorAll('.team-info p');
              
              teamMembers.forEach(member => {
                  member.addEventListener('mouseover', () => {
                      member.classList.add('highlight');
                  });
                  
                  member.addEventListener('mouseout', () => {
                      member.classList.remove('highlight');
                  });
              });
          }
      }
      
      // Initialize the about page functionality
      document.addEventListener('DOMContentLoaded', () => {
          new AboutPage();
      });