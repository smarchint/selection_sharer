
(function($) {

  var SelectionSharer = function(options) {

    var self = this;

    options = options || {};
    if(typeof options == 'string')
        options = { elements: options };

    this.sel = null;
    this.textSelection='';
    this.htmlSelection='';
    // this.$popover;
    this.getSelectionText = function(sel) {
        var html = "", text = "";
        sel = sel || window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            text = container.textContent;
            html = container.innerHTML;
        }
        self.textSelection = text;
        self.htmlSelection = html || text;
        return text;
    };

    this.selectionDirection = function(selection) {
      var sel = selection || window.getSelection();
      var range = document.createRange();
      if(!sel.anchorNode) return 0;
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);
      var direction = (range.collapsed) ? "backward" : "forward";
      range.detach();
      return direction;
    };
    this.getXandY = function(sel){
      var r=sel.getRangeAt(0).getBoundingClientRect();
      var relative=document.body.parentNode.getBoundingClientRect();
      console.log(r);
      console.log(relative);
      var top =(r.top -relative.top - 40)+'px';//this will place ele below the selection
      var right =( r.right)+'px';
      var left=(r.left - relative.left)+'px';//
      return {
        top : top,
        right : right,
        left : left
      };
    }
    this.show = function(e) { 
      setTimeout(function() {
        var sel = window.getSelection();
        // sel = rangy.getSelection().nativeSelection;
        console.log(e);
        var selection = self.getSelectionText(sel);
        if(!sel.isCollapsed && selection && selection.length>10 && selection.match(/ /)) {
          var pos = self.getXandY(sel);
          var top = pos.top;
          var left = e.pageX - self.$popover.width();//pos.left;
          var right = pos.right;
          self.$popover.removeClass("anim").css("top", top).css("left", left).show();
          setTimeout(function() {
            self.$popover.addClass("anim").css("top", top);
          }, 0);
        }
      }, 10);
    };

    this.hide = function(e) {
      self.$popover.hide();
      return true;
    };

    this.render = function() {
      var popoverHTML =  '<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">'
                       + '  <div id="selectionSharerPopover-inner">'
                       + '    <ul>'
                       + '      <li><a class="action saveAsSelection tweet"  title="Save this selection" >Tweet</a></li>'
                       + '      <li><a class="action saveAsNotes email"  title="Save this selection as Notes" ><svg width="20" height="20"><path stroke="%23FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>'
                       + '    </ul>'
                       + '  </div>'
                       // + '  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div>'
                       + '</div>';

      self.$popover = $(popoverHTML);
      // $(self.$popover).find('a.tweet').mousedown(self.handleSelectOnly);
      // self.$popover.find('a.email').mousedown(self.editSelection);
      $('body').append(self.$popover);
    };

    this.setElements = function(elements) {
      if(typeof elements == 'string') elements = $(elements);
      self.$elements = elements instanceof $ ? elements : $(elements);
      self.$elements.mouseup(self.show).mousedown(self.hide).addClass("selectionShareable");

    };
    this.getPosition = function() {
      var supportPageOffset = window.pageXOffset !== undefined;
      var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

      var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
      var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
      return {x: x, y: y};
    };

    this.render();
    // console.log(options);
    if(options.elements) {
      this.setElements(options.elements);
    }
  };

  $.fn.selectionSharer = function(handlers) {
    var sharer = new SelectionSharer();
    sharer.setElements(this);
    console.log(handlers);
    for(var clas in handlers){
      sharer.$popover.find('a.'+clas).mousedown(handlers[clas]);      
    }
    return this;
  };

})(jQuery);