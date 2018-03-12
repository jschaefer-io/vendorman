# Vendorman
Vendorman is a small helper. It helps you to install dependencies for small websites and assists in providing your build tools with all paths. Install via `npm install vendorman -g`

- `vendorman add <packages...>` Add a dependency - uses `npm install`
- `vendorman remove <packages...>` Remove a dependency - uses `npm remove internally`
- `vendorman list` List dependencies

## Why?
Small websites often need standard libraries like jQuery. Integrating these in your build task can be tedious. Vendorman provies an easy to use command line interface to integrate these dependencies in you build task.