---
title: Responsive Material Design layouts
summary: "How to create responsive Material Design layouts
with Paper and Iron elements."
tags: ['layout']
elements: ['paper-header-panel','paper-toolbar','paper-drawer-panel',
'paper-icon-button','paper-tabs','paper-tab','paper-drawer-panel', 'iron-icons',
'iron-flex-layout']
updated: 2015-07-23
---

<style>
  paper-button {
    background: #81C784;
    color: white;
  }
</style>

## Introduction

This guide teaches you how to use Paper and Iron elements to create a 
responsive layout.

## Installation

Below is a list of commands for installing all of the elements mentioned
in this document. You probably
do not need to install all of these elements. Read the guide and decide
how you want to implement your layout, and then install only the elements
that you need.

```bash
bower install --save PolymerElements/paper-header-panel
bower install --save PolymerElements/paper-toolbar
bower install --save PolymerElements/paper-drawer-panel
bower install --save PolymerElements/paper-icon-button
bower install --save PolymerElements/paper-tabs
bower install --save PolymerElements/paper-tab
bower install --save PolymerElements/iron-icons
bower install --save PolymerElements/iron-flex-layout
```

We'll assume that you can import these elements from `/bower_components/`.

## Creating a header

This section shows you how to:

* Create a standard layout with `paper-header-panel` and `paper-toolbar`,
  which is probably the most common and easiest layout.
* Use a custom element for a header.
* Add icons to a header.
* Set the height of a header.
* Add tabs to a header.
* Modify the disply and behavior of a header.

### Creating a header with `paper-toolbar`

The code below uses a `paper-header-panel` as the container of the
page and a `paper-toolbar` as a header. When a `paper-toolbar` is a 
child of `paper-header-panel`, the panel automatically displays 
the toolbar as the header. All other 
children are placed in the content area.

```hmtl
...
<head>
...
  <link rel="import" 
        href="/bower_components/paper-header-panel/paper-header-panel.html">
  <link rel="import" 
        href="/bower_components/paper-toolbar/paper-toolbar.html">
  <link rel="import" 
        href="/bower_components/iron-flex-layout/iron-flex-layout.html">
...
<body class="fullbleed vertical layout">
  <!-- paper-header-panel must have an explicit height -->
  <paper-header-panel class="flex">
    <paper-toolbar>
      <div>Header</div>
    </paper-toolbar>
    <div>Content</div>
  </paper-header-panel>
</body>
...
```

<a href="assets/header-and-toolbar.html" target="_blank">
  <paper-button noink>Demonstration</paper-button>
</a>

`paper-header-panel` **must have an explicit height**. See the list item
on `flex` below for an explanation of why the code above works.

