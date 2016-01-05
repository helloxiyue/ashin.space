module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    cleancss: true
                },
                files: {
                    "public/css/nano-bootstrap.css": "public/less-1.1.0/bootstrap.less",
                    "public/css/nano-bootstrap.patch.css": "public/less-1.1.0/patch.less",
                    "public/css/ashin.css": "public/less-1.1.0/ashin.less"
                }
            }          
        },
        watch: {
            files: ['public/less-1.1.0/*.less','public/less-1.1.0/mixins/*.less'],
            tasks: ['less'],
            options: {
                spawn: false,
            }
        }
    });
    
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['less','watch']);

}