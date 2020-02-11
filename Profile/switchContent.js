$(function() {

    var $mainContent = $("#contentContainer"),
        $pageWrap    = $("#dashboardContent"),
        baseHeight   = 0;
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $("td.selection").click((e)=>{
        e.target.children().preventDefault();
        _link = $(e.target).find(".myLink").attr("href");
        console.log(_link);
        history.pushState(null, null, _link);
        loadContent(_link);
    });

    function loadContent(href){
        $mainContent
            .find("#theContent")
            .fadeOut(200, function() {
                $mainContent.hide().load(href + " #theContent", function() {
                    $mainContent.fadeIn(200, function() {
                        $pageWrap.animate({
                            height: baseHeight + $mainContent.height() + "px"
                        });
                    });
                    $("#theNav td").removeClass("current");
                    console.log(href);
                    $("#theNav td[href$="+href+"]").addClass("current");
                });
            });
    }
    
    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
       loadContent(_link);
    });
    
});