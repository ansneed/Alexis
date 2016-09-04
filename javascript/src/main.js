  // Non-jQuery functions
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

// jQuery functions
$(document).ready(function(){
  var container_class = "container-fluid";
  $.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
      }
  });

  var num_pages = 2;
  var pages = [];
  //fillText(story);
  $("body").append(story);
  var curr_first_page = 1;
  var wrap_count = 1;
  // $( window ).resize(function() {
  //     fillText(story);
  // });
  
  function fillText(story){
    divClass = 'box';
    words = story.split(" ");
    count = 1;
    $("."+container_class).append("<div class='box col-md-6' id='page"+count+"'> <p> </p> </div>");
    words.forEach(function(word){
      if (!overflow(document.getElementById("page"+count))){
        $("#page"+count).children('p').append(word + " ");
      }else{
        // para_text = document.getElementById("page"+count).children[0].innerHTML;
        // last_index = para_text.lastIndexOf(" "); 
        // $("#page"+count).children('p').text(para_text.substring(0,last_index));
        pages.push(document.getElementById("page"+count));
        count++;
        $("."+container_class).append("<div class='box col-md-6' id='page"+count+"'> <p> </p> </div>");
        $("#page"+count).children('p').append(word + " ");
      }
    });
    pages.push(document.getElementById("page"+count));
    console.log(pages.length);
    for(i = num_pages+1; i<=count; i++){
      $("#page"+i).remove();
    }
    $(".box").wrapAll("<div id='wrapper1'></div>")
  }

  function overflow(element){
    //console.log(element.children[0]);
    element_child = element.children[0];
    expression = element_child.offsetTop + element_child.offsetHeight >
      element.offsetTop + element.offsetHeight ||
      element_child.offsetLeft + element_child.offsetWidth >
      element.offsetLeft + element.offsetWidth;
      //console.log(element_child.offsetTop);

      return expression;
  }

  $( document ).keydown(function( event ) {
    if(event.which == 39 && curr_first_page<pages.length-2){
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $("#wrapper"+wrap_count).addClass('animated slideOutLeft').one(animationEnd, function() {
          $("#wrapper"+wrap_count).removeClass('animated slideOutLeft');
          $("#wrapper"+wrap_count).remove();
          console.log("removed");
          wrap_count++;
          $("."+container_class).append($(pages[curr_first_page+1]));
          $("."+container_class).append($(pages[curr_first_page+2]));
          console.log("added");
          $(".box").wrapAll("<div id='wrapper"+wrap_count+"'></div>");
          curr_first_page+=2;
      });

      // $("#wrapper"+wrap_count).addClass('animated slideInRight').one(animationEnd, function() {
      //   $("#wrapper"+wrap_count).removeClass('animated slideInRight');
      //   curr_first_page+=2;
      // });
      // $("#page"+curr_first_page).animateCss('slideOutLeft');
      // $("#page"+curr_first_page).remove();
    }else if(event.which == 37 && curr_first_page>1){
     // $("#page"+curr_first_page).animateCss('slideOutRight');
      $("#page"+curr_first_page).remove();
      plus1 = curr_first_page+1;
      $("#page"+plus1).remove();
      $("."+container_class).append(pages[curr_first_page-2]);
      $("."+container_class).append(pages[curr_first_page-1]);
      curr_first_page--;
    }
  });

});

