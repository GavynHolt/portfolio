document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');

  // Scroll event listener for side nav (updates black circle on active section)
  document.addEventListener('scroll', () => {
    // Get scroll position and height of Nav for offset
    const currentScrollY = window.scrollY;
    const navHeightOffset = document.querySelector('.nav').offsetHeight;

    const navLinks = document.querySelectorAll('.navLink');

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
    console.log('click!');
    const navLinksContainer = document.querySelector('.nav-links-container');
    navLinksContainer.classList.toggle('showNav');
    // //add focus to current page section
    // const navLinks = document.querySelectorAll('.navLink');
    // for (link of navLinks) {
    //   if (link.classList.contains('active')) {
    //     link.focus();
    //   }
    // }
  });
});
