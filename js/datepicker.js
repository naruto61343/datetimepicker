var ISOPEN = false;
var iSUM = 0;
$(function () {
  $("#datepicker").click(function () {
    ISOPEN = true;   
    if (ISOPEN) {
      if (iSUM === 0) {
        //設定calendar div中的html部分
        renderHtml();
        //表格中顯示日期
        showCalendarData();
        //繫結事件
        bindEvent();
      }    
    }  
    iSUM ++;   
  });
});

var dateObj = (function(){
    var sysDate = new Date(); //預設為當前系統時間
    return {
        getDate : function(){
    return sysDate;
    },
        setDate : function(date) {
        sysDate = date;
         }
       };
    })();

/**
* html結構
*/
function renderHtml() {   
    var calendar = $(this).attr('calendar'); //find ID
   
   $('#calendar').addClass(function(n){
    return 'calendar-title-box';
  }); 

  $('#calendar').append("<span class='prev-month' id='prevMonth'></span>" +
  "<span class='calendar-title' id='calendarTitle'></span>" +
  "<span id='nextMonth' class='next-month'></span>");    
 
 
    //設置表格區的html結構 
    $('#calendar').addClass(function(n){
      return 'calendar-body-box';
    });
    var sBodyHtml = "";
     sHeadHtml = "<tr>" + 
              "<th>日</th>" +
              "<th>一</th>" +
              "<th>二</th>" +
              "<th>三</th>" +
              "<th>四</th>" +
              "<th>五</th>" +
              "<th>六</th>" +
            "</tr>";            

    var sBodyHtml = "";
 
    //一個月最多31天，所以一個月最多占6行表格
    for(var i = 0; i < 6; i++) {  
      sBodyHtml += "<tr id= tr_"+i+">" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
            "</tr>";
    }
 
    $("#calendar").append("<table id='calendarTable' class='calendar-table'>"+  sHeadHtml + sBodyHtml +"</table>")     
  } 

/**
* 表格中顯示數據，並設置類名
*/
  function showCalendarData() {
   
    var iYear = dateObj.getDate().getFullYear();
    var iMonth = dateObj.getDate().getMonth() + 1;
    var idate = getDateStr(dateObj.getDate());
 
    //  設置頂部標題欄中的 年、月
    var calendarTitle = $(this).attr('calendarTitle'); //find ID
    var sTtitle = idate.substr(0, 4) + "年" + idate.substr(4,2) + "月";    
    calendarTitle.textContent = sTtitle;

    // 設置表格中的日期數據
    var calendarTable = $(this).attr('calendarTable'); //find ID   

    var tds = $("#calendarTable").find("td");
     var firstDay = new Date(iYear, iMonth - 1, 1);  //當前月第一天
     $("#calendarTable td").each(function (i) {      
       $(this).removeClass('currentDay greenbox');
       $(this).removeClass('currentMonth'); //當月
       $(this).removeClass('otherMonth');
      var currentDay = new Date(iYear, iMonth - 1, i + 1 - firstDay.getDay());
      var sThisDay = getDateStr(currentDay);  
      $(this).html(currentDay.getDate());
      $(this).attr('data',sThisDay)
      console.log(getDateStr(new Date()));
      if (sThisDay === getDateStr(new Date())) { //當天       
        $(this).addClass('currentDay greenbox');
      } else if (sThisDay.substr(0, 6) === getDateStr(firstDay).substr(0, 6)) {
        $(this).addClass('currentMonth'); //當月
      } else { //其他月
        $(this).addClass('otherMonth');
      }
     })
  
    }

 /**
* 繫結上個月下個月事件
*/
function bindEvent() {
    $('#prevMonth').bind("click", function(){
        toPrevMonth();
      });
    
    $('#nextMonth').bind("click", function(){
       toNextMonth();
    });

    var calendarTable = $(this).attr('calendarTable'); //find ID   
    var tds = $("#calendarTable").find("td");

    $("#calendarTable td").click(function(e) {    
    
    $("#datepicker").val(getDateStr(dateObj.getDate()).substr(0 ,4)+"/"+getDateStr(dateObj.getDate()).substr(4 ,2)+"/"+$(event.target).html());    
    });
   
  }


/* *
* 點選上個月圖示觸發
*/
function toPrevMonth() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    showCalendarData();
  }
 /**
 * 點選下個月圖示觸發
 */
   function toNextMonth() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    showCalendarData();
  }
 /**
 * 日期轉化為字串， 4位年 2位月 2位日
 */
   function getDateStr(date) {
    var iYear = date.getFullYear();
    var iMonth = date.getMonth() + 1; //月從0開始計數
    var idate = date.getDate();
     
    iMonth = (iMonth > 9) ? ("" + iMonth) : ("0" + iMonth);
    idate = (idate > 9) ? ("" + idate) : ("0" + idate);
    return iYear + iMonth + idate;
  }
    
 
