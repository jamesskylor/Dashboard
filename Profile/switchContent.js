$(function() {

    var $mainContent = $("#contentContainer"),
        $pageWrap    = $("#dashboardContent"),
        baseHeight   = 0;
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $("td.selection").click((e)=>{
        e.preventDefault();
        _link = $(e.target).find(".myLink").attr("href");
        if(e.target.tagName == "A"){
            _link = e.target.getAttribute("href");
        }
        console.log(_link);
        loadContent(_link);
    });

    function loadContent(href){
        $mainContent
            .find("#theContent")
            .fadeOut(200, function() {
                $mainContent.hide().load(href, function() {
                    loadScripts(href);
                    $mainContent.fadeIn(200, function() {
                        console.log("hallo");
                        $pageWrap.animate({
                            height: baseHeight + $mainContent.height() + "px"
                        });
                        console.log("cya");
                    });
                });
            });
    }
    
    function loadScripts(href){
        console.log("got here at least");
        var theScriptName;
        if(href == "myProfile.html") {
            theScriptName = "js/profile.js";
        }
        else if(href == "myCompany.html") {
            theScriptName = "js/company.js";
        }
        else {
            theScriptName = "js/cofounder.js";
        }
        console.log(theScriptName);
        $.getScript(theScriptName, ()=>{
            loadValues();
        });
    }
    
    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
       loadContent(_link);
    });
    
});