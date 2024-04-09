$.fn.bookingCalendar = function (options) {

    this.settings = {
        current_date: new Date(),
        selected_start_date: null,
        selected_end_date: null,
        check_availability: true,
        accommodation_reserve: false,
        accommodation_data: {
            children: true,
            max_people: null,
            max_adults: null,
            max_children: null,
        },
        contact_information_step: false,
        company_id: "7b1519cb169f156370ccf8c2dcf8d52e",
        hotel: "7570e81e339316fba97399add450e435",
        lang: 'en',
        api_submit_callback: null,
        unit_id: null,
        custom_offer: false,
        custom_offer_start_date: false,
        custom_offer_end_date: false,
        custom_offer_available_booking_days: [],
        custom_offer_max_nights: 100000,
        custom_offer_min_nights: 0
    };


    let reservation_data = {
        check_in_date: null,
        check_out_date: null,
        staying_nights: null,
        number_of_adults: 2,
        number_of_children: null,
        children_age: [],
        contact_information: {
            first_name: null,
            last_name: null,
            email: null,
        },
        promo_code: null
    }
    const months_names = [
        global_vars.januar, global_vars.februar, global_vars.mart,
        global_vars.april, global_vars.maj, global_vars.jun, global_vars.jul,
        global_vars.avgust, global_vars.septembar, global_vars.oktobar, global_vars.novembar,
        global_vars.decembar
    ];

    this.settings = $.extend(this.settings, options);

    init_custom_offer_date_range(this);

    this.settings.current_year = this.settings.current_date.getFullYear();
    this.settings.current_month = this.settings.current_date.getMonth();

    init(this);


    function init_custom_offer_date_range(obj) {
        if (obj.settings.custom_offer) {
            var startDate = obj.settings.custom_offer_start_date;
            startDate = startDate.split('-');
            startDate = new Date(startDate[0], parseInt(startDate[1]) - 1, startDate[2]);

            var endDate = obj.settings.custom_offer_end_date;
            endDate = endDate.split('-');
            endDate = new Date(endDate[0], parseInt(endDate[1]) - 1, endDate[2]);
            obj.settings.custom_offer_date_range = getDateRange(startDate, endDate);
        }
    }





    // ============================= DATE FUNCTIONS =============================
    function get_date_data(obj, selected_date) {
        var a = null;
        obj.settings.available_dates.forEach(array_date => {
            if (array_date.date == selected_date) {
                a = array_date;
            }
        });
        return a;
    }

    function date_selection_definition(obj) {
        obj.find('.date-selection').click(function () {



            var selected_date = $(this).data('date');
            $('.calendar_view').find('[title]').each(function () {
                $(this).removeAttr('title')
                $(this).removeAttr('original-title')
            })



            if (obj.settings.selected_end_date) {

                if ($(this).find('.date_box').hasClass('not_available')) {
                    alert('Try again');
                } else {

                    obj.find('.date_box').removeClass('start');
                    obj.find('.date_box').removeClass('end');
                    obj.settings.selected_start_date = selected_date;
                    reservation_data.check_in_date = selected_date;

                    obj.settings.selected_end_date = null;
                    $(this).find('.date_box').addClass('start');
                    obj.find('.date-selection .date_box').removeClass('possible');
                }
            } else {
                if (!obj.settings.selected_start_date) {
                    //CLICKED ON START DATE

                    if ($(this).find('.date_box').hasClass('not_available')) {
                        alert('Try again');
                    } else {

                        //console.log(obj.settings);
                        obj.settings.selected_start_date = selected_date;
                        reservation_data.check_in_date = selected_date;
                        $(this).find('.date_box').addClass('start');
                        obj.find('.date-selection .date_box').removeClass('possible');
                        get_reservation_details_html(obj)
                    }
                }

                else {
                    //CLICKED ON END DATE
                    /*  NOVO POCETAK */
                    if (!obj.settings.custom_offer) {
                        obj.settings.selected_end_date = selected_date;
                        if (is_end_date_greater_than_start(obj.settings.selected_start_date, obj.settings.selected_end_date)) {
                            if (!has_reserved_day_in_between(obj, obj.settings.selected_start_date, obj.settings.selected_end_date)) {
                                reservation_data.check_out_date = selected_date;

                                cid = reservation_data.check_out_date.split('-');

                                var month = (parseInt(cid[1]) + 1);
                                if (month < 10) {
                                    month = '0' + month;
                                }

                                reservation_data.check_out_date = cid[0] + '-' + month + '-' + cid[2];

                                $('.possible').length / obj.length - 1;
                                obj.settings.staying_nights = $('.possible').length / obj.length - 1;
                                reservation_data.staying_nights = $('.possible').length / obj.length - 1;
                                $(this).find('.date_box').addClass('end');
                                $(this).attr('title', `${obj.settings.staying_nights} noГ„вЂЎi`)
                                get_reservation_details_html(obj);
                            } else {
                                alert('Postoje zauzeti termini izmeГ„вЂu odabranih termina');
                                obj.settings.selected_end_date = null;
                                obj.find('.date-selection .date_box').removeClass('possible');
                            }
                        } else {
                            alert('Datum ne moГ…Вѕe biti manji od poГ„ВЌetnog');
                            obj.settings.selected_end_date = null;
                            obj.find('.date-selection .date_box').removeClass('possible');
                        }
                    } else {

                        obj.settings.selected_end_date = selected_date;


                        if (is_end_date_greater_than_start(obj.settings.selected_start_date, obj.settings.selected_end_date)) {
                            obj.settings.staying_nights = $('.possible').length;
                            reservation_data.check_out_date = selected_date;
                            reservation_data.staying_nights = $('.possible').length - 1;
                            if (obj.settings.staying_nights > obj.settings.custom_offer_max_nights + 1) {
                                alert('Ne mozete uzeti vise od ' + obj.settings.custom_offer_max_nights + ' noci');
                                obj.settings.selected_end_date = null;
                                obj.find('.date-selection .date_box').removeClass('possible');
                            } else {
                                console.log(obj.settings.staying_nights);
                                if (obj.settings.staying_nights - 1 < obj.settings.custom_offer_min_nights) {
                                    alert('Ne mozete uzeti manje od ' + obj.settings.custom_offer_min_nights + ' noci');
                                    obj.settings.selected_end_date = null;
                                    obj.find('.date-selection .date_box').removeClass('possible');
                                }
                            }
                        } else {
                            alert('Datum ne moГ…Вѕe biti manji od poГ„ВЌetnog');
                            obj.settings.selected_end_date = null;
                            obj.find('.date-selection .date_box').removeClass('possible');
                        }
                    }
                    /*  NOVO KRAJ */
                }
            }
        });

        obj.find('.date-selection').hover(function () {
            if (obj.settings.selected_start_date && !obj.settings.selected_end_date) {
                var possible_end_date = $(this).data('date');
                var date_range = getDates(obj.settings.selected_start_date, possible_end_date);
                obj.find('.date-selection .date_box').removeClass('possible');
                stop_seeking = false;
                date_range.forEach(date => {
                    if (!stop_seeking) {
                        var date_selector = date.getFullYear() + '-' + (date.getMonth()) + '-' + date.getDate();
                        var date_selector_json = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
                        /*if (obj.settings.check_availability) {
                            var date_data = get_date_data(obj, date_selector_json);
                            if (date_data) {
                                obj.find('.date_' + date_selector + ' .date_box').addClass('possible');
                            } else {
                                stop_seeking = true;
                            }
                        } else {
                            obj.find('.date_' + date_selector + ' .date_box').addClass('possible');
                        }*/
                        obj.find('.date_' + date_selector + ' .date_box').addClass('possible');
                    }


                });
            }
        });
    }

    function getDates(startDate, stopDate) {
        startDate = startDate.split('-');
        startDate = new Date(startDate[0], startDate[1], startDate[2]);

        stopDate = stopDate.split('-');
        stopDate = new Date(stopDate[0], stopDate[1], stopDate[2]);

        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }

        return dateArray;
    }

    function has_reserved_day_in_between(obj, startDate, stopDate) {
        startDate = startDate.split('-');
        startDate = new Date(startDate[0], startDate[1], startDate[2]);

        stopDate = stopDate.split('-');
        stopDate = new Date(stopDate[0], stopDate[1], stopDate[2]);

        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }

        stop_seeking = false;
        has_reserved_day_in_between_var = false;
        dateArray.forEach((date, index) => {
            if (!stop_seeking) {
                var date_selector = date.getFullYear() + '-' + (date.getMonth()) + '-' + date.getDate();
                var date_selector_json = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
                if (obj.settings.check_availability) {
                    var date_data = get_date_data(obj, date_selector_json);
                    console.log(date_data);
                    if (!date_data) {
                        if (index < dateArray.length - 1) {
                            has_reserved_day_in_between_var = true;
                        }
                    }
                }
            }
        });

        return has_reserved_day_in_between_var;
    }



    function is_end_date_greater_than_start(startDate, stopDate) {
        startDate = startDate.split('-');
        startDate = new Date(startDate[0], startDate[1], startDate[2]);

        stopDate = stopDate.split('-');
        stopDate = new Date(stopDate[0], stopDate[1], stopDate[2]);

        return startDate < stopDate;
    }

    function addDays(currentDate, days) {
        var date = new Date(currentDate.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function create_date_details(date) {

        if (date != null && date !== 'undefined') {
            let date_arr = date.split("-");
            let date_object = {};

            date_object.year = parseInt(date_arr[0])
            date_object.month = parseInt(date_arr[1])
            date_object.month_name = months_names[date_arr[1]]
            date_object.day = parseInt(date_arr[2])

            return date_object
        }
    }





    // ============================= INIT FUNCTIONS =============================
    function init(obj) {
        init_basic_structure(obj);
        get_reservation_details_html(obj)
        init_left_month_calendar(obj);
        init_right_month_calendar(obj);
        date_selection_definition(obj);
        init_navigation(obj);
        get_accommodation_details_html(obj);
        get_reservation_footer_html(obj);
        set_contact_information_html(obj);
        init_reservation_data_navigation(obj);
        init_set_child_age(obj);
        set_first_step_navigation_button(obj);
        set_second_step_navigation_buttons(obj);
        init_popup_first_step_button(obj);
        init_popup_second_step_buttons(obj);
        init_customized_offer_first_step_button(obj);
        init_customized_offer_second_step_buttons(obj);
        init_customized_offer_third_step_buttons(obj);
        init_customized_offer_first_step_on_load();
        init_submit_reservation(obj);
    }

    function init_basic_structure(obj) {

        obj.html(`<div class="hss-calendar">
					<div class="calendar_columns">
						<div class="column left">LEFT</div>
						<div class="column right">RIGHT</div>
					</div>
				</div>`);
    }

    function init_navigation(obj) {
        obj.find('.hss-calendar .this_month_btn').click(function () {
            obj.settings.current_month = new Date().getMonth();
            obj.settings.current_year = new Date().getFullYear();

            init_left_month_calendar(obj);
            init_right_month_calendar(obj);
            date_selection_definition(obj);
            init_navigation(obj)
        });

        obj.find('.hss-calendar .prev_btn').click(function () {
            obj.settings.current_month--;
            if (obj.settings.current_month < 0) {
                obj.settings.current_year--;
                obj.settings.current_month = 11;
            }
            init_left_month_calendar(obj);
            init_right_month_calendar(obj);
            date_selection_definition(obj);
            init_navigation(obj)
        });

        obj.find('.hss-calendar .next_btn').click(function () {
            obj.settings.current_month++;
            if (obj.settings.current_month >= 12) {
                obj.settings.current_year++;
                obj.settings.current_month = 0;
            }
            init_left_month_calendar(obj);
            init_right_month_calendar(obj);
            date_selection_definition(obj);
            init_navigation(obj)
        });
    }

    function init_left_month_calendar(obj) {
        var date = new Date(obj.settings.current_year, obj.settings.current_month);
        var table_html = `
		<div class="column_header">
			<a href="javascript:void(0)" class="prev_btn"><i class="fa fa-angle-left"></i></a>`

        table_html = `${table_html} ${get_calendar_html(obj, date)}`


        obj.find('.hss-calendar .calendar_columns .left').html(table_html);
    }

    function init_right_month_calendar(obj) {
        if (obj.settings.current_month < 11) {
            var date = new Date(obj.settings.current_year, obj.settings.current_month + 1);
        } else {
            var date = new Date(obj.settings.current_year + 1, 0);
        }
        var table_html = `
		<div class="column_header">
				<a href="javascript:void(0)" class="next_btn"><i class="fa fa-angle-right"></i></a>`

        table_html = `${table_html} ${get_calendar_html(obj, date)}`

        table_html = `
			${table_html}
			<div class="legend">`


        table_html = `
			${table_html}
			<div class="check_in">
					<div class="icon"></div>
					<p>${global_vars.calendar_status_check_in}</p>
				</div>	
				<div class="check_out">
					<div class="icon"></div>
					<p>${global_vars.calendar_status_check_out}</p>
				</div>	
			</div>`

        obj.find('.hss-calendar .calendar_columns .right').html(table_html);
    }

    function init_set_child_age(obj) {
        obj.find(`.hss-calendar .child select`).on('change', function () {
            reservation_data.children_age[$(this).data('child')] = parseInt($(this).val())
        })
    }

    function init_reservation_data_navigation(obj) {
        obj.find('.hss-calendar [data-increase-number-of-adults]').on('click', function () {
            increase_number_of_adults(obj)
            get_accommodation_details_html(obj)
            init_reservation_data_navigation(obj)
            init_set_child_age(obj)
            set_second_step_navigation_buttons(obj)
            init_popup_first_step_button(obj)
            init_customized_offer_first_step_button(obj)
            init_customized_offer_third_step_buttons(obj)
            init_submit_reservation(obj)

        })
        obj.find('.hss-calendar [data-decrease-number-of-adults]').on('click', function () {
            decrease_number_of_adults()
            get_accommodation_details_html(obj)
            init_reservation_data_navigation(obj)
            init_set_child_age(obj)
            set_second_step_navigation_buttons(obj)
            init_popup_first_step_button(obj)
            init_customized_offer_first_step_button(obj)
            init_customized_offer_third_step_buttons(obj)
            init_submit_reservation(obj)

        })
        obj.find('.hss-calendar [data-increase-number-of-children]').on('click', function () {
            increase_number_of_children(obj)
            get_accommodation_details_html(obj)
            init_reservation_data_navigation(obj)
            init_set_child_age(obj)
            set_second_step_navigation_buttons(obj)
            init_popup_first_step_button(obj)
            init_customized_offer_first_step_button(obj)
            init_customized_offer_third_step_buttons(obj)
            init_submit_reservation(obj)

        })
        obj.find('.hss-calendar [data-decrease-number-of-children]').on('click', function () {
            decrease_number_of_children()
            get_accommodation_details_html(obj)
            init_reservation_data_navigation(obj)
            init_set_child_age(obj)
            set_second_step_navigation_buttons(obj)
            init_popup_first_step_button(obj)
            init_customized_offer_first_step_button(obj)
            init_customized_offer_third_step_buttons(obj)
            init_submit_reservation(obj)

        })
    }

    function init_submit_reservation(obj) {
        obj.find('.hss-calendar [data-submit-reservation]').on('click', function () {

            var num_adults = (reservation_data.number_of_adults == null) ? 2 : reservation_data.number_of_adults;

            reservation_data.number_of_adults = num_adults;

            get_promo_code_value($(this));
            get_contact_information(obj);

            if (reservation_data.check_in_date == null) {
                reservation_data.check_in_date = formatDate(new Date(), 'yyyy-mm-dd');
            } else {
                cid = reservation_data.check_in_date.split('-');

                var month = (parseInt(cid[1]) + 1);
                if (month < 10) {
                    month = '0' + month;
                }

                reservation_data.check_in_date = cid[0] + '-' + month + '-' + cid[2];
            }
            console.table(reservation_data);


            if (obj.settings.api_submit_callback) {
                obj.settings.api_submit_callback(reservation_data);
            } else {

                var children_link = '';
                for (i = 1; i <= reservation_data.children_age.length; i++) {

                    if (i < reservation_data.children_age.length) {
                        children_link = `${children_link}chdage[1][${i}]=${reservation_data.children_age[i - 1]}&`
                    } else {
                        children_link = `${children_link}chdage[1][${i}]=${reservation_data.children_age[i - 1]}
						`
                    }
                }

                var promo = '';
                if (reservation_data.promo_code != null) {
                    promo = `partners_access=${reservation_data.promo_code}&`;
                }

                if (obj.settings.unit_id == null) {
                    redirect_link = `https://secure.phobs.net/book.php?
					company_id=${obj.settings.company_id}&
					hotel=${obj.settings.hotel}&
					date=${reservation_data.check_in_date}&
					nights=${reservation_data.staying_nights}&
					lang=${obj.settings.lang}&
					${promo}
					unit_select=1&
					units=1&
					adults[1]=${num_adults}&
					chd[1]=${reservation_data.number_of_children}&
					${children_link}`;
                } else {
                    redirect_link = `https://secure.phobs.net/book.php?
					company_id=${obj.settings.company_id}&
					hotel=${obj.settings.hotel}&
					date=${reservation_data.check_in_date}&
					nights=${reservation_data.staying_nights}&
					lang=${obj.settings.lang}&
					${promo}
					unit_id=${obj.settings.unit_id}`;
                }
                console.log(redirect_link);
                window.open(redirect_link, '_blank');
            }

        })
    }

    function init_popup_first_step_button(obj) {
        obj.find('.hss-calendar .go_to_first_step').on('click', function () {
            $('.popup_accommodation_reserve .calendar_columns').addClass('show');
            $('.popup_accommodation_reserve .calendar_columns').removeClass('hide');
            $('.popup_accommodation_reserve .accommodation_details').removeClass('show');
            $('.popup_accommodation_reserve .accommodation_details').addClass('hide');
        })
    }

    function init_popup_second_step_buttons(obj) {

        obj.find('.hss-calendar .go_to_second_step').on('click', function () {


            if (obj.settings.unit_id == null) {

                $('.popup_accommodation_reserve .calendar_columns').addClass('hide');
                $('.popup_accommodation_reserve .calendar_columns').removeClass('show');
                $('.popup_accommodation_reserve .accommodation_details').removeClass('hide');
                $('.popup_accommodation_reserve .accommodation_details').addClass('show');

            } else {

                if (reservation_data.check_in_date == null) {
                    reservation_data.check_in_date = formatDate(new Date(), 'yyyy-mm-dd');
                } else {
                    cid = reservation_data.check_in_date.split('-');

                    var month = (parseInt(cid[1]) + 1);
                    if (month < 10) {
                        month = '0' + month;
                    }

                    reservation_data.check_in_date = cid[0] + '-' + month + '-' + cid[2];
                }

                redirect_link = `https://secure.phobs.net/book.php?
					company_id=${obj.settings.company_id}&
					hotel=${obj.settings.hotel}&
					date=${reservation_data.check_in_date}&
					nights=${reservation_data.staying_nights}&
					lang=${obj.settings.lang}&
					unit_id=${obj.settings.unit_id}`;
                window.open(redirect_link, '_blank');
            }

        })

    }

    function init_customized_offer_first_step_button(obj) {
        obj.find('.hss-calendar .go_to_first_step').on('click', function () {
            $('.customized_offer .reservation_details').addClass('hide');
            $('.customized_offer .calendar_columns').removeClass('hide');
            $('.customized_offer .accommodation_details').addClass('hide');
            $('.customized_offer .contact_information').removeClass('hide');
            $('.customized_offer .contact_information').addClass('hide');
            $('.customized_offer .reservation_footer').addClass('hide');
        })
    }

    function init_customized_offer_second_step_buttons(obj) {
        obj.find('.hss-calendar .go_to_second_step').on('click', function () {
            $('.customized_offer .reservation_details').addClass('hide');
            $('.customized_offer .calendar_columns').addClass('hide');
            $('.customized_offer .accommodation_details').removeClass('hide');
            $('.customized_offer .contact_information').removeClass('hide');
            $('.customized_offer .contact_information').addClass('hide');
            $('.customized_offer .reservation_footer').addClass('hide');
        })
    }

    function init_customized_offer_third_step_buttons(obj) {
        obj.find('.hss-calendar .go_to_third_step').on('click', function () {
            $('.customized_offer .reservation_details').addClass('hide');
            $('.customized_offer .calendar_columns').addClass('hide');
            $('.customized_offer .accommodation_details').addClass('hide');
            $('.customized_offer .contact_information').removeClass('hide');
            $('.customized_offer .reservation_footer').addClass('hide');
        })
    }

    function init_customized_offer_first_step_on_load() {
        $('.customized_offer .reservation_details').addClass('hide');
        $('.customized_offer .calendar_columns').removeClass('hide');
        $('.customized_offer .accommodation_details').addClass('hide');
        $('.customized_offer .contact_information').addClass('hide');
        $('.customized_offer .reservation_footer').addClass('hide');
    }





    // ============================= HTML FUNCTIONS =============================
    function get_reservation_details_html(obj) {

        if (obj.settings.accommodation_reserve == true) {
            obj.settings.check_in = create_date_details(obj.settings.selected_start_date)
            obj.settings.check_out = create_date_details(obj.settings.selected_end_date)

            let check_in = obj.settings.check_in;
            let check_out = obj.settings.check_out;

            let reservation_details_template = `
		<div class="check_in_out">
			<div class="check_in_date">
				<h4>${global_vars.calendar_status_check_in}</h4>
				<p>`
            if (check_in != undefined) { reservation_details_template = `${reservation_details_template}${check_in.day} ${check_in.month_name} ${check_in.year}` }
            reservation_details_template = `
			${reservation_details_template}</p >
			</div >
			<div class="arrow"><i class="fa fa-arrow-right"></i></div>
			<div class="check_out_date">
				<h4>${global_vars.calendar_status_check_out}</h4>
				<p>`
            if (check_out != undefined) { reservation_details_template = `${reservation_details_template}${check_out.day} ${check_out.month_name} ${check_out.year}` }
            reservation_details_template = `
			${reservation_details_template}</p>
			</div>
		</div >
		<div class="number_of_nights">
			<h4>${global_vars.calendar_status_nights}</h4>
			<p>`
            if (check_in != undefined && check_out != undefined) {
                reservation_details_template = `${reservation_details_template}${obj.settings.staying_nights}`
            }
            reservation_details_template = `
		 ${reservation_details_template}</p>
		</div>`

            if (obj.find('.hss-calendar .reservation_details').length) {
                obj.find('.hss-calendar .reservation_details').html(reservation_details_template)
            } else {
                obj.find('.hss-calendar .calendar_columns').before(
                    `<div class="reservation_details">
					${reservation_details_template}
				</div>`
                )
            }
        }
    }

    /*function getDateRange(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            var day = currentDate.getDate() < 10 ? '0'+currentDate.getDate() : currentDate.getDate();
            dateArray.push(currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+day);
            var date = new Date(currentDate);
            date.setDate(date.getDate() + 1);
            currentDate = date;
        }
        return dateArray;
    }*/

    function getDateRange(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            var day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
            var month = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
            dateArray.push(currentDate.getFullYear() + '-' + month + '-' + day);
            var date = new Date(currentDate);
            date.setDate(date.getDate() + 1);
            currentDate = date;
        }
        return dateArray;
    }

    function get_calendar_html(obj, date) {
        var d_position = new Date(date.getFullYear(), date.getMonth(), 1);
        var starting_position = d_position.getDay();
        var date_count = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var number_of_days = date_count.getDate();

        var number_of_rows = Math.ceil((number_of_days + starting_position) / 7);

        var leftover = 7 * number_of_rows - (number_of_days + starting_position);

        var table_html = `
			<div class="calendar_month_year">
				<h4>${months_names[date.getMonth()]} <span>${date.getFullYear()}</span></h4>
			</div>
			<a href="javascript:void(0)" class="this_month_btn">${global_vars.calendar_status_today}</a>
		</div>
		<table>
			<tr>
				<th>${global_vars.day1}</th>
				<th>${global_vars.day2}</th>
				<th>${global_vars.day3}</th>
				<th>${global_vars.day4}</th>
				<th>${global_vars.day5}</th>
				<th>${global_vars.day6}</th>
				<th>${global_vars.day7}</th>
			
			</tr>
		`;

        for (var row = 0; row < number_of_rows; row++) {
            table_html += `<tr>`;
            for (var column = 0; column < 7; column++) {
                var current = row * 7 + column;
                if (current < starting_position) {
                    table_html += `<td><div class="date_box">&nbsp;</div></td>`;
                } else {
                    if (current > starting_position + number_of_days - 1) {
                        table_html += `<td><div class="date_box">&nbsp;</div></td>`;
                    } else {
                        var date_value = date.getFullYear() + '-' + date.getMonth() + '-' + (current + 1 - starting_position);
                        var date_value_json = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(current + 1 - starting_position).padStart(2, '0');
                        var date_data = get_date_data(obj, date_value_json);


                        var current_date_js_format = new Date(date.getFullYear(), date.getMonth(), current + 1 - starting_position);

                        if (!obj.settings.custom_offer) {
                            if (obj.settings.check_availability) {
                                var available_class = date_data ? 'available' : 'not_available';
                                table_html += `<td class="date-selection date_${date_value}" data-date="${date_value}">
													<div class="date_box ${available_class}">${current + 1 - starting_position}</div>
												</td>`;
                            } else {
                                table_html += `<td class="date-selection date_${date_value}" data-date="${date_value}">
													<div class="date_box">${current + 1 - starting_position}</div>
												</td>`;
                            }
                        } else {
                            var available_class = obj.settings.custom_offer_date_range.includes(date_value_json) ? 'available' : 'not_available';
                            available_class = !obj.settings.custom_offer_available_booking_days.includes(current_date_js_format.getDay().toString()) ? 'not_available' : available_class;

                            table_html += `<td class="date-selection date_${date_value}" data-date="${date_value}">
												<div class="date_box ${available_class}">${current + 1 - starting_position}</div>
											</td>`;
                        }

                        /*if (obj.settings.check_availability) {
                            var available_class = date_data ? 'available' : 'not_available';
                            table_html += `<td class="date-selection date_${date_value}" data-date="${date_value}">
                                                <div class="date_box ${available_class}">${current + 1 - starting_position}</div>
                                            </td>`;
                        } else {
                            table_html += `<td class="date-selection date_${date_value}" data-date="${date_value}">
                                                <div class="date_box">${current + 1 - starting_position}</div>
                                            </td>`;
                        }*/

                    }
                }
            }
            table_html += `</tr>`;
        }
        table_html += `</table>`;
        return table_html;
    }

    function get_accommodation_details_html(obj) {

        if (obj.settings.accommodation_reserve == true && obj.settings.accommodation_data != null) {

            let children = obj.settings.accommodation_data.children;


            let accommodation_details_template = `
			<h4>${global_vars.calendar_string_guests}</h4>
			<div class="number_of_people">
				<div class="number_of_adults">
					<h4>${global_vars.calendar_string_adults}</h4>
					<div class="select">
						<a data-decrease-number-of-adults href="javascript:void(0)"><i class="fa fa-minus"></i></a>
						<p>${get_number_of_adults()}</p>
						<a data-increase-number-of-adults href="javascript:void(0)"><i class="fa fa-plus"></i></a>
					</div>
				</div>`

            
            if (children) {
                accommodation_details_template = `
				${accommodation_details_template}
					<div class="number_of_children">
						<h4>${global_vars.calendar_string_children}</h4>
						<div class="select">
							<a data-decrease-number-of-children href="javascript:void(0)"><i class="fa fa-minus"></i></a>
							<p>${get_number_of_children()}</p>
							<a data-increase-number-of-children href="javascript:void(0)"><i class="fa fa-plus"></i></a>
						</div>
					</div>
				</div>
				<div class="children_years">`
                

                for (let i = 0; i < get_number_of_children(); i++) {
                    accommodation_details_template = `
						${accommodation_details_template}
						<div class="child">
							<h4>${global_vars.calendar_string_child} <span>${i + 1}</span> ${global_vars.calendar_string_years}</h4>
							<select data-child="${i}" class="child_${i + 1}" >
							<option selected value="" disabled >--</option>`
                    for (let j = 0; j <= 17; j++) {
                        accommodation_details_template = `
						${accommodation_details_template}
								<option `
                        if (reservation_data.children_age[i] == j) {

                            accommodation_details_template = `
							${accommodation_details_template}	
						 selected value="${j}">${j}</option>`
                        } else {

                            accommodation_details_template = `
							${accommodation_details_template}	
						 value="${j}">${j}</option>`
                        }
                    }
                    accommodation_details_template = `
						${accommodation_details_template}
							</select >
						</div> `
                }
                accommodation_details_template = `
					${accommodation_details_template}
				</div >
				`
            } else {
                accommodation_details_template = `
					${accommodation_details_template}
			</div>
			`
            }



            if (obj.find('.hss-calendar .accommodation_details').length) {
                obj.find('.hss-calendar .accommodation_details').html(accommodation_details_template)
            } else {
                obj.find('.hss-calendar .calendar_columns').after(
                    `<div class="accommodation_details">
					${accommodation_details_template}
				</div>`
                )
            }

        }
    }

    function set_contact_information_html(obj) {
        let contact_information = `
		<div class="contact_information">
		    <h4>${global_vars.custom_offer_form_title}</h4>
		    <form>
		        <div class="form_group">
		            <label for="first_name">${global_vars.custom_offer_form_name}</label>
		            <input name="first_name" placeholder="${global_vars.custom_offer_form_placeholder_name}" type="text">
		        </div>
			
		        <div class="form_group">
		            <label for="last_name">${global_vars.custom_offer_form_lastname}</label>
		            <input name="last_name" placeholder="${global_vars.custom_offer_form_placeholder_lastname}" type="text">
		        </div>
			
		        <div class="form_group full">
		            <label for="email">${global_vars.custom_offer_form_email}</label>
		            <input name="email" placeholder="${global_vars.custom_offer_form_placeholder_email}" type="text">
		        </div>
		        
		        <div class="form_group full">
		            <label for="comment">${global_vars.custom_offer_form_comment}</label>
		            <textarea name="comment" placeholder="${global_vars.custom_offer_form_placeholder_comment}"></textarea>
		        </div>
		    </form>
		    <div class="btns">
				<button class="go_to_second_step">${global_vars.custom_offer_form_prev_step}</button>
				<button data-unit-id="${obj.settings.unit_id}" onclick="" data-submit-reservation>${global_vars.custom_offer_form_send_query}</button>	
		    </div>
		</div>`

        if (obj.settings.contact_information_step) {
            $('.customized_offer .reservation_footer').before(contact_information)
        }
    }

    function get_reservation_footer_html(obj) {

        if (obj.settings.accommodation_reserve == true && obj.settings.accommodation_data != null) {

            let reservation_footer_template = `
			<div class="reservation_footer">
				<div class="promo_code">
					<div class="form_group">
						<label for="promo_code">${global_vars.calendar_promo_label}</label>
						<input name="promo_code" placeholder="${global_vars.calendar_promo_placeholder}" type="text">
					</div>
				</div>
                <div class="promeni_i_dugme">
				<button data-unit-id="${obj.settings.unit_id}" data-submit-reservation>${global_vars.custom_offer_form_reserve}</button>	
                <a href="http://secure.phobs.net/book.php?company_id=${obj.settings.company_id}&view_cancel=1&hotel=${obj.settings.hotel}"
					class="view_cancel" target="_blank">${global_vars.view_cancel}</a>
                </div>
                </div>`

            obj.find('.hss-calendar .accommodation_details').after(reservation_footer_template)
        }
    }

    function set_first_step_navigation_button(obj) {

        var button_text = (obj.settings.unit_id == null) ? global_vars.custom_offer_form_next_step : global_vars.custom_offer_form_reserve;

        let go_to_second_step_button = `<div class="btns"><button class="go_to_second_step">${button_text}</button></div>`;

        obj.find('.hss-calendar .calendar_columns .right').after(go_to_second_step_button)

    }

    function set_second_step_navigation_buttons(obj) {

        let second_step_navigation = `<div class="btns">
			<button class="go_to_first_step">${global_vars.custom_offer_form_prev_step}</button>`


        if (obj.settings.contact_information_step) {
            second_step_navigation = ` 
				${second_step_navigation}
				<button class="go_to_third_step">${global_vars.custom_offer_form_next_step}</button>
				`
        } else {
            second_step_navigation = ` 
				${second_step_navigation}
				<button data-unit-id="${obj.settings.unit_id}" data-submit-reservation>${global_vars.custom_offer_form_reserve}</button>
				`
        }



        second_step_navigation = ` 
			${second_step_navigation}
		</div > `


        obj.find('.hss-calendar .accommodation_details .children_years').after(second_step_navigation)
    }





    // ============================= OTHER FUNCTIONS =============================
    function get_number_of_adults() {
        return reservation_data.number_of_adults == null ?
            2 :
            reservation_data.number_of_adults
    }

    function get_number_of_children() {
        return reservation_data.number_of_children == null ?
            0 :
            reservation_data.number_of_children
    }

    function increase_number_of_adults(obj) {
        let max_adults = obj.settings.accommodation_data.max_adults;

        if (reservation_data.number_of_adults < max_adults) {
            reservation_data.number_of_adults = get_number_of_adults() + 1
        }
    }

    function decrease_number_of_adults() {
        if (reservation_data.number_of_adults >= 1) {
            reservation_data.number_of_adults = get_number_of_adults() - 1
        }
    }

    function increase_number_of_children(obj) {
        let max_children = obj.settings.accommodation_data.max_children;

        if (reservation_data.number_of_children < max_children) {
            reservation_data.number_of_children = get_number_of_children() + 1
        }
    }

    function decrease_number_of_children() {
        if (reservation_data.number_of_children >= 1) {
            reservation_data.number_of_children = get_number_of_children() - 1
        }
    }

    function get_promo_code_value(obj) {
        if (obj.parent().find('[name="promo_code"]').val() != '') {
            reservation_data.promo_code = obj.parent().find('[name="promo_code"]').val()
        }
    }

    function get_contact_information(obj) {
        if (obj.settings.contact_information_step) {
            reservation_data.contact_information.first_name = obj.find('.hss-calendar .contact_information [name="first_name"]').val()
            reservation_data.contact_information.last_name = obj.find('.hss-calendar .contact_information [name="last_name"]').val()
            reservation_data.contact_information.email = obj.find('.hss-calendar .contact_information [name="email"]').val()
            reservation_data.contact_information.comment = obj.find('.hss-calendar .contact_information [name="comment"]').val()
        }
    }

    function formatDate(date, format) {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }

        return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
    }

}