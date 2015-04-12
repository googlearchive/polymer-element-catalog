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
    
### Fixtures

While parts of the system are still in flux, it will be necessary to have stubbed
data and other bits to be able to work against. Anything in the `fixtures`
directory will be available when running a development server. By the time
the catalog ships, the `fixtures` directory should be empty.

## Managing Catalog Packages

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
  "core-elements":  "PolymerElements/core-elements#1.0.0"
  // incorrect example
  "paper-elements": "PolymerElements/paper-elements#^1.0"
}
```

By maintaining strict versioning in the catalog, updating a package's data
becomes as easy as a pull request to `bower.json`.

## Package Metadata

As much as possible, the element catalog uses existing conventions from systems
such as Bower as a repository for metadata.

### bower.json

The `bower.json` for a package should contain a `dependencies` entry for each of
its child elements. A declared dependency will be considered a child element of
the package if and only if its name is identical to the package name before the
first dash. As an example, if the package is `core-elements`, `core-ajax` would
be considered a child but `polymer` would not.

The element catalog uses the following information from `bower.json`:

* **name:** The package name should correspond to a `packages` entry in the
  `catalog.json` file in this repository for it to be displayed.
* **description:** The package description should be phrased such that it can
  be used as descriptive summary text in the catalog when the package is
  presented along-side other packages.