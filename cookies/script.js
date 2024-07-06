// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 1,
  intervalId,
  transformValue = 60;
  maxValue = 13;

// Function to set increment and transform values based on screen width
const setValues = () => {
  if (window.innerWidth <= 768) {
    transformValue = 90; // Adjust this value as needed for mobile screens
    maxValue = 24;
  } else {
    transformValue = 60; // Default value for larger screens
    maxValue = 14;
  }
};

// Call setValues function on page load
setValues();

// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 2 seconds
  intervalId = setInterval(() => slideImage(++imageIndex), 2000);
};
// Call autoSlide function on page load
autoSlide();

// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the updated image index
  imageIndex = imageIndex === maxValue ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * transformValue}%)`;
};

// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow
  clearInterval(intervalId);
  // Calculate the updated image index based on the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  // Restart the automatic slideshow
  autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);

// Add resize event listener to window to update values on screen resize
window.addEventListener("resize", () => {
  setValues();
  slideImage();
});
