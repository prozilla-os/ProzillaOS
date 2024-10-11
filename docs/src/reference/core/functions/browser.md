---
outline: 2
description: "Functions related to the browser"
package: "@prozilla-os/core"
---

# Browser functions

{{ $frontmatter.description }}

- **Source:** [`browser.utils.ts`](https://github.com/prozilla-os/ProzillaOS/blob/main/packages/core/src/features/_utils/browser.utils.ts)

## closeViewport(requireConfirmation, name)

Simulate closing the viewport by opening a blank page

### Parameters

- **requireConfirmation** - Whether to ask the user for confirmation before closing
  - **Type:** `boolean | undefined`
  - **Default:** `false`
- **name** - Name of the system
  - **Type:** `string`

## reloadViewport()

Reload the viewport

## isValidUrl(string)

Validate a URL string

### Parameters

- **string** - Input string
  - **Type:** `string`

### Returns

- **Type:** `boolean`

## setViewportTitle(title)

Change the viewport title by changing meta tags and document title

### Parameters

- **title** - Viewport title
  - **Type:** `string`

## setViewportIcon(url)

Change the viewport icon by changing meta tags

### Parameters

- **url** - URL of the viewport icon
  - **Type:** `string`

## getViewportParams()

Get the current viewport parameters/search queries

### Returns

- **Type:** `Record<string, string>`

## generateUrl(options)

Generate a system URL based on some options

### Parameters

- **options**
  - **Type:** `GenerateUrlOptions`

```ts
interface GenerateUrlOptions {
	appId?: string;
	fullscreen?: boolean;
	standalone?: boolean;
}
```

### Returns

The generated URL

- **Type:** `string`

## openUrl(url, target)

Open a URL in an optional target or the current window

### Parameters

- **url**
  - **Type:** `string`
- **target**
  - **Type:** `React.HTMLAttributeAnchorTarget | undefined`

## removeUrlProtocol(url)

Remove the protocol from a URL string

### Parameters

- **url**
  - **Type:** `string`

### Returns

URL without protocol

- **Type:** `string`

## copyToClipboard(string, onSuccess, onFail)

Copy text to the user's clipboard

### Parameters

- **string**
  - **Type:** `string`
- **onSuccess**
  - **Type:** `Function`
- **onFail**
  - **Type:** `Function`
