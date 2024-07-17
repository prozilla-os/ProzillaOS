---
outline: deep
description: "Functions related to the browser"
package: "@prozilla-os/core"
---

# Browser functions

{{ $frontmatter.description }}

- **Source:** [`browser.utils.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/_utils/browser.utils.ts)

## closeViewport(requireConfirmation, name)

Simulate closing the viewport by opening a blank page

::: details

- **Parameters**
  - **requireConfirmation** - Whether to ask the user for confirmation before closing
    - **Type:** `boolean | undefined`
	- **Default:** `false`
  - **name** - Name of the system
    - **Type:** `string`

:::

## reloadViewport()

Reload the viewport

## isValidUrl(string)

Validate a URL string

::: details

- **Parameters**
  - **string** - Input string
    - **Type:** `string`
- **Returns**
  - **Type:** `boolean`

:::

## setViewportTitle(title)

Change the viewport title by changing meta tags and document title

::: details

- **Parameters**
  - **title** - Viewport title
    - **Type:** `string`

:::

## setViewportIcon(url)

Change the viewport icon by changing meta tags

::: details

- **Parameters**
  - **url** - URL of the viewport icon
    - **Type:** `string`

:::

## getViewportParams()

Get the current viewport parameters/search queries

::: details

- **Returns**
  - **Type:** `Record<string, string>`

:::

## generateUrl(options)

Generate a system URL based on some options 

::: details

- **Parameters**
  - **options**
    - **Type:** `GenerateUrlOptions`
- **Returns** - The generated URL
  - **Type:** `string`

```ts
interface GenerateUrlOptions {
	appId?: string;
	fullscreen?: boolean;
	standalone?: boolean;
}
```

:::

## openUrl(url, target)

Open a URL in an optional target or the current window

::: details

- **Parameters**
  - **url**
    - **Type:** `string`
  - **target**
    - **Optional**
	- **Type:** `React.HTMLAttributeAnchorTarget`

:::

## removeUrlProtocol(url)

Remove the protocol from a URL string

::: details

- **Parameters**
  - **url**
    - **Type:** `string`
- **Returns** - URL without protocol
  - **Type:** `string`

:::

## copyToClipboard(string, onSuccess, onFail)

Copy text to the user's clipboard

::: details

- **Parameters**
  - **string**
    - **Type:** `string`
  - **onSuccess**
    - **Type:** `Function`
  - **onFail**
    - **Type:** `Function`

:::
