---
title: Style Guide
summary: "Style Guide"
tags: ['beginner']
updated: 2015-12-03
---

<style>
.demo {
  background-color: #ccc;
  padding: 4px;
  margin: 12px;
}

.demo div {
  background-color: white;
  padding: 12px;
  margin: 4px;
}

.tall {
  height: 124px;
}

.demo.vertical {
  height: 250px;
}

demo-tabs::shadow #results {
  width: 40%;
  max-width: initial;
}

table {
  margin: 16px 20px;
}
td,th {
  padding 0px 8px;
}
</style>

# Polymer Style Guide

## Element Summaries

<aside>Provide a thorough overview of what the element does, and provide examples of common usage patterns. Format the documentation as markdown.</aside>

If the element declares a `<dom-module>`, write the documentation as HTML comments immediately preceeding that `<dom-module>`

```
    <link rel="import" href="../polymer/polymer.html">

    <!--
    `<awesome-sauce>` injects a healthy dose of awesome into your page.

    In typical use, just slap some `<awesome-sauce>` at the top of your boÂdy:

        <body>
          <awesome-sauce></awesome-sauce>

        Wham! It's all awesome now!
    -->
    <dom-module id="awesome-sauce">
```

Note that the doc comment should be after any dependencies.

If your element lacks a `<dom-module>`, write documentation via a JSDoc comment attached to its Polymer() call:

```
    /**
     * `<awesome-sauce>` injects a healthy dose of awesome into your page.
     *
     * In typical use, just slap some `<awesome-sauce>` at the top of your body:
     *
     *     <body>
     *       <awesome-sauce></awesome-sauce>
     *
     * Wham! It's all awesome now!
     */
    Polymer({
      is: 'awesome-sauce',
```

Element-level can be added at the end of the element summary, as part of the same comment block. Two tags are supported currently:

- @hero. Specifies a hero image.

```
@hero path/to/image
```

- @demo. Specifies a demo, with optional path and description. If path and description are omitted, the standard demo path (./demo/) is assumed.

```
@demo

@demo path/to/demo1  Super cool demo, with sharks!
@demo path/to/demo2  Even cooler demo. The sharks have lasers!
```

Other tags will be ignored.

**Note: Any tags placed before the end of the comment block are interpreted as the end of the element summary.**


## Properties

<aside>Document all public properties. Docs should start with a one line summary. Make sure that the property's type is annotated.</aside>

For example, the most simple property documentation can be a single line:

```
/** Whether this element is currently awesome. */
isAwesome: Boolean,
```

If the property doesn't specifiy a type, or that type is not primitive, be sure to ANNOTATE the type properly:

```
/**
 * Metadata describing what has been made awesome on the page.
 *
 * @type {{elements: Array<HTMLElement>, level: number}}
 */
sauce: Object,
```

Private properties should be prefixed with _

```
/** @return {string} An awesome message */
_getMessage: function() {
```

## Method

<aside>Follow the PROPERTY GUIDELINES. Additionally, make sure the types for all params and return values are documented.</aside>


For example:

```
/**
 * Applies awesomeness to `element`.
 *
 * @param {HTMLElement} element The element to be made awesome.
 * @param {number} level The numeric level of awesomeness. A value
 *     between `1` and `11`.
 * @param {Array<HTMLElements>=} refs Optional referenced elements
 *     that become awesome by proxy.
 * @return {number} The cumulative level of awesomeness.
 */
makeAwesome: function makeAwesome(element, level, refs) {
```

## Events

<aside>Events must be annotated explicitly with an @event tag.</aside>

Event properties are documented with the @param tag, just like method parameters.

For example:

```
/**
 * Fired when `element` changes its awesomeness level.
 *
 * @event awesome-change
 * @param {number} newAwesome New level of awesomeness.
 */
```


## Behaviors

<aside>Like an element, but add @polymerBehavior.</aside>

Include a behavior summary, just like an element summary, but ending with a @polymerBehavior tag. The behavior name can be specified explicitly if the doc parser can't infer it correctly.

```
@polymerBehavior MyOddBehavior
```

Document methods, properties, etc. just like an element.

For example:

```
/**
 * Behavior that highlights stuff.
 *
 * @polymerBehavior
 */

 Polymer.HighlightStuff = { ... }
```

## Type Annotation

<aside>[Adhere to CLOSURE-COMPATIBLE TYPE EXPRESSIONS.](https://developers.google.com/closure/compiler/docs/js-for-compiler#types)</aside>

## Language

<aside>When in doubt, keep to the 3rd person present tense and keep it simple.</aside>

A few guidelines for consistency:

- Use the 3rd person for descriptions.
  - Good. "Creates a foo."
  - Avoid. "Create a foo."

  Use 2nd person ("Do this...") when you're trying to be prescriptive, such as, "Add the toolbar attribute to the element you want to use as a toolbar."

- Use the present tense whenever possible.
  - Good. "Clicking the element starts an animation."
  - Avoid. "Clicking the element will start an animation."

- Start method descriptions with an active verb.
  - Good. "Starts the animation."
  - Avoid. "This method to starts the animation."

- It's OK to use a fragment, especially in a short description.
  - Good. "Item height, in pixels."
  - Avoid. "This property specifies the item height, in pixels."

  (Fragments should still start with a capital letter and have ending punctuation.)

The JAVADOC STYLE GUIDE is a good resource on general API doc style. Most of the style rules described there can be applied here as well.

