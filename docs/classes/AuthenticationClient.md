[onenote](../README.md) / [Modules](../modules.md) / AuthenticationClient

# Class: AuthenticationClient

## Table of contents

### Constructors

- [constructor](AuthenticationClient.md#constructor)

### Properties

- [config](AuthenticationClient.md#config)
- [urlComponents](AuthenticationClient.md#urlcomponents)

### Methods

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

lib/AuthenticationClient.ts:8

___

### urlComponents

• `Private` **urlComponents**: `string`[]

Variable to hold different components of the URL

#### Defined in

lib/AuthenticationClient.ts:5

## Methods

### init

▸ `Static` **init**(`options`): [`AuthenticationClient`](AuthenticationClient.md)

Initialize the client through its private constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IClientOptions`](../interfaces/IClientOptions.md) |

#### Returns

[`AuthenticationClient`](AuthenticationClient.md)
