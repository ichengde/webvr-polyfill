/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Util = require('./util.js');

function RotateInstructions() {
    this.loadIcon_();

    var overlay = document.createElement('div');
    var s = overlay.style;
    s.position = 'fixed';
    s.top = 0;
    s.right = 0;
    s.bottom = 0;
    s.left = 0;
    s.backgroundColor = '#F5F6EB';
    // Force this to be above the fullscreen canvas, which is at zIndex: 999999.
    s.zIndex = 1000000;

    var img = document.createElement('img');
    img.src = this.icon;
    var s = img.style;
    s.width = '60px';
    overlay.appendChild(img);

    var text = document.createElement('div');
    var s = text.style;
    s.textAlign = 'center';
    s.fontSize = '16px';
    s.lineHeight = '24px';
    s.margin = '24px 20%';
    s.width = '60%';
    s.color = '#515151';
    text.innerHTML = '请将您的手机放入VR眼镜中';
    overlay.appendChild(text);

    this.overlay = overlay;
    this.text = text;

    this.hide();
}

RotateInstructions.prototype.show = function (parent) {
    if (!parent && !this.overlay.parentElement) {
        document.body.appendChild(this.overlay);
    } else if (parent) {
        if (this.overlay.parentElement && this.overlay.parentElement != parent)
            this.overlay.parentElement.removeChild(this.overlay);

        parent.appendChild(this.overlay);
    }

    this.overlay.style.display = 'block';

    var img = this.overlay.querySelector('img');
    var s = img.style;

    if (Util.isLandscapeMode()) {
        s.width = '20%';
        s.marginLeft = '40%';
        s.marginTop = '3%';
    } else {
        s.width = '50%';
        s.marginLeft = '25%';
        s.marginTop = '25%';
    }
};

RotateInstructions.prototype.hide = function () {
    this.overlay.style.display = 'none';
};

RotateInstructions.prototype.showTemporarily = function (ms, parent) {
    this.show(parent);
    this.timer = setTimeout(this.hide.bind(this), ms);
};

RotateInstructions.prototype.disableShowTemporarily = function () {
    clearTimeout(this.timer);
};

RotateInstructions.prototype.update = function () {
    this.disableShowTemporarily();
    // In portrait VR mode, tell the user to rotate to landscape. Otherwise, hide
    // the instructions.
    if (!Util.isLandscapeMode() && Util.isMobile()) {
        this.show();
    } else {
        this.hide();
    }
};

RotateInstructions.prototype.loadIcon_ = function () {
    // Encoded asset_src/rotate-instructions.svg
    this.icon = 'data:image/png;base64,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';
};

module.exports = RotateInstructions;
