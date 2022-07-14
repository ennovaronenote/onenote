[onenote](../README.md) / [Modules](../modules.md) / GraphRequest

# Class: GraphRequest

## Table of contents

### Constructors

- [constructor](GraphRequest.md#constructor)

### Properties

- [#requestUrl](GraphRequest.md##requesturl)
- [#token](GraphRequest.md##token)
- [config](GraphRequest.md#config)

### Methods

- [constructUrl](GraphRequest.md#constructurl)
- [executeRequest](GraphRequest.md#executerequest)
- [init](GraphRequest.md#init)

## Constructors

### constructor

• `Private` **new GraphRequest**(`config`, `token`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IClientOptions`](../interfaces/IClientOptions.md) |
| `token` | `CookieValueTypes` |

## Properties

### #requestUrl

• `Private` **#requestUrl**: `string`

Complete URL to submit API requests

#### Defined in

[lib/GraphRequest.ts:16](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/lib/GraphRequest.ts#L16)

___

### #token

• `Private` **#token**: `CookieValueTypes`

Access token to send with headers

#### Defined in

[lib/GraphRequest.ts:13](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/lib/GraphRequest.ts#L13)

___

### config

• **config**: [`IClientOptions`](../interfaces/IClientOptions.md)

Configuration options so the request knows the URL, type of request, etc...

#### Defined in

[lib/GraphRequest.ts:19](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/lib/GraphRequest.ts#L19)

## Methods

### constructUrl

▸ `Private` **constructUrl**(): `string`

Construct a url that combines a proper link to request a Microsoft Graph resource.

#### Returns

`string`

If invalid, an empty string. Otherwise, the complete URL for the API request.

___

### executeRequest

▸ **executeRequest**(`shouldReturnProps?`): `Promise`<`any`\>

Public function for user to complete their API request after receiving the proper access tokens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `shouldReturnProps?` | `boolean` |

#### Returns

`Promise`<`any`\>

Data returned from Microsoft Graph

___

### init

▸ `Static` **init**(`config`, `context`): `Promise`<[`GraphRequest`](GraphRequest.md)\>

Initializer function to easily ensure that access tokens are read before completing a request.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IClientOptions`](../interfaces/IClientOptions.md) |
| `context` | `NextPageContext` |

#### Returns

`Promise`<[`GraphRequest`](GraphRequest.md)\>

A class, GraphRequest, which holds the methods to make API requests.
