# Polymer Element Catalog

## Getting Started

To work on the Polymer Elements Catalog, clone the repository.

To install dependencies:

    npm run deps
    
To start a local development server:

    npm run serve
    
To start a local development server with `fixtures` turned on:

    FIXTURES=true npm run serve
    
To prepare the repo for publication:

    npm run build
    
Note: Make sure that you're running chrome 42 or later!
    
### Fixtures

While parts of the system are still in flux, it will be necessary to have stubbed
data and other bits to be able to work against. Anything in the `fixtures`
directory will be available when running a development server. By the time
the catalog ships, the `fixtures` directory should be empty.

## Managing Catalog Data

Data for the catalog is compiled by intelligently composing together information
from multiple sources:

1. The `catalog.json` file in this repository
2. The `bower.json` for each element package and individual element
3. Metadata parsed directly elements' source using [hydrolysis](https://github.com/PolymerLabs/hydrolysis)
4. Other files in package and element repositories, such as guide markdown files

Each of these inputs is combined and compiled into a static format easily loaded
by the catalog application. Outputs of the catalog compilation process include:

1. A `/data/catalog.json` file heavily annotated with parsed metadata
2. Pre-parsed element documentation in `/data/docs`
3. The compiled HTML output of guide markdown files in `/data/guides`

### How `catalog.json` is Created

The final `catalog.json` file can be thought of as the repo's initial file
decorated substantially with metadata. For instance, a package in the initial
file:

```json
{
  "packages": [
    {"title":"Iron Elements", "name":"iron-elements"}
  ]
}
```

Gets decorated with metadata parsed from its' `bower.json`:

```json
{
  "packages": [
    {
      "title":"Iron Elements",
      "name":"iron-elements",
      "description":"Polymer core elements",
      "version":"1.0.0",
      "tags":["utility","scaffolding","user-input"]
    }
  ]
}
```

This decoration occurs in steps and can be considered a series of merges.

### Packages

Each set of elements (henceforth "package") is responsible for maintaining its
own documentation according to the conventions established elsewhere in this
document. Each package is represented in `catalog.json` as an entry in an array.
This array corresponds to the order in which packages are presented in nav
contexts in the element catalog. Each package has the following associated data:

* **name:** the corresponding package name from `bower.json`
* **title:** the human-friendly name of the package for nav display

Each named package should be declared as a dependency in the `bower.json` for
this repository. Additionally, each package's version number should be explicit,
as the version declared in `bower.json` is used as display text in the catalog.

```js
{
  // correct example
  "iron-elements":  "PolymerElements/iron-elements#1.0.0"
  // incorrect example
  "paper-elements": "PolymerElements/paper-elements#^1.0"
}
```

By maintaining strict versioning in the catalog, updating a package's data
becomes as easy as a pull request to `bower.json`.

### Package Metadata

As much as possible, the element catalog uses existing conventions from systems
such as Bower as a repository for metadata.

#### bower.json

The `bower.json` for a package should contain a `dependencies` entry for each of
its child elements. A declared dependency will be considered a child element of
the package if and only if its name is identical to the package name before the
first dash. As an example, if the package is `iron-elements`, `iron-ajax` would
be considered a child but `polymer` would not.

The element catalog uses the following information from `bower.json`:

* **name:** The package name should correspond to a `packages` entry in the
  `catalog.json` file in this repository for it to be displayed.
* **description:** The package description should be phrased such that it can
  be used as descriptive summary text in the catalog when the package is
  presented along-side other packages. It should be less than 200 characters
  in length but adequately descriptive of the primary use cases for the package.
* **keywords:** Excluding `web-components` and `polymer`, these keywords will be
  used as **tags** in the final catalog data.

### Elements

Elements behave much like packages: they are responsible for maintaining their
own documentation in `bower.json`. In addition, the source `.html` files for
elements should be documented in accordance with the [Polymer Elements style guide](http://polymerelements.github.io/style-guide/).

#### bower.json

The catalog uses the following information from an element's `bower.json`:

* **name:** The element name. Except in rare cases, this should match a `.html`
  file of the same name that contains the element or imports all default elements
  for element repos with multiple elements.
* **description:** A less-than-200 character description of what the element
  does and how it should be used.
* **keywords:** Except for `web-components` and `polymer`, these keywords will
  be used as **tags** in the final catalog data.
* **main:** This field should represent **every .html file that a user might
  directly import**. For instance, in `iron-icons` each icon set might be imported
  separately, so each set should be included in main. For many (most) elements
  this can just be a string with the `.html` filename matching the `name` field.

### Guides

Guides are in-depth articles that allow for article-style documentation in
addition to the API documentation for each element parsed using hydrolysis.

Guides are simply Markdown files with YAML front-matter and can be included
in the repository for the catalog, a package, or an individual element. To
avoid namespace collisions, guides for packages and individual elements are
identified with `repo-name/guide-name`, while guides in this repository are
identified simply with `guide-name`.

Each guide will be listed and accessible in the **Guides** section of the
catalog, and will additionally be associated with each element and package
it references.

#### Example Markdown File (e.g. `bower_components/gold-elements/guides/ecommerce.md`)

```markdown
---
title: How to Build an E-Commerce Site with Gold Elements
summary: "Learn how to add drop-in E-commerce components to quickly build a web presence for your business."
tags: ['ecommerce','beginner']
elements: ['gold-checkout','paper-input']
updated: 2015-04-10
---

Actual article content starts here.

## Example Section

Etc. etc.
```

#### Example compiled `catalog.json`

```js
{
  // guides with associated packages should also be referenced in the package metadata
  "packages": [
    {"name":"gold-elements","guides":["gold-elements/ecommerce"]}
  ],
  "guides": [
    {
      "name":"gold-elements/ecommerce",
      "title":"How to Build an E-Commerce Site with Gold Elements",
      "tags":["ecommerce","beginner"],
      "elements":["gold-checkout","paper-input"],
      "package":"gold-elements"
    }
  ],
  "elements": [
     {"name":"paper-input","guides":["gold-elements/ecommerce"]}
  ]
}
```

#### Assets in Guides

If a guide needs images or other assets, those should be stored in `/guides/assets`
in the repository and always referenced with relative URLs (e.g. `assets/filename.jpg`).
By maintaining this convention the catalog compilation process will automatically
ensure that images and other assets are properly accessible to the guide.