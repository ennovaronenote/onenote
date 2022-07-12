[onenote](../README.md) / [Modules](../modules.md) / AuthenticationClient

# Class: AuthenticationClient

## Table of contents

### Constructors

- [constructor](AuthenticationClient.md#constructor)

### Properties

- [config](AuthenticationClient.md#config)

### Methods

- [api](AuthenticationClient.md#api)
- [init](AuthenticationClient.md#init)

## Constructors

### constructor

• `Private` **new AuthenticationClient**(`clientOptions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientOptions` | [`IClientOptions`](../interfaces/IClientOptions.md) |

## Properties

### config

• `Private` **config**: [`IClientOptions`](../interfaces/IClientOptions.md)

Configuration to initialize the client with

#### Defined in

[lib/AuthenticationClient.ts:7](https://gitlab.com/ennovar1/OneNote/-/blob/9ecd859/lib/AuthenticationClient.ts#L7)

## Methods

### api

▸ **api**(`context`, `resource?`): `Promise`<[`GraphRequest`](GraphRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `NextPageContext` |
| `resource?` | `string` |

#### Returns

`Promise`<[`GraphRequest`](GraphRequest.md)\>

___

### init

▸ `Static` **init**(`options`): [`AuthenticationClient`](AuthenticationClient.md)

Initialize the client through its private constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IClientOptions`](../interfaces/IClientOptions.md) |

#### Returns

[`AuthenticationClient`](AuthenticationClient.md)
