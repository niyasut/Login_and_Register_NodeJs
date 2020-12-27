const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function mm(){
alert('hi')
}

  

  $(document).ready(function(){

    // Search all columns
    $('#txt_searchall').keyup(function(){
      // Search Text
      var search = $(this).val();
  
      // Hide all table tbody rows
      $('table tbody tr').hide();
  
      // Count total search result
      var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;
  
      if(len > 0){
        // Searching text in columns and show match row
        $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
          $(this).closest('tr').show();
        });
      }else{
        $('.notfound').show();
      }
  
    });
  
    // Search on name column only
    $('#txt_name').keyup(function(){
      // Search Text
      var search = $(this).val();
  
      // Hide all table tbody rows
      $('table tbody tr').hide();
  
      // Count total search result
      var len = $('table tbody tr:not(.notfound) td:nth-child(2):contains("'+search+'")').length;
  
      if(len > 0){
        // Searching text in columns and show match row
        $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
           $(this).closest('tr').show();
        });
      }else{
        $('.notfound').show();
      }
  
    });
  
  });
  
  // Case-insensitive searching (Note - remove the below script for Case sensitive search )
  $.expr[":"].contains = $.expr.createPseudo(function(arg) {
     return function( elem ) {
       return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
     };
  });