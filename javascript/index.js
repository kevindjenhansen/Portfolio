const sections = document.querySelectorAll('section');
let currentSection = 0;
const sectionCount = sections.length;

function goToSection(index) {
  if (index >= 0 && index < sectionCount) {
    sections.forEach((section, idx) => {
      section.style.transition = "transform 1s ease";
      section.style.transform = `translateY(${(idx - index) * 100}vh)`;
    });

    sections[index].style.opacity = 1;

    currentSection = index;
  }
}

document.addEventListener('wheel', function (e) {
  e.preventDefault();
  
  if (e.deltaY > 0 && currentSection < sectionCount - 1) {
    goToSection(currentSection + 1); 
  } else if (e.deltaY < 0 && currentSection > 0) {
    goToSection(currentSection - 1); 
  }
}, { passive: false });

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowDown' && currentSection < sectionCount - 1) {
    goToSection(currentSection + 1);
  } else if (e.key === 'ArrowUp' && currentSection > 0) {
    goToSection(currentSection - 1);
  }
});

const sectionLinks = document.querySelectorAll('.header-right a');

sectionLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    
    const targetIndex = Array.from(sections).indexOf(targetSection);
    
    goToSection(targetIndex);
  });
});

goToSection(0);
