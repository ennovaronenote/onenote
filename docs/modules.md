[onenote](README.md) / Modules

# onenote

## Table of contents

### Type Aliases

- [LinkProps](modules.md#linkprops)

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

[components/Navbar/Link.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/24d8855/components/Navbar/Link.tsx#L3)

## Pages

### Home

• `Const` **Home**: `NextPage`

Page to render the home / landing page.

#### Defined in

[pages/index.tsx:7](https://gitlab.com/ennovar1/OneNote/-/blob/24d8855/pages/index.tsx#L7)

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
