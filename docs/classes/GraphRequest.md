[onenote](../README.md) / [Modules](../modules.md) / GraphRequest

# Class: GraphRequest

## Table of contents

### Constructors

- [constructor](GraphRequest.md#constructor)

### Properties

- [#token](GraphRequest.md##token)
- [config](GraphRequest.md#config)

### Methods

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

### #token

• `Private` **#token**: `CookieValueTypes`

#### Defined in

[lib/GraphRequest.ts:11](https://gitlab.com/ennovar1/OneNote/-/blob/b6e67c0/lib/GraphRequest.ts#L11)

___

### config

• **config**: [`IClientOptions`](../interfaces/IClientOptions.md)

#### Defined in

[lib/GraphRequest.ts:12](https://gitlab.com/ennovar1/OneNote/-/blob/b6e67c0/lib/GraphRequest.ts#L12)

## Methods

### executeRequest

▸ **executeRequest**(): `void`

#### Returns

`void`

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
