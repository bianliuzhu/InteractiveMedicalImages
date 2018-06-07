module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            default: {
                src: [
                    'dist',
                    'docs',
                    'build'
                ]
            }
        },
        copy: {
            bower: {
                src: [
                    'bower_components/cornerstone/dist/cornerstone.min.css',
                    'bower_components/cornerstone/dist/cornerstone.js',
                    'bower_components/cornerstoneTools/dist/cornerstoneTools.js',
                    'bower_components/cornerstoneWADOImageLoader/dist/cornerstoneWADOImageLoader.js',
                    'bower_components/cornerstoneWebImageLoader/dist/cornerstoneWebImageLoader.js',
                    'bower_components/cornerstoneMath/dist/cornerstoneMath.js',
                    'bower_components/cornerstone-file-image-loader/dist/cornerstoneFileImageLoader.js',
                    'bower_components/image-jpeg2000/dist/jpx.js',
                    'bower_components/dicomParser/dist/dicomParser.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/hammerjs/hammer.min.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery/dist/jquery.min.map',
                    'bower_components/bootstrap/dist/css/bootstrap.min.css'
                ],
                dest: 'lib',
                expand: true,
                flatten: true
            }

        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('buildAll', ['clean']);
    grunt.registerTask('default', ['buildAll']);
};

//发布流程:

// 1)更新版本号

// 2)进行构建(需要用正确的构建号更新分区版本)

// 3)提交修改

// git提交是“改变....”

// 4)标记提交

// git标签- 0.1.0 -m“版本0.1.0”

// 5)推到github

// git推源主标签