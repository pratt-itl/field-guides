(function (){
require.config({
    paths: {
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
        "bootstrap": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min",
        "firebase" : "https://www.gstatic.com/firebasejs/5.8.3/firebase",
        "blueImp" : "https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.1.0/js/md5",
        "mCustomScrollbar" : "https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min",
        "popper" : "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper",
        "sideComments" : window.basePath + "/scripts/js/sideComments/side-comments",
        "jsTree" : window.basePath + "/scripts/js/jstree/jstree.min",
        "lodash" : "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min",
        "docsearch" : "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min",
        "tocbot" : window.basePath + "/scripts/js/tocbot/tocbot.min",
    },
  
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "bootstrap": {
            deps: ["jquery","popper"]
        },  
        "jsTree" : {
            deps:["jquery"]
        },
        "mCustomScrollbar" : {
            deps:["jquery"]
        },
        "firebase" : {
            deps:["jquery"]
        },
        "popper" : {
            deps:["jquery"]
        },
        "sideComments" : {
            deps:["jquery"]
        },
        "lodash" : {
            deps:["jquery"]
        },
    },
    // This adds popper to the window, allowing Bootstrap to function correctly.
    map: {
        '*': {
            'popper.js': 'popper',
            'tocbot.min.js': 'tocbot'         
        }
    }  
  });

// Start the main app logic.
requirejs(['jquery', 'bootstrap', 'jsTree', 'sideComments', 'firebase', 'mCustomScrollbar', 'popper', 'docsearch', 'tocbot'],
function   ($,        bootstrap,   jsTree,   sideComments,   firebase,   mCustomScrollbar,   popper,  dsearch, tocbot    ) {
    // Add jquery to window
    window.$ = $;

    initJsTree($,jsTree);
    initMCustomScrollbar($, mCustomScrollbar);
    initOther($);
    initDocsearch(dsearch)
    initCommentableSections($,sideComments, firebase);
    initTocBot($);
    // applyStickiesToHeaders($); Disabled due to page size changes
});

function initTocBot($){
    $(function(){
        tocbot.init({
            // Where to render the table of contents.
            tocSelector: '.table-of-contents',
            // Where to grab the headings to build the table of contents.
            contentSelector: '.content-main',
            // Which headings to grab inside of the contentSelector element.
            headingSelector: 'h1, h2, h3',
            // Element to add the positionFixedClass to.
            positionFixedSelector: null,
            // Fixed position class to add to make sidebar fixed after scrolling
            // down past the fixedSidebarOffset.
            positionFixedClass: 'is-position-fixed',
            // fixedSidebarOffset can be any number but by default is set
            // to auto which sets the fixedSidebarOffset to the sidebar
            // element's offsetTop from the top of the document on init.
            fixedSidebarOffset: 'auto',
            // includeHtml can be set to true to include the HTML markup from the
            // heading node instead of just including the textContent.
            includeHtml: false,
            // onclick function to apply to all links in toc. will be called with
            // the event as the first parameter, and this can be used to stop,
            // propagation, prevent default or perform action
            onClick: false,
            // orderedList can be set to false to generate unordered lists (ul)
            // instead of ordered lists (ol)
            orderedList: true,
            collapseDepth: 4,
            // Smooth scrolling enabled.
            scrollSmooth: true,
          });
    })
}


function initDocsearch(ds){
    console.log("This is DOCSEARCH!", ds);
    ds({ 
              apiKey: 'cefac98b8e1c269bdea87e4e4fe915f5', 
              indexName: 'itl', 
              inputSelector: '#fgdocsearch', 
              debug: false // Set debug to true if you want to inspect the dropdown 
            }); 
}

function initCommentableSections($, SideComments, firebase){
    $(function(){
        $('#commentable-area h2').addClass('commentable-section')
        .each(function(i){ 
            let e = $(this);
            e.attr('data-section-id',(e.attr('id') || e.text())); 
        });

        initFireBase($, firebase, SideComments);
    })    
}

function initJsTree($,jsTree){
    window.jsTree = jsTree;
    $(function () {
        // $('#jsTreeNav').jstree();
        $('#jsTreeNav')
          // listen for event
          .on('select_node.jstree', function (e, data) {
            console.log("Tree item selected", data.node.a_attr.href);
            if(data.node.a_attr.href != "" && data.node.a_attr.href != "#"){ window.location.href = data.node.a_attr.href; }
          })
          .on('click', '.jstree-anchor', function (e) {
            $('#jsTreeNav').jstree(true).toggle_node(e.target);
          })
          // create the instance
          .jstree({
            // core : {
            //   dblclick_toggle : false
            // }
          });
      });
}

function initMCustomScrollbar($, mCustomScrollbar){
    $(document).ready(function () {
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });
        $('#sidebarCollapse').on('click', function () {
            // open or close navbar
            $('#sidebar').toggleClass('active');
  
            // move the open-close button
            $('#openSidebar').toggleClass('fixedRightOver')
  
            // close dropdowns
            $('.collapse.in').toggleClass('in');
            // and also adjust aria-expanded attributes we use for the open/closed arrows
            // in our CSS
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
      });
}

function initFireBase($, firebase, SideComments){
     // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD1Kn5LED_bdfFktGEbb5XEyN5hw5K7dm8",
        authDomain: "itl-fgfc.firebaseapp.com",
        databaseURL: "https://itl-fgfc.firebaseio.com",
        projectId: "itl-fgfc",
        storageBucket: "itl-fgfc.appspot.com",
        messagingSenderId: "282845883654"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // Init current user for side comments
    let currentUser = {
        id: 1,
        avatarUrl: "https://ca.slack-edge.com/T7XBZV1UL-U7XAKB1HQ-gbfbc3587f0e-48",
        name: "Guest"
        };

        if($(".commentable-section").length == 0){ return; }        
    

    // Get existing comments
    let existingComments = [];
    firebase.database().ref('comments' + getPostLoc()).once('value').then(function(data) {
        let val = data.val();
        if(val){
            // Convert val into a array from its own keys
            let comms = Object.keys(val).map(k => val[k]);
            // If there are multiple comments on this page
            if(Array.isArray(comms)){
                sectionIdObjs = {};
                comms.forEach(c => {
                    if(!sectionIdObjs[c.sectionId]){
                        sectionIdObjs[c.sectionId] = [];
                    } 
                    sectionIdObjs[c.sectionId].push(c);
                })
                Object.keys(sectionIdObjs).forEach(k => {
                    existingComments.push({ 
                        sectionId: k,
                        comments: sectionIdObjs[k]
                    });
                })
            // If there is a single comment on this page
            } else {
                existingComments.push({
                    sectionId: comms.sectionId,
                    comments: [comms]
                })
            }
        }
        // Then, create a new SideComments instance, passing in the wrapper element and the optional the current user and any existing comments.
        var sideComments = new SideComments('#commentable-area', currentUser, existingComments);

        // Listen to "commentPosted", and send a request to your backend to save the comment.
        // More about this event in the "docs" section.
        sideComments.on('commentPosted', function( comment ) {
            let loc ='comments' + getPostLoc();
            let postData = {
                sectionId: comment.sectionId,
                authorAvatarUrl: currentUser.avatarUrl,
                authorName: currentUser.name,
                comment: comment.comment
            }
            // Get a key for a new Post.
            var newPostKey = firebase.database().ref(loc).push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/' + loc + '/' + newPostKey] = postData;
            firebase.database().ref().update(updates);
            sideComments.insertComment(comment);
        });

        // Listen to "commentDeleted" and send a request to your backend to delete the comment.
        // More about this event in the "docs" section.
        // sideComments.on('commentDeleted', function( commentId ) {
        //     $.ajax({
        //         url: '/comments/' + commentId,
        //         type: 'DELETE',
        //         success: function( success ) {
        //             // Do something.
        //         }
        //     });
        // });  
    });
}

// Remove ampersands from strings
function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/&/g, '-and-')
        .replace(/[\s\W-]+/g, '-')
        .replace(/[^a-zA-Z0-9-_]+/g,'');
}

