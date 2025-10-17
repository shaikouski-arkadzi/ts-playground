"use strict";
// Перечисление с названием TypesOfMedia, которое включает строчные типы video, audio
var TypesOfMedia;
(function (TypesOfMedia) {
    TypesOfMedia["VIDEO"] = "video";
    TypesOfMedia["AUDIO"] = "audio";
})(TypesOfMedia || (TypesOfMedia = {}));
// Перечисление с названием FormatsOfMedia, которое включает строчные видео-форматы: .mp4, .mov, .mkv, .flv, .webM
var FormatsOfMedia;
(function (FormatsOfMedia) {
    FormatsOfMedia["MP4"] = ".mp4";
    FormatsOfMedia["MOV"] = ".mov";
    FormatsOfMedia["MKV"] = ".mkv";
    FormatsOfMedia["FLV"] = ".flv";
    FormatsOfMedia["webM"] = ".webM";
})(FormatsOfMedia || (FormatsOfMedia = {}));
function playMedia({ name, type, format, subtitles, marks } = {
    name: "example",
    type: TypesOfMedia.VIDEO,
    format: FormatsOfMedia.MOV,
}) {
    let marksLog;
    // Создать функционал, что если marks - это массив, то "сложить" все эелементы в одну строку и поместить в marksLog
    // Если это строка, то просто поместить её в marksLog
    // Если что-то другое - то marksLog = "Unsupported type of marks"
    // Не допускайте any!
    if (Array.isArray(marks))
        marksLog = marks.join(" ");
    if (typeof marks === "string")
        marksLog = marks;
    marksLog = "Unsupported type of marks";
    console.log(`Media ${name}${format} is ${type}
    Marks: ${marksLog}
    Subtitles: ${subtitles !== null && subtitles !== void 0 ? subtitles : "none"}`);
    return "Media started";
}
playMedia({
    name: "WoW",
    format: FormatsOfMedia.MOV,
    type: TypesOfMedia.VIDEO,
    subtitles: "hmhmhm hmhmhm doh",
    marks: ["4:30", "5:40"],
});
