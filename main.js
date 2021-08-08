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
        // remove active class from one index higher and lower, if they exist
        navLinks[index + 1]?.classList.remove('active');
        navLinks[index - 1]?.classList.remove('active');
      }
    }
  });
});
