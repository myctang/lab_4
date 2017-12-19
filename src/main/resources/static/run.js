var curl;
(function () {

    curl({
        main: 'bone',
        packages: {
            // Your application's package
            bone: { location: 'bone' },
            // Third-party packages
            curl: { location: 'lib/curl/src/curl' },
            jquery: { location: 'lib/jquery/jquery', main: '.' },
            Backbone: { location: 'lib/backbone-amd/backbone', main: '.' },
            underscore: { location: 'lib/lodash/lodash', main: '.' }
        }
    });

}());