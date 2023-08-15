[← Back](../README.md)

# Storage

> Related document: [Virtual Drive](../virtual-drive/README.md)

ProzillaOS makes use of the local storage to store persistent data. The data is loaded by the virtual root during the initialization process. On the first run, the default data is loaded.

The data is converted from class instances to a JSON object and then to a string by the virtual root before it is stored in the local storage. To load data from the local storage, an inverse process is used.