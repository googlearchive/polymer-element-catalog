---
title: Using Icons
summary: "How to use the Polymer team's standard icons, and create your own custom icons."
tags: ['icons','intermediate']
elements: ['iron-icon','iron-icons', 'iron-iconset', 'iron-iconset-svg']
updated: 2015-07-17
---

<link rel="import" href="/bower_components/google-youtube/google-youtube.html">

## Introduction

<google-youtube
  video-id="6kkNgVG6LuI"
  autoplay="0"
  rel="0"
  fluid>
</google-youtube>


The Iron package contains four elements for working with icons:

* `iron-icon`, for displaying a single icon
* `iron-icons`, for using the Polymer team's collection of common icons in your own project
* `iron-iconset`, for creating your own icon set
* `iron-iconset-svg`, for styling your SVG icons

In this guide we will teach you how to use each of these elements.

## Installation

Install the icon elements with Bower. We'll assume that your project can access 
these elements from `/bower_components/`.

```bash
bower install Polymer/iron-icon 
bower install Polymer/iron-icons 
bower install Polymer/iron-iconset 
bower install Polymer/iron-iconset-svg 
```

## Using the Polymer team's built-in icons

You can use the icons that you see on this website in your own project. Let's
get started by installing the following two elements:

    bower install Polymer/iron-icon
    bower install Polymer/iron-icons

The Polymer team's collection of icons ("icon set") is located in the `iron-icons`
element. To display a single icon you will use `iron-icon`.

## Creating your own icon set

## Using `iron-icon` to display an icon



    <link rel="import" href="/bower_components/iron-icon/iron-icon.html">

    <iron-icon src="//www.polymer-project.org/images/icons/android.svg"></iron-icon>

Produces: <iron-icon icon="android"></iron-icon>

The source image is scaled to fit the icon size, which defaults to 24px square, and is used as the icon element’s background.

You can set the size of the icon using CSS.

    <iron-icon src="/images/icons/android.svg" style="width: 24px; height: 24px;"></iron-icon>
    <iron-icon src="/images/icons/android.svg" style="width: 32px; height: 32px;"></iron-icon>
    <iron-icon src="/images/icons/android.svg" style="width: 48px; height: 48px;"></iron-icon>

Produces: <iron-icon src="/images/icons/android.svg" style="width: 24px; height: 24px;"></iron-icon>
<iron-icon src="/images/icons/android.svg" style="width: 32px; height: 32px;"></iron-icon>
<iron-icon src="/images/icons/android.svg" style="width: 48px; height: 48px;"></iron-icon>

**Note:** In Polymer 0.3.4 and earlier, `iron-icon` included a
`size` attribute and didn't support sizing using CSS.
{: .alert .alert-info }

The `src` attribute works well when you want to use a single icon. However, most of the time you need more than one, so Polymer makes it easy to work with *icon sets*.

[//]: # (To-Do: Merge with section above?)

## Using `iron-icons` to use the Polymer team's icon set in your project

If you import `iron-icons`, you get access to
a whole range of predefined icon sets. To use an icon from an icon set, use the `icon` attribute instead of `src`:

    <!-- iron-icons loads the default icon set and the iron-icon element -->
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">

    <iron-icon icon="polymer"></iron-icon>

This loads the *polymer* icon from the default iconset: <iron-icon icon="polymer"></iron-icon>

You can find more interesting icon sets in the `iron-icons` directory.
To use an icon from one of these icon sets, first import the icon set.
Specify the icon as <em>iconset-name</em><b>&#8239;:&#8239;</b><em>icon-name</em>.

For example:

    <!-- load the social icon set and iron-icon element -->
    <link rel="import" href="/bower_components/iron-icons/social-icons.html">

    <iron-icon icon="social:cake"></iron-icon>

This displays the *cake* icon from the *social* iconset: <iron-icon icon="social:cake"></iron-icon>

You can browse available icon sets on the
[iron-icons demo page](../../components/iron-icons/demo.html).

## Styling icons with CSS {#styling-with-css}

Because icons in Polymer iconsets are SVG-based, you can control their appearance
with CSS. In addition to setting standard CSS properties like sizes and background colors,
you can set SVG-specific CSS properties like `fill`, `stroke` and `stroke-width` for your icons.

By default, icons use `fill: currentcolor`, so they match the current text color.
The easiest way to override the icon color is to set the `color` property. (You
can also set the `fill` property directly, but it requires a more specific CSS selector.)

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
Produces: <iron-icon icon="android"></iron-icon>

## Creating custom icon sets with `iron-iconset` {#roll-your-own}

<div class="yt-embed">
  <google-youtube
    videoid="xfiOJP8vuX4"
    thumbnail="/images/polycasts/PC002.jpg"
    autoplay="0"
    rel="0"
    fluid>
  </google-youtube>
</div>

The styling possibilities become even more exciting when you want to make
your own icon sets. To create a custom icon set with SVG, import and declare
`iron-iconset-svg` in your html. Because SVG is just markup, you can put your
SVG icons inside the `iron-iconset-svg` element as its children.

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

## Using icons with other elements {#icons-in-other-core-components}

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






