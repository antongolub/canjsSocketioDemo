define(["can","controls/defaultControl","text!templates/root.hbs"],function(e,t,n){return t.extend({init:function(){var t=this;t.element=t.element.append(e.view.mustache(n)()).find("#root"),t.hide()}})});