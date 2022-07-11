[onenote](README.md) / Modules

# onenote

## Table of contents

### Classes

- [AuthenticationClient](classes/AuthenticationClient.md)
- [GraphRequest](classes/GraphRequest.md)

### Interfaces

- [IClientOptions](interfaces/IClientOptions.md)

### Type Aliases

- [LinkProps](modules.md#linkprops)

### Variables

- [AUTH\_CONFIG](modules.md#auth_config)
- [GRAPH\_API\_VERSION](modules.md#graph_api_version)
- [GRAPH\_BASE\_URL](modules.md#graph_base_url)

### Pages

- [Home](modules.md#home)

### Components

- [NavbarContainer](modules.md#navbarcontainer)
- [NavbarLink](modules.md#navbarlink)
- [NavbarLinks](modules.md#navbarlinks)

### Functions

- [getServerSideProps](modules.md#getserversideprops)

## Type Aliases

### LinkProps

Ƭ **LinkProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `href` | `string` |
| `value` | `string` |

#### Defined in

[components/Navbar/Link.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/b6e67c0/components/Navbar/Link.tsx#L3)

## Variables

### AUTH\_CONFIG

• `Const` **AUTH\_CONFIG**: [`IClientOptions`](interfaces/IClientOptions.md)

**`Constant`**

Default options to provide to [AuthenticationClient](classes/AuthenticationClient.md)

#### Defined in

[lib/Constants.ts:23](https://gitlab.com/ennovar1/OneNote/-/blob/b6e67c0/lib/Constants.ts#L23)

___

### GRAPH\_API\_VERSION

• `Const` **GRAPH\_API\_VERSION**: ``"v1.0"``

**`Constant`**

Default API Endpoint version.

#### Defined in

[lib/Constants.ts:11](https://gitlab.com/ennovar1/OneNote/-/blob/b6e67c0/lib/Constants.ts#L11)

___

### GRAPH\_BASE\_URL

• `Const` **GRAPH\_BASE\_URL**: ``"http://graph.microsoft.com/"``

**`Constant`**

Default URL for Graph requests.

#### Defined in

[lib/Constants.ts:17](https://gitlab.com/ennovar1/OneNote/-/blob/b6e67c0/lib/Constants.ts#L17)

## Pages

### Home

• `Const` **Home**: `NextPage`

Page to render the home / landing page.

#### Defined in

[pages/index.tsx:10](https://gitlab.com/ennovar1/OneNote/-/blob/b6e67c0/pages/index.tsx#L10)

## Components

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

## Functions

### getServerSideProps

▸ **getServerSideProps**(`context`): `Promise`<`undefined` \| { `props`: {} = {} }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `NextPageContext` |

#### Returns

`Promise`<`undefined` \| { `props`: {} = {} }\>
