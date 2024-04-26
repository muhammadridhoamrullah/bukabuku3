(function($) {

  "use strict";

  const tabs = document.querySelectorAll('[data-tab-target]')
  const tabContents = document.querySelectorAll('[data-tab-content]')

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget)
      tabContents.forEach(tabContent => {
        tabContent.classList.remove('active')
      })
      tabs.forEach(tab => {
        tab.classList.remove('active')
      })
      tab.classList.add('active')
      target.classList.add('active')
    })
  });

  // Responsive Navigation with Button

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu-list");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("responsive");
  }

  const navLink = document.querySelectorAll(".nav-link");

  navLink.forEach(n => n.addEventListener("click", closeMenu));

  function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("responsive");
  }

  var initScrollNav = function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('#header').addClass("fixed-top");
    }else{
      $('#header').removeClass("fixed-top");
    }
  }

  $(window).scroll(function() {    
    initScrollNav();
  }); 

  $(document).ready(function(){
    initScrollNav();
    
    Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
    })

    $('#header-wrap').on('click', '.search-toggle', function(e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });


    // close when click off of container
    $(document).on('click touchstart', function (e){
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });

    $('.main-slider').slick({
        autoplay: false,
        autoplaySpeed: 4000,
        fade: true,
        dots: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    }); 

    $('.product-grid').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 999,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 660,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });

    AOS.init({
      duration: 1200,
      once: true,
    })

    jQuery('.stellarnav').stellarNav({
      theme: 'plain',
      closingDelay: 250,
      // mobileMode: false,
    });

  }); // End of a document

  document.querySelector("#show-login").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active")
    console.dir("sudah di click")
    })
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get the username and password from the form
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      
      // Check if the username and password match
      if (localStorage.getItem(username) === password) {
        // Store the logged-in status in local storage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('name', username)
        // Redirect to main application interface
        window.location.href = 'index.html';
      } else {
        alert('Invalid username or password. Please try again.');
      }
    });
    
    document.querySelector(".close-btn").addEventListener("click", function(){
      document.querySelector(".popup").classList.remove("active")
      console.dir("sudah di click")
      });

    document.addEventListener('DOMContentLoaded', function() {
      updateLoginButtonText(); // Call the function when the page loads
  });
  
  function updateLoginButtonText() {
      var isLoggedIn = localStorage.getItem('isLoggedIn');
  
      // Get the button element
      var loginButton = document.getElementById('show-login');
  
      // If isLoggedIn is true, change the button text to "Logout", else change it to "Login"
      if (isLoggedIn === 'true') {
          loginButton.textContent = 'Logout';
      } else {
          loginButton.textContent = 'Login';
      }
  }
  
  document.getElementById('show-login').addEventListener('click', function() {
    // Clear the logged-in status from local storage
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if(isLoggedIn == 'true'){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name')
    // Redirect to login page
    window.location.href = 'index.html';
  }
  
  
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Get the username from local storage
    var username = localStorage.getItem('name');
    console.dir(username)
    // Check if the username exists
    if (username) {
        // Display the greeting message
        document.getElementById('greeting').textContent = 'Hi, ' + username + '!';
    } else {
        // If the username doesn't exist, display a default message
        document.getElementById('greeting').textContent = 'Hi there!';
    }
});

var addToCartButtons = document.querySelectorAll('.add-to-cart');

// Loop through each "Add to Cart" button and attach a click event listener
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the details of the product being added to the cart
        var product = this.closest('.product-item');
        var productName = product.querySelector('h3').textContent;
        var productPrice = product.querySelector('.item-price').textContent;
        var hargaBarang = Number(localStorage.getItem('hargaBarang'))
        function getHarga(productPrice){
          let tampung = ''
          for(let i =2; i<productPrice.length; i++){
            console.log(productPrice[i])
            if(productPrice[i] === '.'){
              break
            }else{
              tampung += productPrice[i]
            }
          }
          console.log('masok')
          
          return Number(tampung)
        }
        var hasilHarga = getHarga(productPrice) + Number(hargaBarang)
        localStorage.setItem('hargaBarang', hasilHarga)
        // You can perform additional actions here, such as adding the product to a shopping cart object or storing it in local storage
        document.getElementById('harga').textContent = hasilHarga
        localStorage.setItem('product' , productName)
        
        // For demonstration purposes, let's just log the product details to the console
       
    });
});

document.addEventListener('DOMContentLoaded',function(){
  
  localStorage.setItem('hargaBarang', 0)
})

