(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  $(document).ready(function() {
    $.getJSON('../config/content.json').then(function(data) {
      $('.my-avatar-data').attr('src', data.avatarUrl).attr('alt', data.myNames);

      $('title').text(data.title);

      $('.my-firstname-data').text(data.myNames.split(' ')[0]);
      $('.my-lastname-data').text(data.myNames.split(' ')[1]);
      $('.my-address-data').text(data.myAddress);
      
      $('.social-icons').text('');
      $.each(data.primaryLinks, function(i, e) {
        var html = $("<a target='_blank' href='"+e.url+"'><i class='"+e.icon+"'></i></a>");
        $('.social-icons').append(html);
      });

      $('.my-introduction-data').attr('style','list-style: none;').text('');
      $.each(data.introduction, function(i, e) {
        var html = "<li>"+e+"</li>"
        $('.my-introduction-data').append(html);
      });

      $('.my-roles-data').text('');
      $.each(data.roles, function(i, e) {
        var list = e.description.map(function(de) { return '<li>'+ de +'</li>' });
        var html = $(
        '<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">' +
          '<div class="resume-content">'+
            '<h3 class="mb-0">'+ e.title +'</h3>'+
            '<div class="subheading mb-3">'+ e.company +'</div>'+
                '<ul style="list-style: none;" class="ml-0">'+ Array.from(list).join('') +'</ul>' +
            '</div>'+
            '<div class="resume-date text-md-right">'+
              '<span class="text-primary">'+ e.start +' - '+ e.end +'</span>'+
            '</div>'+
        '</div>'
        );

        $('.my-roles-data').append(html);
      });

      $('.my-education-data').text('');
      $.each(data.education, function(i, e) {
        var list = e.majors.map(function(me) { return '<li>'+ me +'</li>' })
        var html = $(
        '<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">' +
          '<div class="resume-content">'+
            '<h3 class="mb-0">'+ e.institute +'</h3>'+
            '<div class="subheading mb-3">'+ e.level +'</div>'+
                '<ul style="list-style: none;" class="ml-0">'+ Array.from(list).join('') +'</ul>' +
            '</div>'+
            '<div class="resume-date text-md-right">'+
              '<span class="text-primary">'+ e.start +' - '+ e.end +'</span>'+
            '</div>'+
        '</div>'
        );

        $('.my-education-data').append(html);
      });

      $('.my-skills-data').text('');
      $.each(data.skills, function(i, e) {
        var html = $(
        '<li class="list-inline-item" title="'+ e.title +'" ><i class="'+ e.icon +'"></i></li>'
        );

        $('.my-skills-data').append(html);
      });

      $('.my-workflow-data').text('');
      $.each(data.workflows, function(i, e) {
        var html = $(
        '<li><i class="'+ e.icon +'"></i>'+ e.title +'</li>'
        );

        $('.my-workflow-data').append(html);
      });

      $('.my-interests-data').text('');
      $.each(data.interests, function(i, e) {
        var html = $(
          '<div class="col-md-4">'
        +'<div class="card m-1" style="width: 18rem;">'
        +'<img class="card-img-top" src="'+e.url+'" alt="'+e.title.toLowerCase()+'">'
        +'<div class="card-body">'
        +'<h5 class="card-title">'+e.title+'</h5>'
        +'<p class="card-text">'+e.description+'</p>'
        +'</div>'
        +'</div>'
        +'</div>'
        );

        $('.my-interests-data').append(html);
      });
      $('.my-interests-data').addClass('row');

      $('.my-project-data').text('');
      $.each(data.projects, function(i, e) {
        var html = $(
          '<div class="row">'
          +'<div class="col-lg-5 m-1 github-widget" data-repo="'+ e.path +'" title="'+ e.path +'"></div>'
          +'</div>'
        );
        $('.my-project-data').append(html);
      });
      $('.my-project-data').addClass('row');
      window.ghw();

      $('.my-future-plans-data').text('');
      $.each(data.futurePlans, function(i, e) {
        var html = $(
          '<div class="col-md-4">'
        +'<div class="card m-1" style="width: 18rem;">'
        +'<div class="card-body">'
        +'<h5 class="card-title">'+e.title+'</h5>'
        +'<h6 class="card-subtitle mb-2 text-muted" title="Progress">'+e.progress+'%</h6>'
        +'<p class="card-text">'+e.description+'</p>'
        +'</div>'
        +'</div>'
        +'</div>'
        );

        $('.my-future-plans-data').append(html);
      });
      $('.my-future-plans-data').addClass('row');

    });
  }); 

})(jQuery); // End of use strict
