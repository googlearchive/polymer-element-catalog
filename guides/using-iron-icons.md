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

Import `iron-icon` to display a single icon.

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

## Using `iron-icons` to use the Polymer team's icon set

The Polymer team has created a large collection of free, SVG icons that 
you can use in your own project. These icons are distributed as an element
called `iron-icons`.

Import the `iron-icons` element into your project:

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

`iron-icons` contains hundreds of icons, grouped thematically. Below
is a current list of each of the icon set. Each link takes you to 
the source code definition of each icon set. Look at the `id` attribute
of each `g` element to get a general idea of the icons available in that set.
(Note: there's an outstanding bug on the `iron-icons` demo, which is why
we are providing this convoluted method for browsing icons)

* [General](https://github.com/PolymerElements/iron-icons/blob/master/image-icons.html)
* [AV (Audio-Visual)](https://github.com/PolymerElements/iron-icons/blob/master/av-icons.html)
* [Communication](https://github.com/PolymerElements/iron-icons/blob/master/communication-icons.html)
* [Device](https://github.com/PolymerElements/iron-icons/blob/master/device-icons.html)
* [Editor](https://github.com/PolymerElements/iron-icons/blob/master/editor-icons.html)
* [Hardware](https://github.com/PolymerElements/iron-icons/blob/master/hardware-icons.html)
* [Images](https://github.com/PolymerElements/iron-icons/blob/master/image-icons.html)
* [Maps](https://github.com/PolymerElements/iron-icons/blob/master/maps-icons.html)
* [Notification](https://github.com/PolymerElements/iron-icons/blob/master/notification-icons.html)
* [Social](https://github.com/PolymerElements/iron-icons/blob/master/social-icons.html)
* [Update](https://github.com/PolymerElements/iron-icons/blob/master/update-icons.sh)

To use an icon from one of these groups, import the icon set and then reference
the icon as `{icon set}:{icon name}`. The example below displays the `cake` icon
from the `social` icon set.

    ...
    <link rel="import" href="/bower_components/iron-icons/social-icons.html">
    ...
    <iron-icon icon="social:cake"></iron-icon>
    ...

## Styling icons with CSS 

All of the icons in `iron-icons` are SVG-based. In addition to setting standard CSS 
properties like sizes and background colors, you can set SVG-specific CSS properties 
like `fill`, `stroke` and `stroke-width` for your icons.

By default, icons use `fill: currentcolor`, so they match the current text color.
The easiest way to override the icon color is to set the `color` property. You
can also set the `fill` property directly, but it requires a more specific CSS selector.

[//]: # (code is different?)

    <style>
      iron-icon[icon="android"] {
        color: #a4c639;
        width: 32px;
        height: 32px;
      }
    </style>
    <iron-icon icon="android"></iron-icon>

<style>
  iron-icon[icon="android"] {
    fill: #9aed00;
    width: 32px;
    height: 32px;
  }
</style>

Produces: 

<iron-icon icon="android"></iron-icon>

## Creating custom bitmap icon sets with `iron-iconset`

[//]: # (delete after aligning video and docs)

<google-youtube
  video-id="xfiOJP8vuX4"
  autoplay="0"
  rel="0"
  fluid>
</google-youtube>

[//]: # (does this video explain iron-iconset?)

Use `iron-iconset` to create your own icon set. An icon set is a group of icons,
distributed as a Polymer element. `iron-icons` above is an example of an icon set.

## Creating SVG icon sets with `iron-iconset-svg`

Use `iron-iconset-svg` to create an icon set of SVG icons.

Import and declare `iron-iconset-svg` in your html and put your
SVG icon definitions inside the `iron-iconset-svg` element as its children.

    <link rel="import" href="../bower_components/iron-iconset-svg/iron-iconset-svg.html">
    <iron-iconset-svg id="custom-icons" iconSize="50">
      <svg>
        <defs>
          <g id="fancy-circles">
            <circle cx="25" cy="25" r="18" />
            <circle cx="12" cy="12" r="10" />
            <circle cx="35" cy="40" r="6" />
          </g>
        </defs>
      </svg>
    </iron-iconset-svg>

[//]: # (move stuff to external file and link, so example works)

This defines a new iconset called `custom-icons` with a single icon, `fancy-circles`.

Because the icons are defined as SVG, you can style them with CSS. Make
the fancy circles even more fancy by adding some color:

    <style>
      iron-icon circle {
        fill: #0b50bf;
      }
      iron-icon circle:first-child {
        fill: #66bbff;
      }
      iron-icon circle:last-child {
        fill: #0083ff;
      }
    </style>

Now you can display the icon with `iron-icon` using the same
<em>iconset-name</em><b>&#8239;:&#8239;</b><em>icon-name</em>
format used for built-in icon sets. For example, to display the icon
defined above use `custom-icons:fancy-circles` as the `icon` attribute.

    <iron-icon icon="custom-icons:fancy-circles" size="30"></iron-icon>

<style>
  iron-icon circle {
    fill: #0b50bf;
  }
  iron-icon circle:first-child {
    fill: #66bbff;
  }
  iron-icon circle:last-child {
    fill: #0083ff;
  }
</style>
<iron-iconset-svg id="custom-icons" iconSize="50">
  <svg>
    <defs>
      <g id="fancy-circles">
        <circle cx="25" cy="25" r="18" />
        <circle cx="12" cy="12" r="10" />
        <circle cx="35" cy="40" r="6" />
      </g>
    </defs>
  </svg>
</iron-iconset-svg>
Tadaa! Here's your brand new icon: <iron-icon icon="custom-icons:fancy-circles" size="30"></iron-icon>

If you prefer to work with more traditional bitmap graphics like *jpg* or *png*,
there is also an element for that: `iron-iconset`.

For example, if you have a *png* file containing icons:

<a href="../../components/iron-iconset/my-icons.png" target="_blank">
  <img src="../../components/iron-iconset/my-icons.png">
</a>

You can set the `src` attribute of `iron-iconset` to point to this file.
Icons are expected to be square and of the size specified
by the `iconSize` property. If the icons are arranged over multiple rows, use the `width`
attribute to specify the width of the image file. List the name of each icon in the `icons` attribute, in the same order as they appear
in the image file.

    <iron-iconset id="custom-icons-png" src="/components/iron-iconset/my-icons.png" width="96" iconSize="24"
      icons="location place starta stopb bus car train walk">
    </iron-iconset>

Now you can use the icons in your custom set just like the built-in icons.

    <iron-icon icon="custom-icons-png:place"></iron-icon>

<iron-iconset id="custom-icons-png" src="../../components/iron-iconset/my-icons.png" width="96" iconSize="24"
  icons="location place starta stopb bus car train walk">
</iron-iconset>
Produces: <iron-icon icon="custom-icons-png:place"></iron-icon>

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






