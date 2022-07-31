$(document).ready(function() {
    // 页面缩放
    var ratioW = window.innerWidth / 1920; 
    var ratioH = window.innerHeight / 1080; 
    document.body.style.transform= `scale(${ratioW},${ratioH})`; 
    document.body.style.transformOrigin='left top';

    // var intPage;
    // var pageState;
    // function changePage() {
    //     intPage=setInterval(function(){
    //         var url = $('.guideCont .back').next('li').children('a').attr('href')
    //         if (!url) {
    //             url = 'index.html'
    //         }
    //         window.location.href = url
    //     }, 60000);
    // }
    // changePage();
    // $(document).on('mousemove', function () { 
    //     clearInterval(pageState);
    //     clearInterval(intPage);
    //     pageState = setInterval(function(){
    //         changePage();
    //     },180000);
    //     // clearInterval(intPage);
    // })
    // $('#contBody').on('mouseenter', function () { 
    //     console.log('in')
    //     // clearInterval(intPage);
    // })
    // $('#contBody').on('mouseleave', function () { 
    //     console.log('out')
    //     // changePage()
    // })
})