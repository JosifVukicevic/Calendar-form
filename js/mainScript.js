var global_vars = {
    nav_prev_text: "Prethodni",
    nav_next_text: "Sledeći",
    day1: "ned",
    day2: "pon",
    day3: "uto",
    day4: "sre",
    day5: "čet",
    day6: "pet",
    day7: "sub",
    januar: "Januar",
    februar: "Februar",
    mart: "Mart",
    april: "April",
    maj: "Maj",
    jun: "Jun",
    jul: "Jul",
    avgust: "Avgust",
    septembar: "Septembar",
    oktobar: "Oktobar",
    novembar: "Novembar",
    decembar: "Decembar",
    calendar_status_free: "Slobodno",
    calendar_status_taken: "Zauzeto",
    calendar_status_check_in: "Dolazak",
    calendar_status_check_out: "Odlazak",
    calendar_status_today: "Danas",
    calendar_status_nights: "noćenja",
    calendar_string_guests: "broj gostiju",
    calendar_string_adults: "Odrasli",
    calendar_string_children: "deca",
    calendar_string_child: "dete",
    calendar_string_years: "godine",
    custom_offer_form_title: "KONTAKT OSOBA",
    custom_offer_form_name: "IME",
    custom_offer_form_lastname: "PREZIME",
    custom_offer_form_email: "EMAIL",
    custom_offer_form_placeholder_name: "Unesite Vaše ime",
    custom_offer_form_placeholder_lastname: "Unesite Vaše prezime",
    custom_offer_form_placeholder_email: "Unesite Vašu email adresu",
    custom_offer_form_prev_step: "Prethodni korak",
    custom_offer_form_next_step: "Naredni korak",
    custom_offer_form_reserve: "REZERVIŠI",
    calendar_promo_label: "Imate promo kod?",
    calendar_promo_placeholder: "Unesite kod",
    custom_offer_form_send_query: "Pošalji upit",
    custom_offer_form_comment: "Napomena",
    custom_offer_form_placeholder_comment: "Unesite napomenu",
    view_cancel: "Promeni / Otkaži rezervaciju",

};

$('header .reserve_button a').click(function (e) {
    e.preventDefault();

    var check_availability = true;

    var available_dates_main = [];

    var dates_for_calendar_main = [{ "date": "2024-04-04", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-05", "rate_from": 12582, "currency": "RSD" }, { "date": "2024-04-06", "rate_from": 12582, "currency": "RSD" }, { "date": "2024-04-07", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-08", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-09", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-10", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-11", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-12", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-13", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-14", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-15", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-16", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-17", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-18", "rate_from": 14724, "currency": "RSD" }, { "date": "2024-04-19", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-04-20", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-21", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-22", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-23", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-24", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-25", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-26", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-27", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-28", "rate_from": 13980, "currency": "RSD" }, { "date": "2024-04-29", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-30", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-01", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-05-02", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-03", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-04", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-05", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-06", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-07", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-08", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-09", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-10", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-11", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-12", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-13", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-14", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-15", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-16", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-17", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-18", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-19", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-20", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-21", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-22", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-23", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-24", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-25", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-26", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-27", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-28", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-29", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-30", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-31", "rate_from": 19920, "currency": "RSD" }, { "date": "2024-06-01", "rate_from": 19920, "currency": "RSD" }, { "date": "2024-06-02", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-03", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-04", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-05", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-06", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-07", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-08", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-09", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-10", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-11", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-12", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-13", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-14", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-15", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-16", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-17", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-18", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-19", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-20", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-21", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-22", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-23", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-24", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-25", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-26", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-27", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-28", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-29", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-30", "rate_from": 15170, "currency": "RSD" }];

    $.each(dates_for_calendar_main, function (key, value) {
        available_dates_main.push({ date: value.date, 'rate_from': value.rate_from, currency: value.currency });
    });

    $("#main_reserve .calendar_view").bookingCalendar({
        available_dates: available_dates_main,
        check_availability: check_availability,
        accommodation_reserve: true,
        accommodation_data: {
            children: true,
            max_people: 20,
            max_adults: 20,
            max_children: 20,
        },
        contact_information_step: false,
        
    });

    $('#main_reserve').addClass('active');
    $('html').css('overflow', 'hidden')

});

$('.open-pp').click(function (e) {
    e.preventDefault();

    var check_in_days = $(this).data('check-days');

    e.preventDefault();

    var available_dates_co = [];

    $('.open-pp').removeClass('clicked');
    $(this).addClass('clicked');


    var dates_for_calendar = [{ "date": "2024-04-04", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-05", "rate_from": 12582, "currency": "RSD" }, { "date": "2024-04-06", "rate_from": 12582, "currency": "RSD" }, { "date": "2024-04-07", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-08", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-09", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-10", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-11", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-12", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-13", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-14", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-15", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-16", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-17", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-18", "rate_from": 14724, "currency": "RSD" }, { "date": "2024-04-19", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-04-20", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-21", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-22", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-23", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-24", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-25", "rate_from": 11520, "currency": "RSD" }, { "date": "2024-04-26", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-27", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-28", "rate_from": 13980, "currency": "RSD" }, { "date": "2024-04-29", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-04-30", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-01", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-05-02", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-03", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-04", "rate_from": 16360, "currency": "RSD" }, { "date": "2024-05-05", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-06", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-07", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-08", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-09", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-10", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-11", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-12", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-13", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-14", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-15", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-16", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-17", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-18", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-19", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-20", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-21", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-22", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-23", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-24", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-25", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-26", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-27", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-28", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-29", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-30", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-05-31", "rate_from": 19920, "currency": "RSD" }, { "date": "2024-06-01", "rate_from": 19920, "currency": "RSD" }, { "date": "2024-06-02", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-03", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-04", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-05", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-06", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-07", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-08", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-09", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-10", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-11", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-12", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-13", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-14", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-15", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-16", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-17", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-18", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-19", "rate_from": 17540, "currency": "RSD" }, { "date": "2024-06-20", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-21", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-22", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-23", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-24", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-25", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-26", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-27", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-28", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-29", "rate_from": 15170, "currency": "RSD" }, { "date": "2024-06-30", "rate_from": 15170, "currency": "RSD" }];

    $.each(dates_for_calendar, function (key, value) {
        available_dates_co.push({ date: value.date, 'rate_from': value.rate_from, currency: value.currency });
    });

    var min_stay = $(this).data('min-stay');
    var max_stay = $(this).data('max-stay');
    var package_id = $(this).data('package-id');
    var start_date = $(this).data('start-date');
    var end_date = $(this).data('end-date');

    $("#main_reserve .calendar_view").bookingCalendar({
        available_dates: available_dates_co,
        check_availability: false,
        accommodation_reserve: true,
        accommodation_data: {
            children: true,
            max_people: 20,
            max_adults: 20,
            max_children: 20,
        },
        contact_information_step: false,
        

        custom_offer: true,
        custom_offer_start_date: start_date,
        custom_offer_end_date: end_date,
        custom_offer_available_booking_days: check_in_days,
        custom_offer_max_nights: max_stay,
        custom_offer_min_nights: min_stay,

        api_submit_callback: open_promo_phobs,


    });

    $('#main_reserve').addClass('active');
    $('html').css('overflow', 'hidden')


});

var open_promo_phobs = function (data) {

    var send_data = {
        'action': 'generate_promo_offer_link',
        'check_in': data.check_in_date,
        'check_out': data.check_out_date,
        'nights': data.staying_nights,
        'post_id': $('.clicked').data('post-id')
    }}


    