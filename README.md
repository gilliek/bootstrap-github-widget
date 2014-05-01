## Bootstrap Github Widget [![Bower version](https://badge.fury.io/bo/bootstrap-github-widget.svg)](http://badge.fury.io/bo/bootstrap-github-widget)

![](screenshots/bootstrap-github-widget.png)

### Demo

Take a look at the examples: `examples/index.html`

### Dependencies

* [jQuery 1.9.x](http://jquery.com/)
* [Twitter Bootstrap 3.x](http://getbootstrap.com/)
* [Font-Awesome 4.x](http://fortawesome.github.io/Font-Awesome/) (optional, required by the option extrainfo)

### Installation

You have three available options for the installation:

* Download the [latest release](https://github.com/gilliek/bootstrap-github-widget/releases)
* Clone the repo: `https://github.com/gilliek/bootstrap-github-widget.git`
* Install with [bower](http://bower.io/): `bower install bootstrap-github-widget`

### Usage

#### Via data attributes

To display the widget, set `data-toggle="github-widget"` on a container element like
a div, along with a `data-user="foo"`.

```html
<div data-toggle="github-widget" data-user="myGithubUsername"></div>
```

#### Via data JavaScript

```javascript
$('#mywidget').githubWidget(options)
```

#### Options

Options can be passed via data attributes of JavaScript. For data attributes, append
the option name to `data-` as in `data-user="foo"`.


| Name | type | default | description |
|------|------|---------|-------------|
| user | string | ''    | GitHub username. |
| widget | string | 'repos' | Define the widget type. It can take the values: 'repos', 'gists'. |
| title | string | 'auto' | Panel title |
| body | string | '' | The content to display before the list of items. It also supports the value 'auto', which will display a default body. |
| footer | string | '' | Panel footer. It also supports the value 'auto', which will display a default footer. |
| extrainfo | boolean | false | **Require Font-Awesome**. Flag to toggle extra information. For now, only the widget 'repos' support this option.|
| limit | integer | 5 | The number of items to display. A value less than or equal to 0 will display all items. |

### Contribution

[Pull requests](https://help.github.com/articles/fork-a-repo) are welcome :)

### License

Bootstrap Github Widget is licensed under a BSD 3-clauses. See [LICENSE](https://github.com/gilliek/bootstrap-github-widget/blob/master/LICENSE).
