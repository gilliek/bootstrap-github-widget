/* ========================================================================
 * Bootstrap Github Widget: bootsrap-github-widget.js v1.0.0
 * ========================================================================
 * Copyright 2014 Kevin Gillieron <kevin.gillieron@gw-computing.net>
 * Licensed under BSD 3-clauses
 * (https://github.com/gilliek/bootstrap-github-widget/blob/master/LICENSE)
 * ======================================================================== */

(function ($) {
    'use strict';

    $.githubWidget = function(element, options) {
        // defaults options
        var defaults = {
            user: '',
            widget: 'repos',
            limit: 5
        }

        var plugin = this;
        plugin.settings = {};

        var $element = $(element),
            element = element;

            plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
        }

        plugin.init();
    }

    // GITHUB WIDGET PLUGIN DEFINITION
    // ===============================

    $.fn.githubWidget = function(options) {
        return this.each(function() {
            var plugin = new $.githubWidget(this, options);
        });
    }

    // GITHUB WIDGET DATA API
    // ======================

    $(function() {
        $.each($('div.github-widget'), function() {
            var inputWidget = $(this).data('ghwidget');
            var inputLimit = $(this).data('limit');

            if (inputWidget !== undefined) {
                var tmp = inputWidget.split("/");

                var options = {};
                options.user = tmp[0];
                options.widget = tmp[1];
                options.limit = (inputLimit !== undefined) ? parseInt(inputLimit) : -1;

                var plugin = new $.githubWidget(this, options);
            }
        });
    });
})(jQuery);