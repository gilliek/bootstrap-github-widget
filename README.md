## Bootstrap Github Widget

![](screenshots/bootstrap-github-widget.png)

### Demo

Take a look at the examples: `examples/index.html`

### Dependencies

* [jQuery 1.9.x](http://jquery.com/)
* [Twitter Bootstrap 3.x](http://getbootstrap.com/)
* [Font-Awesome 4.x](http://fortawesome.github.io/Font-Awesome/) (optional, required by the option extrainfo)

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
| body | string | '' | The content to display before the list of repos or gists. It also supports the value 'auto', which will display an automatic body. |
| footer | string | '' | Panel footer. It also supports the value 'auto', which will display an automatic footer. |
| extrainfo | boolean | false | **Require Font-Awesome**. Flag to toggle extra information. For now, only the widget 'repos' support this option.|
| limit | integer | 5 | The number of items to display. |

### Contribution

Pull requests are welcome :)

### License

Bootstrap Github Widget is licensed under a BSD 3-clauses. See [LICENSE](https://github.com/gilliek/bootstrap-github-widget/blob/master/LICENSE).
