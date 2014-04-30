/* ========================================================================
 * Bootstrap Github Widget: bootsrap-github-widget.js v1.0.0
 * ========================================================================
 * Copyright 2014 Kevin Gillieron <kevin.gillieron@gw-computing.net>
 * Licensed under BSD 3-clauses
 * (https://github.com/gilliek/bootstrap-github-widget/blob/master/LICENSE)
 * ======================================================================== */

(function ($) {
    'use strict';

    // GITHUB WIDGET CLASS DEFINITION
    // ==============================

    $.githubWidget = function(element, options) {
        // defaults options
        var defaults = {
            user: '',
            widget: 'repos',
            title: 'auto',
            body: '',
            footer: '',
            extrainfo: false, // require font-awesome
            limit: 5
        }

        var plugin = this;
        plugin.settings = {};

        var $element = $(element),
            element = element;

        var fillElement = function(title, body, content, footer) {
            var panel = '<div class="panel panel-default">';
            panel += '<div class="panel-heading">' + title + '</div>';
            panel += body != '' ? '<div class="panel-body">' + body + '</div>' : '';
            panel += content;
            panel += footer != '' ? '<div class="panel-footer" style="text-align: right;">' + footer + '</div>' : '';
            panel += '</div>';
            $element.html(panel);
        };

        var githubURL = function() {
            switch (plugin.settings.widget) {
            case 'repos':
                return 'https://github.com/' + plugin.settings.user + '?tab=repositories';
            case 'gists':
                return 'https://gist.github.com/' + plugin.settings.user;
            default:
                return '#';
            }
        };

        var autoTitle = function() {
            if (plugin.settings.title !== 'auto') { return plugin.settings.title; }
            return 'GitHub ' + plugin.settings.widget;
        }

        var autoBody = function(owner, numberOf) {
            if (plugin.settings.body !== 'auto') { return plugin.settings.body; }
            return '<div class="media">\
                        <a class="pull-left" href="https://github.com/' + plugin.settings.user + '">\
                            <img class="media-object"\
                                 src="' + owner.avatar_url + '"\
                                 width="64"\
                                 height="64"\
                                 alt="' + plugin.settings.user + '" />\
                        </a>\
                        <div class="media-body">\
                            <h4 class="media-heading">' + plugin.settings.user + '</h4>\
                            ' + numberOf + ' ' + plugin.settings.widget + ' \
                            (<a href="' + githubURL() + '">see all</a>)\
                        </div>\
                    </div>';
        };

        var autoFooter = function(footer) {
            if (plugin.settings.footer !== 'auto') { return plugin.settings.footer; }
            return '<a href="https://github.com/' + plugin.settings.user + '">'
                        + plugin.settings.user +
                    '</a> <span class="text-muted">@ GitHub</span>';
        };

        var repoInfo = function(repo) {
            if (!plugin.settings.extrainfo) { return ''; }
            return '<span class="pull-right">\
                        <i class="fa fa-eye"></i> ' + repo.watchers_count + '&nbsp;&nbsp;\
                        <i class="fa fa-star"></i> ' + repo.stargazers_count + '&nbsp;&nbsp;\
                        <i class="fa fa-code-fork"></i> ' + repo.forks + '\
                   </span>';
        };

        var gistInfo = function(gist) {
            if (!plugin.settings.extrainfo) { return ''; }
            return '<span class="pull-right">\
                        <i class="fa fa-eye"></i> ' + repo.watchers_count + '&nbsp;&nbsp;\
                        <i class="fa fa-star"></i> ' + repo.stargazers_count + '&nbsp;&nbsp;\
                        <i class="fa fa-code-fork"></i> ' + repo.forks + '\
                   </span>';
        };

        var fetchFromGithub = function() {
            var user = plugin.settings.user;
            var action = plugin.settings.widget;

            $.ajax({
                url: 'https://api.github.com/users/' + user + '/' + action + '?sort=pushed',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    var title = autoTitle();
                    var body = autoBody(data[0]['owner'], data.length);
                    var footer = autoFooter();
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
                                      ' + repoInfo(v)  + '\
                                      <br/>' + v.description;
                            break;
                        case 'gists':
                            var gistName = v.owner.login + "/" + Object.keys(v.files)[0];
                            content += '<a href="' + v.html_url + '">' + gistName + '</a> \
                                      ' + gistInfo(v) + '\
                                      <br/>' + v.description;
                            break;
                        }

                        total++;
                    });

                    content += '</ul>';

                    fillElement(title, body, content, footer);
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
        $.each($('[data-toggle="github-widget"]'), function() {
            var inputUser = $(this).data('user');
            var inputWidget = $(this).data('widget');
            var inputTitle = $(this).data('title');
            var inputBody = $(this).data('body');
            var inputFooter = $(this).data('footer');
            var inputExtraInfo = $(this).data('extrainfo');
            var inputLimit = $(this).data('limit');

            if (inputUser !== undefined) {
                var options = {};
                options.user = inputUser;
                options.widget = (inputWidget !== undefined) ? inputWidget : 'repos';
                options.title = (inputTitle !== undefined) ? inputTitle: 'auto';
                options.body = (inputBody !== undefined) ? inputBody : '';
                options.footer = (inputFooter !== undefined) ? inputFooter : '';
                options.extrainfo = (inputExtraInfo !== undefined) ? Boolean(inputExtraInfo) : false;
                options.limit = (inputLimit !== undefined) ? parseInt(inputLimit) : 5;

                var plugin = new $.githubWidget(this, options);
            }
        });
    });
})(jQuery);
