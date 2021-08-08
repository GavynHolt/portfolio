document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');

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
});
