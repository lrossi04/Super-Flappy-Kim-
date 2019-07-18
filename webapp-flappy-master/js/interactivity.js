jQuery('#credits').on('click', function() {
  var message = '<p>'+'Noth Korea'+'</p>';
  jQuery('#credits').append(message);
});

jQuery('#scoresbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    "<p>"+"Doesn't matter hail North Korea"+"</p>"
  )
  jQuery('#scoresbtn').addClass("active");
  jQuery('#creditsbtn').removeClass("active");
  jQuery('#helpbtn').removeClass("active");
});

jQuery('#creditsbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    "<p>"+"Doesn't matter hail North Korea"+"</p>"
  )
  jQuery('#scoresbtn').removeClass("active");
  jQuery('#creditsbtn').addClass("active");
  jQuery('#helpbtn').removeClass("active");
});

jQuery('#helpbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Work it out yourself'+'</p>'

  )
  jQuery('#scoresbtn').removeClass("active");
  jQuery('#creditsbtn').removeClass("active");
  jQuery('#helpbtn').addClass("active");
});
