$(document).ready(function () {
    if (!$('.hero').length) {
        // ********************
        // IF HERO DONT EXIST ON PAGE
        // ********************
        $('.rank-math-breadcrumb').addClass('under_header')
        $('header').addClass('colored');
        $(window).scroll(function () {
            $(document).scrollTop() > 200 ?
                (
                    $('header').addClass('scrolled'),
                    $('header').removeClass('colored'),
                    $('.site-content').css('margin-top', 220)
                ) :
                (
                    $('header').removeClass('scrolled'),
                    $('header').addClass('colored'),
                    $('.site-content').css('margin-top', 0)
                );
        })
    } else {
        // ********************
        // IF HERO EXIST ON PAGE
        // ********************
        $('.rank-math-breadcrumb').addClass('under_hero')
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => !entry.isIntersecting ?
                $('header').addClass('scrolled') :
                $('header').removeClass('scrolled'));
        });
        observer.observe(document.querySelector('.hero'))
    }
    $('.burger').click(function () {
        $('header nav').hasClass("show") ?
            (
                $('html').css('overflow', 'auto'),
                $('header nav').removeClass("show"),
                $(this).removeClass("close")
            ) :
            (
                $('html').css('overflow', 'hidden'),
                $('header nav').addClass("show"),
                $(this).addClass("close")
            )

    })
})