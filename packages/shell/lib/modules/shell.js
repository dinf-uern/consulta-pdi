Shell = {
    config: new ReactiveVar({}),
    setConfig: function(config){
        this.config.set(config);

        if (config.lang){
            TAPi18n.setLanguage(config.lang);
            moment.locale(config.lang);
        }

        if (config.version){
            Footer.setTextOnRight(config.version);
        }

        if (config.appIcon) {
            Header.appIcon.set(config.appIcon);
        }

        if (config.appName) {
            Header.appName.set(config.appName);
        }
    }
}