Shell = {
    setConfig: function(config){
        if (config.lang){
            TAPi18n.setLanguage(config.lang);
            moment.locale(config.lang);
        }

        if (config.version){
            Footer.setTextOnRight(config.version);
        }
    }
}