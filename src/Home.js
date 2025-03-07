// Countdown Timer Enhancement
function updateCountdown() {
    const dayEl = document.querySelector('.countdown .time-segment:nth-child(1) .time');
    const hourEl = document.querySelector('.countdown .time-segment:nth-child(2) .time');
    const minuteEl = document.querySelector('.countdown .time-segment:nth-child(3) .time');
    const secondEl = document.querySelector('.countdown .time-segment:nth-child(4) .time');
  
    // Initialize countdown time values
    let countdownTime = { d: 3, h: 23, m: 19, s: 56 };
  
    // Calculate total seconds remaining
    let totalSeconds =
      countdownTime.d * 86400 +
      countdownTime.h * 3600 +
      countdownTime.m * 60 +
      countdownTime.s;
  
    function updateTimer() {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        return;
      }
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      if (dayEl) dayEl.textContent = days.toString().padStart(2, '0');
      if (hourEl) hourEl.textContent = hours.toString().padStart(2, '0');
      if (minuteEl) minuteEl.textContent = minutes.toString().padStart(2, '0');
      if (secondEl) secondEl.textContent = seconds.toString().padStart(2, '0');
  
      totalSeconds--;
    }
  
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
  }
  
  // Cart Functionality Enhancement
  function initCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productContainer = this.closest('.product-card, .flash-product');
        if (!productContainer) return;
        const productName = productContainer.querySelector('h3')?.textContent || 'Product';
        const productPrice = productContainer.querySelector('.price')?.textContent || '';
        alert(`Added to cart:\n${productName}\n${productPrice}`);
      });
    });
  }
  
  // Subscribe Form Enhancement
  function initSubscribeForm() {
    const subscribeForm = document.querySelector('footer form.subscribe-form');
    if (!subscribeForm) return;
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        alert(`Subscribed with email: ${emailInput.value.trim()}`);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address');
      }
    });
  }
  
  // Account Dropdown Toggle
  function initAccountDropdown() {
    const accountIcon = document.getElementById('accountIcon');
    const accountDropdown = document.getElementById('accountDropdown');
    if (accountIcon && accountDropdown) {
      accountIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        accountDropdown.style.display = accountDropdown.style.display === 'block' ? 'none' : 'block';
      });
      document.addEventListener('click', function() {
        if (accountDropdown.style.display === 'block') {
          accountDropdown.style.display = 'none';
        }
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    initCart();
    initSubscribeForm();
    initAccountDropdown();
  });
  