/*! cornerstone-file-image-loader  | https://github.com/chafey/cornerstoneFileImageLoader */
//这是 DICOM P10文件的基础映像加载程序。它目前不支持压缩传输语法或大的 endian 传输语法。
//它将支持隐式小端转换语法，但显式小端更倾向于避免与SQ元素相关的任何解析问题。

var cornerstoneFileImageLoader = (function ($, cornerstone, cornerstoneFileImageLoader) {

    "use strict";

    if(cornerstoneFileImageLoader === undefined) {
        cornerstoneFileImageLoader = {};
    }



    function isColorImage(photoMetricInterpretation)
    {
        if(photoMetricInterpretation === "RGB" ||
            photoMetricInterpretation === "PALETTE COLOR" ||
            photoMetricInterpretation === "YBR_FULL" ||
            photoMetricInterpretation === "YBR_FULL_422" ||
            photoMetricInterpretation === "YBR_PARTIAL_422" ||
            photoMetricInterpretation === "YBR_PARTIAL_420" ||
            photoMetricInterpretation === "YBR_RCT")
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function createImageObject(dataSet, imageId, frame)
    {
        if(frame === undefined) {
            frame = 0;
        }

        // make the image based on whether it is color or not
        var photometricInterpretation = dataSet.string('x00280004');
        var isColor = isColorImage(photometricInterpretation);
        if(isColor === false) {
            return cornerstoneWADOImageLoader.makeGrayscaleImage(imageId, dataSet, dataSet.byteArray, photometricInterpretation, frame);
        } else {
            return cornerstoneWADOImageLoader.makeColorImage(imageId, dataSet, dataSet.byteArray, photometricInterpretation, frame);
        }
    }

    var multiFrameCacheHack = {};

    // 加载给定imageId的图像
    // wado url示例:
    // http://localhost:3333/wado?requestType=WADO&studyUID=1.3.6.1.4.1.25403.166563008443.5076.20120418075541.1&seriesUID=1.3.6.1.4.1.25403.166563008443.5076.20120418075541.2&objectUID=1.3.6.1.4.1.25403.166563008443.5076.20120418075557.1&contentType=application%2Fdicom&transferSyntax=1.2.840.10008.1.2.1
    // NOTE: 如果不指定transferSyntax，那么这个实例将会以显式的小Endian传输语法返回，但是Osirix没有这样做，而且似乎会返回它所存储的传输语法
    function loadImage(imageId) {
        // 创建一个延迟对象
        // TODO:考虑不使用jquery进行延迟——可能是cujo的when库
        var deferred = $.Deferred();

        //通过解析imageId的url模式和框架索引来构建url
        var url = imageId;
        url = url.substring(12);
        var frameIndex = url.indexOf('frame=');
        var frame;
        if(frameIndex !== -1) {
            var frameStr = url.substr(frameIndex + 6);
            frame = parseInt(frameStr);
            url = url.substr(0, frameIndex-1);
        }

        // if multiframe and cached, use the cached data set to extract the frame
        if(frame !== undefined &&
            multiFrameCacheHack.hasOwnProperty(url))
        {
            var dataSet = multiFrameCacheHack[url];
            var imagePromise = createImageObject(dataSet, imageId, frame);
            imagePromise.then(function(image) {
                deferred.resolve(image);
            }, function() {
                deferred.reject();
            });
            return deferred;
        }

        var fileIndex = parseInt(url);
        var file = cornerstoneFileImageLoader.getFile(fileIndex);
        if(file === undefined) {
            deferred.reject('unknown file index ' + url);
            return deferred;
        }

        // Read the DICOM Data
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            // Parse the DICOM File
            var dicomPart10AsArrayBuffer = e.target.result;
            var byteArray = new Uint8Array(dicomPart10AsArrayBuffer);
            var dataSet = dicomParser.parseDicom(byteArray);

            // if multiframe, cache the parsed data set to speed up subsequent
            // requests for the other frames
            if(frame !== undefined) {
                multiFrameCacheHack[url] = dataSet;
            }

            var imagePromise = createImageObject(dataSet, imageId, frame);
            imagePromise.then(function(image) {
                deferred.resolve(image);
            }, function() {
                deferred.reject();
            });
        };
        fileReader.readAsArrayBuffer(file);

        return deferred;
    }

    // 使用http和https前缀，这样我们就可以直接使用wado URL
    cornerstone.registerImageLoader('dicomfile', loadImage);

    return cornerstoneFileImageLoader;
}($, cornerstone, cornerstoneFileImageLoader));
/**
 */
var cornerstoneFileImageLoader = (function (cornerstoneFileImageLoader) {

    "use strict";

    if(cornerstoneFileImageLoader === undefined) {
        cornerstoneFileImageLoader = {};
    }

    var files = [];

    function addFile(file) {
        var fileIndex =  files.push(file);
        return fileIndex - 1;
    }

    function getFile(index) {
        return files[index];
    }

    function purge() {
        files = [];
    }

    // module exports
    cornerstoneFileImageLoader.addFile = addFile;
    cornerstoneFileImageLoader.getFile = getFile;
    cornerstoneFileImageLoader.purge = purge;

    return cornerstoneFileImageLoader;
}(cornerstoneFileImageLoader));