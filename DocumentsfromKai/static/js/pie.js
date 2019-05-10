window.onload=function(){
        var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var InfoPie = function () {
            function InfoPie(container, color, activeClass, start) {_classCallCheck(this, InfoPie);
                this.namespace = container;
                this.root = container;
                this.isActive = activeClass;
                this.start = start;
                this.container = document.querySelector('.' + this.root + ' svg');
                this.slades = [].concat(_toConsumableArray(document.querySelectorAll('.' + this.namespace + '__slide')));
                this.slidesInfo = [];
                this.svgElement = null;
                this.accentColor = color;
                this.sizes = {
                    width: 400,
                    height: 400,
                    center: function center() {
                        return { x: this.width / 2, y: this.height / 2 };
                    } };

                this.correctArray = [];
                this.pointsCoordinate = [];
                this.dotsCoordinates = [];
                this.lineCoordinates = [];
                this.rectCoordinates = [];
                this.textCoordinates = [];
                this.radius = 100;
                this.init();
            }_createClass(InfoPie, [{ key: 'pdt', value: function pdt(
                per) {
                    return Math.PI * 2 / 100 * per;
                } }, { key: 'getslidesInfo', value: function getslidesInfo()
                {
                    this.slidesInfo = this.slades.map(function (slide) {
                        var item = Object.create(null);
                        item.element = slide;
                        item.part = slide.getAttribute('data-slide-part');
                        item.color = slide.getAttribute('data-slide-color');
                        return item;
                    });
                } }, { key: 'hideSlides', value: function hideSlides()
                {
                    //this.slades.forEach(slide => slide.style.display = 'none')
                } }, { key: 'pathCreator', value: function pathCreator(
                color, value) {
                    var pt = document.createElementNS('http://www.w3.org/2000/svg', "path");
                    pt.setAttributeNS(null, 'stroke-width', '' + 0);
                    pt.setAttributeNS(null, 'stroke', '' + color);
                    pt.setAttributeNS(null, 'fill', '' + color);
                    pt.setAttributeNS(null, 'd', '' + value);
                    return pt;
                } }, { key: 'circleCreator', value: function circleCreator(
                color, radius, x, y) {
                    var cr = document.createElementNS('http://www.w3.org/2000/svg', "circle");
                    cr.setAttributeNS(null, 'cx', '' + x);
                    cr.setAttributeNS(null, 'cy', '' + y);
                    cr.setAttributeNS(null, 'r', '' + radius);
                    cr.setAttributeNS(null, 'stroke', '' + color);
                    cr.setAttributeNS(null, 'fill', 'transparent');
                    cr.setAttributeNS(null, 'stroke-width', '' + 1);
                    return cr;
                } }, { key: 'lineCreator', value: function lineCreator(
                color, x1, y1, x2, y2) {
                    var ln = document.createElementNS('http://www.w3.org/2000/svg', "line");
                    ln.setAttributeNS(null, 'x1', '' + x1);
                    ln.setAttributeNS(null, 'y1', '' + y1);
                    ln.setAttributeNS(null, 'x2', '' + x2);
                    ln.setAttributeNS(null, 'y2', '' + y2);
                    ln.setAttributeNS(null, 'stroke', '' + color);
                    ln.setAttributeNS(null, 'fill', 'transparent');
                    ln.setAttributeNS(null, 'stroke-width', '' + 1);
                    return ln;
                } }, { key: 'rectCreator', value: function rectCreator(
                color, x, y, w, h) {
                    var rt = document.createElementNS('http://www.w3.org/2000/svg', "rect");
                    rt.setAttributeNS(null, 'x', '' + x);
                    rt.setAttributeNS(null, 'y', '' + y);
                    rt.setAttributeNS(null, 'width', '' + w);
                    rt.setAttributeNS(null, 'height', '' + h);
                    rt.setAttributeNS(null, 'stroke', '' + color);
                    rt.setAttributeNS(null, 'fill', 'transparent');
                    rt.setAttributeNS(null, 'stroke-width', '' + 1);
                    return rt;
                } }, { key: 'textCreator', value: function textCreator(
                color, x, y, text, size) {
                    var tx = document.createElementNS('http://www.w3.org/2000/svg', "text");
                    tx.setAttributeNS(null, 'fill', '' + color);
                    tx.setAttributeNS(null, 'x', '' + x);
                    tx.setAttributeNS(null, 'y', '' + y);
                    tx.setAttributeNS(null, 'text-anchor', 'middle');
                    tx.setAttributeNS(null, 'font-size', '' + size);
                    tx.innerHTML = text + '%';
                    //text-anchor
                    return tx;
                } }, { key: 'getPointsCoordinate', value: function getPointsCoordinate()
                {var _this = this;
                    var start = this.start;
                    var angle = start;
                    var center = 0;var
                    PI = Math.PI,floor = Math.floor,random = Math.random,sin = Math.sin,cos = Math.cos;
                    this.slidesInfo.forEach(function (slide, i, self) {
                        var a = Object.create(null);
                        var dot = Object.create(null);
                        var line = Object.create(null);
                        var rect = Object.create(null);
                        var text = Object.create(null);

                        angle += +slide.part;
                        center = start + (angle - start) / 2;
                        var currentCenterAngle = _this.pdt(center);

                        a.x1 = floor(sin(_this.pdt(start)) * _this.radius) + _this.sizes.center().x;
                        a.y1 = floor(cos(_this.pdt(start)) * -_this.radius) + _this.sizes.center().y;
                        a.x2 = floor(sin(_this.pdt(angle)) * _this.radius) + _this.sizes.center().x;
                        a.y2 = floor(cos(_this.pdt(angle)) * -_this.radius) + _this.sizes.center().y;

                        dot.x = floor(sin(currentCenterAngle) * _this.radius / 2.1) + _this.sizes.center().x;
                        dot.y = floor(cos(currentCenterAngle) * -_this.radius / 2.1) + _this.sizes.center().y;

                        line.x1 = dot.x;
                        line.y1 = dot.y;
                        line.x2 = floor(sin(_this.pdt(center)) * _this.radius * 1.5) + _this.sizes.center().x;
                        line.y2 = floor(cos(_this.pdt(center)) * -_this.radius * 1.5) + _this.sizes.center().y;

                        rect.x = line.x2;
                        rect.y = line.y2;
                        rect.lineLink = '';
                        if (0 <= currentCenterAngle && currentCenterAngle <= 1.5) {
                            rect.lineLink = 'bl';
                            text.lineLink = 'bl';
                        } else if (1.5 < currentCenterAngle && currentCenterAngle <= 3) {
                            rect.lineLink = 'tl';
                            text.lineLink = 'tl';
                        } else if (3 < currentCenterAngle && currentCenterAngle <= 4.5) {
                            rect.lineLink = 'tr';
                            text.lineLink = 'tr';
                        } else if (4.5 < currentCenterAngle) {
                            rect.lineLink = 'br';
                            text.lineLink = 'br';
                        } else {
                            rect.lineLink = 'none';
                            text.lineLink = 'none';
                        }
                        text.x = line.x2;
                        text.y = line.y2;
                        text.content = slide.part;

                        a.isLarge = +slide.part > 50 ? 1 : 0;

                        start = +slide.part + start;

                        _this.lineCoordinates.push(line);
                        _this.dotsCoordinates.push(dot);
                        _this.rectCoordinates.push(rect);
                        _this.textCoordinates.push(text);
                        _this.pointsCoordinate.push(a);
                    });

                } }, { key: 'createSvgPie', value: function createSvgPie()
                {var _this2 = this;var _sizes$center =
                    this.sizes.center(),x = _sizes$center.x,y = _sizes$center.y;
                    var pts = this.pointsCoordinate.map(function (sl, i) {
                        return _this2.pathCreator(
                            _this2.slidesInfo[i].color, 'M' +
                            sl.x1 + ' ' + sl.y1 + ' \n\t\t\t\t A' +
                            _this2.radius + ' ' + _this2.radius + ', 0, ' + sl.isLarge + ', 1, ' + sl.x2 + ' ' + sl.y2 + ' L ' + x + ' ' + y + ' Z');
                    });
                    var dots = this.dotsCoordinates.map(function (dt, i) {
                        return _this2.circleCreator(_this2.accentColor, 2, dt.x, dt.y);
                    });
                    var lines = this.lineCoordinates.map(function (line, i) {
                        return _this2.lineCreator(_this2.accentColor, line.x1, line.y1, line.x2, line.y2);
                    });
                    var rects = this.rectCoordinates.map(function (rt, i) {
                        var offset_x = 0;
                        var offset_y = 0;
                        if (rt.lineLink === 'bl') {
                            offset_y = -25;
                        } else if (rt.lineLink === 'tr') {
                            offset_x = -35;
                        } else if (rt.lineLink === 'br') {
                            offset_x = -35;
                            offset_y = -25;
                        }
                        var rct = _this2.rectCreator(_this2.accentColor, rt.x + offset_x, rt.y + offset_y, 35, 25);

                        return rct;
                    });

                    var texts = this.textCoordinates.map(function (rt, i) {
                        var offset_x = 0;
                        var offset_y = 0;
                        if (rt.lineLink === 'bl') {
                            offset_x = 17.5;
                            offset_y = -8;
                        } else if (rt.lineLink === 'tl') {
                            offset_x = 17.5;
                            offset_y = 16.5;
                        } else if (rt.lineLink === 'tr') {
                            offset_x = -17.5;
                            offset_y = 16.5;
                        } else if (rt.lineLink === 'br') {
                            offset_x = -17.5;
                            offset_y = -8;
                        }
                        var txt = _this2.textCreator(_this2.accentColor, rt.x + offset_x, rt.y + offset_y, rt.content, '12');

                        return txt;
                    });

                    pts.forEach(function (v) {_this2.container.appendChild(v);});
                    dots.forEach(function (v) {_this2.container.appendChild(v);});
                    lines.forEach(function (v) {_this2.container.appendChild(v);});
                    rects.forEach(function (v) {_this2.container.appendChild(v);});
                    texts.forEach(function (v) {_this2.container.appendChild(v);});
                } }, { key: 'setController', value: function setController()
                {var _this3 = this;
                    var path = [].concat(_toConsumableArray(document.querySelectorAll('.' + this.root + ' svg path')));
                    path.forEach(function (p) {return p.classList.remove(_this3.isActive);});
                    path.forEach(function (p, i) {
                        p.addEventListener('mouseover', function () {
                            _this3.slades[i].classList.add(_this3.isActive);
                        });
                        p.addEventListener('mouseout', function () {
                            _this3.slades[i].classList.remove(_this3.isActive);
                        });
                    });
                } }, { key: 'init', value: function init()
                {
                    this.getslidesInfo();
                    this.hideSlides();
                    this.getPointsCoordinate();
                    this.createSvgPie();
                    this.setController();
                } }]);return InfoPie;}();

        new InfoPie('info-pie', '#980023', 'info-pie__slide--isActiveToBottom', 0);

        new InfoPie('info-piesecond', '#015C65', 'info-pie__slide--isActiveToTop', -10);
}
