$(function() {
    var url = window.location.href;
    $(".navigation a").each(function() {
        if (url == (this.href)) {
            $(this).closest("a").addClass("active");
        }
    });
});