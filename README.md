jquery.easy-sortable-tables.js
==============================

A simple script for making tables sortable, even if they have multiple tbody elements

The API
-------

This script enables the dynamic sorting of columns. Sorting requires links in the 
column headers (e.g. `thead th a`). These links will get "up" and "down" classes when 
they are being used for sorting. The "active" `class`, will be added to the `th` when 
the column is actively being used for sorting.

If the table includes mutiple grouped `tbody` elements that need to be sorted together,
add a `class` of "grouped" to the table.