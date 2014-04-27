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
            classes: [],
            limit: 5
        }

        var plugin = this;
        plugin.settings = {};

        var $element = $(element),
            element = element;

        var fillElement = function(title, body, content, footer) {
            var classes = plugin.settings.classes.length > 0 ? ' ' + plugin.settings.classes.join(' ') : '';
            var panel = '<div class="panel panel-default' + classes + '">';
            panel += '<div class="panel-heading">' + title + '</div>';
            panel += body != '' ? '<div class="panel-body">' + body + '</div>' : '';
            panel += content;
            panel += footer != '' ? '<div class="panel-footer" style="text-align: right;">' + footer + '</div>' : '';
            panel += '</div>';
            $element.html(panel);
        };

        var fetchFromGithub = function() {
            var user = plugin.settings.user;
            var action = plugin.settings.widget;

            $.ajax({
                url: 'https://api.github.com/users/' + user + '/' + action + '?sort=pushed',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    var limit = plugin.settings.limit;

                    var content = '<ul class="list-group">';
                    var total = 0;

                    $.each(data, function(k, v) {
                        if (limit > 0 && total >= limit) {
                            return;
                        }

                        content += '<li class="list-group-item">';

                        switch (action) {
                        case 'repos':
                            content += '<a href="' + v.html_url + '">' + v.full_name + '</a> \
                                      <br/>' + v.description;
                            break;
                        case 'gists':
                            // TODO
                            break;
                        }

                        total++;
                    });

                    content += '</ul>';

                    fillElement('GitHub ' + action, '', content, '');
                }
            });
        }

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            fetchFromGithub();
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
            var inputClasses = $(this).data('classes');
            var inputLimit = $(this).data('limit');

            if (inputWidget !== undefined) {
                var tmp = inputWidget.split("/");

                var options = {};
                options.user = tmp[0];
                options.widget = tmp[1];
                options.classes = (inputClasses !== undefined) ? inputClasses.split(' ') : [];
                options.limit = (inputLimit !== undefined) ? parseInt(inputLimit) : 5;

                var plugin = new $.githubWidget(this, options);
            }
        });
    });
})(jQuery);