`fullbleed`, `vertical`, `layout`, and `flex` are helper classes from
`iron-flex-layout.html`. We use them in our examples as an easy way 
to create a responsive design with [Flexbox](http://www.smashingmagazine.com/2015/08/flexible-future-for-web-design-with-flexbox/), 
but the `paper` elements do not depend 
on them. Below is a description of each class used in the example above:
 
* `fullbleed` instructs `body` to occupy the entire viewport. 
* `vertical` and `layout` instruct `body` to stack elements 
  vertically (use `vertical horizontal` to stack horizontally). `layout`
  must be accompanied by `vertical` or `horizontal`. It is meaningless
  on its own.
* `flex` instructs `paper-panel-header` to stretch to the entire 
  size of its parent, in this case `body` (which is set to fill the entire 
  viewport, hence achieving a responsive design).

See [Flexbox layout with iron-flex-layout](/guides/flex-layout) for more
on `iron-flex-layout`.

### Using other elements for the header

You can use another element as a header by adding the 
`paper-header` class to the element. 

```html
<head>
  <link rel="import" 
        href="/bower_components/paper-header-panel/paper-header-panel.html">
  <link rel="import" 
        href="/bower_components/iron-flex-layout/iron-flex-layout.html">
...
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <div class="paper-header">
      Header
    </div>
    <div>Content</div>
  </paper-header-panel>
</body>
```

<a href="assets/custom-header.html" target="_blank">
  <paper-button noink>Demonstration</paper-button>
</a>

### Adding icons

Use `paper-icon-button` and `iron-icons` to add icons to your header:

```html
...
<head>
...
  <link rel="import" 
        href="/bower_components/paper-header-panel/paper-header-panel.html">
  <link rel="import" 
        href="/bower_components/paper-toolbar/paper-toolbar.html">
  <link rel="import" 
        href="/bower_components/paper-icon-button/paper-icon-button.html">
  <link rel="import" 
        href="/bower_components/iron-icons/iron-icons.html">
  <link rel="import" 
        href="/bower_components/iron-flex-layout/iron-flex-layout.html">
...
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar>
      <div>Header</div>
      <span class="flex"></span>
      <paper-icon-button icon="search"></paper-button-icon>
    </paper-toolbar>
    <div>Content</div>
  </paper-header-panel>
</body>
```

<a href="assets/icons.html" target="_blank">
  <paper-button noink>Demonstration</paper-button>
</a>

`paper-icon-button` displays the icon and handles the icon's behavior.
`iron-icons` is a collection of SVG icons which you can use for free 
in your project. 

How does the search icon display on the right side? The trick
is the `span` between the `div` and the `paper-icon-button`. 
The `div` containing the text `Header` only takes up as 
much space as is needed to display 
the text content. Same with the `paper-icon-button`; it only takes up
as much space as is needed to display the icon. The `flex`
class forces the `span` to fill the entire space between the `div` and
the `paper-icon-button`.

### Setting the height

Use the `medium-tall` (2x regular height) and `tall` (3x regular height) style 
classes to change the height of your header.

```hmtl
...
<head>
...
  <link rel="import" 
        href="/bower_components/paper-header-panel/paper-header-panel.html">
  <link rel="import" 
        href="/bower_components/paper-toolbar/paper-toolbar.html">
  <link rel="import" 
        href="/bower_components/iron-flex-layout/iron-flex-layout.html">
...
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar class="tall">
      <div>Header</div>
    </paper-toolbar>
    <div>Content</div>
  </paper-header-panel>
</body>
...
```

<a href="assets/tall-header.html" target="_blank">
  <paper-button noink>Demonstration</paper-button>
</a>

### Adding tabs

Use `paper-tabs` to add tabs to your header:

```hmtl
...
<head>
...
  <link rel="import" 
        href="/bower_components/paper-header-panel/paper-header-panel.html">
  <link rel="import" 
        href="/bower_components/paper-toolbar/paper-toolbar.html">
  <link rel="import" 
        href="/bower_components/paper-icon-button/paper-icon-button.html">
  <link rel="import"
        href="/bower_components/paper-tabs/paper-tabs.html">
  <link rel="import" 
        href="/bower_components/iron-icons/iron-icons.html">
  <link rel="import" 
        href="/bower_components/iron-flex-layout/iron-flex-layout.html">
...
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar class="medium-tall">
      <paper-icon-button id="navicon"
                         icon="menu"></paper-icon-button>
      <!-- flex class forces span to fill space between icons -->
      <span class="flex">Title</span>
      <!-- icon displays at right because of span class above -->
      <paper-icon-button id="morebutton"
                         icon="more-vert"></paper-icon-button>
      <paper-tabs class="bottom fit" selected="0">
        <paper-tab>ONE</paper-tab>
        <paper-tab>TWO</paper-tab>
      </paper-tabs>
    </paper-toolbar>
    <div>Content</div>
  </paper-header-panel>
</body>
...
```

<a href="assets/tabs.html" target="_blank">
  <paper-button noink>Demonstration</paper-button>
</a>

### Modifying header display and behavior

Use the `mode` attribute of `paper-header-panel` to control how the 
header displays and responds to scrolling. The list below describes 
the different valid values for `mode`. See the link below for a 
demonstration of all modes.

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

<a href="/elements/paper-header-panel?view=demo:demo/index.html" target="_blank">
  <paper-button noink>Demonstration</paper-button>
</a>

## Creating a responsive navigation drawer

Use `paper-drawer-panel` to create a left-side or right-side
navigation menu. 

```html
<head>
  <link rel="import"
        href="/bower_components/paper-drawer-panel/paper-drawer-panel.html">
  <link rel="import" 
        href="/bower_components/paper-header-panel/paper-header-panel.html">
  <link rel="import" 
        href="/bower_components/paper-toolbar/paper-toolbar.html">
  <link rel="import" 
        href="/bower_components/paper-icon-button/paper-icon-button.html">
  <link rel="import" 
        href="/bower_components/iron-icons/iron-icons.html">
  <link rel="import" 
        href="/bower_components/iron-flex-layout/iron-flex-layout.html">
...
<body class="fullbleed vertical layout">
  <paper-drawer-panel class="flex">
    <paper-header-panel drawer>
      <paper-toolbar>
        <div>Application</div>
      </paper-toolbar>
      <div> Drawer content... </div>
    </paper-header-panel>
    <paper-header-panel main>
      <paper-toolbar>
        <paper-icon-button icon="menu" paper-drawer-toggle></paper-icon-button>
        <div>Title</div>
      </paper-toolbar>
      <div> Main content... </div>
    </paper-header-panel>
  </paper-drawer-panel>
</body>
```

<a href="assets/drawer.html" target="_blank">
  <paper-button noink>Demonstration</paper-button>
</a>

On narrow screens, the drawer is hidden by default. The user can 
touch the button or swipe in order to display the drawer.
On wide screens, the drawer is always open and the button to open
the drawer is hidden.

Use the `togglePanel` method to hide or reveal the drawer 
programmatically. Or, add the `paper-drawer-toggle` attribute to an 
element. This attribute makes the element act as an open / close button and 
removes the need to call `togglePanel` explicitly.

Any children with the `drawer` attribute set are placed in the navigation area.
Any children with the `main` attribute are placed in the main panel.
