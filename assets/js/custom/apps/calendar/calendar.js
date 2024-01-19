"use strict";
var KTAppCalendar = function() {
    var e, t, n, a, o, r, i, l, d, c, s, m, u, v, f, p, y, D, k, _, b, g, S, h, T, Y, w, x, L, E = {
        id: "",
        eventName: "",
        eventDescription: "",
        eventLocation: "",
        startDate: "",
        endDate: "",
        allDay: !1
    };
    const M = () => {
            v.innerText = "Search Class", u.show();
            const o = f.querySelectorAll('[data-kt-calendar="datepicker"]'),
                i = f.querySelector("#kt_calendar_datepicker_allday");
            i.addEventListener("click", (e => {
                e.target.checked ? o.forEach((e => {
                    e.classList.add("d-none")
                })) : (l.setDate(E.startDate, !0, "Y-m-d"), o.forEach((e => {
                    e.classList.remove("d-none")
                })))
            })), C(E), D.addEventListener("click", (function(o) {
                o.preventDefault(), p && p.validate().then((function(o) {
                    console.log("validated!"), "Valid" == o ? (D.setAttribute("data-kt-indicator", "on"), D.disabled = !0, setTimeout((function() {
                        Swal.fire({
                            text: "New event added to calendar! Please wait seconds to load data.",
                            icon: "success",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            showConfirmButton: false,
                            timer: 1000,
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then((function(o) {
                            //u.hide(), D.disabled = !1;
                            function mapLocation(locationCode) {
                                // Implement this function based on your location mapping
                                return locationCode.trim() === "1" ? "Ly Thuong Kiet" : "Di An";
                            }

                            // Helper function to calculate the date from the week number and day of the week
                            function getDateFromWeek(weekNumber, dayOfWeek) {
                                const startDate = new Date('2024-01-07'); // Week 1 start date (Sunday)
                                const date = new Date(startDate);
                                date.setDate(startDate.getDate() + (weekNumber - 1) * 7 + dayOfWeek);
                                return date;
                            }

                            // Helper function to map tietHoc to time slots
                            function getTimeFromTietHoc(tietHoc) {
                                const timeSlots = {
                                    1: { start: '06:00', end: '06:50' },
                                    2: { start: '07:00', end: '07:50' },
                                    3: { start: '08:00', end: '08:50' },
                                    4: { start: '09:00', end: '09:50' },
                                    5: { start: '10:00', end: '10:50' },
                                    6: { start: '11:00', end: '11:50' },
                                    7: { start: '12:00', end: '12:50' },
                                    8: { start: '13:00', end: '13:50' },
                                    9: { start: '14:00', end: '14:50' },
                                    10: { start: '15:00', end: '15:50' },
                                    11: { start: '16:00', end: '16:50' },
                                    12: { start: '17:00', end: '17:50' },
                                    13: { start: '18:00', end: '18:50' },
                                    14: { start: '18:50', end: '19:40' },
                                    15: { start: '19:40', end: '20:30' },
                                    16: { start: '20:30', end: '21:20' },
                                    17: { start: '21:20', end: '22:10' }
                                };
                                return timeSlots[tietHoc];
                            }


                            // Function to create a calendar event object
                            function createCalendarEvent(course, info, week, dayOfWeek, lich, gv) {
                                const date = getDateFromWeek(week, dayOfWeek);
                                const startTime = getTimeFromTietHoc(info.tietHoc[0]);
                                const endTime = getTimeFromTietHoc(info.tietHoc[info.tietHoc.length - 1]);

                                // Adjust the date to include the time
                                const startDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), ...startTime.start.split(':'));
                                const endDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), ...endTime.end.split(':'));

                                // Convert to UTC+7 by adding 7 hours
                                startDateTime.setHours(startDateTime.getHours() + 7);
                                endDateTime.setHours(endDateTime.getHours() + 7);

                                // Create the event object

                                if (lich.group.includes("_")) {
                                    if (info.week.length < 10 && gv == lich.giangVienBT && gv != '') {
                                        const calendarEvent = {
                                            title: course.tenMonHoc + ' - ' + lich.giangVienBT + ' (Exercise)',
                                            start: startDateTime.toISOString().replace(".000Z", ""),
                                            end: endDateTime.toISOString().replace(".000Z", ""),
                                            location: mapLocation(info.coSo) + ' - ' + info.phong + ' - ' + lich.nhomBT,
                                            description: lich.giangVien + '\nEmail: ' + lich.email + '\nPhone: ' + lich.phone,
                                            allDay: false
                                        };
                                        console.log(calendarEvent,'Exercise');
                                        return calendarEvent;
                                    }if (info.week.length > 10 & gv == lich.giangVien && gv != '') {
                                        const calendarEvent = {
                                            title: course.tenMonHoc + ' - ' + lich.giangVien,
                                            start: startDateTime.toISOString().replace(".000Z", ""),
                                            end: endDateTime.toISOString().replace(".000Z", ""),
                                            location: mapLocation(info.coSo) + ' - ' + info.phong + ' - ' + lich.nhomLT,
                                            description: lich.giangVien + '\nEmail: ' + lich.email + '\nPhone: ' + lich.phone,
                                            allDay: false
                                        };
                                        console.log(calendarEvent);
                                        return calendarEvent;
                                    }if(info.week.length < 10 && gv == '') {
                                        const calendarEvent = {
                                            title: course.tenMonHoc + ' - ' + lich.giangVienBT + ' (Exercise)',
                                            start: startDateTime.toISOString().replace(".000Z", ""),
                                            end: endDateTime.toISOString().replace(".000Z", ""),
                                            location: mapLocation(info.coSo) + ' - ' + info.phong + ' - ' + lich.nhomBT,
                                            description: lich.giangVien + '\nEmail: ' + lich.email + '\nPhone: ' + lich.phone,
                                            allDay: false
                                        };
                                        console.log(calendarEvent);
                                        return calendarEvent;
                                    }if (info.week.length > 10 && gv == '') {
                                        const calendarEvent = {
                                            title: course.tenMonHoc + ' - ' + lich.giangVien,
                                            start: startDateTime.toISOString().replace(".000Z", ""),
                                            end: endDateTime.toISOString().replace(".000Z", ""),
                                            location: mapLocation(info.coSo) + ' - ' + info.phong + ' - ' + lich.nhomLT,
                                            description: lich.giangVien + '\nEmail: ' + lich.email + '\nPhone: ' + lich.phone,
                                            allDay: false
                                        };
                                        console.log(calendarEvent);
                                        return calendarEvent;
                                    }
                                }else{
                                    const calendarEvent = {
                                        title: course.tenMonHoc + ' - ' + lich.giangVien,
                                        start: startDateTime.toISOString().replace(".000Z", ""),
                                        end: endDateTime.toISOString().replace(".000Z", ""),
                                        location: mapLocation(info.coSo) + ' - ' + info.phong + ' - ' + lich.group,
                                        description: lich.giangVien + '\nEmail: ' + lich.email + '\nPhone: ' + lich.phone,
                                        allDay: false
                                    };
                                    console.log(calendarEvent);
                                    return calendarEvent;
                                }


                            }
                            var apiUrl = 'https://test-flask-3.vercel.app/api?id=' + t.value + '&gv=' + n.value;

                            $.ajax({
                                url: apiUrl,
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    // Process the response and add events to the calendar
                                    /*
                                    data.forEach(function (course) {
                                        course.lichHoc.forEach(function (lich) {
                                            lich.classInfo.forEach(function (info) {
                                                info.week.forEach(function (week) {
                                                    // Create the event object
                                                    var calendarEvent = createCalendarEvent(course, info, week, info.dayOfWeek, lich);
                                                    // Add the event to the calendar
                                                    e.addEvent(calendarEvent) // Make sure this matches the method of your calendar library
                                                });
                                            });
                                        });
                                    });
                                    */
                                    for (let i = 0; i < data.length; i++) {
                                        const course = data[i];
                                        for (let j = 0; j < course.lichHoc.length; j++) {
                                            const lich = course.lichHoc[j];
                                            for (let k = 0; k < lich.classInfo.length; k++) {
                                                const info = lich.classInfo[k];
                                                for (let l = 0; l < info.week.length; l++) {
                                                    const week = info.week[l];
                                                    // Create the event object
                                                    var calendarEvent = createCalendarEvent(course, info, week, info.dayOfWeek, lich, n.value);
                                                    // Add the event to the calendar
                                                    if (calendarEvent != null){
                                                        e.addEvent(calendarEvent);
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    e.render(), f.reset();
                                    u.hide(), D.disabled = !1;
                                    D.removeAttribute("data-kt-indicator");
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.error('Error fetching data: ' + textStatus, errorThrown);
                                }
                            });
                        }))
                    }), 0)) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    })
                }))
            }))
        },
        B = () => {
            var e, t, n;
            w.show(), E.allDay ? (e = "All Day", t = moment(E.startDate).format("Do MMM, YYYY"), n = moment(E.endDate).format("Do MMM, YYYY")) : (e = "", t = moment(E.startDate).format("Do MMM, YYYY - h:mm a"), n = moment(E.endDate).format("Do MMM, YYYY - h:mm a")), b.innerText = E.eventName, g.innerText = e, S.innerText = E.eventDescription ? E.eventDescription : "--", h.innerText = E.eventLocation ? E.eventLocation : "--", T.innerText = t, Y.innerText = n
        },
        q = () => {
            x.addEventListener("click", (o => {
                o.preventDefault(), w.hide(), (() => {
                    v.innerText = "Edit an Event", u.show();
                    const o = f.querySelectorAll('[data-kt-calendar="datepicker"]'),
                        i = f.querySelector("#kt_calendar_datepicker_allday");
                    i.addEventListener("click", (e => {
                        e.target.checked ? o.forEach((e => {
                            e.classList.add("d-none")
                        })) : (l.setDate(E.startDate, !0, "Y-m-d"), o.forEach((e => {
                            e.classList.remove("d-none")
                        })))
                    })), C(E), D.addEventListener("click", (function(o) {
                        o.preventDefault(), p && p.validate().then((function(o) {
                            console.log("validated!"), "Valid" == o ? (D.setAttribute("data-kt-indicator", "on"), D.disabled = !0, setTimeout((function() {
                                D.removeAttribute("data-kt-indicator"), Swal.fire({
                                    text: "New event added to calendar!",
                                    icon: "success",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then((function(o) {
                                    if (o.isConfirmed) {
                                        u.hide(), D.disabled = !1, e.getEventById(E.id).remove();
                                        let o = !1;
                                        i.checked && (o = !0), 0 === c.selectedDates.length && (o = !0);
                                        var d = moment(r.selectedDates[0]).format(),
                                            s = moment(l.selectedDates[l.selectedDates.length - 1]).format();
                                        if (!o) {
                                            const e = moment(r.selectedDates[0]).format("YYYY-MM-DD"),
                                                t = e;
                                            d = e + "T" + moment(c.selectedDates[0]).format("HH:mm:ss"), s = t + "T" + moment(m.selectedDates[0]).format("HH:mm:ss")
                                        }
                                        e.addEvent({
                                            id: A(),
                                            title: t.value,
                                            description: n.value,
                                            location: a.value,
                                            start: d,
                                            end: s,
                                            allDay: o
                                        }), e.render(), f.reset()
                                    }
                                }))
                            }), 2e3)) : Swal.fire({
                                text: "Sorry, looks like there are some errors detected, please try again.",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            })
                        }))
                    }))
                })()
            }))
        },
        C = () => {
            t.value = E.eventName ? E.eventName : "", n.value = E.eventDescription ? E.eventDescription : "", a.value = E.eventLocation ? E.eventLocation : "", r.setDate(E.startDate, !0, "Y-m-d");
            const e = E.endDate ? E.endDate : moment(E.startDate).format();
            l.setDate(e, !0, "Y-m-d");
            const o = f.querySelector("#kt_calendar_datepicker_allday"),
                i = f.querySelectorAll('[data-kt-calendar="datepicker"]');
            E.allDay ? (o.checked = !0, i.forEach((e => {
                e.classList.add("d-none")
            }))) : (c.setDate(E.startDate, !0, "Y-m-d H:i"), m.setDate(E.endDate, !0, "Y-m-d H:i"), l.setDate(E.startDate, !0, "Y-m-d"), o.checked = !1, i.forEach((e => {
                e.classList.remove("d-none")
            })))
        },
        N = e => {
            E.id = e.id, E.eventName = e.title, E.eventDescription = e.description, E.eventLocation = e.location, E.startDate = e.startStr, E.endDate = e.endStr, E.allDay = e.allDay
        },
        A = () => Date.now().toString() + Math.floor(1e3 * Math.random()).toString();
    return {
        init: function() {
            const C = document.getElementById("kt_modal_add_event");
            f = C.querySelector("#kt_modal_add_event_form"), t = f.querySelector('[name="calendar_event_name"]'), n = f.querySelector('[name="calendar_event_description"]'), a = f.querySelector('[name="calendar_event_location"]'), o = f.querySelector("#kt_calendar_datepicker_start_date"), i = f.querySelector("#kt_calendar_datepicker_end_date"), d = f.querySelector("#kt_calendar_datepicker_start_time"), s = f.querySelector("#kt_calendar_datepicker_end_time"), y = document.querySelector('[data-kt-calendar="add"]'), D = f.querySelector("#kt_modal_add_event_submit"), k = f.querySelector("#kt_modal_add_event_cancel"), _ = C.querySelector("#kt_modal_add_event_close"), v = f.querySelector('[data-kt-calendar="title"]'), u = new bootstrap.Modal(C);
            const H = document.getElementById("kt_modal_view_event");
            var F, O, I, R, V, P;
            w = new bootstrap.Modal(H), b = H.querySelector('[data-kt-calendar="event_name"]'), g = H.querySelector('[data-kt-calendar="all_day"]'), S = H.querySelector('[data-kt-calendar="event_description"]'), h = H.querySelector('[data-kt-calendar="event_location"]'), T = H.querySelector('[data-kt-calendar="event_start_date"]'), Y = H.querySelector('[data-kt-calendar="event_end_date"]'), x = H.querySelector("#kt_modal_view_event_edit"), L = H.querySelector("#kt_modal_view_event_delete"), F = document.getElementById("kt_calendar_app"), O = moment().startOf("day"), I = O.format("YYYY-MM"), R = O.clone().subtract(1, "day").format("YYYY-MM-DD"), V = O.format("YYYY-MM-DD"), P = O.clone().add(1, "day").format("YYYY-MM-DD"), (e = new FullCalendar.Calendar(F, {
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                },
                initialDate: V,
                navLinks: !0,
                selectable: !0,
                selectMirror: !0,
                select: function(e) {
                    N(e), M()
                },
                eventClick: function(e) {
                    N({
                        id: e.event.id,
                        title: e.event.title,
                        description: e.event.extendedProps.description,
                        location: e.event.extendedProps.location,
                        startStr: e.event.startStr,
                        endStr: e.event.endStr,
                        allDay: e.event.allDay
                    }), B()
                },
                editable: false,
                dayMaxEvents: !0,
                events: [],
                datesSet: function() {}
            })).render(), p = FormValidation.formValidation(f, {
                fields: {
                    //calendar_event_name: {
                    //    validators: {
                    //        notEmpty: {
                    //            message: "Event name is required"
                    //        }
                    //    }
                    //},
                    calendar_event_start_date: {
                        validators: {
                            notEmpty: {
                                message: "Start date is required"
                            }
                        }
                    },
                    calendar_event_end_date: {
                        validators: {
                            notEmpty: {
                                message: "End date is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            }), r = flatpickr(o, {
                enableTime: !1,
                dateFormat: "Y-m-d"
            }), l = flatpickr(i, {
                enableTime: !1,
                dateFormat: "Y-m-d"
            }), c = flatpickr(d, {
                enableTime: !0,
                noCalendar: !0,
                dateFormat: "H:i"
            }), m = flatpickr(s, {
                enableTime: !0,
                noCalendar: !0,
                dateFormat: "H:i"
            }), q(), y.addEventListener("click", (e => {
                E = {
                    id: "",
                    eventName: "",
                    eventDescription: "",
                    startDate: new Date,
                    endDate: new Date,
                    allDay: !1
                }, M()
            })), L.addEventListener("click", (t => {
                t.preventDefault(), Swal.fire({
                    text: "Are you sure you would like to delete this event?",
                    icon: "warning",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, return",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-active-light"
                    }
                }).then((function(t) {
                    t.value ? (e.getEventById(E.id).remove(), w.hide()) : "cancel" === t.dismiss && Swal.fire({
                        text: "Your event was not deleted!.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    })
                }))
            })), k.addEventListener("click", (function(e) {
                e.preventDefault(), Swal.fire({
                    text: "Are you sure you would like to cancel?",
                    icon: "warning",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonText: "Yes, cancel it!",
                    cancelButtonText: "No, return",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-active-light"
                    }
                }).then((function(e) {
                    e.value ? (f.reset(), u.hide()) : "cancel" === e.dismiss && Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    })
                }))
            })), _.addEventListener("click", (function(e) {
                e.preventDefault(), Swal.fire({
                    text: "Are you sure you would like to cancel?",
                    icon: "warning",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonText: "Yes, cancel it!",
                    cancelButtonText: "No, return",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-active-light"
                    }
                }).then((function(e) {
                    e.value ? (f.reset(), u.hide()) : "cancel" === e.dismiss && Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    })
                }))
            })), (e => {
                e.addEventListener("hidden.bs.modal", (e => {
                    p && p.resetForm(!0)
                }))
            })(C)
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTAppCalendar.init()
}));
