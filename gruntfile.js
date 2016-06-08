module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            files: ["app/**/*.js", "config/**/*.js"], // the watched files
            target: ['file.js']
        },
        watch: {
            scripts: {
                files: ['app/**/*.js', 'gulpfile.js', 'gulpfile.js', '!node_modules/**/*.js', "config/**/*.js"], // the watched files
                tasks: ["jshint"], // the task to run
                options: {
                    spawn: false // makes the watch task faster
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/app/**/*.js',
                dest: 'bin/bundle.min.js'
            }
        },
        node_mocha: {
            test: {
                src: ['tests/**/tests/*.js'],
                options: {
                    mochaOptions: {
                        globals: ['expect'],
                        timeout: 3000,
                        ignoreLeaks: false,
                        ui: 'bdd',
                        reporter: 'landing'
                    }
                }
            },
            coverage: {
                src: ['tests/**/test/*.js'],
                options: {
                    mochaOptions: {
                        globals: ['expect'],
                        timeout: 3000,
                        ignoreLeaks: false,
                        ui: 'bdd',
                        reporter: 'spec'
                    },
                    reportFormats: ['html'], // other grunt-mocha-istanbul can be added here
                    runCoverage: true // Run the unit test and generate coverage test
                }
            }
        },
        'http-server' : {
            coverage: {
                root: 'coverage'
            }
        },
        test: {
            src: ['app/**/tests/*.js'],
            dest: 'tests',
            options: {
                module: 'commonjs', //or
                target: 'es5', //or es3
                sourceMap: true,
                declaration: false,
                experimentalDecorators: true
            }
        },
        shell: {
            debug: {
                command: 'node-debug js/rest/rest-crud.js'
            }
        },
        nodemon: {
            dev: {
                script: 'build/server.js'
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-node-mocha');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');

    // Default tasks.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['test', 'node_mocha:test']);
    grunt.registerTask('coverage', ['test', 'node_mocha:coverage', 'http-server:coverage']);
    grunt.registerTask('run', ['nodemon']);
    // Must have installed node-inspector globally 'sudo npm install -g node-inspector'
    grunt.registerTask('debug', ['shell:debug']);
};
