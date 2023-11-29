

function betterize(view) {
    // get all the RTE views
    var label = view.getAttribute('aria-label');
    // if the label is 'Description'
    if (label == 'Description') {
        // add a green border
        // insert div above it
        mdDiv = $('.betterizer');
        if (mdDiv.length == 0) {
            $(view).before('<div class="betterizer">Betterizer</div>');
            mdDiv = $('.betterizer');
        }
        mdDiv = mdDiv[0];
        // set text from view
        text = view.innerHTML
        text = text.replace(/<br>/g, '\n');
        // remove other tags
        text = text.replace(/<[^>]*>/g, '');
        try{
            mdDiv.innerHTML = marked.parse(text);
        } catch (e) {
            mdDiv.innerHTML = 'Error parsing markdown!!!\n' + e + '\n';
        }
        
    }

}
  
function readyStateChanged() {
    betterize();
}


function attachObservers() {
    setTimeout(()=> {
        var rteViews = $('.RichTextEditorWidget.ViewBorder');
        rteViews.each(function(i, view) {
            $(view).on('DOMSubtreeModified', function() {
                betterize(view);
            });
        });
     }
     ,3000);
}


$(window).on('load', attachObservers);

// enable marked.js to render images
// NOTE: Supports only images stored in EWM
renderer = new marked.Renderer();
renderer.image = function(href, title, text) {
    const url = href.startsWith('http') ? href : `images/${href}`; // for external links
    // max height is 400px
    // max width is 100%
    return `<img src="${url}" alt="${text}" style="max-height: 400px; max-width: 100%;">`;
};
marked.setOptions({
    renderer: renderer,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
});
