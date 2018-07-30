exports.init = (() => {
  /* eslint-disable */
  // const $ = window.jQuery;
  // const spinner = window.spinner;
  // let adjustFrameEvent = null;

  // const baseUrl = `${window.location.protocol}//${window.location.host}`;

  // const iframeDOM = `<div class="lightbox">
  //   <main>
  //     <iframe src="#" scrolling="yes" />
  //   </main>
  // </div>
  // <nav class="lightbox">
  //   <a href="#" class="close" lightboxclose><i class="fas fa-times-circle"></i></a>
  //   <a href="#" class="next hide"><i class="fas fa-chevron-circle-right"></i></a>
  //   <a href="#" class="prev hide"><i class="fas fa-chevron-circle-left"></i></a>
  // </nav>`;

  // $('body').append(iframeDOM);

  // const adjustFrameSize = () => {
  //   // Adjust lightbox height to content height
  //   if ($('.lightbox.active main iframe').contents()) {
  //     let interval = 0;
  //     const intervalMax = 8;
  //     const frameSizeInterval = setInterval(() => {
  //       //console.log('old', interval, $('div.lightbox main').css('max-height'));
  //       $('div.lightbox main').css('max-height', $('.lightbox main iframe').contents().find('body').outerHeight()).find('iframe').attr('scrolling', 'no');
  //       //console.log('new', interval, $('div.lightbox main').css('max-height'));
  //       interval++;
  //       if (interval > intervalMax) {
  //         clearInterval(frameSizeInterval);
  //       }
  //     }, 50);
  //   } else {
  //     $('div.lightbox main').css('max-height', '70vh').find('iframe').attr('scrolling', 'yes');
  //   }
  // };

  // $(window).resize(() => {
  //   clearTimeout(adjustFrameEvent);
  //   adjustFrameEvent = setTimeout(adjustFrameSize, 200);
  // });

  // const receiveMessage = (event) => {
  //   //console.log(event.origin, baseUrl);
  //   if (event.origin !== baseUrl) {
  //     return;
  //   }
  //   //console.log(event);
  //   clearTimeout(adjustFrameEvent);
  //   adjustFrameEvent = setTimeout(adjustFrameSize, 200);
  // };
  // window.addEventListener('message', receiveMessage, false);

  // const inFrame = () => {
  //   return !(window === window.parent);
  // };

  // if (inFrame()) {
  //   //console.log('is in iframe');
  //   $(window).on('load ready', () => {
  //     const msg = {
  //       cmd: 'adjustFrameEvent',
  //       data: {
  //         height: $('body').outerHeight(),
  //       },
  //     };
  //     window.parent.postMessage(msg, baseUrl);
  //   });
  // }

  // const handleLightboxReady = () => {
  //   //console.log('lightbox ready');
  //   const id = $('[lightbox].active').attr('lightbox');
  //   const index = $(`[lightbox="${id}"]`).index($(`[lightbox="${id}"].active`));
  //   $('.lightbox').addClass('ready');
  //   spinner.hide($('div.lightbox main')[0]);

  //   if ($(`[lightbox="${id}"]`).length > index + 1) {
  //     $('nav.lightbox a.next').removeClass('hide');
  //   } else {
  //     $('nav.lightbox a.next').addClass('hide');
  //   }

  //   if (index - 1 >= 0) {
  //     $('nav.lightbox a.prev').removeClass('hide');
  //   } else {
  //     $('nav.lightbox a.prev').addClass('hide');
  //   }

  //   adjustFrameSize();
  // };

  // const lightboxLoad = (src) => {
  //   spinner.show($('div.lightbox main')[0]);
  //   $('.lightbox main iframe').off('ready').ready(handleLightboxReady);
  //   $('.lightbox').removeClass('ready').find('main iframe').attr('src', src);
  // };

  // const handleLightboxOpen = (e) => {
  //   e.preventDefault();
  //   const link = $(e.target).is('a') ? $(e.target) : $(e.target).closest('a');
  //   $('[lightbox].active').removeClass('active');
  //   link.addClass('active');
  //   $('body').addClass('overlay').addClass('viewport-freeze');
  //   $('.lightbox').addClass('active');
  //   lightboxLoad(link.attr('href'));
  // };

  // $(document).on('click', '[lightbox]', handleLightboxOpen);

  // const handleLightboxClose = (e) => {
  //   e.preventDefault();
  //   $('div.lightbox main').removeAttr('style').find('iframe').attr('scrolling', 'yes');
  //   $('[lightbox].active').removeClass('active');
  //   $('body').removeClass('overlay').removeClass('viewport-freeze');
  //   $('.lightbox').removeClass('active').removeClass('ready');
  // };

  // $(document).on('click', '[lightboxclose]', handleLightboxClose);
  // $(document).on('click', 'div.lightbox.active', handleLightboxClose);

  // const handleLightboxNext = (e) => {
  //   e.preventDefault();
  //   const id = $('[lightbox].active').attr('lightbox');
  //   const index = $(`[lightbox="${id}"]`).index($(`[lightbox="${id}"].active`));
  //   //console.log(index, id);
  //   if ($(`[lightbox="${id}"]`).length > index + 1) {
  //     $(`[lightbox="${id}"]`).get(index + 1).click();
  //   }
  // };

  // $(document).on('click', 'nav.lightbox.active a.next', handleLightboxNext);

  // const handleLightboxPrev = (e) => {
  //   e.preventDefault();
  //   const id = $('[lightbox].active').attr('lightbox');
  //   const index = $(`[lightbox="${id}"]`).index($(`[lightbox="${id}"].active`));
  //   //console.log(index, id);
  //   if (index - 1 >= 0) {
  //     $(`[lightbox="${id}"]`).get(index - 1).click();
  //   }
  // };

  // $(document).on('click', 'nav.lightbox.active a.prev', handleLightboxPrev);
  /* eslint-enabled */
});
