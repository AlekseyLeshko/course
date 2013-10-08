function Wobbler(element, min, max) {
    this.element = element;
    this.min = min;
    this.max = max;
    this.property = "transform";
    this.angle = 0;
    this.timeout = 16;

    var self = this;
    setInterval(function() { self.rotate(); }, this.timeout);
}

Wobbler.prototype.calculateAngle = function() {
    this.angle = Math.random() * (this.max - this.min) + this.min;
}

Wobbler.prototype.getProperty = function() {
    return "rotate(" + this.angle + "deg)";
}

Wobbler.prototype.setBrowserIndependentProperty = function() {
    var rotateCSSProperty = this.getProperty()
    this.element.style[this.property] = rotateCSSProperty;
    this.element.style["-ms-" + this.property] = rotateCSSProperty;
    this.element.style["-o-" + this.property] = rotateCSSProperty;
    this.element.style["-moz-" + this.property] = rotateCSSProperty;
    this.element.style["-webkit-" + this.property] = rotateCSSProperty;
}

Wobbler.prototype.rotate = function() {
    this.calculateAngle();

    this.setBrowserIndependentProperty();
}

var elementIds = ['rectangle', 'circle', 'triangle'];
for (var id in elementIds) {
    var domElement = document.getElementById(elementIds[id]);
    new Wobbler(domElement, -10, 25);
}