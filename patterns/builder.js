"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["PNG"] = "png";
    ImageFormat["JPEG"] = "jpeg";
})(ImageFormat || (ImageFormat = {}));
class ImageBuilder {
    constructor() {
        this.formats = [];
        this.resolutions = [];
    }
    addPng() {
        this.formats.push(ImageFormat.PNG);
        return this;
    }
    addJpeg() {
        this.formats.push(ImageFormat.JPEG);
        return this;
    }
    addResolution(width, height) {
        this.resolutions.push({ width, height });
        return this;
    }
    build() {
        const res = [];
        for (const r of this.resolutions) {
            for (const f of this.formats) {
                res.push({
                    format: f,
                    width: r.width,
                    height: r.height,
                });
            }
        }
        return res;
    }
}
console.log(new ImageBuilder()
    .addJpeg()
    .addPng()
    .addResolution(100, 50)
    .addResolution(200, 150)
    .build());
