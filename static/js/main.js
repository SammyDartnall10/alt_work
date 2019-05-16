
/* found example of star rating here: https://codepen.io/alisuarez/pen/RWGNLm */

/*var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
  return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});*/

/*
<h1>jQuery Example</h1>
<p><input type=text size=5 name=a> +
   <input type=text size=5 name=b> =
   <span id=result>?</span>
<p><a href=# id=calculate>calculate server side</a>

from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)

@app.route('/')
def index():
    return render_template('index.html')
    
--------------------------------------------------------------------------------


$(function(){
    var data;
    $.ajax({
        type: "GET",
        url: $SCRIPT_ROOT + "/get_data",
        dataType: "json",
        timeout: 120000,
        error: errorHandlier,
        success: function(r){
            data = r.data;
        }
    });
    setTimeout(function(){
        if(data != null){
            /* whatever you want to do using the results */
            /* For example using above API, */ 
            /*
            alert("Hello "+data[0].firstname+" "+data[0].lastname);
        }
        else{
            setTimeout(arguments.callee, 100);
        }
    }
});
*/


$(".dropdown-search").on("click", function() {
    var location = document.getElementById('type-select').value;
    window.location = "https://alt-work-sammydartnall.c9users.io/view_all/"+location;
    
});