// Gets the current window path
function getPostLoc(){
    return slugify(window.location.pathname + '/');
}

function applyStickiesToHeaders($){

    function scrollTop(){
        let navbarThickness = 52;
       return $(window).scrollTop() + navbarThickness;
    }
    var stickyHeaders = (function() {

        var $window = $(window),
            $stickies;
        
        var load = function(stickies) {
        
          if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
        
            $stickies = stickies.each(function() {
        
              var $thisSticky = $(this).wrap('<div class="followWrap" />');
        
              $thisSticky
                  .data('originalPosition', $thisSticky.offset().top)
                  .data('originalHeight', $thisSticky.outerHeight())
                    .parent()
                    .height($thisSticky.outerHeight()); 			  
            });
        
            $window.off("scroll.stickies").on("scroll.stickies", function() {
            _whenScrolling();		
            });
          }
        };
        
        var _whenScrolling = function() {
        
          $stickies.each(function(i) {			
        
            var $thisSticky = $(this),
                $stickyPosition = $thisSticky.data('originalPosition');
        
            if ($stickyPosition <= scrollTop())  {        
              
              var $nextSticky = $stickies.eq(i + 1),
                  $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
        
              $thisSticky.addClass("fixed");
        
              if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
        
                $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
              }
        
            } else {
              
              var $prevSticky = $stickies.eq(i - 1);
        
              $thisSticky.removeClass("fixed");
        
              if ($prevSticky.length > 0 && scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
        
                $prevSticky.removeClass("absolute").removeAttr("style");
              }
            }
          });
        };
        
        return {
          load: load
        };
        })();
        
        $(function() {
        stickyHeaders.load($(".commentable-section"));
        });
}

function initOther(){

    //applyModalBlowups();

    // Dynamically add ids to headings
    $(document).ready(function() {
        $("content h1, content h2, content h3, content h4, content h5, content h5").each(function(i) {
        var heading = $(this);
        var headingtext = heading.text().toLowerCase().trim().replace(/[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
        heading.attr("id",headingtext );
    });
    });


    function applyModalBlowups(){
        // Get the modal
        $(function () {
            var modal = document.getElementById('myModal');

            // Get the image and insert it inside the modal - use its "alt" text as a caption
            var modalImg = $("#img01");
            var captionText = document.getElementById("caption");
            console.log($('.content'));
            $("p").children('img').each(function (index, value) {
            console.log("Found an image",value);
            value.click(function(){
                modal.style.display = "block";
                var newSrc = this.src;
                modalImg.attr('src', newSrc);
                captionText.innerHTML = this.alt;
                });
            });
            console.log("Hello im here");

            // Get the <span> element that closes the modal
            var spans = document.getElementsByClassName("close");
            if(spans.length == 0){ return; }
            var span = spans[0];
            if(!span || span == null || span == undefined) { return ;}

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }
        });
    };
}
})();