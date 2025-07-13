const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

    name: 'portal',

    shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
        'ngx-toastr': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    },

    sharedMappings: ['ngx-toastr'],
});