document.querySelector("#show-cart").addEventListener("click", function(){
  document.querySelector(".popcart").classList.add("active")
  console.dir("sudah di click")
  })

  document.querySelector(".tutup-btn").addEventListener("click", function(){
    document.querySelector(".popcart").classList.remove("active")
    console.dir("sudah di click")
    });


    document.addEventListener("DOMContentLoaded", function() {
      // Find all "Add to Cart" buttons
      var addToCartButtons = document.querySelectorAll(".add-to-cart");
  
      // Add event listener to each button
      addToCartButtons.forEach(function(button) {
          button.addEventListener("click", function() {
              // Get product details
              var productItem = button.closest(".product-item");
              var title = productItem.querySelector("h3").textContent;
              var author = productItem.querySelector("span").textContent;
              var price = parseFloat(productItem.querySelector(".item-price").textContent.replace('$', ''));
  
              // Add item to cart table
              addItemToCartTable(title, author, price);
  
              // Update total price
              updateTotalPrice();
          });
      });
  
      // Function to add item to cart table
      function addItemToCartTable(title, author, price) {
          // Find the table body
          var tbody = document.querySelector(".popcart table tbody");
  
          // Create a new row
          var newRow = document.createElement("tr");
  
          // Create cells for item details
          var titleCell = document.createElement("td");
          titleCell.textContent = title;
          var authorCell = document.createElement("td");
          authorCell.textContent = author;
          var priceCell = document.createElement("td");
          priceCell.textContent = '$' + price.toFixed(2);
  
          // Create a delete button
          var deleteButtonCell = document.createElement("td");
          var deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("delete-button");
          deleteButton.addEventListener("click", function() {
              // Remove the row when delete button is clicked
              newRow.remove();
              // Update total price after deletion
              updateTotalPrice();
          });
          deleteButtonCell.appendChild(deleteButton);
  
          // Append cells to the new row
          newRow.appendChild(titleCell);
          newRow.appendChild(authorCell);
          newRow.appendChild(priceCell);
          newRow.appendChild(deleteButtonCell);
  
          // Append the new row to the table body
          tbody.appendChild(newRow);
      }
  
      // Function to update total price
      function updateTotalPrice() {
          var totalPrice = 0;
          var priceCells = document.querySelectorAll(".popcart table tbody td:nth-child(3)"); // Select price cells
          priceCells.forEach(function(cell) {
              totalPrice += parseFloat(cell.textContent.replace('$', ''));
          });
  
          // Display total price
          var totalPriceElement = document.querySelector(".popcart .total-price");
          if (totalPriceElement) {
              totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
          } else {
              // Create total price element if it doesn't exist
              totalPriceElement = document.createElement("div");
              totalPriceElement.classList.add("total-price");
              totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
              document.querySelector(".popcart").appendChild(totalPriceElement);
          }
      }
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.getElementById("submit-review");
    var reviewsContainer = document.getElementById("reviews-container");
    
    submitButton.addEventListener("click", function() {
      let username = localStorage.getItem('name')
      if(!username){
        return alert('Login terlebih dahulu')
      }
        if(document.getElementById("judul-buku").value.length == 0){
          return alert('Judul buku mohon diisi')
        }      
        if(document.getElementById("review-buku").value.length == 0){
          return alert('Review mohon diisi')
        }
        var bookName = document.getElementById("judul-buku").value;
        var review = document.getElementById("review-buku").value;
        
        
        // Save the review data to local storage
        saveReviewToLocalStorage(bookName, review);
        
        // Display the review
        var reviewElement = document.createElement("div");
        reviewElement.classList.add("col-md-4"); // Set column width
        reviewElement.classList.add("review"); // Add review class for styling
        reviewElement.textContent = "Review for " + bookName + ": " + review;
        reviewsContainer.appendChild(reviewElement);
        
        // Clear input fields after submission
        document.getElementById("judul-buku").value = "";
        document.getElementById("review-buku").value = "";
      });
      
      // Function to save review data to local storage
      function saveReviewToLocalStorage(bookName, review) {
        // Retrieve existing review data from local storage
        var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        
        // Add new review to the array
        existingReviews.push({ bookName: bookName, review: review });
        
        // Save the updated review data back to local storage
        localStorage.setItem("reviews", JSON.stringify(existingReviews));
      }
      
      // Function to display review data from local storage
      function displayReviewsFromLocalStorage() {
        // Retrieve review data from local storage
        var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        
        var username = localStorage.getItem('name')
        // Display each review
        existingReviews.forEach(function(item) {
            var reviewElement = document.createElement("div");
            reviewElement.classList.add("col-md-4"); // Set column width
            reviewElement.classList.add("review"); // Add review class for styling
            reviewElement.textContent = `${username} review for ${item.bookName} : ${item.review}` 
            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Display existing reviews when the page loads
    displayReviewsFromLocalStorage();
});


  

})(jQuery);


