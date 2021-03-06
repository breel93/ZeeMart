
$(document).ready(function(){

    // Auto Search
  var searchForm = $(".search-form")
  var searchInput = searchForm.find("[name='q']") // input name='q'
  var typingTimer;
  var typingInterval = 500 // .5 seconds
  var searchBtn = searchForm.find("[type='submit']")
  searchInput.keyup(function(event){
      // key released
  clearTimeout(typingTimer)
  typingTimer = setTimeout(perfomSearch, typingInterval)
  })
  searchInput.keydown(function(event){
      // key pressed
  clearTimeout(typingTimer)
  })
  function displaySearching(){
      searchBtn.addClass("disabled")
      searchBtn.html("<i class='fa fa-spin fa-spinner'></i> Searching...")
  }
  function perfomSearch(){
      displaySearching()
      var query = searchInput.val()
      setTimeout(function(){
        window.location.href='/search/?q=' + query
      }, 1000)
      
  }




  var productForm = $(".form-product-ajax") // #form-product-ajax
  productForm.submit(function(event){
      event.preventDefault();
      // console.log("Form is not sending")
      var thisForm = $(this)
      // var actionEndpoint = thisForm.attr("action"); // API Endpoint
      var actionEndpoint = thisForm.attr("data-endpoint")
      var httpMethod = thisForm.attr("method");
      var formData = thisForm.serialize();
      $.ajax({
        url: actionEndpoint,
        method: httpMethod,
        data: formData,
        success: function(data){
          var submitSpan = thisForm.find(".submit-span")
          if (data.added){
            submitSpan.html("In cart <button type='submit' class='btn btn-link btn-sm float-right'>Remove?</button>")
          } else {
            submitSpan.html("<button type='submit' class='btn btn-outline-primary btn-sm float-right'>Add to cart</button>")
           }
          var navbarCount = $(".navbar-cart-count")
          navbarCount.text(data.cartItemCount)
          var currentPath = window.location.href
          if (currentPath.indexOf("cart") != -1) {
            refreshCart()
          }
        },
        error: function(errorData){
          $.alert({
            title: "Oops!",
            content: "An error occurred",
            theme: "modern",
          })
        }
      })
  })



  function refreshCart(){
    console.log("in current cart")
    var cartTable = $(".cart-table")
    var cartBody = cartTable.find(".cart-body")
    //cartBody.html("<h1>Changed</h1>")
    var productRows = cartBody.find(".cart-product")
    var currentUrl = window.location.href
    var refreshCartUrl = '/api/cart/'
    var refreshCartMethod = "GET";
    var data = {};
    $.ajax({
      url: refreshCartUrl,
      method: refreshCartMethod,
      data: data,
      success: function(data){
        
        var hiddenCartItemRemoveForm = $(".cart-item-remove-form")
        if (data.products.length > 0){
            productRows.html(" ")
            i = data.products.length
            $.each(data.products, function(index, value){
              console.log(value)
              var newCartItemRemove = hiddenCartItemRemoveForm.clone()
              newCartItemRemove.css("display", "block")
              // newCartItemRemove.removeClass("hidden-class")
              newCartItemRemove.find(".cart-item-product-id").val(value.id)
               
                  
                   
                cartBody.prepend("<tr><td><figure class='media'> <div class='img-wrap'><img src=' + value.image +' class='img-thumbnail img-sm'> </div><figcaption> <a href='" + value.url + "'>" + value.name + "</a></figcaption></figure></td>  <td><select class='form-control'><option>1</option><option>2</option><option>3</option><option>4</option></td>  <td><div class='price-wrap'><var class='price'> ₦ "+value.price+ "</var> <small class='text-muted'>(Naira each)</small></div></td> <td class='text-right' >"+  newCartItemRemove.html() +"</td> </tr>")
                i --

                // <div class="img-wrap"><img src="{{ product.image.url }}" class="img-thumbnail img-sm"></div>
            })
            
            cartBody.find(".cart-subtotal").text(data.subtotal)
            cartBody.find(".cart-total").text(data.total)
        } else {
          window.location.href = currentUrl
        }
        
      },
      error: function(errorData){
          $.alert({
            title: "Oops!",
            content: "An error occurred",
            theme: "modern",
          })
      }
    })
  }

  var infinite = new Waypoint.Infinite({
    element: $('.infinite-container')[0],
    onBeforePageLoad: function () {
      $('.loading').show();
    },
    onAfterPageLoad: function ($items) {
      $('.loading').hide();
    }
  });


})