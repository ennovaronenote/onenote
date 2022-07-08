[onenote](README.md) / Modules

# onenote

## Table of contents

### Classes

- [AuthenticationClient](classes/AuthenticationClient.md)

### Interfaces

- [IClientOptions](interfaces/IClientOptions.md)

### Type Aliases

- [LinkProps](modules.md#linkprops)

### Variables

- [GRAPH\_API\_VERSION](modules.md#graph_api_version)
- [GRAPH\_BASE\_URL](modules.md#graph_base_url)

### Pages

- [Home](modules.md#home)

### Functions

- [NavbarContainer](modules.md#navbarcontainer)
- [NavbarLink](modules.md#navbarlink)
- [NavbarLinks](modules.md#navbarlinks)

## Type Aliases

### LinkProps

Ƭ **LinkProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `href` | `string` |
| `value` | `string` |

#### Defined in

[components/Navbar/Link.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/eaf20ab/components/Navbar/Link.tsx#L3)

## Variables

### GRAPH\_API\_VERSION

• `Const` **GRAPH\_API\_VERSION**: ``"v1.0"``

**`Constant`**

Default API Endpoint version.

#### Defined in

lib/Constants.ts:9

___

### GRAPH\_BASE\_URL

• `Const` **GRAPH\_BASE\_URL**: ``"http://graph.microsoft.com/"``

**`Constant`**

Default URL for Graph requests.

#### Defined in

lib/Constants.ts:15

## Pages

### Home

• `Const` **Home**: `NextPage`

Page to render the home / landing page.

#### Defined in

[pages/index.tsx:10](https://gitlab.com/ennovar1/OneNote/-/blob/eaf20ab/pages/index.tsx#L10)

## Functions

### NavbarContainer

▸ **NavbarContainer**(): `Element`

Container component to render the navigation bar.

#### Returns

`Element`

___

### NavbarLink

▸ **NavbarLink**(`props`): `Element`

Utilizes LinkProps type to render a valid navigation link.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`LinkProps`](modules.md#linkprops) |

#### Returns

`Element`

___

### NavbarLinks

▸ **NavbarLinks**(): `Element`

A container to hold necessary links for navigation.

#### Returns

`Element`
