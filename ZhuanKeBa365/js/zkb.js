function showToast(msg, url) { $.toast(msg); if (typeof (url) != "undefined" && url != "") { setTimeout(function () { window.location.href = url; }, 2000); } }
$(document).ready(function () {
    $("body").css("min-height", $(window).height());
    $("#mainform").css("min-height", $(window).height());
})