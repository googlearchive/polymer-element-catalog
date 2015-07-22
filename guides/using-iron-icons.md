---
title: Using Icons
summary: "How to display and style icons, and how to use the Polymer team's icon collection in your own project."
tags: ['icons','intermediate']
elements: ['iron-icon','iron-icons', 'iron-iconset', 'iron-iconset-svg']
updated: 2015-07-17
---

[//]: # (align docs with videos)
[//]: # (figure out how to display iron-icons, provide a gist?)
[//]: # (delete core-iconset video after aligning with docs)
[//]: # (are ::shadow and /deep/ still supported?)
[//]: # (load dependenices in right order https://github.com/PolymerElements/iron-icon/issues/19)
[//]: # (get SVG icon set example working)
[//]: # (use for displaying icons https://elements.polymer-project.org/elements/iron-icons?view=demo:demo/index.html)
[//]: # (during review, ask about using multiple icon sets, specifying each with namespace syntax)
[//]: # (instead of trying to display inside of document, create working examples with full index.html)
[//]: # (how to style icons embedded in other elements?)
[//]: # (delete video if it mentions iron-iconset*)
[//]: # (color not inheriting on paper-icon-button)


<link rel="import" href="/bower_components/google-youtube/google-youtube.html">

## Introduction

In this guide we will teach you how to display icons and how to use the 
Polymer team's collection of icons in your project.

## Installation

Install the icon elements with Bower. We'll assume that your project can access 
these elements from `/bower_components/`.

```bash
bower install PolymerElements/iron-icon 
bower install PolymerElements/iron-icons 
```

## Displaying an icon with `iron-icon`

To display an icon, import `iron-icon` and specify the source image using
either the `src` attribute if the image is not part of an icon set,
or the `icon` attribute if it is.

    ...
    <link rel="import" href="/bower_components/iron-icon/iron-icon.html">
    ...
    <iron-icon src="/images/polymer.svg"></iron-icon>
    ...

Produces: 

<iron-icon src="/images/polymer.svg"></iron-icon>

The source image is set as the icon's background and is scaled to fit the icon 
size. It can be bitmap or SVG. `iron-icon` expects the source image to be square.
The default icon size is 24 pixels by 24 pixels. Use CSS to set the icon size.

    ...
    <iron-icon src="/images/polymer.svg" style="width: 24px; height: 24px;"></iron-icon>
    <iron-icon src="/images/polymer.svg" style="width: 32px; height: 32px;"></iron-icon>
    <iron-icon src="/images/polymer.svg" style="width: 48px; height: 48px;"></iron-icon>
    ...

Produces: 

<iron-icon src="/images/polymer.svg" style="width: 24px; height: 24px;"></iron-icon>
<iron-icon src="/images/polymer.svg" style="width: 32px; height: 32px;"></iron-icon>
<iron-icon src="/images/polymer.svg" style="width: 48px; height: 48px;"></iron-icon>

## Using the Polymer team's icon collection, `iron-icons`

The Polymer team has created a large collection of free, SVG icons that 
you can use in your own project. These icons are distributed as an element
called `iron-icons`. 

[View all of the icons here.](https://elements.polymer-project.org/elements/iron-icons?view=demo:demo/index.html)

To use one of the Polymer team's icons, import the `iron-icons` element 
into your project and reference the icon via the `icon` attribute:

    ...
    <!-- iron-icons loads the default icon set and the iron-icon element -->
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">
    ...
    <iron-icon icon="refresh"></iron-icon>
    ...


Produces:

<iron-icon icon="refresh"></iron-icon>

Note that you reference the image source via the `icon` attribute, not
the `src` attribute, as is the case when you using an image that is not part
of an icon set.

The default icon set is called `icons`. If you reference an icon 
using only the icon name, `iron-icon` will search for the name within 
the `icons` icon set. For example, the two declarations below reference the 
same icon.

    <iron-icon icon="refresh"></iron-icon>
    <iron-icon icon="icons:refresh"></iron-icon>

`iron-icons` contains many more icons, grouped into the following 
thematic sets: 

* Audio Visual
* Communication
* Device
* Editor
* Hardware
* Images
* Maps
* Notification
* Social
* Update

To use an icon from one of these groups, import the icon set and then reference
the icon using the following syntax:

    <icon set>:<icon name>

[Due to an outstanding bug](https://github.com/PolymerElements/iron-icon/issues/19),
 if you want to use any of the icons from the 
thematic sets listed above, you need to load the `iron` dependencies in a specific
order. The example HTML below successfuly displays the `cake` icon from
the `social` icon set.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="bower_components/polymer/polymer.html">
    <link rel="import" href="bower_components/iron-meta/iron-meta.html">
    <link rel="import" href="bower_components/iron-flex-layout/iron-flex-layout.html">
    <link rel="import" href="bower_components/iron-iconset-svg/iron-iconset-svg.html">
    <link rel="import" href="bower_components/iron-iconset/iron-iconset.html">
    <link rel="import" href="bower_components/iron-icons/iron-icons.html">
    <link rel="import" href="bower_components/iron-icons/social-icons.html">
    <link rel="import" href="bower_components/iron-icon/iron-icon.html">
  </head>
  <body>
    <iron-icon icon="social:cake"></iron-icon>
  </body>
</html>
```

### Styling icons with CSS 

All of the icons in `iron-icons` are SVG-based. In addition to setting 
standard CSS properties like sizes and background colors, you can set 
SVG-specific CSS properties like `fill`, `stroke` and `stroke-width`.

By default, icons use `fill: currentcolor`, so they match the current text 
color. The easiest way to override the icon color is to set the 
`color` property. You can also set the `fill` property directly, but it 
requires a more specific CSS selector.

    <style>
      iron-icon[icon="save"] {
        color: green;
        width: 32px;
        height: 32px;
        opacity: 0.50;
      }
    </style>

    <iron-icon icon="save"></iron-icon>

<!-- fill: #9aed00; -->

Produces: 

<style>
  iron-icon[icon="save"] {
    color: green;
    width: 32px;
    height: 32px;
    opacity: 0.50;
  }
</style>

<iron-icon icon="save"></iron-icon>

### Using icons with other elements 

You can use the icons from `iron-icons` with any Iron or Paper element
that has an `icon` attribute.

For example, to create a `paper-button` element with an icon:

    <paper-icon-button style="color: red;" 
    icon="delete"></paper-icon-button>

Produces:

<paper-icon-button icon="favorite"></paper-icon-button>

## Migrating from Polymer 0.5 (`core-icons`) to Polymer 1.0 (`iron-icons`)

Check out Rob Dodson's Polycast below for more information on migrating
from `core-icons` to `iron-icons`.

<google-youtube
  video-id="6kkNgVG6LuI"
  autoplay="0"
  rel="0"
  fluid>
</google-youtube>

