---
title: Using layout elements and classes
summary: "How to create a responsive, mobile-first layout with Paper
elements and flexbox classes."
tags: ['layout']
elements: ['paper-header-panel','paper-toolbar','paper-drawer-panel','paper-scaffold']
updated: 2015-07-23
---

<link rel="import" href="/bower_components/google-youtube/google-youtube.html">


[//]: # (delete?)

<style shim-shadowdom>
.app-demo {
  border: 1px solid #aaa;
}
</style>

## Introduction

This guide teaches you how to use Paper elements to create a responsive layout.
We will use the following elements:

- `paper-header-panel`, a container with a section for a header and a section
  for content. The header can stay in place or scroll with the content.
 
- `paper-toolbar`, a toolbar that can also be used as a card or a 
  container for controls.
 
- `paper-drawer-panel`, a responsive container with two sections, 1) a 
  left-side or right-side drawer panel for navigation or other options, 
  and 2) a main content area.

- `paper-scaffold`, a complete layout that enables you to rapidly build
  your UI. `paper-scaffold` includes a navigation drawer, a toolbar, and 
  a main content area. It is implemented with the three elements above. 

## Creating a header

[//]: # (write introduction)

### Creating a standard header with `paper-toolbar`

The standard way to create a header is to make a `paper-toolbar` element
a child of a `paper-header-panel` element.

```hmtl
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar style="background-color:green;">
      <div>Hello, Header!</div>
    </paper-toolbar>
    <div style="background-color:grey">Hello, Content!</div>
  </paper-header-panel>
</body>
```

`fullbleed`, `vertical`, `layout`, and `flex` are part 
of the `iron-flex-layout`
class. We use them in our examples as an easy way to create a responsive 
design, but the `paper` elements do not depend on them. `fullbleed` 
instructs `body` to occupy the entire viewport. `vertical` and `layout`
instructs `body` to stack elements vertically (use `vertical horizontal`
to stack horizontally). `flex` instructs `paper-panel-header` to stretch
to the entire size of its parent, in this case `body` (which is set to
fill the entire viewport, hence achieving a responsive design).

Think of `paper-header-panel` as a panel with a header. `paper-header-panel`
is the container of the page and `paper-toolbar` is the header. All other
children are automatically placed in the content area. 

### Using other elements 

You can use another element as a header by adding the 
`paper-header` class to the element. 

```html
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <div class="paper-header" style="background-color:green;">
      Hello, Header!
    </div>
    <div style="background-color:grey">Hello, Content!</div>
  </paper-header-panel>
</body>
```

### Adding icons

Use `paper-icon-button` and `iron-icons` to add icons to your header:

```html
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar style="background-color:green;">
      <div>Hello, Header!</div>
      <span class="flex"></span>
      <paper-icon-button icon="search"></paper-button-icon>
    </paper-toolbar>
    <div style="background-color:grey">Hello, Content!</div>
  </paper-header-panel>
</body>
```

[//]: # (fix link below)

`paper-icon-button` displays the icon and handles the icon's behavior.
`iron-icons` is the Polymer teams's collection of
icons which you can use for free in your project. Check out the
[icons guide](#) for more information on using icons.

### Setting the height

Use the `medium-tall` (2x regular height) and `tall` (3x regular height) style 
classes to change the height of `paper-toolbar`.

```hmtl
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar style="background-color:green;" class="tall">
      <div>Hello, Header!</div>
    </paper-toolbar>
    <div style="background-color:grey">Hello, Content!</div>
  </paper-header-panel>
</body>
```

### Adding tabs

Use `paper-tabs` to add tabs to your header:

```hmtl
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar class="medium-tall">
      <paper-icon-button id="navicon"
                         icon="menu"></paper-icon-button>
      <span class="flex">Title</span>
      <paper-icon-button id="morebutton"
                         icon="more-vert"></paper-icon-button>
      <paper-tabs class="bottom fit" selected="0">
        <paper-tab style="background-color:red">ONE</paper-tab>
        <paper-tab style="background-color:blue">TWO</paper-tab>
      </paper-tabs>
    </paper-toolbar>
    <div style="background-color:grey">Hello, Content!</div>
  </paper-header-panel>
</body>
```

### Modifying header display and behavior

Use the `mode` attribute of `paper-header-panel` to control how the 
header displays and responds to scrolling:

* `standard`: The header appears at a higher level than the content area, 
  with a drop shadow. Content scrolls under the header.
* `seamed`: The header appears at the same level as the content area, 
  with a seam between the two (no drop shadow). Content scrolls under the header.
* `waterfall`: The header initially presents as seamed. When content scrolls 
  under the header, the header raises up and casts a drop shadow (as in 
  standard mode).
* `waterfall-tall`: Like waterfall, except that the toolbar starts off 
  tall (3x standard height) and condenses to a standard-height 
  toolbar as the user scrolls. In this mode, `paper-header-panel` controls
  the height of the toolbar, so you should not set it yourself (via
  `medium-tall` or `tall`).
* `scroll`: The header is seamed with the content and scrolls with the content.
* `cover`: The content scrolls over the header. This mode is designed to 
  be used with narrow content (for example cards).


## Responsive side nav

The [`<paper-drawer-panel>`](paper-drawer-panel.html)
element creates a left or right side nav area alongside
the main content area. On narrow screens, the nav area acts as a drawer that can
be hidden or revealed by calling the drawer panel's `togglePanel` method.

Any children with the `drawer` attribute set are placed in the navigation area.
Any children with the `main` attribute are placed in the main panel.

You can nest `<paper-header-panel>` and `<paper-toolbar>` elements inside a
`<paper-drawer-panel>` to create the layout for the content area and navigation
drawer, as shown in the following example:

<a href="../../samples/layout-elements/drawer-app.vulcanized.html" target="_blank">
  <img class="app-demo" src="/images/layout-elements/drawer-app-closed.png">
</a>

<a href="../../samples/layout-elements/drawer-app.vulcanized.html" target="_blank">Click image for demo</a>

Use the following code to create the drawer panel app:

<demo-tabs selected="0">
  <demo-tab heading="HTML">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="JS">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html javascript version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="CSS">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html styles version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="Imports">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html imports version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
</demo-tabs>

**Note:** On wide screens, the drawer is always open and the menu button is hidden.
On narrow screens, you can press the button or swipe from the left to show the drawer.
On desktop, resize the browser window to see the different modes.
{: .alert .alert-info }


