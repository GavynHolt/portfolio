document.addEventListener('DOMContentLoaded', () => {
  // Cache selectors
  const navLinks = document.querySelectorAll('.navLink');

  // Scroll event listener for side nav (updates black circle on active section)
  document.addEventListener('scroll', () => {
    // Get scroll position and height of Nav for offset
    const currentScrollY = window.scrollY;
    const navHeightOffset = document.querySelector('.nav').offsetHeight;

    // const navLinks = document.querySelectorAll('.navLink');

    for ([index, link] of navLinks.entries()) {
      const hrefElementPosition = document.querySelector(link.attributes.href.value).offsetTop;

      if (currentScrollY >= hrefElementPosition - navHeightOffset) {
        link.classList.add('active');
        for ([removeIndex, link] of navLinks.entries()) {
          if (removeIndex !== index) {
            navLinks[removeIndex].classList.remove('active');
          }
        }
      }
    }
  });

  // Hamburger menu Event listener
  const hamburgerButton = document.querySelector('.hamburger');
  hamburgerButton.addEventListener('click', () => {
    const navLinksContainer = document.querySelector('.nav-links-container');
    const navBar = document.querySelector('.fa-bars');
    const navClose = document.querySelector('.fa-times');
    if (!navLinksContainer.classList.contains('showNav')) {
      navLinksContainer.classList.add('showNav');
      navBar.classList.add('hide');
      navClose.classList.remove('hide');
    } else {
      navLinksContainer.classList.remove('showNav');
      navBar.classList.remove('hide');
      navClose.classList.add('hide');
    }
  });

  // Close Hamburger on anchor tag click event listener
  for (link of navLinks) {
    link.addEventListener('click', () => {
      const navLinksContainer = document.querySelector('.nav-links-container');
      const navBar = document.querySelector('.fa-bars');
      const navClose = document.querySelector('.fa-times');
      navLinksContainer.classList.remove('showNav');
      navBar.classList.remove('hide');
      navClose.classList.add('hide');
    });
  }
});
