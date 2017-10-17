---
title: Using icons
summary: "How to display and style icons using Iron elements."
tags: ['icons','intermediate']
elements: ['iron-icon','iron-icons', 'iron-iconset', 'iron-iconset-svg']
updated: 2015-10-01
---

<link rel="import" href="/bower_components/google-youtube/google-youtube.html">

## Introduction

In this guide you learn how to display icons with the `iron-icon` element,
and the `iron-icons` package of SVG icons.

## Installation

Install the icon elements with Bower. This guide assumes that your project 
can access these elements from `/bower_components/`.

```bash
bower install --save PolymerElements/iron-icon 
bower install --save PolymerElements/iron-icons 
```

## Displaying an icon with `iron-icon`

To display an icon, import `iron-icon` and specify the source image using
either: 

* The `src` attribute, if the image is not part of the `iron-icons` package.
* The `icon` attribute, if it is.

The code below shows how to declare an `iron-icon` element, using an image
that is not part of the `iron-icons` package.

    ...
    <link rel="import" href="/bower_components/iron-icon/iron-icon.html">
    ...
    <iron-icon src="/images/polymer.svg"></iron-icon>
    ...

Produces: 

<iron-icon src="/images/polymer.svg"></iron-icon>

The source image is set as the icon's background. The image is scaled to 
fit the icon size. The image can be bitmap or SVG. `iron-icon` expects 
the source image to be square. The default icon size is 24 pixels by 
24 pixels. Use CSS to set the icon size.

The code below demonstrates how you can use CSS to set the size of an icon.

    ...
    <iron-icon src="/images/polymer.svg" style="width: 24px; height: 24px;"></iron-icon>
    <iron-icon src="/images/polymer.svg" style="width: 32px; height: 32px;"></iron-icon>
    <iron-icon src="/images/polymer.svg" style="width: 48px; height: 48px;"></iron-icon>
    ...

Produces: 

<iron-icon src="/images/polymer.svg" style="width: 24px; height: 24px;"></iron-icon>
<iron-icon src="/images/polymer.svg" style="width: 32px; height: 32px;"></iron-icon>
<iron-icon src="/images/polymer.svg" style="width: 48px; height: 48px;"></iron-icon>

### Globally styling width and height

To create style rules that affect the size of all icons, create a theme file
and use the `--iron-icon-width` and `iron-icon-height` mixins.

```html
<!-- theme.html -->
<style is="custom-style">
  iron-icon {
    --iron-icon-width: 100px;
    --iron-icon-height: 100px;
  }
</style>
```

The attribute-value pair `is="custom-style"` enables you to define
styles in the main document. See [Custom element for documenting
styling](https://www.polymer-project.org/1.0/docs/devguide/styling.html#custom-style) for more information.

Import the theme file into your page and use the icons normally:

```html
...
<link rel="import" href="theme.html">
...
<iron-icon icon="accessibility"></iron-icon>
```

## Using the `iron-icons` collection

`iron-icons` is a package of hundreds of SVG icons. They are ready
to use with the `iron-icon` element. And, since they are SVG, you can 
style and manipulate them with CSS.

The package is divided up into numerous "icon sets". Each icon set is grouped
thematically. For example, one icon set contains icons common to social
media websites, another contains audio-visual icons, and so on.

[View all of the icons here.](https://elements.polymer-project.org/elements/iron-icons?view=demo:demo/index.html)

To use an icon from `iron-icons`, import the `iron-icons` element 
into your project and reference the icon via the `icon` attribute:

    ...
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">
    ...
    <iron-icon icon="refresh"></iron-icon>
    ...


Produces:

<iron-icon icon="refresh"></iron-icon>

Note that you reference the image source via the `icon` attribute, not
the `src` attribute, as is the case when declaring an image that is not part
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

<code><var>set</var>:<var>name</var></code>

Where <var>set</var> is the name of the icon set, and <var>name</var> is 
the name of the icon.

For example, if you wanted to use the `cake` icon from the `social` icon
set, you would declare your element as follows:

    <iron-icon icon="social:cake"></iron-icon>

### Styling icons with CSS 

All of the icons in `iron-icons` are SVG-based. In addition to setting 
standard CSS properties like sizes and background colors, you can set 
SVG-specific CSS properties like `fill`, `stroke`, and `stroke-width`.

By default, icons use `fill:currentcolor`, so they match the current text 
color. The easiest way to override the icon color is to set the 
`color` property. You can also set the `fill` property directly, but it 
requires a [CSS attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors).

```html
<style>
  iron-icon[icon="save"] {
    color: green;
    width: 32px;
    height: 32px;
    opacity: 0.50;
  }
</style>

<iron-icon icon="save"></iron-icon>
```
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

    <paper-icon-button icon="favorite"></paper-icon-button>

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

