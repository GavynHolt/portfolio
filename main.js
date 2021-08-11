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

  // Function to clear form on closeModal()
  const clearForm = () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  };
  // Handle Form Submit
  const contactForm = document.querySelector('form');

  handleSubmit = (e) => {
    e.preventDefault();
    // cache some selectors
    const modalRoot = document.querySelector('.modalRoot');

    const ESCKeydownToClose = (e) => {
      if (e.key.toLowerCase() === 'escape') {
        closeModal();
      }
    };

    const closeModal = () => {
      const modalButton = modalRoot.querySelector('.button-link');
      modalButton.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', ESCKeydownToClose);
      modalRoot.querySelector('.modal').remove();
      modalRoot.classList.remove('active');
      clearForm();
    };

    const formData = new FormData(contactForm);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        modalRoot.classList.add('active');
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
          <h3>Message received!</h3>
          <p>Thanks so much for your message. I'll get back to you soon.</p>
          <button class="button-link">Close</button>
        `;
        modalRoot.appendChild(modal);
        const modalButton = modal.querySelector('.button-link');
        // Event listener for close button click
        modalButton.addEventListener('click', closeModal);
        // Event listener for ESC keydown
        document.addEventListener('keydown', ESCKeydownToClose);
      })
      .catch((error) => {
        modalRoot.classList.add('active');
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
          <h3>Message failed to send.</h3>
          <p>Unfortunately an error occurred:</p>
          <p>${error.message}</p>
          <p>Please try again later or send me an email directly instead.</p>
          <button class="button-link">Close</button>
        `;
        modalRoot.appendChild(modal);
        const modalButton = modalRoot.querySelector('.button-link');
        // Event listener for close button click
        modalButton.addEventListener('click', closeModal);
        // Event listener for ESC keydown
        document.addEventListener('keydown', ESCKeydownToClose);
      });
  };
  contactForm.addEventListener('submit', handleSubmit);
});
