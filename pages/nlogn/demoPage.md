# Building the Demo page.

## Outline

The main goal of this page is to create an interactive page that showcases the manual sort algorithm interface.

## Generallity

The intention in the future is for this algorithm to be able to take in any kind of "Atom" that a user may wish to compare (especially ones that are hard to define computer metrics for).

In order to acomplish this we define an "atom" interface which can be implemented in any way that a user wishes.

This Atom interface has two properties:

1. render: a function (taking no aurguments) that returns a JSX.Element => the visual representation of the atom.
2. data: whatever internal data (of any type) that the atom represents.

Both of these are defined in the abstract so they can be implemented in a myriad of ways.

## Fiddly Details

Im order to avail ourselves of .ts support, we need to be extra careful of how things are defined so they can integrate with .vue properly.
