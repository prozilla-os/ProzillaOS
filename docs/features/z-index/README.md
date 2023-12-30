[← Back](../README.md)

# Z-index

A collection of helper classes to generate z-indexes that prevent overlapping and make sure everything is displayed in the correct order. One example use case is the windows that all need to be displayed in order and should always be displayed under the taskbar, this is made possible by these helper classes. It works by creating groups that can contain any amount of indexes, each group's offset is defined by the combined length of all preceding groups.