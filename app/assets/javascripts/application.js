// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require moment
//= require fullcalendar
//= require_tree .



$(function () {
    function eventCalendar() {
        return $('#calendar').fullCalendar({});
    };
    function clearCalendar() {
        $('#calendar').html('');
    };
    $(document).on('turbolinks:load', function () {
        eventCalendar();
    });
    $(document).on('turbolinks:before-cache', clearCalendar);
    $('#calendar').fullCalendar({
        events: '/events.json',
        // カレンダー上部を年月で表示させる
        views: {
            listMonth: {
                titleFormat: 'YYYY年MM月'
            },
            week: {
                titleFormat: 'YYYY年MM月DD日',
            },
            day: {
                titleFormat: 'YYYY年MM月DD日',
            },
            // agendaFourDay: {
            //     type: 'agenda',
            //     duration: { days: 4 }
            // }
        }, 
        // 曜日を日本語表示
        // dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
        listDayFormat: 'YYYY年MM月DD日',
        dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        eventLimit: true, 
        // ボタンのレイアウト
        header: {
            left: 'title',
            // center: 'agendaFourDay',
            // right: 'listMonth,agendaWeek,agendaDay'
            right: 'today prev,next'
        },
        eventRender: function (event, element, view) {
            if (event.description !== null ) {
                element.find('.fc-list-item-title ').append('<div class="hr-line-solid-no-margin"></div><span class="description">'+event.description+'</span></div>');
                element.find('.fc-title ').append('<div class="hr-line-solid-no-margin"></div><span style="font-size: 8px">'+event.description+'</span></div>');
            }
        },
        height: window.innerHeight - 30,
        // minTime: "05:00",
        // maxTime: "25:00",
        // editable: true,
        allDaySlot: false,
        // contentHeight: 'auto',//---- 高さを自動調整
        themeSystem: 'bootstrap4',
        buttonText: {
            prev: '<',
            next: '>',
            prevYear: '前年',
            nextYear: '翌年',
            today: '今日',
            month: '月',
            week: '週',
            day: '日',
            listMonth: 'List',
        },
        defaultView: 'listMonth',
        selectable: true,
        // selectHelper: true,
        // editable: true,
        defaultTimedEventDuration:'03:00:00',
        textColor: 'black',   
    });
});

