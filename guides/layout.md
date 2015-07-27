---
title: Using layout elements
summary: "How to create a responsive layout with Paper and Iron elements."
tags: ['layout']
elements: ['paper-header-panel','paper-toolbar','paper-drawer-panel',
'paper-icon-button','paper-tabs','paper-tab','paper-drawer-panel', 'iron-icons',
'iron-flex-layout']
updated: 2015-07-23
---

[//]: # (watch youtube videos and align)

[//]: # (dark blue #3F51B5)
[//]: # (pink D81B60)

## Introduction

This guide teaches you how to use Paper elements to create a responsive
header and side navigation menu.

## Installation

Below is a list of commands for installing all of the elements mentioned
in this document. You probably
do not need to install all of these elements. Read the guide and decide
how you want to implement your layout, and then install only the elements
that you need.

```
bower install -S PolymerElements/paper-header-panel
bower install -S PolymerElements/paper-toolbar
bower install -S PolymerElements/paper-drawer-panel
bower install -S PolymerElements/paper-icon-button
bower install -S PolymerElements/paper-tabs
bower install -S PolymerElements/paper-tab
bower install -S PolymerElements/paper-drawer-panel
bower install -S PolymerElements/iron-icons
bower install -S PolymerElements/iron-flex-layout
```

We'll assume that you can import these elements from `/bower_components/`.

## Creating a header

[//]: # (write introduction)

### Creating a header with `paper-toolbar`

The easiest way to create a header is to make a `paper-toolbar` element
a child of a `paper-header-panel` element.

```hmtl
<head>
  <link rel="import" 
        href="/bower_components/paper-header-panel/paper-header-panel.html">
  <link rel="import" 
        href="/bower_components/paper-toolbar/paper-toolbar.html">
  <link rel="import" 
        href="/bower_components/iron-flex-layout/iron-flex-layout.html">
...
<body class="fullbleed vertical layout">
  <paper-header-panel class="flex">
    <paper-toolbar>
      <div>Header</div>
    </paper-toolbar>
    <div>Content</div>
  </paper-header-panel>
</body>
```
Think of `paper-header-panel` as a panel with a header. `paper-header-panel`
is the container of the page and `paper-toolbar` is the header. When 
`paper-header-panel` finds a `paper-toolbar` element as one of its children, it
automatically places the toolbar in the header area. All other
children are automatically placed in the content area. 

`fullbleed`, `vertical`, `layout`, and `flex` are part of the 
`iron-flex-layout` class. We use them in our examples as an easy way 
to create a responsive design, but the `paper` elements do not depend 
on them. Below is a description of each class used in the example above:
 
* `fullbleed` instructs `body` to occupy the entire viewport. 
* `vertical` and `layout` instructs `body` to stack elements 
vertically (use `vertical horizontal` to stack horizontally). 
* `flex` instructs `paper-panel-header` to stretch to the entire 
size of its parent, in this case `body` (which is set to fill the entire 
viewport, hence achieving a responsive design).


### Using other elements 

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

### Adding icons

Use `paper-icon-button` and `iron-icons` to add icons to your header:

```html
<head>
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

`paper-icon-button` displays the icon and handles the icon's behavior.
`iron-icons` is the Polymer teams's collection of
icons which you can use for free in your project. 

Check out the [icons guide](/guides/using-iron-icons) for more 
information on using icons.

### Setting the height

Use the `medium-tall` (2x regular height) and `tall` (3x regular height) style 
classes to change the height of your header.

```hmtl
<head>
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
```

### Adding tabs

Use `paper-tabs` to add tabs to your header:

```hmtl
<head>
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
```

### Modifying header display and behavior

Use the `mode` attribute of `paper-header-panel` to control how the 
header displays and responds to scrolling. The list below describes 
the different valid values for `mode`:

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

## Creating a responsive side navigation

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

On narrow screens, the drawer can be hidden or revealed via the `togglePanel` 
method. The user can touch the button or swipe in order to display the drawer.
On wide screens, the drawer is always open and the button to open
the drawer is hidden.

Any children with the `drawer` attribute set are placed in the navigation area.
Any children with the `main` attribute are placed in the main panel.

