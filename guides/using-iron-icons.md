---
title: Using Icons
summary: "How to use the Polymer team's standard icons, and create your own custom icons."
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
[//]: # (instead of trying to display inside of document, create working
         examples with full index.html)

<link rel="import" href="/bower_components/google-youtube/google-youtube.html">

## Introduction

<google-youtube
  video-id="6kkNgVG6LuI"
  autoplay="0"
  rel="0"
  fluid>
</google-youtube>

In this guide we will teach you how to use four Iron elements that make it 
easier to use icons:

* `iron-icon`, for displaying and styling a single icon
* `iron-icons`, for using the Polymer team's collection of common icons 
* `iron-iconset`, for creating your own icon set
* `iron-iconset-svg`, for styling SVG icons

## Installation

Install the icon elements with Bower. We'll assume that your project can access 
these elements from `/bower_components/`.

```bash
bower install PolymerElements/iron-icon 
bower install PolymerElements/iron-icons 
bower install PolymerElements/iron-iconset 
bower install PolymerElements/iron-iconset-svg 
```

## Using `iron-icon` to display an icon

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

## Using `iron-icons` to use the Polymer team's icon collection

The Polymer team has created a large collection of free, SVG icons that 
you can use in your own project. These icons are distributed as an element
called `iron-icons`. 

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

### Browsing the `iron-icons` catalog

`iron-icons` contains hundreds of icons, grouped into the following
icon sets: 

* Icon (see note at end of this section)
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

View all of the icons at the link below.

https://elements.polymer-project.org/elements/iron-icons?view=demo:demo/index.html

To use an icon from one of these groups, import the icon set and then reference
the icon using the following syntax:

    <icon set>:<icon name>

The example below displays the `cake` icon
from the `social` icon set.

    ...
    <link rel="import" href="/bower_components/iron-icons/social-icons.html">
    ...
    <iron-icon icon="social:cake"></iron-icon>
    ...

Produces: 

<iron-icon icon="social:cake"></iron-icon>

Note that the `icon` icon set is the default icon set. If you reference an icon 
using only the icon name, `iron-icon` will search for the name within 
the `icon` icon set. For example, the two declarations below reference the 
same icon.

    ...
    <iron-icon icon="refresh"></iron-icon>
    ...
    <iron-icon icon="icon:refresh"></iron-icon>


### Styling icons with CSS 

All of the icons in `iron-icons` are SVG-based. In addition to setting 
standard CSS properties like sizes and background colors, you can set 
SVG-specific CSS properties like `fill`, `stroke` and `stroke-width`.

By default, icons use `fill: currentcolor`, so they match the current text 
color. The easiest way to override the icon color is to set the 
`color` property. You can also set the `fill` property directly, but it 
requires a more specific CSS selector.

    <style>
      iron-icon[icon="android"] {
        color: #a4c639;
        width: 32px;
        height: 32px;
      }
    </style>
    <iron-icon icon="android"></iron-icon>

<!-- fill: #9aed00; -->

Produces: 

<iron-icon icon="android" 
           style="color: #a4c639;
                  width: 32px;
                  height: 32px"></iron-icon>

## Using icons with other elements 

You can use icons on their own, but also use them with other elements, such as buttons. You can use the built-in
and custom icon sets with any `core-` or `paper-` element that has an `icon` attribute. Remember to include the
appropriate icon set before referring to an icon, otherwise the icon will not render.

The following examples use `iron-icon-button`, `core-menu-button` and `core-item` with
icons from the *default* and *av* icon sets. (The required imports for the elements and icon sets
are omitted here for brevity.)

    <iron-icon-button icon="av:play-arrow"></iron-icon-button>

    <core-menu-button icon="menu">
      <core-item icon="settings" label="Settings"></core-item>
    </core-menu-button>

Produces: <iron-icon-button icon="av:play-arrow"></iron-icon-button>
<core-menu-button icon="menu">
  <core-item icon="settings" label="Settings"></core-item>
</core-menu-button>

There are two ways to style the icons inside another element. Since `color` is an
inherited property, you can set `color` on the parent element:

    <style>
      iron-icon-button.green {
        color: lightgreen;
      }
    </style>
    <iron-icon-button class="green" icon="av:play-arrow"></iron-icon-button>

<style>
  iron-icon-button.green {
    color: lightgreen;
  }
</style>
Produces: <iron-icon-button class="green" icon="av:play-arrow"></iron-icon-button>

If you need more control, you can use the `::shadow` pseudo-element or the `/deep/`
combinator to style the icon directly.

    <style shim-shadowdom>
      iron-icon-button.outline /deep/ iron-icon {
        fill: red;
        stroke: black;
        stroke-width: 1;
      }
    </style>
    <iron-icon-button class="outline" icon="av:stop"></iron-icon-button>

<style shim-shadowdom>
  iron-icon-button.outline /deep/ iron-icon {
    fill: red;
    stroke: black;
    stroke-width: 1;
  }
</style>
Produces: <iron-icon-button class="outline" icon="av:stop"></iron-icon-button>

## Summary

You just learned how to import Polymer's ready-made icon sets,
display an icon using the `iron-icon` element and style it with CSS. You also learned
how to create your own icon set using SVG or bitmap images and how to use icons
from other elements that support this feature.






